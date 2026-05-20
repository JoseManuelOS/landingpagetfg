<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PhoneFrame from '@/components/PhoneFrame.vue'
import financeUrl from '@/assets/flatmate/screen_finanzas.png'

gsap.registerPlugin(ScrollTrigger)

const counters = reactive({ debt: 0, budget: 0, total: 0 })

const formatEur = (v: number) => `−${v.toFixed(0)} €`
const formatPct = (v: number) => `${v.toFixed(0)}%`
const formatTotal = (v: number) => `${v.toFixed(2).replace('.', ',')} €`

onMounted(() => {
  ScrollTrigger.create({
    trigger: '.finance__stats',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.to(counters, { debt: 24, duration: 1.4, ease: 'power2.out' })
      gsap.to(counters, { budget: 78, duration: 1.4, ease: 'power2.out', delay: 0.1 })
      gsap.to(counters, { total: 142.5, duration: 1.4, ease: 'power2.out', delay: 0.2 })
    },
  })
})
</script>

<template>
  <section id="finance" class="section section--finance finance" data-section="finance">
    <div class="container">
      <header class="finance__head reveal">
        <span class="section-marker">
          <span class="section-marker__num">02</span>
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

          <dl class="finance__stats">
            <div class="finance__stat finance__stat--green">
              <dt>DEUDA RESUELTA</dt>
              <dd>{{ formatEur(counters.debt) }}</dd>
            </div>
            <div class="finance__stat finance__stat--amber">
              <dt>PRESUPUESTO ABRIL</dt>
              <dd>{{ formatPct(counters.budget) }}</dd>
            </div>
            <div class="finance__stat finance__stat--indigo">
              <dt>GASTO MAYOR</dt>
              <dd>{{ formatTotal(counters.total) }}</dd>
            </div>
          </dl>
        </div>
        <div class="finance__visual">
          <PhoneFrame :src="financeUrl" alt="Pantalla de finanzas de FlatMate" accent="green" />
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
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: v.$space-xs;
    margin-top: v.$space-lg;

    @media (max-width: v.$bp-sm) {
      grid-template-columns: 1fr;
    }
  }

  &__stat {
    padding: v.$space-md;
    background: var(--color-surface);
    border: 1.5px solid var(--color-border-line);
    border-radius: v.$radius-md;
    display: flex;
    flex-direction: column;
    gap: v.$space-2xs;

    dt {
      font-family: v.$font-mono;
      font-size: 0.65rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--color-text-mute);
    }
    dd {
      font-family: v.$font-display;
      font-weight: 900;
      font-size: clamp(1.5rem, 2.5vw, 2.2rem);
      letter-spacing: -0.02em;
      line-height: 1;
    }

    &--green dd { color: var(--color-green); }
    &--amber dd { color: var(--color-amber); }
    &--indigo dd { color: var(--color-indigo); }
  }

  &__visual {
    display: flex;
    justify-content: center;
  }
}
</style>
