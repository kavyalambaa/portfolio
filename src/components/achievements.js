/* ========================================================
   ACHIEVEMENTS SECTION COMPONENT
   ======================================================== */

import { getAchievements } from '../modules/supabase/dataService.js';

export async function renderAchievements() {
  const section = document.createElement('section');
  section.id = 'achievements';

  section.innerHTML = `
    <div class="section-header">
      <div class="speech-bubble" style="background: #ffe600; color: #0a0a14; margin-bottom: 12px;">MILESTONES</div>
      <h2 class="glitch-text section-title" data-text="MULTIVERSE ACHIEVEMENTS">MULTIVERSE ACHIEVEMENTS</h2>
      <p class="section-subtitle">Celebrating milestones, certifications, competitions, and the journey of continuous learning.</p>
    </div>

    <div id="achievements-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
      <!-- Dynamic cards injected -->
    </div>
  `;

  const mainContainer = document.getElementById('app') || document.body;
  mainContainer.appendChild(section);

  const achievements = await getAchievements();
  const grid = section.querySelector('#achievements-grid');

  achievements.forEach(item => {
    const card = document.createElement('div');
    card.className = 'comic-panel comic-panel-skew';
    card.style.cssText = `
      padding: 24px;
      background: rgba(13, 14, 27, 0.88);
      border: 3px solid #0a0a14;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `;

    card.innerHTML = `
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
          <div style="font-size: 2rem; filter: drop-shadow(0 0 10px #ffe600);">🏆</div>
          <span class="speech-bubble" style="background: #ff0055; color: #ffffff; font-size: 0.75rem;">
            ${item.badge || 'MILESTONE'}
          </span>
        </div>

        <h3 style="font-family: var(--font-comic); font-size: 1.5rem; color: #ffffff; margin-bottom: 8px;" class="glitch-text" data-text="${item.title}">
          ${item.title}
        </h3>

        <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.6; margin-bottom: 16px;">
          ${item.description}
        </p>
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px; font-family: var(--font-code); font-size: 0.85rem; color: #00f3ff;">
        <span>DATE: ${item.date}</span>
        <span>ACHIEVED</span>
      </div>
    `;

    grid.appendChild(card);
  });
}
