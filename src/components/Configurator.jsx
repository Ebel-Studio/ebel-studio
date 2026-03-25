import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { Switch } from './ui/Switch'

/* ─── Site types ───────────────────────────────────────────────────── */
const SITE_TYPES = [
  {
    id: 'artist',
    emoji: '🎵',
    label: 'Artist & Musician',
    desc: 'Shows, booking forms, streaming links, EPK',
  },
  {
    id: 'holiday',
    emoji: '🏡',
    label: 'Holiday Home',
    desc: 'Gallery, availability, direct booking API',
  },
  {
    id: 'business',
    emoji: '🏪',
    label: 'Business',
    desc: 'Services, maps, reviews, appointments',
  },
  {
    id: 'creative',
    emoji: '✦',
    label: 'Creative & Portfolio',
    desc: 'Work showcase, case studies, blog',
  },
]

/* ─── Features per type ────────────────────────────────────────────
   level 1 = Starter · level 2 = Standard · level 3 = Premium
────────────────────────────────────────────────────────────────── */
const FEATURES_BY_TYPE = {
  artist: [
    { id: 'bio',        group: 'Basics',            label: 'Artist bio & photo',       desc: 'Your story, your face',                    level: 1 },
    { id: 'contact',    group: 'Basics',            label: 'Contact / booking form',   desc: 'Via Formspree, no spam',                   level: 1 },
    { id: 'socials',    group: 'Basics',            label: 'Social & streaming links', desc: 'Spotify, Apple Music, Instagram & more',   level: 1 },
    { id: 'shows',      group: 'Content',           label: 'Shows & events page',      desc: 'Upcoming + past gigs with ticket links',   level: 2 },
    { id: 'booking',    group: 'Content',           label: 'Promoter booking form',    desc: 'Let bookers reach you with a structured form', level: 2 },
    { id: 'epk',        group: 'Content',           label: 'EPK / press section',      desc: 'Press photos, bio, tech rider',            level: 2 },
    { id: 'merch',      group: 'Content',           label: 'Merch & releases page',    desc: 'Showcase music, link to shop or Bandcamp', level: 2 },
    { id: 'emaillist',  group: 'Marketing',         label: 'Email list capture',       desc: 'Build your own fanbase directly',          level: 3 },
    { id: 'instagram',  group: 'Marketing',         label: 'Instagram feed embed',     desc: 'Live feed pulled straight from your profile', level: 3 },
    { id: 'animations', group: 'Design',            label: 'Custom scroll animations', desc: 'Cinematic micro-interactions & motion',   level: 3 },
  ],
  holiday: [
    { id: 'gallery',    group: 'Basics',            label: 'Photo gallery',            desc: 'Lightbox, fullscreen, mobile-optimised',   level: 1 },
    { id: 'amenities',  group: 'Basics',            label: 'House features & amenities', desc: 'Beds, wifi, pool — clearly listed',      level: 1 },
    { id: 'maps',       group: 'Basics',            label: 'Location & Google Maps',   desc: 'Embed with directions',                    level: 1 },
    { id: 'inquiry',    group: 'Basics',            label: 'Booking inquiry form',     desc: 'Date picker + contact via Formspree',      level: 1 },
    { id: 'reviews',    group: 'Content',           label: 'Guest reviews section',    desc: 'Social proof from past guests',            level: 2 },
    { id: 'multilang',  group: 'Content',           label: 'Multi-language (EN + NL)', desc: 'Reach more international guests',          level: 2 },
    { id: 'virtual',    group: 'Content',           label: 'Virtual tour embed',       desc: 'Matterport or YouTube 360°',               level: 2 },
    { id: 'bookingapi', group: 'Integrations',      label: 'Direct booking API',       desc: 'Beds24 / Lodgify — real-time reservations', level: 3 },
    { id: 'calendar',   group: 'Integrations',      label: 'Live availability calendar', desc: 'Synced calendar, no manual updates',     level: 3 },
    { id: 'autoemail',  group: 'Integrations',      label: 'Automated confirmation emails', desc: 'Auto-reply on every booking request', level: 3 },
  ],
  business: [
    { id: 'services',   group: 'Basics',            label: 'Services overview',        desc: 'What you offer, clearly presented',        level: 1 },
    { id: 'contact',    group: 'Basics',            label: 'Contact form',             desc: 'Via Formspree, no spam',                   level: 1 },
    { id: 'maps',       group: 'Basics',            label: 'Google Maps + opening hours', desc: 'Location, directions & times',          level: 1 },
    { id: 'booking',    group: 'Content',           label: 'Appointment booking form', desc: 'Let clients schedule without calling',     level: 2 },
    { id: 'reviews',    group: 'Content',           label: 'Reviews & testimonials',   desc: 'Build trust with social proof',            level: 2 },
    { id: 'blog',       group: 'Content',           label: 'Blog / news section',      desc: 'Stay visible in Google search',            level: 2 },
    { id: 'seo',        group: 'Marketing',         label: 'SEO + Google Analytics',   desc: 'Track visitors, rank higher',              level: 2 },
    { id: 'store',      group: 'Integrations',      label: 'Webshop / online store',   desc: 'Sell products or gift cards',              level: 3 },
    { id: 'portal',     group: 'Integrations',      label: 'Client portal / login',    desc: 'Private area for your customers',          level: 3 },
    { id: 'crm',        group: 'Integrations',      label: 'CRM integration',          desc: 'Sync leads with HubSpot, Notion or Airtable', level: 3 },
  ],
  creative: [
    { id: 'showcase',   group: 'Basics',            label: 'Work showcase',            desc: 'Up to 6 projects with images & context',   level: 1 },
    { id: 'about',      group: 'Basics',            label: 'About & story',            desc: 'Who you are and what you stand for',       level: 1 },
    { id: 'contact',    group: 'Basics',            label: 'Contact form',             desc: 'Via Formspree, no spam',                   level: 1 },
    { id: 'services',   group: 'Content',           label: 'Services & rates page',    desc: 'Be clear about what you offer & at what price', level: 2 },
    { id: 'cases',      group: 'Content',           label: 'Case studies (detailed)',  desc: 'Deep dives into your process & outcomes', level: 2 },
    { id: 'blog',       group: 'Content',           label: 'Blog / articles',          desc: 'Share knowledge, build authority',         level: 2 },
    { id: 'testimonials', group: 'Content',         label: 'Client testimonials',      desc: 'Let your work speak for itself',           level: 2 },
    { id: 'animations', group: 'Design',            label: 'Scroll animations',        desc: 'Cinematic micro-interactions',             level: 3 },
    { id: 'protected',  group: 'Design',            label: 'Password-protected area',  desc: 'Private portfolio for specific clients',   level: 3 },
    { id: 'typography', group: 'Design',            label: 'Custom type system',       desc: 'Variable fonts & editorial visual identity', level: 3 },
  ],
}

/* ─── Packages ────────────────────────────────────────────────────── */
const PACKAGES = [
  {
    id: 'starter',
    title: 'Starter',
    price: '€499',
    monthly: '+ €29/mo',
    level: 1,
    tagline: 'Everything you need to get online and be found.',
  },
  {
    id: 'standard',
    title: 'Standard',
    price: '€749',
    monthly: '+ €39/mo',
    level: 2,
    tagline: 'More features, more reach. The most popular choice.',
    badge: 'Most popular',
  },
  {
    id: 'premium',
    title: 'Premium',
    price: '€1.199',
    monthly: '+ €49/mo',
    level: 3,
    tagline: 'Full power — APIs, integrations, custom everything.',
  },
]

/* ─── Helpers ─────────────────────────────────────────────────────── */
const fadeSlide = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.25, 1, 0.5, 1] } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.22, ease: 'easeIn' } },
}

export default function Configurator() {
  const [siteType, setSiteType] = useState(null)
  const [active, setActive]     = useState({})

  const features = siteType ? FEATURES_BY_TYPE[siteType] : []
  const groups   = siteType ? [...new Set(features.map(f => f.group))] : []

  const toggle = (id, val) => setActive(prev => ({ ...prev, [id]: val }))

  const maxLevel = Object.entries(active)
    .filter(([, on]) => on)
    .reduce((max, [id]) => {
      const f = features.find(f => f.id === id)
      return f ? Math.max(max, f.level) : max
    }, 0)

  const pkg         = PACKAGES.find(p => p.level >= Math.max(maxLevel, 1)) ?? PACKAGES[0]
  const activeCount = Object.values(active).filter(Boolean).length

  /* Items shown in the package card = all features of current type at pkg.level or below */
  const pkgItems = features.filter(f => f.level <= pkg.level).map(f => f.label)

  const selectType = (id) => {
    setSiteType(id)
    setActive({})
  }

  const presetLevel = (level) => {
    const next = {}
    features.forEach(f => { next[f.id] = f.level <= level })
    setActive(next)
  }

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
            Build your plan
          </p>
          <h2
            className="font-heading font-semibold text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em' }}
          >
            Pick exactly what you need.
          </h2>
          <p className="text-white/35 text-sm mt-3 max-w-md leading-relaxed">
            {siteType
              ? 'Toggle the features you want — your package appears automatically.'
              : 'Click a site type below to open the feature configurator and build your plan.'}
          </p>
        </div>

        <AnimatePresence mode="wait">

          {/* ── Step 1: site type selector ─────────────── */}
          {!siteType && (
            <motion.div key="step1" {...fadeSlide}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {SITE_TYPES.map(type => (
                  <motion.button
                    key={type.id}
                    onClick={() => selectType(type.id)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-left rounded-[1.5rem] p-6 flex flex-col gap-4 cursor-pointer"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      transition: 'border-color 0.18s, box-shadow 0.18s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(59,111,232,0.45)'
                      e.currentTarget.style.boxShadow = '0 0 0 1px rgba(59,111,232,0.12), 0 12px 36px -8px rgba(59,111,232,0.25)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
                      style={{ background: 'rgba(59,111,232,0.1)' }}
                    >
                      {type.emoji}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm mb-1.5">{type.label}</p>
                      <p className="text-white/35 text-xs leading-relaxed">{type.desc}</p>
                    </div>
                    {/* CTA button — makes clickability explicit */}
                    <div
                      className="mt-auto flex items-center justify-between w-full pt-4"
                      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <span className="text-white/20 text-[0.58rem] font-mono tracking-wide">Configure →</span>
                      <div
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                        style={{
                          background: 'rgba(59,111,232,0.14)',
                          border: '1px solid rgba(59,111,232,0.28)',
                          color: '#3B6FE8',
                        }}
                      >
                        Select <ArrowRight size={11} />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Step 2: feature toggles ────────────────── */}
          {siteType && (
            <motion.div key={`step2-${siteType}`} {...fadeSlide}>

              {/* Back + selected type label */}
              <div className="flex items-center gap-3 mb-10">
                <button
                  onClick={() => { setSiteType(null); setActive({}) }}
                  className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors duration-150"
                >
                  <ArrowLeft size={14} />
                  Change type
                </button>
                <span className="text-white/15">|</span>
                <span className="text-white/50 text-sm">
                  {SITE_TYPES.find(t => t.id === siteType)?.emoji}{' '}
                  {SITE_TYPES.find(t => t.id === siteType)?.label}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">

                {/* Left: feature toggles */}
                <div className="flex flex-col gap-10">
                  {groups.map(group => (
                    <div key={group}>
                      <p className="text-white/25 text-xs font-mono tracking-widest uppercase mb-4">
                        {group}
                      </p>
                      <div className="flex flex-col gap-2.5">
                        {features.filter(f => f.group === group).map(feature => {
                          const on = !!active[feature.id]
                          return (
                            <motion.div
                              key={feature.id}
                              onClick={() => toggle(feature.id, !on)}
                              className="flex items-center justify-between rounded-2xl px-5 py-4 cursor-pointer transition-colors duration-200"
                              style={{
                                background: on ? 'rgba(59,111,232,0.1)' : 'rgba(255,255,255,0.03)',
                                border: `1px solid ${on ? 'rgba(59,111,232,0.28)' : 'rgba(255,255,255,0.06)'}`,
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
                              <span
                                className="text-xs font-mono mr-4 shrink-0 hidden sm:block"
                                style={{
                                  color: feature.level === 3
                                    ? '#3B6FE8'
                                    : feature.level === 2
                                    ? 'rgba(255,255,255,0.3)'
                                    : 'rgba(255,255,255,0.2)',
                                }}
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

                {/* Right: live package card */}
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
                      {/* Status dot */}
                      <div className="flex items-center gap-2">
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: '#3B6FE8' }}
                          animate={{ opacity: [1, 0.4, 1] }}
                          transition={{ duration: 1.8, repeat: Infinity }}
                        />
                        <span className="text-[#3B6FE8] text-xs font-mono tracking-widest uppercase">
                          {activeCount === 0
                            ? 'Toggle features to start'
                            : `${activeCount} feature${activeCount !== 1 ? 's' : ''} selected`}
                        </span>
                      </div>

                      {/* Package name + price */}
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <p className="text-white/30 text-xs font-mono tracking-widest uppercase">
                            {pkg.title}
                          </p>
                          {pkg.badge && (
                            <span
                              className="text-[0.6rem] font-mono px-2 py-0.5 rounded-full"
                              style={{ background: 'rgba(59,111,232,0.2)', color: '#3B6FE8', border: '1px solid rgba(59,111,232,0.3)' }}
                            >
                              {pkg.badge}
                            </span>
                          )}
                        </div>
                        <div className="flex items-baseline gap-2 mb-0.5">
                          <span
                            className="font-heading font-semibold text-white"
                            style={{ fontSize: '2.6rem', letterSpacing: '-0.03em', lineHeight: 1 }}
                          >
                            {pkg.price}
                          </span>
                          <span className="text-white/30 text-xs">one-time</span>
                        </div>
                        <p className="text-[#3B6FE8] text-sm font-semibold">{pkg.monthly} maintenance</p>
                      </div>

                      {/* Tagline */}
                      <p className="text-white/45 text-sm leading-relaxed border-t border-white/06 pt-4">
                        {pkg.tagline}
                      </p>

                      {/* Dynamic features list */}
                      <ul className="flex flex-col gap-2">
                        {pkgItems.slice(0, 6).map(item => (
                          <li key={item} className="flex items-start gap-2.5">
                            <Check size={13} className="shrink-0 mt-0.5" style={{ color: '#3B6FE8' }} />
                            <span className="text-white/60 text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                        {pkgItems.length > 6 && (
                          <li className="text-white/25 text-xs pl-5">
                            + {pkgItems.length - 6} more included
                          </li>
                        )}
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

                      {/* Package preset pills */}
                      <div className="flex gap-2 pt-1">
                        {PACKAGES.map(p => (
                          <button
                            key={p.id}
                            onClick={() => presetLevel(p.level)}
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
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  )
}
