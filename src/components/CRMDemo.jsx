import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  LayoutDashboard, TrendingUp, Users,
  Bell, ArrowUp, ArrowDown, CheckCircle2,
  Star, AlertCircle, Plus,
  Phone, Mail, Tag, Circle, FileText,
} from 'lucide-react'
import {
  AreaChart, Area, ResponsiveContainer, Tooltip, XAxis,
} from 'recharts'

/* ─────────────────────────────────────────
   SHARED PRIMITIVES
───────────────────────────────────────── */
function Badge({ color, children }) {
  const map = {
    green: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
    blue: 'bg-sky-500/15 text-sky-400 border-sky-500/25',
    orange: 'bg-orange-500/15 text-orange-400 border-orange-500/25',
    purple: 'bg-violet-500/15 text-violet-400 border-violet-500/25',
    red: 'bg-red-500/15 text-red-400 border-red-500/25',
    gray: 'bg-white/8 text-white/50 border-white/10',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${map[color]}`}>
      {children}
    </span>
  )
}

function Avatar({ name, color, size = 'sm' }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  const sz = size === 'sm' ? 'w-7 h-7 text-xs' : 'w-9 h-9 text-sm'
  return (
    <div className={`${sz} rounded-full flex items-center justify-center font-bold text-white shrink-0`} style={{ background: color }}>
      {initials}
    </div>
  )
}

/* ─────────────────────────────────────────
   SCREEN 1 — DASHBOARD
───────────────────────────────────────── */
const revenueSparkline = [
  { v: 42 }, { v: 55 }, { v: 49 }, { v: 63 }, { v: 58 }, { v: 71 }, { v: 68 }, { v: 80 }, { v: 75 }, { v: 94 },
]

function DashboardScreen() {
  return (
    <div className="flex flex-col gap-4">
      {/* KPI row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Revenue MTD', val: '€ 94,200', delta: '+18%', up: true },
          { label: 'New Clients', val: '23', delta: '+5', up: true },
          { label: 'Active Projects', val: '41', delta: '+2', up: true },
          { label: 'Closed Deals', val: '12', delta: '+4', up: true },
        ].map(k => (
          <div key={k.label} className="bg-white/5 rounded-xl p-3 border border-white/8">
            <p className="text-white/40 text-xs mb-1">{k.label}</p>
            <p className="text-white font-black text-lg leading-tight">{k.val}</p>
            <div className={`flex items-center gap-1 mt-1 text-xs font-semibold ${k.up ? 'text-emerald-400' : 'text-red-400'}`}>
              {k.up ? <ArrowUp size={11} /> : <ArrowDown size={11} />}
              {k.delta} vs last month
            </div>
          </div>
        ))}
      </div>

      {/* Chart + top products */}
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 bg-white/5 rounded-xl border border-white/8 p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-white font-semibold text-sm">Revenue Trend</p>
              <p className="text-white/35 text-xs">Last 10 months</p>
            </div>
            <Badge color="green">▲ 96% YoY</Badge>
          </div>
          <ResponsiveContainer width="100%" height={90}>
            <AreaChart data={revenueSparkline} margin={{ top: 2, right: 2, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="demoGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis hide />
              <Tooltip
                contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 11 }}
                labelStyle={{ color: 'rgba(255,255,255,0.5)' }}
                itemStyle={{ color: '#818cf8' }}
                formatter={v => [`€ ${v}K`]}
              />
              <Area type="monotone" dataKey="v" stroke="#6366f1" strokeWidth={2} fill="url(#demoGrad)" dot={false} activeDot={{ r: 4, fill: '#818cf8' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/5 rounded-xl border border-white/8 p-4">
          <p className="text-white font-semibold text-sm mb-3">Top Products</p>
          <div className="space-y-2.5">
            {[
              { name: 'Modular Sofa', pct: 38, color: '#6366f1' },
              { name: 'Master Bedroom', pct: 27, color: '#10b981' },
              { name: 'Kitchen Set', pct: 21, color: '#f97316' },
              { name: 'Dining Table', pct: 14, color: '#8b5cf6' },
            ].map(p => (
              <div key={p.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/70">{p.name}</span>
                  <span className="text-white/40">{p.pct}%</span>
                </div>
                <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${p.pct}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: p.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-white/5 rounded-xl border border-white/8 p-4">
        <p className="text-white font-semibold text-sm mb-3">Recent Activity</p>
        <div className="space-y-2">
          {[
            { icon: CheckCircle2, color: 'text-emerald-400', text: 'Deal closed — Villa Bianchi · Kitchen Set · €14,200', time: '2m ago' },
            { icon: FileText, color: 'text-brand-400', text: 'New order confirmed — Studio Moretti · Bedroom Suite · €8,900', time: '18m ago' },
            { icon: Users, color: 'text-sky-400', text: 'New customer — Arredamenti De Luca added by Marco R.', time: '1h ago' },
            { icon: AlertCircle, color: 'text-orange-400', text: 'Follow-up overdue — Rossi Interiors · last contact 5 days ago', time: '3h ago' },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-3 py-1">
              <a.icon size={14} className={`shrink-0 ${a.color}`} />
              <p className="text-white/60 text-xs flex-1">{a.text}</p>
              <span className="text-white/25 text-xs shrink-0">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   SCREEN 2 — SALES PIPELINE
───────────────────────────────────────── */
const pipeline = [
  {
    col: 'New Lead',
    color: 'text-sky-400',
    dot: 'bg-sky-400',
    cards: [
      { name: 'Studio Verdi', product: 'Living Room Set', val: '€ 7,800', avatar: 'SV', aColor: '#3b82f6' },
      { name: 'Casa Ferretti', product: 'Bedroom + Wardrobe', val: '€ 12,400', avatar: 'CF', aColor: '#8b5cf6' },
    ],
  },
  {
    col: 'Contacted',
    color: 'text-brand-400',
    dot: 'bg-brand-400',
    cards: [
      { name: 'Rossi Interiors', product: 'Kitchen + Island', val: '€ 22,400', avatar: 'RI', aColor: '#6366f1', hot: true },
      { name: 'Fratelli Manzoni', product: 'Office Furniture', val: '€ 9,100', avatar: 'FM', aColor: '#10b981' },
    ],
  },
  {
    col: 'Negotiation',
    color: 'text-orange-400',
    dot: 'bg-orange-400',
    cards: [
      { name: 'Villa Bianchi', product: 'Full Home Furnishing', val: '€ 48,000', avatar: 'VB', aColor: '#f97316', hot: true },
    ],
  },
  {
    col: 'Closed Won',
    color: 'text-emerald-400',
    dot: 'bg-emerald-400',
    cards: [
      { name: 'De Luca Group', product: 'Restaurant Seating', val: '€ 31,500', avatar: 'DL', aColor: '#10b981' },
      { name: 'Hotel Eleganza', product: 'Suite Furniture', val: '€ 67,200', avatar: 'HE', aColor: '#a855f7' },
    ],
  },
]

function PipelineScreen() {
  return (
    <div className="grid grid-cols-4 gap-3 h-full">
      {pipeline.map((col) => (
        <div key={col.col} className="flex flex-col gap-2">
          <div className="flex items-center gap-2 px-1 mb-1">
            <span className={`w-2 h-2 rounded-full ${col.dot}`} />
            <span className={`text-xs font-bold ${col.color}`}>{col.col}</span>
            <span className="ml-auto text-white/30 text-xs">{col.cards.length}</span>
          </div>
          {col.cards.map((card) => (
            <motion.div
              key={card.name}
              whileHover={{ y: -2, scale: 1.01 }}
              className="bg-white/6 border border-white/8 rounded-xl p-3 cursor-default relative"
            >
              {card.hot && (
                <span className="absolute top-2 right-2">
                  <Star size={10} className="text-orange-400 fill-orange-400" />
                </span>
              )}
              <div className="flex items-center gap-2 mb-2">
                <Avatar name={card.avatar} color={card.aColor} size="sm" />
                <p className="text-white font-semibold text-xs leading-tight">{card.name}</p>
              </div>
              <p className="text-white/40 text-xs mb-2">{card.product}</p>
              <p className="text-white font-black text-sm">{card.val}</p>
            </motion.div>
          ))}
          {/* Add card button */}
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-white/10 text-white/25 text-xs hover:border-white/20 hover:text-white/40 transition-colors">
            <Plus size={12} /> Add deal
          </button>
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────
   SCREEN 3 — CUSTOMER PROFILE
───────────────────────────────────────── */
function CustomerScreen() {
  return (
    <div className="flex flex-col gap-4">
      {/* Customer header */}
      <div className="bg-white/5 rounded-xl border border-white/8 p-5 flex items-start gap-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shrink-0" style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>
          VB
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-white font-black text-lg">Villa Bianchi</h3>
            <Badge color="orange">Negotiation</Badge>
            <Badge color="purple">VIP Client</Badge>
          </div>
          <p className="text-white/45 text-sm mt-0.5">Marco Bianchi — Owner</p>
          <div className="flex flex-wrap gap-4 mt-3">
            <span className="flex items-center gap-1.5 text-white/40 text-xs"><Phone size={11} /> +39 02 4521 8800</span>
            <span className="flex items-center gap-1.5 text-white/40 text-xs"><Mail size={11} /> marco@villabianchi.it</span>
            <span className="flex items-center gap-1.5 text-white/40 text-xs"><Tag size={11} /> Residential · Luxury</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center shrink-0">
          {[
            { label: 'Total Spent', val: '€ 112K' },
            { label: 'Open Deals', val: '1' },
            { label: 'Since', val: '2021' },
          ].map(s => (
            <div key={s.label}>
              <p className="text-white font-black text-base">{s.val}</p>
              <p className="text-white/35 text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Order history */}
        <div className="bg-white/5 rounded-xl border border-white/8 p-4">
          <p className="text-white font-semibold text-sm mb-3">Order History</p>
          <div className="space-y-2">
            {[
              { label: 'Full Home Furnishing', amount: '€ 48,000', status: 'In Progress', color: 'orange' },
              { label: 'Master Bedroom Suite', amount: '€ 18,400', status: 'Delivered', color: 'green' },
              { label: 'Kitchen Renovation', amount: '€ 24,200', status: 'Delivered', color: 'green' },
              { label: 'Living Room Set', amount: '€ 21,500', status: 'Delivered', color: 'green' },
            ].map((q, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-white/80 text-xs font-medium">{q.label}</p>
                  <p className="text-brand-400 text-xs font-bold mt-0.5">{q.amount}</p>
                </div>
                <Badge color={q.color}>{q.status}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="bg-white/5 rounded-xl border border-white/8 p-4">
          <p className="text-white font-semibold text-sm mb-3">Activity Log</p>
          <div className="space-y-3 relative">
            <div className="absolute left-[7px] top-4 bottom-2 w-px bg-white/8" />
            {[
              { icon: FileText, color: 'text-brand-400 bg-brand-500/20', text: 'Order #48 confirmed — €48,000', time: 'Today' },
              { icon: Phone, color: 'text-emerald-400 bg-emerald-500/20', text: 'Call with Marco — interested in full furnishing', time: 'Yesterday' },
              { icon: Mail, color: 'text-sky-400 bg-sky-500/20', text: 'Email follow-up sent', time: '3 days ago' },
              { icon: CheckCircle2, color: 'text-emerald-400 bg-emerald-500/20', text: 'Deal closed — Bedroom Suite · €18,400', time: '2 weeks ago' },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3 pl-1">
                <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${a.color}`}>
                  <Circle size={6} className="fill-current" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/65 text-xs">{a.text}</p>
                  <p className="text-white/25 text-xs mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, screen: DashboardScreen },
  { id: 'pipeline', label: 'Sales Pipeline', icon: TrendingUp, screen: PipelineScreen },
  { id: 'customer', label: 'Customer Profile', icon: Users, screen: CustomerScreen },
]

export default function CRMDemo() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })
  const ActiveScreen = tabs.find(t => t.id === activeTab)?.screen

  return (
    <section id="demo" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0c0c18] to-[#0a0a0f]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-900/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto section-padding">

        {/* Header */}
        <div ref={titleRef} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
            Live Product Preview
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-white mb-5"
          >
            See exactly what you
            <br />
            <span className="text-gradient">get on day one</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/50 text-lg max-w-xl mx-auto"
          >
            Explore the actual screens your team will use every day — built for speed, clarity and real furniture workflows.
          </motion.p>
        </div>

        {/* Demo window */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#111118] rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
          style={{ boxShadow: '0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)' }}
        >
          {/* Window chrome */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-[#0d0d15] border-b border-white/6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-lg border border-white/8">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-white/40 text-xs font-mono">furnicrm.app</span>
            </div>
            <div className="flex items-center gap-3">
              <Bell size={14} className="text-white/30" />
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">M</div>
            </div>
          </div>

          {/* Tab bar */}
          <div className="flex items-center gap-1 px-5 py-2.5 bg-[#0f0f1a] border-b border-white/6 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-600/20 border border-brand-500/30 text-brand-300'
                      : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                  }`}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Screen content */}
          <div className="p-5 min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.99 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                {ActiveScreen && <ActiveScreen />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Brand customization callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 relative overflow-hidden rounded-2xl border border-brand-500/25 bg-gradient-to-r from-brand-600/10 via-purple-600/8 to-brand-600/10 p-px"
        >
          <div className="rounded-2xl bg-[#0d0d18]/80 backdrop-blur-sm px-8 py-7 flex flex-col md:flex-row items-center gap-6">

            {/* Color swatches visual */}
            <div className="flex items-center gap-3 shrink-0">
              {/* "Their site" colors → arrow → CRM colors */}
              <div className="flex gap-1.5">
                {['#a8522a', '#d4a06a', '#f5e6d0', '#2c1810'].map((c, i) => (
                  <motion.div
                    key={c}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.07, type: 'spring', stiffness: 300 }}
                    className="w-7 h-7 rounded-lg border border-white/10 shadow-lg"
                    style={{ background: c }}
                  />
                ))}
              </div>

              <div className="flex flex-col items-center gap-0.5 px-2">
                <div className="flex gap-0.5">
                  {[1,2,3].map(i => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -4 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + i * 0.08 }}
                      className="w-4 h-0.5 rounded-full bg-brand-400"
                    />
                  ))}
                </div>
                <span className="text-white/30 text-[10px] font-medium">your brand</span>
              </div>

              <div className="flex gap-1.5">
                {['#6366f1', '#818cf8', '#a5b4fc', '#1e1b4b'].map((c, i) => (
                  <motion.div
                    key={c}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + i * 0.07, type: 'spring', stiffness: 300 }}
                    className="w-7 h-7 rounded-lg border border-white/10 shadow-lg"
                    style={{ background: c }}
                  />
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-12 bg-white/10 shrink-0" />

            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-white font-black text-lg mb-1">
                Your CRM, your colors — built to feel like home
              </p>
              <p className="text-white/50 text-sm leading-relaxed">
                We deliver the CRM frontend styled to match <span className="text-white/80 font-semibold">your website's exact colors, fonts and brand identity</span>.
                Your team opens it and immediately feels familiar — no learning curve, no foreign look.
              </p>
            </div>

            {/* Badge */}
            <div className="shrink-0">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600/20 border border-brand-500/30 text-brand-300 text-sm font-bold rounded-xl">
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
                Included in every plan
              </span>
            </div>
          </div>
        </motion.div>

        <p className="text-center text-white/20 text-xs mt-4">
          Sample data shown. Your interface will display your own clients, products and pricing.
        </p>
      </div>
    </section>
  )
}
