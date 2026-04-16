import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { FileSpreadsheet, PhoneMissed, Clock, BarChart2, MessageSquareX, Shuffle, ArrowDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const problems = [
  {
    Icon: FileSpreadsheet,
    color: '#c9856a',
    bg: 'rgba(201,133,106,0.07)',
    border: 'rgba(201,133,106,0.18)',
    title: 'Scattered data & spreadsheets',
    impact: 'No unified view',
    stat: '3+ tools per rep',
    desc: "Orders on Excel, customers on paper, projects over WhatsApp.",
  },
  {
    Icon: PhoneMissed,
    color: '#cd7f32',
    bg: 'rgba(205,127,50,0.07)',
    border: 'rgba(205,127,50,0.18)',
    title: 'Leads lost in the chaos',
    impact: '~30% never return',
    stat: '€12K/mo lost',
    desc: 'Interested customers buried in emails before you respond.',
  },
  {
    Icon: Clock,
    color: '#d4a43a',
    bg: 'rgba(212,164,58,0.07)',
    border: 'rgba(212,164,58,0.18)',
    title: 'Hours wasted on admin',
    impact: '~5h/day wasted',
    stat: '40 min per entry',
    desc: 'Your team copies data, re-enters info, searches old messages.',
  },
  {
    Icon: BarChart2,
    color: '#9e8a6e',
    bg: 'rgba(158,138,110,0.07)',
    border: 'rgba(158,138,110,0.18)',
    title: 'Zero real analytics',
    impact: 'Flying blind',
    stat: 'No peak forecasting',
    desc: "You don't know which products sell best or when peaks hit.",
  },
  {
    Icon: MessageSquareX,
    color: '#b89080',
    bg: 'rgba(184,144,128,0.07)',
    border: 'rgba(184,144,128,0.18)',
    title: 'Fragmented communication',
    impact: 'Mixed messages',
    stat: 'Customers repeat themselves',
    desc: 'Reps and installers don\'t talk. Customers get different answers.',
  },
  {
    Icon: Shuffle,
    color: '#8a9e7a',
    bg: 'rgba(138,158,122,0.07)',
    border: 'rgba(138,158,122,0.18)',
    title: 'No standardized process',
    impact: 'Every rep, own rules',
    stat: 'No repeatable workflow',
    desc: "No shared process from first contact to delivery.",
  },
]

export default function Problems() {
  const sectionRef = useRef(null)
  const titleRef   = useRef(null)
  const gridRef    = useRef(null)

  useGSAP(() => {
    gsap.fromTo(
      titleRef.current.children,
      { y: 44, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.85, stagger: 0.11, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 82%' },
      }
    )

    gsap.fromTo(
      gridRef.current.querySelectorAll('.problem-card'),
      { y: 40, opacity: 0, scale: 0.97 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.65, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 82%' },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="problems" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 luxury-section-bg" />
      <div className="absolute inset-0 luxury-crystal-walls pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-red-900/4 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[#c9856a] text-sm font-medium mb-7"
            style={{ background: 'rgba(201,133,106,0.08)', border: '1px solid rgba(201,133,106,0.18)', opacity: 0 }}
          >
            <span className="w-2 h-2 rounded-full bg-[#c9856a]" />
            The Problem Today
          </div>

          <h2
            className="font-display text-4xl md:text-5xl lg:text-[58px] font-black tracking-tight text-white mb-5 leading-[1.08]"
            style={{ opacity: 0 }}
          >
            The furniture industry deserves
            <br />
            <span className="text-gradient-warm">better tools</span>
          </h2>

          <p className="text-white/42 text-lg max-w-2xl mx-auto leading-relaxed" style={{ opacity: 0 }}>
            Most furniture companies still rely on tools built for other industries — or worse, no system at all.
          </p>
        </div>

        {/* Compact problem cards — 2 columns on mobile, 3 on desktop */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {problems.map((p) => (
            <div
              key={p.title}
              className="problem-card group relative rounded-2xl p-4 cursor-default shine transition-all duration-300 hover:-translate-y-1"
              style={{ opacity: 0, background: p.bg, border: `1px solid ${p.border}` }}
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: p.bg, border: `1px solid ${p.border}` }}
                >
                  <p.Icon size={16} style={{ color: p.color }} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="text-white font-bold text-[13px] leading-snug">{p.title}</h3>
                  </div>

                  {/* Impact pills */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <span
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold"
                      style={{ color: p.color, background: p.bg, border: `1px solid ${p.border}` }}
                    >
                      {p.impact}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium text-white/40 bg-white/[0.04] border border-white/[0.07]">
                      {p.stat}
                    </span>
                  </div>

                  {/* Description — small, muted */}
                  <p className="text-white/35 text-[11px] leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom hook with arrow pointing to bridge */}
        <div className="mt-14 text-center">
          <p className="text-white/28 text-sm mb-4">
            Recognize at least{' '}
            <span className="text-white/60 font-semibold">3 of these</span>? Your company is losing revenue every day.
          </p>
          <div className="flex flex-col items-center gap-2 text-[#d4a43a]/60">
            <span className="text-xs font-medium tracking-widest uppercase">See the solution</span>
            <ArrowDown size={16} className="animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
