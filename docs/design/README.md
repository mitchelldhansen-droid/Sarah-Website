# Design mockups — Warm Sketchbook

The chosen design. Coloured boxes stand in for artwork.

## Images (the quickest way to see the design)

- `desktop.png`, `phone.png`, `lightbox.png` — exported from the design canvas (Share › Export). If they're missing, Mitchell hasn't exported them yet.

## Mockup source files (for exact values)

- `B-Desktop.dc.html` (1280 px wide), `B-Phone.dc.html` (390 px wide), `B-Lightbox.dc.html` (1280 × 800)

These are the canvas's own source files, not production code. They don't render on their own: `{{accent}}`, `{{display}}`, `<sc-for>` and `<x-dc>` belong to the canvas tool. Read them only for exact spacing, sizes and structure. Two things in them are superseded:

- The `fonts` tweak offers three pairings; the decision is **Middle** (Fraunces + Nunito).
- The `accent` tweak offers four colours; the decision is **#2F6B5E** (deep teal).

Where these files and `docs/SPEC.md` differ, the spec wins; it consolidates a few near-duplicate values.
