import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Problems', href: '#problems' },
  { label: 'ROI & Benefits', href: '#benefits' },
  { label: 'Demo', href: '#demo' },
  { label: 'Built for You', href: '#custom' },
  { label: 'Features', href: '#features' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      { y: -64, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.15 }
    )
  })

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#1c1208]/88 backdrop-blur-2xl border-b border-white/[0.05] shadow-2xl shadow-black/30'
          : 'bg-transparent'
      }`}
      style={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#d4a43a]/25 group-hover:scale-105" style={{ background: 'linear-gradient(135deg, #d4a43a 0%, #8b6508 100%)' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" fill="white" fillOpacity="0.92" />
            </svg>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm text-white/48 hover:text-white/90 transition-colors duration-300 font-medium group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#d4a43a]/60 group-hover:w-full transition-all duration-350 ease-out" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <a
            href="#cta"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-[#1a1008] text-sm font-bold rounded-xl transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #f0d078 0%, #d4a43a 50%, #a07820 100%)',
              boxShadow: '0 4px 20px rgba(212,164,58,0.32)',
            }}
          >
            Request Demo
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/55 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-350 ease-in-out overflow-hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#1c1208]/95 backdrop-blur-2xl border-b border-white/[0.05] px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-white/55 hover:text-white font-medium transition-colors duration-200 text-sm"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-5 py-3 bg-[#b8860b] text-white text-sm font-semibold rounded-xl text-center transition-colors hover:bg-[#d4a43a]"
          >
            Request Demo
          </a>
        </div>
      </div>
    </nav>
  )
}
