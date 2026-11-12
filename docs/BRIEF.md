# Sarah's Portfolio Site — Brief

Decisions made with Sarah on Sept 26, 2026. The live brief on claude.ai is where Sarah fills in her content; copy answers into `data/` and this file as they arrive.

## What the site is

One site that works as both Sarah's portfolio and her shop front. Etsy handles all sales; the site's job is to show the work and send buyers to the right listing.

## Decisions

| Topic | Decision |
| --- | --- |
| Structure | One scrolling page, no separate pages. Fewer taps, especially on phones |
| Page flow | Intro → commission gallery → "See more of my work" divider → personal work carousel → About → FAQ → contact |
| Shop | Etsy only for now. Orders, messages and sales tax stay in one place. Selling prints on the site can be revisited after launch |
| Gallery | Clicking a piece opens it large (lightbox) with the offering name, price and a "Commission this style" button to that offering's Etsy listing |
| Filter | Grouped: All · People · Pets · Logos · Custom, each chip showing its starting price |
| Logo pieces | The lightbox shows both packages (Logo Design and Logo Suite); the buyer picks |
| Pieces that aren't an offering | No button. They go in the personal work carousel |
| Carousel | Swipe, arrows, and slow autoplay with a pause button |
| Etsy links | One link per offering, stored in one place (`data/offerings.json`) |
| Contact | Email and social links as icons. No contact form |
| Tutoring | Removed. Etsy doesn't allow tutoring listings |
| Look | Warm Sketchbook: cream paper background, rounded tiles and pill buttons, wavy-line divider, navy contact band |
| Fonts | Fraunces (headings) + Nunito (body). Whimsical and simpler pairings were compared and passed on |
| Colours | Deep teal #2F6B5E for buttons and accents (orange was dropped); cream #F5EEE3; cards #FFFBF5; navy ink #2A2F45 |
| Intro buttons | "Work with me" scrolls to About; "Visit the Etsy shop" opens Etsy |
| Taste references | communecalla.com and jessvossart.com. Sarah likes: consistent art size, hover effects and the lightbox feel, consistent fonts, direct shops, smooth animations, elegant simple styling |

## Offerings

| Offering | Group | Starting price | Note |
| --- | --- | --- | --- |
| Solo Portrait | People | $150+ | |
| Duo Portrait | People | $225+ | |
| Animal Portrait (Face) | Pets | $125+ | |
| Animal Portrait (Full Body) | Pets | $200+ | |
| Logo Design | Logos | $250+ | Includes 1 edit |
| Logo Suite | Logos | $500+ | Includes 2 edits |
| Custom Commission | Custom | $170+ | |

## Content still needed from Sarah

- [ ] One-line description for each offering
- [ ] Etsy listing link for each offering, plus the main shop link
- [ ] Commission example images, 1 or 2 per offering depending on what she has (Mitchell, Sept 28, 2026; was 3–6), each tagged with its offering. **Partly in (Nov 12, 2026):** 8 pieces are in the gallery: solo 1, duo 2 (her `duo-portrait_04` and `_06`, of 6 sent), animal face 2 (her `pet_face_01` and `_02`, of 3), full body 1, custom 2. **Still needed: logo examples** (until then the Logos chip is hidden), and a second solo and full-body piece if she has them. File names keep her numbers; only `pet_face`, `pet_fullbody` and `custom_commission` were renamed to the offering ids.
- [ ] Sarah to approve the thumbnail crops (most are a full-width square centred on the subject; Buddy, `animal-face_02`, has white added above and below instead of a crop, so his name and ears stay in)
- [ ] 5–10 personal pieces with titles and years
- [ ] Three hero pieces and an About photo (or self-portrait). **Heroes 1 and 3 are in (Nov 12, 2026).** Hero 2 is held back: it's the same piece as gallery `custom-commission_01`, but its caption has different names and a different date from her gallery version. About photo still needed.

**Questions for Sarah (from her Nov 2 image folder):**

- Hero 2: is its caption OK to publish, or can she re-export it to match the gallery version? Both versions spell "Yosmite"; does she want that fixed?
- Her `people/`, `pets/` and `objects/` folders: which, if any, are personal work for the carousel (with titles and years)? Candidates not already in the gallery: `couple_custom_painting`, `mothers day copy`, `cutenudesprint5x7` (is this one meant for the site?), `mitchell.jpg` (what is it?), `bubba_the_bard`, `raylan`, `rosie4x4`, and the fig, "I love you mom" and angel wings designs.
- A larger export of `duo-portrait_02` (it's 1200 px; the lightbox wants 1400) if she'd like it in the gallery later.
- [ ] Intro line, About text (3–5 sentences in her voice), FAQ answers
- [ ] Contact email and Instagram handle
- [ ] Domain name

## Drafts in the site: Sarah to rewrite or approve

Written by Mitchell and Claude on Sept 27, 2026 as a starting point, not in Sarah's voice. Anything in [square brackets] is a fact only Sarah knows; none of these can launch until she has rewritten or approved them.

- [ ] Offering descriptions, all 7 (`data/offerings.json` → `description`). Shown in the lightbox; the two logo descriptions aren't shown anywhere yet, because the logo lightbox shows package cards instead. Logo Suite: what are the "[matching variations]"?
- [ ] About text (`index.html`, About section). Fill in: [medium], [when].
- [ ] FAQ answers, all 7 (`index.html`, FAQ section). Fill in or confirm:
  - Ordering: does she share a sketch before finishing? How is the piece delivered?
  - Timing: portrait and logo turnaround, in weeks
  - Revisions: what's included for portraits, and whether bigger changes cost extra
  - Physical or digital: what portraits come as; logo file formats
  - Shipping: whether she sells physical pieces, and where she ships
- [ ] Personal piece titles, all 5 (`data/personal.json` → `title`). Made up to fill the cards; they should be her real titles. Years are still "[Year]".
- [ ] The two FAQ questions written from the brief's topic list: "Do you ship?" and "Can I request something that isn't listed?"

**Alt text patterns** (for Mitchell to draft once the images arrive, and Sarah to check). Say what's in the picture and the style, in about 125 characters:

- Portrait: "[Medium] portrait of [who], [one detail that stands out]". Example: "Watercolour portrait of a smiling woman in a yellow raincoat, soft washes of blue behind her"
- Pet: "[Medium] of [animal and breed] [pose or expression]". Example: "Pencil drawing of a beagle with one ear flipped up, looking straight at the viewer"
- Logo: "Logo for [business]: [what it shows], in [colours]". Example: "Logo for a bakery: a rolling pin crossed with a wheat stalk, in navy and gold"
- Personal piece: "[Medium] of [subject], [mood or setting]"

**FAQ questions to answer:** how ordering a commission works; what buyers need to send; how long a commission takes; how many revisions are included; physical original, print or digital file; shipping; requests outside the listed offerings.
