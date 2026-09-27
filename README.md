# Sarah Rose Costa — portfolio site

A one-page portfolio and shop front for illustrator Sarah Rose Costa. Commissions are ordered through her Etsy shop.

**Status:** being rebuilt (version 2). The plan is in `docs/SPEC.md`.

## Run it locally

From this folder:

```
py -m http.server
```

Then open http://localhost:8000. (Opening `index.html` directly won't work, because browsers block the data files the page loads.)

## Add a new piece

_To be written once the gallery is built (milestone 5)._ The short version: export the images at the sizes in `docs/SPEC.md` → Content and data, drop them in `images/`, add one entry to `data/gallery.json`, and push.

## Deploy

The site is published with GitHub Pages from the `main` branch. Pushing to `main` updates the live site within a minute or two.

## Project docs

- `docs/SPEC.md` — build spec and milestone list
- `docs/BRIEF.md` — decisions and content still needed from Sarah
- `docs/design/` — design mockups
- `CHANGELOG.md` — what changed and when
