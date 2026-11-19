import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../lib/LanguageContext'
import LangSwitch from './LangSwitch'
import { SECTIONS } from '../lib/routes'
import { useShowStory } from '../lib/familyInvite'

const allLinks = [
  { id: SECTIONS.families, key: 'familiesTitle' },
  { id: SECTIONS.story, key: 'navStory' },
  { id: SECTIONS.events, key: 'navEvents' },
  { id: SECTIONS.venue, key: 'navVenue' },
  { id: SECTIONS.gallery, key: 'navGallery' },
]

// smooth-scroll to a section without leaving a #hash in the URL,
// so a reload always opens at the top of the page
const scrollToSection = (e, id) => {
  e.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t, couple } = useLang()
  // family links have no "Our Story" section, so drop its menu link too
  // drop the Our Story link whenever that section is hidden
  const links = useShowStory() ? allLinks : allLinks.filter((l) => l.id !== SECTIONS.story)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || open

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${solid ? 'bg-cream/95 shadow-md backdrop-blur-sm' : 'bg-transparent'
        }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-8 py-3">
        <a
          href={`#${SECTIONS.home}`}
          onClick={(e) => scrollToSection(e, SECTIONS.home)}
          className={`font-display text-2xl sm:text-3xl transition-opacity ${solid ? 'text-maroon opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          {couple[0]} &amp; {couple[1]}
        </a>

        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="hidden md:flex items-center gap-7 font-heading text-lg">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => scrollToSection(e, l.id)}
                className={`transition-colors hover:text-gold ${solid ? 'text-maroon-dark' : 'text-cream drop-shadow'}`}
              >
                {t(l.key)}
              </a>
            ))}
          </nav>

          <LangSwitch />

          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-9 h-9 rounded-full bg-cream/80"
            onClick={() => setOpen((o) => !o)}
          >
            <span className={`block h-0.5 w-5 bg-maroon transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-5 bg-maroon transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-5 bg-maroon transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          // fade/slide only — animating height:'auto' makes framer-motion measure the
          // layout and snap window.scrollY back, which cancelled the scroll to a section
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-cream border-t border-gold/30 shadow-md"
          >
            <div className="flex flex-col items-center gap-5 py-6 font-heading text-lg">
              {links.map((l) => (
                <a key={l.id} href={`#${l.id}`} onClick={(e) => {
                  scrollToSection(e, l.id)
                  setOpen(false)
                }} className="text-maroon-dark hover:text-gold">
                  {t(l.key)}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
