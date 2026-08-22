# Ritik & Rashmi — Wedding Invitation Website

A 3-page React + Tailwind CSS wedding invitation site with a scratch-to-reveal hero.

## Run it

```bash
npm install
npm run dev
```

Open the printed localhost URL. To build for production: `npm run build` (output in `dist/`).

## Pages

- **Home (`/`)** — full-screen scratch card. A marigold pattern covers the hero; scratching it (mouse drag or finger drag on mobile) reveals the couple's names, a live countdown to the wedding, and the date/venue.
- **Our Story (`/our-story`)** — couple timeline + full celebration schedule (Haldi, Mehndi, Sangeet, Wedding, Reception) + venue/map link.
- **RSVP & Gallery (`/rsvp`)** — RSVP form (name, attending yes/no, guest count, which events, message) and a photo gallery with a lightbox.

## Personalize it

Edit **`src/weddingConfig.js`** — everything content-specific lives there: names, wedding date, venue, event schedule, love story timeline, gallery image URLs, contact info. No need to touch component code.

To use your own photos, replace the URLs in the `gallery` array with your own image paths (e.g. drop files in `src/assets/` and import them, or host them and paste the URL).

## RSVP submissions

The RSVP form currently just logs to the console and shows a thank-you message — there's no backend yet. To actually collect responses, wire `handleSubmit` in `src/pages/RSVP.jsx` to a form service like Formspree/EmailJS/Getform, or your own API endpoint.

## Tech

React 19, Vite, Tailwind CSS v4, Framer Motion, React Router. Fonts: Great Vibes (script), Cormorant Garamond (headings), Poppins (body) via Google Fonts.

## Deploy

Any static host works (Vercel, Netlify, GitHub Pages): run `npm run build` and deploy the `dist/` folder.
