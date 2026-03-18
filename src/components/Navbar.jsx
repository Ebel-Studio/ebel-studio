import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'

/* The E-shaped brand mark from the identity SVG */
function LogoMark({ dark = true }) {
  const fill = dark ? '#0F0F0E' : '#ffffff'
  return (
    <svg width="28" height="24" viewBox="0 0 42 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0"  y="0"  width="8"  height="38" rx="1.5" fill={fill}/>
      <rect x="11" y="0"  width="19" height="8"  rx="1.5" fill={fill}/>
      <rect x="11" y="15" width="13" height="8"  rx="1.5" fill={fill} opacity="0.55"/>
      <rect x="11" y="30" width="19" height="8"  rx="1.5" fill={fill}/>
      <rect x="34" y="30" width="8"  height="8"  rx="1.5" fill="#1D9E75"/>
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sentinel = document.getElementById('hero-sentinel')
    if (!sentinel) return
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  const links = ['Diensten', 'Werk', 'Over mij', 'Contact']

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? 'bg-[#F1EFE8]/80 backdrop-blur-xl border border-[#0F0F0E]/10 shadow-lg shadow-[#0F0F0E]/05'
            : 'bg-transparent border border-white/10'
        } rounded-full px-5 py-3 flex items-center gap-5 w-[calc(100%-2rem)] max-w-3xl`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 shrink-0 mr-auto">
          <LogoMark dark={scrolled} />
          <span className={`font-serif text-base tracking-tight transition-colors duration-300 ${scrolled ? 'text-[#0F0F0E]' : 'text-white'}`}>
            Ebel
          </span>
          <span className={`font-sans text-[10px] font-light tracking-[0.3em] uppercase -ml-1 transition-colors duration-300 ${scrolled ? 'text-[#5F5E5A]' : 'text-white/60'}`}>
            Studio
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-5">
          {links.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              className={`link-lift text-sm font-medium transition-colors duration-300 ${
                scrolled ? 'text-[#0F0F0E]/60 hover:text-[#0F0F0E]' : 'text-white/65 hover:text-white'
              }`}
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="btn hidden md:inline-flex bg-[#1D9E75] text-white text-sm px-5 py-2.5 shrink-0"
        >
          <span className="btn-bg bg-[#158a62]" />
          <span className="relative z-10">Vraag offerte aan</span>
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          className={`md:hidden transition-colors ${scrolled ? 'text-[#0F0F0E]' : 'text-white'}`}
          aria-label="Menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="fixed top-20 left-4 right-4 z-40 bg-[#F1EFE8]/97 backdrop-blur-xl rounded-3xl border border-[#0F0F0E]/08 shadow-xl p-6 flex flex-col gap-4">
          {links.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              onClick={() => setMenuOpen(false)}
              className="text-[#0F0F0E] font-medium text-lg link-lift"
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="btn bg-[#1D9E75] text-white text-sm px-5 py-3 mt-2 justify-center"
          >
            <span className="btn-bg bg-[#158a62]" />
            <span className="relative z-10">Vraag offerte aan</span>
          </a>
        </div>
      )}
    </>
  )
}
