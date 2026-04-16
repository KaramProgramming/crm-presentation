import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  FileSpreadsheet, PhoneMissed, Clock, BarChart2, MessageSquareX, Shuffle,
  CheckCircle2,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  {
    front: { Icon: FileSpreadsheet, color: '#c9856a', bg: 'rgba(201,133,106,0.14)', border: 'rgba(201,133,106,0.35)', label: 'Scattered data',    stat: '3+ tools per rep' },
    back:  { color: '#d4a43a', bg: 'rgba(212,164,58,0.14)',  border: 'rgba(212,164,58,0.38)',  solution: 'One Platform',     benefit: 'All data, one place' },
  },
  {
    front: { Icon: PhoneMissed,    color: '#cd7f32', bg: 'rgba(205,127,50,0.14)',  border: 'rgba(205,127,50,0.35)',  label: 'Lost leads',        stat: '~30% never return' },
    back:  { color: '#34d399', bg: 'rgba(52,211,153,0.14)', border: 'rgba(52,211,153,0.38)', solution: 'Pipeline',         benefit: '100% tracked' },
  },
  {
    front: { Icon: Clock,          color: '#d4a43a', bg: 'rgba(212,164,58,0.14)',  border: 'rgba(212,164,58,0.35)',  label: 'Admin waste',       stat: '5h / day lost' },
    back:  { color: '#38bdf8', bg: 'rgba(56,189,248,0.14)', border: 'rgba(56,189,248,0.38)', solution: 'Workflows',        benefit: '40 min saved each' },
  },
  {
    front: { Icon: BarChart2,      color: '#9e8a6e', bg: 'rgba(158,138,110,0.14)', border: 'rgba(158,138,110,0.35)', label: 'No analytics',     stat: 'Flying blind' },
    back:  { color: '#a78bfa', bg: 'rgba(167,139,250,0.14)', border: 'rgba(167,139,250,0.38)', solution: 'Analytics',       benefit: 'Live KPIs, always' },
  },
  {
    front: { Icon: MessageSquareX, color: '#b89080', bg: 'rgba(184,144,128,0.14)', border: 'rgba(184,144,128,0.35)', label: 'Fragmented comms', stat: 'Mixed messages' },
    back:  { color: '#34d399', bg: 'rgba(52,211,153,0.14)', border: 'rgba(52,211,153,0.38)', solution: 'Pipeline',         benefit: 'Full context, one thread' },
  },
  {
    front: { Icon: Shuffle,        color: '#8a9e7a', bg: 'rgba(138,158,122,0.14)', border: 'rgba(138,158,122,0.35)', label: 'No process',       stat: 'Every rep, own rules' },
    back:  { color: '#38bdf8', bg: 'rgba(56,189,248,0.14)', border: 'rgba(56,189,248,0.38)', solution: 'Workflows',        benefit: 'Repeatable from day one' },
  },
]

const SIZE = 158 // circle diameter px

export default function FlipCircles() {
  const sectionRef  = useRef(null)
  const wrapRef     = useRef(null)
  const innerRefs   = useRef([])

  useGSAP(() => {
    const inners = innerRefs.current.filter(Boolean)
    if (!inners.length) return

    // Cards slide in on first enter
    gsap.fromTo(
      wrapRef.current.children,
      { opacity: 0, scale: 0.75, y: 30 },
      {
        opacity: 1, scale: 1, y: 0,
        duration: 0.55, stagger: 0.09, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: wrapRef.current, start: 'top 82%', once: true },
      }
    )

    // Pinned scroll: flip each circle one by one as user scrolls
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${inners.length * 120}`,
        pin: true,
        anticipatePin: 1,
        scrub: 0.6,
      },
    })

    inners.forEach((inner, i) => {
      tl.to(inner, { rotateY: 180, duration: 0.6, ease: 'power2.inOut' }, i * 0.6)
    })
  }, { scope: sectionRef })

  const handleEnter = (i) => {
    gsap.to(innerRefs.current[i], { rotateY: 180, duration: 0.5, ease: 'power2.inOut' })
  }
  const handleLeave = (i) => {
    gsap.to(innerRefs.current[i], { rotateY: 0, duration: 0.5, ease: 'power2.inOut' })
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#1c1208] via-[#201608] to-[#1c1208]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#d4a43a]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 md:px-10 py-24 text-center">

        {/* Single-column title */}
        <p className="text-[#e8c87a] text-[10px] font-semibold uppercase tracking-[0.3em] mb-4">
          Problem → Solution
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-black text-white leading-[1.08] tracking-tight mb-3">
          Six pain points.
          <br />
          <span className="text-gradient">Six direct answers.</span>
        </h2>
        <p className="text-white/30 text-sm mb-14">
          Scroll through — or hover — each circle to reveal the fix.
        </p>

        {/* Circles — tight 3×2 grid, squeezed together */}
        <div
          ref={wrapRef}
          className="flex flex-wrap justify-center"
          style={{ gap: '10px' }}
        >
          {CARDS.map((card, i) => {
            const FrontIcon = card.front.Icon
            return (
              <div
                key={i}
                style={{ perspective: '900px', width: `${SIZE}px`, height: `${SIZE}px`, opacity: 0 }}
                onMouseEnter={() => handleEnter(i)}
                onMouseLeave={() => handleLeave(i)}
              >
                <div
                  ref={el => innerRefs.current[i] = el}
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Front face — problem */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '50%',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      background: card.front.bg,
                      border: `2px solid ${card.front.border}`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '18px',
                      textAlign: 'center',
                    }}
                  >
                    <FrontIcon size={24} style={{ color: card.front.color }} />
                    <p style={{ color: '#fff', fontWeight: 700, fontSize: '11px', lineHeight: 1.3 }}>
                      {card.front.label}
                    </p>
                    <p style={{ color: card.front.color, fontSize: '9px', fontWeight: 600, opacity: 0.85 }}>
                      {card.front.stat}
                    </p>
                  </div>

                  {/* Back face — solution */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '50%',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      background: card.back.bg,
                      border: `2px solid ${card.back.border}`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '18px',
                      textAlign: 'center',
                    }}
                  >
                    <CheckCircle2 size={20} style={{ color: card.back.color }} />
                    <p style={{ color: card.back.color, fontWeight: 900, fontSize: '11px', lineHeight: 1.3 }}>
                      {card.back.solution}
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '9px', lineHeight: 1.4 }}>
                      {card.back.benefit}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
