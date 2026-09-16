import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * The "Trinova Dynamic Core" crystal — a frosted octahedron shell around a
 * wireframe icosahedron and pulsing nucleus, ringed by two tilted orbit
 * rings. Used as the Solutions hero centerpiece and, at a smaller scale, as
 * the accent visual on each solution detail page.
 */
export default function CrystalCore({ color = '#d0bcff', accent = '#8e5ccb', scale = 1 }) {
  const coreGroupRef = useRef(null)
  const innerRef = useRef(null)
  const nucleusRef = useRef(null)
  const ring1Ref = useRef(null)
  const ring2Ref = useRef(null)

  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.OctahedronGeometry(1.72, 0)), [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    if (coreGroupRef.current) {
      coreGroupRef.current.rotation.y = t * 0.25
      coreGroupRef.current.rotation.z = Math.sin(t * 0.3) * 0.15
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.5
      innerRef.current.rotation.y = -t * 0.4
    }
    if (nucleusRef.current) {
      const pulse = 1 + Math.sin(t * 3) * 0.15
      nucleusRef.current.scale.setScalar(pulse)
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.12
    if (ring2Ref.current) ring2Ref.current.rotation.x += delta * 0.09
  })

  return (
    <group scale={scale}>
      <group ref={coreGroupRef}>
        <mesh>
          <octahedronGeometry args={[1.7, 0]} />
          <meshPhysicalMaterial
            color="#1a1622"
            emissive={accent}
            emissiveIntensity={0.14}
            roughness={0.15}
            metalness={0.1}
            transmission={0.88}
            thickness={1.6}
            transparent
            opacity={0.9}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
        <lineSegments geometry={edgesGeo}>
          <lineBasicMaterial color={color} transparent opacity={0.35} />
        </lineSegments>
      </group>

      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={accent}
          emissiveIntensity={1.4}
          roughness={0.25}
          metalness={0.7}
          wireframe
        />
      </mesh>

      <mesh ref={nucleusRef}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.3, 0.012, 16, 100]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.5} transparent opacity={0.6} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[2.8, 0.008, 16, 100]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} transparent opacity={0.45} />
      </mesh>
    </group>
  )
}
