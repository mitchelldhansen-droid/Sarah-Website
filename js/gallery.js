// Commission gallery: one tile per entry in gallery.json. Names, prices and
// groups come from offerings.json; nothing about an offering is written here.
import { openLightbox } from './lightbox.js';

export function initGallery({ groups, offerings }, entries) {
  const grid = document.querySelector('.gallery-grid');
  const template = document.getElementById('tile-template');
  const byId = new Map(offerings.map((offering) => [offering.id, offering]));
  const labels = new Map(groups.map((group) => [group.id, group.label]));
  const pieces = new Map(); // each tile's <li> → the piece the lightbox shows

  for (const entry of entries) {
    const tileOfferings = entry.offerings.map((id) => byId.get(id));
    if (tileOfferings.includes(undefined)) {
      console.warn(`gallery.json: ${entry.file} lists an offering that isn't in offerings.json`);
      continue;
    }
    // Logo pieces have two offerings: "Logo Design / Logo Suite".
    // Filtering uses the first offering's group (for logos, both are Logos).
    const title = tileOfferings.map((offering) => offering.name).join(' / ');
    const groupId = tileOfferings[0].group;
    const piece = {
      file: entry.file,
      alt: entry.alt || `Example of ${title}`,
      title,
      label: labels.get(groupId),
      tint: `var(--tint-${groupId})`,
      offerings: tileOfferings,
    };
    const item = makeTile(template, piece, groupId);
    pieces.set(item, piece);
    grid.append(item);
  }

  const items = [...grid.children];

  // Open the lightbox on the clicked tile, stepping through the tiles
  // the current filter shows
  grid.addEventListener('click', (event) => {
    const tile = event.target.closest('.tile');
    if (!tile) return;
    const shown = items.filter((item) => !item.hidden);
    const item = tile.closest('li');
    openLightbox(shown.map((each) => pieces.get(each)), shown.indexOf(item), tile);
  });

  initFilters(groups, offerings, items);
}

// Filter chips: "All" plus one per group that has pieces. Choosing a chip
// hides the other groups' tiles; the lightbox steps through what's left.
function initFilters(groups, offerings, items) {
  const bar = document.querySelector('.filters');
  const status = document.getElementById('gallery-status');
  const pieces = (count) => `${count} ${count === 1 ? 'piece' : 'pieces'}`;

  const select = (chip, groupId, label) => {
    for (const other of bar.children) {
      other.setAttribute('aria-pressed', String(other === chip));
    }
    let shown = 0;
    for (const item of items) {
      item.hidden = groupId !== 'all' && item.dataset.group !== groupId;
      if (!item.hidden) shown++;
    }
    status.textContent = groupId === 'all'
      ? `Showing all ${pieces(shown)}`
      : `Showing ${pieces(shown)} in ${label}`;
  };

  const addChip = (label, groupId, fromPrice) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip';
    chip.setAttribute('aria-pressed', String(groupId === 'all'));
    chip.textContent = label;
    if (fromPrice !== undefined) {
      const dot = document.createElement('span');
      dot.setAttribute('aria-hidden', 'true'); // screen readers skip the "·"
      dot.textContent = '· ';
      const price = document.createElement('span');
      price.className = 'chip-price';
      price.append(dot, `from $${fromPrice}`);
      chip.append(' ', price);
    }
    chip.addEventListener('click', () => select(chip, groupId, label));
    bar.append(chip);
  };

  addChip('All', 'all');
  for (const group of groups) {
    if (!items.some((item) => item.dataset.group === group.id)) continue;
    const prices = offerings
      .filter((offering) => offering.group === group.id)
      .map((offering) => offering.price);
    addChip(group.label, group.id, Math.min(...prices));
  }
}

function makeTile(template, piece, groupId) {
  const item = template.content.firstElementChild.cloneNode(true); // the <li>
  const tile = item.querySelector('.tile');
  const img = item.querySelector('img');
  const price = `$${Math.min(...piece.offerings.map((offering) => offering.price))}+`;

  item.dataset.group = groupId;
  tile.setAttribute('aria-label', `${piece.alt}. ${piece.title}, ${price}`);
  tile.style.setProperty('--tile-tint', piece.tint);
  item.querySelector('.tile-name').textContent = piece.title;
  item.querySelector('.tile-price').textContent = price;
  item.querySelector('.tile-placeholder').textContent = piece.title;

  // Listen before setting src, so a fast failure can't be missed
  img.addEventListener('error', () => {
    tile.classList.add('is-missing');
    console.warn(`Missing image: ${img.src}`);
  });
  img.src = `images/thumbs/${piece.file}.webp`;

  return item;
}
