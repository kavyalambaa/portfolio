/* ========================================================
   MULTIVERSE OS FOOTER COMPONENT
   ======================================================== */

import { getSocialLinks } from '../modules/supabase/dataService.js';

const SOCIAL_ICON_MAP = {
  github: 'GH',
  linkedin: 'in',
  'twitter': 'X',
  x: 'X',
  discord: 'D',
  youtube: 'YT',
  instagram: 'IG'
};

export async function renderFooter() {
  const footer = document.createElement('footer');
  footer.style.cssText = `
    position: relative;
    z-index: 3;
    background: #040409;
    border-top: 3px solid #0a0a14;
    padding: 60px 24px 30px;
    font-family: var(--font-body);
  `;

  footer.innerHTML = `
    <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 40px; margin-bottom: 40px;">
      
      <!-- Brand & Mission -->
      <div>
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">
          <div style="width: 36px; height: 36px; background: #00f3ff; border: 2px solid #0a0a14; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-family: var(--font-comic); font-size: 1.4rem; color: #0a0a14;">⚡</div>
          <span style="font-family: var(--font-comic); font-size: 1.5rem; color: #ffffff;">MULTIVERSE OS</span>
        </div>
        <p style="color: #94a3b8; font-size: 0.9rem; line-height: 1.6; margin-bottom: 14px;">
          An award-winning inspired interactive portfolio OS crafted with Vanilla JS, HTML5 Canvas Verlet physics, GSAP, and Supabase cloud.
        </p>
        <div id="footer-social-links" aria-live="polite" style="min-height: 32px; display: flex; align-items: center; flex-wrap: wrap; gap: 10px; font-family: var(--font-code); font-size: 0.8rem; color: #94a3b8;">
          Loading social links...
        </div>
      </div>

      <!-- Quick Navigation -->
      <div>
        <h4 style="font-family: var(--font-comic); color: #00f3ff; font-size: 1.2rem; margin-bottom: 14px;">NAVIGATION</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 0.9rem;">
          <li><a href="#about" style="color: #94a3b8; text-decoration: none;">About Architect</a></li>
          <li><a href="#skills" style="color: #94a3b8; text-decoration: none;">Tech Stack Skills</a></li>
          <li><a href="#projects" style="color: #94a3b8; text-decoration: none;">Featured Missions</a></li>
          <li><a href="#api-console" style="color: #94a3b8; text-decoration: none;">Developer API Console</a></li>
        </ul>
      </div>

      <!-- Shortcuts & System Status -->
      <div>
        <h4 style="font-family: var(--font-comic); color: #ffe600; font-size: 1.2rem; margin-bottom: 14px;">SYSTEM TERMINAL</h4>
        <div style="font-family: var(--font-code); font-size: 0.85rem; color: #94a3b8; display: flex; flex-direction: column; gap: 6px;">
          <div>[+] SHORTCUT: Press <span style="color: #00f3ff;">'~'</span> to open Developer CLI</div>
          <div>[+] DIMENSION: Earth-1610</div>
          <div>[+] SYSTEM UPTIME: 99.99%</div>
          <div>[+] FRAME RATE: 60 FPS (Hardware Accelerated)</div>
        </div>
      </div>
    </div>

    <!-- Bottom Copyright -->
    <div style="max-width: 1200px; margin: 0 auto; border-top: 1px solid #1e293b; padding-top: 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; font-size: 0.85rem; color: #64748b;">
      <div>© 2026 Multiverse OS. Original Spider-Verse inspired creative design.</div>
      <div style="color: #ff0055;">THWIP! Built for Awwwards & Production.</div>
    </div>
  `;

  const socialLinksContainer = footer.querySelector('#footer-social-links');

  try {
    const links = await getSocialLinks();
    const validLinks = Array.isArray(links)
      ? links.filter((link) => link && link.url && link.platform)
      : [];

    if (!validLinks.length) {
      socialLinksContainer.textContent = 'Social links unavailable.';
      return document.body.appendChild(footer);
    }

    const getDisplayInfo = (link) => {
      const platform = String(link.platform || 'Link').trim();
      const url = String(link.url || '').trim();

      if (/github/i.test(platform) || /github/i.test(url)) {
        try {
          const githubUser = new URL(url).pathname.replace(/^\/+|\/+$/g, '').split('/')[0] || 'kavyalambaa';
          return {
            label: 'GitHub',
            handle: '@' + githubUser
          };
        } catch {
          return { label: 'GitHub', handle: '@kavyalambaa' };
        }
      }

      if (/linkedin/i.test(platform) || /linkedin/i.test(url)) {
        try {
          const pathParts = new URL(url).pathname.split('/').filter(Boolean);
          const inIndex = pathParts.indexOf('in');
          const slug = inIndex >= 0 ? pathParts[inIndex + 1] : pathParts[0] || 'kavya-lamba';
          const name = slug
            .split('-')
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(' ');
          return { label: 'LinkedIn', handle: name || 'Kavya Lamba' };
        } catch {
          return { label: 'LinkedIn', handle: 'Kavya Lamba' };
        }
      }

      if (/x|twitter/i.test(platform) || /x\.com|twitter\.com/i.test(url)) {
        try {
          const username = new URL(url).pathname.replace(/^\/+|\/+$/g, '').split('/')[0] || 'KavyaLamba6731';
          return { label: 'X / Twitter', handle: '@' + username };
        } catch {
          return { label: 'X / Twitter', handle: '@KavyaLamba6731' };
        }
      }

      return {
        label: platform,
        handle: url.replace(/^https?:\/\//i, '').replace(/^www\./i, '').split('/')[0] || platform
      };
    };

    socialLinksContainer.style.display = 'flex';
    socialLinksContainer.style.flexDirection = 'column';
    socialLinksContainer.style.alignItems = 'flex-start';
    socialLinksContainer.style.gap = '10px';
    socialLinksContainer.style.minHeight = '0';

    socialLinksContainer.innerHTML = validLinks.map((link) => {
      const platform = String(link.platform || 'Link');
      const iconKey = String(link.icon || '').trim().toLowerCase();
      const iconText = SOCIAL_ICON_MAP[iconKey] || platform.slice(0, 1).toUpperCase();
      const { label, handle } = getDisplayInfo(link);
      return `
        <a
          href="${link.url}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="${platform}"
          title="${platform}"
          style="display: inline-flex; align-items: center; gap: 12px; width: max-content; padding: 8px 12px; border-radius: 12px; border: 1px solid rgba(0,243,255,0.2); background: rgba(10,10,20,0.76); color: #e2e8f0; text-decoration: none; transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease; box-shadow: 0 0 0 rgba(0,243,255,0);"
          onmouseover="this.style.transform='translateY(-1px)'; this.style.borderColor='rgba(0,243,255,0.55)'; this.style.boxShadow='0 0 18px rgba(0,243,255,0.13)';"
          onmouseout="this.style.transform=''; this.style.borderColor='rgba(0,243,255,0.2)'; this.style.boxShadow='0 0 0 rgba(0,243,255,0)';"
        >
          <span style="display: inline-flex; align-items: center; justify-content: center; width: 42px; height: 42px; border-radius: 50%; border: 1px solid rgba(0,243,255,0.45); background: rgba(2,6,23,0.9); color: #00f3ff; font-family: var(--font-comic); font-size: 0.82rem; font-weight: 700; letter-spacing: 0.05em; flex-shrink: 0;">${iconText}</span>
          <span style="display: flex; flex-direction: column; align-items: flex-start; justify-content: center; line-height: 1.2; min-width: 0;">
            <span style="font-family: var(--font-comic); color: #00f3ff; font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; white-space: nowrap;">${label}</span>
            <span style="font-family: var(--font-code); color: #f8fafc; font-size: 0.75rem; white-space: nowrap;">${handle}</span>
          </span>
        </a>
      `;
    }).join('');
  } catch (error) {
    console.warn('Footer social links failed to load.', error);
    socialLinksContainer.textContent = 'Social links unavailable.';
  }

  document.body.appendChild(footer);
}
