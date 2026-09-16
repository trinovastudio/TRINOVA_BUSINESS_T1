import Hero from '../../components/sections/Hero/Hero'
import Introduction from '../../components/sections/Introduction/Introduction'
import Solutions from '../../components/sections/Solutions/Solutions'
import Philosophy from '../../components/sections/Philosophy/Philosophy'
import Process from '../../components/sections/Process/Process'
import Industries from '../../components/sections/Industries/Industries'
import Capabilities from '../../components/sections/Capabilities/Capabilities'
import WhyTrinova from '../../components/sections/WhyTrinova/WhyTrinova'
import Insights from '../../components/sections/Insights/Insights'
import Ecosystem from '../../components/sections/Ecosystem/Ecosystem'
import FinalCTA from '../../components/sections/FinalCTA/FinalCTA'
import './Home.css'

export default function Home() {
  return (
    <div className="home">
      <Hero />
      <Introduction />
      <hr className="divider" />
      <Solutions />
      <hr className="divider" />
      <Philosophy />
      <Process />
      <hr className="divider" />
      <Industries />
      <hr className="divider" />
      <Capabilities />
      <hr className="divider" />
      <WhyTrinova />
      <hr className="divider" />
      <Insights />
      <hr className="divider" />
      <Ecosystem />
      <FinalCTA />
    </div>
  )
}
