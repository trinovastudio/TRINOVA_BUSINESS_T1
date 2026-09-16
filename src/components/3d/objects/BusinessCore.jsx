import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function BusinessCore({ radius = 1.1, color = '#ededed' }) {
  const meshRef = useRef(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15
      meshRef.current.rotation.x += delta * 0.04
    }
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[radius, 1]} />
      <meshStandardMaterial color={color} wireframe metalness={0.2} roughness={0.6} />
    </mesh>
  )
}
