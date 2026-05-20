<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import PhoneFrame from '@/components/PhoneFrame.vue'
import inicio from '@/assets/flatmate/screen_inicio.png'
import finanzas from '@/assets/flatmate/screen_finanzas.png'
import tareas from '@/assets/flatmate/screen_tareas.png'

const screens = [
  { src: inicio, alt: 'Inicio del hogar', label: 'Dashboard', accent: 'cyan' as const },
  { src: finanzas, alt: 'Finanzas', label: 'Finanzas', accent: 'green' as const },
  { src: tareas, alt: 'Tareas', label: 'Tareas', accent: 'indigo' as const },
]

const root = ref<HTMLElement | null>(null)
let cleanups: Array<() => void> = []

onMounted(() => {
  if (!root.value) return
  const items = root.value.querySelectorAll<HTMLElement>('.showcase__item')
  items.forEach((item) => {
    const onMove = (e: PointerEvent) => {
      const rect = item.getBoundingClientRect()
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1
      gsap.to(item, {
        rotationY: nx * 10,
        rotationX: -ny * 10,
        y: -8,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 800,
      })
    }
    const onLeave = () => {
      gsap.to(item, { rotationY: 0, rotationX: 0, y: 0, duration: 0.6, ease: 'power2.out' })
    }
    item.addEventListener('pointermove', onMove)
    item.addEventListener('pointerleave', onLeave)
    cleanups.push(() => {
      item.removeEventListener('pointermove', onMove)
      item.removeEventListener('pointerleave', onLeave)
    })
  })
})

onUnmounted(() => {
  cleanups.forEach((c) => c())
  cleanups = []
})
</script>

<template>
  <section id="showcase" ref="root" class="section section--showcase showcase" data-section="showcase">
    <div class="container">
      <header class="showcase__head reveal">
        <span class="section-marker">
          <span class="section-marker__num">06</span>
          <span>SHOWCASE</span>
        </span>
        <h2 class="heading-display-sm">Pantallas reales del TFG.</h2>
      </header>
      <div class="showcase__grid" data-stagger>
        <figure
          v-for="(screen, i) in screens"
          :key="screen.label"
          class="showcase__item"
          :class="{ 'showcase__item--offset': i === 1 }"
          data-stagger-child
        >
          <PhoneFrame :src="screen.src" :alt="screen.alt" :accent="screen.accent" />
          <figcaption>{{ screen.label }}</figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as v;

.showcase {
  &__head {
    display: flex;
    flex-direction: column;
    gap: v.$space-md;
    margin-bottom: v.$space-2xl;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: v.$space-lg;
    align-items: end;
    perspective: 1200px;

    @media (max-width: v.$bp-md) {
      grid-template-columns: 1fr;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: v.$space-md;
    will-change: transform;

    &--offset {
      @media (min-width: v.$bp-md) {
        transform: translateY(-32px);
      }
    }

    figcaption {
      text-align: center;
      font-family: v.$font-mono;
      font-size: v.$fs-xs;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--color-text-dim);
      font-weight: 700;
    }
  }
}
</style>
