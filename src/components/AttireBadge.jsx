import { useLang } from '../lib/LanguageContext'

// '#79c4f0' / '#79c4f0ff' / '#7cf' → 'rgba(r, g, b, alpha)'; anything else → null
function tint(hex, alpha) {
    let h = hex?.trim().replace('#', '') ?? ''
    if (h.length === 3 || h.length === 4) h = [...h.slice(0, 3)].map((c) => c + c).join('')
    if (!/^[0-9a-f]{6}/i.test(h)) return null
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16))
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/**
 * Dress-code pill for an event card, from the event's `attire` text and `badge_color`
 * (set in weddingConfig.js / weddingConfigU2.js). Shows nothing when the event has no attire.
 */
export default function AttireBadge({ attire, color }) {
    const { t } = useLang()
    if (!attire) return null

    const solid = tint(color, 1) ?? '#c9a227'
    return (
        <div className="mt-4 flex justify-center">
            <span
                className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-heading font-semibold text-maroon-dark"
                style={{ backgroundColor: tint(color, 0.25) ?? 'rgba(201, 162, 39, 0.15)', borderColor: solid }}
            >
                <span
                    className="inline-block w-3.5 h-3.5 shrink-0 rounded-full border border-maroon-dark/20"
                    style={{ backgroundColor: solid }}
                    aria-hidden="true"
                />
                <span>
                    {t('attireLabel')}: {attire}
                </span>
            </span>
        </div>
    )
}
