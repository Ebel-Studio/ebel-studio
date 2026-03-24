import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { Switch } from './ui/Switch'

/* ─── Feature definitions ──────────────────────────────────────────
   level 1 = included in Starter
   level 2 = requires Standard
   level 3 = requires Premium
─────────────────────────────────────────────────────────────────── */
const FEATURES = [
  // Structure
  { id: 'multipage',  group: 'Structure & Pages',  label: 'Multiple pages',          desc: 'Home, About, Services, Contact & more',   level: 2 },
  { id: 'epk',        group: 'Structure & Pages',  label: 'EPK section',             desc: 'Press kit for artists & musicians',        level: 2 },
  // Content
  { id: 'gallery',    group: 'Content & Media',    label: 'Photo gallery',           desc: 'Lightbox gallery for photos or work',      level: 2 },
  { id: 'merch',      group: 'Content & Media',    label: 'Merch / releases page',   desc: 'Products, music drops or portfolio items', level: 3 },
  { id: 'blog',       group: 'Content & Media',    label: 'Blog or news section',    desc: 'Regularly updated articles or updates',    level: 2 },
  // Marketing
  { id: 'seo',        group: 'Marketing',          label: 'SEO + Google Analytics',  desc: 'Rankings, search visibility & tracking',   level: 2 },
  { id: 'newsletter', group: 'Marketing',          label: 'Newsletter integration',  desc: 'Email capture & list connection',          level: 3 },
  // Design
  { id: 'animations', group: 'Design & Experience',label: 'Custom animations',       desc: 'Motion design & scroll interactions',      level: 3 },
  { id: 'typography', group: 'Design & Experience',label: 'Custom typography',       desc: 'Bespoke font pairing & visual hierarchy',  level: 3 },
  // Support
  { id: 'revision',   group: 'Support',            label: 'Extra revision round',    desc: 'An additional feedback & iteration cycle', level: 3 },
]

const PACKAGES = [
  {
    id: 'starter',
    title: 'Starter',
    price: '€499',
    monthly: '+ €29/mo',
    level: 1,
    tagline: 'Perfect for getting online fast.',
    items: [
      'Custom single-page website',
      'Mobile-first design',
      'Socials & streaming links',
      'Contact / booking section',
      'Delivered within 5 days',
    ],
  },
  {
    id: 'recommended',
    title: 'Standard',
    price: '€749',
    monthly: '+ €39/mo',
    level: 2,
    tagline: 'For businesses that want room to grow.',
    items: [
      'Everything in Starter',
      'Multi-page website',
      'Photo gallery + lightbox',
      'EPK section',
      'SEO + Google Analytics',
    ],
  },
  {
    id: 'premium',
    title: 'Premium',
    price: '€1,199',
    monthly: '+ €49/mo',
    level: 3,
    tagline: 'The full package — no compromises.',
    items: [
      'Everything in Standard',
      'Merch / releases page',
      'Newsletter integration',
      'Animations + custom typography',
      '1 extra revision round',
    ],
  },
]

const GROUPS = [...new Set(FEATURES.map(f => f.group))]

export default function Configurator() {
  const [active, setActive] = useState({})

  const toggle = (id, val) => setActive(prev => ({ ...prev, [id]: val }))

  /* Derive recommended package from highest feature level selected */
  const maxLevel = Object.entries(active)
    .filter(([, on]) => on)
    .reduce((max, [id]) => {
      const f = FEATURES.find(f => f.id === id)
      return f ? Math.max(max, f.level) : max
    }, 0)

  const pkg = PACKAGES.find(p => p.level >= Math.max(maxLevel, 1)) ?? PACKAGES[0]
  const activeCount = Object.values(active).filter(Boolean).length

  return (
    <section
      id="plan"
      className="py-24 md:py-36 px-6 md:px-12 lg:px-20"
      style={{ background: '#0f1020' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <p className="text-[#3B6FE8] text-sm font-mono tracking-widest uppercase mb-3">
            Package builder
          </p>
          <h2
            className="font-heading font-semibold text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em' }}
          >
            Build your plan.
          </h2>
          <p className="text-white/35 text-sm mt-3 max-w-md leading-relaxed">
            Toggle the features you need — the right package appears automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">

          {/* ── Left: feature toggles ─────────────────── */}
          <div className="flex flex-col gap-10">
            {GROUPS.map(group => (
              <div key={group}>
                <p className="text-white/25 text-xs font-mono tracking-widest uppercase mb-4">
                  {group}
                </p>
                <div className="flex flex-col gap-2.5">
                  {FEATURES.filter(f => f.group === group).map(feature => {
                    const on = !!active[feature.id]
                    return (
                      <motion.div
                        key={feature.id}
                        onClick={() => toggle(feature.id, !on)}
                        className="flex items-center justify-between rounded-2xl px-5 py-4 cursor-pointer transition-colors duration-200"
                        style={{
                          background: on
                            ? 'rgba(59,111,232,0.1)'
                            : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${on
                            ? 'rgba(59,111,232,0.28)'
                            : 'rgba(255,255,255,0.06)'}`,
                        }}
                      >
                        <div className="flex-1 pr-4 min-w-0">
                          <p className="text-white text-sm font-medium leading-tight">
                            {feature.label}
                          </p>
                          <p className="text-white/35 text-xs mt-0.5 leading-relaxed">
                            {feature.desc}
                          </p>
                        </div>

                        {/* Package level indicator */}
                        <span
                          className="text-xs font-mono mr-4 shrink-0 hidden sm:block"
                          style={{ color: feature.level === 3 ? '#3B6FE8' : feature.level === 2 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.2)' }}
                        >
                          {feature.level === 1 ? 'Starter' : feature.level === 2 ? 'Standard' : 'Premium'}
                        </span>

                        <Switch checked={on} onChange={val => toggle(feature.id, val)} />
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* ── Right: live recommendation card ──────── */}
          <div className="lg:sticky lg:top-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                className="rounded-[2rem] p-8 flex flex-col gap-5"
                style={{
                  background: 'linear-gradient(145deg, #1c2660 0%, #0d1025 100%)',
                  border: '1px solid rgba(59,111,232,0.2)',
                  boxShadow: '0 24px 64px -16px rgba(0,0,0,0.6)',
                }}
              >
                {/* Status bar */}
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: '#3B6FE8' }}
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
                  <span className="text-[#3B6FE8] text-xs font-mono tracking-widest uppercase">
                    {activeCount === 0 ? 'Select features below' : `${activeCount} feature${activeCount !== 1 ? 's' : ''} selected`}
                  </span>
                </div>

                {/* Package name + price */}
                <div>
                  <p className="text-white/30 text-xs font-mono tracking-widest uppercase mb-1.5">
                    {pkg.title}
                  </p>
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span
                      className="font-heading font-semibold text-white"
                      style={{ fontSize: '2.6rem', letterSpacing: '-0.03em', lineHeight: 1 }}
                    >
                      {pkg.price}
                    </span>
                    <span className="text-white/30 text-xs">one-time</span>
                  </div>
                  <p className="text-[#3B6FE8] text-sm font-semibold">
                    {pkg.monthly} maintenance
                  </p>
                </div>

                {/* Tagline */}
                <p className="text-white/45 text-sm leading-relaxed border-t border-white/06 pt-4">
                  {pkg.tagline}
                </p>

                {/* Included features */}
                <ul className="flex flex-col gap-2">
                  {pkg.items.map(item => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check
                        size={13}
                        className="shrink-0 mt-0.5"
                        style={{ color: '#3B6FE8' }}
                      />
                      <span className="text-white/60 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className="btn bg-[#3B6FE8] text-white text-sm px-5 py-3.5 justify-center mt-2"
                >
                  <span className="btn-bg" style={{ background: '#0f1020' }} />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Get in touch <ArrowRight size={14} />
                  </span>
                </a>

                {/* Package switcher pills */}
                <div className="flex gap-2 pt-1">
                  {PACKAGES.map(p => (
                    <button
                      key={p.id}
                      onClick={() => {
                        /* Force all toggles to match the clicked package level */
                        const next = {}
                        FEATURES.forEach(f => { next[f.id] = f.level <= p.level })
                        setActive(next)
                      }}
                      className="flex-1 text-xs font-mono py-1.5 rounded-full transition-colors duration-200"
                      style={{
                        background: pkg.id === p.id ? 'rgba(59,111,232,0.2)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${pkg.id === p.id ? 'rgba(59,111,232,0.4)' : 'rgba(255,255,255,0.08)'}`,
                        color: pkg.id === p.id ? '#3B6FE8' : 'rgba(255,255,255,0.3)',
                      }}
                    >
                      {p.title}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
