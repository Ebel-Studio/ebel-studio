import { useEffect, useRef, lazy, Suspense } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const LumineShowcase = lazy(() => import('./LumineShowcase'))

export default function Werk() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.werk-header > *', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
        },
      })
      gsap.from('.werk-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.werk-card',
          start: 'top 78%',
        },
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

        {/* Header */}
        <div className="werk-header mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-[#2D6A4F] text-sm font-mono tracking-widest uppercase mb-3">
              Portfolio
            </p>
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

        {/* Portfolio card */}
        <div className="werk-card card-surface overflow-hidden mb-6">
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="md:w-2/5 h-56 md:h-auto overflow-hidden bg-[#07111a]">
              <img
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80&auto=format&fit=crop"
                alt="EDM Artiest Website"
                className="w-full h-full object-cover opacity-70 hover:opacity-90 transition-opacity duration-500"
              />
            </div>
            {/* Content */}
            <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#2D6A4F]/08 text-[#2D6A4F] text-xs font-medium tracking-wide">
                    Website · Huisstijl
                  </span>
                </div>
                <h3
                  className="font-heading font-semibold text-[#1A1A1A] mb-3"
                  style={{ fontSize: '1.4rem', letterSpacing: '-0.02em' }}
                >
                  EDM Artiest Website
                </h3>
                <p className="text-[#1A1A1A]/55 leading-relaxed">
                  One-pager voor een groeiende artiest in de elektronische muziekscene. Huisstijl, bio en booking in één.
                </p>
              </div>
              <a
                href="https://lumine-theta.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-[#1A1A1A] text-white text-sm px-6 py-3 mt-6 self-start"
              >
                <span className="btn-bg bg-[#2D6A4F]" />
                <span className="relative z-10 flex items-center gap-2">
                  Bekijk live <ExternalLink size={14} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lumine ContainerScroll showcase — animation preserved */}
      <Suspense fallback={<div className="h-[60rem]" />}>
        <LumineShowcase />
      </Suspense>
    </section>
  )
}
