import { useLang } from '../lib/LanguageContext'

const options = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'हिं' },
]

export default function LangSwitch() {
    const { lang, setLang, t } = useLang()

    return (
        <div
            role="group"
            aria-label={t('langSwitchLabel')}
            className="flex items-center rounded-full border border-gold/60 bg-cream/70 p-0.5 backdrop-blur-sm"
        >
            {options.map((o) => (
                <button
                    key={o.code}
                    type="button"
                    onClick={() => setLang(o.code)}
                    aria-pressed={lang === o.code}
                    className={`px-3 py-1 rounded-full text-xs sm:text-sm font-heading font-semibold transition-colors ${lang === o.code
                        ? 'bg-maroon text-cream'
                        : 'text-maroon-dark/70 hover:text-maroon'
                        }`}
                >
                    {o.label}
                </button>
            ))}
        </div>
    )
}
