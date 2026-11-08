// One place to change a path — App's routes, the navbar and the reveal gate all read these.
export const ROUTES = {
    invitation: '/invitation',
    story: '/our-story',
    gallery: '/gallery',
}

// /invitation and /invitation/<variant> are both the invitation page
export const isInvitationPath = (pathname) =>
    pathname === ROUTES.invitation || pathname.startsWith(`${ROUTES.invitation}/`)

// section ids on the single scrolling page — the navbar links to these
export const SECTIONS = {
    home: 'home',
    families: 'families',
    story: 'story',
    events: 'events',
    family: 'family',
    venue: 'venue',
    gallery: 'gallery',
}
