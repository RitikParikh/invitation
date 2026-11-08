import { useLocation, useSearchParams } from 'react-router-dom'

// /u2 or /invitation/u2 (u2 as the last part of the path) puts the bride first — for the bride's side of the guest list.
// Anything else (including plain /invitation) keeps the groom first.
export const BRIDE_FIRST_VARIANT = 'u2'

// the same choice as a query param, so it survives on /our-story and /gallery
// where the path can't carry it
export const VARIANT_PARAM = 'u'

export function useNameOrder() {
    const { pathname } = useLocation()
    const [searchParams] = useSearchParams()

    const lastSegment = pathname.split('/').filter(Boolean).pop()?.trim().toLowerCase()
    const fromQuery = searchParams.get(VARIANT_PARAM)?.trim().toLowerCase()
    const brideFirst = lastSegment === BRIDE_FIRST_VARIANT || fromQuery === BRIDE_FIRST_VARIANT

    return { brideFirst, variant: brideFirst ? BRIDE_FIRST_VARIANT : null }
}
