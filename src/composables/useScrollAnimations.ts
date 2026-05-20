import { onBeforeUnmount, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimations() {
  onMounted(() => {
    gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 84%',
            once: true,
          },
        },
      )
    })

    gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
      const children = group.querySelectorAll<HTMLElement>('[data-stagger-child]')
      if (!children.length) return
      gsap.fromTo(
        children,
        { opacity: 0, y: 28, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: group,
            start: 'top 80%',
            once: true,
          },
        },
      )
    })

    gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
      gsap.to(el, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    ScrollTrigger.refresh()
  })

  onBeforeUnmount(() => {
    ScrollTrigger.getAll().forEach((t) => t.kill())
  })
}
