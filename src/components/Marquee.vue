<script setup lang="ts">
interface Props {
  items: string[]
  accent?: 'indigo' | 'cyan' | 'green' | 'amber'
}

const props = withDefaults(defineProps<Props>(), { accent: 'indigo' })

const duplicated = [...props.items, ...props.items]
</script>

<template>
  <div class="marquee" aria-hidden="true">
    <div class="marquee__track">
      <span v-for="(item, i) in duplicated" :key="i" class="marquee__item">
        {{ item }}
        <span class="marquee__dot" :class="`marquee__dot--${props.accent}`" />
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.marquee__dot {
  &--indigo { background: var(--color-indigo); }
  &--cyan { background: var(--color-cyan); }
  &--green { background: var(--color-green); }
  &--amber { background: var(--color-amber); }
}
</style>
