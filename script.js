// ===== Accessibility Widget =====
(function() {
  const allOptions = [
    { id: 'a11y-contrast',         label: 'ניגודיות',          icon: '<circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 0 0 20z" fill="currentColor" stroke="none"/>' },
    { id: 'a11y-highlight-links',  label: 'הדגשת קישורים',     icon: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>' },
    { id: 'a11y-large-text',       label: 'טקסט גדול',         icon: '<path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/><path d="M16 14v-2h6v2"/><path d="M19 12v8"/>' },
    { id: 'a11y-text-spacing',     label: 'ריווח טקסט',        icon: '<path d="M3 12h18"/><path d="M3 8l-2 4 2 4"/><path d="M21 8l2 4-2 4"/><path d="M7 12h10" stroke-dasharray="2 2"/>' },
    { id: 'a11y-line-height',      label: 'גובה שורה',         icon: '<path d="M3 5h18M3 19h18"/><path d="M3 11h12M3 14h12"/><path d="M19 9v6"/><path d="M17 9l2-2 2 2"/><path d="M17 15l2 2 2-2"/>' },
    { id: 'a11y-readable-font',    label: 'דיסלקציה',          icon: '<path d="M5 18V6h6a3 3 0 0 1 0 6H5"/><path d="M5 12h6.5a3 3 0 0 1 0 6H5"/><path d="M16 6v12"/><path d="M19 6h-3"/>' },
    { id: 'a11y-no-anim',          label: 'ביטול הנפשות',      icon: '<circle cx="12" cy="12" r="10"/><line x1="10" y1="9" x2="10" y2="15"/><line x1="14" y1="9" x2="14" y2="15"/>' },
    { id: 'a11y-hide-images',      label: 'הסתרת תמונות',      icon: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/><line x1="3" y1="3" x2="21" y2="21" stroke-width="2"/>' },
    { id: 'a11y-big-cursor',       label: 'סמן גדול',          icon: '<path d="M5 3l5 18 3-7 7-2z"/>' },
    { id: 'a11y-grayscale',        label: 'רוויה',             icon: '<path d="M12 22a10 10 0 0 0 0-20v20z" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="10"/>' },
    { id: 'a11y-text-align',       label: 'יישור טקסט',        icon: '<path d="M3 6h18"/><path d="M3 10h18"/><path d="M3 14h18"/><path d="M3 18h18"/>' },
    { id: 'a11y-tooltips',         label: 'תיאורים',           icon: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><circle cx="12" cy="11" r="0.5" fill="currentColor"/><path d="M12 8v3"/>' },
  ];

  const accessIcon = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="4" r="2"/><path d="M19 9h-5v13h-2v-6h-2v6H8V9H3V7h18v2z"/></svg>';
  const closeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  const resetIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>';

  // Build toggle button
  const btn = document.createElement('button');
  btn.className = 'a11y-toggle';
  btn.setAttribute('aria-label', 'הגדרות נגישות');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = accessIcon;
  document.body.appendChild(btn);

  // Build panel
  const panel = document.createElement('div');
  panel.className = 'a11y-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'הגדרות נגישות');
  panel.innerHTML = `
    <div class="a11y-panel-header">
      <h2>תפריט נגישות</h2>
      <button class="a11y-panel-close" aria-label="סגירה" type="button">${closeIcon}</button>
    </div>
    <div class="a11y-panel-body">
      <div class="a11y-options" role="group" aria-label="התאמות נגישות">
        ${allOptions.map(o => `
          <button class="a11y-option" data-opt="${o.id}" type="button" aria-pressed="false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${o.icon}</svg>
            <span>${o.label}</span>
          </button>
        `).join('')}
      </div>
    </div>
    <div class="a11y-panel-footer">
      <button class="a11y-reset" type="button">
        ${resetIcon}
        <span>איפוס כל הגדרות הנגישות</span>
      </button>
      <nav class="a11y-links" aria-label="מסמכים משפטיים">
        <a href="accessibility.html">הצהרת נגישות</a>
        <span aria-hidden="true">·</span>
        <a href="privacy.html">מדיניות פרטיות</a>
      </nav>
    </div>
  `;
  document.body.appendChild(panel);

  // Open/close panel
  function openPanel()  { panel.classList.add('open');    btn.setAttribute('aria-expanded', 'true'); }
  function closePanel() { panel.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
  btn.addEventListener('click', () => panel.classList.contains('open') ? closePanel() : openPanel());
  panel.querySelector('.a11y-panel-close').addEventListener('click', closePanel);

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePanel(); });

  // Restore saved state
  allOptions.forEach(o => {
    if (localStorage.getItem(o.id) === '1') {
      document.body.classList.add(o.id);
      const optBtn = panel.querySelector(`[data-opt="${o.id}"]`);
      if (optBtn) {
        optBtn.classList.add('active');
        optBtn.setAttribute('aria-pressed', 'true');
      }
    }
  });

  // Toggle each option
  panel.querySelectorAll('.a11y-option').forEach(optBtn => {
    optBtn.addEventListener('click', () => {
      const id = optBtn.dataset.opt;
      const isOn = document.body.classList.toggle(id);
      optBtn.classList.toggle('active', isOn);
      optBtn.setAttribute('aria-pressed', String(isOn));
      if (isOn) localStorage.setItem(id, '1'); else localStorage.removeItem(id);
    });
  });

  // Reset all
  panel.querySelector('.a11y-reset').addEventListener('click', () => {
    allOptions.forEach(o => {
      document.body.classList.remove(o.id);
      localStorage.removeItem(o.id);
      const optBtn = panel.querySelector(`[data-opt="${o.id}"]`);
      if (optBtn) {
        optBtn.classList.remove('active');
        optBtn.setAttribute('aria-pressed', 'false');
      }
    });
  });
})();

// ===== Mobile navigation toggle =====
(function() {
  const button = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (!button || !nav) return;

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
