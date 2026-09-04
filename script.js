// Smooth anchor scroll and a11y focus management
(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function smoothScrollTo(targetId) {
    const el = document.getElementById(targetId);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 64; // header offset
    if (prefersReducedMotion) {
      window.scrollTo(0, top);
      el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    } else {
      window.scrollTo({ top, behavior: 'smooth' });
      setTimeout(() => {
        el.setAttribute('tabindex', '-1');
        el.focus({ preventScroll: true });
      }, 400);
    }
  }

  // Intercept anchor clicks for local hashes
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href')?.slice(1);
    if (!id) return;
    if (document.getElementById(id)) {
      e.preventDefault();
      smoothScrollTo(id);
      // collapse menu on nav click
      navList?.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  });

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();

