# KUNMUN Medical Hall

Website for KUNMUN Medical Hall, a pharmacy near Simula Hospital in Markona, Balasore, Odisha. It presents the store's services, lets visitors browse a medicine catalog, request a doctor consultation, and send a prescription for review — with quick call and WhatsApp ordering throughout.

## Technology

Plain HTML, CSS and JavaScript — no framework or build step. Form submissions (prescription requests and consultation bookings) are handled by Netlify Forms, so every request is saved and visible in the Netlify dashboard, in addition to opening a pre-filled WhatsApp message for the store to confirm.

## Running locally

Open `index.html` directly in a browser, or serve the folder with the Netlify CLI for full feature parity (including working forms):

```bash
netlify dev
```

## Structure

- `index.html` — the single page: hero, services, medicine catalog, prescription form, consultation form, contact/map
- `style.css` — all styling
- `script.js` — catalog search/filter, cart (stored in the browser), and form submission logic
- `assets/kunmun-logo.png` — store logo

## Notes

The medicine catalog and cart are a front-end demonstration; actual pricing and availability should be confirmed with the pharmacy. Real inventory, payments, and customer accounts would require adding a database and secure backend logic.
