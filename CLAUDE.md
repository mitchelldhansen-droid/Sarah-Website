# Sarah Rose Costa — portfolio site

A one-page portfolio and shop front for illustrator Sarah Rose Costa. Visitors browse commission examples, open a piece in a lightbox, and click through to the matching Etsy listing. Etsy handles all sales; the site has no cart, no forms and no backend.

## Read before working

- `docs/SPEC.md` — the build spec: tokens, layout, components, interactions, data shapes, accessibility, and the **Build order** milestone list. Read the sections that apply to the current task; don't load the whole file unless needed.
- `docs/BRIEF.md` — decisions made with Sarah and the content still missing. If the spec and the brief disagree, the brief wins.
- `docs/design/` — the Warm Sketchbook mockups (see the README there). They show what "right" looks like.

## Stack and rules

- Plain HTML, CSS and vanilla JavaScript (ES modules). No framework, no build step, no npm dependencies, unless Mitchell decides otherwise.
- `tools/` holds Python helper scripts run on Mitchell's computer (they use Pillow, approved Sept 28, 2026). They're not part of the site, which stays dependency-free.
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
- Milestones 1–12 done: every section is built, styled, animated, checked from 320 to 1600 px, and passes an accessibility audit (Lighthouse Accessibility 100, NVDA run clean).
- Milestone 13 (real content) is paused until Sarah sends content (Mitchell's call, Sept 28, 2026). Draft copy (offering descriptions, About, FAQ answers, personal titles) is in the site as a starting point but is NOT final: `docs/BRIEF.md` → "Drafts in the site" lists every draft, and every [bracketed] gap is a fact only Sarah can supply. Nothing launches until that checklist and "Content still needed" are cleared.
- Milestone 14 was started early, and everything in it that doesn't need Sarah is done (Sept 28, 2026, through commit 539153e):
  - Favicon, 180 px touch icon, canonical, Open Graph and Twitter tags. They use the GitHub Pages address (3 places in `<head>`, marked by a comment) until the domain is chosen. JSON-LD is left out until the Etsy and Instagram links exist.
  - `tools/prepare_images.py` (Pillow): `originals/` (git-ignored) → `images/`. It never crops, and it writes each full piece's `width`/`height` into `gallery.json`/`personal.json`. Phones size the lightbox art box from them via `--art-ratio`; desktop stays 4:5. The data has no `width`/`height` yet: they arrive when the script runs on Sarah's real images.
  - `tools/check_content.py`: read-only launch check, which exits with code 1 while anything is left (62 items on Sept 28). Run it for the current launch list.
  - `docs/BROWSER-TESTING.md`: a 38-step Firefox and iPhone Safari checklist.
  - The JS budget means gzipped: 6.2 KB of 15.
- A stand-in image test confirmed the image code works (fade-ins, `srcset`, preloading, missing-image fallback, extreme shapes). A phone's first load is the hero, About photo and first 8 thumbnails, about 770 KB if Sarah's exports land near 50 KB each.
- Lighthouse Best Practices is 92 only because placeholder images 404 in the console; expect it to rise once real images are in.
- `.claude/launch.json` runs Claude's preview server ("site") on port 8001, clear of Mitchell's own server on 8000.

## Where we left off (Sept 28, 2026)

1. **Mitchell to run `docs/BROWSER-TESTING.md`** on Firefox and an iPhone. Failures come back as "browser + step number"; fix them one at a time.
2. **Waiting on Sarah** for the items in `docs/BRIEF.md` → "Content still needed" and "Drafts in the site". When they arrive, milestone 13 resumes: exports into `originals/`, run `py tools/prepare_images.py`, fill in the text and links, draft alt text (patterns in BRIEF), then run `py tools/check_content.py` until it's clear, and click every Etsy link by hand.
3. **Then the rest of milestone 14:** `images/og.jpg` (1200 × 630, from her art), Lighthouse with real images, the custom domain (swap the address in `<head>`), Enforce HTTPS, launch.
4. Not yet decided (SPEC → Open items → Decisions to confirm): the name on the site, whether the carousel autoplays, and the hero subline wording. These need Sarah.

## Code facts

- The lightbox is opened with `openLightbox(pieces, index, openerElement)`; personal pieces are `{ file, alt, title, label: 'Personal', tint: 'var(--tint-personal)', year, width, height }` with no `offerings`. `width`/`height` are undefined until the image script has run.
- Filtering sets `hidden` on gallery `<li>`s; the lightbox's list is the tiles that aren't hidden.
- Images point at their final paths from the spec before the files exist; the group tint shows until Sarah's images are dropped in.
- Text-size tokens are in `rem` (Mitchell's choice, so they follow the visitor's browser text size); spacing and radii stay in `px`.
