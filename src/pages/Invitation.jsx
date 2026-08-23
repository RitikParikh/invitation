import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScratchCard from '../components/ScratchCard'
import FloralCorner from '../components/FloralCorner'
import FloatingPetals from '../components/FloatingPetals'
import Countdown from '../components/Countdown'
import Carousel from '../components/Carousel'
import { wedding } from '../weddingConfig'
import { fireRevealConfetti } from '../lib/confetti'

import { useReveal } from '../lib/RevealContext'
import { useLang } from '../lib/LanguageContext'
import Footer from '../components/Footer'

const buildTeaserCards = (t) => [
    {
        icon: '॥ श्री नाथजी ॥',
        iconClass: 'font-devanagari font-semibold text-gold text-lg sm:text-xl tracking-wide mb-4',
        title: t('inviteTitle'),
        text: t('inviteText'),
        flourish: true,
    },
    {
        icon: '❦',
        eyebrow: '',
        title: t('groomTitle'),
        text: t('groomText'),
    },
    {
        icon: '✾',
        eyebrow: '',
        title: t('brideTitle'),
        text: t('brideText'),
        // to: '/our-story',
        // cta: 'Read Our Story',
    }
    //,
    // {
    //     title: "You're Invited",
    //     text: 'Join us as we begin a new chapter filled with love, laughter, and tradition.',
    //     flourish: true,
    // },
    // {
    //     icon: '❦',
    //     eyebrow: 'How it began',
    //     title: 'A Chance Meeting',
    //     text: `${wedding.groomFirst} and ${wedding.brideFirst} met at a mutual friend's birthday party in Mumbai and instantly hit it off over a shared love of old Bollywood music.`,
    // },
    // {
    //     icon: '✾',
    //     eyebrow: 'Chapter by chapter',
    //     title: 'Our Story',
    //     text: 'From long phone calls and weekend trips to a sunset proposal by Lake Pichola — the moments that brought us here.',
    //     to: '/our-story',
    //     cta: 'Read Our Story',
    // },
]

export default function Invitation() {
    const [revealed, setRevealed] = useState(false)
    const teaserRef = useRef(null)
    const { reveal } = useReveal()
    const { t, w } = useLang()
    const teaserCards = buildTeaserCards(t)

    const handleReveal = () => {
        setRevealed(true)
        reveal()
        fireRevealConfetti()
    }

    // once the reveal animation has played, glide down to the invitation
    useEffect(() => {
        if (!revealed) return
        const id = setTimeout(() => {
            teaserRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 6000)
        return () => clearTimeout(id)
    }, [revealed])

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
                        className="font-heading font-semibold tracking-[0.3em] uppercase text-[#e36393] text-xs sm:text-sm mb-3"
                    >
                        {t('heroEyebrow')}
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="font-display text-5xl sm:text-6xl text-maroon leading-tight mb-8"
                    >
                        {w.groomFirst} &amp; {w.brideFirst}
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
                                <p className="font-heading font-semibold tracking-[0.12em] uppercase text-[#e36393] text-base sm:text-lg mb-2">
                                    {t('heroSaveDate')}
                                </p>
                                <p className="font-heading font-semibold text-xl sm:text-3xl md:text-4xl text-maroon leading-snug mb-2 text-balance">
                                    {w.weddingDateDisplay}
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
                                {/* <div className="bg-maroon px-6 py-5 shadow-lg">
                                    <p className="font-heading tracking-[0.3em] uppercase text-gold-light text-xs sm:text-sm mb-4">
                                        Together with our families
                                    </p>


                                    <h1 className="font-display text-5xl sm:text-7xl bg-maroon text-cream leading-tight mb-2">
                                        {wedding.groomFirst} &amp; {wedding.brideFirst}
                                    </h1>

                                    <p className="font-heading text-cream/90 text-lg bg-maroon sm:text-xl mb-8">
                                        request the pleasure of your company
                                    </p>
                                </div> */}
                                <div className="rounded-2xl bg-maroon px-6 py-5 shadow-lg">
                                    <Countdown target={wedding.weddingDateISO} />
                                </div>
                                <div>
                                    <p className="text-maroon-dark/70 font-heading font-bold text-xl sm:text-2xl leading-snug text-balance">
                                        {t('heroFormal')}
                                    </p>
                                </div>
                                {/* <div>
                                    <p className="text-maroon-dark/70 text-sm sm:text-base leading-snug text-balance">
                                        {wedding.venue}, {wedding.city}
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        to="/our-story"
                                        className="px-6 py-3 rounded-full bg-gold text-maroon-dark font-heading font-semibold text-base shadow-lg hover:bg-gold-light transition-colors"
                                    >
                                        Our Story &amp; Events
                                    </Link>
                                    <Link
                                        to="/gallery"
                                        className="px-6 py-3 rounded-full border-2 border-maroon text-maroon font-heading font-semibold text-base hover:bg-maroon hover:text-cream transition-colors"
                                    >
                                        Gallery
                                    </Link>
                                </div> */}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
            {/* teaser strip */}
            <AnimatePresence>
                {revealed && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}

                    >
                        <section ref={teaserRef} className="bg-blush py-12 scroll-mt-20">
                            <Carousel cards={teaserCards} interval={5000} />
                        </section>
                        <Footer />
                    </motion.div>)}
            </AnimatePresence>
        </div>
    )
}
