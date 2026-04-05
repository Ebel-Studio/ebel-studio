import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function HeroIntro() {
  const sectionRef = useRef(null)

  useEffect(() => {
    // Respect prefers-reduced-motion (PDF Section 11 — WCAG 2.2)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(['.hi-eyebrow', '.hi-word', '.hi-line2', '.hi-sub', '.hi-cta', '.hi-trust'], { autoAlpha: 1, y: 0 })
        return
      }

      // Kinetic word-by-word reveal (PDF T01 — Kinetic Typography)
      gsap.set('.hi-word', { autoAlpha: 0, y: 32 })
      gsap.set(['.hi-eyebrow', '.hi-line2', '.hi-sub', '.hi-cta', '.hi-trust'], { autoAlpha: 0, y: 16 })

      gsap.timeline({ delay: 0.1 })
        .to('.hi-eyebrow', { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' })
        .to('.hi-word', {
          autoAlpha: 1, y: 0,
          duration: 0.72, ease: 'expo.out',
          stagger: 0.06,
        }, '-=0.2')
        .to('.hi-line2', { autoAlpha: 1, y: 0, duration: 0.65, ease: 'expo.out' }, '-=0.35')
        .to('.hi-sub',   { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.3')
        .to('.hi-trust', { autoAlpha: 1, y: 0, duration: 0.5,  ease: 'power3.out' }, '-=0.2')
        .to('.hi-cta',   { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.1')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Split H1 into individually animatable words (T01)
  const words = ['Professional', 'websites', '&', 'branding,']

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex flex-col items-center justify-center text-center px-6"
      style={{
        background: '#F7F7F5',
        minHeight: '94vh',
        paddingTop: '96px',
        paddingBottom: '72px',
      }}
    >
      {/* Navbar sentinel — tells Navbar when hero is out of view */}
      <div id="hero-sentinel" className="absolute top-[80vh] inset-x-0 h-px pointer-events-none" />

      {/* Subtle grid bg */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundSize: '56px 56px',
          backgroundImage: `
            linear-gradient(to right, rgba(17,17,17,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(17,17,17,0.04) 1px, transparent 1px)
          `,
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 68%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 68%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Eyebrow label */}
        <p
          className="hi-eyebrow font-mono text-xs tracking-widest uppercase mb-6"
          style={{ color: 'rgba(17,17,17,0.38)' }}
        >
          Ebel Studio — Noord-Holland
        </p>

        {/* H1 — kinetic word reveal (T01) */}
        <h1
          className="font-heading font-semibold"
          style={{
            fontSize: 'clamp(2.4rem, 6.2vw, 5.8rem)',
            letterSpacing: '-0.03em',
            lineHeight: 1.04,
            color: '#111111',
            marginBottom: '0.06em',
          }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="hi-word inline-block"
              style={{ marginRight: word === '&' ? '0.28em' : '0.22em' }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Faded second line */}
        <p
          className="hi-line2 font-heading font-semibold"
          style={{
            fontSize: 'clamp(2.4rem, 6.2vw, 5.8rem)',
            letterSpacing: '-0.03em',
            lineHeight: 1.04,
            color: 'rgba(17,17,17,0.28)',
          }}
        >
          maintained by AI.
        </p>

        {/* Subline */}
        <p
          className="hi-sub"
          style={{
            marginTop: '1.6rem',
            fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
            color: 'rgba(17,17,17,0.48)',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            maxWidth: '500px',
            lineHeight: 1.65,
            margin: '1.6rem auto 0',
          }}
        >
          Custom-built sites and brand identities — kept up to date by an AI agent, not by invoices.
        </p>

        {/* Trust signal (PDF Section 09 — trust in hero) */}
        <div
          className="hi-trust inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full"
          style={{
            background: 'rgba(17,17,17,0.04)',
            border: '1px solid rgba(17,17,17,0.08)',
          }}
        >
          <span style={{ fontSize: '0.75rem', color: 'rgba(17,17,17,0.44)', fontFamily: 'Inter, sans-serif' }}>
            Artists · Businesses · Holiday Homes · Creatives
          </span>
        </div>

        {/* Single primary CTA (PDF Section 09 — één primaire CTA) */}
        <div className="hi-cta flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <a
            href="https://wa.me/31612345678"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full font-semibold text-base text-white"
            style={{
              background: '#25D366',
              boxShadow: '0 16px 32px -6px rgba(37,211,102,0.38)',
              letterSpacing: '-0.01em',
            }}
          >
            {/* WhatsApp icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Get started via WhatsApp
          </a>
          <a
            href="#work"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-medium text-sm"
            style={{
              color: 'rgba(17,17,17,0.55)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            See my work ↓
          </a>
        </div>

      </div>
    </section>
  )
}
