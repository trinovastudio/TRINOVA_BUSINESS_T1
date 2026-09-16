import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const TOTAL_NODES = 14
const PARTICLE_COUNT = 450

/**
 * The "Trinova Dynamic Core" crystalline monolith — a faithful port of the
 * reference vanilla three.js scene (paralex_animation_triangle.html):
 * frosted octahedron prism + wireframe overlay, wireframe icosahedron inner
 * core, pulsing nucleus, three gyroscopic orbit rings, 14 orbiting nodes,
 * and a 450-point ambient particle field. Drag-rotation is applied to
 * `rotationRef` by the parent scene; the particle field stays independent
 * of that rotation, exactly like the reference (particles are added to the
 * scene directly, not the draggable root group).
 */
export default function TrinovaDynamicCore({ rotationRef }) {
  const rootRef = useRef(null)
  const prismRef = useRef(null)
  const innerRef = useRef(null)
  const nucleusRef = useRef(null)
  const ring1Ref = useRef(null)
  const ring2Ref = useRef(null)
  const ring3Ref = useRef(null)
  const nodesRef = useRef(null)
  const particlesRef = useRef(null)

  const wireGeo = useMemo(() => new THREE.WireframeGeometry(new THREE.OctahedronGeometry(1.7, 0)), [])

  const nodePositions = useMemo(() => {
    const arr = []
    for (let i = 0; i < TOTAL_NODES; i++) {
      const angle = (i / TOTAL_NODES) * Math.PI * 2
      const r = 2.4 + (i % 3) * 0.5
      arr.push([Math.cos(angle) * r, Math.sin(angle * 2) * 0.5, Math.sin(angle) * r])
    }
    return arr
  }, [])

  const particlePositions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
      arr[i] = (Math.random() - 0.5) * 16
      arr[i + 1] = (Math.random() - 0.5) * 16
      arr[i + 2] = (Math.random() - 0.5) * 16
    }
    return arr
  }, [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime

    if (prismRef.current) {
      prismRef.current.rotation.y = t * 0.25
      prismRef.current.rotation.z = Math.sin(t * 0.3) * 0.15
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.5
      innerRef.current.rotation.y = -t * 0.4
    }
    if (nucleusRef.current) {
      const pulse = 1 + Math.sin(t * 3) * 0.15
      nucleusRef.current.scale.setScalar(pulse)
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.24
      ring1Ref.current.rotation.y += delta * 0.18
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x += delta * 0.3
      ring2Ref.current.rotation.z -= delta * 0.18
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y -= delta * 0.24
      ring3Ref.current.rotation.x -= delta * 0.12
    }
    if (nodesRef.current) nodesRef.current.rotation.y = t * 0.1
    if (particlesRef.current) particlesRef.current.rotation.y = t * 0.02

    // Drag-rotation + mouse parallax, smoothed toward the target set by the
    // parent scene's pointer listeners.
    if (rootRef.current && rotationRef) {
      rootRef.current.rotation.y += (rotationRef.current.y - rootRef.current.rotation.y) * 0.08
      rootRef.current.rotation.x += (rotationRef.current.x - rootRef.current.rotation.x) * 0.08
    }
  })

  return (
    <>
      <group ref={rootRef}>
        <pointLight color="#9d4edd" intensity={3} distance={8} position={[0, 0, 0]} />

        <mesh ref={prismRef}>
          <octahedronGeometry args={[1.7, 0]} />
          <meshPhysicalMaterial
            color="#221a36"
            emissive="#180b2a"
            roughness={0.15}
            metalness={0.15}
            transmission={0.88}
            thickness={1.8}
            ior={1.55}
            specularIntensity={1}
            specularColor="#D0BCFF"
            transparent
            opacity={0.92}
          />
          <lineSegments geometry={wireGeo}>
            <lineBasicMaterial color="#D0BCFF" transparent opacity={0.35} />
          </lineSegments>
        </mesh>

        <mesh ref={innerRef}>
          <icosahedronGeometry args={[0.7, 1]} />
          <meshStandardMaterial
            color="#D0BCFF"
            emissive="#8E5CCB"
            emissiveIntensity={2.2}
            roughness={0.2}
            metalness={0.85}
            wireframe
          />
        </mesh>

        <mesh ref={nucleusRef}>
          <sphereGeometry args={[0.35, 24, 24]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>

        <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.4, 0.015, 24, 120]} />
          <meshStandardMaterial
            color="#8E5CCB"
            emissive="#8E5CCB"
            emissiveIntensity={0.5}
            roughness={0.25}
            metalness={0.7}
            transparent
            opacity={0.8}
          />
        </mesh>
        <mesh ref={ring2Ref} rotation={[0, Math.PI / 4, 0]}>
          <torusGeometry args={[2.9, 0.012, 24, 120]} />
          <meshStandardMaterial
            color="#D0BCFF"
            emissive="#D0BCFF"
            emissiveIntensity={0.5}
            roughness={0.25}
            metalness={0.7}
            transparent
            opacity={0.65}
          />
        </mesh>
        <mesh ref={ring3Ref} rotation={[0, 0, Math.PI / 6]}>
          <torusGeometry args={[3.4, 0.009, 24, 120]} />
          <meshStandardMaterial
            color="#6e44b5"
            emissive="#6e44b5"
            emissiveIntensity={0.5}
            roughness={0.25}
            metalness={0.7}
            transparent
            opacity={0.45}
          />
        </mesh>

        <group ref={nodesRef}>
          {nodePositions.map((pos, i) => (
            <mesh key={i} position={pos}>
              <sphereGeometry args={[0.04, 12, 12]} />
              <meshBasicMaterial color="#D0BCFF" />
            </mesh>
          ))}
        </group>
      </group>

      {/* Ambient stardust — independent of drag rotation, like the reference. */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#D0BCFF" size={0.035} transparent opacity={0.5} blending={THREE.AdditiveBlending} />
      </points>
    </>
  )
}
