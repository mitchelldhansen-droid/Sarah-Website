# Sarah Rose Costa — portfolio site

A one-page portfolio and shop front for illustrator Sarah Rose Costa. Commissions are ordered through her Etsy shop.

**Status:** being rebuilt (version 2). The plan is in `docs/SPEC.md`.

## Run it locally

From this folder:

```
py -m http.server
```

Then open http://localhost:8000. (Opening `index.html` directly won't work, because browsers block the data files the page loads.)

If a change doesn't show up, the browser is probably using an old cached copy: press Ctrl+Shift+R to reload without the cache, or tick "Disable cache" in the DevTools Network tab (it works while DevTools is open).

## Add a new piece

1. Put two exports in `originals/` (JPG, PNG or WebP; this folder stays on your computer and is never pushed):
   - the whole piece, uncropped, as large as you have it → `originals/full/<name>.jpg`
   - a square crop, cropped by hand (any size, as long as it's square) → `originals/thumbs/<name>.jpg`
2. Add one entry to `data/gallery.json`, where you want it to appear in the grid:

   ```json
   { "file": "solo-portrait_03", "offerings": ["solo-portrait"], "alt": "Watercolour portrait of a woman in a yellow hat" }
   ```

   - `file` is the image name without the folder or `.webp`.
   - `offerings` lists the offering ids from `data/offerings.json`. Logo pieces list both: `["logo-design", "logo-suite"]`.
   - `alt` describes what's in the picture and the style, in about 125 characters.
3. Run the image script from this folder:

   ```
   py tools/prepare_images.py
   ```

   It makes the web images in `images/` (a 600 × 600 thumbnail and 800 and 1400 px versions of the whole piece, as WebP), and adds the piece's `width` and `height` to its entry so the phone lightbox fits its shape. It never crops: a crop that isn't square is reported and skipped. Read its warnings: a thumbnail over 60 KB, or a piece too small for the 1400 px version. The first time, install the library it uses: `py -m pip install --user pillow`.
4. Check it locally (see above), then commit and push.

If a tile shows its name on a coloured square instead of the art, the image file is missing or misnamed; the browser console says which file it looked for.

**Personal pieces** (the "See more of my work" carousel) work the same way, with two differences: the card crop is a 4:5 portrait → `originals/personal/<name>.jpg`, and the entry goes in `data/personal.json` with a title and year instead of offerings:

```json
{ "file": "personal_06", "title": "Harbour at dusk", "year": "2025", "alt": "Gouache painting of fishing boats at dusk" }
```

The hero pieces and About photo go through the same script; the top of `tools/prepare_images.py` lists where each one goes.

## Deploy

The site is published with GitHub Pages from the `main` branch. Pushing to `main` updates the live site within a minute or two.

## Project docs

- `docs/SPEC.md` — build spec and milestone list
- `docs/BRIEF.md` — decisions and content still needed from Sarah
- `docs/design/` — design mockups
- `CHANGELOG.md` — what changed and when
