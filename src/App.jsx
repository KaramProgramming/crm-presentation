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
import showroomImage from '../1775912781689-bx2uwxp4g3h.jpg'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function App() {
  const appRef = useRef(null)
  const cursorRef = useRef(null)
  const photoWashRef = useRef(null)
  const panelLeftRef = useRef(null)
  const panelRightRef = useRef(null)
  const lightRef = useRef(null)
  const grainRef = useRef(null)

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

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const sectionBackgrounds = gsap.utils.toArray('.luxury-section-bg')
    const sectionOverlays = gsap.utils.toArray('.luxury-crystal-walls')

    sectionBackgrounds.forEach((background) => {
      gsap.fromTo(
        background,
        { opacity: 0.44, y: 30 },
        {
          opacity: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: background.parentElement,
            start: 'top bottom',
            end: 'top center',
            scrub: 1.15,
          },
        }
      )
    })

    sectionOverlays.forEach((overlay) => {
      gsap.fromTo(
        overlay,
        { opacity: 0.08, y: 20 },
        {
          opacity: 0.34,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: overlay.parentElement,
            start: 'top bottom',
            end: 'top center',
            scrub: 1.2,
          },
        }
      )
    })

    if (prefersReducedMotion) {
      return
    }

    gsap.to(photoWashRef.current, {
      xPercent: 4,
      yPercent: -3,
      scale: 1.16,
      duration: 38,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    gsap.to(panelLeftRef.current, {
      xPercent: 6,
      yPercent: 9,
      rotation: -7.5,
      duration: 34,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    gsap.to(panelRightRef.current, {
      xPercent: -7,
      yPercent: -6,
      rotation: 7.5,
      duration: 36,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    gsap.to(lightRef.current, {
      xPercent: 5,
      opacity: 0.34,
      duration: 24,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    gsap.to(grainRef.current, {
      backgroundPosition: '160px 120px',
      duration: 42,
      ease: 'none',
      repeat: -1,
      yoyo: true,
    })

    ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress

        gsap.set(photoWashRef.current, { y: progress * -120 })
        gsap.set(panelLeftRef.current, { y: progress * -54 })
        gsap.set(panelRightRef.current, { y: progress * 72 })
        gsap.set(lightRef.current, { y: progress * 110 })
        gsap.set(grainRef.current, { y: progress * 26 })
      },
    })
  }, { scope: appRef })

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const move = (event) => {
      gsap.to(cursor, { x: event.clientX, y: event.clientY, duration: 1.4, ease: 'power2.out' })
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div ref={appRef} className="min-h-screen overflow-x-hidden relative" style={{ background: '#050505' }}>
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 luxury-page-base" />

        <div ref={photoWashRef} className="absolute inset-[-14%] luxury-page-photo">
          <img
            src={showroomImage}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div
          ref={panelLeftRef}
          className="absolute left-[-5%] top-[21%] hidden md:block h-[48vh] w-[26vw] overflow-hidden rounded-[34px] luxury-page-photo-panel luxury-page-photo-panel--left"
        >
          <img
            src={showroomImage}
            alt=""
            className="h-full w-full object-cover"
            style={{ objectPosition: '18% center' }}
          />
        </div>

        <div
          ref={panelRightRef}
          className="absolute bottom-[6%] right-[-7%] hidden lg:block h-[42vh] w-[30vw] overflow-hidden rounded-[34px] luxury-page-photo-panel luxury-page-photo-panel--right"
        >
          <img
            src={showroomImage}
            alt=""
            className="h-full w-full object-cover"
            style={{ objectPosition: '82% center' }}
          />
        </div>

        <div ref={lightRef} className="absolute inset-0 luxury-page-light" />
        <div className="absolute inset-0 luxury-page-scrim" />
        <div className="absolute inset-0 luxury-page-vignette" />
      </div>

      <div
        ref={grainRef}
        className="fixed inset-0 pointer-events-none luxury-grain-overlay"
        aria-hidden="true"
        style={{ zIndex: 1 }}
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
