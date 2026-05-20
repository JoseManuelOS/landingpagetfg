<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import gsap from 'gsap'
import AppearingText from '@/components/AppearingText.vue'
import inicioUrl from '@/assets/flatmate/screen_inicio.png'
import { useReducedMotion } from '@/composables/useReducedMotion'
import { useThreeScene } from '@/composables/useThreeScene'

const threeCanvas = ref<HTMLCanvasElement | null>(null)
const { prefers } = useReducedMotion()
const sceneEnabled = computed(() => !prefers.value)
const { ready: sceneReady } = useThreeScene({ canvas: threeCanvas, enabled: sceneEnabled })
const showFallback = computed(() => !sceneEnabled.value || !sceneReady.value)

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.from('.hero-meta > *', { y: 16, opacity: 0, duration: 0.5, stagger: 0.05 })
    .from('.hero-title__line', { yPercent: 110, duration: 0.9, stagger: 0.08 }, '-=0.2')
    .from('.hero-claim', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
    .from('.hero-actions > *', { y: 14, opacity: 0, duration: 0.45, stagger: 0.08 }, '-=0.3')
    .from('.hero__stage', { opacity: 0, scale: 0.94, duration: 0.9, ease: 'power2.out' }, 0.15)
    .from('.hero-banner__bg', { scaleX: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
})
</script>

<template>
  <section id="hero" class="hero section section--hero" data-section="hero">
    <div class="container hero__grid">
      <div class="hero__copy">
        <div class="hero-meta">
          <span class="section-marker">
            <span class="section-marker__num">00</span>
            <span>TFG · FLATMATE · 2026</span>
          </span>
        </div>

        <h1 class="hero-title">
          <span class="hero-title__row">
            <span class="hero-title__line">Flat</span>
            <span class="hero-title__line hero-title__line--accent">Mate</span>
          </span>
          <span class="hero-title__row hero-title__row--small">
            <span class="hero-title__line">finanzas.</span>
          </span>
          <span class="hero-title__row hero-title__row--small">
            <span class="hero-title__line">tareas.</span>
          </span>
          <span class="hero-title__row hero-title__row--small">
            <span class="hero-title__line">convivencia.</span>
          </span>
        </h1>

        <p class="lead hero-claim">
          <AppearingText
            text="Controla quién paga, qué falta por hacer y cómo evoluciona el mes con IA, OCR y finanzas compartidas."
            :duration="1.2"
          />
        </p>

        <div class="hero-actions">
          <!-- URL placeholder hasta confirmar repositorio público y memoria final -->
          <a href="#" class="button button--primary">Ver proyecto</a>
          <a href="#" class="button">Ver memoria</a>
        </div>
      </div>

      <div class="hero__stage" aria-hidden="true">
        <div class="hero__halo" />
        <canvas ref="threeCanvas" class="hero__canvas" />
        <Transition name="hero-fade">
          <img v-if="showFallback" :src="inicioUrl" alt="" class="hero__fallback" />
        </Transition>

        <div class="hero-banner">
          <div class="hero-banner__bg" />
          <span class="hero-banner__text">
            <span>FLUTTER</span>
            <i />
            <span>SUPABASE</span>
            <i />
            <span>IA</span>
            <i />
            <span>OCR</span>
            <i />
            <span>STRIPE</span>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as v;

.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: v.$space-5xl;
  padding-bottom: v.$space-4xl;

  &__grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: v.$space-3xl;
    align-items: center;

    @media (max-width: v.$bp-md) {
      grid-template-columns: 1fr;
      gap: v.$space-2xl;
    }
  }

  &__copy {
    display: flex;
    flex-direction: column;
    gap: v.$space-lg;
    position: relative;
    z-index: 2;
  }

  &__stage {
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 5;
    max-width: 480px;
    margin-inline: auto;

    @media (max-width: v.$bp-md) {
      max-width: 340px;
    }
  }

  &__halo {
    position: absolute;
    inset: -8%;
    background:
      radial-gradient(50% 50% at 50% 50%, rgba(67, 56, 202, 0.18), transparent 60%),
      radial-gradient(40% 40% at 70% 30%, rgba(8, 145, 178, 0.18), transparent 60%);
    filter: blur(20px);
    pointer-events: none;
  }

  &__canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  &__fallback {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-3deg);
    height: 82%;
    width: auto;
    border-radius: 28px;
    border: 6px solid #1a1a1f;
    box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.3);
    object-fit: cover;
  }
}

.hero-meta {
  display: flex;
  gap: v.$space-md;
}

.hero-title {
  display: flex;
  flex-direction: column;
  gap: 0.05em;
  font-family: v.$font-display;
  font-weight: 900;
  font-size: clamp(4rem, 12vw, 11rem);
  line-height: 0.86;
  letter-spacing: -0.04em;
  color: var(--color-text);

  &__row {
    display: flex;
    overflow: hidden;
    line-height: 0.86;

    &--small {
      font-size: clamp(2rem, 5vw, 4.5rem);
      color: var(--color-text-dim);
      font-weight: 700;
      letter-spacing: -0.025em;
    }
  }

  &__line {
    display: inline-block;
    will-change: transform;

    &--accent {
      background: linear-gradient(120deg, var(--color-indigo) 10%, var(--color-cyan) 90%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
  }
}

.hero-claim {
  max-width: 44ch;
  margin-top: v.$space-md;
}

.hero-actions {
  display: flex;
  gap: v.$space-md;
  flex-wrap: wrap;
}

.hero-banner {
  position: absolute;
  bottom: -8%;
  left: -12%;
  right: -12%;
  transform: rotate(-4deg);
  padding: v.$space-sm v.$space-md;
  overflow: hidden;
  border: 1.5px solid var(--color-border-line);
  background: var(--color-bg-soft);
  z-index: 3;

  &__bg {
    position: absolute;
    inset: 0;
    background: var(--color-text);
    transform-origin: left center;
  }

  &__text {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    gap: v.$space-md;
    font-family: v.$font-display;
    font-weight: 900;
    font-size: clamp(0.85rem, 1.4vw, 1.1rem);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #fff;
    white-space: nowrap;
    justify-content: center;
    width: 100%;

    i {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--color-cyan);
    }
  }
}

.hero-fade-enter-active,
.hero-fade-leave-active {
  transition: opacity 420ms v.$ease-out;
}
.hero-fade-enter-from,
.hero-fade-leave-to {
  opacity: 0;
}
</style>
