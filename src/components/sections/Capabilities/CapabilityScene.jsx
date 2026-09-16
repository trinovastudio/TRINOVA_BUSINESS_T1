import Scene from '../../3d/Scene'
import BusinessCore from '../../3d/objects/BusinessCore'
import StrategyLayer from '../../3d/objects/StrategyLayer'
import ScrollParallax from '../../3d/ScrollParallax'

export default function CapabilityScene() {
  return (
    <Scene cameraPosition={[0, 0, 7]} style={{ opacity: 0.5 }}>
      <ScrollParallax strength={1.8}>
        <BusinessCore radius={1.3} />
        <StrategyLayer radius={2.2} />
      </ScrollParallax>
    </Scene>
  )
}
