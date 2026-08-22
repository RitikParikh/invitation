import { useMemo } from 'react'
import { motion } from 'framer-motion'

const EMOJIS = ['🌸', '🌺', '🌼', '✿']

export default function FloatingPetals({ count = 12 }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 10 + Math.random() * 8,
        size: 14 + Math.random() * 14,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      })),
    [count]
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0" aria-hidden="true">
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="absolute select-none opacity-70"
          style={{ left: `${p.left}%`, fontSize: p.size, top: -40 }}
          initial={{ y: -40, rotate: 0 }}
          animate={{ y: '110vh', rotate: 360 }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  )
}
