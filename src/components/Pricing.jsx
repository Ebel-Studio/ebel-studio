import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const plans = [
  {
    name: 'Starter',
    price: '695',
    tagline: 'Online zichtbaarheid, snel geleverd.',
    features: [
      '1-pagina landingsite',
      'Mobile-first design',
      'Contactformulier',
      'Vercel hosting (1 jaar)',
      'Google Analytics',
      'Oplevering in 5 dagen',
    ],
    cta: 'Aan de slag',
    featured: false,
  },
  {
    name: 'Professional',
    price: '1.195',
    tagline: 'De meest gekozen keuze voor groeiende bedrijven.',
    features: [
      'Meerdere pagina\'s (t/m 5)',
      'CMS (zelf content beheren)',
      'SEO-basis & Google Maps',
      'Vercel hosting (1 jaar)',
      'WhatsApp koppeling',
      'Oplevering in 7 dagen',
      '1 revisieronde',
    ],
    cta: 'Populaire keuze →',
    featured: true,
  },
  {
    name: 'Premium',
    price: '1.895',
    tagline: 'Volledig maatwerk voor maximaal resultaat.',
    features: [
      'Volledig maatwerk design',
      'Animaties & interacties',
      'Boekingssysteem integratie',
      'Onderhoud 3 maanden incl.',
      'SEO + Google Business',
      'Prioriteit support',
      'Oplevering in 10 dagen',
    ],
    cta: 'Neem contact op',
    featured: false,
  },
]

export default function Pricing() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
        },
      })

      cardRefs.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[#F1EFE8]"
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div ref={headingRef} className="mb-16 text-center">
          <p className="text-[#0F0F0E]/40 text-sm font-mono tracking-widest uppercase mb-4">
            Transparante tarieven
          </p>
          <h2 className="font-sans font-bold text-[#0F0F0E] text-4xl md:text-5xl tracking-tight leading-tight">
            Geen verrassingen.
            <span className="font-serif italic text-[#1D9E75]"> Gewoon eerlijk.</span>
          </h2>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <div
              key={i}
              ref={el => (cardRefs.current[i] = el)}
              className={`relative rounded-[2rem] p-8 flex flex-col gap-6 transition-all duration-300 ${
                plan.featured
                  ? 'bg-[#0F0F14] text-white border border-[#1D9E75]/30 shadow-2xl shadow-[#0F0F14]/30 scale-[1.02]'
                  : 'card-surface'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-[#1D9E75] text-white text-xs font-semibold px-4 py-1.5 rounded-full whitespace-nowrap">
                    Meest gekozen
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div>
                <p className={`text-xs font-mono tracking-widest uppercase mb-2 ${plan.featured ? 'text-[#1D9E75]' : 'text-[#0F0F0E]/40'}`}>
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className={`font-sans font-bold text-4xl tracking-tight ${plan.featured ? 'text-white' : 'text-[#0F0F0E]'}`}>
                    €{plan.price}
                  </span>
                  <span className={`text-sm ${plan.featured ? 'text-white/40' : 'text-[#0F0F0E]/40'}`}>v.a.</span>
                </div>
                <p className={`text-sm mt-2 ${plan.featured ? 'text-white/60' : 'text-[#0F0F0E]/55'}`}>
                  {plan.tagline}
                </p>
              </div>

              {/* Divider */}
              <div className={`w-full h-px ${plan.featured ? 'bg-white/10' : 'bg-[#0F0F0E]/06'}`} />

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      plan.featured ? 'bg-[#1D9E75]/20' : 'bg-[#1D9E75]/10'
                    }`}>
                      <Check size={11} className="text-[#1D9E75]" />
                    </div>
                    <span className={`text-sm ${plan.featured ? 'text-white/75' : 'text-[#0F0F0E]/65'}`}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                className={`btn text-sm px-6 py-3.5 justify-center ${
                  plan.featured
                    ? 'bg-[#1D9E75] text-white shadow-lg shadow-[#1D9E75]/30'
                    : 'bg-[#0F0F0E]/06 text-[#0F0F0E]'
                }`}
              >
                {plan.featured && <span className="btn-bg bg-[#158a62]" />}
                <span className="relative z-10 flex items-center gap-2">
                  {plan.cta}
                  {!plan.featured && <ArrowRight size={15} />}
                </span>
              </a>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <p className="text-center text-[#0F0F0E]/35 text-sm font-mono mt-8">
          Alle prijzen ex. btw. · Onderhoudspakketten beschikbaar. · Vraag een offerte op maat aan.
        </p>
      </div>
    </section>
  )
}
