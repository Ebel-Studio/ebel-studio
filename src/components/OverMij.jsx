import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CREDENTIALS = [
  { label: 'Design education', note: 'Studied in Spain' },
  { label: 'Google Ads', note: '€10k/mo budget managed' },
  { label: 'D2C webshop', note: 'Design, production & fulfilment' },
]

export default function OverMij() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('.over-content > *', {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ background: '#0f1020' }}>
      <div className="max-w-6xl mx-auto over-content">

        <p className="text-[#3B6FE8] text-sm font-mono tracking-widest uppercase mb-6">
          About
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <div>
            <h2
              className="font-heading font-semibold text-white leading-tight"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}
            >
              About Ebel.
            </h2>

            {/* Credentials strip */}
            <div className="flex flex-col gap-3 mt-8">
              {CREDENTIALS.map(({ label, note }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#3B6FE8' }} />
                  <span className="text-white/80 text-sm font-medium">{label}</span>
                  <span className="text-white/30 text-sm">— {note}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-white/75 leading-relaxed">
              I'm a designer and developer. I studied design in Spain and have been building things with visuals and code for as long as I can remember — from personal art projects to client work.
            </p>
            <p className="text-white/75 leading-relaxed">
              My background is broader than just websites. I've managed a €10k/month Google Ads budget, and ran my own direct-to-consumer webshop — handling design, production, and fulfilment end-to-end.
            </p>
            <p className="text-white/75 leading-relaxed">
              Today I combine all of that into three things: sharp websites, solid brand identities, and the AI system I built that keeps it all updated via WhatsApp. No agency overhead. No vague timelines. Just work that does what it's supposed to.
            </p>

            <a
              href="https://wa.me/31612345678"
              target="_blank"
              rel="noopener noreferrer"
              className="btn text-white text-sm px-6 py-3 self-start mt-2 font-semibold"
              style={{ background: '#25D366' }}
            >
              <span className="btn-bg" style={{ background: '#1aad54' }} />
              <span className="relative z-10">WhatsApp me →</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
