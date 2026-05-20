<script setup lang="ts">
import AppearingText from '@/components/AppearingText.vue'
</script>

<template>
  <section id="cta" class="section section--cta cta" data-section="cta">
    <div class="container cta__inner">
      <span class="section-marker">
        <span class="section-marker__num">07</span>
        <span>CIERRE</span>
      </span>

      <h2 class="cta__title">
        <AppearingText text="Listo para evaluar," :duration="0.8" trigger="scroll" />
        <br />
        <span class="cta__title-accent">usar y crecer.</span>
      </h2>

      <p class="cta__sub">
        FlatMate · TFG 2026 — Flutter, Supabase, IA y OCR de extremo a extremo.
      </p>

      <div class="cta__actions">
        <!-- URL placeholder hasta confirmar repositorio público y memoria final -->
        <a href="#" class="button button--primary">Ver repositorio</a>
        <a href="#" class="button">Descargar memoria</a>
        <a href="#" class="button button--ghost">Contactar</a>
      </div>
    </div>

    <footer class="cta__foot">
      <span>© 2026 · José Manuel Ortega Soto</span>
      <span class="cta__foot-meta">Hecho con Vue 3 · GSAP · Lenis · Three.js</span>
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
    font-size: clamp(3rem, 9vw, 8rem);
    line-height: 0.88;
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
