<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AppearingText from '@/components/AppearingText.vue'

gsap.registerPlugin(ScrollTrigger)

const root = useTemplateRef<HTMLElement>('root')
let ctx: gsap.Context | null = null

onMounted(() => {
  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root.value,
        start: 'top 78%',
        once: true,
      },
      defaults: { ease: 'power3.out' },
    })
    tl.from('.cta__title', { autoAlpha: 0, y: 40, duration: 0.75 })
      .from('.cta__sub', { autoAlpha: 0, y: 20, duration: 0.55 }, '-=0.38')
      .from('.cta__actions > *', { autoAlpha: 0, y: 18, duration: 0.45, stagger: 0.1 }, '-=0.28')
  }, root.value ?? undefined)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="cta" ref="root" class="section section--cta cta" data-section="cta">
    <div class="container cta__inner">
      <span class="section-marker">
        <span>CIERRE</span>
      </span>

      <h2 class="cta__title">
        <AppearingText text="Listo para evaluar," :duration="0.8" trigger="scroll" />
        <br />
        <span class="cta__title-accent">usar y crecer.</span>
      </h2>

      <p class="cta__sub">
        FlatMate · TFG 2026 - Flutter, Supabase, IA y OCR de extremo a extremo.
      </p>

      <div class="cta__actions">
        <a
          href="https://github.com/JoseManuelOS/TFG"
          target="_blank"
          rel="noopener noreferrer"
          class="button button--primary"
        >
          Ver código
        </a>
        <a href="/docs/FlatMate_Memoria_TFG.pdf" download class="button">Descargar memoria</a>
        <a href="#hero" class="button button--ghost">Volver arriba</a>
      </div>
    </div>

    <footer class="cta__foot">
      <span>© 2026 · José Manuel Ortega Soto</span>
      <span class="cta__foot-meta">Landing con Vue 3 · GSAP · Lenis · Three.js</span>
    </footer>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as v;

.cta {
  padding-block: v.$space-5xl v.$space-2xl;
  color: var(--color-text-inverse);

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: v.$space-lg;
    max-width: 1100px;
  }

  &__title {
    font-family: v.$font-display;
    font-weight: 900;
    font-size: clamp(2.3rem, 6.8vw, 6rem);
    line-height: 0.92;
    letter-spacing: -0.04em;
    color: #fff;

    &-accent {
      background: linear-gradient(120deg, #22d3ee, #818cf8);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
  }

  &__sub {
    font-size: clamp(v.$fs-md, 1.4vw, v.$fs-lg);
    color: rgba(255, 255, 255, 0.7);
    max-width: 60ch;
  }

  &__actions {
    display: flex;
    gap: v.$space-md;
    flex-wrap: wrap;
    margin-top: v.$space-md;

    .button {
      border-color: #fff;
      color: #fff;

      &:hover {
        background: #fff;
        color: var(--color-navy);
        border-color: #fff;
      }
    }

    .button--primary {
      background: #fff;
      color: var(--color-navy);
      &:hover {
        background: var(--color-cyan);
        border-color: var(--color-cyan);
        color: #fff;
      }
    }

    .button--ghost {
      border-color: transparent;
      &:hover {
        border-color: rgba(255, 255, 255, 0.5);
        background: transparent;
        color: #fff;
      }
    }
  }

  &__foot {
    margin-top: v.$space-4xl;
    padding-top: v.$space-lg;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    display: flex;
    justify-content: space-between;
    gap: v.$space-md;
    font-size: v.$fs-xs;
    color: rgba(255, 255, 255, 0.5);
    font-family: v.$font-mono;
    letter-spacing: 0.06em;
    padding-inline: v.$container-pad;
    max-width: v.$container-max;
    margin-inline: auto;

    @media (max-width: v.$bp-sm) {
      flex-direction: column;
    }
  }
}
</style>
