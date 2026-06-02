<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef } from 'vue'
import gsap from 'gsap'
import inicioUrl from '@/assets/flatmate/screen_inicio.png'

const root = useTemplateRef<HTMLElement>('root')
const phone = useTemplateRef<HTMLElement>('phone')
let ctx: gsap.Context | null = null

onMounted(() => {
  ctx = gsap.context(() => {
    // Entry timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('.hero__badge', { autoAlpha: 0, y: 12, duration: 0.5 })
      .from('.hero__title-line', { autoAlpha: 0, yPercent: 100, duration: 0.85, stagger: 0.1 }, '-=0.2')
      .from('.hero__claim', { autoAlpha: 0, y: 20, duration: 0.6 }, '-=0.4')
      .from('.hero__actions > *', { autoAlpha: 0, y: 16, duration: 0.45, stagger: 0.09 }, '-=0.35')
      .from('.hero__tech > *', { autoAlpha: 0, y: 10, duration: 0.4, stagger: 0.06 }, '-=0.3')
      .from('.hero__phone-wrap', { autoAlpha: 0, x: 48, duration: 0.9, ease: 'power2.out' }, 0.15)
      .from('.hero__float', { autoAlpha: 0, y: 18, scale: 0.92, duration: 0.55, stagger: 0.12, ease: 'back.out(1.6)' }, '-=0.45')
      .from('.hero__scroll', { autoAlpha: 0, duration: 0.4 }, '-=0.1')

    // Idle phone rock (sine yoyo)
    gsap.to(phone.value, {
      rotateY: 6,
      rotateX: -2,
      duration: 4.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    // Float cards bob independently
    gsap.to('.hero__float--tl', { y: -9, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    gsap.to('.hero__float--tr', { y: 10, duration: 3.8, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.7 })
    gsap.to('.hero__float--bl', { y: -7, duration: 4.1, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.2 })
    gsap.to('.hero__float--br', { y: 8, duration: 3.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.4 })
  }, root.value ?? undefined)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="hero" ref="root" class="hero section--hero" data-section="hero">
    <div class="hero__bg" aria-hidden="true">
      <span class="hero__bg-orb hero__bg-orb--a" />
      <span class="hero__bg-orb hero__bg-orb--b" />
      <span class="hero__bg-orb hero__bg-orb--c" />
    </div>

    <div class="hero__layout">
      <!-- LEFT: copy -->
      <div class="hero__copy">
        <span class="hero__badge">
          <span class="hero__badge-dot" />
          FlatMate · TFG 2026
        </span>

        <h1 class="hero__title">
          <span class="hero__title-mask"><span class="hero__title-line">Compartir</span></span>
          <span class="hero__title-mask"><span class="hero__title-line">piso.</span></span>
          <span class="hero__title-mask">
            <span class="hero__title-line hero__title-line--grad">Sin el caos.</span>
          </span>
        </h1>

        <p class="hero__claim">
          Finanzas, tareas e inteligencia artificial para gestionar un hogar compartido desde un solo lugar.
        </p>

        <div class="hero__actions">
          <a href="#story" class="button button--primary">Descubrir FlatMate</a>
          <a href="/docs/FlatMate_Memoria_TFG.pdf" download class="button hero__btn-ghost">
            Memoria TFG
          </a>
        </div>

        <ul class="hero__tech" aria-label="Stack tecnológico">
          <li>Flutter</li>
          <li>Supabase</li>
          <li>IA + OCR</li>
          <li>Stripe</li>
          <li>Firebase</li>
        </ul>
      </div>

      <!-- RIGHT: phone + floating cards -->
      <div class="hero__visual">
        <div class="hero__phone-wrap" style="perspective: 1200px">
          <!-- Floating cards OUTSIDE the phone -->
          <div class="hero__float hero__float--tl" aria-hidden="true">
            <span class="hero__float-icon">✓</span>
            <div class="hero__float-body">
              <strong>11 tareas</strong>
              <span>completadas hoy</span>
            </div>
          </div>

          <div class="hero__float hero__float--tr" aria-hidden="true">
            <span class="hero__float-icon hero__float-icon--green">€</span>
            <div class="hero__float-body">
              <strong>192,34 €</strong>
              <span>gasto mensual</span>
            </div>
          </div>

          <div class="hero__float hero__float--bl" aria-hidden="true">
            <span class="hero__float-icon hero__float-icon--cyan">✦</span>
            <div class="hero__float-body">
              <strong>RoomMate IA</strong>
              <span>activo</span>
            </div>
          </div>

          <div class="hero__float hero__float--br" aria-hidden="true">
            <span class="hero__float-icon hero__float-icon--amber">!</span>
            <div class="hero__float-body">
              <strong>Debes 0,00 €</strong>
              <span>deudas resueltas</span>
            </div>
          </div>

          <!-- Phone mockup -->
          <div ref="phone" class="hero__phone">
            <div class="hero__phone-body">
              <img :src="inicioUrl" alt="Pantalla de inicio de FlatMate" class="hero__phone-screen" draggable="false" />
            </div>
            <div class="hero__phone-glow" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>

    <a href="#story" class="hero__scroll" aria-label="Continuar">
      <span>Scroll</span><i />
    </a>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as v;

// ─── Section shell ────────────────────────────────────────────────────────────
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  background: #050507;
  color: #f5f5f7;

  &::after {
    content: '';
    position: absolute;
    inset: auto 0 0;
    height: 14%;
    z-index: 2;
    pointer-events: none;
    background: linear-gradient(to bottom, transparent, var(--color-bg));
  }
}

// ─── Background orbs ─────────────────────────────────────────────────────────
.hero__bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.hero__bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(72px);

  &--a {
    width: 52vw;
    height: 52vw;
    top: -8vw;
    right: -6vw;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.28), transparent 68%);
  }

  &--b {
    width: 36vw;
    height: 36vw;
    bottom: 0;
    right: 10vw;
    background: radial-gradient(circle, rgba(34, 211, 238, 0.16), transparent 70%);
  }

  &--c {
    width: 28vw;
    height: 28vw;
    top: 30%;
    left: 0;
    background: radial-gradient(circle, rgba(129, 140, 248, 0.14), transparent 70%);
  }
}

// ─── Layout ──────────────────────────────────────────────────────────────────
.hero__layout {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: v.$container-max;
  margin-inline: auto;
  padding: clamp(8rem, 14vh, 11rem) v.$container-pad clamp(4rem, 8vh, 6rem);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: v.$space-3xl;
  align-items: center;

  @media (max-width: v.$bp-lg) {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

// ─── Copy ────────────────────────────────────────────────────────────────────
.hero__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: v.$space-lg;

  @media (max-width: v.$bp-lg) {
    align-items: center;
  }
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: v.$space-xs;
  padding: v.$space-2xs v.$space-sm;
  border-radius: v.$radius-pill;
  border: 1px solid rgba(99, 102, 241, 0.42);
  background: rgba(99, 102, 241, 0.10);
  font-family: v.$font-mono;
  font-size: v.$fs-xs;
  letter-spacing: 0.1em;
  color: #c7c5ff;
}

.hero__badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #6366f1;
  box-shadow: 0 0 8px 2px rgba(99, 102, 241, 0.7);
  animation: pulse 2.2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.55; transform: scale(0.8); }
}

.hero__title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: v.$font-display;
  font-size: clamp(4rem, 8.5vw, 9rem);
  font-weight: 900;
  letter-spacing: -0.065em;
  line-height: 0.88;

  @media (max-width: v.$bp-lg) {
    align-items: center;
  }
}

.hero__title-mask {
  overflow: hidden;
  padding-bottom: 0.06em;
}

.hero__title-line {
  display: block;
  will-change: transform, opacity;
  color: #f5f5f7;

  &--grad {
    background: linear-gradient(110deg, #fff 10%, #a5b4fc 45%, #67e8f9 80%);
    background-clip: text;
    color: transparent;
  }
}

.hero__claim {
  max-width: 46ch;
  color: #a1a1aa;
  font-size: clamp(v.$fs-md, 1.6vw, v.$fs-xl);
  line-height: 1.5;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: v.$space-md;

  @media (max-width: v.$bp-lg) {
    justify-content: center;
  }
}

.hero__actions .button--primary {
  border-color: transparent;
  background: var(--grad-brand);
  color: #fff;

  &:hover {
    border-color: transparent;
    background: var(--grad-brand-deep);
    color: #fff;
    transform: translate(2px, -2px);
  }
}

.hero__btn-ghost {
  backdrop-filter: blur(6px);
  border-color: rgba(255, 255, 255, 0.22) !important;
  color: #c7c7cc !important;

  &:hover {
    background: rgba(255, 255, 255, 0.08) !important;
    color: #f5f5f7 !important;
  }
}

.hero__tech {
  display: flex;
  flex-wrap: wrap;
  gap: v.$space-xs;
  list-style: none;
  padding: 0;

  @media (max-width: v.$bp-lg) {
    justify-content: center;
  }

  li {
    padding: v.$space-2xs v.$space-sm;
    border-radius: v.$radius-pill;
    border: 1px solid rgba(255, 255, 255, 0.12);
    font-family: v.$font-mono;
    font-size: v.$fs-xs;
    color: #71717a;
    letter-spacing: 0.06em;
  }
}

// ─── Visual / phone ───────────────────────────────────────────────────────────
.hero__visual {
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: v.$bp-lg) {
    order: -1;
  }
}

// Wrap is wide enough to host both phone + side cards without overlap.
// Phone is centered inside; cards are anchored to wrap edges.
.hero__phone-wrap {
  position: relative;
  width: min(580px, 52vw);
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: v.$bp-xl) {
    width: min(500px, 48vw);
  }

  @media (max-width: v.$bp-lg) {
    width: min(240px, 60vw);
  }
}

.hero__phone {
  position: relative;
  width: min(240px, 24vw);
  aspect-ratio: 9 / 19.5;
  transform-style: preserve-3d;
  will-change: transform;
  flex-shrink: 0;

  @media (max-width: v.$bp-lg) {
    width: 100%;
  }
}

.hero__phone-body {
  width: 100%;
  height: 100%;
  border-radius: 44px;
  overflow: hidden;
  background: #000;
  border: 8px solid #1c1c1e;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.08),
    0 40px 80px -24px rgba(0, 0, 0, 0.7);
}

.hero__phone-screen {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
  -webkit-user-drag: none;
  user-select: none;
  pointer-events: none;
}

.hero__phone-glow {
  position: absolute;
  inset: -30%;
  z-index: -1;
  background: radial-gradient(circle at 50% 55%, rgba(99, 102, 241, 0.55), rgba(34, 211, 238, 0.18) 50%, transparent 70%);
  filter: blur(40px);
}

// ─── Floating cards ───────────────────────────────────────────────────────────
.hero__float {
  position: absolute;
  display: flex;
  align-items: center;
  gap: v.$space-xs;
  padding: v.$space-xs v.$space-md;
  background: rgba(18, 18, 24, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: v.$radius-md;
  backdrop-filter: blur(16px);
  white-space: nowrap;
  will-change: transform, opacity;

  // Anchored to wrap edges so they never overlap the centered phone.
  &--tl { top: 12%; left: 0; }
  &--tr { top: 22%; right: 0; }
  &--bl { bottom: 26%; left: 0; }
  &--br { bottom: 12%; right: 0; }

  @media (max-width: v.$bp-lg) {
    display: none;
  }
}

.hero__float-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: v.$radius-sm;
  background: rgba(99, 102, 241, 0.28);
  display: grid;
  place-items: center;
  font-size: v.$fs-sm;
  font-weight: 900;
  color: #a5b4fc;

  &--green {
    background: rgba(16, 185, 129, 0.22);
    color: #6ee7b7;
  }

  &--cyan {
    background: rgba(34, 211, 238, 0.18);
    color: #67e8f9;
  }

  &--amber {
    background: rgba(245, 158, 11, 0.20);
    color: #fcd34d;
  }
}

.hero__float-body {
  display: flex;
  flex-direction: column;
  gap: 2px;

  strong {
    font-family: v.$font-display;
    font-size: v.$fs-sm;
    font-weight: 900;
    color: #f5f5f7;
    letter-spacing: -0.02em;
  }

  span {
    font-family: v.$font-mono;
    font-size: 0.65rem;
    color: #71717a;
    letter-spacing: 0.06em;
  }
}

// ─── Scroll indicator ─────────────────────────────────────────────────────────
.hero__scroll {
  position: absolute;
  bottom: v.$space-xl;
  left: 50%;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: v.$space-xs;
  transform: translateX(-50%);
  color: #52525b;
  font-size: v.$fs-xs;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;

  i {
    position: relative;
    display: block;
    width: 1px;
    height: 36px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.1);

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: #6366f1;
      animation: hero-scroll 1.8s ease-in-out infinite;
    }
  }
}

@keyframes hero-scroll {
  from { transform: translateY(-100%); }
  to { transform: translateY(100%); }
}

@media (prefers-reduced-motion: reduce) {
  .hero__badge-dot { animation: none; }
  .hero__scroll i::after { animation: none; }
}
</style>
