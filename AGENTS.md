# AGENTS.md

## What this is

A single-page marketing/ordering site for KUNMUN Medical Hall, a pharmacy. Static HTML/CSS/JS, no framework, no build step, deployed as-is to Netlify.

## Layout

- `index.html` — the entire page, split into sections by `id` (`#home`, `#services`, `#medicines`, `#prescription`, `#consultation`, `#contact`)
- `style.css` — single global stylesheet, mobile breakpoints at 850px and 520px at the bottom of the file
- `script.js` — catalog data + rendering, cart (persisted to `localStorage`), form submission handlers
- `assets/kunmun-logo.png` — logo, used as favicon and in the header/hero

## Forms

`#prescriptionForm` and `#consultForm` in `index.html` are real Netlify Forms (`data-netlify="true"`, unique `name`, hidden `form-name`, honeypot field). `script.js` submits them via `fetch` (multipart for the prescription file upload, urlencoded for the consultation form) so the request is stored in Netlify and visible in the site's Forms dashboard, then opens a pre-filled WhatsApp link so the store can confirm directly with the customer. When editing these forms, keep the static `<form>` markup in `index.html` as-is (Netlify detects forms by parsing the built HTML) and keep field `name` attributes in sync with what `script.js` reads.

## Catalog / cart

The product list in `script.js` (`products` array) is demo data — categories and indicative prices only, not real inventory. The cart is client-side only (`localStorage`), used to build a WhatsApp order message; there is no payment or order backend.

## Conventions

- No CSS framework or preprocessor; styles are plain CSS in one file, minified/compact by convention (not deliberately obfuscated — just written densely).
- No build tooling: deploy is the raw files at the project root.
- Keep the WhatsApp number (currently `918249357903`) consistent across `index.html` and `script.js` if it ever changes.

## If this grows further

Real inventory, payments, prescriptions with pharmacist review, or customer accounts would need a proper backend — use a Netlify Database (Postgres via Drizzle, see the `netlify-database` skill) for persistent data rather than expanding the client-side `products` array or `localStorage` cart.
