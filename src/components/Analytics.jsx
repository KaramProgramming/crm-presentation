import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'
import { TrendingUp, Award, Eye, Zap } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const revenueData = [
  { month: 'Jul', value: 48 }, { month: 'Aug', value: 52 }, { month: 'Sep', value: 61 },
  { month: 'Oct', value: 58 }, { month: 'Nov', value: 72 }, { month: 'Dec', value: 68 },
  { month: 'Jan', value: 75 }, { month: 'Feb', value: 83 }, { month: 'Mar', value: 79 }, { month: 'Apr', value: 94 },
]

const productData = [
  { name: 'Sofas',    value: 38 },
  { name: 'Bedrooms', value: 27 },
  { name: 'Kitchens', value: 22 },
  { name: 'Tables',   value: 18 },
  { name: 'Other',    value: 12 },
]

const kpis = [
  { label: 'Revenue YTD',        value: '€1.24M',  delta: '+18%', color: '#818cf8', border: 'rgba(99,102,241,0.2)',   bg: 'rgba(99,102,241,0.07)'   },
  { label: 'Conversion Rate',    value: '34.2%',   delta: '+6pp', color: '#34d399', border: 'rgba(52,211,153,0.2)',   bg: 'rgba(52,211,153,0.07)'   },
  { label: 'Avg. Order Value',   value: '€8,400',  delta: '+12%', color: '#38bdf8', border: 'rgba(56,189,248,0.2)',   bg: 'rgba(56,189,248,0.07)'   },
  { label: 'Returning Customers',value: '61%',     delta: '+9pp', color: '#a78bfa', border: 'rgba(167,139,250,0.2)',  bg: 'rgba(167,139,250,0.07)'  },
]

const AreaTip = ({ active, payload, label }) => active && payload?.length ? (
  <div className="rounded-xl px-4 py-3 shadow-2xl" style={{ background: '#111120', border: '1px solid rgba(255,255,255,0.1)' }}>
    <p className="text-white/40 text-xs mb-1">{label}</p>
    <p className="text-white font-bold">€{payload[0].value}K</p>
  </div>
) : null

const BarTip = ({ active, payload, label }) => active && payload?.length ? (
  <div className="rounded-xl px-4 py-3 shadow-2xl" style={{ background: '#111120', border: '1px solid rgba(255,255,255,0.1)' }}>
    <p className="text-white/40 text-xs mb-1">{label}</p>
    <p className="text-white font-bold">{payload[0].value}% of sales</p>
  </div>
) : null

export default function Analytics() {
  const sectionRef = useRef(null)
  const titleRef   = useRef(null)
  const kpisRef    = useRef(null)
  const chartsRef  = useRef(null)
  const bannerRef  = useRef(null)

  useGSAP(() => {
    gsap.fromTo(titleRef.current.children,
      { y: 44, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 82%' } }
    )
    gsap.fromTo(kpisRef.current.querySelectorAll('.kpi-card'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, stagger: 0.09, ease: 'power3.out',
        scrollTrigger: { trigger: kpisRef.current, start: 'top 82%' } }
    )
    gsap.fromTo(chartsRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.85, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: chartsRef.current, start: 'top 82%' } }
    )
    gsap.fromTo(bannerRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: bannerRef.current, start: 'top 88%' } }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="analytics" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#07070b] via-[#0e0e1c] to-[#07070b]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-violet-300 text-sm font-medium mb-7"
            style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)', opacity: 0 }}
          >
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            Business Intelligence
          </div>
          <h2 className="text-4xl md:text-[58px] font-black tracking-tight text-white mb-5 leading-[1.08]" style={{ opacity: 0 }}>
            Real data,
            <br />
            <span className="text-gradient">smarter decisions</span>
          </h2>
          <p className="text-white/42 text-lg max-w-2xl mx-auto" style={{ opacity: 0 }}>
            No more manual Excel reports. Your dashboard updates every metric in real time so you can make
            informed decisions every single day.
          </p>
        </div>

        {/* KPI cards */}
        <div ref={kpisRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {kpis.map(kpi => (
            <div
              key={kpi.label}
              className="kpi-card group rounded-2xl p-5 shine transition-transform duration-300 hover:-translate-y-1"
              style={{ opacity: 0, background: kpi.bg, border: `1px solid ${kpi.border}` }}
            >
              <p className="text-white/38 text-xs font-medium mb-2">{kpi.label}</p>
              <p className="text-white font-black text-2xl tracking-tight">{kpi.value}</p>
              <p className="text-sm font-semibold mt-1.5" style={{ color: kpi.color }}>{kpi.delta} vs last year</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div ref={chartsRef} className="grid lg:grid-cols-3 gap-5">
          {/* Revenue area chart */}
          <div
            className="lg:col-span-2 rounded-2xl p-6 shine"
            style={{ opacity: 0, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-white font-bold text-base">Monthly Revenue</p>
                <p className="text-white/35 text-sm">Last 10 months (€ in thousands)</p>
              </div>
              <div
                className="flex items-center gap-2 text-emerald-400 text-sm font-semibold px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.15)' }}
              >
                <TrendingUp size={13} /> +96%
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={revenueData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.38} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<AreaTip />} cursor={{ stroke: 'rgba(99,102,241,0.25)', strokeWidth: 1 }} />
                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2.5} fill="url(#revGrad)" dot={false} activeDot={{ r: 5, fill: '#818cf8', stroke: '#07070b', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Top categories bar */}
          <div
            className="rounded-2xl p-6 shine"
            style={{ opacity: 0, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <Award size={15} className="text-orange-400" />
                <p className="text-white font-bold text-base">Top Categories</p>
              </div>
              <p className="text-white/35 text-sm">By sales volume</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={productData} layout="vertical" margin={{ top: 0, right: 5, bottom: 0, left: 0 }}>
                <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.28)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 12 }} axisLine={false} tickLine={false} width={60} />
                <Tooltip content={<BarTip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                <Bar dataKey="value" fill="#f97316" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Banner */}
        <div
          ref={bannerRef}
          className="mt-10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ opacity: 0, background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)' }}
            >
              <Eye size={20} className="text-indigo-400" />
            </div>
            <div>
              <p className="text-white font-bold text-base">Want to see your real data?</p>
              <p className="text-white/42 text-sm mt-1">
                During the demo you can import your own data and see your personalized dashboards instantly.
              </p>
            </div>
          </div>
          <a
            href="#cta"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all duration-200"
            style={{ boxShadow: '0 8px 24px rgba(79,70,229,0.3)' }}
          >
            <Zap size={15} /> Book the Demo
          </a>
        </div>
      </div>
    </section>
  )
}
