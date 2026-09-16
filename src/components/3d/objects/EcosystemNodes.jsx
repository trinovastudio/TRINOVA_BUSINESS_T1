import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const NODES = [
  { name: 'strategy', pos: [1.9, 0.9, 0.4], color: '#c0c1ff' },
  { name: 'brand', pos: [-1.8, 1.1, -0.25], color: '#d0bcff' },
  { name: 'marketing', pos: [1.6, -1.2, 0.6], color: '#ddb8ff' },
  { name: 'technology', pos: [-1.75, -1.0, 0.5], color: '#a078ff' },
  { name: 'growth', pos: [0, 2.0, -0.6], color: '#d0bcff' },
]

export default function EcosystemNodes() {
  const groupRef = useRef(null)

  const lines = useMemo(
    () =>
      NODES.map((node) => {
        const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...node.pos)]
        return new THREE.BufferGeometry().setFromPoints(points)
      }),
    []
  )

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.06
  })

  return (
    <group ref={groupRef}>
      {NODES.map((node, i) => (
        <group key={node.name}>
          <line geometry={lines[i]}>
            <lineBasicMaterial color="#a078ff" transparent opacity={0.35} />
          </line>
          <mesh position={node.pos}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.6}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}
