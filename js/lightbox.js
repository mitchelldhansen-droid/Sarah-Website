// Lightbox: one <dialog> that shows a piece large, with its Etsy button(s)
// and Previous/Next. The gallery (and the carousel) open it with a list of
// pieces shaped like this:
//   { file, alt, title, label, tint, offerings: [...], year }
// The variant comes from offerings: none = personal, one = commission,
// two or more = logo packages (one card and button per offering).

const dialog = document.getElementById('lightbox');
const art = dialog.querySelector('.lightbox-art');
const img = art.querySelector('img');
const group = dialog.querySelector('.lightbox-group');
const title = document.getElementById('lightbox-title');
const price = dialog.querySelector('.lightbox-price');
const year = dialog.querySelector('.lightbox-year');
const description = dialog.querySelector('.lightbox-description');
const actions = dialog.querySelector('.lightbox-actions');
const nav = dialog.querySelector('.lightbox-nav');
const counter = dialog.querySelector('.lightbox-counter');
const status = document.getElementById('lightbox-status');
const buttonTemplate = document.getElementById('etsy-button-template');

let pieces = [];
let index = 0;
let opener = null;

export function openLightbox(list, start, openedFrom) {
  pieces = list;
  index = start;
  opener = openedFrom;
  status.textContent = '';
  show();
  dialog.showModal();
}

export function initLightbox() {
  dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());

  // A click on the backdrop lands on the <dialog> itself. Clicks on the
  // content land on the panel inside it, so they don't close it.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  // Safari doesn't focus a button when it's clicked, so return focus by hand
  dialog.addEventListener('close', () => opener?.focus());

  for (const button of nav.querySelectorAll('.lightbox-step')) {
    button.addEventListener('click', () => step(Number(button.dataset.step)));
  }

  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') step(-1);
    if (event.key === 'ArrowRight') step(1);
  });

  img.addEventListener('load', () => art.classList.add('is-loaded'));
  img.addEventListener('error', () => {
    art.classList.add('is-missing');
    console.warn(`Missing image: ${img.currentSrc || img.src}`);
  });

  // Swipe on the image. touch-action in the CSS leaves vertical scrolling
  // and pinch-zoom to the browser, so only sideways drags arrive here.
  let startX = null;
  let startY = 0;
  art.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'touch') return;
    startX = event.clientX;
    startY = event.clientY;
  });
  art.addEventListener('pointerup', (event) => {
    if (startX === null) return;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    startX = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
  });
  art.addEventListener('pointercancel', () => {
    startX = null;
  });
}

// Moves through the list, wrapping from last to first
function step(by) {
  if (pieces.length < 2) return;
  index = (index + by + pieces.length) % pieces.length;
  show();
  status.textContent = `${pieces[index].title}, ${counter.textContent}`;
}

const srcset = (file) => `images/full/${file}-800.webp 800w, images/full/${file}-1400.webp 1400w`;

function show() {
  const piece = pieces[index];
  const offerings = piece.offerings ?? [];
  const single = offerings.length === 1 ? offerings[0] : null;

  dialog.style.setProperty('--piece-tint', piece.tint);
  // The art's shape (from the image-prep script); phones size the art box to it
  art.style.setProperty('--art-ratio', piece.width ? `${piece.width} / ${piece.height}` : '');
  art.classList.remove('is-loaded', 'is-missing');
  img.alt = piece.alt;
  img.srcset = srcset(piece.file);
  img.src = `images/full/${piece.file}-800.webp`;

  group.textContent = piece.label;
  title.textContent = piece.title;
  setText(price, single ? `$${single.price}+` : '');
  setText(year, offerings.length ? '' : piece.year);
  setText(description, single ? single.description : '');

  actions.replaceChildren(...buildActions(offerings));
  actions.classList.toggle('has-packages', offerings.length > 1);

  nav.hidden = pieces.length < 2;
  counter.textContent = `${index + 1} of ${pieces.length}`;

  // Start loading the neighbours now, so Previous and Next feel instant
  if (pieces.length > 1) {
    for (const by of [-1, 1]) {
      const neighbour = pieces[(index + by + pieces.length) % pieces.length];
      const preload = new Image();
      preload.sizes = img.sizes;
      preload.srcset = srcset(neighbour.file);
    }
  }
}

// Sets the text, and hides the element when there's nothing to show
function setText(element, text) {
  element.textContent = text ?? '';
  element.hidden = !text;
}

function make(tag, className, text) {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = text;
  return element;
}

function buildActions(offerings) {
  if (offerings.length === 0) return [];

  if (offerings.length === 1) {
    const [offering] = offerings;
    const note = offering.etsyUrl ? 'Opens the listing on Etsy' : 'Opens my Etsy shop';
    return [etsyButton(offering, 'Commission this style', ''), make('p', 'lightbox-note', note)];
  }

  // Logo pieces: one card per package. The button shows "Commission"; the
  // package name is in the hidden text, so screen readers hear the full name.
  return offerings.map((offering) => {
    const card = make('div', 'package', '');
    const text = make('div', 'package-text', '');
    text.append(
      make('h3', 'package-name', offering.name),
      make('p', 'package-price', `$${offering.price}+`),
      make('p', 'package-note', offering.note),
    );
    card.append(text, etsyButton(offering, 'Commission', ` ${offering.name}`));
    return card;
  });
}

function etsyButton(offering, label, hiddenName) {
  const button = buttonTemplate.content.firstElementChild.cloneNode(true);
  const visible = button.querySelector('.etsy-label');
  const hidden = button.querySelector('.visually-hidden');
  if (offering.etsyUrl) {
    button.href = offering.etsyUrl;
    visible.textContent = label;
    hidden.textContent = `${hiddenName} (opens Etsy in a new tab)`;
  } else {
    // No listing link yet: send people to the shop rather than a dead end
    button.href = dialog.dataset.shopUrl;
    visible.textContent = 'Visit the Etsy shop';
    hidden.textContent = ' (opens in a new tab)';
  }
  return button;
}
