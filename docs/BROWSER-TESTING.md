# Browser testing checklist

Every milestone so far was checked in Chrome. This list covers the places where Firefox and Safari are most likely to behave differently. It takes about 20 minutes per browser.

**Where to test:** the live site, https://mitchelldhansen-droid.github.io/Sarah-Website/ (a push takes a minute or two to show up). Until Sarah's images arrive, every image is a coloured tint: that's expected.

**If a step fails:** note the browser and its version, the step number and what you saw (a screenshot helps), and bring it back to Claude. Firefox's version is under Menu → Help → About Firefox; Safari's follows the iPhone's iOS version, under Settings → General → About.

## Firefox (on your Windows computer)

**Page and header**

- [ ] 1. The page loads with the cream background, the Fraunces headings and the Nunito body text (not a plain Times or Arial look).
- [ ] 2. Press Tab once: a "Skip to gallery" link appears at the top left, above the header. Press Enter: the page jumps to the gallery.
- [ ] 3. Keep pressing Tab: every link and button shows a teal ring, in the order header → hero buttons → filter chips → tiles.
- [ ] 4. Scroll down a little: a thin border appears under the header, and the header stays at the top.
- [ ] 5. Click "About" in the header: the page scrolls smoothly and the "About" heading stops just below the header, not hidden under it.
- [ ] 6. Narrow the window until the menu button (three lines) appears. Click it: the menu opens and the icon becomes an ×. Press Esc: it closes.

**Gallery and lightbox**

- [ ] 7. Click the "Pets" chip: only pet tiles stay, and the chip turns filled. Click "All" to bring the rest back.
- [ ] 8. With the window full width, hover over a tile: it lifts slightly and a caption slides up from the bottom.
- [ ] 9. Click a tile: the lightbox fades and grows in, and the page behind darkens.
- [ ] 10. Try to scroll the page with the mouse wheel while the lightbox is open: the page behind doesn't move.
- [ ] 11. Press the right and left arrow keys: the piece changes and the counter ("5 of 12") updates.
- [ ] 12. Press Esc: the lightbox closes (instantly is expected in Firefox; only Chrome animates the close), and the teal ring is back on the tile you opened.
- [ ] 13. Open it again and click the dark area outside the panel: it closes.

**Carousel, FAQ and footer**

- [ ] 14. In "See more of my work", the cards move on their own about every 6 seconds. Hover over them: they stop. Move away: they start again.
- [ ] 15. Click the Next arrow repeatedly: one card at a time, and after the last card it jumps back to the first. The dots follow.
- [ ] 16. Hold Shift and scroll the mouse wheel over the cards: they scroll sideways and settle neatly on a card edge, never half way.
- [ ] 17. Click a FAQ question: it opens and its plus turns into a minus. There's no extra little triangle next to the question.
- [ ] 18. In the navy contact band, the email and pill buttons are readable, and tabbing onto them shows a cream ring (not teal).

**Reduced motion**

- [ ] 19. Turn off animations in Windows (Settings → Accessibility → Visual effects → Animation effects: Off) and reload the page. The carousel doesn't move by itself, tiles don't lift on hover, and the lightbox appears with only a quick fade. Turn animations back on afterwards.

## Safari on an iPhone

**Page and menu**

- [ ] 20. The page loads with the right fonts and nothing is wider than the screen: dragging sideways doesn't move the page.
- [ ] 21. Tap the menu button: the menu opens under the header. Tap "FAQ": the menu closes and the page scrolls to the FAQ.
- [ ] 22. Open the menu again and tap somewhere outside it: it closes.
- [ ] 23. Tap the "Logos" chip: the chips sit in one row that you can drag sideways, and only logo tiles stay.

**Lightbox (the phone version is a full-screen sheet)**

- [ ] 24. Tap a tile: the lightbox covers the whole screen, with the art on top and the details below. No caption slid up on the tile when you tapped it.
- [ ] 25. Try to scroll: only the lightbox scrolls. Close it afterwards and check the page is still where you left it (it didn't jump to the top).
- [ ] 26. On a portrait or pet piece, the green Etsy button is fully visible at the bottom, not hidden behind Safari's toolbar. If the sheet is tall enough to scroll, the button stays pinned to the bottom while the details scroll past. (Logo pieces show two package cards instead, which aren't pinned.)
- [ ] 27. Swipe left on the art: the next piece appears. Swipe right: back again. Swiping up or down scrolls the sheet instead.
- [ ] 28. Pinch the art with two fingers: it zooms (it's allowed to), and letting go doesn't change the piece.
- [ ] 29. Scroll so Safari's address bar shrinks and grows: the art doesn't jump around badly or get cut off.
- [ ] 30. Turn the phone sideways: the lightbox still fits, and you can reach the close button and the Etsy button. Turn it back.
- [ ] 31. Tap the × at the top right: the lightbox closes.

**Carousel and FAQ**

- [ ] 32. Drag the carousel sideways with your finger: it settles neatly on a card. The arrows under the cards also work.
- [ ] 33. Tap a card: it opens in the lightbox with its title and year, and no Etsy button.
- [ ] 34. Tap a FAQ question: it opens with a minus sign, and there's no extra triangle next to the question.

**Reduced motion**

- [ ] 35. Turn on Settings → Accessibility → Motion → Reduce Motion and reload the page: the carousel doesn't move by itself. Turn it back off afterwards.

**VoiceOver (optional, about 5 minutes)**

Turn it on in Settings → Accessibility → VoiceOver. Swipe right to move to the next item, double-tap to activate. Turn it off the same way when you're done.

- [ ] 36. Swipe through the gallery: each tile is read as a button with its description, offering and price.
- [ ] 37. Double-tap a tile: VoiceOver says it's in a dialog and reads the title. Swiping right never reaches the page behind.
- [ ] 38. Double-tap "Next piece": it reads the new title and "6 of 12".

## If you have them

- **Safari on a Mac:** repeat Firefox steps 1–18. In the lightbox, open a piece with a long description and check the text column scrolls inside the panel.
- **Chrome on Android:** repeat Safari steps 20–34.
- **An iPad:** check the gallery at both orientations, and steps 24–31. With a trackpad or mouse attached, the hover caption appears as on a computer, which is expected.

Run this list again once Sarah's images are in, and after any big change to the lightbox or carousel.
