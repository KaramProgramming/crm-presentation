import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { CheckCircle2, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const solutions = [
  {
    problem: 'Scattered data & spreadsheets',
    solution: 'Everything in one platform',
    detail: 'Customers, orders, projects and communications — all centralized. Instant access from any device, anytime.',
    color: '#818cf8', border: 'rgba(99,102,241,0.2)', bg: 'rgba(99,102,241,0.06)',
    bullets: ['Single source of truth', 'Real-time sync across devices', 'Instant global search'],
  },
  {
    problem: 'Lost leads',
    solution: 'Sales pipeline always under control',
    detail: 'Every contact is tracked from the first inquiry through to delivery. No customer ever slips through the cracks again.',
    color: '#34d399', border: 'rgba(52,211,153,0.2)', bg: 'rgba(52,211,153,0.06)',
    bullets: ['Visual drag-and-drop kanban', 'Auto follow-up reminders', 'Zero leads lost, ever'],
  },
  {
    problem: 'Hours wasted on admin',
    solution: 'Streamlined workflows',
    detail: 'All data lives in one place. Your team stops searching and starts selling.',
    color: '#38bdf8', border: 'rgba(56,189,248,0.2)', bg: 'rgba(56,189,248,0.06)',
    bullets: ['Smart auto-fill on new entries', 'One-click customer profiles', 'Batch actions and templates'],
  },
  {
    problem: 'No analytics visibility',
    solution: 'Real-time analytics dashboard',
    detail: 'KPIs, revenue trends, top products and rep performance. Real data, smarter decisions.',
    color: '#a78bfa', border: 'rgba(167,139,250,0.2)', bg: 'rgba(167,139,250,0.06)',
    bullets: ['Live KPI dashboard', 'Revenue trend charts', 'Exportable PDF reports'],
  },
]

function SolutionRow({ item, index }) {
  const rowRef  = useRef(null)
  const isEven  = index % 2 === 0

  useGSAP(() => {
    const text   = rowRef.current.querySelector('.text-col')
    const visual = rowRef.current.querySelector('.visual-col')

    gsap.fromTo(
      isEven ? [text, visual] : [visual, text],
      { y: 55, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9, stagger: 0.16, ease: 'power3.out',
        scrollTrigger: { trigger: rowRef.current, start: 'top 80%' },
      }
    )
  }, { scope: rowRef })

  return (
    <div
      ref={rowRef}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}
    >
      {/* Text */}
      <div className="text-col flex-1 space-y-5" style={{ opacity: 0 }}>
        <div className="flex items-center gap-2 text-white/28 text-sm font-medium">
          <span className="line-through decoration-white/18">{item.problem}</span>
          <ArrowRight size={13} style={{ color: item.color }} />
        </div>

        <h3 className="text-2xl md:text-[30px] font-black text-white tracking-tight leading-tight">
          {item.solution}
        </h3>

        <p className="text-white/48 leading-relaxed">{item.detail}</p>

        <div className="space-y-3 pt-1">
          {item.bullets.map((b) => (
            <div key={b} className="flex items-center gap-3">
              <CheckCircle2 size={15} style={{ color: item.color }} className="shrink-0" />
              <span className="text-white/58 text-sm">{b}</span>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{ color: item.color, background: item.bg, border: `1px solid ${item.border}` }}
          >
            <CheckCircle2 size={12} /> Included in every plan
          </span>
        </div>
      </div>

      {/* Visual */}
      <div
        className="visual-col flex-1 rounded-2xl p-8 shine"
        style={{ opacity: 0, background: item.bg, border: `1px solid ${item.border}` }}
      >
        <div className="space-y-4">
          {[82, 63, 75, 55].map((w, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: item.color, opacity: 0.7 + i * 0.08 }} />
              <div className="h-2 rounded-full bg-white/[0.08] flex-1">
                <div className="h-full rounded-full" style={{ width: `${w}%`, background: item.color, opacity: 0.25 }} />
              </div>
            </div>
          ))}

          {/* Fake UI widget */}
          <div className="mt-6 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <div className="h-2 w-24 bg-white/10 rounded-full" />
            </div>
            <div className="space-y-2">
              <div className="h-1.5 w-full bg-white/8 rounded-full" />
              <div className="h-1.5 w-3/4 bg-white/5 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Solution() {
  const sectionRef = useRef(null)
  const titleRef   = useRef(null)

  useGSAP(() => {
    gsap.fromTo(
      titleRef.current.children,
      { y: 44, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 82%' },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="solution" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#07070b] via-[#0f0f1a] to-[#07070b]" />
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-24">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-indigo-300 text-sm font-medium mb-7"
            style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)', opacity: 0 }}
          >
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            Our Solution
          </div>

          <h2
            className="text-4xl md:text-[58px] font-black tracking-tight text-white mb-5 leading-[1.08]"
            style={{ opacity: 0 }}
          >
            A system built
            <br />
            <span className="text-gradient">for furniture sales</span>
          </h2>

          <p className="text-white/42 text-lg max-w-2xl mx-auto" style={{ opacity: 0 }}>
            We didn't adapt a generic CRM. We built it from the ground up for furniture companies.
          </p>
        </div>

        {/* Rows */}
        <div className="space-y-24">
          {solutions.map((item, i) => (
            <SolutionRow key={item.solution} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
