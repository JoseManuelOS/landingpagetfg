<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef, useTemplateRef } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PhoneFrame from '@/components/PhoneFrame.vue'
import inicioUrl from '@/assets/roomate/screen_inicio.png'
import financeUrl from '@/assets/roomate/screen_finanzas.png'
import tasksUrl from '@/assets/roomate/screen_tareas.png'
import iaUrl from '@/assets/roomate/screen_ia.png'

gsap.registerPlugin(ScrollTrigger)

const chapters = [
  {
    id: 'home',
    eyebrow: 'Un hogar conectado',
    title: 'Todo tu piso. En una pantalla.',
    text: 'Balance, tareas y actividad compartida visibles desde el primer vistazo.',
    stat: '1 espacio común',
    src: inicioUrl,
    alt: 'Inicio del hogar en Roomate',
    accent: 'cyan' as const,
  },
  {
    id: 'money',
    eyebrow: 'Finanzas',
    title: 'Las cuentas, resueltas.',
    text: 'Registra gastos, reparte importes y simplifica deudas sin hojas de cálculo.',
    stat: '192,34 EUR en abril',
    src: financeUrl,
    alt: 'Finanzas compartidas en Roomate',
    accent: 'green' as const,
  },
  {
    id: 'tasks',
    eyebrow: 'Convivencia',
    title: 'Lo pendiente ya tiene dueño.',
    text: 'Tareas con prioridad, persona asignada y fecha para que acuerdos se cumplan.',
    stat: 'Responsabilidad visible',
    src: tasksUrl,
    alt: 'Gestion de tareas en Roomate',
    accent: 'indigo' as const,
  },
  {
    id: 'intelligence',
    eyebrow: 'IA y seguridad',
    title: 'Pregunta. Escanea. Decide.',
    text: 'OCR transforma tickets en gastos; IA interpreta hogar; RLS aísla cada grupo.',
    stat: 'Roomate IA · chat',
    src: iaUrl,
    alt: 'Asistente Roomate IA de Roomate',
    accent: 'cyan' as const,
  },
] as const

const root = useTemplateRef<HTMLElement>('root')
const activeIndex = shallowRef(0)
let context: gsap.Context | null = null

onMounted(() => {
  context = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>('.story__chapter').forEach((chapter, index) => {
      ScrollTrigger.create({
        trigger: chapter,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          activeIndex.value = index
        },
        onEnterBack: () => {
          activeIndex.value = index
        },
      })
    })

    gsap.fromTo(
      '.story__device-inner',
      { scale: 0.86, rotationY: -8 },
      {
        scale: 1,
        rotationY: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.story__journey',
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        },
      },
    )
  }, root.value ?? undefined)
})

onUnmounted(() => context?.revert())
</script>

<template>
  <section id="story" ref="root" class="story section--story" data-section="story">
    <header class="story__intro">
      <p class="story__kicker">La experiencia Roomate</p>
      <h2 class="story__heading">Compartir piso.<br />Ahora se siente simple.</h2>
    </header>

    <div class="story__journey">
      <div class="story__device" aria-live="polite">
        <div class="story__device-inner">
          <Transition name="screen-swap">
            <PhoneFrame
              :key="chapters[activeIndex].id"
              class="story__phone"
              :src="chapters[activeIndex].src"
              :alt="chapters[activeIndex].alt"
              :accent="chapters[activeIndex].accent"
              :parallax="false"
            />
          </Transition>
        </div>
        <p class="story__device-stat">{{ chapters[activeIndex].stat }}</p>
      </div>

      <div class="story__chapters">
        <article
          v-for="(chapter, index) in chapters"
          :key="chapter.id"
          class="story__chapter"
          :class="{ 'story__chapter--active': activeIndex === index }"
        >
          <p class="story__eyebrow">{{ chapter.eyebrow }}</p>
          <h3 class="story__title">{{ chapter.title }}</h3>
          <p class="story__text">{{ chapter.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as v;

.story {
  position: relative;
  padding: clamp(6rem, 13vw, 12rem) 0 0;
  background: #050507;
  color: #f5f5f7;

  &__intro {
    max-width: 1100px;
    margin: 0 auto clamp(5rem, 10vw, 9rem);
    padding-inline: v.$container-pad;
    text-align: center;
  }

  &__kicker {
    margin-bottom: v.$space-lg;
    color: #86868b;
    font-size: clamp(v.$fs-md, 1.6vw, v.$fs-xl);
    font-weight: 700;
  }

  &__heading {
    color: #f5f5f7;
    font-family: v.$font-display;
    font-size: clamp(2.5rem, 7vw, 6rem);
    font-weight: 900;
    letter-spacing: -0.055em;
    line-height: 0.96;
  }

  &__journey {
    position: relative;
    max-width: 1250px;
    margin-inline: auto;
    padding-inline: v.$container-pad;
    padding-bottom: 26vh;
  }

  &__device {
    position: sticky;
    top: max(5rem, calc(50vh - 360px));
    height: 0;
    pointer-events: none;
  }

  &__device-inner {
    position: relative;
    width: min(300px, 34vw);
    aspect-ratio: 9 / 19.5;
    margin-inline: auto;
    transform-style: preserve-3d;
    will-change: transform;
  }

  &__phone {
    position: absolute;
    inset: 0;
    max-width: none;
    will-change: opacity;
  }

  &__device-stat {
    width: min(300px, 34vw);
    margin: v.$space-lg auto 0;
    color: #f5f5f7;
    font-size: v.$fs-sm;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-align: center;
  }

  &__chapters {
    display: flex;
    flex-direction: column;
  }

  &__chapter {
    min-height: 76vh;
    width: min(390px, calc(50% - 200px));
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: v.$space-md;
    opacity: 0.28;
    transform: translateY(20px);
    transition: opacity 420ms v.$ease-out, transform 420ms v.$ease-out;

    &:nth-child(even) {
      align-self: flex-end;
    }

    &--active {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &__eyebrow {
    color: #86868b;
    font-size: v.$fs-sm;
    font-weight: 700;
  }

  &__title {
    color: #f5f5f7;
    font-family: v.$font-display;
    font-size: clamp(2rem, 3.6vw, 3.2rem);
    font-weight: 900;
    letter-spacing: -0.045em;
    line-height: 1.02;
  }

  &__text {
    color: #a1a1a6;
    font-size: clamp(v.$fs-md, 1.2vw, v.$fs-lg);
    line-height: 1.5;
  }

  @media (max-width: v.$bp-lg) {
    &__device {
      top: 84px;
      height: min(50vh, 460px);
      padding-top: v.$space-md;
      background: none;
      // Sit above the scrolling chapter text so it never bleeds over the phone.
      z-index: 3;

      // Full-bleed solid backdrop behind the phone; chapter text scrolls under it.
      &::before {
        content: '';
        position: absolute;
        left: 50%;
        top: -84px;
        transform: translateX(-50%);
        width: 100vw;
        height: calc(100% + 84px + 2.5rem);
        background: linear-gradient(180deg, #050507 0%, #050507 76%, rgba(5, 5, 7, 0.9) 88%, transparent 100%);
        z-index: -1;
      }
    }

    &__device-inner {
      width: min(184px, 46vw);
    }

    &__device-stat {
      width: min(184px, 46vw);
      margin-top: v.$space-xs;
    }

    &__chapters {
      padding-top: min(54vh, 500px);
    }

    &__chapter {
      min-height: 64vh;
      width: 100%;
      justify-content: flex-end;
      padding-bottom: v.$space-2xl;
      text-align: center;
    }
  }
}

.screen-swap-enter-active,
.screen-swap-leave-active {
  transition: opacity 480ms v.$ease-out;
}

.screen-swap-leave-active {
  position: absolute;
  inset: 0;
}

.screen-swap-enter-from,
.screen-swap-leave-to {
  opacity: 0;
}
</style>
