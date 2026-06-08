<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PhoneFrame from '@/components/PhoneFrame.vue'
import statsUrl from '@/assets/roomate/screen_stats.png'

gsap.registerPlugin(ScrollTrigger)

const counters = reactive({ monthly: 0, receivable: 0, owed: 66.06 })

const formatEur = (value: number) => `${value.toFixed(2).replace('.', ',')} EUR`

onMounted(() => {
  ScrollTrigger.create({
    trigger: '.finance__stats',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.to(counters, { monthly: 192.34, duration: 1.4, ease: 'power2.out' })
      gsap.to(counters, { receivable: 126.28, duration: 1.4, ease: 'power2.out', delay: 0.1 })
      gsap.to(counters, { owed: 0, duration: 1.4, ease: 'power2.out', delay: 0.2 })
    },
  })
})
</script>

<template>
  <section id="finance" class="section section--finance finance" data-section="finance">
    <div class="container">
      <header class="finance__head reveal">
        <span class="section-marker">
          <span>FINANZAS</span>
        </span>
        <h2 class="heading-display-sm">
          Cada gasto, cada deuda, cada presupuesto.
        </h2>
      </header>

      <div class="finance__grid">
        <div class="finance__copy">
          <p class="lead reveal">
            Registra gastos, reparte importes y entiende el mes con presupuestos, stats y reportes
            exportables a PDF.
          </p>
          <ul class="finance__bullets reveal">
            <li><strong>Reparto por miembros</strong> con división equitativa o ponderada.</li>
            <li><strong>Deudas simplificadas</strong> vía RPC <code>calculate_simplified_debts</code>.</li>
            <li><strong>Presupuestos mensuales</strong> con alertas por categoría.</li>
            <li><strong>Stats con fl_chart</strong> y export PDF del informe mensual.</li>
          </ul>

          <div class="finance__stats">
            <div class="finance__balance">
              <span class="finance__balance-label">GASTO TOTAL · ABRIL 2026</span>
              <strong class="finance__balance-value">{{ formatEur(counters.monthly) }}</strong>
              <div class="finance__chips">
                <span class="finance__chip finance__chip--green">
                  Te deben {{ formatEur(counters.receivable) }}
                </span>
                <span class="finance__chip finance__chip--amber">
                  Debes {{ formatEur(counters.owed) }}
                </span>
              </div>
            </div>
          </div>
          <p class="finance__sample">Datos de la captura de demostración · abril 2026</p>
        </div>
        <div class="finance__visual">
          <PhoneFrame :src="statsUrl" alt="Estadísticas de gastos de Roomate" accent="green" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as v;

.finance {
  &__head {
    display: flex;
    flex-direction: column;
    gap: v.$space-md;
    margin-bottom: v.$space-2xl;
    max-width: 60ch;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: v.$space-3xl;
    align-items: start;

    @media (max-width: v.$bp-md) {
      grid-template-columns: 1fr;
    }
  }

  &__copy {
    display: flex;
    flex-direction: column;
    gap: v.$space-md;
  }

  &__bullets {
    display: flex;
    flex-direction: column;
    gap: v.$space-xs;
    color: var(--color-text-dim);
    font-size: v.$fs-md;

    strong {
      color: var(--color-text);
      font-weight: 700;
    }
    code {
      font-family: v.$font-mono;
      color: var(--color-cyan);
      background: var(--color-surface);
      padding: 0 v.$space-2xs;
      border-radius: v.$radius-sm;
      border: 1px solid var(--color-border);
    }
  }

  &__stats {
    margin-top: v.$space-lg;
  }

  &__balance {
    position: relative;
    overflow: hidden;
    padding: v.$space-lg;
    border-radius: v.$radius-lg;
    background: var(--grad-brand-deep);
    box-shadow: var(--shadow-brand);
    color: #fff;
    display: flex;
    flex-direction: column;
    gap: v.$space-sm;

    &::after {
      content: '';
      position: absolute;
      top: -40%;
      right: -10%;
      width: 60%;
      height: 160%;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.18), transparent 60%);
      pointer-events: none;
    }
  }

  &__balance-label {
    font-family: v.$font-mono;
    font-size: 0.7rem;
    letter-spacing: 0.18em;
    color: rgba(255, 255, 255, 0.78);
  }

  &__balance-value {
    font-family: v.$font-display;
    font-weight: 900;
    font-size: clamp(2.2rem, 4.3vw, 3.3rem);
    letter-spacing: -0.03em;
    line-height: 0.95;
  }

  &__chips {
    display: flex;
    flex-wrap: wrap;
    gap: v.$space-xs;
    margin-top: v.$space-2xs;
  }

  &__chip {
    padding: v.$space-2xs v.$space-sm;
    border-radius: v.$radius-pill;
    background: rgba(255, 255, 255, 0.16);
    backdrop-filter: blur(4px);
    font-family: v.$font-mono;
    font-size: v.$fs-xs;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: #fff;
    display: inline-flex;
    align-items: center;
    gap: v.$space-2xs;

    &::before {
      content: '';
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: currentColor;
    }

    &--green { color: #6ee7b7; }
    &--amber { color: #fcd34d; }
  }

  &__sample {
    margin-top: v.$space-xs;
    color: var(--color-text-mute);
    font-family: v.$font-mono;
    font-size: v.$fs-xs;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  &__visual {
    display: flex;
    justify-content: center;
    margin-top: clamp(-4rem, -5vw, -2rem);

    @media (max-width: v.$bp-md) {
      margin-top: 0;
    }
  }
}
</style>
