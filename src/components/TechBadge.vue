<script setup lang="ts">
interface Props {
  label: string
  accent?: 'indigo' | 'cyan' | 'green' | 'amber' | 'neutral'
}
const props = withDefaults(defineProps<Props>(), { accent: 'neutral' })
</script>

<template>
  <span class="tech-badge" :class="`tech-badge--${props.accent}`">
    <span class="tech-badge__dot" aria-hidden="true" />
    {{ props.label }}
  </span>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as v;

.tech-badge {
  display: inline-flex;
  align-items: center;
  gap: v.$space-xs;
  padding: v.$space-2xs v.$space-sm;
  border-radius: v.$radius-pill;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  font-family: v.$font-mono;
  font-size: v.$fs-xs;
  color: var(--color-text-dim);
  letter-spacing: 0.06em;

  &__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.7;
  }

  &--indigo {
    color: var(--color-indigo);
    border-color: var(--color-indigo-soft);
    background: rgba(99, 102, 241, 0.08);
  }
  &--cyan {
    color: var(--color-cyan);
    border-color: var(--color-cyan-soft);
    background: rgba(34, 211, 238, 0.08);
  }
  &--green {
    color: var(--color-green);
    border-color: var(--color-green-soft);
    background: rgba(16, 185, 129, 0.08);
  }
  &--amber {
    color: var(--color-amber);
    border-color: var(--color-amber-soft);
    background: rgba(245, 158, 11, 0.08);
  }
}
</style>
