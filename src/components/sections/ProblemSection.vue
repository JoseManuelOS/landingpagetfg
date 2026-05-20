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
</script>

<template>
  <section id="problem" class="section section--problem problem" data-section="problem">
    <div class="container">
      <header class="problem__head reveal">
        <span class="section-marker">
          <span class="section-marker__num">01</span>
          <span>EL PROBLEMA</span>
        </span>
        <h2 class="heading-display-sm">
          En un piso compartido, todo acaba <em>repartido entre chats, notas y memoria.</em>
        </h2>
        <p class="lead">
          FlatMate une finanzas, responsabilidades y comunicación en un espacio común por hogar.
        </p>
      </header>
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
    display: flex;
    flex-direction: column;
    gap: v.$space-md;
    margin-bottom: v.$space-2xl;
    max-width: 68ch;

    em {
      font-style: italic;
      font-weight: 700;
      background: linear-gradient(120deg, var(--color-indigo), var(--color-cyan));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: v.$space-md;
  }
}
</style>
