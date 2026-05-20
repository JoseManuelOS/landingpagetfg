<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import iconUrl from '@/assets/flatmate/icono.png'

const scrolled = ref(false)
let handler: (() => void) | null = null

onMounted(() => {
  handler = () => {
    scrolled.value = window.scrollY > 24
  }
  handler()
  window.addEventListener('scroll', handler, { passive: true })
})

onUnmounted(() => {
  if (handler) window.removeEventListener('scroll', handler)
})
</script>

<template>
  <header class="app-header" :class="{ 'app-header--solid': scrolled }">
    <a href="#hero" class="app-header__brand" aria-label="FlatMate">
      <img :src="iconUrl" alt="" width="28" height="28" />
      <span>FlatMate</span>
    </a>
    <nav class="app-header__nav" aria-label="Secciones">
      <a href="#finance">Finanzas</a>
      <a href="#tasks">Tareas</a>
      <a href="#ai">IA / OCR</a>
      <a href="#security">Arquitectura</a>
    </nav>
    <div class="app-header__cta">
      <!-- URL placeholder hasta confirmar repositorio público y memoria final -->
      <a href="#" class="button button--primary">Ver memoria</a>
    </div>
  </header>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as v;

.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: v.$z-header;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: v.$space-lg;
  padding: v.$space-md v.$space-xl;
  background: transparent;
  transition: background 240ms v.$ease-out, border-color 240ms, backdrop-filter 240ms;
  border-bottom: 1.5px solid transparent;

  &--solid {
    background: rgba(245, 239, 230, 0.86);
    backdrop-filter: blur(14px) saturate(140%);
    border-bottom-color: var(--color-border-line);
  }

  &__brand {
    display: inline-flex;
    align-items: center;
    gap: v.$space-xs;
    font-family: v.$font-display;
    font-weight: 900;
    font-size: v.$fs-md;
    letter-spacing: -0.01em;
    color: var(--color-text);

    img {
      border-radius: v.$radius-sm;
      transition: transform 240ms v.$ease-out;
    }

    &:hover img {
      transform: rotate(-8deg) scale(1.06);
    }
  }

  &__nav {
    display: flex;
    gap: v.$space-xl;
    font-family: v.$font-mono;
    font-size: v.$fs-xs;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: var(--color-text-dim);

    a {
      position: relative;
      transition: color 180ms;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: -4px;
        height: 1px;
        background: currentColor;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 240ms v.$ease-out;
      }

      &:hover {
        color: var(--color-text);
      }

      &:hover::after {
        transform: scaleX(1);
      }
    }

    @media (max-width: v.$bp-md) {
      display: none;
    }
  }

  &__cta {
    .button {
      padding: 0.5rem 1.1rem;
      font-size: v.$fs-xs;
    }
  }
}
</style>
