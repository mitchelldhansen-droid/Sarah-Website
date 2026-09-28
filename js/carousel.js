// Personal-work carousel. The browser's own sideways scrolling moves the
// cards and snaps them into place; this file adds the arrows, the dots, a
// slow autoplay, and opening a card in the lightbox.
import { openLightbox } from './lightbox.js';

const AUTOPLAY_MS = 6000;

export function initCarousel(entries) {
  if (entries.length === 0) return; // the divider and carousel stay hidden

  const section = document.querySelector('.carousel');
  const track = section.querySelector('.carousel-track');
  const dots = section.querySelector('.carousel-dots');
  const pause = section.querySelector('.carousel-pause');
  const status = document.getElementById('carousel-status');
  const template = document.getElementById('card-template');
  const lightbox = document.getElementById('lightbox');

  const pieces = entries.map((entry) => ({
    file: entry.file,
    alt: entry.alt || entry.title,
    title: entry.title,
    label: 'Personal',
    tint: 'var(--tint-personal)',
    year: entry.year,
  }));

  pieces.forEach((piece, index) => {
    track.append(makeCard(template, piece, index, pieces.length));
    dots.append(document.createElement('span'));
  });
  const slides = [...track.children];

  document.querySelector('.divider').hidden = false;
  section.hidden = false;

  track.addEventListener('click', (event) => {
    const card = event.target.closest('.card');
    if (card) openLightbox(pieces, slides.indexOf(card.parentElement), card);
  });

  // Moving. A "step" is one card plus the gap. About 3½ cards fit on
  // desktop, so the last few cards all count as "the end".
  const step = () => (slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : 1);
  const maxLeft = () => track.scrollWidth - track.clientWidth;
  const indexAt = (left) => (left >= maxLeft() - 1 ? slides.length - 1 : Math.round(left / step()));

  // Scrolls one card either way, wrapping at the ends; returns the index
  // it's heading for. It aims at whole card positions (the 0.01 absorbs
  // rounding), so snapping never pulls it back to where it started.
  const move = (by) => {
    const position = track.scrollLeft / step();
    const target = by > 0 ? Math.floor(position + 0.01) + 1 : Math.ceil(position - 0.01) - 1;
    let left = Math.min(Math.max(target * step(), 0), maxLeft());
    if (by > 0 && track.scrollLeft >= maxLeft() - 1) left = 0;
    if (by < 0 && track.scrollLeft <= 0) left = maxLeft();
    track.scrollTo({ left }); // smooth or instant comes from the CSS
    return indexAt(left);
  };

  for (const arrow of section.querySelectorAll('.carousel-arrow')) {
    arrow.addEventListener('click', () => {
      const index = move(Number(arrow.dataset.step));
      status.textContent = `${pieces[index].title}, ${index + 1} of ${pieces.length}`;
    });
  }

  const updateDots = () => {
    const current = indexAt(track.scrollLeft);
    [...dots.children].forEach((dot, index) => dot.classList.toggle('is-current', index === current));
  };
  track.addEventListener('scroll', updateDots, { passive: true });
  updateDots();

  // Autoplay runs only while nothing is pausing it. Each reason comes and
  // goes on its own, so moving the mouse away can't restart a slideshow
  // the visitor paused with the button.
  const reasons = new Set();
  let timer = null;

  // Skip a tick while the lightbox is open over the page
  const tick = () => {
    if (!lightbox.open) move(1);
  };

  const pauseFor = (reason, paused) => {
    if (paused) reasons.add(reason);
    else reasons.delete(reason);
    clearInterval(timer);
    timer = reasons.size === 0 ? setInterval(tick, AUTOPLAY_MS) : null;
    const userPaused = reasons.has('user');
    pause.setAttribute('aria-label', userPaused ? 'Play slideshow' : 'Pause slideshow');
    pause.classList.toggle('is-paused', userPaused);
  };

  // With reduced motion, autoplay starts off and the button reads "Play"
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  pauseFor('user', reduceMotion);

  pause.addEventListener('click', () => pauseFor('user', !reasons.has('user')));
  section.addEventListener('pointerenter', () => pauseFor('pointer', true));
  section.addEventListener('pointerleave', () => pauseFor('pointer', false));
  // Keyboard focus only: a mouse click also focuses a button in some browsers
  section.addEventListener('focusin', (event) => {
    if (event.target.matches(':focus-visible')) pauseFor('focus', true);
  });
  section.addEventListener('focusout', (event) => {
    if (!section.contains(event.relatedTarget)) pauseFor('focus', false);
  });
  document.addEventListener('visibilitychange', () => pauseFor('hidden', document.hidden));
  new IntersectionObserver(([entry]) => pauseFor('offscreen', !entry.isIntersecting)).observe(section);
}

function makeCard(template, piece, index, count) {
  const slide = template.content.firstElementChild.cloneNode(true); // the <li>
  const card = slide.querySelector('.card');
  const img = slide.querySelector('img');
  const description = piece.alt === piece.title ? piece.title : `${piece.alt}. ${piece.title}`;

  slide.setAttribute('aria-label', `${index + 1} of ${count}`);
  card.setAttribute('aria-label', [description, piece.year].filter(Boolean).join(', '));
  slide.querySelector('.card-title').textContent = piece.title;
  slide.querySelector('.card-year').textContent = piece.year;

  img.addEventListener('error', () => {
    card.classList.add('is-missing');
    console.warn(`Missing image: ${img.src}`);
  });
  img.src = `images/personal/${piece.file}.webp`;

  return slide;
}
