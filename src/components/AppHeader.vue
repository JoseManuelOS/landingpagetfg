<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef } from 'vue'

const sections = [
  { id: 'story', label: 'Experiencia' },
  { id: 'finance', label: 'Finanzas' },
  { id: 'tasks', label: 'Tareas' },
  { id: 'ai', label: 'IA / OCR' },
  { id: 'security', label: 'Arquitectura' },
] as const

const scrolled = shallowRef(false)
const inverted = shallowRef(true)
const activeSection = shallowRef<string | null>(null)
let scrollHandler: (() => void) | null = null
let sectionObserver: IntersectionObserver | null = null

onMounted(() => {
  scrollHandler = () => {
    scrolled.value = window.scrollY > 24
    inverted.value = ['hero', 'story', 'ai', 'cta'].some((id) => {
      const section = document.getElementById(id)
      if (!section) return false
      const rect = section.getBoundingClientRect()
      return rect.top <= 42 && rect.bottom > 42
    })
  }
  scrollHandler()
  window.addEventListener('scroll', scrollHandler, { passive: true })

  sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries.find((entry) => entry.isIntersecting)
      if (visible) activeSection.value = visible.target.id
    },
    { rootMargin: '-30% 0px -55% 0px', threshold: 0 },
  )

  sections.forEach(({ id }) => {
    const element = document.getElementById(id)
    if (element) sectionObserver?.observe(element)
  })
})

onUnmounted(() => {
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
  sectionObserver?.disconnect()
})
</script>

<template>
  <header class="app-header" :class="{ 'app-header--solid': scrolled, 'app-header--inverted': inverted }">
    <a href="#hero" class="app-header__brand" aria-label="Roomate, volver al inicio">
      <img src="/meta/app-icon.png" alt="" width="40" height="40" />
      <span>Roomate</span>
    </a>
    <nav class="app-header__nav" aria-label="Secciones">
      <a
        v-for="section in sections"
        :key="section.id"
        :href="`#${section.id}`"
        class="app-header__link"
        :class="{ 'app-header__link--active': activeSection === section.id }"
      >
        {{ section.label }}
      </a>
    </nav>
    <div class="app-header__cta">
      <a href="/docs/Roomate_Memoria_TFG.pdf" download class="button button--primary">Memoria</a>
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
  height: 84px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: v.$space-lg;
  padding-inline: clamp(v.$space-md, 3vw, v.$space-xl);
  background: transparent;
  transition: background 240ms v.$ease-out, border-color 240ms, backdrop-filter 240ms;
  border-bottom: 1px solid transparent;

  &--solid {
    background: rgba(245, 239, 230, 0.84);
    backdrop-filter: blur(16px) saturate(145%);
    border-bottom-color: var(--color-border);
  }

  &--inverted {
    .app-header__brand {
      color: #f5f5f7;
    }

    .app-header__nav {
      background: rgba(28, 28, 30, 0.68);
      border-color: rgba(255, 255, 255, 0.09);
    }

    .app-header__link {
      color: #a1a1a6;

      &:hover {
        color: #f5f5f7;
      }

      &--active {
        color: #fff;
        background: var(--color-indigo);
      }
    }

    .button {
      color: #f5f5f7;
      border-color: rgba(255, 255, 255, 0.34);
      background: rgba(255, 255, 255, 0.06);

      &:hover {
        background: #f5f5f7;
        border-color: #f5f5f7;
        color: #111;
      }
    }
  }

  &--inverted.app-header--solid {
    background: rgba(5, 5, 7, 0.76);
    border-bottom-color: rgba(255, 255, 255, 0.09);
  }

  &__brand {
    display: inline-flex;
    align-items: center;
    gap: v.$space-xs;
    font-family: v.$font-display;
    font-weight: 900;
    font-size: v.$fs-xl;
    letter-spacing: -0.04em;
    color: var(--color-text);

    img {
      border-radius: 12px;
      transition: transform 240ms v.$ease-out;
    }

    &:hover img {
      transform: rotate(-6deg) scale(1.06);
    }

    @media (max-width: v.$bp-sm) {
      span {
        display: none;
      }
    }
  }

  &__nav {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: v.$space-2xs;
    padding: v.$space-2xs;
    background: rgba(241, 229, 213, 0.78);
    border: 1px solid rgba(26, 24, 21, 0.06);
    border-radius: v.$radius-pill;
    backdrop-filter: blur(10px);

    @media (max-width: v.$bp-lg) {
      display: none;
    }
  }

  &__link {
    padding: 0.62rem 1.05rem;
    border-radius: v.$radius-pill;
    font-family: v.$font-sans;
    font-size: v.$fs-sm;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--color-text-dim);
    transition: color 180ms, background 220ms v.$ease-out;

    &:hover {
      color: var(--color-text);
    }

    &--active {
      color: #fff;
      background: var(--color-indigo);
    }
  }

  &__cta {
    .button {
      padding: 0.56rem 1.15rem;
      font-size: v.$fs-xs;
    }
  }
}
</style>
