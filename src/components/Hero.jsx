import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STYLES = `
  /* ── Grid background ──────────────────────────── */
  .ch-grid {
    background-size: 56px 56px;
    background-image:
      linear-gradient(to right, rgba(17,17,17,0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(17,17,17,0.05) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 72%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 72%);
  }

  /* ── Card shell ───────────────────────────────── */
  .ch-card {
    background: linear-gradient(145deg, #1c2660 0%, #080d1c 100%);
    box-shadow:
      0 40px 100px -16px rgba(0,0,0,0.9),
      0 20px 40px -16px rgba(0,0,0,0.6),
      inset 0 1px 2px rgba(255,255,255,0.12),
      inset 0 -2px 4px rgba(0,0,0,0.9);
    border: 1px solid rgba(255,255,255,0.04);
    will-change: transform, border-radius;
  }

  /* ── Mouse-light sheen inside card ───────────── */
  .ch-sheen {
    position: absolute; inset: 0; border-radius: inherit;
    pointer-events: none; z-index: 2;
    background: radial-gradient(
      640px circle at var(--mx, 50%) var(--my, 50%),
      rgba(59,111,232,0.08) 0%, transparent 40%
    );
  }

  /* ── Floating glass badge ─────────────────────── */
  .ch-badge {
    background: linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 100%);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.09),
      0 16px 32px -8px rgba(0,0,0,0.65),
      inset 0 1px 1px rgba(255,255,255,0.12);
  }

  /* ── Browser mockup ───────────────────────────── */
  .ch-browser {
    background: #0d1117;
    box-shadow:
      0 28px 56px -10px rgba(0,0,0,0.9),
      0 10px 20px -6px rgba(0,0,0,0.6),
      inset 0 0 0 1px rgba(255,255,255,0.05);
    border-radius: 10px;
    overflow: hidden;
  }

  /* ── Text treatments ──────────────────────────── */
  .ch-dark-text {
    color: #111111;
    text-shadow: 0 4px 16px rgba(17,17,17,0.07);
  }
  .ch-fade-text {
    background: linear-gradient(170deg, #1A1A2E 0%, rgba(26,26,46,0.38) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
  }
  .ch-white-text {
    background: linear-gradient(180deg, #ffffff 0%, #8fa3bb 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter: drop-shadow(0 6px 14px rgba(0,0,0,0.8)) drop-shadow(0 2px 4px rgba(0,0,0,0.5));
  }
`

/* ── Mini preview: Configurator fullscreen ───────────────────────── */
function SitePreview() {
  const toggleRows = [
    { label: 'Multiple pages',         on: true  },
    { label: 'Photo gallery',          on: true  },
    { label: 'SEO + Google Analytics', on: true  },
    { label: 'Blog or news section',   on: false },
    { label: 'Newsletter integration', on: false },
    { label: 'Custom animations',      on: true  },
    { label: 'Custom typography',      on: false },
  ]

  return (
    <div style={{ width: '100%', height: '100%', overflowY: 'hidden', background: '#0f1020', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', padding: '12px 14px 12px' }}>

      {/* Header */}
      <div style={{ marginBottom: '8px', flexShrink: 0 }}>
        <div style={{ fontSize: '0.32rem', color: '#3B6FE8', fontFamily: 'monospace', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '3px' }}>Package builder</div>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '2px' }}>Build your plan.</div>
        <div style={{ fontSize: '0.3rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.5 }}>Toggle the features you need — the right package appears automatically.</div>
      </div>

      {/* Toggles + card side by side */}
      <div style={{ flex: 1, display: 'flex', gap: '10px', minHeight: 0 }}>

        {/* Left: toggle rows */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3.5px' }}>
          {toggleRows.map(({ label, on }) => (
            <div
              key={label}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderRadius: '5px', padding: '4px 6px',
                background: on ? 'rgba(59,111,232,0.1)' : 'rgba(255,255,255,0.03)',
                border: `0.5px solid ${on ? 'rgba(59,111,232,0.28)' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              <span style={{ fontSize: '0.3rem', color: on ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.3)', lineHeight: 1 }}>{label}</span>
              <div style={{ width: '16px', height: '8px', borderRadius: '4px', flexShrink: 0, background: on ? '#3B6FE8' : 'rgba(255,255,255,0.1)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '2px', width: '4px', height: '4px', borderRadius: '50%', background: '#fff', left: on ? '10px' : '2px' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Right: package recommendation card */}
        <div style={{
          width: '96px', flexShrink: 0,
          background: 'linear-gradient(145deg, #1c2660 0%, #0d1025 100%)',
          border: '0.5px solid rgba(59,111,232,0.22)',
          borderRadius: '8px',
          padding: '8px 8px',
          display: 'flex', flexDirection: 'column', gap: '5px',
          boxShadow: '0 12px 24px -6px rgba(0,0,0,0.5)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#3B6FE8' }} />
            <span style={{ fontSize: '0.26rem', color: '#3B6FE8', fontFamily: 'monospace', letterSpacing: '0.1em', textTransform: 'uppercase' }}>4 selected</span>
          </div>
          <div>
            <div style={{ fontSize: '0.28rem', color: 'rgba(255,255,255,0.28)', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>Premium</div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>€1,199</div>
            <div style={{ fontSize: '0.28rem', color: '#3B6FE8', fontWeight: 600, marginTop: '2px' }}>+ €49/mo</div>
          </div>
          <div style={{ borderTop: '0.5px solid rgba(255,255,255,0.07)', paddingTop: '4px', display: 'flex', flexDirection: 'column', gap: '2.5px' }}>
            {['Everything in Standard', 'Custom animations', 'Newsletter', '1 extra revision'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#3B6FE8', flexShrink: 0 }} />
                <span style={{ fontSize: '0.26rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.3 }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 'auto', background: '#3B6FE8', borderRadius: '4px', padding: '3px 0', textAlign: 'center', fontSize: '0.28rem', color: '#fff', fontWeight: 600 }}>
            Get in touch →
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const cardRef    = useRef(null)
  const mockupRef  = useRef(null)
  const rafRef     = useRef(0)

  /* ── Mouse sheen + mockup tilt ─────────────── */
  useEffect(() => {
    const onMove = (e) => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        if (cardRef.current) {
          const r = cardRef.current.getBoundingClientRect()
          cardRef.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
          cardRef.current.style.setProperty('--my', `${e.clientY - r.top}px`)
        }
        if (mockupRef.current) {
          const xVal = (e.clientX / window.innerWidth  - 0.5) * 2
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2
          gsap.to(mockupRef.current, {
            rotationY:  xVal * 6,
            rotationX: -yVal * 6,
            ease: 'power3.out',
            duration: 1.8,
          })
        }
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  /* ── Scroll timeline ────────────────────────── */
  useEffect(() => {
    const mobile = window.innerWidth < 768

    const ctx = gsap.context(() => {

      /* ── Initial states */
      gsap.set('.ch-line1',      { autoAlpha: 0, y: 34, scale: 0.93 })
      gsap.set('.ch-line2',      { clipPath: 'inset(0 100% 0 0)' })
      gsap.set('.ch-hint',       { autoAlpha: 0 })
      gsap.set('.ch-card',       { y: window.innerHeight + 120, scale: 0.92 })
      gsap.set(['.ch-col-left', '.ch-col-right', '.ch-mockup', '.ch-badge-a', '.ch-badge-b'], { autoAlpha: 0 })
      gsap.set('.ch-cta', { autoAlpha: 0, scale: 0.95 })

      /* ── Page-load entrance */
      gsap.timeline({ delay: 0.2 })
        .to('.ch-line1',     { autoAlpha: 1, y: 0, scale: 1, duration: 1.0, ease: 'expo.out' })
        .to('.ch-line2',     { clipPath: 'inset(0 0% 0 0)', duration: 1.0, ease: 'power4.inOut' }, '-=0.7')
        .to('.ch-hint',      { autoAlpha: 1, duration: 0.5 }, '-=0.1')

      /* ── Scroll-pinned cinematic timeline */
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end:   '+=4000',
          pin:   true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      })
        // Phase 1 — hero text fades, card rises
        .to('.ch-hero-bg',  { autoAlpha: 0, scale: 1.03, duration: 1.2, ease: 'power2.out' }, 0)
        .to('.ch-hint',     { autoAlpha: 0, duration: 0.6 }, 0)
        .to('.ch-card',     { y: 0, duration: 1.4, ease: 'power3.inOut' }, 0)

        // Phase 2 — card fills screen
        .to('.ch-card', { scale: 1, borderRadius: '0px', duration: 1.1, ease: 'power2.inOut' })

        // Phase 3 — mockup + badges + copy enter
        .fromTo('.ch-mockup',
          { y: 120, rotationX: 18, rotationY: -8, autoAlpha: 0, scale: 0.8 },
          { y: 0,   rotationX: 0,  rotationY: 0,  autoAlpha: 1, scale: 1,   duration: 1.5, ease: 'expo.out' },
          '-=0.4'
        )
        .fromTo('.ch-badge-a', { y: 30, autoAlpha: 0, scale: 0.85 }, { y: 0, autoAlpha: 1, scale: 1, duration: 0.85, ease: 'back.out(1.2)' }, '-=0.9')
        .fromTo('.ch-badge-b', { y: 30, autoAlpha: 0, scale: 0.85 }, { y: 0, autoAlpha: 1, scale: 1, duration: 0.85, ease: 'back.out(1.2)' }, '-=0.7')
        .fromTo('.ch-col-left',  { x: -28, autoAlpha: 0 },             { x: 0, autoAlpha: 1, duration: 0.85, ease: 'power4.out' }, '-=0.65')
        .fromTo('.ch-col-right', { x:  28, autoAlpha: 0, scale: 0.92 }, { x: 0, autoAlpha: 1, scale: 1,     duration: 0.85, ease: 'expo.out' }, '<')

        // Hold
        .to({}, { duration: 1.4 })

        // Phase 4 — swap content → CTA
        .to(['.ch-col-left', '.ch-col-right', '.ch-mockup', '.ch-badge-a', '.ch-badge-b'], {
          autoAlpha: 0, y: -20, scale: 0.93, duration: 0.75, ease: 'power2.in',
        })
        .to('.ch-cta', { autoAlpha: 1, scale: 1, duration: 1.1, ease: 'expo.out' }, '-=0.2')

        // Phase 5 — card pulls back
        .to('.ch-card', {
          scale:        mobile ? 0.92 : 0.79,
          borderRadius: mobile ? '24px' : '32px',
          duration: 1.3, ease: 'expo.inOut',
        }, '-=0.7')

        // Hold at CTA
        .to({}, { duration: 0.8 })

        // Phase 6 — card exits up
        .to('.ch-card', { y: -(window.innerHeight + 180), duration: 1.1, ease: 'power3.in' })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{ background: '#F7F7F5', perspective: '1200px' }}
    >
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Navbar sentinel */}
      <div id="hero-sentinel" className="absolute top-[80vh] inset-x-0 h-px pointer-events-none" />

      {/* Grid */}
      <div className="ch-grid absolute inset-0 z-0 pointer-events-none" aria-hidden="true" />

      {/* ── Hero text (light bg layer) ──────────────── */}
      <div className="ch-hero-bg absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none">

        <h1
          className="ch-line1 ch-dark-text font-heading font-semibold"
          style={{ fontSize: 'clamp(2.4rem, 6.5vw, 6rem)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '0.08em' }}
        >
          I build websites
        </h1>
        <h1
          className="ch-line2 ch-fade-text font-heading font-semibold"
          style={{ fontSize: 'clamp(2.4rem, 6.5vw, 6rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
        >
          that get you noticed.
        </h1>
      </div>

      {/* ── Scroll hint ─────────────────────────────── */}
      <div
        className="ch-hint absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[0.65rem] font-mono tracking-widest uppercase" style={{ color: 'rgba(17,17,17,0.28)' }}>
          Scroll
        </span>
        <div className="w-px h-7" style={{ background: 'linear-gradient(to bottom, rgba(17,17,17,0.22), transparent)' }} />
      </div>

      {/* ── Deep-navy card ──────────────────────────── */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div
          ref={cardRef}
          className="ch-card relative flex items-center justify-center pointer-events-auto"
          style={{ width: '100%', height: '100%', borderRadius: '32px', overflow: 'hidden' }}
        >
          <div className="ch-sheen" aria-hidden="true" />

          {/* ── 3-col content grid ──────────────────── */}
          <div
            className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12
                       flex flex-col justify-evenly
                       lg:grid lg:grid-cols-3
                       items-center lg:gap-8 z-10 py-6 lg:py-0"
          >

            {/* Col 3 — brand name */}
            <div className="ch-col-right order-1 lg:order-3 flex justify-center lg:justify-end w-full">
              <h2
                className="ch-white-text font-heading font-semibold"
                style={{ fontSize: 'clamp(3.5rem, 7vw, 8rem)', letterSpacing: '-0.03em' }}
              >
                Ebel
              </h2>
            </div>

            {/* Col 2 — browser mockup */}
            <div
              className="ch-mockup order-2 relative w-full h-[320px] lg:h-[540px] flex items-center justify-center"
              style={{ perspective: '900px', overflow: 'visible' }}
            >
              <div
                ref={mockupRef}
                className="relative w-full max-w-[500px] ch-browser"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Browser chrome */}
                <div
                  className="flex items-center gap-1.5 px-3 py-2"
                  style={{ background: '#1a1f30', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: '#ff5f57' }} />
                  <div className="w-2 h-2 rounded-full" style={{ background: '#ffbd2e' }} />
                  <div className="w-2 h-2 rounded-full" style={{ background: '#28c840' }} />
                  <div
                    className="flex-1 mx-2 px-2 py-0.5 rounded-full text-center"
                    style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.07)', fontSize: '0.5rem', color: 'rgba(255,255,255,0.28)' }}
                  >
                    ebel.studio/work
                  </div>
                </div>

                {/* Site preview */}
                <div style={{ height: '310px', overflow: 'hidden' }}>
                  <SitePreview />
                </div>
              </div>

              {/* Badge A */}
              <div
                className="ch-badge-a ch-badge absolute top-2 left-2 lg:-left-6 rounded-2xl px-3 py-2.5 flex items-center gap-2.5"
                style={{ zIndex: 30 }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(59,111,232,0.14)', border: '1px solid rgba(59,111,232,0.28)' }}
                >
                  <span style={{ fontSize: '0.78rem' }}>⚡</span>
                </div>
                <div>
                  <p className="text-white font-bold" style={{ fontSize: '0.66rem' }}>Fast delivery</p>
                  <p style={{ color: 'rgba(147,197,253,0.5)', fontSize: '0.54rem' }}>5-day turnaround</p>
                </div>
              </div>

              {/* Badge B */}
              <div
                className="ch-badge-b ch-badge absolute bottom-4 right-2 lg:-right-6 rounded-2xl px-3 py-2.5 flex items-center gap-2.5"
                style={{ zIndex: 30 }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(59,111,232,0.14)', border: '1px solid rgba(59,111,232,0.28)' }}
                >
                  <span style={{ fontSize: '0.78rem' }}>✦</span>
                </div>
                <div>
                  <p className="text-white font-bold" style={{ fontSize: '0.66rem' }}>100% custom</p>
                  <p style={{ color: 'rgba(147,197,253,0.5)', fontSize: '0.54rem' }}>No templates</p>
                </div>
              </div>
            </div>

            {/* Col 1 — copy */}
            <div className="ch-col-left order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left w-full px-4 lg:px-0">
              <h3
                className="text-white font-heading font-semibold mb-3 leading-tight"
                style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', letterSpacing: '-0.02em' }}
              >
                Built for now, ready for later.
              </h3>
              <p
                className="hidden md:block leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.48)', fontSize: '0.88rem', maxWidth: '230px' }}
              >
                Pick your plan — only pay for what you need, upgrade when you're ready to grow.
              </p>
            </div>
          </div>

          {/* ── CTA overlay ── */}
          <div
            className="ch-cta absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-auto"
            style={{ zIndex: 20 }}
          >
            <h2
              className="ch-white-text font-heading font-semibold mb-5"
              style={{ fontSize: 'clamp(2rem, 5.5vw, 4.5rem)', letterSpacing: '-0.03em' }}
            >
              Ready to start?
            </h2>
            <p
              className="mb-10 font-light leading-relaxed max-w-md"
              style={{ color: 'rgba(255,255,255,0.46)', fontSize: '1rem' }}
            >
              Book a free 15-minute intro call — no strings attached.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base text-white"
                style={{ background: '#3B6FE8', boxShadow: '0 12px 28px -4px rgba(59,111,232,0.5)' }}
              >
                Book a call →
              </a>
              <a
                href="#werk"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base"
                style={{ border: '1px solid rgba(255,255,255,0.16)', color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.04)' }}
              >
                See my work
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
