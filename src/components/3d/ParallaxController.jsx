import MouseParallax from './MouseParallax'
import ScrollParallax from './ScrollParallax'

export default function ParallaxController({ children, mouseStrength = 0.4, scrollStrength = 3 }) {
  return (
    <ScrollParallax strength={scrollStrength}>
      <MouseParallax strength={mouseStrength}>{children}</MouseParallax>
    </ScrollParallax>
  )
}
