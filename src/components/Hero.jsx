import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play, TrendingUp, Users, Package } from 'lucide-react'

const floatingCards = [
  {
    id: 1,
    icon: <TrendingUp size={18} className="text-brand-400" />,
    title: 'Monthly Revenue',
    value: '+34%',
    sub: 'vs previous month',
    color: 'from-brand-600/20 to-purple-600/10',
  },
  {
    id: 2,
    icon: <Users size={18} className="text-emerald-400" />,
    title: 'New Customers',
    value: '128',
    sub: 'this quarter',
    color: 'from-emerald-600/20 to-teal-600/10',
  },
  {
    id: 3,
    icon: <Package size={18} className="text-accent-400" />,
    title: 'Active Projects',
    value: '47',
    sub: 'currently in progress',
    color: 'from-orange-600/20 to-red-600/10',
  },
]

export default function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.12])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">

      {/* === LUXURY FURNITURE BACKGROUND === */}
      {/* Full bleed photo with parallax */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 pointer-events-none"
      >
        <img
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Luxury dark overlay — only enough to make text readable, keep photo visible */}
      <div className="absolute inset-0 bg-[#0a0a0f]/55 pointer-events-none" />

      {/* Left vignette — darkens the text side for contrast */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, rgba(10,10,15,0.75) 0%, rgba(10,10,15,0.3) 50%, rgba(10,10,15,0.15) 100%)' }}
      />

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0a0a0f)' }}
      />

      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #0a0a0f, transparent)' }}
      />

      {/* Subtle brand color tint over the photo */}
      <div className="absolute inset-0 bg-brand-950/25 mix-blend-multiply pointer-events-none" />

      {/* Animated grid — very subtle on top of photo */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glowing orbs — reinforce the mood */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-brand-600/25 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-[90px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-24 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left — Text */}
        <div className="text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-600/10 border border-brand-500/20 text-brand-300 text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
            CRM Software Built for Furniture Companies
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6"
          >
            The CRM that{' '}
            <span className="text-gradient">understands</span>
            <br />
            your{' '}
            <span className="text-gradient">furniture</span>{' '}
            business
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-lg md:text-xl text-white/55 leading-relaxed mb-10 max-w-xl"
          >
            Manage customers, orders, projects and analytics in one platform
            designed exclusively for furniture and interior design companies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href="#cta"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-2xl shadow-2xl shadow-brand-900/50 transition-all duration-200"
            >
              Request a Free Demo
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a
              href="#features"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold rounded-2xl transition-all duration-200"
            >
              <Play size={16} className="text-brand-400" />
              Explore features
            </motion.a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-12 flex items-center gap-6"
          >
            <div className="flex -space-x-2">
              {['A', 'B', 'C', 'D'].map((l, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-[#0a0a0f] flex items-center justify-center text-xs font-bold"
                  style={{ background: `hsl(${220 + i * 30}, 70%, 50%)` }}
                >
                  {l}
                </div>
              ))}
            </div>
            <div>
              <div className="flex text-yellow-400 text-sm">{'★'.repeat(5)}</div>
              <p className="text-white/50 text-sm mt-0.5">
                Already used by leading furniture companies
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right — Floating dashboard cards */}
        <div className="hidden lg:flex flex-col gap-4 relative">
          {/* Main dashboard preview card */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="bg-glass rounded-2xl p-6 border border-white/10 shadow-2xl card-shine"
          >
            {/* Fake top bar */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="ml-2 flex-1 h-5 bg-white/5 rounded-md text-white/30 text-xs flex items-center px-2">
                furnicrm.app/dashboard
              </div>
            </div>

            <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-3">
              Dashboard Overview
            </p>

            {/* Stat row */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: 'Active Clients', value: '1,284', delta: '+12%' },
                { label: 'Open Deals', value: '€ 94K', delta: '+8%' },
                { label: 'Open Orders', value: '36', delta: '+5%' },
              ].map((s) => (
                <div key={s.label} className="bg-white/5 rounded-xl p-3">
                  <p className="text-white/40 text-xs mb-1">{s.label}</p>
                  <p className="text-white font-bold text-base">{s.value}</p>
                  <p className="text-emerald-400 text-xs font-semibold mt-0.5">{s.delta}</p>
                </div>
              ))}
            </div>

            {/* Fake bar chart */}
            <div className="bg-white/3 rounded-xl p-4">
              <p className="text-white/40 text-xs mb-3">Revenue — Last 6 months</p>
              <div className="flex items-end gap-2 h-16">
                {[40, 65, 55, 75, 60, 90].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.6, delay: 0.8 + i * 0.07, ease: 'easeOut' }}
                    className="flex-1 rounded-t-md"
                    style={{
                      background:
                        i === 5
                          ? 'linear-gradient(to top, #4f46e5, #818cf8)'
                          : 'rgba(99,102,241,0.3)',
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'].map((m) => (
                  <span key={m} className="text-white/25 text-xs">{m}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Floating metric cards */}
          {floatingCards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, x: 60, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3, scale: 1.02 }}
              className="bg-glass bg-glass-hover rounded-xl p-4 border border-white/10 flex items-center gap-4 cursor-default card-shine"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center border border-white/10`}>
                {card.icon}
              </div>
              <div>
                <p className="text-white/50 text-xs">{card.title}</p>
                <p className="text-white font-bold text-lg leading-tight">{card.value}</p>
                <p className="text-white/35 text-xs">{card.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />
    </section>
  )
}
