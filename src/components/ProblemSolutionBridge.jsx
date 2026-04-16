import { useRef, useLayoutEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  FileSpreadsheet, PhoneMissed, Clock, BarChart2, MessageSquareX, Shuffle,
  CheckCircle2, ArrowRight,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const PROBLEMS = [
  { Icon: FileSpreadsheet, color: '#c9856a', bg: 'rgba(201,133,106,0.07)', border: 'rgba(201,133,106,0.2)', label: 'Scattered data', solutionIdx: 0 },
  { Icon: PhoneMissed,     color: '#cd7f32', bg: 'rgba(205,127,50,0.07)',   border: 'rgba(205,127,50,0.2)',   label: 'Lost leads',       solutionIdx: 1 },
  { Icon: Clock,           color: '#d4a43a', bg: 'rgba(212,164,58,0.07)',   border: 'rgba(212,164,58,0.2)',   label: 'Admin waste',      solutionIdx: 2 },
  { Icon: BarChart2,       color: '#9e8a6e', bg: 'rgba(158,138,110,0.07)', border: 'rgba(158,138,110,0.2)', label: 'No analytics',     solutionIdx: 3 },
  { Icon: MessageSquareX, color: '#b89080', bg: 'rgba(184,144,128,0.07)', border: 'rgba(184,144,128,0.2)', label: 'Fragmented comms', solutionIdx: 1, secondary: true },
  { Icon: Shuffle,         color: '#8a9e7a', bg: 'rgba(138,158,122,0.07)', border: 'rgba(138,158,122,0.2)', label: 'No process',       solutionIdx: 2, secondary: true },
]

const SOLUTIONS = [
  { color: '#d4a43a', border: 'rgba(212,164,58,0.22)', bg: 'rgba(212,164,58,0.07)', label: 'One unified platform' },
  { color: '#e8c87a', border: 'rgba(232,200,122,0.22)', bg: 'rgba(232,200,122,0.07)', label: 'Pipeline always in control' },
  { color: '#c99554', border: 'rgba(201,149,84,0.22)', bg: 'rgba(201,149,84,0.07)', label: 'Streamlined workflows' },
  { color: '#b8860b', border: 'rgba(184,134,11,0.22)', bg: 'rgba(184,134,11,0.07)', label: 'Real-time analytics' },
]

export default function ProblemSolutionBridge() {
  const containerRef = useRef(null)
  const svgRef       = useRef(null)
  const problemRefs  = useRef([])
  const solutionRefs = useRef([])
  const [paths, setPaths] = useState([])

  // Compute SVG paths after mount / resize
  useLayoutEffect(() => {
    function computePaths() {
      if (!containerRef.current || !svgRef.current) return
      const containerRect = containerRef.current.getBoundingClientRect()

      const computed = PROBLEMS.map((p, pi) => {
        const pEl = problemRefs.current[pi]
        const sEl = solutionRefs.current[p.solutionIdx]
        if (!pEl || !sEl) return null

        const pRect = pEl.getBoundingClientRect()
        const sRect = sEl.getBoundingClientRect()

        const x1 = pRect.right - containerRect.left
        const y1 = pRect.top + pRect.height / 2 - containerRect.top
        const x2 = sRect.left - containerRect.left
        const y2 = sRect.top + sRect.height / 2 - containerRect.top

        const cx1 = x1 + (x2 - x1) * 0.42
        const cx2 = x2 - (x2 - x1) * 0.42

        return {
          d: `M ${x1},${y1} C ${cx1},${y1} ${cx2},${y2} ${x2},${y2}`,
          color: p.secondary ? 'rgba(184,115,51,0.35)' : SOLUTIONS[p.solutionIdx].color,
          opacity: p.secondary ? 0.5 : 0.75,
          width: p.secondary ? 1 : 1.5,
          dashed: p.secondary,
          solutionIdx: p.solutionIdx,
          secondary: p.secondary,
        }
      }).filter(Boolean)

      setPaths(computed)
    }

    computePaths()
    window.addEventListener('resize', computePaths)
    return () => window.removeEventListener('resize', computePaths)
  }, [])

  // Animate paths on scroll
  useGSAP(() => {
    if (!svgRef.current) return
    const svgPaths = svgRef.current.querySelectorAll('.bridge-path')
    if (!svgPaths.length) return

    svgPaths.forEach((path) => {
      const len = path.getTotalLength()
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
    })

    const primary   = svgRef.current.querySelectorAll('.bridge-path-primary')
    const secondary = svgRef.current.querySelectorAll('.bridge-path-secondary')

    if (primary.length) {
      gsap.to(primary, {
        strokeDashoffset: 0,
        duration: 1.4,
        stagger: 0.2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'top 30%',
          scrub: 1.2,
        },
      })
    }

    if (secondary.length) {
      gsap.to(secondary, {
        strokeDashoffset: 0,
        duration: 1.0,
        stagger: 0.25,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          end: 'top 25%',
          scrub: 1.2,
        },
      })
    }
  }, { scope: containerRef, dependencies: [paths] })

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 luxury-section-bg" />
      <div className="absolute inset-0 luxury-crystal-walls pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-[#d4a43a]/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">

        {/* Section label */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[#e8c87a] text-xs font-semibold uppercase tracking-widest"
            style={{ background: 'rgba(212,164,58,0.07)', border: '1px solid rgba(212,164,58,0.18)' }}
          >
            <ArrowRight size={12} />
            Each problem has a direct solution
          </div>
        </div>

        {/* Bridge layout */}
        <div
          ref={containerRef}
          className="relative flex items-start justify-between gap-6"
          style={{ minHeight: '320px' }}
        >
          {/* Left: Problem chips */}
          <div className="flex flex-col gap-3 w-[38%] z-10">
            <p className="text-white/25 text-[10px] uppercase tracking-[0.25em] font-semibold mb-1 ml-1">
              Pain points
            </p>
            {PROBLEMS.map((p, i) => (
              <div
                key={p.label}
                ref={el => problemRefs.current[i] = el}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-300"
                style={{
                  background: p.bg,
                  border: `1px solid ${p.border}`,
                  opacity: p.secondary ? 0.7 : 1,
                }}
              >
                <p.Icon size={13} style={{ color: p.color }} className="shrink-0" />
                <span className="text-white/75 text-xs font-medium leading-snug">{p.label}</span>
                {p.secondary && (
                  <span className="ml-auto text-[9px] text-white/25 font-medium shrink-0">also</span>
                )}
              </div>
            ))}
          </div>

          {/* SVG overlay — paths drawn between chips */}
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            aria-hidden="true"
          >
            {paths.map((path, i) => (
              <path
                key={i}
                d={path.d}
                fill="none"
                stroke={path.color}
                strokeWidth={path.width}
                strokeLinecap="round"
                strokeDasharray={path.dashed ? '5 4' : undefined}
                className={`bridge-path ${path.secondary ? 'bridge-path-secondary' : 'bridge-path-primary'}`}
                style={{ opacity: path.opacity }}
              />
            ))}
          </svg>

          {/* Center decorative label */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col items-center gap-2 pointer-events-none">
            <div className="w-px h-10 bg-gradient-to-b from-transparent via-[#d4a43a]/30 to-transparent" />
            <span className="text-[9px] text-[#d4a43a]/40 uppercase tracking-[0.3em] font-semibold whitespace-nowrap">maps to</span>
            <div className="w-px h-10 bg-gradient-to-b from-transparent via-[#d4a43a]/30 to-transparent" />
          </div>

          {/* Right: Solution chips */}
          <div className="flex flex-col gap-4 w-[38%] z-10">
            <p className="text-white/25 text-[10px] uppercase tracking-[0.25em] font-semibold mb-1 ml-1">
              Our answers
            </p>
            {SOLUTIONS.map((s, i) => (
              <div
                key={s.label}
                ref={el => solutionRefs.current[i] = el}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
                style={{
                  background: s.bg,
                  border: `1px solid ${s.border}`,
                }}
              >
                <CheckCircle2 size={13} style={{ color: s.color }} className="shrink-0" />
                <span className="text-white/80 text-xs font-semibold leading-snug">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-10 flex items-center justify-center gap-6 text-[10px] text-white/25">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-px" style={{ background: 'rgba(212,164,58,0.6)' }} />
            <span>Direct solution</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-px" style={{ background: 'rgba(184,115,51,0.4)', borderTop: '1px dashed rgba(184,115,51,0.4)', height: 0 }} />
            <span>Also addressed</span>
          </div>
        </div>
      </div>
    </section>
  )
}
