import { useSearchParams } from 'react-router-dom'
import { useLang } from './LanguageContext'

/**
 * The family invitation list for this link, from ?family=<key> (e.g. ?family=family1),
 * or null when the link has no family / an unknown one.
 * A family link shows the family list and hides "Our Story".
 */
export function useFamilyInvite() {
    const { w } = useLang()
    const [searchParams] = useSearchParams()
    const key = searchParams.get('family')?.trim().toLowerCase()
    return (key && w.familyInvites?.[key]) || null
}

/** Whether "Our Story" is shown: switched on in weddingConfig (showStory) and not a family link. */
export function useShowStory() {
    const { w } = useLang()
    const familyGroups = useFamilyInvite()
    return Boolean(w.showStory) && !familyGroups
}
