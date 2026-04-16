import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import VideoIntro from './components/VideoIntro'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FurnitureShowcase from './components/FurnitureShowcase'
import Problems from './components/Problems'
import ProblemSolutionBridge from './components/ProblemSolutionBridge'
import Solution from './components/Solution'
import Benefits from './components/Benefits'
import CRMDemo from './components/CRMDemo'
import CustomDev from './components/CustomDev'
import Features from './components/Features'
import Analytics from './components/Analytics'
import Automation from './components/Automation'
import CTA from './components/CTA'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function App() {
  const cursorRef = useRef(null)

  useLayoutEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration
    const resetScroll = () => window.scrollTo(0, 0)

    window.history.scrollRestoration = 'manual'
    resetScroll()

    const rafId = window.requestAnimationFrame(resetScroll)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [])

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return
    const move = (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 1.4, ease: 'power2.out' })
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden relative" style={{ background: '#1c1208' }}>

      {/* ── Luxury dark-walnut background ── */}

      {/* Base layer: warm walnut foundation */}
      <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0" style={{ background: '#1c1208' }} />

        {/* Gold ambient glow — top center */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(212,164,58,0.09) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        {/* Amber glow — bottom left */}
        <div
          className="absolute bottom-0 left-0 w-[700px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(184,115,51,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 90% 80% at 50% 40%, transparent 50%, rgba(5,3,2,0.65) 100%)' }}
        />
        {/* Gold sheen top edge */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(212,164,58,0.3) 30%, rgba(212,164,58,0.5) 50%, rgba(212,164,58,0.3) 70%, transparent 100%)' }}
        />
      </div>

      {/* Grain overlay — sits above ALL section backgrounds via mix-blend-mode */}
      <div
        className="fixed inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: 1,
          mixBlendMode: 'overlay',
          opacity: 0.28,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800'%3E%3Cfilter id='w'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.015 0.65' numOctaves='6' seed='8' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0.6 0 0 0.2, 0.5 0.3 0 0 0.1, 0.1 0.05 0 0 0.02, 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='800' height='800' filter='url(%23w)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '800px 800px',
        }}
      />

      <div ref={cursorRef} className="cursor-glow" aria-hidden="true" />

      <VideoIntro />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <FurnitureShowcase />
        <Problems />
        <ProblemSolutionBridge />
        <Solution />
        <Benefits />
        <CRMDemo />
        <CustomDev />
        <Features />
        <Analytics />
        <Automation />
        <CTA />
      </main>

      <Footer />
    </div>
  )
}
