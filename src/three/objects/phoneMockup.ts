import {
  BoxGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  TextureLoader,
  SRGBColorSpace,
  type Texture,
} from 'three'

export type ScreenKey = 'inicio' | 'finanzas' | 'tareas'

export interface PhoneMockup {
  group: Group
  setWeights: (weights: Record<ScreenKey, number>) => void
  dispose: () => void
}

const PHONE_W = 1.6
const PHONE_H = 3.3
const PHONE_D = 0.16
const SCREEN_W = PHONE_W * 0.94
const SCREEN_H = PHONE_H * 0.94

interface ScreenSource {
  key: ScreenKey
  url: string
}

async function loadTexture(loader: TextureLoader, url: string): Promise<Texture> {
  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (tex) => {
        tex.colorSpace = SRGBColorSpace
        tex.anisotropy = 8
        resolve(tex)
      },
      undefined,
      reject,
    )
  })
}

export async function createPhoneMockup(sources: ScreenSource[]): Promise<PhoneMockup> {
  const group = new Group()

  // Body
  const bodyGeo = new BoxGeometry(PHONE_W, PHONE_H, PHONE_D)
  const bodyMat = new MeshStandardMaterial({
    color: 0x1a1815,
    roughness: 0.4,
    metalness: 0.55,
  })
  const body = new Mesh(bodyGeo, bodyMat)
  group.add(body)

  // Stacked screen planes, one per source
  const loader = new TextureLoader()
  const textures = await Promise.all(sources.map((s) => loadTexture(loader, s.url)))

  const screenGeo = new PlaneGeometry(SCREEN_W, SCREEN_H)
  const screenMats: Record<ScreenKey, MeshStandardMaterial> = {} as never
  const meshes: Mesh[] = []

  sources.forEach((source, i) => {
    const mat = new MeshStandardMaterial({
      map: textures[i],
      roughness: 0.12,
      metalness: 0,
      transparent: true,
      depthWrite: false,
      emissive: 0xffffff,
      emissiveMap: textures[i],
      emissiveIntensity: 0.35,
      opacity: i === 0 ? 1 : 0,
    })
    const mesh = new Mesh(screenGeo, mat)
    mesh.position.z = PHONE_D / 2 + 0.001 + i * 0.0008
    mesh.renderOrder = 10 + i
    group.add(mesh)
    screenMats[source.key] = mat
    meshes.push(mesh)
  })

  // Bezel highlight strip
  const bezelMat = new MeshStandardMaterial({
    color: 0x6366f1,
    roughness: 0.3,
    metalness: 0.8,
    emissive: 0x1e1b4b,
    emissiveIntensity: 0.35,
  })
  const bezel = new Mesh(new PlaneGeometry(PHONE_W * 0.16, 0.012), bezelMat)
  bezel.position.set(0, PHONE_H / 2 - 0.05, PHONE_D / 2 + 0.004)
  group.add(bezel)

  // Smoothed opacity per screen
  const current: Record<ScreenKey, number> = { inicio: 1, finanzas: 0, tareas: 0 }

  const setWeights = (target: Record<ScreenKey, number>) => {
    // Normalize so total opacity ≈ 1 (avoid over-bright stack)
    const sum = (target.inicio || 0) + (target.finanzas || 0) + (target.tareas || 0)
    const inv = sum > 0.001 ? 1 / sum : 1
    ;(['inicio', 'finanzas', 'tareas'] as ScreenKey[]).forEach((key) => {
      const desired = (target[key] || 0) * inv
      current[key] += (desired - current[key]) * 0.08
      const mat = screenMats[key]
      if (mat) mat.opacity = current[key]
    })
  }

  const dispose = () => {
    bodyGeo.dispose()
    bodyMat.dispose()
    screenGeo.dispose()
    bezelMat.dispose()
    textures.forEach((t) => t.dispose())
    Object.values(screenMats).forEach((m) => m.dispose())
  }

  return { group, setWeights, dispose }
}
