<script setup lang="ts">
import FeatureCard from '@/components/FeatureCard.vue'

const items = [
  {
    title: 'Gastos dispersos',
    description: 'Tickets en el grupo, notas en el móvil, anotaciones a mano: nadie sabe el total real.',
    accent: 'amber' as const,
    icon: '€',
  },
  {
    title: 'Deudas confusas',
    description: 'Quién debe a quién acaba siendo discusión. FlatMate calcula y simplifica con un algoritmo.',
    accent: 'green' as const,
    icon: '⇄',
  },
  {
    title: 'Tareas olvidadas',
    description: 'Acuerdos verbales se pierden. Las tareas asignadas con fecha y estado no.',
    accent: 'indigo' as const,
    icon: '✓',
  },
  {
    title: 'Poca visibilidad',
    description: 'Sin stats ni resumen mensual, decidir el presupuesto del mes es a ojo.',
    accent: 'cyan' as const,
    icon: '◔',
  },
]

const scatter = [
  { text: '«te debo de la cena…»', tag: 'chat' },
  { text: 'nota en la nevera', tag: 'papel' },
  { text: 'ticket sin guardar', tag: 'gasto' },
  { text: '¿pagó alguien la luz?', tag: 'duda' },
  { text: 'audio de 3 min', tag: 'grupo' },
]
</script>

<template>
  <section id="problem" class="section section--problem problem" data-section="problem">
    <div class="container">
      <div class="problem__head">
        <div class="problem__head-main reveal">
          <span class="section-marker">
            <span class="section-marker__num">01</span>
            <span>EL PROBLEMA</span>
          </span>
          <h2 class="heading-display-sm">
            En un piso compartido, todo acaba <em>repartido entre chats, notas y memoria.</em>
          </h2>
        </div>

        <aside class="problem__aside reveal">
          <p class="lead">
            FlatMate une finanzas, responsabilidades y comunicación en un espacio común por hogar.
          </p>
          <ul class="problem__scatter" aria-label="El caos actual">
            <li v-for="(s, i) in scatter" :key="s.text" :class="`problem__chip problem__chip--${i}`">
              <span class="problem__chip-tag">{{ s.tag }}</span>
              {{ s.text }}
            </li>
          </ul>
        </aside>
      </div>

      <div class="problem__grid" data-stagger>
        <FeatureCard
          v-for="i in items"
          :key="i.title"
          :title="i.title"
          :description="i.description"
          :accent="i.accent"
          :icon="i.icon"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as v;

.problem {
  &__head {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: v.$space-3xl;
    align-items: end;
    margin-bottom: v.$space-3xl;

    @media (max-width: v.$bp-lg) {
      grid-template-columns: 1fr;
      gap: v.$space-2xl;
    }
  }

  &__head-main {
    display: flex;
    flex-direction: column;
    gap: v.$space-lg;

    em {
      font-style: italic;
      font-weight: 900;
      background: linear-gradient(120deg, var(--color-indigo), var(--color-cyan));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
  }

  &__aside {
    display: flex;
    flex-direction: column;
    gap: v.$space-lg;
  }

  // Messy cluster of "scattered" info — visual of the chaos.
  &__scatter {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: v.$space-sm;
    padding-block: v.$space-sm;
  }

  &__chip {
    align-self: flex-start;
    max-width: 100%;
    display: inline-flex;
    align-items: center;
    gap: v.$space-xs;
    padding: v.$space-xs v.$space-md;
    background: var(--color-surface);
    border: 1.5px solid var(--color-border-line);
    border-radius: v.$radius-md;
    box-shadow: var(--shadow-sm);
    font-size: v.$fs-sm;
    color: var(--color-text);
    font-style: italic;

    &-tag {
      font-family: v.$font-mono;
      font-style: normal;
      font-size: 0.6rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--color-text-inverse);
      background: var(--color-text);
      padding: 2px 6px;
      border-radius: v.$radius-sm;
    }

    // Slight rotations + offsets to feel scattered/messy.
    &--0 { transform: rotate(-2.2deg); }
    &--1 { transform: rotate(1.6deg) translateX(8%); }
    &--2 { transform: rotate(-1deg) translateX(-3%); }
    &--3 { transform: rotate(2.4deg) translateX(12%); }
    &--4 { transform: rotate(-1.6deg) translateX(4%); }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: v.$space-md;
  }
}
</style>
