// One place to change a path — App's routes, the navbar and the reveal gate all read these.
export const ROUTES = {
    invitation: '/invitation',
    story: '/our-story',
    gallery: '/gallery',
}

// /invitation and /invitation/<variant> are both the invitation page
export const isInvitationPath = (pathname) =>
    pathname === ROUTES.invitation || pathname.startsWith(`${ROUTES.invitation}/`)
