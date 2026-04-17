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
    <section ref={sectionRef} id="problems" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 luxury-section-bg" />
      <div className="absolute inset-0 luxury-crystal-walls pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] rounded-full blur-[160px] pointer-events-none" style={{ background: 'rgba(180,60,40,0.04)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-[#c9856a] text-xs font-semibold tracking-widest uppercase mb-7"
            style={{ background: 'rgba(201,133,106,0.07)', border: '1px solid rgba(201,133,106,0.18)', opacity: 0 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9856a]" />
            The Problem Today
          </div>

          <h2
            className="font-display text-4xl md:text-5xl lg:text-[58px] font-black tracking-tight text-white mb-5 leading-[1.06]"
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

        {/* Problem cards — 3 columns */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((p) => (
            <div
              key={p.title}
              className="problem-card group relative rounded-2xl p-5 cursor-default shine overflow-hidden transition-all duration-350 hover:-translate-y-1.5"
              style={{ opacity: 0, background: p.bg, border: `1px solid ${p.border}` }}
            >
              {/* Ghost number in background */}
              <span
                className="absolute -right-3 -top-4 font-display font-black leading-none select-none pointer-events-none"
                style={{
                  fontSize: '88px',
                  color: 'transparent',
                  WebkitTextStroke: `1px ${p.color.replace(')', ',0.1)').replace('rgb', 'rgba')}`,
                  WebkitTextStrokeColor: p.color,
                  opacity: 0.18,
                }}
                aria-hidden="true"
              >
                {p.number}
              </span>

              {/* Top: icon + title */}
              <div className="flex items-start gap-3 mb-4 relative">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-105"
                  style={{ background: p.bg, border: `1px solid ${p.border}` }}
                >
                  <p.Icon size={18} style={{ color: p.color }} />
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-white font-bold text-[14px] leading-snug">{p.title}</h3>
                </div>
              </div>

              {/* Impact pills */}
              <div className="flex flex-wrap gap-1.5 mb-3 relative">
                <span
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold"
                  style={{ color: p.color, background: p.bg, border: `1px solid ${p.border}` }}
                >
                  {p.impact}
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium text-white/38 bg-white/[0.04] border border-white/[0.06]">
                  {p.stat}
                </span>
              </div>

              {/* Description */}
              <p className="relative text-white/36 text-[12px] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom hook */}
        <div className="mt-14 text-center">
          <p className="text-white/28 text-sm mb-5">
            Recognize at least{' '}
            <span className="text-white/58 font-semibold">3 of these</span>? Your company is losing revenue every day.
          </p>
          <div className="flex flex-col items-center gap-2 text-[#d4a43a]/55">
            <span className="text-[10px] font-semibold tracking-[0.28em] uppercase">See the solution</span>
            <ArrowDown size={14} className="animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
