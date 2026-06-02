<script setup lang="ts">
import { computed, onMounted, onUnmounted, useTemplateRef } from 'vue'
import gsap from 'gsap'
import inicioUrl from '@/assets/flatmate/screen_inicio.png'
import { useReducedMotion } from '@/composables/useReducedMotion'
import { useThreeScene } from '@/composables/useThreeScene'

const root = useTemplateRef<HTMLElement>('root')
const threeCanvas = useTemplateRef<HTMLCanvasElement>('threeCanvas')
const { prefers } = useReducedMotion()
const sceneEnabled = computed(() => !prefers.value)
const { ready: sceneReady } = useThreeScene({ canvas: threeCanvas, enabled: sceneEnabled })
const showFallback = computed(() => !sceneEnabled.value || !sceneReady.value)
let context: gsap.Context | null = null

onMounted(() => {
  context = gsap.context(() => {
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
    timeline
      .from('.hero__eyebrow', { autoAlpha: 0, y: 16, duration: 0.55 })
      .from('.hero__title-line', { autoAlpha: 0, yPercent: 70, duration: 0.9, stagger: 0.1 }, '-=0.25')
      .from('.hero__claim', { autoAlpha: 0, y: 22, duration: 0.6 }, '-=0.42')
      .from('.hero__actions > *', { autoAlpha: 0, y: 18, duration: 0.5, stagger: 0.08 }, '-=0.32')
      .from('.hero__stage', { autoAlpha: 0, y: 60, scale: 0.9, duration: 1.15 }, '-=0.25')
      .from('.hero__signal', { autoAlpha: 0, y: 12, duration: 0.45, stagger: 0.1 }, '-=0.5')
      .from('.hero__scroll', { autoAlpha: 0, duration: 0.45 }, '-=0.15')
  }, root.value ?? undefined)
})

onUnmounted(() => context?.revert())
</script>

<template>
  <section id="hero" ref="root" class="hero section--hero" data-section="hero">
    <div class="hero__top">
      <p class="hero__eyebrow">FlatMate <span>TFG 2026</span></p>
      <h1 class="hero__title">
        <span class="hero__title-mask"><span class="hero__title-line">Compartir piso.</span></span>
        <span class="hero__title-mask">
          <span class="hero__title-line hero__title-line--light">Sin el caos.</span>
        </span>
      </h1>
      <p class="hero__claim">
        Finanzas, tareas e inteligencia para gestionar un hogar compartido.
      </p>
      <div class="hero__actions">
        <a href="#story" class="button button--primary">Descubrir FlatMate</a>
        <a href="/docs/FlatMate_Memoria_TFG.pdf" download class="button">Memoria TFG</a>
      </div>
    </div>

    <div class="hero__stage">
      <div class="hero__halo" aria-hidden="true" />
      <canvas ref="threeCanvas" class="hero__canvas" aria-hidden="true" />
      <Transition name="hero-fade">
        <img v-if="showFallback" :src="inicioUrl" alt="Panel principal de FlatMate" class="hero__fallback" />
      </Transition>

      <div class="hero__signal hero__signal--left">
        <strong>OCR + IA</strong>
        <span>tickets interpretados</span>
      </div>
      <div class="hero__signal hero__signal--right">
        <strong>RLS</strong>
        <span>19 tablas protegidas</span>
      </div>
    </div>

    <a href="#story" class="hero__scroll" aria-label="Continuar a la experiencia">
      <span>Scroll</span>
      <i />
    </a>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as v;

.hero {
  position: relative;
  min-height: 128svh;
  padding: clamp(8.5rem, 14vh, 11rem) v.$container-pad clamp(3rem, 8vh, 6rem);
  overflow: hidden;
  background: #050507;
  color: #f5f5f7;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 22%;
    z-index: 1;
    pointer-events: none;
    background: linear-gradient(180deg, transparent, var(--color-bg));
  }

  &__top {
    position: relative;
    z-index: 3;
    max-width: 1080px;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  &__eyebrow {
    display: flex;
    align-items: center;
    gap: v.$space-sm;
    margin-bottom: clamp(1.4rem, 3vw, 2.2rem);
    font-size: clamp(v.$fs-md, 1.5vw, v.$fs-lg);
    font-weight: 700;
    color: #f5f5f7;

    span {
      padding-left: v.$space-sm;
      border-left: 1px solid rgba(255, 255, 255, 0.28);
      color: #86868b;
      font-weight: 500;
    }
  }

  &__title {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #f5f5f7;
    font-family: v.$font-display;
    font-size: clamp(3.6rem, 11.8vw, 11.5rem);
    font-weight: 900;
    letter-spacing: -0.065em;
    line-height: 0.88;
  }

  &__title-mask {
    overflow: hidden;
    padding-inline: 0.06em;
    padding-bottom: 0.07em;
  }

  &__title-line {
    display: block;
    will-change: transform, opacity;

    &--light {
      background: linear-gradient(110deg, #fff 14%, #9da5ff 48%, #42d8ff 78%);
      background-clip: text;
      color: transparent;
    }
  }

  &__claim {
    margin-top: clamp(1.25rem, 3vw, 2.2rem);
    max-width: 560px;
    color: #a1a1a6;
    font-size: clamp(v.$fs-md, 1.7vw, v.$fs-xl);
    line-height: 1.45;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: v.$space-md;
    margin-top: clamp(1.6rem, 3.5vw, 2.5rem);

    .button {
      border-color: rgba(255, 255, 255, 0.34);
      color: #f5f5f7;
    }

    .button--primary {
      border-color: transparent;
      background: var(--grad-brand);
      color: #fff;

      &:hover {
        border-color: transparent;
        background: var(--grad-brand-deep);
      }
    }
  }

  &__stage {
    position: relative;
    height: clamp(420px, 67vh, 720px);
    max-width: 790px;
    margin: clamp(2.4rem, 6vh, 4rem) auto 0;
  }

  &__halo {
    position: absolute;
    inset: 12% 0 0;
    background:
      radial-gradient(circle at 50% 36%, rgba(99, 102, 241, 0.32), transparent 32%),
      radial-gradient(circle at 38% 58%, rgba(129, 140, 248, 0.20), transparent 46%),
      radial-gradient(circle at 64% 64%, rgba(8, 145, 178, 0.18), transparent 48%);
    filter: blur(38px);
  }

  &__canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  &__fallback {
    position: absolute;
    top: 50%;
    left: 50%;
    height: min(88%, 640px);
    width: auto;
    transform: translate(-50%, -50%);
    border: 7px solid #151518;
    border-radius: 38px;
    object-fit: cover;
    box-shadow: 0 50px 130px -42px rgba(60, 116, 255, 0.64);
  }

  &__signal {
    position: absolute;
    top: 48%;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    color: #86868b;
    font-size: v.$fs-sm;

    strong {
      color: #f5f5f7;
      font-size: clamp(1.45rem, 3vw, 2.15rem);
      font-weight: 700;
      letter-spacing: -0.035em;
    }

    &--left {
      left: 4%;
      text-align: right;
    }

    &--right {
      right: 4%;
    }
  }

  &__scroll {
    position: absolute;
    bottom: v.$space-xl;
    left: 50%;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: v.$space-xs;
    transform: translateX(-50%);
    color: #86868b;
    font-size: v.$fs-xs;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;

    i {
      position: relative;
      display: block;
      width: 1px;
      height: 38px;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.16);

      &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: #f5f5f7;
        animation: hero-scroll 1.8s ease-in-out infinite;
      }
    }
  }

  @media (max-width: v.$bp-sm) {
    min-height: 114svh;

    &__stage {
      height: clamp(350px, 52vh, 510px);
    }

    &__signal {
      top: auto;
      bottom: 2%;

      strong {
        font-size: v.$fs-lg;
      }

      &--left {
        left: 0;
      }

      &--right {
        right: 0;
      }
    }
  }
}

.hero-fade-enter-active,
.hero-fade-leave-active {
  transition: opacity 350ms ease;
}

.hero-fade-enter-from,
.hero-fade-leave-to {
  opacity: 0;
}

@keyframes hero-scroll {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(100%);
  }
}
</style>
