import { useEffect, useRef, lazy, Suspense } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const LumineShowcase = lazy(() => import('./LumineShowcase'))

/* ─────────────────────────────────────────────────────────────────
   HvAB Mini-preview — 1:1 recreatie van de echte hero
   Gebaseerd op broncode analyse:
   - Foto: unsplash photo-1529156069898-49953e39b3ac
   - Overlay: bg-primary/80 (#3D549F) mix-blend-multiply
   - Gradient: from-black/40 via-transparent to-black/60
   - Headline: Barlow Condensed 800, uppercase, tight, wit + geel (#EEBB37)
   - Layout: volledig gecentreerd, max-w-4xl
   ───────────────────────────────────────────────────────────────── */
function HvabPreview() {
  useEffect(() => {
    if (!document.getElementById('barlow-condensed-font')) {
      const link = document.createElement('link')
      link.id = 'barlow-condensed-font'
      link.rel = 'stylesheet'
      link.href = 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Lora:wght@400;500&display=swap'
      document.head.appendChild(link)
    }
  }, [])

  const navItems = ['Wat we doen', 'Initiatieven', "Thema's", 'Locaties', 'Contact']

  return (
    <div className="relative w-full h-full overflow-hidden select-none flex flex-col" style={{ background: '#1a2a5e' }}>

      {/* ── Background foto ──────────────────────────────── */}
      <img
        src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=85&auto=format&fit=crop"
        alt="HvAB hero"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ mixBlendMode: 'multiply' }}
        loading="lazy"
        draggable={false}
      />

      {/* Primary overlay: bg-primary/80 mix-blend-multiply (al gedaan via img blend) */}
      <div className="absolute inset-0" style={{ background: 'rgba(61,84,159,0.80)', mixBlendMode: 'multiply' }} />

      {/* Gradient: from-black/40 via-transparent to-black/60 */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.40) 0%, transparent 45%, rgba(0,0,0,0.60) 100%)'
      }} />

      {/* ── Navbar ───────────────────────────────────────── */}
      <div className="relative z-30 flex items-center justify-between px-4 py-2.5 shrink-0">
        {/* Logo + naam */}
        <div className="flex items-center gap-1.5">
          {/* SVG logo: house shape met path M10 10 L64 10 ... */}
          <svg width="16" height="18" viewBox="0 0 100 115" fill="none">
            <path d="M 10 10 L 64 10 L 64 30 A 8 8 0 0 0 80 30 L 80 10 L 90 10 L 90 55 L 50 95 L 10 55 Z" fill="#EEBB37" />
            <circle cx="50" cy="62" r="10" fill="white" />
          </svg>
          <div>
            <div style={{ color: 'white', fontSize: '0.48rem', fontWeight: 800, letterSpacing: '0.06em', lineHeight: 1.1, fontFamily: "'Barlow Condensed', sans-serif", textTransform: 'uppercase' }}>
              Huis van Actief Burgerschap
            </div>
            <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.38rem', letterSpacing: '0.1em', fontFamily: "'Barlow Condensed', sans-serif", textTransform: 'uppercase' }}>
              Noord-Holland Noord
            </div>
          </div>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-3">
          {navItems.map(item => (
            <span key={item} style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.42rem', letterSpacing: '0.04em', fontFamily: "'Barlow Condensed', sans-serif" }}>
              {item}
            </span>
          ))}
        </div>

        {/* CTA */}
        <span
          className="rounded-lg font-bold"
          style={{ background: '#EEBB37', color: '#000', fontSize: '0.42rem', padding: '0.25rem 0.6rem', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.06em' }}
        >
          Doe mee
        </span>
      </div>

      {/* ── Hero content — gecentreerd ────────────────────── */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 pb-4">

        {/* Headline */}
        <h1 style={{ lineHeight: 0.9, marginBottom: '0.6rem' }}>
          <span style={{
            display: 'block',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(1.2rem, 4vw, 2.4rem)',
            color: 'white',
            textTransform: 'uppercase',
            letterSpacing: '0.01em',
            textShadow: '0 2px 8px rgba(0,0,0,0.4)',
          }}>
            Mensen maken de samenleving.
          </span>
          <span style={{
            display: 'block',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(1.2rem, 4vw, 2.4rem)',
            color: '#EEBB37',
            textTransform: 'uppercase',
            letterSpacing: '0.01em',
            textShadow: '0 2px 8px rgba(0,0,0,0.4)',
          }}>
            Het Huis helpt ze verder.
          </span>
        </h1>

        {/* Subtext — Lora serif */}
        <p style={{
          fontFamily: "'Lora', Georgia, serif",
          color: 'rgba(255,255,255,0.90)',
          fontSize: 'clamp(0.5rem, 1.5vw, 0.72rem)',
          lineHeight: 1.6,
          maxWidth: '340px',
          marginBottom: '0.8rem',
        }}>
          In Noord-Holland Noord ondersteunen wij inwoners, initiatieven en gemeenschappen om samen de regio sterker te maken.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-2 justify-center">
          <span
            className="rounded-xl font-semibold flex items-center gap-1"
            style={{ background: '#EEBB37', color: '#000', fontSize: '0.5rem', padding: '0.35rem 0.8rem', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.04em', fontWeight: 700 }}
          >
            Ontdek initiatieven ›
          </span>
          <span
            className="rounded-xl font-semibold"
            style={{ background: '#3D549F', color: 'white', fontSize: '0.5rem', padding: '0.35rem 0.8rem', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.04em', fontWeight: 700 }}
          >
            Doe mee
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   Werk Section
   ───────────────────────────────────────────────────────────────── */
export default function Werk() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.werk-header > *', {
        y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      })
      gsap.from('.werk-card', {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.werk-card', start: 'top 78%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="werk"
      ref={sectionRef}
      style={{ background: '#F7F7F5' }}
    >
      <div className="py-24 md:py-36 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="werk-header mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[#1A1A2E] text-sm font-mono tracking-widest uppercase mb-3">Portfolio</p>
              <h2
                className="font-heading font-semibold text-[#111111]"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em' }}
              >
                Recent work
              </h2>
              <p className="text-[#111111]/50 mt-2">Recent projects</p>
            </div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1A1A2E]/20 text-[#1A1A2E] text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A2E] opacity-60" />
              More projects on the way
            </span>
          </div>

          {/* ── HvAB Portfolio card — full feature card ── */}
          <div className="werk-card card-surface overflow-hidden mb-6">
            <div className="flex flex-col lg:flex-row min-h-[340px]">

              {/* Left — styled preview */}
              <div className="lg:w-[55%] h-64 lg:h-auto overflow-hidden relative">
                <HvabPreview />
              </div>

              {/* Right — project info */}
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-2 mb-5">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ background: '#3D549F', color: 'white', letterSpacing: '0.04em' }}>
                      Website
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ background: '#EEBB3720', color: '#8a6c10', letterSpacing: '0.04em', border: '1px solid #EEBB3740' }}>
                      Civic
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium text-[#111111]/40"
                      style={{ background: '#11111108', letterSpacing: '0.04em' }}>
                      React · Tailwind
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-heading font-semibold text-[#111111] mb-3"
                    style={{ fontSize: '1.4rem', letterSpacing: '-0.02em', lineHeight: 1.2 }}
                  >
                    Huis van Actief Burgerschap
                  </h3>

                  {/* Description */}
                  <p className="text-[#111111]/55 leading-relaxed mb-4" style={{ fontSize: '0.92rem' }}>
                    Civic engagement platform for Noord-Holland Noord. Connecting residents, local initiatives, and communities through an interactive map, initiative library, and clear calls-to-action.
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-col gap-2">
                    {[
                      'Interactive Leaflet map across 5 municipalities',
                      'Fully responsive · Framer Motion animations',
                      'Built for civic and non-profit organisations',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ background: '#3D549F' }} />
                        <span className="text-[#111111]/45 text-xs leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="https://huis-van-actief-burgerschap.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn text-white text-sm px-6 py-3 mt-8 self-start"
                  style={{ background: '#3D549F' }}
                >
                  <span className="btn-bg" style={{ background: '#2a3a6e' }} />
                  <span className="relative z-10 flex items-center gap-2">
                    View live <ExternalLink size={14} />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Lumine ContainerScroll — animatie behouden ── */}
      <Suspense fallback={<div className="h-[60rem]" style={{ background: '#F7F7F5' }} />}>
        <LumineShowcase />
      </Suspense>
    </section>
  )
}
