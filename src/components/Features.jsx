import { useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Users, TrendingUp, FileText, LayoutDashboard, Package, Bell, ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    id: 'customers', Icon: Users,
    color: '#818cf8', border: 'rgba(99,102,241,0.2)', bg: 'rgba(99,102,241,0.07)',
    title: 'Customer Management',
    tagline: 'Every customer, a complete history',
    desc: 'Full customer profiles with purchase history, style preferences, sales notes and contacts — all in one unified view.',
    bullets: ['360° customer profile', 'Full order history', 'Advanced tagging & segmentation', 'Communication log'],
  },
  {
    id: 'sales', Icon: TrendingUp,
    color: '#34d399', border: 'rgba(52,211,153,0.2)', bg: 'rgba(52,211,153,0.07)',
    title: 'Sales Pipeline',
    tagline: 'Guide customers from visit to delivery',
    desc: 'Visualize every deal in an intuitive kanban board. Move leads through stages: Interest → Contacted → Negotiation → Closed.',
    bullets: ['Drag & drop kanban', 'Closing probability', 'Automatic reminders', 'Monthly team targets'],
  },
  {
    id: 'orders', Icon: FileText,
    color: '#38bdf8', border: 'rgba(56,189,248,0.2)', bg: 'rgba(56,189,248,0.07)',
    title: 'Order & Project Management',
    tagline: 'From first contact to final delivery',
    desc: 'Track every order through its full lifecycle. Assign tasks, monitor status and keep the entire team aligned.',
    bullets: ['Full order lifecycle tracking', 'Task assignment per project', 'Delivery status visibility', 'Team collaboration notes'],
  },
  {
    id: 'dashboard', Icon: LayoutDashboard,
    color: '#a78bfa', border: 'rgba(167,139,250,0.2)', bg: 'rgba(167,139,250,0.07)',
    title: 'Executive Dashboard',
    tagline: 'A live snapshot of your business',
    desc: 'Critical KPIs at a glance: revenue, trends, conversion rate, salesperson performance and top products.',
    bullets: ['Customizable KPIs', 'Interactive charts', 'Period comparison', 'Exportable reports'],
  },
  {
    id: 'products', Icon: Package,
    color: '#fb923c', border: 'rgba(251,146,60,0.2)', bg: 'rgba(251,146,60,0.07)',
    title: 'Product Catalog',
    tagline: 'Your smart product catalog',
    desc: 'Manage your entire furniture catalog with variants, materials, dimensions and prices — linked to orders and projects.',
    bullets: ['Variants & configurations', 'Price lists per tier', 'Availability & lead time', 'Images & specs'],
  },
  {
    id: 'notifications', Icon: Bell,
    color: '#f472b6', border: 'rgba(244,114,182,0.2)', bg: 'rgba(244,114,182,0.07)',
    title: 'Notifications & Follow-ups',
    tagline: 'No customer ever forgotten',
    desc: 'The system reminds your team when to call a customer back, when a follow-up is overdue, or when an order needs attention.',
    bullets: ['Automatic reminders', 'Overdue follow-up alerts', 'Delayed order warnings', 'Weekly digest for managers'],
  },
]

export default function Features() {
  const [activeIdx, setActiveIdx] = useState(0)
  const sectionRef = useRef(null)
  const titleRef   = useRef(null)
  const layoutRef  = useRef(null)
  const active     = features[activeIdx]

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
      layoutRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: layoutRef.current, start: 'top 82%' },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="features" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#07070b] via-[#0c0c16] to-[#07070b]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-900/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-indigo-300 text-sm font-medium mb-7"
            style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)', opacity: 0 }}
          >
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            Features
          </div>
          <h2 className="text-4xl md:text-[58px] font-black tracking-tight text-white mb-5 leading-[1.08]" style={{ opacity: 0 }}>
            Everything you need,
            <br />
            <span className="text-gradient">nothing you don't</span>
          </h2>
          <p className="text-white/42 text-lg max-w-xl mx-auto" style={{ opacity: 0 }}>
            Every feature was designed by listening to the real needs of furniture companies.
          </p>
        </div>

        {/* Layout */}
        <div ref={layoutRef} className="grid lg:grid-cols-2 gap-8 items-start" style={{ opacity: 0 }}>
          {/* Left — feature list */}
          <div className="space-y-2.5">
            {features.map((f, i) => {
              const isActive = activeIdx === i
              return (
                <div
                  key={f.id}
                  onClick={() => setActiveIdx(i)}
                  className="rounded-2xl p-5 cursor-pointer transition-all duration-300 shine"
                  style={{
                    background: isActive ? f.bg : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${isActive ? f.border : 'rgba(255,255,255,0.06)'}`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300"
                      style={{ background: f.bg, border: `1px solid ${f.border}` }}
                    >
                      <f.Icon size={17} style={{ color: f.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-white font-bold text-sm">{f.title}</h3>
                        <ChevronRight
                          size={15}
                          className={`shrink-0 transition-transform duration-300 ${isActive ? 'rotate-90' : ''}`}
                          style={{ color: isActive ? f.color : 'rgba(255,255,255,0.25)' }}
                        />
                      </div>
                      <p className="text-xs mt-0.5" style={{ color: isActive ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.35)' }}>
                        {f.tagline}
                      </p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-white/[0.06]">
                          <p className="text-white/52 text-sm leading-relaxed mb-4">{f.desc}</p>
                          <div className="grid grid-cols-2 gap-2">
                            {f.bullets.map((b) => (
                              <div key={b} className="flex items-center gap-2 text-xs">
                                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: f.color }} />
                                <span className="text-white/58">{b}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

          {/* Right — sticky preview */}
          <div className="lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl p-8 min-h-[440px] flex flex-col justify-between shine"
                style={{ background: active.bg, border: `1px solid ${active.border}`, boxShadow: '0 24px 60px rgba(0,0,0,0.3)' }}
              >
                <div>
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: active.bg, border: `1px solid ${active.border}` }}
                  >
                    <active.Icon size={26} style={{ color: active.color }} />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] mb-2" style={{ color: active.color }}>
                    {active.title}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
                    {active.tagline}
                  </h3>
                  <p className="text-white/52 leading-relaxed text-sm">{active.desc}</p>
                </div>

                <div className="mt-8 space-y-2.5">
                  {active.bullets.map((b, i) => (
                    <motion.div
                      key={b}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-center gap-3 rounded-xl px-4 py-3"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: active.color }} />
                      <span className="text-white/70 text-sm font-medium">{b}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
