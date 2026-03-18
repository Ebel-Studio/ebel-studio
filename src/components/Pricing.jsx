import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const packages = [
  {
    title: 'Website + huisstijl',
    price: '€450 – €650',
    items: [
      'Website van 1–5 pagina\'s',
      'Logo (1 concept, 2 revisies)',
      'Kleurpalet + typografie',
      'Teksten schrijven of herschrijven',
      'Mobiel responsive',
      'Live zetten',
    ],
    featured: false,
  },
  {
    title: 'Artiest one-pager',
    price: '€275 – €375',
    items: [
      'One-page website',
      'Bio, foto\'s, social links',
      'Kleurpalet passend bij jouw stijl',
      'Live binnen 5 werkdagen',
    ],
    featured: true,
  },
]

export default function Pricing() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pricing-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
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
      id="tarieven"
      ref={sectionRef}
      className="py-24 md:py-36 px-6 md:px-12 lg:px-20"
      style={{ background: '#F8F6F1' }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <p className="text-[#2D6A4F] text-sm font-mono tracking-widest uppercase mb-3">Investering</p>
          <h2
            className="font-heading font-semibold text-[#1A1A1A]"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em' }}
          >
            Tarieven
          </h2>
        </div>

        {/* Intro label */}
        <p className="text-[#1A1A1A]/50 text-sm mb-14 max-w-xl leading-relaxed">
          Introductietarief — tijdelijk beschikbaar terwijl ik mijn portfolio opbouw.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {packages.map(({ title, price, items, featured }) => (
            <div
              key={title}
              className={`pricing-card rounded-[2rem] p-8 flex flex-col gap-6 ${
                featured
                  ? 'bg-[#2D6A4F] text-white'
                  : 'bg-white border border-[#1A1A1A]/08 shadow-sm'
              }`}
            >
              <div>
                <p className={`text-xs font-mono tracking-widest uppercase mb-2 ${featured ? 'text-[#52B788]' : 'text-[#2D6A4F]'}`}>
                  Pakket
                </p>
                <h3
                  className={`font-heading font-semibold mb-1 ${featured ? 'text-white' : 'text-[#1A1A1A]'}`}
                  style={{ fontSize: '1.3rem', letterSpacing: '-0.02em' }}
                >
                  {title}
                </h3>
                <p
                  className={`font-heading font-semibold`}
                  style={{ fontSize: '2rem', letterSpacing: '-0.03em', color: featured ? '#52B788' : '#2D6A4F' }}
                >
                  {price}
                </p>
              </div>

              <ul className="flex flex-col gap-3 flex-1">
                {items.map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      size={15}
                      className="mt-0.5 shrink-0"
                      style={{ color: featured ? '#52B788' : '#2D6A4F' }}
                    />
                    <span className={`text-sm ${featured ? 'text-white/80' : 'text-[#1A1A1A]/65'}`}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`btn text-sm px-6 py-3.5 justify-center ${
                  featured
                    ? 'bg-white text-[#2D6A4F]'
                    : 'bg-[#2D6A4F] text-white'
                }`}
              >
                <span className={`btn-bg ${featured ? 'bg-[#F8F6F1]' : 'bg-[#1A3D2B]'}`} />
                <span className="relative z-10 flex items-center gap-2">
                  Neem contact op <ArrowRight size={15} />
                </span>
              </a>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <p className="text-center text-[#1A1A1A]/40 text-sm font-mono">
          Extra pagina €75 · Logo only €150 · Onderhoud €35/mnd
        </p>
      </div>
    </section>
  )
}
