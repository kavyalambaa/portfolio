/* ========================================================
   WEB-HANGING NAVBAR COMPONENT
   ======================================================== */

import { soundscape } from '../modules/audio/soundscape.js';
import { isLiveSupabase } from '../modules/supabase/supabaseClient.js';

const NAV_SECTIONS = [
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'MISSIONS' },
  { id: 'github', label: 'GITHUB' },
  { id: 'experience', label: 'TIMELINE' },
  { id: 'api-console', label: 'API CONSOLE' },
  { id: 'contact', label: 'CONTACT' }
];

function buildNavLinks(className) {
  return NAV_SECTIONS.map(({ id, label }) =>
    `<li><a href="#${id}" class="nav-link" data-section="${id}">${label}</a></li>`
  ).join('');
}

export function renderNav() {
  const navContainer = document.createElement('header');
  navContainer.id = 'main-header';

  const statusColor = isLiveSupabase ? '#00ff66' : '#ffe600';
  const statusBg = isLiveSupabase ? 'rgba(0,255,102,0.15)' : 'rgba(255,230,0,0.15)';
  const statusLabel = isLiveSupabase ? 'SUPABASE LIVE' : 'HYBRID MOCK';

  navContainer.innerHTML = `
    <nav class="main-nav comic-panel" aria-label="Main navigation">
      <a href="#hero" class="nav-brand" data-section="hero" aria-label="Back to top">
        <div class="nav-brand-badge" aria-hidden="true">⚡</div>
        <div>
          <div class="nav-brand-title glitch-text" data-text="MULTIVERSE OS">MULTIVERSE OS</div>
          <div class="nav-brand-subtitle">EARTH-1610 // PORTFOLIO</div>
        </div>
      </a>

      <ul id="nav-links-list" class="nav-links-desktop" role="list">
        ${buildNavLinks()}
      </ul>

      <div class="nav-actions">
        <div
          class="comic-badge nav-status-badge"
          style="background: ${statusBg}; color: ${statusColor}; border-color: ${statusColor};"
          title="${statusLabel}"
        >
          <span aria-hidden="true">●</span>
          <span class="nav-status-label">${statusLabel}</span>
        </div>

        <button
          id="nav-terminal-btn"
          class="btn-spider btn-spider-secondary nav-action-btn"
          type="button"
          title="Open Developer CLI (~)"
        >
          ⌨ CLI
        </button>

        <button
          id="nav-audio-btn"
          class="btn-spider btn-spider-secondary nav-action-btn"
          type="button"
          title="Toggle Ambient Audio"
        >
          🔇 MUTE
        </button>

        <button
          id="mobile-menu-btn"
          type="button"
          aria-label="Open navigation menu"
          aria-expanded="false"
          aria-controls="nav-mobile-panel"
        >
          <span class="nav-hamburger-icon" aria-hidden="true">☰</span>
        </button>
      </div>
    </nav>

    <div id="nav-mobile-panel" class="nav-mobile-panel" aria-hidden="true">
      <div class="comic-panel">
        <ul class="nav-links-mobile" role="list">
          ${buildNavLinks()}
        </ul>
        <div class="nav-mobile-actions">
          <button id="nav-mobile-terminal-btn" class="btn-spider btn-spider-secondary nav-action-btn" type="button">
            ⌨ CLI
          </button>
          <button id="nav-mobile-audio-btn" class="btn-spider btn-spider-secondary nav-action-btn" type="button">
            🔇 MUTE
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(navContainer);

  const mobileMenuBtn = navContainer.querySelector('#mobile-menu-btn');
  const mobilePanel = navContainer.querySelector('#nav-mobile-panel');
  const audioBtn = navContainer.querySelector('#nav-audio-btn');
  const mobileAudioBtn = navContainer.querySelector('#nav-mobile-audio-btn');
  const terminalBtn = navContainer.querySelector('#nav-terminal-btn');
  const mobileTerminalBtn = navContainer.querySelector('#nav-mobile-terminal-btn');

  function setMobileMenuOpen(isOpen) {
    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    mobilePanel.classList.toggle('is-open', isOpen);
    mobilePanel.setAttribute('aria-hidden', String(!isOpen));
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  function toggleMobileMenu() {
    const isOpen = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    setMobileMenuOpen(!isOpen);
    soundscape.playClick();
  }

  function updateAudioButtons(muted) {
    const label = muted ? '🔇 MUTE' : '🔊 SOUND ON';
    const color = muted ? '#00f3ff' : '#00ff66';
    const borderColor = muted ? '#00f3ff' : '#00ff66';

    [audioBtn, mobileAudioBtn].forEach((btn) => {
      if (!btn) return;
      btn.innerHTML = label;
      btn.style.color = color;
      btn.style.borderColor = borderColor;
    });
  }

  function toggleAudio() {
    const muted = soundscape.toggleMute();
    updateAudioButtons(muted);
    soundscape.playClick();
  }

  function openTerminal() {
    if (window.openSpiderTerminal) window.openSpiderTerminal();
  }

  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  audioBtn.addEventListener('click', toggleAudio);
  mobileAudioBtn.addEventListener('click', toggleAudio);
  terminalBtn.addEventListener('click', openTerminal);
  mobileTerminalBtn.addEventListener('click', () => {
    openTerminal();
    closeMobileMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMobileMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 960) closeMobileMenu();
  });

  function getScrollOffset() {
    return navContainer.offsetHeight + 16;
  }

  function smoothScrollTo(target) {
    const offset = getScrollOffset();
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }

  navContainer.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      smoothScrollTo(target);
      closeMobileMenu();
      soundscape.playClick();
    });
  });

  function setActiveSection(sectionId) {
    navContainer.querySelectorAll('.nav-link').forEach((link) => {
      link.classList.toggle('active', link.dataset.section === sectionId);
    });

    const brand = navContainer.querySelector('.nav-brand');
    if (brand) {
      brand.classList.toggle('nav-brand-active', sectionId === 'hero');
    }
  }

  function initScrollSpy() {
    const sectionIds = ['hero', ...NAV_SECTIONS.map(({ id }) => id)];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: `-${getScrollOffset()}px 0px -45% 0px`,
        threshold: [0, 0.15, 0.35, 0.55]
      }
    );

    sections.forEach((section) => observer.observe(section));

    if (window.scrollY < 80) {
      setActiveSection('hero');
    }
  }

  function initStickyState() {
    const onScroll = () => {
      navContainer.classList.toggle('nav-scrolled', window.scrollY > 24);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  initStickyState();

  // Sections render after nav; defer scroll-spy until layout is ready
  requestAnimationFrame(() => {
    requestAnimationFrame(initScrollSpy);
  });
}
