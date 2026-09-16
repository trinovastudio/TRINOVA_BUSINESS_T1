import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function GrowthLayer({ radius = 4.1, tilt = 0.4, speed = 0.07, color = '#ededed' }) {
  const ref = useRef(null)

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed
  })

  return (
    <group ref={ref} rotation={[tilt, -0.2, 0.4]}>
      <mesh>
        <torusGeometry args={[radius, 0.004, 8, 128]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} />
      </mesh>
    </group>
  )
}
