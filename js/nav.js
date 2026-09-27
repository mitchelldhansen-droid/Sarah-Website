// Header: the border that appears once the page scrolls, and the phone menu.
// The menu's open state lives in the button's aria-expanded attribute;
// the CSS reads that attribute to show or hide the menu.

export function initNav() {
  const header = document.querySelector('.site-header');
  const button = header.querySelector('.menu-button');
  const nav = header.querySelector('.site-nav');

  const updateBorder = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', updateBorder, { passive: true });
  updateBorder(); // the page can load already scrolled, e.g. after a refresh

  const isOpen = () => button.getAttribute('aria-expanded') === 'true';
  const setOpen = (open) => button.setAttribute('aria-expanded', String(open));

  button.addEventListener('click', () => setOpen(!isOpen()));

  // Close on a link tap
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });

  // Close on Esc, and put focus back on the button
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false);
      button.focus();
    }
  });

  // Close on a tap anywhere outside the menu and its button
  document.addEventListener('click', (event) => {
    if (isOpen() && !nav.contains(event.target) && !button.contains(event.target)) {
      setOpen(false);
    }
  });
}
