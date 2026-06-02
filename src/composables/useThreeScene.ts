import { onBeforeUnmount, onMounted, shallowRef, type Ref } from 'vue'
import inicioUrl from '@/assets/flatmate/screen_inicio.png'
import finanzasUrl from '@/assets/flatmate/screen_finanzas.png'
import tareasUrl from '@/assets/flatmate/screen_tareas.png'

interface Options {
  canvas: Readonly<Ref<HTMLCanvasElement | null>>
  enabled: Readonly<Ref<boolean>>
}

export function useThreeScene({ canvas, enabled }: Options) {
  const ready = shallowRef(false)

  let rafId = 0
  let visible = true
  let cleanup: (() => void) | null = null

  onMounted(async () => {
    if (!enabled.value || !canvas.value) return

    const [{ createSceneContext }, { createPhoneMockup }, gsapMod] = await Promise.all([
      import('@/three/core/scene'),
      import('@/three/objects/phoneMockup'),
      import('gsap'),
    ])

    if (!canvas.value) return

    const context = createSceneContext(canvas.value)
    const phone = await createPhoneMockup([
      { key: 'inicio', url: inicioUrl },
      { key: 'finanzas', url: finanzasUrl },
      { key: 'tareas', url: tareasUrl },
    ])
    context.scene.add(phone.group)

    // Hero idle: subtle floating yaw
    const idleTween = gsapMod.default.to(phone.group.rotation, {
      y: 0.18,
      duration: 4.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    const cursor = { x: 0, y: 0 }
    const targetRot = { x: 0, z: -0.06 }

    const tick = () => {
      rafId = requestAnimationFrame(tick)
      if (!visible) return

      const g = phone.group
      g.rotation.x += (-cursor.y * 0.18 + targetRot.x - g.rotation.x) * 0.06
      g.rotation.z += (targetRot.z + cursor.x * 0.04 - g.rotation.z) * 0.06

      // Camera barely moves; cursor adds gentle parallax
      const cam = context.camera
      cam.position.x += (cursor.x * 0.35 - cam.position.x) * 0.04
      cam.position.y += (-cursor.y * 0.18 - cam.position.y) * 0.04
      cam.lookAt(0, 0, 0)

      // Hero always shows screen_inicio fully
      phone.setWeights({ inicio: 1, finanzas: 0, tareas: 0 })

      context.renderer.render(context.scene, context.camera)
    }

    const resizeCanvas = () => {
      if (!canvas.value) return
      const w = canvas.value.clientWidth
      const h = canvas.value.clientHeight
      if (w === 0 || h === 0) return
      context.renderer.setSize(w, h, false)
      context.camera.aspect = w / h
      context.camera.updateProjectionMatrix()
    }
    resizeCanvas()

    const resizeObs = new ResizeObserver(resizeCanvas)
    resizeObs.observe(canvas.value)

    const onPointer = (e: PointerEvent) => {
      if (!canvas.value) return
      const rect = canvas.value.getBoundingClientRect()
      cursor.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      cursor.y = ((e.clientY - rect.top) / rect.height) * 2 - 1
    }
    window.addEventListener('pointermove', onPointer, { passive: true })

    const visObs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === canvas.value) visible = entry.isIntersecting
        }
      },
      { threshold: 0 },
    )
    visObs.observe(canvas.value)

    cleanup = () => {
      idleTween.kill()
      resizeObs.disconnect()
      visObs.disconnect()
      window.removeEventListener('pointermove', onPointer)
      phone.dispose()
      context.dispose()
    }

    ready.value = true
    tick()
  })

  onBeforeUnmount(() => {
    cancelAnimationFrame(rafId)
    cleanup?.()
  })

  return { ready }
}
