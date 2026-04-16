import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, Code2, MessageSquare, Paintbrush, Rocket, Sparkles } from 'lucide-react'

const steps = [
  {
    number: '01',
    Icon: MessageSquare,
    color: '#f4efe8',
    border: 'rgba(244,239,232,0.42)',
    bg: 'rgba(244,239,232,0.14)',
    glow: 'rgba(244,239,232,0.16)',
    title: 'We listen',
    desc: 'We map your workflow, blockers, and the exact way your team works.',
  },
  {
    number: '02',
    Icon: Paintbrush,
    color: '#e3d8cc',
    border: 'rgba(227,216,204,0.42)',
    bg: 'rgba(227,216,204,0.14)',
    glow: 'rgba(227,216,204,0.16)',
    title: 'We design',
    desc: 'You see the feature structure before any build work starts.',
  },
  {
    number: '03',
    Icon: Code2,
    color: '#d5c8bb',
    border: 'rgba(213,200,187,0.42)',
    bg: 'rgba(213,200,187,0.14)',
    glow: 'rgba(213,200,187,0.16)',
    title: 'We build',
    desc: 'Fields, automations, and views are built directly into your CRM.',
  },
  {
    number: '04',
    Icon: Rocket,
    color: '#c7b7a7',
    border: 'rgba(199,183,167,0.42)',
    bg: 'rgba(199,183,167,0.14)',
    glow: 'rgba(199,183,167,0.16)',
    title: 'We support',
    desc: 'We launch, train your team, and keep refining the system with you.',
  },
]

const CLUSTER = [
  { x: -24, y: -22 },
  { x: 20, y: -18 },
  { x: -18, y: 20 },
  { x: 24, y: 24 },
]

const EXPLODED = [
  { x: -258, y: -148, tiltX: -7, tiltY: 8, depth: 1.05 },
  { x: 258, y: -148, tiltX: -7, tiltY: -8, depth: 1.05 },
  { x: -258, y: 148, tiltX: 7, tiltY: 8, depth: 1.05 },
  { x: 258, y: 148, tiltX: 7, tiltY: -8, depth: 1.05 },
]

const CIRCLE_SIZE = 288
const HALF_SIZE = CIRCLE_SIZE / 2
const RESPONSIVE_SPRING = { stiffness: 220, damping: 28, mass: 0.56 }

function StepBubble({ step, index, progress }) {
  const stagger = index * 0.026
  const xRaw = useTransform(progress, [0, 0.01 + stagger, 0.09 + stagger, 1], [CLUSTER[index].x, CLUSTER[index].x, EXPLODED[index].x, EXPLODED[index].x])
  const yBase = useTransform(progress, [0, 0.01 + stagger, 0.09 + stagger, 1], [CLUSTER[index].y, CLUSTER[index].y, EXPLODED[index].y, EXPLODED[index].y])
  const parallax = useTransform(progress, [0, 1], [index % 2 === 0 ? -10 : 10, index % 2 === 0 ? 14 : -14])
  const yRaw = useTransform([yBase, parallax], ([base, drift]) => base + drift)
  const scaleRaw = useTransform(progress, [0, 0.02 + stagger, 0.07 + stagger, 0.11 + stagger], [0.62, 0.84, EXPLODED[index].depth + 0.05, EXPLODED[index].depth])
  const opacity = useTransform(progress, [0, 0.025, 0.1], [0.76, 1, 1])
  const rotateX = useTransform(progress, [0, 0.09 + stagger], [0, EXPLODED[index].tiltX])
  const rotateY = useTransform(progress, [0, 0.09 + stagger], [0, EXPLODED[index].tiltY])
  const shadowStrength = useTransform(progress, [0, 0.09 + stagger], [0.18, 0.34])
  const boxShadow = useTransform(shadowStrength, (value) => `0 24px 68px rgba(0,0,0,${value}), 0 0 48px ${step.glow}`)

  const x = useSpring(xRaw, RESPONSIVE_SPRING)
  const y = useSpring(yRaw, RESPONSIVE_SPRING)
  const scale = useSpring(scaleRaw, RESPONSIVE_SPRING)

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        opacity,
        rotateX,
        rotateY,
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        left: -HALF_SIZE,
        top: -HALF_SIZE,
        position: 'absolute',
        transformStyle: 'preserve-3d',
        zIndex: 20 + index,
      }}
      className="rounded-full p-6 md:p-7 will-change-transform"
    >
      <motion.div
        className="relative h-full w-full rounded-full overflow-hidden backdrop-blur-xl"
        style={{
          background: `radial-gradient(circle at 30% 24%, rgba(255,255,255,0.16) 0%, ${step.bg} 42%, rgba(18,16,15,0.22) 100%)`,
          border: `1px solid ${step.border}`,
          boxShadow,
        }}
      >
        <div className="absolute inset-x-[18%] top-4 h-px bg-white/20" />
        <span className="absolute right-7 top-5 text-[56px] font-black text-white/[0.06] leading-none">
          {step.number}
        </span>

        <div className="flex h-full flex-col justify-center px-8 text-center">
          <div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: 'rgba(255,255,255,0.08)', border: `1px solid ${step.border}` }}
          >
            <step.Icon size={26} style={{ color: step.color }} />
          </div>

          <h3 className="text-white text-[24px] md:text-[26px] font-black tracking-tight mb-2.5">{step.title}</h3>
          <p className="text-white/62 text-[14px] md:text-[15px] leading-relaxed max-w-[196px] mx-auto">{step.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function CustomDev() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const hintOpacity = useTransform(scrollYProgress, [0, 0.028], [1, 0])
  const stageY = useTransform(scrollYProgress, [0, 1], [8, -8])

  return (
    <section ref={sectionRef} id="custom" className="relative h-[118vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 luxury-section-bg" />
        <div className="absolute inset-0 luxury-crystal-walls pointer-events-none" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 62% 48% at 50% 54%, rgba(248,243,238,0.09) 0%, transparent 72%)' }} />
        <div className="absolute left-1/2 top-[64%] h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/6 blur-[180px]" />

        <div className="relative z-10 grid h-full grid-rows-[auto_1fr_auto] px-6 text-center">
          <div className="pointer-events-none mx-auto w-full max-w-4xl pt-10 md:pt-12">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[#efe7de]"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <Sparkles size={14} className="text-white/82" />
              Our Biggest Differentiator
            </div>

            <h2 className="font-display mt-6 text-4xl font-black leading-[1.04] tracking-tight text-white md:text-5xl lg:text-[62px]">
              We do not force your workflow
              <br />
              <span className="text-gradient">into our software.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/48 md:text-lg">
              Scroll once and the process opens immediately: we listen, design, build, and support around the way your business actually runs.
            </p>
          </div>

          <div className="flex items-center justify-center pt-8 pb-10 md:pt-12 md:pb-14">
            <motion.div
              style={{ y: stageY }}
              className="[perspective:1600px]"
            >
              <div
                className="relative scale-[0.28] xs:scale-[0.35] sm:scale-[0.46] md:scale-[0.62] lg:scale-[0.84] xl:scale-[0.94]"
                style={{ width: 0, height: 0 }}
              >
                {steps.map((step, index) => (
                  <StepBubble key={step.number} step={step} index={index} progress={scrollYProgress} />
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            style={{ opacity: hintOpacity }}
            className="pointer-events-none text-center pb-7"
          >
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
              >
                <ArrowDown size={15} className="text-white/30" />
              </motion.div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/24">Scroll to reveal the process</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
