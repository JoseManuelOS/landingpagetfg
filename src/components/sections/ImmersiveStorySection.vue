<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef, useTemplateRef } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PhoneFrame from '@/components/PhoneFrame.vue'
import inicioUrl from '@/assets/flatmate/screen_inicio.png'
import financeUrl from '@/assets/flatmate/screen_finanzas.png'
import tasksUrl from '@/assets/flatmate/screen_tareas.png'
import iaUrl from '@/assets/flatmate/screen_ia.png'

gsap.registerPlugin(ScrollTrigger)

const chapters = [
  {
    id: 'home',
    eyebrow: 'Un hogar conectado',
    title: 'Todo tu piso. En una pantalla.',
    text: 'Balance, tareas y actividad compartida visibles desde el primer vistazo.',
    stat: '1 espacio común',
    src: inicioUrl,
    alt: 'Inicio del hogar en FlatMate',
    accent: 'cyan' as const,
  },
  {
    id: 'money',
    eyebrow: 'Finanzas',
    title: 'Las cuentas, resueltas.',
    text: 'Registra gastos, reparte importes y simplifica deudas sin hojas de cálculo.',
    stat: '192,34 EUR en abril',
    src: financeUrl,
    alt: 'Finanzas compartidas en FlatMate',
    accent: 'green' as const,
  },
  {
    id: 'tasks',
    eyebrow: 'Convivencia',
    title: 'Lo pendiente ya tiene dueño.',
    text: 'Tareas con prioridad, persona asignada y fecha para que acuerdos se cumplan.',
    stat: 'Responsabilidad visible',
    src: tasksUrl,
    alt: 'Gestion de tareas en FlatMate',
    accent: 'indigo' as const,
  },
  {
    id: 'intelligence',
    eyebrow: 'IA y seguridad',
    title: 'Pregunta. Escanea. Decide.',
    text: 'OCR transforma tickets en gastos; IA interpreta hogar; RLS aísla cada grupo.',
    stat: 'RoomMate IA · chat',
    src: iaUrl,
    alt: 'Asistente RoomMate IA de FlatMate',
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
      <p class="story__kicker">La experiencia FlatMate</p>
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
    font-size: clamp(3.2rem, 9.4vw, 8.5rem);
    font-weight: 900;
    letter-spacing: -0.055em;
    line-height: 0.94;
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
    font-size: clamp(2.6rem, 4.6vw, 4.2rem);
    font-weight: 900;
    letter-spacing: -0.05em;
    line-height: 1.0;
  }

  &__text {
    color: #a1a1a6;
    font-size: clamp(v.$fs-lg, 1.6vw, v.$fs-xl);
    line-height: 1.5;
  }

  @media (max-width: v.$bp-lg) {
    &__device {
      top: 94px;
      height: min(53vh, 510px);
      padding-top: v.$space-md;
      background: linear-gradient(180deg, #050507 82%, transparent);
    }

    &__device-inner {
      width: min(200px, 48vw);
    }

    &__device-stat {
      width: min(200px, 48vw);
      margin-top: v.$space-xs;
    }

    &__chapters {
      padding-top: min(55vh, 530px);
    }

    &__chapter {
      min-height: 62vh;
      width: 100%;
      justify-content: flex-end;
      padding-bottom: v.$space-3xl;
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
