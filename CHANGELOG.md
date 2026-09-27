# Changelog

All notable changes to Sarah Rose Costa's portfolio site.

## [2.0.0] — Unreleased

Rebuild from the Warm Sketchbook design.

### Added
- Milestone 2: `css/tokens.css` with every design token from the spec (text sizes in `rem`, scaling smoothly with `clamp()` from 390 to 1280 px), and `css/styles.css` with base styles: paper background, ink text, Fraunces and Nunito from Google Fonts, `h1`/`h2` sizes, gutters, section padding, a 1280 px centred content column, and a skip link hidden until focused. Checked at 320, 390, 768, 1280 and 1600 px.
- Milestone 1: bare `index.html` with all eight sections and their anchors (`#gallery`, `#more-work`, `#about`, `#faq`, `#contact`), landmarks, one `<h1>`, a skip link, and placeholder text. Sarah's missing content is marked `[Placeholder: …]`; parts later milestones build are marked with HTML comments. No CSS or JS yet. GitHub Pages was already on (from `main`).
- `docs/SPEC.md` build spec, `docs/BRIEF.md` decisions, `docs/design/` mockups
- `CLAUDE.md` project instructions for Claude Code

### Removed
- The v1 site (`index.html`) and its guides (`DEPLOYMENT-GUIDE.md`, `IMAGE-GUIDE.md`, `QUICK-START.md`). v1 is kept in git history; its last commit is `4bfa10f`, and its own changelog runs through version 1.2.1.
