# Changelog

All notable changes to Sarah Rose Costa's portfolio site.

## [2.0.0] — Unreleased

Rebuild from the Warm Sketchbook design.

### Added
- Milestone 4: hero. Eyebrow label, headline, subline, "Work with me" (primary) and "Visit the Etsy shop" (new `.btn-outline`, new tab) buttons; stacked on phones, side by side from 640 px. Art cluster of three tilted pieces that scales as one shape (percentage positions in a 544 × 440 box), one column until 1024 px and two columns after. Images point at their final paths (`images/hero/hero_01.webp` to `hero_03.webp`); until Sarah's files arrive, each shows its group tint.
- Milestone 3: sticky header. Compact below 820 px (wordmark, "Shop" pill, menu button); full from 820 px (four section links, "Shop on Etsy" with bag icon). Border fades in once the page scrolls past 8 px. Phone menu panel (the menu icon becomes an × while open) that closes on a link tap, Esc (focus returns to the button) or a tap outside. Also site-wide: teal `:focus-visible` ring, smooth anchor scrolling (off with reduced motion), `scroll-margin-top` so sections stop below the header, a reusable `.btn-primary`, new tokens `--header-h` and `--text-menu`, and the first JavaScript (`js/main.js`, `js/nav.js`). Etsy links open in a new tab.
- Milestone 2: `css/tokens.css` with every design token from the spec (text sizes in `rem`, scaling smoothly with `clamp()` from 390 to 1280 px), and `css/styles.css` with base styles: paper background, ink text, Fraunces and Nunito from Google Fonts, `h1`/`h2` sizes, gutters, section padding, a 1280 px centred content column, and a skip link hidden until focused. Checked at 320, 390, 768, 1280 and 1600 px.
- Milestone 1: bare `index.html` with all eight sections and their anchors (`#gallery`, `#more-work`, `#about`, `#faq`, `#contact`), landmarks, one `<h1>`, a skip link, and placeholder text. Sarah's missing content is marked `[Placeholder: …]`; parts later milestones build are marked with HTML comments. No CSS or JS yet. GitHub Pages was already on (from `main`).
- `docs/SPEC.md` build spec, `docs/BRIEF.md` decisions, `docs/design/` mockups
- `CLAUDE.md` project instructions for Claude Code

### Removed
- The v1 site (`index.html`) and its guides (`DEPLOYMENT-GUIDE.md`, `IMAGE-GUIDE.md`, `QUICK-START.md`). v1 is kept in git history; its last commit is `4bfa10f`, and its own changelog runs through version 1.2.1.
