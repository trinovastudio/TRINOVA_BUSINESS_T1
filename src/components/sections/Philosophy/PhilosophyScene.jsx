import Scene from '../../3d/Scene'
import BusinessCore from '../../3d/objects/BusinessCore'
import MouseParallax from '../../3d/MouseParallax'

export default function PhilosophyScene() {
  return (
    <Scene cameraPosition={[0, 0, 6]} style={{ opacity: 0.5 }}>
      <MouseParallax strength={0.2}>
        <BusinessCore radius={1.6} />
      </MouseParallax>
    </Scene>
  )
}
