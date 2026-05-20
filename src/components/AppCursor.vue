<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

type CursorState = 'default' | 'hover' | 'link' | 'hidden'

const cursorRef = ref<HTMLDivElement | null>(null)
const state = ref<CursorState>('default')

const isFinePointer =
  typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let rafId = 0
const target = { x: 0, y: 0 }
const current = { x: 0, y: 0 }

const tick = () => {
  rafId = requestAnimationFrame(tick)
  if (!cursorRef.value) return
  current.x += (target.x - current.x) * 0.18
  current.y += (target.y - current.y) * 0.18
  cursorRef.value.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`
}

const onMove = (e: PointerEvent) => {
  target.x = e.clientX
  target.y = e.clientY
  if (state.value === 'hidden') state.value = 'default'
}

const onLeave = () => {
  state.value = 'hidden'
}

const onOver = (e: Event) => {
  const t = e.target as HTMLElement
  if (!t || !t.closest) return
  const link = t.closest('a, button, [role="button"], [data-cursor]')
  if (!link) {
    state.value = 'default'
    return
  }
  const explicit = link.getAttribute('data-cursor')
  if (explicit === 'link') state.value = 'link'
  else if (link.tagName === 'A' || link.tagName === 'BUTTON' || link.getAttribute('role') === 'button') state.value = 'link'
  else state.value = 'hover'
}

onMounted(() => {
  if (!isFinePointer || reduced) return
  document.addEventListener('pointermove', onMove, { passive: true })
  document.addEventListener('pointerleave', onLeave)
  document.addEventListener('pointerover', onOver, { passive: true })
  tick()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  document.removeEventListener('pointermove', onMove)
  document.removeEventListener('pointerleave', onLeave)
  document.removeEventListener('pointerover', onOver)
})
</script>

<template>
  <div
    v-if="isFinePointer && !reduced"
    ref="cursorRef"
    class="app-cursor"
    :class="`app-cursor--${state}`"
    aria-hidden="true"
  >
    <span class="app-cursor__dot" />
    <span class="app-cursor__ring" />
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as v;

.app-cursor {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: v.$z-cursor;
  transition: opacity 240ms v.$ease-out;
  mix-blend-mode: difference;

  &__dot {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #fff;
    transform: translate(-50%, -50%);
    transition: transform 220ms v.$ease-out, background 220ms;
  }

  &__ring {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1.5px solid #fff;
    transform: translate(-50%, -50%) scale(1);
    transition: transform 320ms v.$ease-smooth, border-color 220ms, background 220ms;
  }

  &--hidden {
    opacity: 0;
  }

  &--hover &__ring {
    transform: translate(-50%, -50%) scale(1.6);
    border-color: rgba(255, 255, 255, 0.6);
  }

  &--link &__dot {
    transform: translate(-50%, -50%) scale(2.4);
    background: var(--color-indigo);
  }
  &--link &__ring {
    transform: translate(-50%, -50%) scale(2.2);
    border-color: var(--color-indigo);
    background: rgba(67, 56, 202, 0.06);
  }

  @media (pointer: coarse) {
    display: none;
  }
}
</style>
