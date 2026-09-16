import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function BrandLayer({ radius = 2.6, tilt = -0.35, speed = 0.09, color = '#ffd9c9' }) {
  const ref = useRef(null)

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z -= delta * speed
  })

  return (
    <group ref={ref} rotation={[tilt, 0.6, 0]}>
      <mesh>
        <torusGeometry args={[radius, 0.006, 8, 96]} />
        <meshBasicMaterial color={color} transparent opacity={0.45} />
      </mesh>
    </group>
  )
}
