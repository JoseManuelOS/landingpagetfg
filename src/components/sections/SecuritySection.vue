<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const layers = [
  {
    name: 'Cliente Flutter',
    role: 'UI multiplataforma y estado',
    accent: 'indigo',
    badges: ['Flutter', 'Dart 3.11', 'Riverpod 2.6.1', 'GoRouter 14.8.1', 'fl_chart 0.70.2'],
  },
  {
    name: 'Autenticación',
    role: 'Identidad y sesión',
    accent: 'cyan',
    badges: ['Supabase Auth', 'Google Sign-In 7.2.0'],
  },
  {
    name: 'Base de datos',
    role: 'Aislamiento por hogar con RLS',
    accent: 'green',
    badges: ['PostgreSQL', '19 tablas', 'RLS por hogar'],
  },
  {
    name: 'Lógica en BD · RPC',
    role: 'Cálculos críticos en el servidor',
    accent: 'green',
    badges: ['calculate_simplified_debts', 'calculate_debts', 'get_budget_status'],
  },
  {
    name: 'Edge Functions',
    role: 'Procesos backend y secretos',
    accent: 'cyan',
    badges: ['household-ai', 'create-payment-intent', 'event-notifications', 'subscription-reminders'],
  },
  {
    name: 'Servicios externos',
    role: 'Pagos, push y OCR',
    accent: 'amber',
    badges: ['Stripe 11.4.0', 'Firebase Messaging 16.1.3', 'ML Kit 0.15.0', 'pdf + printing'],
  },
] as const

onMounted(() => {
  gsap.from('.security__layer', {
    opacity: 0,
    x: -24,
    duration: 0.5,
    ease: 'power2.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.security__stack',
      start: 'top 78%',
      once: true,
    },
  })

  gsap.fromTo(
    '.security__spine-fill',
    { scaleY: 0 },
    {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.security__stack',
        start: 'top 70%',
        end: 'bottom 70%',
        scrub: true,
      },
    },
  )
})
</script>

<template>
  <section id="security" class="section section--security security" data-section="security">
    <div class="container">
      <header class="security__head reveal">
        <span class="section-marker">
          <span>ARQUITECTURA · SEGURIDAD</span>
        </span>
        <h2 class="heading-display-sm">Cada hogar aislado. Lo crítico, en backend.</h2>
        <p class="lead">
          Una arquitectura por capas pensada para datos sensibles: cada hogar ve solo su
          información y las operaciones importantes viven en el servidor, nunca en el cliente.
        </p>
      </header>

      <ol class="security__stack">
        <div class="security__spine" aria-hidden="true">
          <span class="security__spine-fill" />
        </div>

        <li
          v-for="(layer, i) in layers"
          :key="layer.name"
          class="security__layer"
          :class="`security__layer--${layer.accent}`"
        >
          <span class="security__node">{{ String(i + 1).padStart(2, '0') }}</span>
          <div class="security__card">
            <div class="security__card-head">
              <h3 class="security__name">{{ layer.name }}</h3>
              <p class="security__role">{{ layer.role }}</p>
            </div>
            <ul class="security__badges">
              <li v-for="b in layer.badges" :key="b">{{ b }}</li>
            </ul>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as v;

.security {
  &__head {
    display: flex;
    flex-direction: column;
    gap: v.$space-md;
    max-width: 64ch;
    margin-bottom: v.$space-3xl;
  }

  &__stack {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: v.$space-md;
  }

  // Vertical spine connecting the layer nodes.
  &__spine {
    position: absolute;
    left: 27px;
    top: 28px;
    bottom: 28px;
    width: 2px;
    background: var(--color-border-strong);

    @media (max-width: v.$bp-sm) {
      left: 21px;
    }
  }

  &__spine-fill {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, var(--color-indigo), var(--color-cyan), var(--color-green), var(--color-amber));
    transform-origin: top;
  }

  &__layer {
    position: relative;
    display: grid;
    grid-template-columns: 56px 1fr;
    gap: v.$space-md;
    align-items: stretch;

    @media (max-width: v.$bp-sm) {
      grid-template-columns: 44px 1fr;
      gap: v.$space-sm;
    }
  }

  &__node {
    position: relative;
    z-index: 1;
    width: 56px;
    height: 56px;
    flex-shrink: 0;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--color-surface);
    border: 2px solid var(--accent);
    color: var(--accent);
    font-family: v.$font-mono;
    font-weight: 700;
    font-size: v.$fs-sm;
    box-shadow: var(--shadow-sm);

    @media (max-width: v.$bp-sm) {
      width: 44px;
      height: 44px;
      font-size: v.$fs-xs;
    }
  }

  &__card {
    background: var(--color-surface);
    border: 1.5px solid var(--color-border-line);
    border-left: 4px solid var(--accent);
    border-radius: v.$radius-md;
    box-shadow: var(--shadow-sm);
    padding: v.$space-md v.$space-lg;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: v.$space-sm v.$space-lg;
  }

  &__card-head {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__name {
    font-family: v.$font-display;
    font-weight: 900;
    font-size: v.$fs-xl;
    letter-spacing: -0.02em;
    color: var(--color-text);
  }

  &__role {
    font-size: v.$fs-sm;
    color: var(--color-text-dim);
  }

  &__badges {
    display: flex;
    flex-wrap: wrap;
    gap: v.$space-2xs;
    list-style: none;
    margin: 0;
    padding: 0;
    justify-content: flex-end;

    li {
      font-family: v.$font-mono;
      font-size: v.$fs-xs;
      letter-spacing: 0.02em;
      color: var(--color-text-dim);
      padding: 4px 10px;
      border: 1px solid var(--color-border-strong);
      border-radius: v.$radius-pill;
      background: var(--color-bg);
    }
  }

  &__layer--indigo { --accent: var(--color-indigo); }
  &__layer--cyan { --accent: var(--color-cyan); }
  &__layer--green { --accent: var(--color-green); }
  &__layer--amber { --accent: var(--color-amber); }

  @media (max-width: v.$bp-md) {
    &__card {
      flex-direction: column;
      align-items: flex-start;
    }

    &__badges {
      justify-content: flex-start;
    }
  }
}
</style>
