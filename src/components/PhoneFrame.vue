<script setup lang="ts">
interface Props {
  src: string
  alt: string
  accent?: 'indigo' | 'cyan' | 'green' | 'amber'
}
const props = withDefaults(defineProps<Props>(), { accent: 'indigo' })
</script>

<template>
  <div class="phone-frame" :class="`phone-frame--${props.accent}`" data-parallax>
    <div class="phone-frame__bezel">
      <div class="phone-frame__notch" />
      <img :src="props.src" :alt="props.alt" loading="lazy" />
    </div>
    <div class="phone-frame__glow" aria-hidden="true" />
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as v;

.phone-frame {
  position: relative;
  width: 100%;
  max-width: 320px;
  aspect-ratio: 9 / 19.5;
  margin-inline: auto;

  &__bezel {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 36px;
    overflow: hidden;
    background: #000;
    border: 8px solid #1a1a1f;
    box-shadow:
      0 30px 60px -20px rgba(0, 0, 0, 0.6),
      0 0 0 1px var(--color-border-strong);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }
  }

  &__notch {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 38%;
    height: 22px;
    background: #000;
    border-radius: 0 0 14px 14px;
    z-index: 1;
  }

  &__glow {
    position: absolute;
    inset: -20%;
    z-index: -1;
    background: radial-gradient(circle at 50% 50%, var(--glow), transparent 60%);
    filter: blur(30px);
    opacity: 0.55;
  }

  &--indigo {
    --glow: rgba(99, 102, 241, 0.35);
  }
  &--cyan {
    --glow: rgba(34, 211, 238, 0.32);
  }
  &--green {
    --glow: rgba(16, 185, 129, 0.32);
  }
  &--amber {
    --glow: rgba(245, 158, 11, 0.32);
  }
}
</style>
