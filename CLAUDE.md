# Sarah Rose Costa — portfolio site

A one-page portfolio and shop front for illustrator Sarah Rose Costa. Visitors browse commission examples, open a piece in a lightbox, and click through to the matching Etsy listing. Etsy handles all sales; the site has no cart, no forms and no backend.

## Read before working

- `docs/SPEC.md` — the build spec: tokens, layout, components, interactions, data shapes, accessibility, and the **Build order** milestone list. Read the sections that apply to the current task; don't load the whole file unless needed.
- `docs/BRIEF.md` — decisions made with Sarah and the content still missing. If the spec and the brief disagree, the brief wins.
- `docs/design/` — the Warm Sketchbook mockups (see the README there). They show what "right" looks like.

## Stack and rules

- Plain HTML, CSS and vanilla JavaScript (ES modules). No framework, no build step, no npm dependencies, unless Mitchell decides otherwise.
- Run locally with `py -m http.server` (or `python -m http.server`) from the repo root, then open http://localhost:8000. Opening index.html directly won't load the JSON.
- Colours, type, spacing, radii and shadows come only from the tokens in `css/tokens.css`. No raw hex values elsewhere.
- Offering names, prices and Etsy listing links live only in `data/offerings.json`. Never hard-code them in HTML or JS. The main Etsy shop link, email and Instagram are the exception: they're hard-coded in `index.html` (see SPEC → Content and data).
- Never crop artwork with `object-fit: cover`; thumbnails are cropped by hand to exact sizes.
- Use real elements: `<button>`, `<a href>`, `<details>`, `<dialog>`. Meet the Accessibility section of the spec.
- Respect `prefers-reduced-motion` for every animation.
- Keep code minimal: the smallest amount that gives full functionality. No speculative features.

## How to work with Mitchell

- Call him Mitchell, never Mitch.
- He's learning (Python, then JavaScript and GDScript) and wants to understand the why, not just the what. Before writing code, explain the plan in a few steps and why it's done that way. Afterwards, walk through the key lines.
- Review like a patient senior full-stack developer mentoring a junior: honest, direct, kind.
- Ask when something is ambiguous. Assume nothing.
- Work one Build order milestone at a time. Stop at the end of a milestone so he can review the diff and commit.
- At the end of each milestone, add an entry to `CHANGELOG.md` and suggest a commit message.
- Offer options when there's a real choice to make, with a recommendation.

## Current status

- The v1 site (single index.html, green/purple, Playfair + Lora) was removed on Sept 27, 2026. It's in git history at commit 4bfa10f.
- Stack confirmed: plain HTML, CSS and vanilla JS.
- Milestones 1–6 done (bare `index.html`; tokens and base styles; header; hero; data files and gallery tiles; filter chips). Next: milestone 7 in `docs/SPEC.md` → Build order.
- Filtering sets `hidden` on gallery `<li>`s; the lightbox's list is the tiles that aren't hidden.
- Images point at their final paths from the spec before the files exist; the group tint shows until Sarah's images are dropped in.
- Text-size tokens are in `rem` (Mitchell's choice, so they follow the visitor's browser text size); spacing and radii stay in `px`.
