import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function HeroIntro() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.15 })
        .from('.hi-line1', { autoAlpha: 0, y: 28, duration: 0.9, ease: 'expo.out' })
        .from('.hi-line2', { autoAlpha: 0, y: 20, duration: 0.85, ease: 'expo.out' }, '-=0.6')
        .from('.hi-sub', { autoAlpha: 0, y: 14, duration: 0.7, ease: 'power3.out' }, '-=0.4')
        .from('.hi-cta', { autoAlpha: 0, y: 10, duration: 0.6, ease: 'power3.out' }, '-=0.3')
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex flex-col items-center justify-center text-center px-6"
      style={{
        background: '#F7F7F5',
        minHeight: '92vh',
        paddingTop: '96px',
        paddingBottom: '64px',
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
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <h1
          className="hi-line1 font-heading font-semibold"
          style={{
            fontSize: 'clamp(2.2rem, 5.8vw, 5.5rem)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: '#111111',
            marginBottom: '0.08em',
          }}
        >
          Professional websites
        </h1>
        <p
          className="hi-line2 font-heading font-semibold"
          style={{
            fontSize: 'clamp(2.2rem, 5.8vw, 5.5rem)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: 'rgba(17,17,17,0.32)',
          }}
        >
          for artists, businesses &amp; holiday homes.
        </p>

        <p
          className="hi-sub"
          style={{
            marginTop: '1.4rem',
            fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
            color: 'rgba(17,17,17,0.5)',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            maxWidth: '520px',
            lineHeight: 1.6,
            margin: '1.4rem auto 0',
          }}
        >
          Custom-built, fast to launch — and maintained via WhatsApp.
          No invoices for small changes, no waiting on a developer.
        </p>

        <div className="hi-cta flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <a
            href="https://wa.me/31612345678"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base text-white"
            style={{ background: '#25D366', boxShadow: '0 12px 28px -4px rgba(37,211,102,0.35)' }}
          >
            WhatsApp me →
          </a>
          <a
            href="#work"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base"
            style={{ border: '1px solid rgba(17,17,17,0.18)', color: 'rgba(17,17,17,0.7)', background: 'rgba(17,17,17,0.03)' }}
          >
            See my work
          </a>
        </div>
      </div>
    </section>
  )
}
