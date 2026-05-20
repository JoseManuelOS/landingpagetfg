<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PhoneFrame from '@/components/PhoneFrame.vue'
import tasksUrl from '@/assets/flatmate/screen_tareas.png'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  gsap.from('.tasks__row', {
    xPercent: -8,
    opacity: 0,
    duration: 0.55,
    ease: 'power2.out',
    stagger: 0.12,
    scrollTrigger: {
      trigger: '.tasks__timeline',
      start: 'top 80%',
      once: true,
    },
  })
})

const timeline = [
  { state: 'HOY', accent: 'indigo', items: ['Tirar reciclaje', 'Pasar aspirador salón'] },
  { state: 'ESTA SEMANA', accent: 'cyan', items: ['Llamar al casero · 2 personas', 'Compra grande'] },
  { state: 'MÁS TARDE', accent: 'amber', items: ['Revisar contrato luz', 'Pintar pared cocina'] },
]
</script>

<template>
  <section id="tasks" class="section section--tasks tasks" data-section="tasks">
    <div class="container">
      <header class="tasks__head reveal">
        <span class="section-marker">
          <span class="section-marker__num">03</span>
          <span>CONVIVENCIA</span>
        </span>
        <h2 class="heading-display-sm">
          Acuerdos del piso convertidos en tareas con dueño y fecha.
        </h2>
      </header>

      <div class="tasks__grid">
        <div class="tasks__visual">
          <PhoneFrame :src="tasksUrl" alt="Pantalla de tareas de FlatMate" accent="indigo" />
        </div>
        <div class="tasks__copy">
          <p class="lead reveal">
            Filtros por persona, vista calendario, prioridades y fechas. Lista de compra compartida y
            actividad reciente del hogar.
          </p>
          <ol class="tasks__timeline">
            <li
              v-for="row in timeline"
              :key="row.state"
              class="tasks__row"
              :class="`tasks__row--${row.accent}`"
            >
              <span class="tasks__state">{{ row.state }}</span>
              <ul class="tasks__items">
                <li v-for="t in row.items" :key="t">{{ t }}</li>
              </ul>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as v;

.tasks {
  &__head {
    display: flex;
    flex-direction: column;
    gap: v.$space-md;
    margin-bottom: v.$space-2xl;
    max-width: 60ch;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
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

  &__visual {
    display: flex;
    justify-content: center;
    @media (max-width: v.$bp-md) {
      order: 2;
    }
  }

  &__timeline {
    display: flex;
    flex-direction: column;
    gap: v.$space-sm;
    margin-top: v.$space-md;
  }

  &__row {
    display: grid;
    grid-template-columns: 140px 1fr;
    align-items: start;
    gap: v.$space-md;
    padding: v.$space-md;
    background: var(--color-surface);
    border: 1.5px solid var(--color-border-line);
    border-radius: v.$radius-md;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: -1.5px;
      top: 0;
      bottom: 0;
      width: 4px;
      background: var(--accent);
      border-radius: v.$radius-md 0 0 v.$radius-md;
    }

    &--indigo { --accent: var(--color-indigo); }
    &--cyan { --accent: var(--color-cyan); }
    &--amber { --accent: var(--color-amber); }
  }

  &__state {
    font-family: v.$font-mono;
    font-size: v.$fs-xs;
    letter-spacing: 0.18em;
    color: var(--accent);
    font-weight: 700;
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: v.$space-2xs;
    color: var(--color-text);
    font-size: v.$fs-sm;
  }
}
</style>
