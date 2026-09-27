// Commission gallery: one tile per entry in gallery.json. Names, prices and
// groups come from offerings.json; nothing about an offering is written here.

export function initGallery({ offerings }, entries) {
  const grid = document.querySelector('.gallery-grid');
  const template = document.getElementById('tile-template');
  const byId = new Map(offerings.map((offering) => [offering.id, offering]));

  for (const entry of entries) {
    const tileOfferings = entry.offerings.map((id) => byId.get(id));
    if (tileOfferings.includes(undefined)) {
      console.warn(`gallery.json: ${entry.file} lists an offering that isn't in offerings.json`);
      continue;
    }
    grid.append(makeTile(template, entry, tileOfferings));
  }
}

function makeTile(template, entry, tileOfferings) {
  const item = template.content.cloneNode(true);
  const tile = item.querySelector('.tile');
  const img = item.querySelector('img');

  // Logo pieces have two offerings: "Logo Design / Logo Suite", lowest price
  const name = tileOfferings.map((offering) => offering.name).join(' / ');
  const price = `$${Math.min(...tileOfferings.map((offering) => offering.price))}+`;
  const alt = entry.alt || `Example of ${name}`;

  tile.setAttribute('aria-label', `${alt}. ${name}, ${price}`);
  tile.style.setProperty('--tile-tint', `var(--tint-${tileOfferings[0].group})`);
  item.querySelector('.tile-name').textContent = name;
  item.querySelector('.tile-price').textContent = price;
  item.querySelector('.tile-placeholder').textContent = name;

  // Listen before setting src, so a fast failure can't be missed
  img.addEventListener('error', () => {
    tile.classList.add('is-missing');
    console.warn(`Missing image: ${img.src}`);
  });
  img.src = `images/thumbs/${entry.file}.webp`;

  return item;
}
