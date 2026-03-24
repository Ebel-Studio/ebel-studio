import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function OverMij() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.over-content > *', {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="over" ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ background: '#0f1020' }}>
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
              Built for now.
              <br />
              <span className="text-[#3B6FE8]">Ready for later.</span>
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-white/75 leading-relaxed">
              I'm Ebel — a young maker from Noord-Holland. I build websites and visual identities for people who want to look professional online, without the agency price tag.
            </p>
            <p className="text-white/75 leading-relaxed">
              I work AI-first. That means I deliver faster than a traditional studio, at an honest price — without cutting corners on quality.
            </p>
            <p className="text-white/75 leading-relaxed">
              I also do videography and graphic design.
            </p>

            <a href="#contact" className="btn bg-[#3B6FE8] text-[#0f1020] text-sm px-6 py-3 self-start mt-2 font-semibold">
              <span className="btn-bg bg-white/20" />
              <span className="relative z-10">Get in touch</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
