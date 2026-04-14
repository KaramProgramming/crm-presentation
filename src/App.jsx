import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import VideoIntro from './components/VideoIntro'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FurnitureShowcase from './components/FurnitureShowcase'
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
    <div className="min-h-screen bg-[#07070b] overflow-x-hidden relative">
      <div ref={cursorRef} className="cursor-glow" aria-hidden="true" />

      <VideoIntro />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <FurnitureShowcase />
        <Problems />
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
