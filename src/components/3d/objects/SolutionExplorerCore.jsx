import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Faithful to the reference's 2x2 node layout (3D_Solution.html) — top-left,
// top-right, bottom-left, bottom-right around the central monolith.
const NODE_POSITIONS = [
  [-3.6, 1.8, 0.5],
  [3.6, 1.8, 0.5],
  [-3.6, -1.8, 0.5],
  [3.6, -1.8, 0.5],
]

function createCardTexture(item, isHighlighted) {
  const cvs = document.createElement('canvas')
  cvs.width = 512
  cvs.height = 256
  const ctx = cvs.getContext('2d')

  ctx.fillStyle = isHighlighted ? '#27272a' : '#18181b'
  ctx.beginPath()
  ctx.roundRect(10, 10, 492, 236, 24)
  ctx.fill()

  ctx.strokeStyle = isHighlighted ? item.accent : 'rgba(168, 85, 247, 0.35)'
  ctx.lineWidth = isHighlighted ? 6 : 3
  ctx.stroke()

  ctx.fillStyle = item.accent
  ctx.beginPath()
  ctx.roundRect(36, 38, 12, 12, 3)
  ctx.fill()

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 36px "Space Grotesk", sans-serif, system-ui'
  ctx.fillText(`${item.number} ${item.name.toUpperCase()}`, 64, 52)

  ctx.fillStyle = isHighlighted ? '#e4e4e7' : '#a1a1aa'
  ctx.font = '500 22px "Space Grotesk", sans-serif, system-ui'
  const subtitle = item.shortDescription.length > 40 ? `${item.shortDescription.slice(0, 38)}…` : item.shortDescription
  ctx.fillText(subtitle, 64, 100)

  ctx.fillStyle = 'rgba(168, 85, 247, 0.15)'
  ctx.beginPath()
  ctx.roundRect(64, 140, 240, 48, 12)
  ctx.fill()
  ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)'
  ctx.lineWidth = 2
  ctx.stroke()

  ctx.fillStyle = '#d8b4fe'
  ctx.font = '600 20px "Space Grotesk", monospace'
  ctx.fillText('ACTIVE NODE ↗', 84, 172)

  const tex = new THREE.CanvasTexture(cvs)
  tex.anisotropy = 4
  return tex
}

function createCenterTexture() {
  const cvs = document.createElement('canvas')
  cvs.width = 512
  cvs.height = 512
  const ctx = cvs.getContext('2d')

  ctx.fillStyle = '#09090b'
  ctx.beginPath()
  ctx.arc(256, 256, 240, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = '#c084fc'
  ctx.lineWidth = 8
  ctx.stroke()

  ctx.fillStyle = '#a855f7'
  ctx.font = 'bold 26px "Space Grotesk", monospace'
  ctx.textAlign = 'center'
  ctx.fillText('THE ENTERPRISE', 256, 220)

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 44px "Space Grotesk", sans-serif'
  ctx.fillText('BUSINESS', 256, 280)

  ctx.fillStyle = '#9ca3af'
  ctx.font = '500 20px "Space Grotesk", monospace'
  ctx.fillText('SYSTEM NUCLEUS', 256, 325)

  return new THREE.CanvasTexture(cvs)
}

/**
 * The 3D Solution Explorer core — a faithful port of the reference vanilla
 * three.js scene (3D_Solution.html): a central glass-and-gem monolith with
 * an orbiting dashed ring, four canvas-textured glass-slab nodes on
 * tube-conduit connections with traveling energy pulses. Mouse parallax
 * tilts the whole assembly, exactly like the reference's
 * `root.rotation.y = mouseCurX * 0.25`.
 */
export default function SolutionExplorerCore({ items, activeIndex, onSelect, mouseRef }) {
  const rootRef = useRef(null)
  const coreMeshRef = useRef(null)
  const gemRef = useRef(null)
  const orbitRingRef = useRef(null)
  const nodeGroupRefs = useRef([])
  const pulseRefs = useRef([])
  const [hoverIndex, setHoverIndex] = useState(-1)
  const mouseCur = useRef({ x: 0, y: 0 })

  const coreEdgeGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.CylinderGeometry(1.21, 1.21, 0.26, 32)), [])
  const slabGeo = useMemo(() => new THREE.BoxGeometry(2.4, 1.2, 0.08), [])
  const slabEdgeGeo = useMemo(() => new THREE.EdgesGeometry(slabGeo), [slabGeo])
  const centerTexture = useMemo(() => createCenterTexture(), [])

  const materialsRef = useRef([])

  const curves = useMemo(
    () =>
      NODE_POSITIONS.map(
        (pos) =>
          new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(pos[0] * 0.4, pos[1] * 0.4, pos[2] * 0.4),
            new THREE.Vector3(pos[0], pos[1], pos[2]),
          ])
      ),
    []
  )
  const tubeGeos = useMemo(() => curves.map((curve) => new THREE.TubeGeometry(curve, 32, 0.02, 8, false)), [curves])

  // Stable initial (non-highlighted) textures — created once per item, not
  // on every render. The effect below swaps `.map` in place for hover/
  // active transitions instead of re-creating the material's texture prop.
  const initialTextures = useMemo(() => items.map((item) => createCardTexture(item, false)), [items])

  // Regenerate a node's card texture whenever its hover/active state
  // changes — mirrors the reference's raycast hover texture-swap.
  useEffect(() => {
    items.forEach((item, i) => {
      const isHighlighted = i === activeIndex || i === hoverIndex
      const mat = materialsRef.current[i]
      if (mat) {
        mat.map = createCardTexture(item, isHighlighted)
        mat.needsUpdate = true
      }
    })
  }, [activeIndex, hoverIndex, items])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime

    // Mouse parallax tilt of the whole assembly.
    if (mouseRef) {
      mouseCur.current.x += (mouseRef.current.x - mouseCur.current.x) * 0.05
      mouseCur.current.y += (mouseRef.current.y - mouseCur.current.y) * 0.05
      if (rootRef.current) {
        rootRef.current.rotation.y = mouseCur.current.x * 0.25
        rootRef.current.rotation.x = -mouseCur.current.y * 0.2
      }
    }

    if (coreMeshRef.current) coreMeshRef.current.rotation.z = Math.sin(t * 0.5) * 0.05
    if (gemRef.current) {
      gemRef.current.rotation.y = t * 0.8
      gemRef.current.rotation.x = t * 0.4
    }
    if (orbitRingRef.current) orbitRingRef.current.rotation.z = -t * 0.3

    items.forEach((item, i) => {
      const group = nodeGroupRefs.current[i]
      const pulse = pulseRefs.current[i]
      const isHighlighted = i === activeIndex || i === hoverIndex
      if (group) {
        const targetZ = NODE_POSITIONS[i][2] + (isHighlighted ? 0.4 : 0) + Math.sin(t * 1.5 + i) * 0.08
        group.position.z += (targetZ - group.position.z) * 0.1
        const targetScale = isHighlighted ? 1.08 : 1
        group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
      }
      if (pulse) {
        const pulseT = (t * 0.4 + i * 0.25) % 1
        const pt = curves[i].getPoint(pulseT)
        pulse.position.copy(pt)
        pulse.scale.setScalar(0.7 + Math.sin(pulseT * Math.PI) * 0.5)
      }
    })
  })

  return (
    <group ref={rootRef}>
      {/* Central monolith */}
      <group>
        <mesh ref={coreMeshRef} rotation={[Math.PI / 6, 0, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.25, 32]} />
          <meshPhongMaterial
            color="#18181b"
            emissive="#6b21a8"
            emissiveIntensity={0.5}
            specular="#c084fc"
            shininess={80}
            transparent
            opacity={0.9}
          />
          <lineSegments geometry={coreEdgeGeo}>
            <lineBasicMaterial color="#c084fc" transparent opacity={0.8} />
          </lineSegments>
        </mesh>

        <mesh ref={gemRef} position={[0, 0.2, 0]}>
          <octahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial
            color="#d8b4fe"
            emissive="#9333ea"
            emissiveIntensity={0.7}
            roughness={0.2}
            metalness={0.5}
          />
        </mesh>

        <mesh ref={orbitRingRef} rotation={[Math.PI / 6, 0, 0]}>
          <ringGeometry args={[1.6, 1.66, 64]} />
          <meshBasicMaterial color="#8e5ccb" side={THREE.DoubleSide} transparent opacity={0.5} />
        </mesh>

        <mesh position={[0, 0, 0.4]}>
          <planeGeometry args={[1.8, 1.8]} />
          <meshBasicMaterial map={centerTexture} transparent side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Conduits + traveling pulses */}
      {tubeGeos.map((geo, i) => (
        <mesh key={`tube-${items[i].slug}`} geometry={geo}>
          <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
        </mesh>
      ))}
      {items.map((item, i) => (
        <mesh
          key={`pulse-${item.slug}`}
          ref={(el) => {
            pulseRefs.current[i] = el
          }}
        >
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}

      {/* Four solution nodes */}
      {items.map((item, i) => (
        <group
          key={item.slug}
          ref={(el) => {
            nodeGroupRefs.current[i] = el
          }}
          position={NODE_POSITIONS[i]}
          onClick={(e) => {
            e.stopPropagation()
            onSelect(i)
          }}
          onPointerOver={(e) => {
            e.stopPropagation()
            setHoverIndex(i)
            document.body.style.cursor = 'pointer'
          }}
          onPointerOut={() => {
            setHoverIndex(-1)
            document.body.style.cursor = 'auto'
          }}
        >
          <mesh
            geometry={slabGeo}
            ref={(el) => {
              if (el) materialsRef.current[i] = el.material
            }}
          >
            <meshBasicMaterial map={initialTextures[i]} transparent />
          </mesh>
          <lineSegments geometry={slabEdgeGeo}>
            <lineBasicMaterial color="#8e5ccb" transparent opacity={0.4} />
          </lineSegments>
        </group>
      ))}
    </group>
  )
}
