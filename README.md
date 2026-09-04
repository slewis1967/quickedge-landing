# QuickEdge — one‑page marketing site

Production‑quality static landing for QuickEdge (AU SMB AI ops / automation setup service).

No custom domains, DNS, ads, or analytics configured. Staging only. Uses zero build tooling — just HTML/CSS/JS.

## Run locally

- Option A — open `index.html` directly in a browser.
- Option B — serve with Python (recommended for anchor/history):

```bash
cd /path/to/repo
python3 -m http.server 5173
# visit http://localhost:5173
```

## Information architecture

Single page with the following sections:
- Nav: Logo · How it works · Packages · For licensed practices · Enquire
- Hero with CTAs
- Trust pack
- Three jobs
- How it works
- Packages and Add‑ons (AU$ GST excl.)
- Licensed practices
- Proof/process
- FAQ
- CTA: Partner intro / enquiry (`mailto:hello@[ENTITY].com.au`)

## Content constraints (hard)

- Promise: people still hit send and still sign; software installs chase, inbox sort, Monday numbers, paper trail.
- Licensed: “Your valuer still signs; the software just chases files, drafts, and keeps a paper trail.”
- NEVER: AI valuations, AI signs off, replace your valuer, automated opinion, founder‑hero, ASIC, personal names.
- Placeholders: `[ENTITY]` and `[PRACTISING OPERATOR]`. No founder identity.

## Tech

- Static HTML + CSS + a small JS (`script.js`) for smooth scroll and mobile nav
- Mobile‑first, accessible (skip link, semantic landmarks, `details/summary` for FAQ)
- No external fonts or third‑party scripts

