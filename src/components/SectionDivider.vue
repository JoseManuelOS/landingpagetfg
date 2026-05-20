<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  accent?: 'indigo' | 'cyan' | 'green' | 'amber'
}
const props = withDefaults(defineProps<Props>(), { accent: 'indigo' })

const root = ref<HTMLDivElement | null>(null)
const path = ref<SVGPathElement | null>(null)

const colorMap = {
  indigo: 'rgba(99, 102, 241, 0.8)',
  cyan: 'rgba(34, 211, 238, 0.8)',
  green: 'rgba(16, 185, 129, 0.8)',
  amber: 'rgba(245, 158, 11, 0.8)',
} as const

onMounted(() => {
  if (!path.value || !root.value) return
  const len = path.value.getTotalLength()
  gsap.set(path.value, { strokeDasharray: len, strokeDashoffset: len })

  gsap.to(path.value, {
    strokeDashoffset: 0,
    duration: 1.4,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: root.value,
      start: 'top 90%',
      once: true,
    },
  })
})
</script>

<template>
  <div
    ref="root"
    class="section-divider"
    :style="{ '--divider-glow': colorMap[props.accent] } as any"
    aria-hidden="true"
  >
    <svg viewBox="0 0 1200 40" preserveAspectRatio="none">
      <defs>
        <linearGradient :id="`divider-grad-${props.accent}`" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" :stop-color="colorMap[props.accent]" stop-opacity="0" />
          <stop offset="0.5" :stop-color="colorMap[props.accent]" />
          <stop offset="1" :stop-color="colorMap[props.accent]" stop-opacity="0" />
        </linearGradient>
      </defs>
      <path
        ref="path"
        class="section-divider__line"
        d="M0 20 Q 300 5 600 20 T 1200 20"
        :stroke="`url(#divider-grad-${props.accent})`"
      />
      <circle :cx="600" :cy="20" :r="2.5" :fill="colorMap[props.accent]" />
    </svg>
  </div>
</template>
