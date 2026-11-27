import { useLayoutEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Countdown from '../components/Countdown'
import Footer from '../components/Footer'
import { useLang } from '../lib/LanguageContext'
import { IMAGES } from '../lib/images'
import { SECTIONS } from '../lib/routes'
import { useFamilyInvite, useShowStory } from '../lib/familyInvite'

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const reveal = {
    initial: 'hidden',
    whileInView: 'show',
    viewport: { once: true, amount: 0.25 },
    variants: fadeUp,
}


function SectionTitle({ eyebrow, title, light = false }) {
    return (
        <motion.div {...reveal} className="text-center mb-12">
            {eyebrow && (
                <p
                    className={`font-heading font-semibold tracking-[0.3em] uppercase text-xs sm:text-sm mb-3 ${light ? 'text-gold-light' : 'text-[#e36393]'
                        }`}
                >
                    {eyebrow}
                </p>
            )}
            <h2 className={`font-display text-5xl sm:text-6xl ${light ? 'text-cream' : 'text-maroon'}`}>{title}</h2>
            <p className={`mt-3 tracking-[0.5em] ${light ? 'text-gold-light' : 'text-gold'}`}>❦ ✾ ❦</p>
        </motion.div>
    )
}

export default function Home() {
    const { t, w, couple, brideFirst } = useLang()
    // ?fa=fa1 → show that family's invitation list and hide "Our Story"
    const familyGroups = useFamilyInvite()
    const showStory = useShowStory()
    const [lightbox, setLightbox] = useState(null)

    // once the envelope opens, always start at the very top (the hero card) —
    // never at a remembered scroll position or a leftover #section
    useLayoutEffect(() => {
        if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname + window.location.search)
        }
        window.scrollTo({ top: 0, behavior: 'instant' })
    }, [])

    const families = [
        { icon: '❦', title: t('groomTitle'), text: t('groomText') },
        { icon: '✾', title: t('brideTitle'), text: t('brideText') },
    ]
    if (brideFirst) families.reverse()

    return (
        <div className="overflow-hidden">
            {/* ───────── Hero: the painted invitation card on a bougainvillea wall ───────── */}
            <section
                id={SECTIONS.home}
                className="relative min-h-[100svh] flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: `url(${IMAGES.logo1})` }}
            >
                <div className="absolute inset-0 bg-maroon-dark/55" />

                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                    className="relative w-full sm:w-[min(92vw,30rem)] min-h-[100svh] sm:min-h-0 sm:aspect-[736/1308] sm:max-h-[94svh] sm:my-6 sm:rounded-2xl sm:shadow-2xl overflow-hidden bg-cream bg-cover bg-center"
                    style={{ backgroundImage: `url(${IMAGES.handsBells})` }}
                >
                    {/* text sits in the cream space between the bells and the hands */}
                    <div className="absolute inset-x-0 top-[24%] bottom-[30%] flex flex-col items-center justify-center text-center px-8">
                        {/* Ganesh ji blesses the top of the card; multiply melts the white
                            background of the art into the cream card */}
                        <img
                            src={IMAGES.ganeshJi}
                            alt="श्री गणेश"
                            className="w-24 sm:w-28 h-auto mb-2 mix-blend-multiply"
                        />
                        <p className="font-devanagari font-semibold text-gold text-base sm:text-lg tracking-wide mb-3">
                            ॥ श्री गणेशाय नमः ॥
                        </p>
                        <p className="font-heading font-semibold tracking-[0.3em] uppercase text-[#e36393] text-[11px] sm:text-xs mb-2">
                            {t('heroTogether')}
                        </p>
                        <h1 className="font-display text-5xl sm:text-6xl text-maroon leading-tight">
                            {couple[0]}
                            <span className="block text-3xl sm:text-4xl text-gold my-1">&amp;</span>
                            {couple[1]}
                        </h1>
                        <p className="font-heading text-maroon-dark/80 text-base sm:text-lg mt-4 text-balance">
                            {t('heroRequest')}
                        </p>
                        <div className="mt-4 border-y border-gold/60 py-2 px-6">
                            <p className="font-heading font-bold text-maroon text-xl sm:text-2xl">{w.weddingDateDisplay}</p>
                            <p className="font-heading text-maroon-dark/70 text-sm sm:text-base">{w.city}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.a
                    href={`#${SECTIONS.families}`}
                    onClick={(e) => {
                        e.preventDefault()
                        document.getElementById(SECTIONS.families)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    aria-label={t('scrollDown')}
                    className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 text-maroon sm:text-cream text-3xl drop-shadow"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                >
                    ⌄
                </motion.a>
            </section>

            {/* ───────── Countdown ───────── */}
            <section className="bg-maroon py-10 px-5">
                <motion.div {...reveal} className="flex flex-col items-center gap-4">
                    <p className="font-heading tracking-[0.3em] uppercase text-gold-light text-xs sm:text-sm">
                        {t('countdownTitle')}
                    </p>
                    <Countdown target={w.weddingDateISO} />
                </motion.div>
            </section>

            {/* ───────── Families, beside the arches painting ───────── */}
            <section id={SECTIONS.families} className="bg-cream py-20 px-5 scroll-mt-16">
                <SectionTitle eyebrow={t('inviteTitle')} title={t('familiesTitle')} />
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                    <motion.img
                        {...reveal}
                        src={IMAGES.shrinathji}
                        alt=""
                        className="w-full max-w-[15rem] sm:max-w-xs md:max-w-md mx-auto rounded-t-[10rem] rounded-b-2xl shadow-2xl border-4 border-gold/40 object-cover"
                    />
                    <div className="flex flex-col gap-6">
                        <motion.p {...reveal} className="font-heading text-lg sm:text-xl text-maroon-dark/80 text-center md:text-left whitespace-pre-line">
                            {t('inviteText')}
                        </motion.p>
                        {families.map((f) => (
                            <motion.div
                                key={f.title}
                                {...reveal}
                                className="bg-blush/70 border border-gold/30 rounded-2xl p-6 text-center md:text-left"
                            >
                                <p className="text-gold text-2xl mb-1">{f.icon}</p>
                                <h3 className="font-heading text-2xl font-bold text-maroon mb-2">{f.title}</h3>
                                <p className="text-maroon-dark/75 whitespace-pre-line leading-relaxed">{f.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ───────── Our story (hidden unless showStory is on; always hidden on family links) ───────── */}
            {showStory && (
            <section id={SECTIONS.story} className="relative bg-blush py-20 px-5 scroll-mt-16">
                <SectionTitle eyebrow={t('storyEyebrow')} title={t('storyTitle')} />
                <div className="relative max-w-4xl mx-auto">
                    {/* centre line on desktop, left line on mobile */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gold/40 md:-translate-x-1/2" />
                    <div className="space-y-12">
                        {w.story.map((item, i) => (
                            <motion.div
                                key={`${item.year}-${item.title}`}
                                {...reveal}
                                className={`relative pl-12 md:pl-0 md:w-1/2 ${i % 2 ? 'md:ml-auto md:pl-12' : 'md:pr-12 md:text-right'}`}
                            >
                                <span
                                    className={`absolute top-2 left-[9px] w-4 h-4 rounded-full bg-gold border-4 border-blush shadow ${i % 2 ? 'md:-left-2' : 'md:left-auto md:-right-2'
                                        }`}
                                />
                                <div className="bg-cream rounded-2xl shadow-md p-6 border border-gold/20">
                                    <p className="font-heading text-gold font-bold tracking-widest mb-1">{item.year}</p>
                                    <h3 className="font-heading text-2xl text-maroon font-semibold mb-2">{item.title}</h3>
                                    <p className="text-maroon-dark/75 leading-relaxed">{item.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            )}

            {/* ───────── Events on the bougainvillea wall ───────── */}
            <section
                id={SECTIONS.events}
                className="relative py-20 px-5 bg-cover bg-center bg-fixed scroll-mt-16"
                style={{ backgroundImage: `url(${IMAGES.logo1})` }}
            >
                <div className="absolute inset-0 bg-maroon-dark/75" />
                <div className="relative max-w-6xl mx-auto">
                    <SectionTitle eyebrow={t('scheduleEyebrow')} title={t('scheduleTitle')} light />
                    <div className="flex flex-wrap justify-center gap-6">
                        {w.events.map((ev) => (
                            <motion.div
                                key={ev.name}
                                {...reveal}
                                className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] bg-cream/95 rounded-t-[5rem] rounded-b-2xl shadow-xl px-6 pt-10 pb-7 text-center border-2 border-gold/50 hover:-translate-y-1 transition-transform"
                            >
                                <p className="text-gold text-2xl mb-2">✿</p>
                                <h3 className="font-heading text-2xl font-bold text-maroon mb-2">{ev.name}</h3>
                                <p className="font-heading font-semibold text-[#e36393] mb-1">
                                    {/* either part may be blank — only put the dot between two real values */}
                                    {[ev.date, ev.time].filter(Boolean).join(' · ')}
                                </p>
                                <p className="text-sm text-maroon-dark/70 mb-3">{ev.venue}</p>
                                <p className="text-sm text-maroon-dark/80 leading-relaxed">{ev.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ───────── Family invitation list (only with ?family=…) on the arches painting ───────── */}
            {familyGroups && (
                <section
                    id={SECTIONS.family}
                    className="relative py-20 px-5 bg-cover bg-center scroll-mt-16"
                    style={{ backgroundImage: `url(${IMAGES.archesBirds})` }}
                >
                    <div className="absolute inset-0 bg-maroon-dark/70" />
                    <div className="relative max-w-6xl mx-auto">
                        <SectionTitle eyebrow={t('familyEyebrow')} title={t('familyTitle')} light />
                        <div className="flex flex-wrap justify-center gap-6">
                            {familyGroups.map((group) => (
                                <motion.div
                                    key={group.title}
                                    {...reveal}
                                    className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)] bg-cream/95 rounded-t-[5rem] rounded-b-2xl shadow-xl px-6 pt-10 pb-8 text-center border-2 border-gold/50"
                                >
                                    <p className="text-gold text-2xl mb-2">❦</p>
                                    <h3 className="font-heading text-2xl font-bold text-maroon mb-4">{group.title}</h3>
                                    <ul className="space-y-2">
                                        {group.names.map((name) => (
                                            <li key={name} className="font-heading text-lg text-maroon-dark/85 leading-snug">
                                                {name}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ───────── Venue over the ghat painting (hidden on /u3) ───────── */}
            {w.showVenue !== false && (
                <section
                    id={SECTIONS.venue}
                    className="relative min-h-[80svh] flex items-center justify-center px-5 py-24 bg-cover bg-center scroll-mt-16"
                    style={{ backgroundImage: `url(${IMAGES.ghatSunset})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-maroon-dark/30 via-maroon-dark/50 to-maroon-dark/80" />
                    <motion.div
                        {...reveal}
                        className="relative max-w-xl text-center bg-cream/90 backdrop-blur-sm rounded-2xl shadow-2xl px-8 py-10 border border-gold/50"
                    >
                        <p className="font-heading font-semibold tracking-[0.3em] uppercase text-[#e36393] text-xs sm:text-sm mb-3">
                            {t('venueEyebrow')}
                        </p>
                        <h2 className="font-display text-4xl sm:text-5xl text-maroon mb-3">{w.venue}</h2>
                        <p className="font-heading text-lg text-maroon-dark/80 mb-1">{w.weddingDateDisplay}</p>
                        <p className="text-maroon-dark/70 mb-6">{w.street} {w.address}</p>
                        <a
                            href={w.mapsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block px-7 py-3 rounded-full bg-maroon text-cream font-heading font-semibold text-lg hover:bg-maroon-dark transition-colors shadow-lg"
                        >
                            {t('mapsCta')}
                        </a>
                    </motion.div>
                </section>
            )}

            {/* ───────── Gallery ───────── */}
            <section id={SECTIONS.gallery} className="bg-cream py-20 px-5 scroll-mt-16">
                <SectionTitle eyebrow={t('galleryEyebrow')} title={t('galleryTitle')} />
                <div className="max-w-6xl mx-auto columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4">
                    {w.gallery.map((src, i) => (
                        <motion.button
                            key={src}
                            type="button"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                            onClick={() => setLightbox(src)}
                            className="block w-full mb-3 sm:mb-4 overflow-hidden rounded-xl shadow-md group break-inside-avoid"
                        >
                            <img
                                src={src}
                                alt=""
                                loading="lazy"
                                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                            />
                        </motion.button>
                    ))}
                </div>
            </section>

            <Footer />

            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4"
                        onClick={() => setLightbox(null)}
                    >
                        <motion.img
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            src={lightbox}
                            alt=""
                            className="max-w-full max-h-full rounded-lg shadow-2xl"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
