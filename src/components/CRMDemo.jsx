import { useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  LayoutDashboard, TrendingUp, Users, Bell,
  ArrowUp, ArrowDown, CheckCircle2, Star, AlertCircle,
  Plus, Phone, Mail, Tag, Circle, FileText,
} from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

gsap.registerPlugin(ScrollTrigger)

/* ── Shared primitives ── */
function Badge({ color, children }) {
  const map = {
    green:  { bg: 'rgba(52,211,153,0.12)',  text: '#34d399', border: 'rgba(52,211,153,0.2)' },
    blue:   { bg: 'rgba(56,189,248,0.12)',  text: '#38bdf8', border: 'rgba(56,189,248,0.2)' },
    orange: { bg: 'rgba(251,146,60,0.12)',  text: '#fb923c', border: 'rgba(251,146,60,0.2)' },
    purple: { bg: 'rgba(167,139,250,0.12)', text: '#a78bfa', border: 'rgba(167,139,250,0.2)' },
    red:    { bg: 'rgba(248,113,113,0.12)', text: '#f87171', border: 'rgba(248,113,113,0.2)' },
    gray:   { bg: 'rgba(255,255,255,0.06)', text: 'rgba(255,255,255,0.45)', border: 'rgba(255,255,255,0.1)' },
  }
  const s = map[color] || map.gray
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}` }}
    >
      {children}
    </span>
  )
}

function Avatar({ name, color, size = 'sm' }) {
  const initials = name.slice(0, 2).toUpperCase()
  const sz = size === 'sm' ? 'w-7 h-7 text-xs' : 'w-9 h-9 text-sm'
  return (
    <div className={`${sz} rounded-full flex items-center justify-center font-bold text-white shrink-0`} style={{ background: color }}>
      {initials}
    </div>
  )
}

/* ── Dashboard screen ── */
const sparkData = [{ v: 42 }, { v: 55 }, { v: 49 }, { v: 63 }, { v: 58 }, { v: 71 }, { v: 68 }, { v: 80 }, { v: 75 }, { v: 94 }]

function DashboardScreen() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Revenue MTD', val: '€94,200', delta: '+18%' },
          { label: 'New Clients',     val: '23',       delta: '+5' },
          { label: 'Active Projects', val: '41',       delta: '+2' },
          { label: 'Closed Deals',    val: '12',       delta: '+4' },
        ].map(k => (
          <div key={k.label} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="text-white/35 text-xs mb-1">{k.label}</p>
            <p className="text-white font-black text-lg leading-tight">{k.val}</p>
            <div className="flex items-center gap-1 mt-1 text-xs font-semibold text-emerald-400">
              <ArrowUp size={11} />{k.delta} vs last month
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-white font-semibold text-sm">Revenue Trend</p>
              <p className="text-white/30 text-xs">Last 10 months</p>
            </div>
            <Badge color="green">▲ 96% YoY</Badge>
          </div>
          <ResponsiveContainer width="100%" height={90}>
            <AreaChart data={sparkData} margin={{ top: 2, right: 2, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="demoGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d4a43a" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#d4a43a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis hide />
              <Tooltip
                contentStyle={{ background: '#111118', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, fontSize: 11 }}
                labelStyle={{ color: 'rgba(255,255,255,0.5)' }}
                itemStyle={{ color: '#818cf8' }}
                formatter={v => [`€${v}K`]}
              />
              <Area type="monotone" dataKey="v" stroke="#d4a43a" strokeWidth={2.5} fill="url(#demoGrad)" dot={false} activeDot={{ r: 4, fill: '#e8c87a' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
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
                  <span className="text-white/60">{p.name}</span>
                  <span className="text-white/32">{p.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className="h-full rounded-full" style={{ width: `${p.pct}%`, background: p.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <p className="text-white font-semibold text-sm mb-3">Recent Activity</p>
        <div className="space-y-2">
          {[
            { Icon: CheckCircle2, color: '#34d399', text: 'Deal closed — Villa Bianchi · Kitchen Set · €14,200', time: '2m ago' },
            { Icon: FileText,     color: '#818cf8', text: 'New order confirmed — Studio Moretti · Bedroom Suite · €8,900', time: '18m ago' },
            { Icon: Users,        color: '#38bdf8', text: 'New customer — Arredamenti De Luca added by Marco R.', time: '1h ago' },
            { Icon: AlertCircle,  color: '#fb923c', text: 'Follow-up overdue — Rossi Interiors · last contact 5 days ago', time: '3h ago' },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-3 py-1">
              <a.Icon size={13} style={{ color: a.color }} className="shrink-0" />
              <p className="text-white/55 text-xs flex-1">{a.text}</p>
              <span className="text-white/22 text-xs shrink-0">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Pipeline screen ── */
const pipeline = [
  { col: 'New Lead',    color: '#38bdf8', dot: '#38bdf8', cards: [
    { name: 'Studio Verdi', product: 'Living Room Set',  val: '€7,800',  avatar: 'SV', aColor: '#3b82f6' },
    { name: 'Casa Ferretti', product: 'Bedroom + Wardrobe', val: '€12,400', avatar: 'CF', aColor: '#8b5cf6' },
  ]},
  { col: 'Contacted',  color: '#818cf8', dot: '#818cf8', cards: [
    { name: 'Rossi Interiors', product: 'Kitchen + Island', val: '€22,400', avatar: 'RI', aColor: '#6366f1', hot: true },
    { name: 'Fratelli Manzoni', product: 'Office Furniture', val: '€9,100', avatar: 'FM', aColor: '#10b981' },
  ]},
  { col: 'Negotiation', color: '#fb923c', dot: '#fb923c', cards: [
    { name: 'Villa Bianchi', product: 'Full Home Furnishing', val: '€48,000', avatar: 'VB', aColor: '#f97316', hot: true },
  ]},
  { col: 'Closed Won',  color: '#34d399', dot: '#34d399', cards: [
    { name: 'De Luca Group',  product: 'Restaurant Seating', val: '€31,500', avatar: 'DL', aColor: '#10b981' },
    { name: 'Hotel Eleganza', product: 'Suite Furniture',    val: '€67,200', avatar: 'HE', aColor: '#a855f7' },
  ]},
]

function PipelineScreen() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {pipeline.map(col => (
        <div key={col.col} className="flex flex-col gap-2">
          <div className="flex items-center gap-2 px-1 mb-1">
            <span className="w-2 h-2 rounded-full" style={{ background: col.dot }} />
            <span className="text-xs font-bold" style={{ color: col.color }}>{col.col}</span>
            <span className="ml-auto text-white/25 text-xs">{col.cards.length}</span>
          </div>
          {col.cards.map(card => (
            <div
              key={card.name}
              className="rounded-xl p-3 cursor-default relative transition-transform duration-200 hover:-translate-y-0.5"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {card.hot && <Star size={10} className="absolute top-2 right-2 fill-orange-400 text-orange-400" />}
              <div className="flex items-center gap-2 mb-2">
                <Avatar name={card.avatar} color={card.aColor} size="sm" />
                <p className="text-white font-semibold text-xs leading-tight">{card.name}</p>
              </div>
              <p className="text-white/38 text-xs mb-2">{card.product}</p>
              <p className="text-white font-black text-sm">{card.val}</p>
            </div>
          ))}
          <button
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-white/22 text-xs transition-colors hover:text-white/38"
            style={{ border: '1px dashed rgba(255,255,255,0.1)' }}
          >
            <Plus size={12} /> Add deal
          </button>
        </div>
      ))}
    </div>
  )
}

/* ── Customer screen ── */
function CustomerScreen() {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl p-5 flex items-start gap-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shrink-0" style={{ background: 'linear-gradient(135deg, #d4a43a, #8b6508)' }}>VB</div>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap mb-0.5">
            <h3 className="text-white font-black text-lg">Villa Bianchi</h3>
            <Badge color="orange">Negotiation</Badge>
            <Badge color="purple">VIP Client</Badge>
          </div>
          <p className="text-white/40 text-sm">Marco Bianchi — Owner</p>
          <div className="flex flex-wrap gap-4 mt-3">
            <span className="flex items-center gap-1.5 text-white/35 text-xs"><Phone size={11} /> +39 02 4521 8800</span>
            <span className="flex items-center gap-1.5 text-white/35 text-xs"><Mail size={11} /> marco@villabianchi.it</span>
            <span className="flex items-center gap-1.5 text-white/35 text-xs"><Tag size={11} /> Residential · Luxury</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center shrink-0">
          {[{ label: 'Total Spent', val: '€112K' }, { label: 'Open Deals', val: '1' }, { label: 'Since', val: '2021' }].map(s => (
            <div key={s.label}>
              <p className="text-white font-black text-sm">{s.val}</p>
              <p className="text-white/30 text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-white font-semibold text-sm mb-3">Order History</p>
          <div className="space-y-2">
            {[
              { label: 'Full Home Furnishing', amount: '€48,000', status: 'In Progress', color: 'orange' },
              { label: 'Master Bedroom Suite',  amount: '€18,400', status: 'Delivered',   color: 'green' },
              { label: 'Kitchen Renovation',    amount: '€24,200', status: 'Delivered',   color: 'green' },
              { label: 'Living Room Set',       amount: '€21,500', status: 'Delivered',   color: 'green' },
            ].map((q, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/[0.04] last:border-0">
                <div>
                  <p className="text-white/75 text-xs font-medium">{q.label}</p>
                  <p className="text-[#d4a43a] text-xs font-bold mt-0.5">{q.amount}</p>
                </div>
                <Badge color={q.color}>{q.status}</Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-white font-semibold text-sm mb-3">Activity Log</p>
          <div className="space-y-3 relative">
            <div className="absolute left-[7px] top-4 bottom-2 w-px bg-white/[0.06]" />
            {[
              { Icon: FileText,     color: '#d4a43a', bg: 'rgba(212,164,58,0.15)',   text: 'Order #48 confirmed — €48,000', time: 'Today' },
              { Icon: Phone,        color: '#34d399', bg: 'rgba(52,211,153,0.15)',   text: 'Call with Marco — full furnishing interest', time: 'Yesterday' },
              { Icon: Mail,         color: '#38bdf8', bg: 'rgba(56,189,248,0.15)',   text: 'Email follow-up sent', time: '3 days ago' },
              { Icon: CheckCircle2, color: '#34d399', bg: 'rgba(52,211,153,0.15)',   text: 'Deal closed — Bedroom Suite · €18,400', time: '2 weeks ago' },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3 pl-1">
                <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: a.bg }}>
                  <Circle size={6} style={{ fill: a.color, color: a.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/58 text-xs">{a.text}</p>
                  <p className="text-white/22 text-xs mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Main ── */
const tabs = [
  { id: 'dashboard', label: 'Dashboard',       Icon: LayoutDashboard, Screen: DashboardScreen },
  { id: 'pipeline',  label: 'Sales Pipeline',  Icon: TrendingUp,      Screen: PipelineScreen  },
  { id: 'customer',  label: 'Customer Profile', Icon: Users,           Screen: CustomerScreen  },
]

export default function CRMDemo() {
  const [active, setActive] = useState('dashboard')
  const sectionRef  = useRef(null)
  const titleRef    = useRef(null)
  const windowRef   = useRef(null)
  const ActiveScreen = tabs.find(t => t.id === active)?.Screen

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
      windowRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: windowRef.current, start: 'top 82%' },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="demo" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 luxury-section-bg" />
      <div className="absolute inset-0 luxury-crystal-walls pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#d4a43a]/6 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[#e8c87a] text-sm font-medium mb-7"
            style={{ background: 'rgba(212,164,58,0.08)', border: '1px solid rgba(212,164,58,0.18)', opacity: 0 }}
          >
            <span className="w-2 h-2 rounded-full bg-[#d4a43a] animate-pulse" />
            Live Product Preview
          </div>
          <h2 className="font-display text-4xl md:text-[58px] font-black tracking-tight text-white mb-5 leading-[1.08]" style={{ opacity: 0 }}>
            See exactly what you
            <br />
            <span className="text-gradient">get on day one</span>
          </h2>
          <p className="text-white/42 text-lg max-w-xl mx-auto" style={{ opacity: 0 }}>
            Explore the actual screens your team will use — built for speed, clarity and real furniture workflows.
          </p>
        </div>

        {/* Browser window */}
        <div
          ref={windowRef}
          className="rounded-3xl overflow-hidden"
          style={{
            opacity: 0,
            background: '#0e0e18',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 48px 120px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04)',
          }}
        >
          {/* Chrome */}
          <div className="flex items-center justify-between px-5 py-3.5" style={{ background: '#0b0b14', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: 'rgba(239,68,68,0.65)' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: 'rgba(234,179,8,0.65)' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: 'rgba(34,197,94,0.65)' }} />
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-white/35 text-xs font-mono">yourcrm.app</span>
            </div>
            <div className="flex items-center gap-3">
              <Bell size={13} className="text-white/25" />
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: 'linear-gradient(135deg, #d4a43a, #8b6508)' }}>M</div>
            </div>
          </div>

          {/* Tab bar */}
          <div className="flex items-center gap-1 px-5 py-2.5 overflow-x-auto" style={{ background: '#0d0d1a', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            {tabs.map(tab => {
              const isActive = active === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200"
                  style={isActive
                    ? { background: 'rgba(212,164,58,0.12)', border: '1px solid rgba(212,164,58,0.25)', color: '#e8c87a' }
                    : { color: 'rgba(255,255,255,0.35)', background: 'transparent', border: '1px solid transparent' }
                  }
                >
                  <tab.Icon size={14} />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Screen */}
          <div className="p-5 min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.99 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                {ActiveScreen && <ActiveScreen />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Brand callout */}
        <div
          className="mt-6 rounded-2xl px-8 py-7 flex flex-col md:flex-row items-center gap-6"
          style={{ background: 'rgba(212,164,58,0.07)', border: '1px solid rgba(212,164,58,0.18)' }}
        >
          <div className="flex gap-1.5 shrink-0">
            {['#a8522a', '#d4a06a', '#f5e6d0', '#2c1810'].map(c => (
              <div key={c} className="w-7 h-7 rounded-lg border border-white/10" style={{ background: c }} />
            ))}
            <div className="w-7 flex items-center justify-center text-white/25">→</div>
            {['#d4a43a', '#e8c87a', '#fde68a', '#4d3804'].map(c => (
              <div key={c} className="w-7 h-7 rounded-lg border border-white/10" style={{ background: c }} />
            ))}
          </div>
          <div className="hidden md:block w-px h-10 bg-white/8 shrink-0" />
          <div className="flex-1 text-center md:text-left">
            <p className="text-white font-black text-lg mb-1">Your CRM, your colors — built to feel like home</p>
            <p className="text-white/42 text-sm leading-relaxed">
              We deliver the CRM styled to match{' '}
              <span className="text-white/70 font-semibold">your website's exact colors, fonts and brand</span>.
              Your team opens it and immediately feels familiar.
            </p>
          </div>
          <span
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[#e8c87a] text-sm font-bold"
            style={{ background: 'rgba(212,164,58,0.12)', border: '1px solid rgba(212,164,58,0.25)' }}
          >
            <span className="w-2 h-2 rounded-full bg-[#d4a43a] animate-pulse" />
            Included in every plan
          </span>
        </div>

        <p className="text-center text-white/18 text-xs mt-4">
          Sample data shown. Your interface will display your own clients, products and pricing.
        </p>
      </div>
    </section>
  )
}
