# Sheefts Website

Single-page product landing page for Sheefts, the iOS shift management app. Italian primary market. Hosted on Cloudflare Pages with custom domain `sheefts.com`.

## Project structure

```
public/                        — Cloudflare Pages publish directory
  index.html                   — single-page site (Italian)
  privacy.html                 — privacy policy page
  style.css                    — full design system
  main.js                      — interactions, animations, theme toggle
  fonts/
    outfit.woff2               — variable, weight 600-800
    dmsans.woff2               — variable, weight 300-500
    jetbrainsmono.woff2        — variable, weight 400-500
  img/
    app-icon.png               — Sheefts app icon, 1024x1024
  favicon.ico                  — 32x32
  favicon-16x16.png
  favicon-32x32.png
  favicon-192x192.png
  favicon-512x512.png
  apple-touch-icon.png         — 180x180
  og-image.png                 — 1200x630, Open Graph image
  _headers                     — Cloudflare security headers (CSP, HSTS)
  robots.txt                   — crawler policy (AI training blocked)
  sitemap.xml                  — single URL sitemap
CLAUDE.md                      — project instructions (not published)
docs/
  SITE-STRATEGY.md             — positioning, SEO, design rationale
```

## Tech stack

- Pure HTML/CSS/JS — no build tools, no frameworks, no npm
- Self-hosted variable fonts (woff2): Outfit 600-800, DM Sans 300-500, JetBrains Mono 400-500
- Font preload hints for optimal loading
- CSS custom properties for light/dark theming
- Vanilla JS: IntersectionObserver for scroll reveals, rAF-throttled scroll for nav, hero entrance animations
- Cloudflare Pages: publish directory is `public/`

## Design rules — do not break

- **No emoji anywhere.** Copy and labels are text only.
- **Accent: `#2CB04F`** — Sheefts green. Used in max 8-10 strategic places (CTAs, shift blocks, highlights). Do not add more uses.
- **No gold `#BC9F73` anywhere.** That hex is reserved for andrealufino.com only.
- **Light mode is default.** Dark mode via `.dark` class on `<html>`. Toggle persists to localStorage.
- **Fonts: never all-caps.** Labels use lowercase JetBrains Mono. No text-transform: uppercase.
- **Section labels** (`section__label`) use `--text-muted`, never the accent color.
- **Animation easing:** `cubic-bezier(0.16, 1, 0.3, 1)` for all reveals.
- **Reveal system:** `.reveal`, `.reveal-left`, `.reveal-right` — JS adds `.revealed` via IntersectionObserver.
- **Hero animations** triggered by `hero-loaded` class added by JS on DOMContentLoaded.
- **Nav:** adds `.scrolled` class at scrollY > 50px → frosted glass (backdrop-filter: blur(20px)).
- **No external dependencies.** No CDN, no Google Fonts, no external JS.
- **prefers-reduced-motion:** all transitions/animations disabled when set.

## Brand reference

- **AML Brand Guidelines:** `/Users/aml/Library/CloudStorage/Dropbox/documenti/aml/brand/aml-brand-guidelines.md`
- Sheefts belongs to the **Consumer Product Family** (Section 9)
- Inherits: Outfit/DM Sans/JetBrains Mono, quality standards, no emoji, footer attribution
- Does NOT inherit: gold accent, parent site layout

## App resources

- **App icon source:** `/Users/aml/developer/iOS/personal/apps/sheefts/Sheefts/Resources/Assets/Assets.xcassets/AppIcon.appiconset/ios-marketing.png`
- **App Store URL:** `https://apps.apple.com/app/id1448064158`
- **Xcode project:** `/Users/aml/developer/iOS/personal/apps/sheefts`

## Local testing

**Never open `index.html` directly** (double-click / `file://`). All paths are absolute (`/style.css`, `/main.js`, `/fonts/*`) and will fail to resolve from the filesystem root.

Run a local web server from the `public/` directory:

```bash
cd public && python3 -m http.server 8080
# then open http://localhost:8080
```

Note: content below the hero starts at `opacity: 0` and animates in on scroll (IntersectionObserver). Scroll through the page to see all sections.

## Deploy

```bash
git add -A && git commit -m "description" && git push
```

Cloudflare Pages publish directory is `public/`. Cloudflare Pages automatically picks up the `_headers` file. Domain setup is handled separately in Cloudflare dashboard.

## Editing guidelines

- Test both light and dark themes after CSS changes
- Mobile-first: check 375px, 640px, 968px, 1440px breakpoints
- Verify no `#BC9F73` after any color changes: `grep -r "BC9F73" public/`
- SEO matters: don't remove meta tags, canonical, or JSON-LD without reason
- Copy tone: confident, direct, benefit-driven, Italian. No hype, no all-caps, no emoji
- The CSS mockups (iPhone frames with app UI) can be replaced with real screenshots from the Simulator — see plan for details
- When replacing mockups, use the `iphone` frame CSS class and nest real `<img>` tags inside `.iphone__screen`
