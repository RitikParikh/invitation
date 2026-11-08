import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../lib/LanguageContext'
import FloatingPetals from './FloatingPetals'
import LangSwitch from './LangSwitch'
import { IMAGES } from '../lib/images'

// closed → (tap) → flap swings open → letter rises out → whole scene fades away
const FLAP_MS = 700
const LETTER_MS = 1100
const EXIT_MS = 700

/**
 * Full-screen sealed envelope shown before the invitation pages.
 * Tapping it breaks the seal, opens the flap, slides the letter out and then
 * calls onOpened() so the pages can start.
 */
export default function Envelope({ onOpened, onTap }) {
    const { t, couple } = useLang()
    // closed | flap | letter | exit
    const [phase, setPhase] = useState('closed')

    useEffect(() => {
        if (phase === 'closed') return
        const next = { flap: ['letter', FLAP_MS], letter: ['exit', LETTER_MS], exit: [null, EXIT_MS] }[phase]
        const id = setTimeout(() => (next[0] ? setPhase(next[0]) : onOpened()), next[1])
        return () => clearTimeout(id)
    }, [phase, onOpened])

    const open = () => {
        if (phase !== 'closed') return
        // runs inside the tap itself — phones only allow audio to start from a user gesture
        onTap?.()
        setPhase('flap')
    }
    const flapOpen = phase !== 'closed'
    const letterOut = phase === 'letter' || phase === 'exit'

    return (
        <motion.div
            className="fixed inset-0 z-[60] bg-cream bg-cover bg-center flex flex-col items-center justify-center overflow-hidden px-4"
            style={{ backgroundImage: `url(${IMAGES.logo1})` }}
            animate={{ opacity: phase === 'exit' ? 0 : 1 }}
            transition={{ duration: EXIT_MS / 1000, ease: 'easeInOut' }}
        >
            <div className="absolute inset-0 bg-cream/85" />
            <FloatingPetals count={12} />

            <div className="absolute top-3 right-5 sm:right-8 z-10">
                <LangSwitch />
            </div>

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 font-heading font-semibold tracking-[0.3em] uppercase text-[#e36393] text-xs sm:text-sm mb-3 text-center"
            >
                {t('envelopeEyebrow')}
            </motion.p>
            <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative z-10 font-display text-4xl sm:text-5xl text-maroon mb-24 sm:mb-28 text-center"
            >
                {couple[0]} &amp; {couple[1]}
            </motion.h1>

            {/* the envelope */}
            <motion.button
                type="button"
                onClick={open}
                aria-label={t('envelopeTap')}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={
                    phase === 'exit'
                        ? { opacity: 1, scale: 1.08, y: 40 }
                        : { opacity: 1, scale: 1, y: 0 }
                }
                transition={{ duration: 0.7, ease: 'easeOut' }}
                whileHover={phase === 'closed' ? { scale: 1.03 } : undefined}
                whileTap={phase === 'closed' ? { scale: 0.98 } : undefined}
                className="relative z-10 w-[min(86vw,420px)] aspect-[4/3] cursor-pointer"
                style={{ perspective: 1200 }}
            >
                {/* back of the envelope */}
                <div className="absolute inset-0 rounded-md bg-maroon-dark shadow-2xl" />

                {/* the letter inside */}
                <motion.div
                    className="absolute left-[6%] right-[6%] top-[6%] bottom-[6%] rounded-sm bg-cream border border-gold/60 shadow-md flex flex-col items-center justify-start pt-[6%] px-3 text-center"
                    style={{ zIndex: 2 }}
                    animate={{ y: letterOut ? '-58%' : '0%' }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="font-devanagari font-semibold text-gold text-sm sm:text-base tracking-wide">
                        ॥ श्री नाथजी ॥
                    </p>
                    <p className="font-display text-3xl sm:text-4xl text-maroon leading-tight mt-1">
                        {couple[0]} &amp; {couple[1]}
                    </p>
                    <p className="font-heading font-semibold uppercase tracking-[0.25em] text-[#e36393] text-[10px] sm:text-xs mt-1">
                        {t('inviteTitle')}
                    </p>
                </motion.div>

                {/* front pocket: left, right and bottom folds */}
                <svg
                    className="absolute inset-0 w-full h-full"
                    style={{ zIndex: 3 }}
                    viewBox="0 0 400 300"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <polygon points="0,0 200,165 0,300" fill="#6b1a25" />
                    <polygon points="400,0 200,165 400,300" fill="#6b1a25" />
                    <polygon points="0,300 200,150 400,300" fill="#7a1f2b" />
                    <polyline
                        points="0,300 200,150 400,300"
                        fill="none"
                        stroke="#c9a227"
                        strokeOpacity="0.55"
                        strokeWidth="1.5"
                    />
                </svg>

                {/* top flap — swings up and then tucks behind the letter */}
                <motion.div
                    className="absolute inset-x-0 top-0 h-[58%]"
                    style={{
                        transformOrigin: 'top center',
                        transformStyle: 'preserve-3d',
                        zIndex: letterOut ? 1 : 4,
                    }}
                    animate={{ rotateX: flapOpen ? 180 : 0 }}
                    transition={{ duration: FLAP_MS / 1000, ease: 'easeInOut' }}
                >
                    <svg className="w-full h-full" viewBox="0 0 400 174" preserveAspectRatio="none" aria-hidden="true">
                        <polygon points="0,0 400,0 200,174" fill="#8a2633" />
                        <polyline
                            points="0,0 200,174 400,0"
                            fill="none"
                            stroke="#c9a227"
                            strokeOpacity="0.6"
                            strokeWidth="1.5"
                        />
                    </svg>
                </motion.div>

                {/* wax seal */}
                <AnimatePresence>
                    {!flapOpen && (
                        <motion.div
                            className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-cream border-4 border-gold shadow-lg ring-2 ring-gold-light/70 flex items-center justify-center p-3 sm:p-4"
                            style={{ zIndex: 5 }}
                            exit={{ scale: 0, opacity: 0, rotate: -45 }}
                            transition={{ duration: 0.35 }}
                        >
                            <img src={IMAGES.logo} alt="" className="w-full h-full object-contain" draggable={false} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            <motion.p
                className="relative z-10 mt-10 font-heading font-semibold tracking-[0.2em] uppercase text-maroon text-sm sm:text-base"
                animate={phase === 'closed' ? { opacity: [0.4, 1, 0.4] } : { opacity: 0 }}
                transition={phase === 'closed' ? { duration: 2, repeat: Infinity } : { duration: 0.3 }}
            >
                {t('envelopeTap')}
            </motion.p>
        </motion.div>
    )
}
