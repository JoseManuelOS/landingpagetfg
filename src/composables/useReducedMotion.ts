import { onMounted, onUnmounted, shallowRef } from 'vue'

export function useReducedMotion() {
  const prefers = shallowRef(false)
  let mq: MediaQueryList | null = null
  const update = () => {
    if (mq) prefers.value = mq.matches
  }

  onMounted(() => {
    mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefers.value = mq.matches
    mq.addEventListener('change', update)
  })

  onUnmounted(() => {
    mq?.removeEventListener('change', update)
    mq = null
  })

  return { prefers }
}
