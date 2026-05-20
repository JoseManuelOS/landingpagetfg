import {
  AmbientLight,
  Color,
  DirectionalLight,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer,
} from 'three'

export interface SceneContext {
  scene: Scene
  camera: PerspectiveCamera
  renderer: WebGLRenderer
  dispose: () => void
}

export function createSceneContext(canvas: HTMLCanvasElement): SceneContext {
  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.setSize(canvas.clientWidth || 1, canvas.clientHeight || 1, false)

  const scene = new Scene()
  scene.background = null

  const camera = new PerspectiveCamera(34, canvas.clientWidth / Math.max(canvas.clientHeight, 1), 0.1, 100)
  camera.position.set(0, 0, 5.4)
  camera.lookAt(0, 0, 0)

  const ambient = new AmbientLight(0xfff8ec, 0.7)
  scene.add(ambient)

  const key = new DirectionalLight(0xffffff, 1.6)
  key.position.set(2.5, 3, 4)
  scene.add(key)

  const rim = new PointLight(new Color('#4338ca'), 0.7, 12)
  rim.position.set(-3, 1.5, -1)
  scene.add(rim)

  const accent = new PointLight(new Color('#0891b2'), 0.6, 14)
  accent.position.set(3, -1.5, 2)
  scene.add(accent)

  const dispose = () => {
    renderer.dispose()
    scene.traverse((obj: any) => {
      obj.geometry?.dispose?.()
      const mat = obj.material
      if (Array.isArray(mat)) mat.forEach((m: any) => m.dispose?.())
      else mat?.dispose?.()
    })
  }

  return { scene, camera, renderer, dispose }
}
