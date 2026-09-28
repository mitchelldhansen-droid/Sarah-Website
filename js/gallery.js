// Commission gallery: one tile per entry in gallery.json. Names, prices and
// groups come from offerings.json; nothing about an offering is written here.

export function initGallery({ groups, offerings }, entries) {
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

  initFilters(groups, offerings, [...grid.children]);
}

// Filter chips: "All" plus one per group that has pieces. Choosing a chip
// hides the other groups' tiles; the lightbox will step through what's left.
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

function makeTile(template, entry, tileOfferings) {
  const item = template.content.cloneNode(true);
  const tile = item.querySelector('.tile');
  const img = item.querySelector('img');

  // Filtering uses the first offering's group (logo pieces list two, both Logos)
  item.querySelector('li').dataset.group = tileOfferings[0].group;

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
