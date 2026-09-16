import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function TechnologyLayer({ radius = 3.6, tilt = -0.15, speed = 0.11, color = '#c9e8ff' }) {
  const ref = useRef(null)

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z -= delta * speed
  })

  return (
    <group ref={ref} rotation={[tilt, 0.3, -0.3]}>
      <mesh>
        <torusGeometry args={[radius, 0.005, 8, 96]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
    </group>
  )
}
