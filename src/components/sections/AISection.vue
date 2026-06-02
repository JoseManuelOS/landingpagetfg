<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AppearingText from '@/components/AppearingText.vue'

gsap.registerPlugin(ScrollTrigger)

const flowRoot = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (!flowRoot.value) return
  const paths = flowRoot.value.querySelectorAll<SVGPathElement>('.ai__path')
  paths.forEach((p) => {
    const len = p.getTotalLength()
    gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
  })

  gsap.to('.ai__path', {
    strokeDashoffset: 0,
    duration: 1.1,
    ease: 'power2.out',
    stagger: 0.18,
    scrollTrigger: {
      trigger: flowRoot.value,
      start: 'top 75%',
      once: true,
    },
  })

  gsap.from('.ai__node', {
    opacity: 0,
    y: 16,
    scale: 0.92,
    duration: 0.55,
    ease: 'back.out(1.8)',
    stagger: 0.18,
    scrollTrigger: {
      trigger: flowRoot.value,
      start: 'top 78%',
      once: true,
    },
  })
})
</script>

<template>
  <section id="ai" class="section section--ai ai" data-section="ai">
    <div class="container">
      <header class="ai__head reveal">
        <span class="section-marker">
          <span>IA · OCR · AUTOMATIZACIÓN</span>
        </span>
        <h2 class="heading-display-sm">
          <AppearingText
            text="No solo guarda datos."
            :duration="0.9"
            trigger="scroll"
          />
          <br />
          <em>Los interpreta.</em>
        </h2>
      </header>

      <div class="ai__grid">
        <div class="ai__copy">
          <p class="lead reveal">
            Chat con IA que analiza el estado del hogar. OCR que convierte tickets en gastos
            categorizados. Notificaciones push y procesos backend vía Edge Functions.
          </p>

          <ul class="ai__list reveal">
            <li><span>OPENAI</span> household-ai · Edge Function</li>
            <li><span>ML KIT</span> Google · Text Recognition 0.15.0</li>
            <li><span>RLS</span> aislamiento por hogar</li>
            <li><span>FCM</span> push event-notifications</li>
          </ul>
        </div>

        <div ref="flowRoot" class="ai__flow" aria-hidden="true">
          <svg class="ai__svg" viewBox="0 0 360 360" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="ai-line" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stop-color="#F59E0B" />
                <stop offset="0.5" stop-color="#22D3EE" />
                <stop offset="1" stop-color="#10B981" />
              </linearGradient>
            </defs>
            <path class="ai__path" d="M70 60 Q 180 90 290 60" fill="none" stroke="url(#ai-line)" stroke-width="2" stroke-linecap="round" />
            <path class="ai__path" d="M290 100 Q 280 200 180 220" fill="none" stroke="url(#ai-line)" stroke-width="2" stroke-linecap="round" />
            <path class="ai__path" d="M150 240 Q 100 280 80 320" fill="none" stroke="url(#ai-line)" stroke-width="2" stroke-linecap="round" />
          </svg>

          <div class="ai__node ai__node--ticket" style="top: 0; left: 0;">
            <span class="ai__node-title">Ticket</span>
            <span class="ai__node-sub">OCR · ML Kit</span>
          </div>
          <div class="ai__node ai__node--expense" style="top: 0; right: 0;">
            <span class="ai__node-title">Gasto</span>
            <span class="ai__node-sub">categoría · miembros</span>
          </div>
          <div class="ai__node ai__node--summary" style="top: 56%; left: 30%;">
            <span class="ai__node-title">Resumen IA</span>
            <span class="ai__node-sub">household-ai</span>
          </div>
          <div class="ai__node ai__node--notif" style="bottom: 0; left: 0;">
            <span class="ai__node-title">Push</span>
            <span class="ai__node-sub">FCM</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as v;

.ai {
  &__head {
    display: flex;
    flex-direction: column;
    gap: v.$space-md;
    margin-bottom: v.$space-2xl;
    max-width: 60ch;

    em {
      font-style: italic;
      font-weight: 900;
      background: linear-gradient(120deg, #22d3ee, #818cf8);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: v.$space-3xl;
    align-items: center;

    @media (max-width: v.$bp-md) {
      grid-template-columns: 1fr;
    }
  }

  &__copy {
    display: flex;
    flex-direction: column;
    gap: v.$space-md;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: v.$space-xs;
    font-family: v.$font-mono;
    font-size: v.$fs-sm;
    margin-top: v.$space-md;

    li {
      display: grid;
      grid-template-columns: 92px 1fr;
      gap: v.$space-md;
      padding-block: v.$space-xs;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      color: rgba(255, 255, 255, 0.65);

      span {
        font-weight: 700;
        letter-spacing: 0.18em;
        color: #fff;
      }
    }
  }

  &__flow {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    max-width: 460px;
    margin-inline: auto;
  }

  &__svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  }

  &__node {
    position: absolute;
    padding: v.$space-sm v.$space-md;
    background: rgba(255, 255, 255, 0.06);
    border: 1.5px solid rgba(255, 255, 255, 0.18);
    backdrop-filter: blur(8px);
    border-radius: v.$radius-md;
    display: flex;
    flex-direction: column;
    gap: v.$space-2xs;
    z-index: 1;

    &-title {
      font-family: v.$font-display;
      font-weight: 900;
      font-size: v.$fs-sm;
      color: #fff;
    }
    &-sub {
      font-family: v.$font-mono;
      font-size: v.$fs-xs;
      color: rgba(255, 255, 255, 0.6);
    }

    &--ticket { border-color: rgba(245, 158, 11, 0.6); box-shadow: 0 0 32px -8px rgba(245, 158, 11, 0.5); }
    &--expense { border-color: rgba(16, 185, 129, 0.6); box-shadow: 0 0 32px -8px rgba(16, 185, 129, 0.5); }
    &--summary { border-color: rgba(34, 211, 238, 0.6); box-shadow: 0 0 32px -8px rgba(34, 211, 238, 0.5); }
    &--notif { border-color: rgba(129, 140, 248, 0.6); box-shadow: 0 0 32px -8px rgba(129, 140, 248, 0.5); }
  }
}
</style>
