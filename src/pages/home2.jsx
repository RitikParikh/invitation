import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ScratchCard from '../components/ScratchCard'
import FloralCorner from '../components/FloralCorner'
import FloatingPetals from '../components/FloatingPetals'
import Countdown from '../components/Countdown'
import { wedding } from '../weddingConfig'
import { fireRevealConfetti } from '../lib/confetti'

export default function Home() {
    const [revealed, setRevealed] = useState(false)

    const handleReveal = () => {
        setRevealed(true)
        fireRevealConfetti()
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero */}
            <section className="relative w-full min-h-[100svh] bg-cream overflow-hidden flex flex-col items-center justify-center px-5 pt-24 pb-16">
                <FloralCorner className="top-0 left-0" />
                <FloralCorner className="bottom-0 right-0" flip />
                <FloatingPetals count={14} />

                <div className="relative z-10 flex flex-col items-center text-center max-w-xl">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="font-heading tracking-[0.3em] uppercase text-gold text-xs sm:text-sm mb-3"
                    >
                        Something Special Awaits
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="font-display text-5xl sm:text-6xl text-maroon leading-tight mb-8"
                    >
                        {wedding.brideFirst} &amp; {wedding.groomFirst}
                    </motion.h1>

                    {/* the single big scratch flower */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-80 h-80 sm:w-96 sm:h-96 md:w-[26rem] md:h-[26rem]"
                    >
                        <ScratchCard onReveal={handleReveal}>
                            <div className="flex flex-col items-center justify-center text-center">
                                <p className="font-heading font-semibold tracking-[0.12em] uppercase text-gold text-base sm:text-lg mb-2">
                                    Save Our Date
                                </p>
                                <p className="font-heading font-semibold text-xl sm:text-3xl md:text-4xl text-maroon leading-snug mb-2 text-balance">
                                    {wedding.weddingDateDisplay}
                                </p>
                                <p className="text-maroon-dark/70 text-sm sm:text-base leading-snug text-balance">
                                    {wedding.venue}, {wedding.city}
                                </p>
                            </div>
                        </ScratchCard>
                    </motion.div>

                    <AnimatePresence>
                        {revealed && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="mt-10 flex flex-col items-center gap-8"
                            >
                                <div className="rounded-2xl bg-maroon px-6 py-5 shadow-lg">
                                    <Countdown target={wedding.weddingDateISO} />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        to="/our-story"
                                        className="px-6 py-3 rounded-full bg-gold text-maroon-dark font-heading font-semibold text-base shadow-lg hover:bg-gold-light transition-colors"
                                    >
                                        Our Story &amp; Events
                                    </Link>
                                    <Link
                                        to="/rsvp"
                                        className="px-6 py-3 rounded-full border-2 border-maroon text-maroon font-heading font-semibold text-base hover:bg-maroon hover:text-cream transition-colors"
                                    >
                                        RSVP Now
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* teaser strip */}
            <section className="bg-blush py-16 px-5">
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
