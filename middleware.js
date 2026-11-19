// Vercel Routing Middleware: gives each shared link its own WhatsApp / social preview.
//
// WhatsApp, Instagram, iMessage etc. read the <meta> tags straight from the HTML and never
// run the React app, so the preview has to be chosen here, before the page is sent:
//   ?language=hn       → Hindi card (रितिक & रश्मि)
//   /u2  or  ?u=u2     → bride first (Rashmi & Ritik)
// The cards are public/og-<en|hi>[-u2].jpg. Keep the names / date below in step with weddingConfig.js.

export const config = {
    // pages only — skip files (/assets/*.js, /og-en.jpg, /index.html …)
    matcher: '/((?!.*\\.).*)',
}

// same spellings the app accepts (src/lib/LanguageContext.jsx)
const HINDI = new Set(['hn', 'hi', 'hin', 'hindi', 'dev', 'devanagari'])

const TEXT = {
    en: {
        names: ['Ritik', 'Rashmi'],
        title: (a, b) => `${a} & ${b} | #Mithik`,
        description: 'You are invited to our wedding · 11th December 2026 · Udaipur, Rajasthan',
        alt: (a, b) => `${a} & ${b} wedding invitation, 11th December 2026, Udaipur`,
    },
    hi: {
        names: ['रितिक', 'रश्मि'],
        title: (a, b) => `${a} & ${b} | शुभ विवाह`,
        description: 'विवाह समारोह में आप सादर आमंत्रित हैं · 11 दिसंबर 2026 · उदयपुर, राजस्थान',
        alt: (a, b) => `${a} & ${b} विवाह निमंत्रण, 11 दिसंबर 2026, उदयपुर`,
    },
}

const escape = (s) =>
    s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function previewTags(url) {
    const lang = HINDI.has(url.searchParams.get('language')?.trim().toLowerCase()) ? 'hi' : 'en'
    const lastSegment = url.pathname.split('/').filter(Boolean).pop()?.trim().toLowerCase()
    const brideFirst = lastSegment === 'u2' || url.searchParams.get('u')?.trim().toLowerCase() === 'u2'

    const t = TEXT[lang]
    const [a, b] = brideFirst ? [t.names[1], t.names[0]] : t.names
    const title = escape(t.title(a, b))
    const description = escape(t.description)
    const alt = escape(t.alt(a, b))
    const image = `${url.origin}/og-${lang}${brideFirst ? '-u2' : ''}.jpg`
    const pageUrl = escape(url.href)

    return `<title>${title}</title>
  <meta name="description" content="${description}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${escape(`${a} & ${b}`)}" />
  <meta property="og:locale" content="${lang === 'hi' ? 'hi_IN' : 'en_IN'}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:image:secure_url" content="${image}" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${alt}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="${image}" />`
}

const BLOCK = /<!-- share-preview:start[\s\S]*?<!-- share-preview:end -->/

export default async function middleware(request) {
    try {
        const url = new URL(request.url)
        const res = await fetch(new URL('/index.html', url))
        if (!res.ok) return // let Vercel serve the page as usual

        const html = await res.text()
        if (!BLOCK.test(html)) return

        return new Response(html.replace(BLOCK, previewTags(url)), {
            headers: {
                'content-type': 'text/html; charset=utf-8',
                'cache-control': 'public, max-age=0, must-revalidate',
            },
        })
    } catch {
        // never let the preview break the site — fall back to the plain page
        return
    }
}
