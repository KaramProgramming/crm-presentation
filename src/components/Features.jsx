import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Users,
  TrendingUp,
  FileText,
  LayoutDashboard,
  Package,
  Bell,
  ChevronRight,
} from 'lucide-react'

const features = [
  {
    id: 'customers',
    icon: Users,
    color: 'text-brand-400',
    bg: 'from-brand-600/20 to-purple-600/5',
    border: 'border-brand-500/20',
    title: 'Customer Management',
    tagline: 'Every customer, a complete history',
    desc: 'Full customer profiles with purchase history, style preferences, sales notes and contacts — all in one unified view.',
    bullets: ['360° customer profile', 'Full order history', 'Advanced tagging & segmentation', 'Communication log'],
  },
  {
    id: 'sales',
    icon: TrendingUp,
    color: 'text-emerald-400',
    bg: 'from-emerald-600/20 to-teal-600/5',
    border: 'border-emerald-500/20',
    title: 'Sales Pipeline',
    tagline: 'Guide customers from visit to delivery',
    desc: 'Visualize every deal in an intuitive kanban board. Move leads through the stages: Interest → Contacted → Negotiation → Closed.',
    bullets: ['Drag & drop kanban', 'Closing probability', 'Automatic reminders', 'Monthly team targets'],
  },
  {
    id: 'orders',
    icon: FileText,
    color: 'text-sky-400',
    bg: 'from-sky-600/20 to-blue-600/5',
    border: 'border-sky-500/20',
    title: 'Order & Project Management',
    tagline: 'From first contact to final delivery',
    desc: 'Track every order and project through its full lifecycle. Assign tasks, monitor status and keep the entire team aligned on every delivery.',
    bullets: ['Full order lifecycle tracking', 'Task assignment per project', 'Delivery status visibility', 'Team collaboration notes'],
  },
  {
    id: 'dashboard',
    icon: LayoutDashboard,
    color: 'text-violet-400',
    bg: 'from-violet-600/20 to-purple-600/5',
    border: 'border-violet-500/20',
    title: 'Executive Dashboard',
    tagline: 'A live snapshot of your business',
    desc: 'Critical KPIs visible at a glance: revenue, trends, conversion rate, salesperson performance and top products.',
    bullets: ['Customizable KPIs', 'Interactive charts', 'Period comparison', 'Exportable reports'],
  },
  {
    id: 'products',
    icon: Package,
    color: 'text-accent-400',
    bg: 'from-orange-600/20 to-red-600/5',
    border: 'border-orange-500/20',
    title: 'Product Catalog',
    tagline: 'Your smart product catalog',
    desc: 'Manage your entire furniture catalog with variants, materials, dimensions and prices — directly linked to orders and projects.',
    bullets: ['Variants & configurations', 'Price lists per tier', 'Availability & lead time', 'Images & specs'],
  },
  {
    id: 'notifications',
    icon: Bell,
    color: 'text-pink-400',
    bg: 'from-pink-600/20 to-rose-600/5',
    border: 'border-pink-500/20',
    title: 'Notifications & Follow-ups',
    tagline: 'No customer ever forgotten',
    desc: 'The system reminds your team when to call a customer back, when a follow-up is overdue, or when an order needs attention.',
    bullets: ['Automatic reminders', 'Overdue follow-up alerts', 'Delayed order warnings', 'Weekly digest for managers'],
  },
]

function FeatureCard({ feature, index, isActive, onClick }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = feature.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -3 }}
      onClick={onClick}
      className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 card-shine ${
        isActive
          ? `bg-gradient-to-br ${feature.bg} ${feature.border} shadow-lg`
          : 'bg-glass bg-glass-hover border-white/8'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.bg} border ${feature.border} flex items-center justify-center shrink-0`}>
          <Icon size={18} className={feature.color} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-white font-bold text-base">{feature.title}</h3>
            <ChevronRight
              size={16}
              className={`shrink-0 transition-transform duration-300 ${isActive ? 'rotate-90 ' + feature.color : 'text-white/30'}`}
            />
          </div>
          <p className={`text-sm mt-1 ${isActive ? 'text-white/70' : 'text-white/40'}`}>
            {feature.tagline}
          </p>
        </div>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-white/60 text-sm leading-relaxed mb-4">{feature.desc}</p>
              <ul className="space-y-2">
                {feature.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm">
                    <span className={`w-1.5 h-1.5 rounded-full ${feature.color.replace('text-', 'bg-')}`} />
                    <span className="text-white/65">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0)
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })
  const active = features[activeFeature]
  const ActiveIcon = active.icon

  return (
    <section id="features" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0c0c16] to-[#0a0a0f]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
            Features
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-white mb-5"
          >
            Everything you need,
            <br />
            <span className="text-gradient">nothing you don't</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/50 text-lg max-w-xl mx-auto"
          >
            Every feature was designed by listening to the real needs
            of furniture companies.
          </motion.p>
        </div>

        {/* Layout: left cards + right preview */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left — feature list */}
          <div className="space-y-3">
            {features.map((f, i) => (
              <FeatureCard
                key={f.id}
                feature={f}
                index={i}
                isActive={activeFeature === i}
                onClick={() => setActiveFeature(i)}
              />
            ))}
          </div>

          {/* Right — sticky visual */}
          <div className="lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={`bg-gradient-to-br ${active.bg} border ${active.border} rounded-3xl p-8 min-h-[420px] flex flex-col justify-between shadow-2xl card-shine`}
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${active.bg} border ${active.border} flex items-center justify-center mb-6 shadow-lg`}>
                    <ActiveIcon size={26} className={active.color} />
                  </div>
                  <p className={`text-sm font-semibold uppercase tracking-widest mb-2 ${active.color}`}>
                    {active.title}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
                    {active.tagline}
                  </h3>
                  <p className="text-white/60 leading-relaxed">{active.desc}</p>
                </div>

                <div className="mt-8 space-y-3">
                  {active.bullets.map((b, i) => (
                    <motion.div
                      key={b}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3"
                    >
                      <span className={`w-2 h-2 rounded-full ${active.color.replace('text-', 'bg-')} shrink-0`} />
                      <span className="text-white/75 text-sm font-medium">{b}</span>
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
