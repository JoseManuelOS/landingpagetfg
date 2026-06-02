<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { useReducedMotion } from '@/composables/useReducedMotion'

interface Props {
  text: string
  delay?: number
  duration?: number
  flickerPool?: string
  trigger?: 'mount' | 'scroll'
}

const props = withDefaults(defineProps<Props>(), {
  delay: 0,
  duration: 0.9,
  flickerPool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  trigger: 'mount',
})

const root = ref<HTMLSpanElement | null>(null)
const display = ref('')
const { prefers } = useReducedMotion()

let tweens: gsap.core.Tween[] = []

const reveal = () => {
  if (prefers.value) {
    display.value = props.text
    return
  }

  const chars = props.text.split('')
  const state = chars.map((c) => (c === ' ' ? ' ' : pick()))
  display.value = state.join('')

  const total = props.duration
  const perChar = total / chars.length
  chars.forEach((target, i) => {
    if (target === ' ') return
    const flicks = 6
    for (let f = 0; f < flicks; f++) {
      const t = gsap.delayedCall(props.delay + i * perChar + f * (perChar / flicks), () => {
        state[i] = pick()
        display.value = state.join('')
      })
      tweens.push(t as unknown as gsap.core.Tween)
    }
    const settle = gsap.delayedCall(props.delay + i * perChar + perChar * 0.92, () => {
      state[i] = target
      display.value = state.join('')
    })
    tweens.push(settle as unknown as gsap.core.Tween)
  })
}

const pick = () => props.flickerPool[Math.floor(Math.random() * props.flickerPool.length)]

onMounted(() => {
  if (props.trigger === 'scroll' && root.value) {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          reveal()
          obs.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    obs.observe(root.value)
  } else {
    reveal()
  }
})

onUnmounted(() => {
  tweens.forEach((t) => (t as any).kill?.())
  tweens = []
})
</script>

<template>
  <span ref="root" class="appearing-text" :aria-label="text">{{ display || text }}</span>
</template>

<style scoped lang="scss">
.appearing-text {
  display: inline-block;
  font-variant-numeric: tabular-nums;
  white-space: pre;
}
</style>
