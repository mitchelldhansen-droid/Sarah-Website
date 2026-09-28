// Starts each part of the page, loading the data files first.
import { initNav } from './nav.js';
import { initGallery } from './gallery.js';
import { initLightbox } from './lightbox.js';
import { initCarousel } from './carousel.js';

initNav();
initLightbox();

async function loadJSON(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`${path}: ${response.status} ${response.statusText}`);
  return response.json();
}

// Loaded on its own, so a problem here can't break the gallery. If it
// fails, the divider and carousel simply stay hidden.
loadJSON('data/personal.json')
  .then(initCarousel)
  .catch((error) => console.error('The personal work did not load.', error));

try {
  const [offerings, gallery] = await Promise.all([
    loadJSON('data/offerings.json'),
    loadJSON('data/gallery.json'),
  ]);
  initGallery(offerings, gallery);
} catch (error) {
  console.error('The gallery data did not load.', error);
  document.getElementById('gallery-error').hidden = false;
}
