import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LayoutTemplate, Layers, Wrench } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  {
    icon: LayoutTemplate,
    tag: '01',
    title: 'Single Page',
    text: 'One focused page that tells your story and drives action. Great for getting online fast without complexity.',
    examples: [
      'Artist & musician sites',
      'Local business landing pages',
      'Event or launch pages',
      'Freelancer & portfolio pages',
      'Booking & contact pages',
    ],
  },
  {
    icon: Layers,
    tag: '02',
    title: 'Multipage',
    text: 'A full website with dedicated pages for everything you need. Built for businesses that want room to grow.',
    examples: [
      'Home + About + Services + Contact',
      'Blog or news section',
      'Portfolio or case studies',
      'Team & company pages',
      'Custom integrations (maps, bookings)',
    ],
  },
  {
    icon: Wrench,
    tag: '03',
    title: 'Maintenance & Support',
    text: 'Monthly package: hosting, updates, and one point of contact. Pricing depends on which website plan you choose.',
    examples: [
      'Hosting & uptime monitoring',
      'Content updates on request',
      'Security & performance checks',
      'Priority support',
      'Scales with your plan',
    ],
  },
]

export default function Diensten() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.dienst-card', {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="diensten" ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ background: '#F7F7F5' }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-[#1A1A2E] text-sm font-mono tracking-widest uppercase mb-3">What I build</p>
          <h2 className="font-heading font-semibold text-[#111111]" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em' }}>
            Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map(({ icon: Icon, tag, title, text, examples }) => (
            <div key={tag} className="dienst-card card-surface p-8 flex flex-col gap-6 hover:shadow-xl transition-shadow duration-300">

              {/* Top row */}
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#1A1A2E]/08 flex items-center justify-center">
                  <Icon size={20} className="text-[#1A1A2E]" />
                </div>
                <span className="font-mono text-xs text-[#111111]/25 tracking-widest">{tag}</span>
              </div>

              {/* Title + description */}
              <div>
                <h3 className="font-heading font-semibold text-[#111111] mb-3" style={{ fontSize: '1.2rem', letterSpacing: '-0.02em' }}>
                  {title}
                </h3>
                <p className="text-[#111111]/55 text-sm leading-relaxed">{text}</p>
              </div>

              {/* Examples list */}
              <ul className="flex flex-col gap-2 flex-1">
                {examples.map((ex, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ background: '#1A1A2E', opacity: 0.5 }} />
                    <span className="text-[#111111]/50 text-xs leading-relaxed">{ex}</span>
                  </li>
                ))}
              </ul>

              {/* Footer link */}
              <div className="pt-4 border-t border-[#111111]/06">
                <a href="#contact" className="text-[#1A1A2E] text-sm font-semibold link-lift inline-flex items-center gap-1">
                  Learn more →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
