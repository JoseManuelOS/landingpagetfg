import { onBeforeUnmount, onMounted, shallowRef } from 'vue'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type LenisInstance = InstanceType<typeof Lenis>

export function useLenisScroll() {
  const lenis = shallowRef<LenisInstance | null>(null)

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const raf = (time: number) => {
    lenis.value?.raf(time * 1000)
  }

  onMounted(() => {
    if (prefersReduced) return
    const instance = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    })
    lenis.value = instance

    instance.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
  })

  onBeforeUnmount(() => {
    gsap.ticker.remove(raf)
    lenis.value?.destroy()
    lenis.value = null
  })

  return { lenis }
}
