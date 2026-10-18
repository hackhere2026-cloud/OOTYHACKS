(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const body = document.body;
  const motionButton = document.getElementById('motion-toggle');
  const header = document.getElementById('site-header');
  const landscape = document.getElementById('hero-landscape');
  const menuButton = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-nav');
  let paused = false;
  try { paused = localStorage.getItem('ooty-motion-paused') === 'true'; } catch { /* Storage is optional. */ }
  let scrollFrame = 0;
  const motionOff = () => paused || reduced.matches;
  function setMotion() {
    body.classList.toggle('motion-paused', motionOff());
    document.documentElement.style.scrollBehavior = motionOff() ? 'auto' : '';
    motionButton.setAttribute('aria-pressed', String(motionOff()));
    motionButton.textContent = reduced.matches ? 'Reduced motion enabled' : paused ? 'Resume motion' : 'Pause motion';
    motionButton.disabled = reduced.matches;
    if (motionOff()) landscape.style.transform = '';
  }
  motionButton.addEventListener('click', () => {
    paused = !paused;
    try { localStorage.setItem('ooty-motion-paused', String(paused)); } catch { /* Storage is optional. */ }
    setMotion();
  });
  reduced.addEventListener('change', setMotion);
  setMotion();
  function onScroll() {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      header.classList.toggle('scrolled', scrollY > 25);
      if (!motionOff() && scrollY < 1100 && innerWidth > 600) {
        landscape.style.transform = `translate3d(0,${Math.min(scrollY * 0.1, 90)}px,0)`;
      }
      scrollFrame = 0;
    });
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  function setMenu(open, restoreFocus = false) {
    menu.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (restoreFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => setMenu(menu.hidden));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) setMenu(false, true);
  });
  document.addEventListener('click', event => {
    if (!menu.hidden && !header.contains(event.target)) setMenu(false);
  });
  matchMedia('(min-width: 851px)').addEventListener('change', event => {
    if (event.matches) setMenu(false);
  });
  document.querySelectorAll('.data-bars i').forEach((bar, i) => bar.style.setProperty('--i', i));
  if ('IntersectionObserver' in window) {
    body.classList.add('motion-ready');
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 35px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }
  // Calendar-date countdown; no unannounced reporting time is implied.
  const eventStart = Date.parse('2026-12-19T00:00:00+05:30');
  const eventEnd = Date.parse('2026-12-21T00:00:00+05:30');
  const countdownIds = ['cd-days', 'cd-hours', 'cd-mins', 'cd-secs'];
  let countdownTimer;
  function updateCountdown() {
    const now = Date.now();
    const seconds = Math.max(0, Math.floor((eventStart - now) / 1000));
    const values = [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60];
    countdownIds.forEach((id, i) => { document.getElementById(id).textContent = String(values[i]).padStart(2, '0'); });
    document.getElementById('countdown-status').textContent = now >= eventEnd ? 'The 2026 expedition has concluded.' : now >= eventStart ? 'It’s expedition weekend. Welcome to Ooty.' : '19 December 2026 · Ooty, India';
  }
  function startCountdown() { clearInterval(countdownTimer); updateCountdown(); countdownTimer = setInterval(updateCountdown, 1000); }
  startCountdown();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearInterval(countdownTimer); else startCountdown();
  });
  const opening = document.getElementById('opening');
  let openingTimer = 0, closeTimer = 0, previousFocus;
  function finishIntro() {
    if (!opening.open || opening.classList.contains('is-leaving')) return;
    clearTimeout(openingTimer);
    body.classList.remove('intro-running');
    opening.classList.add('is-leaving');
    closeTimer = setTimeout(() => {
      opening.close();
      opening.classList.remove('is-leaving');
      if (previousFocus && previousFocus !== body && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
    }, motionOff() ? 0 : 500);
    try { sessionStorage.setItem('ooty-intro-seen', 'true'); } catch { /* Storage is optional. */ }
  }
  function startIntro(replay = false) {
    if (typeof opening.showModal !== 'function') return;
    if (!replay) {
      if (motionOff() || location.hash || new URLSearchParams(location.search).has('skipIntro')) return;
      try { if (sessionStorage.getItem('ooty-intro-seen') === 'true') return; } catch { /* Storage is optional. */ }
    }
    clearTimeout(openingTimer); clearTimeout(closeTimer);
    opening.classList.remove('is-leaving');
    previousFocus = document.activeElement;
    opening.showModal();
    body.classList.add('intro-running');
    document.getElementById('skip-opening').focus({ preventScroll: true });
    openingTimer = setTimeout(finishIntro, motionOff() ? 0 : 1800);
  }
  document.getElementById('skip-opening').addEventListener('click', finishIntro);
  document.getElementById('replay-opening').addEventListener('click', () => startIntro(true));
  opening.addEventListener('cancel', event => { event.preventDefault(); finishIntro(); });
  addEventListener('pagehide', () => { clearInterval(countdownTimer); clearTimeout(openingTimer); clearTimeout(closeTimer); cancelAnimationFrame(scrollFrame); body.classList.remove('intro-running'); if (opening.open) opening.close(); });
  addEventListener('pageshow', event => { if (event.persisted) startCountdown(); });
  startIntro();
})();
