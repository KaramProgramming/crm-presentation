import { useRef } from 'react'
import { useScroll, useTransform, useSpring, motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────

const CIRCLES = [
  { label: 'Custom\nOrder Flow',   color: '#d4a43a', bg: 'rgba(212,164,58,0.13)',  border: 'rgba(212,164,58,0.5)'  },
  { label: 'Supplier\nAlerts',     color: '#34d399', bg: 'rgba(52,211,153,0.13)',  border: 'rgba(52,211,153,0.5)'  },
  { label: 'Room-Based\nProjects', color: '#38bdf8', bg: 'rgba(56,189,248,0.13)',  border: 'rgba(56,189,248,0.5)'  },
  { label: 'Delivery\nCalendar',   color: '#a78bfa', bg: 'rgba(167,139,250,0.13)', border: 'rgba(167,139,250,0.5)' },
  { label: 'Margin\nCalculator',   color: '#cd7f32', bg: 'rgba(205,127,50,0.13)',  border: 'rgba(205,127,50,0.5)'  },
  { label: 'WhatsApp\nLogs',       color: '#fb923c', bg: 'rgba(251,146,60,0.13)',  border: 'rgba(251,146,60,0.5)'  },
  { label: 'Showroom\nTracking',   color: '#a3e635', bg: 'rgba(163,230,53,0.13)',  border: 'rgba(163,230,53,0.5)'  },
  { label: 'Branch\nInventory',    color: '#f472b6', bg: 'rgba(244,114,182,0.13)', border: 'rgba(244,114,182,0.5)' },
]

// Phase 1 — tight cluster (small offsets from center, slightly overlapping)
const CLUSTER = [
  { x: -6,  y: -4  },
  { x: 32,  y: -24 },
  { x: -28, y: 26  },
  { x: 24,  y: 34  },
  { x: -34, y: -14 },
  { x: 18,  y: -32 },
  { x: -14, y: 42  },
  { x: 38,  y: 14  },
]

// Phase 2 — radial explosion outward
const EXPLODE = [
  { x: -370, y: -260 }, // NW
  { x: 0,    y: -330 }, // N
  { x: 370,  y: -260 }, // NE
  { x: 420,  y: 0    }, // E
  { x: 370,  y: 260  }, // SE
  { x: 0,    y: 330  }, // S
  { x: -370, y: 260  }, // SW
  { x: -420, y: 0    }, // W
]

// Phase 3 — clean 4 × 2 grid  (circle 160px, gap 20px)
// col centers from grid-center: ±270, ±90  |  row centers: ±92
const GRID = [
  { x: -270, y: -92 }, { x: -90, y: -92 }, { x:  90, y: -92 }, { x: 270, y: -92 },
  { x: -270, y:  92 }, { x: -90, y:  92 }, { x:  90, y:  92 }, { x: 270, y:  92 },
]

const SIZE   = 160   // circle diameter px
const HALF   = SIZE / 2
const SPRING = { stiffness: 68, damping: 19, mass: 0.65 }

// ─── Single animated circle ───────────────────────────────────────────────────

function BurstCircle({ circle, index, progress }) {
  const d = index * 0.012   // per-circle stagger offset in scroll-progress space

  // Keyframe: cluster (instant) → explode → hold → grid
  const kIn  = [0,            0.06 + d, 0.20 + d, 0.97]
  const kOut = [CLUSTER[index].x, EXPLODE[index].x, EXPLODE[index].x, GRID[index].x]
  const kY   = [CLUSTER[index].y, EXPLODE[index].y, EXPLODE[index].y, GRID[index].y]

  const rawX  = useTransform(progress, kIn, kOut)
  const rawY  = useTransform(progress, kIn, kY)
  const scale = useTransform(progress,
    [0, 0.02, 0.08 + d, 0.22 + d, 0.97],
    [0.0, 0.72, 1.15,   1.0,       1.0])
  const opacity = useTransform(progress, [0, 0.01, 0.85, 0.97], [0, 1, 1, 1])

  const x = useSpring(rawX, SPRING)
  const y = useSpring(rawY, SPRING)

  return (
    <motion.div
      style={{
        x, y, scale, opacity,
        position:     'absolute',
        left:         -HALF,
        top:          -HALF,
        width:         SIZE,
        height:        SIZE,
        borderRadius: '50%',
        background:    circle.bg,
        border:       `2px solid ${circle.border}`,
        boxShadow:    `0 0 48px ${circle.bg}, 0 12px 32px rgba(0,0,0,0.5)`,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        display:       'flex',
        alignItems:    'center',
        justifyContent:'center',
        textAlign:     'center',
        padding:       '14px',
        userSelect:    'none',
        cursor:        'default',
      }}
    >
      <span
        style={{
          color:       circle.color,
          fontWeight:  900,
          fontSize:    '14px',
          lineHeight:  1.28,
          letterSpacing: '-0.02em',
          whiteSpace:  'pre-line',
          textShadow:  `0 0 24px ${circle.color}55`,
        }}
      >
        {circle.label}
      </span>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ClusterBurst() {
  const outerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target:  outerRef,
    offset: ['start start', 'end end'],
  })

  const hintOpacity = useTransform(scrollYProgress, [0, 0.07], [1, 0])
  const labelOpacity = useTransform(scrollYProgress, [0.55, 0.72], [0, 1])

  return (
    /* Outer: provides scroll distance (320 vh = animation space) */
    <div ref={outerRef} style={{ height: '320vh', position: 'relative' }}>

      {/* Inner: sticky — stays locked in viewport while outer scrolls */}
      <div
        style={{
          position:  'sticky',
          top:        0,
          height:   '100vh',
          overflow:  'hidden',
          display:   'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c1208] via-[#201608] to-[#1c1208]" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 75% 65% at 50% 50%, rgba(212,164,58,0.07) 0%, transparent 70%)',
          }}
        />

        {/* ── Section header ── */}
        <div className="absolute top-0 left-0 right-0 pt-14 text-center z-20 pointer-events-none px-6">
          <p className="text-[#e8c87a] text-[10px] font-semibold uppercase tracking-[0.3em] mb-3">
            Our Biggest Differentiator
          </p>
          <h2 className="font-display text-white font-black text-3xl md:text-[46px] tracking-tight leading-[1.06]">
            Whatever your business needs—
            <br />
            <span className="text-gradient">we build it.</span>
          </h2>
          <p className="text-white/30 text-sm mt-3 max-w-lg mx-auto">
            Real features. Shipped for real furniture companies. Your list will be different — and that's the point.
          </p>
        </div>

        {/* ── Circles anchor (positioned at viewport center) ── */}
        {/*
          Scale breakpoints shrink the cluster on small screens
          so circles don't overflow the viewport during explosion.
        */}
        <div
          className="relative scale-[0.52] xs:scale-[0.62] sm:scale-[0.75] md:scale-[0.88] lg:scale-100"
          style={{ width: 0, height: 0 }}
        >
          {CIRCLES.map((circle, i) => (
            <BurstCircle
              key={i}
              circle={circle}
              index={i}
              progress={scrollYProgress}
            />
          ))}
        </div>

        {/* ── Labels that appear after grid settles ── */}
        <motion.div
          style={{ opacity: labelOpacity }}
          className="absolute bottom-10 left-0 right-0 text-center pointer-events-none z-20"
        >
          <p className="text-white/22 text-xs uppercase tracking-[0.22em]">
            + anything else you need
          </p>
        </motion.div>

        {/* ── Scroll hint (fades as user starts scrolling) ── */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-1.5 pointer-events-none z-20"
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={15} className="text-white/28" />
          </motion.div>
          <p className="text-white/22 text-[10px] uppercase tracking-[0.25em]">Scroll to explore</p>
        </motion.div>
      </div>
    </div>
  )
}
