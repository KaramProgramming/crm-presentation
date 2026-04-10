import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { TrendingUp, Award, Eye, Zap } from 'lucide-react'

const revenueData = [
  { month: 'Jul', value: 48 },
  { month: 'Aug', value: 52 },
  { month: 'Sep', value: 61 },
  { month: 'Oct', value: 58 },
  { month: 'Nov', value: 72 },
  { month: 'Dec', value: 68 },
  { month: 'Jan', value: 75 },
  { month: 'Feb', value: 83 },
  { month: 'Mar', value: 79 },
  { month: 'Apr', value: 94 },
]

const productData = [
  { name: 'Sofas', value: 38 },
  { name: 'Bedrooms', value: 27 },
  { name: 'Kitchens', value: 22 },
  { name: 'Tables', value: 18 },
  { name: 'Other', value: 12 },
]

const kpis = [
  { label: 'Revenue YTD', value: '€ 1.24M', delta: '+18%', color: 'text-brand-400', bg: 'from-brand-600/15 to-purple-600/5', border: 'border-brand-500/20' },
  { label: 'Conversion Rate', value: '34.2%', delta: '+6 pp', color: 'text-emerald-400', bg: 'from-emerald-600/15 to-teal-600/5', border: 'border-emerald-500/20' },
  { label: 'Avg. Order Value', value: '€ 8,400', delta: '+12%', color: 'text-sky-400', bg: 'from-sky-600/15 to-blue-600/5', border: 'border-sky-500/20' },
  { label: 'Returning Customers', value: '61%', delta: '+9 pp', color: 'text-violet-400', bg: 'from-violet-600/15 to-purple-600/5', border: 'border-violet-500/20' },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-3 shadow-2xl">
        <p className="text-white/50 text-xs mb-1">{label}</p>
        <p className="text-white font-bold">€ {payload[0].value}K</p>
      </div>
    )
  }
  return null
}

const BarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-3 shadow-2xl">
        <p className="text-white/50 text-xs mb-1">{label}</p>
        <p className="text-white font-bold">{payload[0].value}% of sales</p>
      </div>
    )
  }
  return null
}

export default function Analytics() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })
  const chartsRef = useRef(null)
  const chartsInView = useInView(chartsRef, { once: true, margin: '-80px' })

  return (
    <section id="analytics" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0e0e1c] to-[#0a0a0f]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-900/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            Business Intelligence
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-white mb-5"
          >
            Real data,
            <br />
            <span className="text-gradient">smarter decisions</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/50 text-lg max-w-2xl mx-auto"
          >
            No more manual Excel reports. Your dashboard updates every metric
            in real time, so you can make informed decisions every single day.
          </motion.p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {kpis.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -3, scale: 1.02 }}
              className={`bg-gradient-to-br ${kpi.bg} border ${kpi.border} rounded-2xl p-5 card-shine`}
            >
              <p className="text-white/45 text-xs font-medium mb-2">{kpi.label}</p>
              <p className="text-white font-black text-2xl tracking-tight">{kpi.value}</p>
              <p className={`text-sm font-semibold mt-1 ${kpi.color}`}>{kpi.delta} vs last year</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div ref={chartsRef} className="grid lg:grid-cols-3 gap-6">

          {/* Revenue area chart — wide */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={chartsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 bg-glass rounded-2xl border border-white/8 p-6 card-shine"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-white font-bold text-lg">Monthly Revenue</p>
                <p className="text-white/40 text-sm">Last 10 months (€ in thousands)</p>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                <TrendingUp size={14} />
                +96%
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={revenueData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(99,102,241,0.3)', strokeWidth: 1 }} />
                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2.5} fill="url(#revenueGrad)" dot={false} activeDot={{ r: 5, fill: '#818cf8', stroke: '#0a0a0f', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Product bar chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={chartsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-glass rounded-2xl border border-white/8 p-6 card-shine"
          >
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <Award size={16} className="text-accent-400" />
                <p className="text-white font-bold text-lg">Top Categories</p>
              </div>
              <p className="text-white/40 text-sm">By sales volume</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={productData} layout="vertical" margin={{ top: 0, right: 5, bottom: 0, left: 0 }}>
                <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} axisLine={false} tickLine={false} width={60} />
                <Tooltip content={<BarTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Bar dataKey="value" fill="#f97316" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Bottom CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 bg-gradient-to-r from-brand-600/20 via-purple-600/15 to-brand-600/20 border border-brand-500/25 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center shrink-0">
              <Eye size={20} className="text-brand-400" />
            </div>
            <div>
              <p className="text-white font-bold text-lg">Want to see your real data?</p>
              <p className="text-white/50 text-sm mt-1">
                During the demo you can import your own data and instantly see your personalized dashboards.
              </p>
            </div>
          </div>
          <motion.a
            href="#cta"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="shrink-0 flex items-center gap-2 px-7 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow-lg shadow-brand-900/40 transition-colors"
          >
            <Zap size={16} />
            Book the Demo
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
