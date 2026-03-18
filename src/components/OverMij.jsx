import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function OverMij() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.over-content > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="over"
      ref={sectionRef}
      className="py-24 md:py-36 px-6 md:px-12 lg:px-20"
      style={{ background: '#1A3D2B' }}
    >
      <div className="max-w-6xl mx-auto over-content">

        <p className="text-[#52B788] text-sm font-mono tracking-widest uppercase mb-6">
          Over mij
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — big heading */}
          <div>
            <h2
              className="font-heading font-semibold text-white leading-tight"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}
            >
              Gebouwd voor nu.
              <br />
              <span className="text-[#52B788]">Klaar voor later.</span>
            </h2>
          </div>

          {/* Right — paragraphs */}
          <div className="flex flex-col gap-6">
            <p className="text-white/75 leading-relaxed">
              Ik ben Ebel — een jonge maker uit Noord-Holland. Ik bouw websites en huisstijlen voor mensen die professioneel online willen staan, zonder het bureaubudget.
            </p>
            <p className="text-white/75 leading-relaxed">
              Ik werk AI-first. Dat betekent dat ik sneller lever dan een traditioneel bureau, tegen een eerlijke prijs — zonder in te leveren op kwaliteit.
            </p>
            <p className="text-white/75 leading-relaxed">
              Videografie en grafisch ontwerp doe ik er ook bij.
            </p>

            <a
              href="#contact"
              className="btn bg-[#52B788] text-[#1A3D2B] text-sm px-6 py-3 self-start mt-2 font-semibold"
            >
              <span className="btn-bg bg-white/20" />
              <span className="relative z-10">Neem contact op</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
