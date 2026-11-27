import { useLocation, useSearchParams } from 'react-router-dom'

// /u2 or /invitation/u2 (u2 as the last part of the path) puts the bride first — for the bride's side of the guest list.
// /u3 is the same bride's-side invitation with fewer events and no venue section (see weddingConfigU2.js).
// Anything else (including plain /invitation) keeps the groom first.
export const BRIDE_FIRST_VARIANT = 'u2'
const BRIDE_SIDE_VARIANTS = ['u2', 'u3']

// the same choice as a query param, so it survives on /our-story and /gallery
// where the path can't carry it
export const VARIANT_PARAM = 'u'

export function useNameOrder() {
    const { pathname } = useLocation()
    const [searchParams] = useSearchParams()

    const lastSegment = pathname.split('/').filter(Boolean).pop()?.trim().toLowerCase()
    const fromQuery = searchParams.get(VARIANT_PARAM)?.trim().toLowerCase()
    const variant = [lastSegment, fromQuery].find((v) => BRIDE_SIDE_VARIANTS.includes(v)) ?? null

    return { brideFirst: Boolean(variant), variant }
}
