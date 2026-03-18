import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowRight } from 'lucide-react'
import { DotGrid } from './ui/dot-grid'

export default function Hero() {
  const containerRef    = useRef(null)
  const badge           = useRef(null)
  const line1           = useRef(null)
  const line2           = useRef(null)
  const sub             = useRef(null)
  const cta             = useRef(null)
  const scrollIndicator = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })
      tl.from(badge.current, { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' })
        .from([line1.current, line2.current], { y: 40, opacity: 0, duration: 1, stagger: 0.08, ease: 'power3.out' }, '-=0.3')
        .from(sub.current, { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .from(cta.current, { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
        .from(scrollIndicator.current, { opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden"
    >
      <div id="hero-sentinel" className="absolute top-[80vh] inset-x-0 h-px pointer-events-none" />

      {/* Background photo */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&q=85&auto=format&fit=crop"
          alt="Modern workspace"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/65 to-[#1A1A1A]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/55 to-transparent" />
      </div>

      {/* Interactive dot grid */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-y-0 right-0 w-full" style={{ pointerEvents: 'all' }}>
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, #1A1A1A 0%, rgba(26,26,26,0.7) 25%, rgba(26,26,26,0.1) 55%, transparent 100%)',
            }}
          />
          <DotGrid />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pb-16 md:pb-24 max-w-2xl lg:max-w-3xl">

        {/* Badge */}
        <div
          ref={badge}
          className="inline-flex items-center gap-2 bg-white/08 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2 mb-8"
        >
          <span className="status-dot">
            <span className="w-2 h-2 rounded-full bg-[#52B788] inline-block" />
          </span>
          <span className="text-white/85 text-sm font-mono font-medium tracking-wide">
            Beschikbaar voor nieuwe projecten
          </span>
        </div>

        {/* Headline */}
        <h1 className="mb-4 leading-none">
          <span
            ref={line1}
            className="block font-heading font-semibold text-white"
            style={{ fontSize: 'clamp(4rem, 12vw, 10rem)', letterSpacing: '-0.03em', lineHeight: 0.9 }}
          >
            Ebel
          </span>
          <span
            ref={line2}
            className="block font-heading font-semibold text-[#52B788]"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 3.2rem)', letterSpacing: '-0.02em', lineHeight: 1.2, marginTop: '0.5rem' }}
          >
            Modern. Snel. Oprecht.
          </span>
        </h1>

        {/* Sub */}
        <p
          ref={sub}
          className="text-white/60 font-light max-w-lg mb-10 leading-relaxed"
          style={{ fontSize: '1.05rem' }}
        >
          Websites en huisstijlen voor mensen die er professioneel uit willen zien — zonder duizenden euro's of maanden wachten.
        </p>

        {/* CTAs */}
        <div ref={cta} className="flex flex-col sm:flex-row gap-4">
          <a
            href="#contact"
            className="btn bg-[#2D6A4F] text-white text-base px-8 py-4 shadow-lg shadow-[#2D6A4F]/30"
          >
            <span className="btn-bg bg-[#1A3D2B]" />
            <span className="relative z-10 flex items-center gap-2">
              Neem contact op <ArrowRight size={18} />
            </span>
          </a>
          <a
            href="#werk"
            className="btn border border-white/25 text-white text-base px-8 py-4"
          >
            <span className="btn-bg bg-white/10" />
            <span className="relative z-10">Bekijk werk</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicator}
        className="absolute bottom-8 right-8 md:right-12 lg:right-20 z-20 flex items-center gap-2"
      >
        <span className="text-white/35 text-xs font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/35 to-transparent" />
      </div>
    </section>
  )
}
