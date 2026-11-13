// ===== Testimonials carousel (homepage) =====
(function() {
  const carousel = document.querySelector('.testi-carousel');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.testi-slide');
  let current = 0;
  let timer = null;

  function goTo(i) {
    slides[current].classList.remove('is-active');
    current = (i + slides.length) % slides.length;
    slides[current].classList.add('is-active');
  }

  function restart() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 6500);
  }

  carousel.querySelector('.testi-next').addEventListener('click', () => { goTo(current + 1); restart(); });
  carousel.querySelector('.testi-prev').addEventListener('click', () => { goTo(current - 1); restart(); });

  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', restart);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!reduceMotion.matches) restart();
})();

// ===== Cookie / storage consent banner (first visit, homepage only) =====
(function() {
  if (!document.body.hasAttribute('data-cookie-banner')) return; // only pages that opt in (the homepage)
  const KEY = 'cookie-consent-v2'; // bump to show the banner again after the text changes
  try {
    // index.html?cookies clears the saved choice so the banner can be tested again
    if (new URLSearchParams(location.search).has('cookies')) localStorage.removeItem(KEY);
    if (localStorage.getItem(KEY)) return;
  } catch (e) {
    return; // storage blocked — can't remember consent, skip the banner
  }

  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-label', 'הודעה על שמירת מידע');
  banner.innerHTML = `
    <div class="cookie-inner">
      <svg class="cookie-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9 3 3 0 0 1-3.5-3A3 3 0 0 1 14 5.5 3 3 0 0 1 12 3z"/><circle cx="8.5" cy="11" r="1"/><circle cx="12" cy="15.5" r="1"/><circle cx="15.5" cy="13" r="1"/><circle cx="9" cy="16" r=".6"/></svg>
      <p>אתר זה משתמש בעוגיות (Cookies) כדי לשפר את חוויית הגלישה שלך. לפרטים נוספים ניתן לעיין <a href="privacy.html">במדיניות הפרטיות</a>.</p>
      <div class="cookie-actions">
        <button type="button" class="cookie-accept">אישור</button>
        <button type="button" class="cookie-decline">דחייה</button>
      </div>
    </div>
  `;
  document.body.appendChild(banner);

  // Lift the accessibility button above the banner while it is shown
  const root = document.documentElement;
  const setHeight = () => root.style.setProperty('--cookie-h', banner.offsetHeight + 'px');
  setHeight();
  window.addEventListener('resize', setHeight);
  document.body.classList.add('has-cookie-banner');
  requestAnimationFrame(() => requestAnimationFrame(() => banner.classList.add('show')));

  function dismiss(choice) {
    try { localStorage.setItem(KEY, choice); } catch (e) {}
    banner.classList.remove('show');
    document.body.classList.remove('has-cookie-banner');
    window.removeEventListener('resize', setHeight);
    setTimeout(() => banner.remove(), 500);
  }
  banner.querySelector('.cookie-accept').addEventListener('click', () => dismiss('accepted'));
  banner.querySelector('.cookie-decline').addEventListener('click', () => dismiss('declined'));
})();

// ===== Mobile navigation toggle =====
(function() {
  const button = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (!button || !nav) return;

  // Close (X) button inside the drawer, top right
  const closeBtn = document.createElement('button');
  closeBtn.className = 'nav-close';
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', 'סגירת תפריט');
  closeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  nav.prepend(closeBtn);

  // Drawer logo — links back to the homepage
  const homeLogo = document.createElement('a');
  homeLogo.className = 'nav-home-logo';
  homeLogo.href = 'index.html';
  homeLogo.setAttribute('aria-label', 'לדף הבית');
  homeLogo.innerHTML = '<img src="images/rosemary_desert_logo.webp" alt="מתחם רוזמרין">';
  nav.prepend(homeLogo);

  function open() {
    button.setAttribute('aria-expanded', 'true');
    nav.classList.add('open');
    document.body.classList.add('nav-open');
  }

  function close() {
    button.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
    document.body.classList.remove('nav-open');
  }

  function toggle() {
    button.getAttribute('aria-expanded') === 'true' ? close() : open();
  }

  // Click hamburger
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    toggle();
  });

  // Click X inside the drawer
  closeBtn.addEventListener('click', close);

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  // Close when clicking outside drawer
  document.addEventListener('click', (e) => {
    if (button.getAttribute('aria-expanded') !== 'true') return;
    if (!nav.contains(e.target) && !button.contains(e.target)) close();
  });

  // Close when a link is clicked (after navigation)
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', close);
  });

  // Close when resizing back to desktop (drawer hidden, regular nav shown)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) close();
  });
})();
