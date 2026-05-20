<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AppearingText from './AppearingText.vue'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  text: string
  variant?: 'indigo' | 'cyan' | 'amber' | 'green'
  tilt?: number
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'indigo',
  tilt: -3,
})

const root = ref<HTMLDivElement | null>(null)
const bg = ref<HTMLSpanElement | null>(null)

onMounted(() => {
  if (!root.value || !bg.value) return
  gsap.fromTo(
    bg.value,
    { scaleX: 0 },
    {
      scaleX: 1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: root.value,
        start: 'top 85%',
        once: true,
      },
    },
  )
})
</script>

<template>
  <div ref="root" class="banner" :class="`banner--${props.variant}`" :style="{ transform: `rotate(${props.tilt}deg)` }">
    <span ref="bg" class="banner__bg" />
    <span class="banner__text">
      <AppearingText :text="props.text" trigger="scroll" :duration="0.5" />
    </span>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as v;

.banner {
  position: relative;
  display: inline-flex;
  padding: v.$space-2xs v.$space-md;
  font-family: v.$font-mono;
  font-size: v.$fs-xs;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: #fff;
  overflow: hidden;

  &__bg {
    position: absolute;
    inset: 0;
    transform-origin: left center;
    z-index: 0;
  }

  &__text {
    position: relative;
    z-index: 1;
  }

  &--indigo &__bg {
    background: var(--color-indigo);
  }
  &--cyan &__bg {
    background: var(--color-cyan);
  }
  &--amber &__bg {
    background: var(--color-amber);
  }
  &--green &__bg {
    background: var(--color-green);
  }
}
</style>
