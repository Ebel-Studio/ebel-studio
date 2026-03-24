import { motion } from 'framer-motion'

/**
 * Animated toggle switch — squish effect on slide.
 * Props: checked (bool), onChange (fn)
 */
export function Switch({ checked, onChange }) {
  return (
    <label className="relative cursor-pointer flex-shrink-0 select-none" style={{ width: '52px', height: '28px', display: 'block' }} onClick={e => e.stopPropagation()}>
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className="sr-only"
      />

      {/* Track */}
      <div
        className="absolute inset-0 rounded-full transition-colors duration-200"
        style={{
          background: checked ? '#3B6FE8' : 'rgba(255,255,255,0.08)',
          border: `1px solid ${checked ? 'rgba(59,111,232,0.45)' : 'rgba(255,255,255,0.1)'}`,
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)',
        }}
      />

      {/* Thumb — squishes wide as it slides */}
      <motion.div
        key={String(checked)}
        className="absolute rounded-full bg-white shadow-md"
        style={{ top: '4px', height: '20px' }}
        initial={{ x: checked ? 4 : 28, width: '20px' }}
        animate={{
          x:      checked ? 28 : 4,
          height: ['20px', '10px', '20px'],
          width:  ['20px', '28px', '20px'],
        }}
        transition={{ duration: 0.28, delay: 0.05, ease: [0.25, 1, 0.5, 1] }}
      />
    </label>
  )
}
