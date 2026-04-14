import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { FileSpreadsheet, PhoneMissed, Clock, BarChart2, MessageSquareX, Shuffle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const problems = [
  {
    Icon: FileSpreadsheet, color: '#f87171',
    bg: 'rgba(239,68,68,0.07)', border: 'rgba(239,68,68,0.14)',
    title: 'Scattered data & spreadsheets',
    desc: "Orders on Excel, customers on paper, projects over WhatsApp. No single unified view of your business.",
  },
  {
    Icon: PhoneMissed, color: '#fb923c',
    bg: 'rgba(251,146,60,0.07)', border: 'rgba(251,146,60,0.14)',
    title: 'Leads lost in the chaos',
    desc: 'An interested customer reaches out but gets buried in emails before you can respond — and never comes back.',
  },
  {
    Icon: Clock, color: '#fbbf24',
    bg: 'rgba(251,191,36,0.07)', border: 'rgba(251,191,36,0.14)',
    title: 'Hours wasted on admin',
    desc: 'Your team spends hours copying data, re-entering customer info, and searching through old messages.',
  },
  {
    Icon: BarChart2, color: '#a78bfa',
    bg: 'rgba(167,139,250,0.07)', border: 'rgba(167,139,250,0.14)',
    title: 'Zero real analytics',
    desc: "You don't know which products sell best, which rep performs better, or when your seasonal peaks hit.",
  },
  {
    Icon: MessageSquareX, color: '#f472b6',
    bg: 'rgba(244,114,182,0.07)', border: 'rgba(244,114,182,0.14)',
    title: 'Fragmented communication',
    desc: 'Sales reps don\'t know what the installer said. Customers get different answers from different people.',
  },
  {
    Icon: Shuffle, color: '#34d399',
    bg: 'rgba(52,211,153,0.07)', border: 'rgba(52,211,153,0.14)',
    title: 'No standardized process',
    desc: "Every salesperson works their own way. There's no shared workflow from first contact to delivery.",
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
      { y: 56, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.75, stagger: 0.09, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 82%' },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="problems" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#07070b] via-[#0c0c14] to-[#07070b]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-red-900/6 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-20">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-red-300 text-sm font-medium mb-7"
            style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', opacity: 0 }}
          >
            <span className="w-2 h-2 rounded-full bg-red-400" />
            The Problem Today
          </div>

          <h2
            className="text-4xl md:text-5xl lg:text-[58px] font-black tracking-tight text-white mb-5 leading-[1.08]"
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

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((p) => (
            <div
              key={p.title}
              className="problem-card group relative rounded-2xl p-6 cursor-default shine"
              style={{ opacity: 0, background: p.bg, border: `1px solid ${p.border}` }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: p.bg, border: `1px solid ${p.border}` }}
              >
                <p.Icon size={20} style={{ color: p.color }} />
              </div>
              <h3 className="text-white font-bold text-[15px] mb-2.5">{p.title}</h3>
              <p className="text-white/42 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-white/22 text-sm">
            Recognize at least{' '}
            <span className="text-white/55 font-semibold">3 of these</span>? Your company is losing revenue every day.
          </p>
        </div>
      </div>
    </section>
  )
}
