import Scene from '../../3d/Scene'
import StrategyLayer from '../../3d/objects/StrategyLayer'
import BrandLayer from '../../3d/objects/BrandLayer'
import MarketingLayer from '../../3d/objects/MarketingLayer'
import TechnologyLayer from '../../3d/objects/TechnologyLayer'
import GrowthLayer from '../../3d/objects/GrowthLayer'
import ScrollParallax from '../../3d/ScrollParallax'

export default function ProcessScene() {
  return (
    <Scene cameraPosition={[0, 0, 10]} style={{ opacity: 0.55 }}>
      <ScrollParallax strength={2}>
        <StrategyLayer />
        <BrandLayer />
        <MarketingLayer />
        <TechnologyLayer />
        <GrowthLayer />
      </ScrollParallax>
    </Scene>
  )
}
