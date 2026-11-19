import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Full https:// address of the live site, used in the WhatsApp/social link-preview tags in
// index.html. On Vercel it is picked up automatically from the project's production domain;
// set SITE_URL in Vercel's environment variables to override it (e.g. for a custom domain).
const siteUrl = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
).replace(/\/$/, '')

const siteUrlInHtml = {
  name: 'site-url-in-html',
  transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl),
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), siteUrlInHtml],
  server: {
    allowedHosts: ['3339-2409-40d4-100d-8f09-a5a5-10f5-675c-92cb.ngrok-free.app']
  }
})
