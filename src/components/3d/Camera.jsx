import { PerspectiveCamera } from '@react-three/drei'

export default function Camera({ position = [0, 0, 8], fov = 45 }) {
  return <PerspectiveCamera makeDefault position={position} fov={fov} near={0.1} far={100} />
}
