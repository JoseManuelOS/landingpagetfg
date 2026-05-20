<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  text: string
  variant?: 'indigo' | 'cyan' | 'green' | 'amber'
  dark?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'indigo',
  dark: true,
})

const root = ref<HTMLDivElement | null>(null)
const bg = ref<HTMLDivElement | null>(null)

const accentMap = {
  indigo: '#4338ca',
  cyan: '#0891b2',
  green: '#047857',
  amber: '#b45309',
} as const

onMounted(() => {
  if (!root.value || !bg.value) return
  gsap.fromTo(
    bg.value,
    { scaleX: 0 },
    {
      scaleX: 1,
      duration: 1.0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: root.value,
        start: 'top 90%',
        once: true,
      },
    },
  )
})
</script>

<template>
  <div
    ref="root"
    class="section-banner"
    :class="[`section-banner--${props.variant}`, { 'section-banner--dark': props.dark }]"
  >
    <div ref="bg" class="section-banner__bg" :style="{ background: accentMap[props.variant] }" />
    <div class="section-banner__content">
      <div class="section-banner__inner">
        <span>{{ props.text }}</span>
        <span class="section-banner__dot" />
        <span>{{ props.text }}</span>
        <span class="section-banner__dot" />
        <span>{{ props.text }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as v;

.section-banner {
  &--dark {
    color: #fff;
  }
}
</style>
