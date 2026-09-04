# QuickEdge — one‑page marketing site

Static, mobile‑first landing page for QuickEdge (AU SMB ops / automation setup).

## Run locally

- Option 1: open `index.html` directly in your browser.
- Option 2: serve with a simple HTTP server (recommended for smooth scrolling and assets):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

No build or runtime dependencies are required.

## Structure

- `index.html` — single page with all sections
- `styles.css` — modern, minimal styling (no frameworks)
- `script.js` — tiny enhancements (mobile nav, current year)

## Content guardrails

- Promise: people still hit send and still sign; we install chase, inbox sort, Monday numbers, paper trail.
- Licensed line: “Your valuer still signs; the software just chases files, drafts, and keeps a paper trail.”
- Placeholders only: `[ENTITY]`, `[PRACTISING OPERATOR]`.
- Prices are AU$ and GST exclusive as shown.
- Never include: AI valuations, AI signs off, founder bio/photo/name, ASIC, Springboard, NextKey.

