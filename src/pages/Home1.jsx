import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScratchCard from '../components/ScratchCard'
import Countdown from '../components/Countdown'
import FloatingPetals from '../components/FloatingPetals'
import { wedding } from '../weddingConfig'

export default function Home() {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero with scratch card */}
      <section className="relative w-full h-[100svh] min-h-[560px]">
        <ScratchCard onReveal={() => setRevealed(true)}>
          <div className="relative w-full h-full bg-gradient-to-b from-maroon via-maroon to-maroon-dark flex items-center justify-center px-6 overflow-hidden">
            <FloatingPetals count={14} />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={revealed ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative z-10 text-center max-w-xl"
            >
              <p className="font-heading tracking-[0.3em] uppercase text-gold-light text-xs sm:text-sm mb-4">
                Together with our families
              </p>

              <h1 className="font-display text-5xl sm:text-7xl text-cream leading-tight mb-2">
                {wedding.groomFirst} &amp; {wedding.brideFirst}
              </h1>

              <p className="font-heading text-cream/90 text-lg sm:text-xl mb-8">
                request the pleasure of your company
              </p>

              <div className="mb-8">
                <Countdown target={wedding.weddingDateISO} />
              </div>

              <p className="font-heading text-2xl sm:text-3xl text-gold-light mb-1">
                {wedding.weddingDateDisplay}
              </p>
              <p className="text-cream/80 text-sm sm:text-base mb-8">
                {wedding.venue}, {wedding.city}
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={revealed ? { opacity: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link
                  to="/our-story"
                  className="px-6 py-3 rounded-full bg-gold text-maroon-dark font-heading font-semibold text-base shadow-lg hover:bg-gold-light transition-colors"
                >
                  Our Story &amp; Events
                </Link>
                <Link
                  to="/rsvp"
                  className="px-6 py-3 rounded-full border-2 border-gold-light text-gold-light font-heading font-semibold text-base hover:bg-gold-light hover:text-maroon-dark transition-colors"
                >
                  RSVP Now
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </ScratchCard>

        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1, y: [0, 8, 0] } : {}}
          transition={{ delay: 1, duration: 1.6, repeat: Infinity }}
          className="absolute bottom-6 inset-x-0 flex justify-center text-cream/70 z-20 pointer-events-none"
        >
          <span className="text-2xl">↓</span>
        </motion.div>
      </section>

      {/* teaser strip */}
      <section className="bg-cream py-16 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-display text-4xl text-maroon mb-4">You're Invited</p>
          <p className="font-body text-maroon-dark/80 max-w-xl mx-auto leading-relaxed">
            Join us as we begin a new chapter filled with love, laughter, and tradition. Explore our
            story, the celebration schedule, and let us know you'll be there.
          </p>
          <div className="flex justify-center gap-2 mt-6 text-gold text-2xl">
            <span>✿</span><span>✿</span><span>✿</span>
          </div>
        </div>
      </section>
    </div>
  )
}
