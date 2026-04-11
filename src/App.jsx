import { useState } from 'react'
import VideoIntro from './components/VideoIntro'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FurnitureShowcase from './components/FurnitureShowcase'
import WaveDivider from './components/WaveDivider'
import Problems from './components/Problems'
import Solution from './components/Solution'
import Benefits from './components/Benefits'
import CRMDemo from './components/CRMDemo'
import CustomDev from './components/CustomDev'
import Features from './components/Features'
import Analytics from './components/Analytics'
import Automation from './components/Automation'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  const [introVisible, setIntroVisible] = useState(true)

  return (
    <div className="min-h-screen bg-[#0a0a0f] overflow-x-hidden">
      <VideoIntro onEnter={() => setIntroVisible(false)} />
      <Navbar />
      <main>
        {/* 1. Hero — first impression */}
        <Hero />

        {/* 2. Furniture showcase — emotional hook */}
        <WaveDivider topColor="#0a0a0f" bottomColor="#0a0a0f" />
        <FurnitureShowcase />
        <WaveDivider topColor="#0a0a0f" bottomColor="#0d0d18" flip />

        {/* 3. Problems — agitate the pain */}
        <Problems />
        <WaveDivider topColor="#0d0d18" bottomColor="#0f0f1a" />

        {/* 4. Solution — relief */}
        <Solution />
        <WaveDivider topColor="#0f0f1a" bottomColor="#0d0d1c" flip />

        {/* 5. Benefits — financial & time ROI (new) */}
        <Benefits />
        <WaveDivider topColor="#0d0d1c" bottomColor="#0c0c18" />

        {/* 6. CRM Demo — show don't tell */}
        <CRMDemo />
        <WaveDivider topColor="#0c0c18" bottomColor="#0e0b1e" flip />

        {/* 7. Custom Development — key differentiator */}
        <CustomDev />
        <WaveDivider topColor="#0e0b1e" bottomColor="#0c0c16" />

        {/* 8. Features — detailed breakdown */}
        <Features />
        <WaveDivider topColor="#0c0c16" bottomColor="#0e0e1c" />

        {/* 8. Analytics */}
        <Analytics />
        <WaveDivider topColor="#0e0e1c" bottomColor="#0d0d1a" flip />

        {/* 9. Automation */}
        <Automation />
        <WaveDivider topColor="#0d0d1a" bottomColor="#0c0c1e" />

        {/* 10. Final CTA */}
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
