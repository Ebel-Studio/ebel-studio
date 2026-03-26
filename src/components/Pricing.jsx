import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const packages = [
  {
    title: 'Starter',
    price: '€499',
    monthly: '+ €29/mo',
    featured: false,
    items: [
      'Custom single-page website',
      'Mobile-first design',
      'Socials & streaming links',
      'Contact / booking section',
      'Delivered within 5 working days',
    ],
  },
  {
    title: 'Recommended',
    price: '€749',
    monthly: '+ €39/mo',
    featured: true,
    items: [
      'Everything in Starter',
      'Multi-page (bio, shows, contact)',
      'Photo gallery + lightbox',
      'EPK section',
      'SEO + Google Analytics',
    ],
  },
  {
    title: 'Premium',
    price: '€1,199',
    monthly: '+ €49/mo',
    featured: false,
    items: [
      'Everything in Recommended',
      'Merch / releases page',
      'Newsletter integration',
      'Animations + custom typography',
      '1 extra revision round',
    ],
  },
]

export default function Pricing() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pricing-card', {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="tarieven" ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ background: '#F7F7F5' }}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <p className="text-[#1A1A2E] text-sm font-mono tracking-widest uppercase mb-3">Investment</p>
          <h2 className="font-heading font-semibold text-[#111111]" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em' }}>
            Pricing
          </h2>
        </div>
        <p className="text-[#111111]/45 text-sm mb-14 max-w-lg leading-relaxed">
          One-time investment + optional monthly maintenance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {packages.map(({ title, price, monthly, featured, items }) => (
            <div
              key={title}
              className={`pricing-card rounded-[2rem] p-8 flex flex-col gap-5 relative ${
                featured
                  ? 'bg-[#1A1A2E] text-white shadow-xl shadow-[#1A1A2E]/25'
                  : 'bg-white border border-[#111111]/08 shadow-sm'
              }`}
            >
              {featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#3B6FE8] text-white text-[0.65rem] font-bold px-4 py-1 rounded-full tracking-wider uppercase">
                    Recommended
                  </span>
                </div>
              )}

              <div>
                <p className={`text-xs font-mono tracking-widest uppercase mb-2 ${featured ? 'text-[#3B6FE8]' : 'text-[#1A1A2E]'}`}>
                  {title}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="font-heading font-semibold" style={{ fontSize: '2.2rem', letterSpacing: '-0.03em', color: featured ? '#fff' : '#111111' }}>
                    {price}
                  </span>
                  <span className={`text-xs ${featured ? 'text-white/60' : 'text-[#111111]/40'}`}>one-time</span>
                </div>
                <p className={`text-sm font-semibold mt-0.5 ${featured ? 'text-[#3B6FE8]' : 'text-[#1A1A2E]'}`}>
                  {monthly} maintenance
                </p>
              </div>

              <ul className="flex flex-col gap-2.5 flex-1">
                {items.map(item => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check size={14} className="mt-0.5 shrink-0" style={{ color: featured ? '#3B6FE8' : '#1A1A2E' }} />
                    <span className={`text-sm leading-relaxed ${featured ? 'text-white/80' : 'text-[#111111]/65'}`}>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`btn text-sm px-5 py-3.5 justify-center mt-2 ${featured ? 'bg-white text-[#1A1A2E]' : 'bg-[#1A1A2E] text-white'}`}
              >
                <span className={`btn-bg ${featured ? 'bg-[#F7F7F5]' : 'bg-[#0f1020]'}`} />
                <span className="relative z-10 flex items-center gap-2">
                  Get in touch <ArrowRight size={14} />
                </span>
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-[#111111]/35 text-xs font-mono leading-relaxed">
          Current intro rate — prices will increase as the portfolio grows.
        </p>
      </div>
    </section>
  )
}
