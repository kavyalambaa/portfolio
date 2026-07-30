/* ========================================================
   MULTIVERSE OS FOOTER COMPONENT
   ======================================================== */

export function renderFooter() {
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
        <p style="color: #94a3b8; font-size: 0.9rem; line-height: 1.6;">
          An award-winning inspired interactive portfolio OS crafted with Vanilla JS, HTML5 Canvas Verlet physics, GSAP, and Supabase cloud.
        </p>
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

  document.body.appendChild(footer);
}
