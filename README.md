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

1. Export the piece twice, as WebP at about 80% quality (sizes are in `docs/SPEC.md` → Content and data):
   - a square thumbnail, cropped by hand, 600 × 600 → `images/thumbs/<name>.webp`
   - the whole piece, uncropped, long edge 800 and 1400 → `images/full/<name>-800.webp` and `images/full/<name>-1400.webp`
2. Add one entry to `data/gallery.json`, where you want it to appear in the grid:

   ```json
   { "file": "solo-portrait_03", "offerings": ["solo-portrait"], "alt": "Watercolour portrait of a woman in a yellow hat" }
   ```

   - `file` is the image name without the folder or `.webp`.
   - `offerings` lists the offering ids from `data/offerings.json`. Logo pieces list both: `["logo-design", "logo-suite"]`.
   - `alt` describes what's in the picture and the style, in about 125 characters.
3. Check it locally (see above), then commit and push.

If a tile shows its name on a coloured square instead of the art, the image file is missing or misnamed; the browser console says which file it looked for.

## Deploy

The site is published with GitHub Pages from the `main` branch. Pushing to `main` updates the live site within a minute or two.

## Project docs

- `docs/SPEC.md` — build spec and milestone list
- `docs/BRIEF.md` — decisions and content still needed from Sarah
- `docs/design/` — design mockups
- `CHANGELOG.md` — what changed and when
