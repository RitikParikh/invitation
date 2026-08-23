import { createContext, useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { strings } from './strings'
import { getWedding } from '../weddingConfig'
import { useNameOrder, VARIANT_PARAM } from './nameOrder'

const PARAM = 'language'
const DEFAULT_LANG = 'en'

// ?language=hn → Devanagari, ?language=en → English. A few spellings are accepted,
// anything unrecognized is ignored so a typo falls back instead of breaking the page.
const PARAM_TO_LANG = {
    hn: 'hi',
    hi: 'hi',
    hin: 'hi',
    hindi: 'hi',
    dev: 'hi',
    devanagari: 'hi',
    en: 'en',
    eng: 'en',
    english: 'en',
}

const LANG_TO_PARAM = { hi: 'hn', en: 'en' }

const parseParam = (value) => PARAM_TO_LANG[value?.trim().toLowerCase()] ?? null

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const { brideFirst, variant } = useNameOrder()

    // The URL is the only source of truth — no mirrored state, so there is nothing
    // for the URL and the app to disagree about and no re-render loop to fall into.
    const lang = parseParam(searchParams.get(PARAM)) ?? DEFAULT_LANG

    // drives the Devanagari font swap in index.css
    useEffect(() => {
        document.documentElement.lang = lang
    }, [lang])

    const paramsWith = (next) => {
        const params = new URLSearchParams(searchParams)
        params.set(PARAM, LANG_TO_PARAM[next])
        // keep the bride-first choice alive on pages whose path can't carry it
        if (variant) params.set(VARIANT_PARAM, variant)
        else params.delete(VARIANT_PARAM)
        return params
    }

    // the switch only edits the URL; the page re-renders off the new value
    const setLang = (next) => {
        if (next !== 'hi' && next !== 'en') return
        setSearchParams(paramsWith(next), { replace: true })
    }

    // router <Link>s drop the query string, so internal links carry it along
    const linkTo = (pathname) => ({ pathname, search: `?${paramsWith(lang)}` })

    const w = getWedding(lang)

    const value = {
        lang,
        brideFirst,
        // the couple's names in the order this guest should see them
        couple: brideFirst ? [w.brideFirst, w.groomFirst] : [w.groomFirst, w.brideFirst],
        setLang,
        toggle: () => setLang(lang === 'en' ? 'hi' : 'en'),
        t: (key) => strings[lang]?.[key] ?? strings.en[key] ?? key,
        w,
        linkTo,
    }

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLang = () => useContext(LanguageContext)
