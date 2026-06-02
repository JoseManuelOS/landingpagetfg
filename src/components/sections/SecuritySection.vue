<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  gsap.from('.security__layer', {
    opacity: 0,
    y: 16,
    duration: 0.5,
    ease: 'power2.out',
    stagger: 0.07,
    scrollTrigger: {
      trigger: '.security__layers',
      start: 'top 78%',
      once: true,
    },
  })

  gsap.from('.security__row', {
    opacity: 0,
    x: -12,
    duration: 0.45,
    ease: 'power2.out',
    stagger: 0.05,
    scrollTrigger: {
      trigger: '.security__table',
      start: 'top 82%',
      once: true,
    },
  })
})

const layers = [
  { name: 'Cliente Flutter', tech: 'Riverpod · GoRouter · fl_chart', accent: 'indigo' },
  { name: 'Auth', tech: 'Supabase Auth · Google Sign-In', accent: 'green' },
  { name: 'Base de datos', tech: 'PostgreSQL · RLS por hogar · 19 tablas', accent: 'green' },
  { name: 'RPC', tech: 'calculate_simplified_debts · get_budget_status', accent: 'cyan' },
  { name: 'Edge Functions', tech: 'household-ai · create-payment-intent · event-notifications', accent: 'cyan' },
  { name: 'Servicios externos', tech: 'Stripe · Firebase Messaging · ML Kit', accent: 'amber' },
] as const

const rows = [
  ['Cliente', 'Flutter multiplataforma, Dart SDK 3.11, Riverpod 2.6.1, GoRouter 14.8.1'],
  ['Auth', 'Supabase Auth + Google Sign-In 7.2.0'],
  ['DB', 'PostgreSQL Supabase, 19 tablas versionadas, RLS por hogar'],
  ['RPC', 'calculate_simplified_debts, calculate_debts, get_budget_status'],
  ['Edge Functions', 'household-ai, create-payment-intent, event-notifications, subscription-reminders'],
  ['Pagos', 'Stripe 11.4.0 + PaymentIntent vía Edge Function'],
  ['Push', 'Firebase Messaging 16.1.3 + flutter_local_notifications 17.2.4'],
  ['OCR', 'Google ML Kit Text Recognition 0.15.0'],
  ['Export', 'pdf 3.12.0 + printing 5.14.3'],
]
</script>

<template>
  <section id="security" class="section section--security security" data-section="security">
    <div class="container">
      <header class="security__head reveal">
        <span class="section-marker">
          <span>ARQUITECTURA · SEGURIDAD</span>
        </span>
        <h2 class="heading-display-sm">
          Cada hogar aislado. Operaciones críticas en backend.
        </h2>
      </header>

      <div class="security__layers">
        <div
          v-for="layer in layers"
          :key="layer.name"
          class="security__layer"
          :class="`security__layer--${layer.accent}`"
        >
          <span class="security__layer-name">{{ layer.name }}</span>
          <span class="security__layer-tech">{{ layer.tech }}</span>
        </div>
      </div>

      <div class="security__table" role="table" aria-label="Stack técnico verificado">
        <div v-for="row in rows" :key="row[0]" class="security__row" role="row">
          <span class="security__cell security__cell--key" role="cell">{{ row[0] }}</span>
          <span class="security__cell" role="cell">{{ row[1] }}</span>
        </div>
      </div>
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
    max-width: 60ch;
    margin-bottom: v.$space-2xl;
  }

  &__layers {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: v.$space-xs;
    margin-bottom: v.$space-2xl;
  }

  &__layer {
    padding: v.$space-md;
    background: var(--color-surface);
    border: 1.5px solid var(--color-border-line);
    border-radius: v.$radius-md;
    display: flex;
    flex-direction: column;
    gap: v.$space-2xs;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: var(--accent);
      border-radius: v.$radius-md 0 0 v.$radius-md;
    }

    &-name {
      font-family: v.$font-display;
      font-weight: 900;
      letter-spacing: -0.01em;
    }
    &-tech {
      font-family: v.$font-mono;
      font-size: v.$fs-xs;
      color: var(--color-text-dim);
    }

    &--indigo { --accent: var(--color-indigo); }
    &--cyan { --accent: var(--color-cyan); }
    &--green { --accent: var(--color-green); }
    &--amber { --accent: var(--color-amber); }
  }

  &__table {
    display: flex;
    flex-direction: column;
    border: 1.5px solid var(--color-border-line);
    border-radius: v.$radius-md;
    overflow: hidden;
    background: var(--color-surface);
  }

  &__row {
    display: grid;
    grid-template-columns: 180px 1fr;
    border-bottom: 1px solid var(--color-border);

    &:last-child {
      border-bottom: 0;
    }

    @media (max-width: v.$bp-sm) {
      grid-template-columns: 1fr;
    }
  }

  &__cell {
    padding: v.$space-sm v.$space-md;
    font-size: v.$fs-sm;
    color: var(--color-text);

    &--key {
      background: var(--color-bg);
      color: var(--color-text);
      font-family: v.$font-mono;
      font-size: v.$fs-xs;
      text-transform: uppercase;
      letter-spacing: 0.16em;
      display: flex;
      align-items: center;
      font-weight: 700;
    }
  }
}
</style>
