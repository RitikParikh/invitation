import { motion } from 'framer-motion'

/** Floating round button that stops / restarts the background music. */
export default function MusicToggle({ playing, onToggle }) {
    return (
        <motion.button
            type="button"
            onClick={onToggle}
            aria-label={playing ? 'Stop music' : 'Play music'}
            aria-pressed={playing}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-5 right-5 z-40 w-12 h-12 rounded-full bg-maroon text-gold-light border-2 border-gold shadow-xl flex items-center justify-center"
        >
            {playing ? (
                // animated equalizer bars while the music plays
                <span className="flex items-end gap-[3px] h-5" aria-hidden="true">
                    {[0, 0.2, 0.4, 0.1].map((delay, i) => (
                        <motion.span
                            key={i}
                            className="w-[3px] bg-gold-light rounded-full"
                            animate={{ height: ['30%', '100%', '45%', '80%', '30%'] }}
                            transition={{ duration: 1.1, repeat: Infinity, delay, ease: 'easeInOut' }}
                        />
                    ))}
                </span>
            ) : (
                // music note with a slash — tap to play again
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M9 18V5l11-2v13" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="17" cy="16" r="3" />
                    <path d="M3 3l18 18" strokeLinecap="round" />
                </svg>
            )}
        </motion.button>
    )
}
