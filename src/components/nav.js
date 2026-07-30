/* ========================================================
   WEB-HANGING NAVBAR COMPONENT
   ======================================================== */

import { soundscape } from '../modules/audio/soundscape.js';
import { isLiveSupabase } from '../modules/supabase/supabaseClient.js';

export function renderNav() {
  const navContainer = document.createElement('header');
  navContainer.id = 'main-header';
  navContainer.style.cssText = `
    position: fixed;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    width: 92%;
    max-width: 1200px;
    z-index: 9999;
    transition: all 0.3s ease;
  `;

  navContainer.innerHTML = `
    <nav class="comic-panel" style="padding: 10px 20px; display: flex; align-items: center; justify-content: space-between; border: 3px solid #0a0a14; background: rgba(10, 10, 20, 0.85); backdrop-filter: blur(14px);">
      <!-- Spider Brand Badge -->
      <a href="#hero" class="nav-brand" style="display: flex; align-items: center; gap: 10px; text-decoration: none;">
        <div style="width: 38px; height: 38px; background: #00f3ff; border: 2px solid #0a0a14; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-family: var(--font-comic); font-size: 1.5rem; color: #0a0a14; box-shadow: 3px 3px 0 #0a0a14;">
          ⚡
        </div>
        <div>
          <div style="font-family: var(--font-comic); font-size: 1.3rem; color: #ffffff; line-height: 1;" class="glitch-text" data-text="MULTIVERSE OS">MULTIVERSE OS</div>
          <div style="font-size: 0.7rem; font-family: var(--font-code); color: #00f3ff;">EARTH-1610 // PORTFOLIO</div>
        </div>
      </a>

      <!-- Web-Hanging Menu Links (Desktop) -->
      <ul id="nav-links-list" style="display: flex; align-items: center; gap: 18px; list-style: none;">
        <li><a href="#about" class="nav-link" data-section="about">ABOUT</a></li>
        <li><a href="#skills" class="nav-link" data-section="skills">SKILLS</a></li>
        <li><a href="#projects" class="nav-link" data-section="projects">MISSIONS</a></li>
        <li><a href="#github" class="nav-link" data-section="github">GITHUB</a></li>
        <li><a href="#experience" class="nav-link" data-section="experience">TIMELINE</a></li>
        <li><a href="#api-console" class="nav-link" data-section="api-console">API CONSOLE</a></li>
        <li><a href="#contact" class="nav-link" data-section="contact">CONTACT</a></li>
      </ul>

      <!-- Action Controls: Audio Toggle, CLI Terminal Launcher, Supabase Badge -->
      <div style="display: flex; align-items: center; gap: 12px;">
        <!-- Supabase Status Badge -->
        <div class="comic-badge" style="font-size: 0.75rem; background: ${isLiveSupabase ? 'rgba(0,255,102,0.15)' : 'rgba(255,230,0,0.15)'}; color: ${isLiveSupabase ? '#00ff66' : '#ffe600'}; border-color: ${isLiveSupabase ? '#00ff66' : '#ffe600'};">
          <span style="font-size: 0.8rem;">●</span> ${isLiveSupabase ? 'SUPABASE REALTIME' : 'HYBRID MOCK'}
        </div>

        <!-- Terminal Launcher Button -->
        <button id="nav-terminal-btn" class="btn-spider btn-spider-secondary" style="padding: 6px 12px; font-size: 0.9rem;" title="Open Developer CLI (~)">
          ⌨ CLI
        </button>

        <!-- Audio Toggle Button -->
        <button id="nav-audio-btn" class="btn-spider btn-spider-secondary" style="padding: 6px 12px; font-size: 0.9rem;" title="Toggle Ambient Audio">
          🔇 MUTE
        </button>

        <!-- Mobile Menu Toggle Button -->
        <button id="mobile-menu-btn" style="display: none; background: none; border: none; font-size: 1.8rem; color: #00f3ff; cursor: pointer;">
          ☰
        </button>
      </div>
    </nav>
  `;

  document.body.appendChild(navContainer);

  // Styling for Web-Hanging Nav Links
  const linkStyle = document.createElement('style');
  linkStyle.textContent = `
    .nav-link {
      font-family: var(--font-comic);
      font-size: 1.1rem;
      color: #f0f6fc;
      text-decoration: none;
      letter-spacing: 1px;
      position: relative;
      padding: 4px 8px;
      transition: color 0.2s ease, transform 0.2s ease;
    }
    .nav-link::before {
      content: '';
      position: absolute;
      top: -14px;
      left: 50%;
      transform: translateX(-50%);
      width: 2px;
      height: 12px;
      background: #00f3ff;
      opacity: 0.5;
      transition: height 0.2s ease, opacity 0.2s ease;
    }
    .nav-link:hover {
      color: #00f3ff;
      transform: translateY(2px) rotate(-2deg);
    }
    .nav-link:hover::before {
      height: 18px;
      opacity: 1;
      background: #ff0055;
    }
    .nav-link.active {
      color: #ffe600;
      text-shadow: 0 0 10px #ffe600;
    }
    @media (max-width: 900px) {
      #nav-links-list {
        display: none !important;
      }
      #mobile-menu-btn {
        display: block !important;
      }
    }
  `;
  document.head.appendChild(linkStyle);

  // Audio Toggle Handling
  const audioBtn = navContainer.querySelector('#nav-audio-btn');
  audioBtn.addEventListener('click', () => {
    const muted = soundscape.toggleMute();
    audioBtn.innerHTML = muted ? '🔇 MUTE' : '🔊 SOUND ON';
    audioBtn.style.color = muted ? '#00f3ff' : '#00ff66';
    audioBtn.style.borderColor = muted ? '#00f3ff' : '#00ff66';
  });

  // Terminal Button Launcher
  const terminalBtn = navContainer.querySelector('#nav-terminal-btn');
  terminalBtn.addEventListener('click', () => {
    if (window.openSpiderTerminal) window.openSpiderTerminal();
  });

  // Scrollspy active link highlighter
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 200;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.dataset.section === id) link.classList.add('active');
        });
      }
    });
  });
}
