# Sarah's Portfolio Site — Build Handoff Spec

Written Sept 27, 2026. Exported from the live spec doc on claude.ai. From here on, **this file is the working copy**: when a decision changes, update it here.

## Overview

Build a one-page portfolio and shop front for Sarah Rose Costa. Visitors browse commission examples, open any piece large, and click through to the matching Etsy listing to order. Etsy handles every payment, message and order, so the site has no cart, no forms and stores no personal data.

**Sources of truth**

- **Design:** the Warm Sketchbook mockups in `docs/design/`: Desktop (1280 px wide), Phone (390 px wide) and Lightbox. Coloured boxes in the mockups stand in for artwork.
- **Decisions and content:** `docs/BRIEF.md`. If this spec and the brief disagree, the brief wins and this spec gets updated.

**Recommended stack (to confirm)**

- Plain HTML, CSS and vanilla JavaScript (ES modules). No framework, no build step.
- Content lives in three JSON files. Small JS modules render the gallery, filter, lightbox and carousel from them.
- Hosted on GitHub Pages with a custom domain.
- Why: this is one static page with four interactive pieces. A framework adds setup and dependencies without adding anything the page needs, and plain code stays readable line by line. React (via Vite) is the alternative if you want the practice; it adds a build step.
- Testing locally needs a small local server, for example `python -m http.server` (on Windows, `py -m http.server` also works). Browsers block JSON and JS modules loaded from a file opened directly.

## How it fits together

Three JSON files hold all the content; the page never hard-codes a name, price or link.

```
 offerings.json            gallery.json             personal.json
 name, price, group,       each example image +     personal pieces:
 Etsy link per offering    the offerings it shows   image, title, year
   │        │                    │                        │
   │        │ starting prices    │ one tile per image     │ one card each
   │        ▼                    ▼                        ▼
   │   Filter chips ──filters──► Gallery grid           Carousel
   │                             │                        │
   │                             │ tap a tile             │ tap a card (no Etsy button)
   │ names, prices, Etsy links   ▼                        │
   └──────────────────────────► Lightbox ◄────────────────┘
                                 │ full image, title, price
                                 │ one button per offering
                                 ▼ Commission button (new tab)
                               Etsy listing  (outside the site: payment and order happen here)
```

Tiles and carousel cards open the same lightbox. Only commission pieces get Etsy buttons, so changing a listing means editing one line in offerings.json.

## Design tokens

Define these once as CSS custom properties in `css/tokens.css` and reference only the token names everywhere else. That way, changing the teal means editing one line.

**Colour**

| Token | Value | Used for | Contrast |
| --- | --- | --- | --- |
| `--color-paper` | #F5EEE3 | Page background | — |
| `--color-card` | #FFFBF5 | Chips, cards, lightbox panel, hover caption | — |
| `--color-ink` | #2A2F45 | Headings, body text, selected chip, outline buttons, contact band | 11.5:1 on paper |
| `--color-muted` | #5E6072 | Secondary text, notes, chip prices | 5.4:1 on paper, 6.0:1 on card |
| `--color-accent` | #2F6B5E (deep teal) | Primary buttons, prices, wavy divider, About label | White on it 6.1:1; as text on card 6.0:1 |
| `--color-accent-hover` | #27584D | Hover fill for primary buttons | — |
| `--color-on-accent` | #FFFFFF | Text and icons on teal | — |
| `--color-border` | #DDD2C2 | Chip and outline-button borders, inactive carousel dots | Decorative (every control also has text) |
| `--color-border-soft` | #E6DDD0 | FAQ cards, eyebrow chip, card underline, lightbox divider | Decorative |
| `--color-band-text` | #C9C3D6 | Secondary text on the navy contact band | 7.7:1 on ink |
| `--color-band-rule` | #444A60 | Footer rule on the band | Decorative |
| `--color-backdrop` | rgba(42, 47, 69, 0.9) | Lightbox backdrop | — |

`--color-border-soft` replaces three near-identical values in the mockup (#E3D8C8, #E8DFD2, #EDE4D6).

**Group tints.** These fill the placeholder behind each image while it loads, and the group label in the lightbox: People #F2DCC8, Pets #DCE4D2, Logos #D9DFEB, Custom #EDD8DE, Personal #EFE4D4.

**Typography**

Fonts: `--font-display` is Fraunces (500, 600, italic 500); `--font-body` is Nunito (400, 600, 700). Load only those weights from Google Fonts with `display=swap`.

| Token | Desktop | Phone | Font and weight | Line height | Used for |
| --- | --- | --- | --- | --- | --- |
| `--text-hero` | 64 px | 40 px | Fraunces 600, letter-spacing −0.01em | 1.06 | Hero headline |
| `--text-section` | 50 px | 36 px | Fraunces 600 | 1.08 | Gallery, About and FAQ headings |
| `--text-band` | 56 px | 42 px | Fraunces 600 | 1.08 | "Say hello" |
| `--text-panel` | 42 px | 32 px | Fraunces 600 | 1.08 | Lightbox title |
| `--text-divider` | 36 px | 26 px | Fraunces 500 italic | 1.2 | "See more of my work" |
| `--text-price` | 28 px | 24 px | Fraunces 600, teal | 1.2 | Lightbox price |
| `--text-wordmark` | 27 px | 22 px | Fraunces 600 | 1 | "Sarah Rose Costa" in the header |
| `--text-card-title` | 18 px | 17 px | Fraunces 500 | 1.3 | Carousel captions |
| `--text-lead` | 19 px | 17 px | Nunito 400 | 1.6 | Hero subline |
| `--text-body` | 18 px | 16 px | Nunito 400 | 1.7 | About, contact subline |
| `--text-body-sm` | 16 px | 15 px | Nunito 400 | 1.6 | FAQ answers, lightbox description, gallery subline |
| `--text-ui` | 16 px | 15 px | Nunito 700 | 1.2 | Buttons, nav links (600), FAQ questions |
| `--text-chip` | 15 px | 14 px | Nunito 700 | 1.2 | Filter chips, tile captions |
| `--text-small` | 13 px | 13 px | Nunito 600–700 | 1.4 | Notes, counters, uppercase labels (0.12em tracking) |

The mockup's About heading is 48 px. It moves to `--text-section` (50 px) so all section headings match.

**Spacing, radii and shadows**

| Token | Value | Used for |
| --- | --- | --- |
| `--space-1` … `--space-8` | 4, 8, 12, 16, 24, 32, 48, 64 px | All gaps and padding inside components |
| `--gutter` | 72 px desktop, 20 px phone | Left and right page padding |
| `--section-pad` | 104 px desktop, 64 px phone | Top and bottom padding per section |
| `--grid-gap` | 24 px desktop; 12 px columns and 20 px rows on phone | Gallery grid |
| `--content-max` | 1280 px | Page width cap; content is centred beyond it |
| `--radius-pill` | 999 px | Buttons, chips, eyebrow label |
| `--radius-tile` | 18 px desktop, 16 px phone | Gallery tiles, FAQ cards |
| `--radius-inset` | 14 px | Art inside carousel cards |
| `--radius-card` | 22 px | Carousel cards, hero art |
| `--radius-panel` | 28 px | Lightbox panel, About card (the mockup's 32 px About card moves to 28) |
| `--border-w` | 1.5 px | Chips, outline buttons, FAQ cards |
| `--shadow-lift` | 0 16px 32px rgba(42, 47, 69, 0.18) | Hovered tile |
| `--shadow-float` | 0 18px 40px rgba(42, 47, 69, 0.16) | Hero art cluster |
| `--shadow-modal` | 0 30px 80px rgba(20, 22, 34, 0.35) | Lightbox panel |
| `--shadow-card` | 0 2px 0 var(--color-border-soft) | Carousel cards |

## Layout and responsive behavior

One page, eight sections, top to bottom. Write the CSS phone-first: phone styles are the default, and wider layouts are added with `min-width` media queries.

| # | Section | Anchor | Desktop (≥ 1024 px) | Phone (< 640 px) |
| --- | --- | --- | --- | --- |
| 1 | Header, sticky | — | 84 px tall. Wordmark left; Gallery, About, FAQ, Contact links and a "Shop on Etsy" pill right | 64 px tall. Wordmark, "Shop" pill, menu button |
| 2 | Hero | — | Two columns: text left, three-piece art cluster right | One column: text, then the cluster (270 px tall) underneath |
| 3 | Commission gallery | `#gallery` | Centred heading; chips wrap and centre; 4-column grid | Chips scroll sideways in one row; 2-column grid; caption under each tile |
| 4 | Divider | — | 180 px wavy line either side of the text | 54 px wavy lines |
| 5 | Personal work carousel | `#more-work` | 320 px cards, about 3½ visible, bleeding off the right edge | 270 px cards, about 1¼ visible |
| 6 | About | `#about` | One card: 320 px round photo left, text right | Card stacked and centred; 200 px photo |
| 7 | FAQ | `#faq` | Centred column, 860 px wide | Full width |
| 8 | Contact band and footer | `#contact` | Navy band, centred text, three pills in a row; footer inside the band | Pills stacked full width |

The footer only *looks* like it's inside the band. In the HTML, `<section id="contact">` is the last thing in `<main>` and `<footer>` follows it as a sibling, so it stays the page's footer landmark. Both get the navy background.

The hero has no id on purpose. The wordmark and "Back to top" link to `#top`, and when no element has `id="top"`, browsers scroll to the very top of the page. Giving the hero that id would stop the scroll at the hero instead, below the header.

**Breakpoints**

| Range | Name | What changes |
| --- | --- | --- |
| < 640 px | Phone | The phone mockup: one column, 20 px gutters, 2-column grid, menu button instead of links |
| 640–1023 px | Tablet | Not designed. Keep the phone layout, but use a 3-column grid, 40 px gutters, and show the nav links once they fit (about 820 px) |
| ≥ 1024 px | Desktop | The desktop mockup: two-column hero and About card, 4-column grid |
| > 1280 px | Wide | Content stops at 1280 px and centres. The navy contact band still runs full width |

**Fluid type.** Rather than jumping between phone and desktop sizes, scale each text token smoothly with `clamp()`. For the hero: `clamp(40px, 29.5px + 2.7vw, 64px)`. Every token follows the same pattern: it grows in a straight line from its phone size at a 390 px screen to its desktop size at 1280 px, then stops.

**Sticky header offset.** Give every section `scroll-margin-top` equal to the header height plus 16 px, so tapping a nav link doesn't hide the section heading under the header.

**Why these choices.** The grid drops to two columns on phones because tiles smaller than about 160 px lose too much detail to judge an art style. Captions sit under the tiles on phones because touch screens have no hover.

## Components

Thirteen pieces make up the page. Eight are static HTML and CSS; the gallery, filter, lightbox, carousel and phone menu need JavaScript.

| Component | Variants | Content / props | Notes |
| --- | --- | --- | --- |
| Header | Desktop, phone | Wordmark (links to `#top`); section links; "Shop on Etsy" pill | Sticky. Paper background. Add a 1 px `--color-border-soft` bottom border once the page has scrolled, so the header separates from content (not in the mockup) |
| Phone menu | Open, closed | The four section links | Not designed yet. Suggested: a card-coloured panel under the header, 56 px rows, `--text-ui` at 20 px. Closes on link tap, Esc, or a tap outside |
| Button | Primary, outline, band | Label, href, optional icon | Primary: teal fill, white text. Outline: 1.5 px ink border, ink text. Band: teal fill on the navy contact band. Pill-shaped; min height 54 px (hero), 46 px (header), 56 px (lightbox) |
| Eyebrow label | — | "Illustrator & designer" | Card fill, 1.5 px soft border, pill, `--text-small` at 14 px, 700 |
| Hero art cluster | Desktop, phone | 3 featured images chosen by Sarah | Rotated −5°, 3° and −2°; sizes 250×312, 280×350 and 180×180 px in a 440 px box (phone: 160×200, 180×225, 120×120 in 270 px). Decorative and not clickable, because the same pieces appear in the gallery |
| Filter chip | Default, selected | Group label; starting price, calculated from offerings.json | "All" has no price. Real `<button>`s with `aria-pressed` |
| Gallery tile | Desktop (hover caption), phone (caption below) | Square thumbnail; offering name(s); price label | The whole tile is one `<button>` that opens the lightbox. Logo tiles read "Logo Design / Suite" and "$250+" |
| Lightbox | Commission, logo, personal | The image, its list (the currently filtered tiles, or the carousel), its position | Commission: one teal button. Logo: two buttons, Logo Design and Logo Suite, each with price and "Includes N edits" note. Personal: title and year, no button |
| Wavy divider | Desktop, phone | "See more of my work" | Inline SVG path, 2 px teal stroke, round caps. Heading in `--text-divider` |
| Carousel | — | Cards from personal.json | Card: card fill, 12 px padding, `--radius-card`, 4:5 image, title and year below. Controls: dots, pause, previous, next |
| About card | Desktop, phone | Photo, heading, about text, "Start a commission" outline button (to `#gallery`) | Card fill, `--radius-panel`, 64 px padding (28 px phone). Photo is a circle |
| FAQ item | Open, closed | Question, answer | Use native `<details>` and `<summary>`: it opens and closes with no JavaScript and is keyboard- and screen-reader-friendly for free. Plus/minus icon in a 36 px paper-coloured circle |
| Contact band | Desktop, phone | Heading, subline, email link, Email / Instagram / Etsy shop pills | Navy band, cream text. Footer (© year, "Back to top") sits inside the band above a `--color-band-rule` line |

## States and interactions

Every interactive element gets the same visible focus ring: a 2 px teal outline with a 3 px offset, shown on `:focus-visible` only, so mouse users don't see it on click. Hover states are new here; the mockup shows only one hovered tile.

| Element | State or trigger | Behavior |
| --- | --- | --- |
| Nav link | Hover | Text turns teal |
| Nav link | Click | Smooth-scrolls to the section |
| Primary button | Hover | Fill darkens to `--color-accent-hover` |
| Primary button | Active | Moves down 1 px |
| Outline button | Hover | Fills with ink; text turns paper |
| Filter chip | Hover | Border turns ink |
| Filter chip | Selected | Ink fill, paper text, `aria-pressed="true"`. Exactly one chip is selected; "All" on page load |
| Filter chip | Click | Grid shows only that group. The page doesn't jump. A hidden live region announces the result, for example "Showing 4 pet pieces" |
| Gallery tile | Hover or keyboard focus (desktop) | Lifts 6 px, gains `--shadow-lift`, caption bar slides up from the bottom edge |
| Gallery tile | Click, Enter or Space | Opens the lightbox on that piece |
| Lightbox | Open | Page behind stops scrolling. Focus moves to the close button. Title is announced |
| Lightbox | Esc, close button, or click on the backdrop | Closes; focus returns to the tile or card that opened it |
| Lightbox | Left/right arrow keys, Previous/Next buttons, swipe on touch | Moves through the current list: the filtered gallery, or the carousel. Wraps from last to first. Counter updates ("5 of 12") |
| Lightbox | Commission button | Opens that offering's Etsy listing in a new tab |
| Carousel | Previous / Next | Scrolls by one card |
| Carousel | Swipe or trackpad | Native scrolling that snaps to cards |
| Carousel | Pause button | Toggles autoplay; label switches between "Pause slideshow" and "Play slideshow" |
| Carousel | Pointer over, keyboard focus inside, or touch | Autoplay pauses until the pointer or focus leaves |
| Carousel card | Click | Opens the lightbox (personal variant, no Etsy button) |
| FAQ item | Click on the question | Opens or closes; the plus becomes a minus |
| Phone menu button | Tap | Opens or closes the menu; `aria-expanded` follows |
| Header | Page scrolled more than 8 px | Bottom border appears |
| Etsy and Instagram links | Click | Open in a new tab (`target="_blank" rel="noopener"`), so the portfolio stays open behind |
| Email link | Click | Opens the visitor's mail app (`mailto:`) |

Browser zoom and pinch-zoom must stay enabled. Don't set `user-scalable=no` in the viewport tag.

## Motion

Sarah asked for smooth animations. Keep them short (150–250 ms) and subtle: at that length motion reads as polish; longer than about 300 ms it starts to feel slow.

| Element | Trigger | Animation | Duration | Easing |
| --- | --- | --- | --- | --- |
| Buttons, chips, links | Hover | Colour and border change | 150 ms | ease |
| Gallery tile | Hover or focus | Lift 6 px (`translateY`) and add shadow | 200 ms | ease-out |
| Tile caption bar | Hover or focus | Slide up 8 px and fade in | 200 ms | ease-out |
| Gallery tiles | Filter change | Newly shown tiles fade in. The grid itself jumps to its new layout without animating | 200 ms | ease-out |
| Lightbox | Open | Backdrop fades in; panel fades in and scales from 0.97 to 1 | 220 ms | cubic-bezier(0.2, 0.8, 0.2, 1) |
| Lightbox | Close | Reverse of open | 160 ms | ease-in |
| Lightbox image | Previous / Next | Crossfade | 180 ms | ease |
| Carousel | Autoplay tick, arrows | Smooth scroll by one card | about 500 ms (browser smooth scroll) | browser default |
| Page | Nav link | Smooth scroll (`scroll-behavior: smooth`) | browser default | browser default |
| Header border | Scroll past 8 px | Fade in | 150 ms | ease |

**Carousel autoplay rules**

- Advance one card every 6 seconds, looping back to the first.
- Stop while the carousel is off screen (use `IntersectionObserver`) and while the browser tab is hidden (`visibilitychange`). This saves battery and stops the carousel jumping ahead while nobody is looking.
- Pause on hover, keyboard focus or touch; the Pause button stops it until pressed again.

**Reduced motion.** When the visitor's device asks for reduced motion (`prefers-reduced-motion: reduce`):

- Autoplay starts off, and the control reads "Play slideshow".
- No lift, slide or scale. Colour and shadow changes stay.
- The lightbox fades only, in 100 ms or less.
- Anchor links jump instead of scrolling (`scroll-behavior: auto`).

## Content and data

All changing content lives in three files under `data/`. Adding a piece means adding an image and one entry; the HTML never changes.

**offerings.json** holds the groups and the seven offerings. It is the only place prices and Etsy links are written. Blank fields are waiting on Sarah.

```json
{
  "groups": [
    { "id": "people", "label": "People" },
    { "id": "pets", "label": "Pets" },
    { "id": "logos", "label": "Logos" },
    { "id": "custom", "label": "Custom" }
  ],
  "offerings": [
    { "id": "solo-portrait", "name": "Solo Portrait", "group": "people", "price": 150, "note": "", "description": "", "etsyUrl": "" },
    { "id": "duo-portrait", "name": "Duo Portrait", "group": "people", "price": 225, "note": "", "description": "", "etsyUrl": "" },
    { "id": "animal-face", "name": "Animal Portrait (Face)", "group": "pets", "price": 125, "note": "", "description": "", "etsyUrl": "" },
    { "id": "animal-full-body", "name": "Animal Portrait (Full Body)", "group": "pets", "price": 200, "note": "", "description": "", "etsyUrl": "" },
    { "id": "logo-design", "name": "Logo Design", "group": "logos", "price": 250, "note": "Includes 1 edit", "description": "", "etsyUrl": "" },
    { "id": "logo-suite", "name": "Logo Suite", "group": "logos", "price": 500, "note": "Includes 2 edits", "description": "", "etsyUrl": "" },
    { "id": "custom-commission", "name": "Custom Commission", "group": "custom", "price": 170, "note": "", "description": "", "etsyUrl": "" }
  ]
}
```

- `price` is a number. The code adds the "$" and "+" when it displays it, and computes each chip's "from $X" as the lowest price in that group.
- `note` shows under the name in the lightbox. Only the logo offerings use it.

**gallery.json** lists commission examples in the order they appear. `offerings` is always a list: most pieces have one, logo pieces have both, and the lightbox draws one button per entry.

```json
[
  { "file": "solo-portrait_01", "offerings": ["solo-portrait"], "alt": "" },
  { "file": "logo_01", "offerings": ["logo-design", "logo-suite"], "alt": "" }
]
```

**personal.json** lists the carousel pieces in order.

```json
[
  { "file": "personal_01", "title": "", "year": "", "alt": "" }
]
```

The email address, Instagram link and Etsy shop link each appear in two or three places in the HTML. Hard-code them; a find-and-replace covers any later change.

**Images**

Crop every thumbnail by hand to its exact size, and have Sarah approve the crops. Don't let CSS crop the art with `object-fit: cover`: it can cut off a face or a signature.

| Use | Shape | Export at | Folder and name |
| --- | --- | --- | --- |
| Gallery thumbnail | Square, cropped by hand | 600 × 600 | `images/thumbs/solo-portrait_01.webp` |
| Lightbox image | Uncropped | Long edge 800 and 1400 | `images/full/solo-portrait_01-800.webp`, `-1400.webp` |
| Carousel card | 4:5 portrait, cropped by hand | 600 × 750 | `images/personal/personal_01.webp` |
| Carousel lightbox | Uncropped | Long edge 800 and 1400 | `images/full/personal_01-800.webp`, `-1400.webp` |
| Hero cluster | Two 4:5, one square | 600 × 750 and 600 × 600 | `images/hero/hero_01.webp` to `hero_03.webp` |
| About photo | Square (shown as a circle) | 640 × 640 | `images/about.webp` |
| Link preview (Open Graph) | 1.91:1 | 1200 × 630 | `images/og.jpg` (JPG, because some apps don't show WebP previews) |
| Favicon | Square | SVG, plus a 180 px PNG for iPhones | site root |

Use WebP at about 80% quality. These sizes cover high-density ("retina") screens at the largest size each image is shown.

**Text limits**

| Field | Limit | Why |
| --- | --- | --- |
| Offering name | 28 characters | Fits one line of the desktop hover caption |
| Offering description | 120 characters | About three lines in the lightbox |
| Carousel title | 40 characters | One line on the card |
| Alt text | About 125 characters | Screen readers read it in full; say what's in the picture and the style |
| FAQ answer | About 60 words | Keeps each answer scannable |

## Edge cases

The rule of thumb: when something is missing, fall back to the Etsy shop rather than a dead end, because the site's whole job is getting people there.

| Case | What happens |
| --- | --- |
| Image still loading | The tile shows its group tint, then the image fades in (200 ms; instant with reduced motion). Every `<img>` has `width` and `height` set, so the layout doesn't jump when it arrives |
| Slow connection | Below-the-fold images use `loading="lazy"`. Full-size images load only when the lightbox opens, and the lightbox preloads the next and previous ones. Phones get the 800 px version via `srcset` |
| Data file fails to load (bad JSON, or opened without a local server) | The gallery area shows "The gallery didn't load. Please refresh, or visit the Etsy shop." with a link. The error is logged to the console |
| JavaScript turned off | Hero, About, FAQ and contact still work. A `<noscript>` message in the gallery links to the Etsy shop |
| Offering has no Etsy link yet | Its button reads "Visit the Etsy shop" and links to the main shop page |
| Image file missing | The tile keeps its tint and shows the offering name, like the mockup placeholder. A console warning names the file |
| Alt text missing | Falls back to "Example of [offering name]" |
| A group has no pieces | Its filter chip is hidden |
| personal.json is empty | The divider and carousel are hidden |
| Long offering name | Desktop hover caption: one line, ends in "…". Phone caption: up to two lines. The full name always shows in the lightbox and screen-reader label |
| Long description | Desktop: the lightbox text column scrolls inside the panel. Phone: the whole lightbox scrolls |
| Only one piece in the current list | Lightbox hides Previous/Next and the counter |
| Very wide or very tall artwork | Shown whole inside the lightbox's image area (`object-fit: contain`, which never crops); the card colour fills the space around it |
| Gallery grows past about 24 pieces | Not designed yet. A "Show more" button after the first 12 on phones is the likely fix |
| An Etsy listing is removed | Etsy shows its own "not found" page. Check every link before launch, and whenever listings change |

## Accessibility

Target WCAG 2.2 level AA. Most of it comes free from using the right HTML elements (real buttons, links, `<details>` and `<dialog>`) rather than clickable `<div>`s.

**Page structure**

- `<html lang="en">`; landmarks `<header>`, `<nav aria-label="Sections">`, `<main>`, `<footer>`.
- One `<h1>` (the hero headline). `<h2>` for Commission gallery, See more of my work, About ("Hi, I'm Sarah."), Good to know, and Say hello.
- A "Skip to gallery" link as the first focusable element, hidden until it receives focus.

**Focus order.** Skip link, wordmark, nav links, Shop on Etsy, hero buttons, filter chips, gallery tiles in order, carousel controls then cards, About button, FAQ questions, contact links, Back to top.

**Component by component**

| Component | Requirement |
| --- | --- |
| Filter chips | Wrapped in `role="group"` with `aria-label="Filter by style"`; each chip has `aria-pressed`. A visually hidden `aria-live="polite"` region announces the count after filtering |
| Gallery tile | A `<button>` whose accessible name is the image's alt text plus offering and price, for example "Watercolour of a beagle. Animal Portrait (Face), $125+". The hover caption stays in the page for screen readers even when it's visually hidden |
| Lightbox | Build it with the native `<dialog>` element and `showModal()`. That gives you the focus trap, Esc to close and an inert page behind for free. `aria-labelledby` points at the title. Previous/Next buttons are labelled "Previous piece" and "Next piece"; the counter and title update inside an `aria-live="polite"` region |
| Etsy buttons | Visible label plus hidden text "(opens Etsy in a new tab)". Logo buttons name their package: "Commission Logo Design" and "Commission Logo Suite" |
| Carousel | `<section aria-roledescription="carousel" aria-label="Personal work">`. Each card is a group labelled "2 of 5". The pause button comes first in tab order within the carousel. The live region is `off` while autoplaying and `polite` when paused, so screen readers aren't interrupted every 6 seconds |
| Phone menu | Button has `aria-expanded` and `aria-controls` |
| Icons | Decorative SVGs get `aria-hidden="true"`. Icon-only buttons (close, arrows, pause, menu) get an `aria-label` |
| Hero art | `alt=""`, because the same pieces are in the gallery with full descriptions |

**Visual requirements**

- All text meets 4.5:1 contrast; the ratios are in the colour table.
- Nothing relies on colour alone: the selected chip also changes fill and sets `aria-pressed`.
- Every tap target is at least 44 × 44 px.
- The page reflows without sideways scrolling at 320 px wide and at 400% zoom.

**How to test**

- Use the whole page with the keyboard only (Tab, Shift+Tab, Enter, Space, Esc, arrow keys).
- Try VoiceOver on an iPhone and a Mac, or NVDA on Windows.
- Run the Lighthouse accessibility audit in Chrome DevTools, and fix anything it flags.

## SEO, performance and hosting

The site ships as plain files on GitHub Pages. The targets below keep it fast on phones and make shared links show her art.

**File structure**

```
/
├── index.html
├── css/
│   ├── tokens.css      design tokens only
│   └── styles.css      everything else
├── js/
│   ├── main.js         loads the data, starts each part
│   ├── gallery.js      grid and filter chips
│   ├── lightbox.js
│   ├── carousel.js
│   └── nav.js          header scroll state and phone menu
├── data/
│   ├── offerings.json
│   ├── gallery.json
│   └── personal.json
├── images/             thumbs/, full/, personal/, hero/
├── docs/               SPEC.md, BRIEF.md, design/
├── favicon.svg
├── CNAME               the custom domain, for GitHub Pages
├── CLAUDE.md
├── README.md           how to add a piece, how to deploy
└── CHANGELOG.md
```

**Search and link previews** (in `<head>`)

- `<title>`: "Sarah Rose Costa, Illustrator · Custom portraits, pet portraits & logos"
- Meta description, under 155 characters: "Custom portraits, pet portraits and logos by illustrator Sarah Rose Costa. Browse examples and commission your own on Etsy."
- Open Graph tags (`og:title`, `og:description`, `og:image` with the full URL of og.jpg, `og:url`, `og:type` = website) and `twitter:card` = summary_large_image, so links shared in messages and social posts show her art.
- A canonical link, favicon, and 180 px Apple touch icon.
- Optional: JSON-LD `Person` data with `sameAs` links to her Etsy shop and Instagram.

**Performance budget**

| Measure | Target |
| --- | --- |
| First-load page weight | Under 1 MB (fonts about 100 KB, hero about 150 KB, first eight thumbnails about 400 KB) |
| Each thumbnail | Under 60 KB |
| All JavaScript | Under 15 KB, no libraries: no jQuery, no carousel plugin |
| Lighthouse Performance, mobile | 90 or higher |

- Add `preconnect` hints for fonts.googleapis.com and fonts.gstatic.com, and load only the weights listed in the tokens.
- Load hero images normally (they're visible first); lazy-load everything else.

**Hosting**

- One GitHub repository, published with GitHub Pages from the main branch. Hosting is free; the domain is the only cost.
- Custom domain: add it under the repository's Settings → Pages, set the DNS records at the domain registrar as GitHub's custom domain guide describes (https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site), then turn on "Enforce HTTPS".
- Keep README.md current with two how-tos: adding a new piece (export the images, add one JSON entry, push) and deploying.

## Open items

Nothing here blocks starting the build: placeholders cover every missing piece of content. The Sarah items block launch.

**Design gaps (Mitchell can do these without Sarah)**

- [ ] Phone lightbox: a full-screen sheet with the art on top, details below, and the Commission button pinned to the bottom
- [ ] Logo lightbox in Warm Sketchbook style: two package cards (Logo Design, Logo Suite), each with price, note and button
- [ ] Personal-piece lightbox: title and year, no button
- [ ] Phone menu panel
- [ ] Tablet layout (described in words above; check it during the build)
- [ ] Hover states for buttons and chips (described above, not drawn)

**Content from Sarah (blocks launch)**

- [ ] One-line description for each of the 7 offerings
- [ ] Etsy listing link for each of the 7 offerings, plus the main shop link
- [ ] Commission example images, each tagged with its offering
- [ ] 5–10 personal pieces with titles and years
- [ ] Three hero pieces and an About photo
- [ ] Approval of the thumbnail crops
- [ ] About text and FAQ answers
- [ ] Contact email and Instagram handle
- [ ] Domain name

Mitchell can draft the alt text for Sarah to check.

**Decisions to confirm**

- [x] Stack: plain HTML, CSS and JavaScript (confirmed Sept 27, 2026)
- [ ] Name on the site: "Sarah Rose Costa"
- [ ] Etsy links open in a new tab
- [ ] Carousel autoplays every 6 seconds by default
- [ ] Hero subline still reads "Browse the gallery, find a style you love…" now that the buttons are Work with me and Visit the Etsy shop

## Build order

Build the static page first, then add one interactive piece at a time. Each milestone ends in something you can open and check, so it makes a natural commit and a good point to start a fresh Claude Code session.

- [x] 1. Bare `index.html` with all eight sections, their anchors, and placeholder text; GitHub Pages turned on
- [ ] 2. `tokens.css` and base styles (fonts, colours, type scale, gutters, section padding); check at phone and desktop widths
- [ ] 3. Header: sticky, anchor links, scrolled border, phone menu
- [ ] 4. Hero: text, the two buttons, art cluster with placeholder images
- [ ] 5. Data files (the real seven offerings, placeholder gallery entries) and `gallery.js` drawing the tiles
- [ ] 6. Filter chips: computed starting prices, `aria-pressed`, live-region announcement
- [ ] 7. Lightbox on `<dialog>`: commission, logo and personal variants; keyboard, swipe, focus return
- [ ] 8. Carousel: scroll snapping, arrows, autoplay rules, reduced motion
- [ ] 9. About card, FAQ with `<details>`, contact band, footer
- [ ] 10. Motion pass, including reduced motion
- [ ] 11. Responsive pass at 320, 390, 768, 1024, 1280 and 1600 px
- [ ] 12. Accessibility pass: keyboard only, a screen reader, Lighthouse
- [ ] 13. Real content and images from Sarah; alt text; check every Etsy link
- [ ] 14. Open Graph image and tags, favicon, performance check, custom domain and HTTPS, launch
