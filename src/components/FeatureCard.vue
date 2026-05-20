<script setup lang="ts">
interface Props {
  title: string
  description: string
  accent?: 'indigo' | 'cyan' | 'green' | 'amber'
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  accent: 'indigo',
})
</script>

<template>
  <article class="feature-card" :class="`feature-card--${props.accent}`" data-stagger-child>
    <header class="feature-card__head">
      <span v-if="props.icon" class="feature-card__icon" aria-hidden="true">{{ props.icon }}</span>
      <h3 class="feature-card__title">{{ props.title }}</h3>
    </header>
    <p class="feature-card__desc">{{ props.description }}</p>
  </article>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as v;

.feature-card {
  position: relative;
  padding: v.$space-lg;
  background: var(--color-surface);
  border: 1.5px solid var(--color-border-line);
  border-radius: v.$radius-md;
  transition: transform 280ms v.$ease-out, box-shadow 280ms v.$ease-out;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 4px;
    background: var(--accent);
    border-radius: v.$radius-md v.$radius-md 0 0;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 320ms v.$ease-out;
  }

  &:hover {
    transform: translate(-3px, -3px);
    box-shadow: 6px 6px 0 var(--color-text);
  }

  &:hover::after {
    transform: scaleX(1);
  }

  &--indigo { --accent: var(--color-indigo); }
  &--cyan { --accent: var(--color-cyan); }
  &--green { --accent: var(--color-green); }
  &--amber { --accent: var(--color-amber); }

  &__head {
    display: flex;
    align-items: center;
    gap: v.$space-sm;
    margin-bottom: v.$space-sm;
  }

  &__icon {
    width: 44px;
    height: 44px;
    display: inline-grid;
    place-items: center;
    background: var(--accent);
    color: #fff;
    border-radius: v.$radius-sm;
    font-family: v.$font-display;
    font-size: v.$fs-xl;
    font-weight: 900;
  }

  &__title {
    font-family: v.$font-display;
    font-size: v.$fs-lg;
    font-weight: 900;
    letter-spacing: -0.01em;
    color: var(--color-text);
  }

  &__desc {
    font-size: v.$fs-sm;
    color: var(--color-text-dim);
    line-height: 1.6;
  }
}
</style>
