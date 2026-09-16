import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import Header from './components/layout/Header/Header'
import Footer from './components/layout/Footer/Footer'
import PageTransition from './components/layout/PageTransition/PageTransition'
import CustomCursor from './components/common/CustomCursor'
import ScrollProgress from './components/common/ScrollProgress'

import Home from './pages/Home/Home'
import SolutionsPage from './pages/Solutions/SolutionsPage'
import Branding from './pages/Solutions/Branding'
import BusinessConsultancy from './pages/Solutions/BusinessConsultancy'
import Marketing from './pages/Solutions/Marketing'
import ITConsultancy from './pages/Solutions/ITConsultancy'
import IndustriesPage from './pages/Industries/IndustriesPage'
import IndustryDetail from './pages/Industries/IndustryDetail'
import CapabilitiesPage from './pages/Capabilities/CapabilitiesPage'
import HowWeWork from './pages/HowWeWork/HowWeWork'
import InsightsPage from './pages/Insights/InsightsPage'
import Article from './pages/Insights/Article'
import About from './pages/About/About'
import FmcgExpo2026 from './pages/Fmcg/FmcgExpo2026'
import Careers from './pages/Careers/Careers'
import Contact from './pages/Contact/Contact'
import Trinova from './pages/Trinova/Trinova'
import TrinovaDivision from './pages/Trinova/TrinovaDivision'
import NotFound from './pages/NotFound/NotFound'

export default function App() {
  const location = useLocation()

  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Header />

      <AnimatePresence mode="wait" initial={false}>
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />

            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/solutions/branding" element={<Branding />} />
            <Route path="/solutions/business-consultancy" element={<BusinessConsultancy />} />
            <Route path="/solutions/marketing" element={<Marketing />} />
            <Route path="/solutions/it-consultancy" element={<ITConsultancy />} />

            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/industries/:slug" element={<IndustryDetail />} />

            <Route path="/capabilities" element={<CapabilitiesPage />} />
            <Route path="/how-we-work" element={<HowWeWork />} />

            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/insights/:slug" element={<Article />} />

            <Route path="/about" element={<About />} />
            <Route path="/fmcg/expo-2026" element={<FmcgExpo2026 />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/trinova" element={<Trinova />} />
            <Route path="/trinova/:slug" element={<TrinovaDivision />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </AnimatePresence>

      <Footer />
    </>
  )
}
