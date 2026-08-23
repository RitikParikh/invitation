import { matchPath, useLocation, useSearchParams } from 'react-router-dom'
import { ROUTES } from './routes'

// /invitation/u2 puts the bride first — for the bride's side of the guest list.
// Anything else (including plain /invitation) keeps the groom first.
export const BRIDE_FIRST_VARIANT = 'u2'

// the same choice as a query param, so it survives on /our-story and /gallery
// where the path can't carry it
export const VARIANT_PARAM = 'u'

export function useNameOrder() {
    const { pathname } = useLocation()
    const [searchParams] = useSearchParams()

    const fromPath = matchPath(`${ROUTES.invitation}/:variant`, pathname)?.params?.variant
    const raw = (fromPath ?? searchParams.get(VARIANT_PARAM) ?? '').trim().toLowerCase()
    const brideFirst = raw === BRIDE_FIRST_VARIANT

    return { brideFirst, variant: brideFirst ? BRIDE_FIRST_VARIANT : null }
}
