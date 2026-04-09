import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FurnitureShowcase from './components/FurnitureShowcase'
import WaveDivider from './components/WaveDivider'
import Problems from './components/Problems'
import Solution from './components/Solution'
import Features from './components/Features'
import Analytics from './components/Analytics'
import Automation from './components/Automation'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />

        {/* Wave down into showcase */}
        <WaveDivider topColor="#0a0a0f" bottomColor="#0a0a0f" />
        <FurnitureShowcase />
        <WaveDivider topColor="#0a0a0f" bottomColor="#0d0d18" flip />

        <Problems />

        <WaveDivider topColor="#0d0d18" bottomColor="#0f0f1a" />
        <Solution />
        <WaveDivider topColor="#0f0f1a" bottomColor="#0c0c16" flip />

        <Features />

        <WaveDivider topColor="#0c0c16" bottomColor="#0e0e1c" />
        <Analytics />
        <WaveDivider topColor="#0e0e1c" bottomColor="#0d0d1a" flip />

        <Automation />

        <WaveDivider topColor="#0d0d1a" bottomColor="#0c0c1e" />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
