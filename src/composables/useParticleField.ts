import { onBeforeUnmount, onMounted, type Ref } from 'vue'

interface Options {
  canvas: Ref<HTMLCanvasElement | null>
  count?: number
  palette?: string[]
  speed?: number
  maxRadius?: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  color: string
  alpha: number
}

export function useParticleField({
  canvas,
  count = 36,
  palette = ['#6366F1', '#22D3EE', '#A78BFA'],
  speed = 0.12,
  maxRadius = 2.4,
}: Options) {
  let rafId = 0
  let visible = true
  let cleanup: (() => void) | null = null

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  onMounted(() => {
    if (reduced || !canvas.value) return
    const ctx = canvas.value.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let particles: Particle[] = []

    const resize = () => {
      if (!canvas.value) return
      const w = canvas.value.clientWidth
      const h = canvas.value.clientHeight
      canvas.value.width = Math.floor(w * dpr)
      canvas.value.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (particles.length === 0) spawn(w, h)
    }

    const spawn = (w: number, h: number) => {
      particles = Array.from({ length: count }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        r: 0.6 + Math.random() * maxRadius,
        color: palette[Math.floor(Math.random() * palette.length)],
        alpha: 0.15 + Math.random() * 0.45,
      }))
    }

    resize()
    const resizeObs = new ResizeObserver(resize)
    resizeObs.observe(canvas.value)

    const visObs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === canvas.value) visible = entry.isIntersecting
        }
      },
      { threshold: 0 },
    )
    visObs.observe(canvas.value)

    const tick = () => {
      rafId = requestAnimationFrame(tick)
      if (!visible || !canvas.value) return
      const w = canvas.value.clientWidth
      const h = canvas.value.clientHeight
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -8) p.x = w + 8
        if (p.x > w + 8) p.x = -8
        if (p.y < -8) p.y = h + 8
        if (p.y > h + 8) p.y = -8

        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    cleanup = () => {
      resizeObs.disconnect()
      visObs.disconnect()
    }

    tick()
  })

  onBeforeUnmount(() => {
    cancelAnimationFrame(rafId)
    cleanup?.()
  })
}
