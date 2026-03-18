import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

/**
 * Mouse-follow spotlight — adapted from ibelick/spotlight.
 * Tinted with Ebel Studio green (#1D9E75) instead of zinc/white.
 * Drop inside any position:relative container.
 */
export function Spotlight({ className, size = 320 }) {
  const containerRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [parentElement, setParentElement] = useState(null)

  const mouseX = useSpring(0, { bounce: 0 })
  const mouseY = useSpring(0, { bounce: 0 })

  const left = useTransform(mouseX, x => `${x - size / 2}px`)
  const top  = useTransform(mouseY, y => `${y - size / 2}px`)

  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement
      if (parent) {
        parent.style.position = 'relative'
        parent.style.overflow = 'hidden'
        setParentElement(parent)
      }
    }
  }, [])

  const handleMouseMove = useCallback(
    (e) => {
      if (!parentElement) return
      const { left: l, top: t } = parentElement.getBoundingClientRect()
      mouseX.set(e.clientX - l)
      mouseY.set(e.clientY - t)
    },
    [mouseX, mouseY, parentElement]
  )

  useEffect(() => {
    if (!parentElement) return
    const enter = () => setIsHovered(true)
    const leave = () => setIsHovered(false)
    parentElement.addEventListener('mousemove', handleMouseMove)
    parentElement.addEventListener('mouseenter', enter)
    parentElement.addEventListener('mouseleave', leave)
    return () => {
      parentElement.removeEventListener('mousemove', handleMouseMove)
      parentElement.removeEventListener('mouseenter', enter)
      parentElement.removeEventListener('mouseleave', leave)
    }
  }, [parentElement, handleMouseMove])

  return (
    <motion.div
      ref={containerRef}
      className={`pointer-events-none absolute rounded-full blur-2xl transition-opacity duration-300 ${className ?? ''}`}
      style={{
        width: size,
        height: size,
        left,
        top,
        opacity: isHovered ? 1 : 0,
        /* Ebel Studio green radial glow */
        background:
          'radial-gradient(circle at center, rgba(29,158,117,0.22) 0%, rgba(29,158,117,0.08) 45%, transparent 80%)',
      }}
    />
  )
}
