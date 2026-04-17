import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { CheckCircle2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const solutions = [
  {
    solves: 'Scattered data',
    solution: 'One Unified Platform',
    detail: 'Customers, orders, projects and messages - all centralized. Instant access from any device, anytime.',
    color: '#d4a43a',
    border: 'rgba(212,164,58,0.2)',
    bg: 'rgba(212,164,58,0.06)',
    bullets: ['Single source of truth', 'Real-time sync', 'Instant global search'],
    bars: [82, 63, 75],
  },
  {
    solves: 'Lost leads',
    solution: 'Pipeline Always in Control',
    detail: 'Every contact tracked from first inquiry to delivery. No customer slips through the cracks - ever.',
    color: '#e8c87a',
    border: 'rgba(232,200,122,0.2)',
    bg: 'rgba(232,200,122,0.06)',
    bullets: ['Visual drag-and-drop kanban', 'Auto follow-up reminders', 'Zero leads lost'],
    bars: [90, 72, 85],
  },
  {
    solves: 'Admin waste',
    solution: 'Streamlined Workflows',
    detail: 'All data lives in one place. Your team stops searching and starts selling.',
    color: '#c99554',
    border: 'rgba(201,149,84,0.2)',
    bg: 'rgba(201,149,84,0.06)',
    bullets: ['Smart auto-fill', 'One-click profiles', 'Batch actions and templates'],
    bars: [68, 55, 78],
  },
  {
    solves: 'No analytics',
    solution: 'Real-Time Analytics',
    detail: 'KPIs, revenue trends, top products and rep performance. Real data - smarter decisions.',
    color: '#b8860b',
    border: 'rgba(184,134,11,0.2)',
    bg: 'rgba(184,134,11,0.06)',
    bullets: ['Live KPI dashboard', 'Revenue trend charts', 'PDF exports'],
    bars: [77, 88, 62],
  },
]

export default function Solution() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const gridRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(
      titleRef.current.children,
      { y: 44, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 82%' },
      }
    )

    gsap.fromTo(
      gridRef.current.querySelectorAll('.solution-card'),
      { y: 50, opacity: 0, scale: 0.97 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
      }
    )

    gridRef.current.querySelectorAll('.solution-bar-fill').forEach((bar) => {
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: bar, start: 'top 90%' },
        }
      )
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="solution" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 luxury-section-bg" />
      <div className="absolute inset-0 luxury-crystal-walls pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#d4a43a]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <div ref={titleRef} className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[#e8c87a] text-sm font-medium mb-7"
            style={{ background: 'rgba(212,164,58,0.08)', border: '1px solid rgba(212,164,58,0.18)', opacity: 0 }}
          >
            <span className="w-2 h-2 rounded-full bg-[#d4a43a] animate-pulse" />
            Our Solution
          </div>

          <h2 className="font-display text-4xl md:text-[58px] font-black tracking-tight text-white mb-5 leading-[1.08]" style={{ opacity: 0 }}>
            A system built
            <br />
            <span className="text-gradient">for furniture sales</span>
          </h2>

          <p className="text-white/42 text-lg max-w-2xl mx-auto" style={{ opacity: 0 }}>
            We did not adapt a generic CRM. We built it from the ground up for furniture companies.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {solutions.map((item) => (
            <div
              key={item.solution}
              className="solution-card group relative glass shine rounded-2xl p-7 transition-all duration-350 hover:-translate-y-2 hover:shadow-2xl"
              style={{ opacity: 0, border: `1px solid ${item.border}` }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
                  style={{ color: item.color, background: item.bg, border: `1px solid ${item.border}` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />
                  Solves: {item.solves}
                </span>
              </div>

              <h3 className="font-display text-xl md:text-2xl font-black text-white tracking-tight mb-2 leading-tight">
                {item.solution}
              </h3>

              <p className="text-white/45 text-sm leading-relaxed mb-5">{item.detail}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {item.bullets.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium text-white/65 bg-white/[0.05] border border-white/[0.08]"
                  >
                    <CheckCircle2 size={10} style={{ color: item.color }} />
                    {b}
                  </span>
                ))}
              </div>

              <div className="space-y-2.5 pt-1 border-t border-white/[0.06]">
                {item.bars.map((w, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: item.color, opacity: 0.5 + i * 0.15 }} />
                    <div className="flex-1 h-1.5 rounded-full bg-white/[0.07] overflow-hidden">
                      <div
                        className="solution-bar-fill h-full rounded-full origin-left"
                        style={{ width: `${w}%`, background: item.color, opacity: 0.35 }}
                      />
                    </div>
                    <span className="text-[10px] text-white/25 w-6 text-right">{w}%</span>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <span
                  className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full"
                  style={{ color: item.color, background: item.bg, border: `1px solid ${item.border}` }}
                >
                  <CheckCircle2 size={10} /> Included in every plan
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
