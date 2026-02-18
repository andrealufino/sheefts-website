# Sheefts Website — Site Strategy

## Positioning

**Sheefts is the shift management app for Italian workers.**

Not a generic calendar. Not a complex team scheduler. A personal, private, beautiful tool that solves the one specific problem Italian shift workers face every week: keeping track of their own schedule without friction.

The positioning is tight: personal shift tracking, iPhone-native, iCloud-synced, no account required. The website communicates this before anything else.

---

## Target Audience

**Primary**: Italian shift workers in healthcare (nurses, doctors, technicians), retail (store staff, cashiers), manufacturing (factory operators), hospitality (hotel staff, waiters, baristas).

**Profile**: 25–50 years old. Uses iPhone daily. Receives their schedule as a WhatsApp message, a PDF, or a photo of a handwritten wall chart. Writes it on a piece of paper or remembers it by heart. Knows there is a better way but hasn't found the right app.

**Pain point**: Existing calendar apps are too generic (Google Calendar, Apple Calendar), shift management apps are too complex or require accounts and team features they don't need. They want something simple, private, and Italian.

---

## SEO Strategy

### Target keywords (Italian)

- `app turni lavoro`
- `gestione turni lavoro iphone`
- `calendario turni lavoro`
- `app orari di lavoro`
- `app per infermieri turni`
- `organizzare turni iphone`

### On-page signals

- `<title>`: keyword-first, descriptive. "Sheefts — Gestisci i tuoi turni di lavoro | App per iPhone"
- Meta description: benefit-driven, includes primary keywords naturally
- H1: "I tuoi turni. Sempre sotto controllo." (brand voice, not keyword-stuffed)
- Semantic HTML structure: `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`
- Canonical: `https://sheefts.com` (apex domain, no www)
- Language: `lang="it"` on `<html>`

### Structured data

JSON-LD `SoftwareApplication` schema:
- `name`: Sheefts
- `operatingSystem`: iOS
- `applicationCategory`: UtilitiesApplication
- `offers.price`: 0 (free app)
- `aggregateRating` to be added when reviews are available

### Open Graph / Social

- `og:locale`: `it_IT`
- `og:type`: website
- `og:image`: `/og-image.png` (1200×630, hero section screenshot)
- Twitter Card: `summary_large_image`

### Technical SEO

- Single-page site: minimal crawl complexity
- `privacy.html` marked `noindex` (canonical already excluded)
- `sitemap.xml` at apex with `<priority>1.0</priority>`
- HTTPS enforced via Cloudflare (HSTS header in `_headers`)
- No JavaScript-rendered content: all text is in the HTML source

### AI crawlers

Crawlers that may use content for AI training are blocked. Live browsing (for assistants answering user questions) is allowed. See `robots.txt` for specifics.

---

## Design Rationale

### Why this aesthetic

The site targets iPhone users who are already Apple customers. They know what Apple product pages look like. The Sheefts site borrows the same visual DNA — large fluid typography, generous whitespace, careful component spacing, smooth scroll animations — without copying it. The result feels premium and trustworthy without being derivative.

### Consumer Product Family

Sheefts follows the AML Brand Guidelines Consumer Product Family rules:
- Display font: **Outfit** (weight 600–800 for headlines)
- Body font: **DM Sans** (weight 300–400, slightly warm, approachable)
- Mono font: **JetBrains Mono** (labels, section tags, metadata)
- All fonts self-hosted as variable woff2 — no Google Fonts, no CDN

### Accent color

**`#2CB04F`** — Sheefts green. Used sparingly: CTAs, hover states, mockup UI elements, subtle gradients behind the hero mockup. No gold (`#BC9F73`). No purple. No other accent colors.

This green appears in:
- The App Store download button (primary CTA)
- Shift blocks in the CSS-rendered calendar mockup
- Stat card highlights in the dashboard mockup
- The "Sheefts Ultra" teaser section border treatment
- The final CTA section background gradient (very low opacity)

### Typography rules

- No all-caps anywhere
- Section labels: JetBrains Mono, 12–13px, `--text-muted`, lowercase
- Headlines: Outfit, fluid clamp sizes
- Body: DM Sans 300, 17px, 1.7 line-height
- Letter-spacing: tightened on headlines (−0.03em to −0.02em), normal on body

### Animations

All animations use `cubic-bezier(0.16, 1, 0.3, 1)` — a spring-like easing that overshoots slightly then settles. This single curve unifies every transition on the site.

- Hero entrance: text fades up (80ms delay stagger), iPhone mockup floats from 60px below
- Scroll reveals: `.reveal`, `.reveal-left`, `.reveal-right` via `IntersectionObserver`
- Sticky nav: instant class switch, frosted glass fades in via CSS transition
- All animations disabled at `@media (prefers-reduced-motion: reduce)`

### No-dependency stack

- Zero npm packages
- Zero external JS or CSS libraries
- Zero CDN dependencies (fonts, icons, everything is local)
- Single `<script src="/main.js">` at end of body

---

## Content Tone

**Confident, direct, benefit-first.** Not hype, not corporate, not startup. Italian shift workers are practical people — they need to see the value in the first five seconds.

Rules:
- Lead with the benefit, not the feature
- Short sentences. Two, three words per line in headlines where it reads well.
- No exclamation marks except in obvious emotional moments
- No startup buzzwords (innovativo, rivoluzionario, smart, ecosistema)
- Italian that sounds like a person wrote it, not translated English

Examples:
- "I tuoi turni. Sempre sotto controllo." — strong H1, rhythm in two beats
- "Smetti di fotografare il foglio appeso in bacheca." — narrative, specific, immediately recognizable
- "Due tap e il turno è inserito." — direct, time-saving focus
- "Provalo. È gratuito." — CTA that removes hesitation

---

## Future Roadmap

### Short term (next 3 months)

- Replace CSS mockups with real Simulator screenshots
  - Export from Xcode Simulator at 390×844 (iPhone 15) or 430×932 (iPhone 15 Plus)
  - Use transparent PNG, drop into the existing iPhone CSS frames
- Add real App Store review quotes when available
- Add aggregate rating to JSON-LD when reviews accumulate

### Medium term (6–12 months)

- English-language version (`/en/` or apex domain redirect based on `Accept-Language`)
- Sheefts Ultra dedicated launch page (with waitlist or release notes)
- Potential blog section for shift work tips (SEO long-tail)

### Long term

- Real screenshots replace CSS mockups across all sections
- Video hero (Simulator recording exported as silent autoplaying mp4)
- Potential widget gallery page showing all supported widget sizes

---

## Deployment

Hosted on **Cloudflare Pages**.

- Publish directory: `public/`
- Custom domain: `sheefts.com` (apex)
- DNS managed by Cloudflare
- HTTPS: automatic via Cloudflare (HSTS enforced in `_headers`)
- No build step: static files served directly
- Cache: Cloudflare CDN handles edge caching globally

**Deploy process**: push to `main` branch → Cloudflare Pages auto-deploys.

Repository: `https://github.com/andrealufino/sheefts-website`
