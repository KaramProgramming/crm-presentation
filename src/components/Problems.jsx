import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { FileSpreadsheet, PhoneMissed, Clock, BarChart2, MessageSquareX, Shuffle, ArrowDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const problems = [
  {
    Icon: FileSpreadsheet,
    number: '01',
    color: '#c9856a',
    bg: 'rgba(201,133,106,0.07)',
    border: 'rgba(201,133,106,0.16)',
    title: 'Scattered data & spreadsheets',
    impact: 'No unified view',
    stat: '3+ tools per rep',
    desc: "Orders on Excel, customers on paper, projects over WhatsApp.",
  },
  {
    Icon: PhoneMissed,
    number: '02',
    color: '#cd7f32',
    bg: 'rgba(205,127,50,0.07)',
    border: 'rgba(205,127,50,0.16)',
    title: 'Leads lost in the chaos',
    impact: '~30% never return',
    stat: '€12K/mo lost',
    desc: 'Interested customers buried in emails before you respond.',
  },
  {
    Icon: Clock,
    number: '03',
    color: '#d4a43a',
    bg: 'rgba(212,164,58,0.07)',
    border: 'rgba(212,164,58,0.16)',
    title: 'Hours wasted on admin',
    impact: '~5h/day wasted',
    stat: '40 min per entry',
    desc: 'Your team copies data, re-enters info, searches old messages.',
  },
  {
    Icon: BarChart2,
    number: '04',
    color: '#9e8a6e',
    bg: 'rgba(158,138,110,0.07)',
    border: 'rgba(158,138,110,0.16)',
    title: 'Zero real analytics',
    impact: 'Flying blind',
    stat: 'No peak forecasting',
    desc: "You don't know which products sell best or when peaks hit.",
  },
  {
    Icon: MessageSquareX,
    number: '05',
    color: '#b89080',
    bg: 'rgba(184,144,128,0.07)',
    border: 'rgba(184,144,128,0.16)',
    title: 'Fragmented communication',
    impact: 'Mixed messages',
    stat: 'Customers repeat themselves',
    desc: 'Reps and installers don\'t talk. Customers get different answers.',
  },
  {
    Icon: Shuffle,
    number: '06',
    color: '#8a9e7a',
    bg: 'rgba(138,158,122,0.07)',
    border: 'rgba(138,158,122,0.16)',
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
      { y: 40, opacity: 0, scale: 0.96 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.65, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 82%' },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="problems" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 luxury-section-bg" />
      <div className="absolute inset-0 luxury-crystal-walls pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[320px] rounded-full blur-[140px] pointer-events-none" style={{ background: 'rgba(180,60,40,0.03)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-12">
          <div
            className="schema-label text-[#c9856a] mb-6"
            style={{ background: 'rgba(201,133,106,0.07)', border: '1px solid rgba(201,133,106,0.18)', opacity: 0 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9856a]" />
            The Problem Today
          </div>

          <h2
            className="schema-heading mb-4"
            style={{ opacity: 0 }}
          >
            The furniture industry deserves
            <br />
            <span className="text-gradient-warm">better tools</span>
          </h2>

          <p className="text-white/42 text-base max-w-xl mx-auto leading-relaxed" style={{ opacity: 0 }}>
            Most furniture companies still rely on tools built for other industries — or worse, no system at all.
          </p>
        </div>

        {/* Problem cards — schema-frame glass container */}
        <div ref={gridRef} className="schema-frame p-6 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {problems.map((p) => (
              <div
                key={p.title}
                className="problem-card group relative rounded-xl p-4 cursor-default shine overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{ opacity: 0, background: p.bg, border: `1px solid ${p.border}` }}
              >
                {/* Ghost number */}
                <span
                  className="absolute -right-2 -top-3 font-display font-black leading-none select-none pointer-events-none"
                  style={{
                    fontSize: '72px',
                    color: 'transparent',
                    WebkitTextStroke: `1px ${p.color}`,
                    opacity: 0.14,
                  }}
                  aria-hidden="true"
                >
                  {p.number}
                </span>

                {/* schema-row: icon + title */}
                <div className="schema-row mb-3 relative">
                  <div
                    className="schema-step-num transition-transform duration-300 group-hover:scale-105"
                    style={{ background: p.bg, border: `1px solid ${p.border}`, color: p.color }}
                  >
                    <p.Icon size={17} />
                  </div>
                  <div className="pt-1">
                    <h3 className="text-white font-semibold text-[13px] leading-snug">{p.title}</h3>
                    <p className="text-white/36 text-[11px] leading-relaxed mt-1">{p.desc}</p>
                  </div>
                </div>

                {/* Pills */}
                <div className="flex flex-wrap gap-1.5 relative">
                  <span
                    className="schema-pill"
                    style={{ color: p.color, background: p.bg, borderColor: p.border }}
                  >
                    {p.impact}
                  </span>
                  <span className="schema-pill">{p.stat}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom hook — inside the frame */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/32 text-sm">
              Recognize at least{' '}
              <span className="text-white/58 font-semibold">3 of these</span>? Your company is losing revenue every day.
            </p>
            <div className="flex items-center gap-2 text-[#d4a43a]/55">
              <span className="text-[10px] font-semibold tracking-[0.28em] uppercase">See the solution</span>
              <ArrowDown size={13} className="animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
