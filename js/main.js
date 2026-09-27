// Starts each part of the page, loading the data files first.
import { initNav } from './nav.js';
import { initGallery } from './gallery.js';

initNav();

async function loadJSON(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`${path}: ${response.status} ${response.statusText}`);
  return response.json();
}

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
