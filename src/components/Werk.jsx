import { useEffect, useRef, lazy, Suspense } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, MapPin, Users, Heart } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const LumineShowcase = lazy(() => import('./LumineShowcase'))

/* ─────────────────────────────────────────────────────────────────
   HvAB Mini-preview — styled recreation van de echte hero
   Kleuren 1:1 uit broncode: #3D549F primary · #EEBB37 yellow · #F5F5F2 cream
   ───────────────────────────────────────────────────────────────── */
function HvabPreview() {
  return (
    <div className="relative w-full h-full overflow-hidden select-none" style={{ background: '#3D549F' }}>

      {/* Hero community photo */}
      <img
        src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80&auto=format&fit=crop"
        alt="Huis van Actief Burgerschap"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.28, mixBlendMode: 'multiply' }}
        draggable={false}
      />

      {/* Gradient overlay — matches original exactly */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(61,84,159,0.75) 0%,
            rgba(61,84,159,0.55) 40%,
            rgba(0,0,0,0.45) 100%
          )`,
        }}
      />

      {/* ── Navbar ─────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-5 py-3"
        style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(8px)' }}>
        {/* Logo mark — house pin shape */}
        <div className="flex items-center gap-2">
          <svg width="18" height="20" viewBox="0 0 24 28" fill="none">
            <path d="M12 0L0 8v4h2v14h8v-8h4v8h8V12h2V8L12 0z" fill="#EEBB37" />
            <circle cx="12" cy="17" r="3" fill="white" />
          </svg>
          <span style={{ color: 'white', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.04em', lineHeight: 1.2 }}>
            Huis van Actief<br/>Burgerschap
          </span>
        </div>
        {/* Nav items */}
        <div className="hidden md:flex items-center gap-4">
          {['Wat we doen', 'Initiatieven', "Thema's", 'Contact'].map(item => (
            <span key={item} style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.5rem', letterSpacing: '0.06em' }}>{item}</span>
          ))}
        </div>
        {/* CTA pill */}
        <span
          className="px-3 py-1 rounded-full font-bold"
          style={{ background: '#EEBB37', color: '#1A1A1A', fontSize: '0.5rem', letterSpacing: '0.08em' }}
        >
          DOE MEE
        </span>
      </div>

      {/* ── Hero content ────────────────────────────────────── */}
      <div className="absolute z-20 flex flex-col justify-center px-5 md:px-8"
        style={{ top: '22%', bottom: '22%', maxWidth: '65%' }}>

        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-4">
          <div style={{ width: '20px', height: '1.5px', background: '#EEBB37' }} />
          <span style={{ color: '#EEBB37', fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600 }}>
            Noord-Holland Noord
          </span>
        </div>

        {/* Main headline — Barlow Condensed style */}
        <h1 style={{ lineHeight: 1.0, marginBottom: '0.6rem' }}>
          <span style={{
            display: 'block',
            fontFamily: 'Geist, system-ui, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(1.4rem, 3.5vw, 2.6rem)',
            color: 'white',
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
          }}>
            Mensen maken
          </span>
          <span style={{
            display: 'block',
            fontFamily: 'Geist, system-ui, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(1.4rem, 3.5vw, 2.6rem)',
            color: '#EEBB37',
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
          }}>
            de samenleving.
          </span>
        </h1>

        <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.65rem', lineHeight: 1.65, maxWidth: '260px', marginBottom: '1rem' }}>
          In Noord-Holland Noord ondersteunen wij inwoners, initiatieven en gemeenschappen om samen de regio sterker te maken.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-2">
          <span
            className="px-4 py-1.5 rounded font-semibold"
            style={{ background: '#EEBB37', color: '#1A1A1A', fontSize: '0.55rem', letterSpacing: '0.06em' }}
          >
            Ontdek initiatieven
          </span>
          <span
            className="px-4 py-1.5 rounded font-semibold"
            style={{ border: '1px solid rgba(255,255,255,0.3)', color: 'white', fontSize: '0.55rem', letterSpacing: '0.06em' }}
          >
            Hoe we helpen
          </span>
        </div>
      </div>

      {/* ── Stats bar ───────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-around px-5 py-3"
        style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)', borderTop: '1px solid rgba(238,187,55,0.15)' }}
      >
        {[
          { icon: MapPin,  value: '5 Gemeenten', label: 'Bereik' },
          { icon: Users,   value: '200+ Initiatieven', label: 'Ondersteund' },
          { icon: Heart,   value: 'Gratis', label: 'Toegankelijk' },
        ].map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <Icon size={11} style={{ color: '#EEBB37', flexShrink: 0 }} />
            <div>
              <p style={{ color: 'white', fontSize: '0.6rem', fontWeight: 700, lineHeight: 1.2 }}>{value}</p>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.48rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</p>
            </div>
          </div>
        ))}
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
      className="py-24 md:py-36 px-6 md:px-12 lg:px-20"
      style={{ background: '#F8F6F1' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="werk-header mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-[#2D6A4F] text-sm font-mono tracking-widest uppercase mb-3">Portfolio</p>
            <h2
              className="font-heading font-semibold text-[#1A1A1A]"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em' }}
            >
              Werk
            </h2>
            <p className="text-[#1A1A1A]/50 mt-2">Recente projecten</p>
          </div>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2D6A4F]/20 text-[#2D6A4F] text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] opacity-60" />
            Meer projecten onderweg
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
                    Maatschappij
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium text-[#1A1A1A]/40"
                    style={{ background: '#1A1A1A08', letterSpacing: '0.04em' }}>
                    React · Tailwind
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-heading font-semibold text-[#1A1A1A] mb-3"
                  style={{ fontSize: '1.4rem', letterSpacing: '-0.02em', lineHeight: 1.2 }}
                >
                  Huis van Actief Burgerschap
                </h3>

                {/* Description */}
                <p className="text-[#1A1A1A]/55 leading-relaxed mb-4" style={{ fontSize: '0.92rem' }}>
                  Civic engagement platform voor Noord-Holland Noord. Verbindt inwoners, initiatieven en gemeenschappen via een interactieve kaart, initiatievenbibliotheek en heldere call-to-actions.
                </p>

                {/* Highlights */}
                <div className="flex flex-col gap-2">
                  {[
                    'Interactieve Leaflet-kaart met 5 gemeenten',
                    'Volledig responsive · Framer Motion animaties',
                    'Gebouwd voor maatschappelijke organisaties',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ background: '#3D549F' }} />
                      <span className="text-[#1A1A1A]/45 text-xs leading-relaxed">{item}</span>
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
                  Bekijk live <ExternalLink size={14} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Lumine ContainerScroll — animatie behouden ── */}
      <Suspense fallback={<div className="h-[60rem] bg-[#0F0F0E]" />}>
        <LumineShowcase />
      </Suspense>
    </section>
  )
}
