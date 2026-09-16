import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import TrinovaDynamicCore from '../../3d/objects/TrinovaDynamicCore'
import './SolutionsHeroScene.css'

// Camera drift: mouse parallax + wheel zoom, read every frame from refs the
// wrapper's DOM listeners write to — matches the reference's own
// `camera.position.x/y += (target - current) * 0.05` damping exactly.
function CameraRig({ mouseRef, zoomRef }) {
  const { camera } = useThree()
  useFrame(() => {
    camera.position.x += (mouseRef.current.x * 0.8 - camera.position.x) * 0.05
    camera.position.y += (-mouseRef.current.y * 0.8 - camera.position.y) * 0.05
    camera.position.z = zoomRef.current.z
    camera.lookAt(0, 0, 0)
  })
  return null
}

/**
 * Full-bleed hero background for the Solutions page — a faithful port of
 * the reference "Trinova Dynamic Core" scene (paralex_animation_triangle.html):
 * drag to rotate, mouse parallax, scroll-wheel zoom, ACES tone mapping and
 * exponential fog. No box, no border — it sits behind the hero copy exactly
 * like the reference's `fixed inset-0 bg-transparent` canvas.
 */
export default function SolutionsHeroScene() {
  const containerRef = useRef(null)
  // The *target* rotation set by drag input — TrinovaDynamicCore reads this
  // every frame and lerps its own current rotation toward it, so the easing
  // lives in one place instead of being duplicated here.
  const rotationRef = useRef({ x: 0, y: 0 })
  const mouseRef = useRef({ x: 0, y: 0 })
  const zoomRef = useRef({ z: 8 })
  const dragRef = useRef({ dragging: false, lastX: 0, lastY: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const onPointerDown = (e) => {
      dragRef.current.dragging = true
      dragRef.current.lastX = e.clientX
      dragRef.current.lastY = e.clientY
    }
    const onPointerMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2

      if (dragRef.current.dragging) {
        const dx = e.clientX - dragRef.current.lastX
        const dy = e.clientY - dragRef.current.lastY
        rotationRef.current.y += dx * 0.007
        rotationRef.current.x += dy * 0.007
        dragRef.current.lastX = e.clientX
        dragRef.current.lastY = e.clientY
      }
    }
    const onPointerUp = () => {
      dragRef.current.dragging = false
    }
    const onWheel = (e) => {
      zoomRef.current.z = THREE.MathUtils.clamp(zoomRef.current.z + e.deltaY * 0.003, 4.5, 12)
    }

    container.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => {
      container.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('wheel', onWheel)
    }
  }, [])

  return (
    <div className="solutions-hero-scene" ref={containerRef}>
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.35 }}
        camera={{ fov: 45, position: [0, 0, 8], near: 0.1, far: 1000 }}
      >
        <fogExp2 attach="fog" args={['#131315', 0.04]} />
        <ambientLight intensity={0.45} />
        <pointLight color="#8E5CCB" intensity={4.5} distance={30} position={[5, 5, 4]} />
        <pointLight color="#D0BCFF" intensity={4} distance={30} position={[-5, -4, -3]} />
        <TrinovaDynamicCore rotationRef={rotationRef} />
        <CameraRig mouseRef={mouseRef} zoomRef={zoomRef} />
      </Canvas>
    </div>
  )
}
