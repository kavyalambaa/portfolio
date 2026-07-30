/* ========================================================
   MULTIVERSE CAREER TIMELINE COMPONENT
   ======================================================== */

import { getExperience } from '../modules/supabase/dataService.js';

export async function renderExperience() {
  const experienceSection = document.createElement('section');
  experienceSection.id = 'experience';

  experienceSection.innerHTML = `
    <div class="section-header">
      <div class="speech-bubble" style="background: #8a2be2; color: #ffffff; margin-bottom: 12px;">EDUCATION</div>
      <h2 class="glitch-text section-title" data-text="EDUCATION TIMELINE">EDUCATION TIMELINE</h2>
      <p class="section-subtitle">Every hero has an origin story. Mine began in the classroom and continues through every project, every bug fixed, and every challenge conquered.</p>
    </div>

    <div id="experience-timeline" style="position: relative; max-width: 850px; margin: 0 auto;">
      <!-- Central Glowing Spider Web Line -->
      <div style="position: absolute; left: 50%; top: 0; bottom: 0; width: 3px; background: linear-gradient(180deg, #00f3ff, #ff0055, #ffe600); transform: translateX(-50%); opacity: 0.5;"></div>
      
      <!-- Dynamic Timeline Items Injected -->
    </div>
  `;

  const mainContainer = document.getElementById('app') || document.body;
  mainContainer.appendChild(experienceSection);

  const experiences = await getExperience();
  const timeline = experienceSection.querySelector('#experience-timeline');

  experiences.forEach((exp, idx) => {
    const isEven = idx % 2 === 0;
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.style.cssText = `
      position: relative;
      margin-bottom: 40px;
      display: flex;
      justify-content: ${isEven ? 'flex-start' : 'flex-end'};
    `;

    item.innerHTML = `
      <!-- Node Orb -->
      <div style="position: absolute; left: 50%; top: 20px; transform: translateX(-50%); width: 20px; height: 20px; border-radius: 50%; background: #00f3ff; border: 3px solid #0a0a14; box-shadow: 0 0 12px #00f3ff; z-index: 2;"></div>

      <div class="comic-panel" style="width: 45%; padding: 24px; background: rgba(13, 14, 27, 0.9); border: 3px solid #0a0a14;">
        <div class="speech-bubble" style="background:#00f3ff; color:#0a0a14; font-size:.8rem; margin-bottom:8px;">
  🎓 ${exp.duration}
</div>

        <h3 style="font-family: var(--font-comic); font-size: 1.6rem; color: #ffffff; margin-bottom: 4px;">
          ${exp.role}
        </h3>
        <div style="font-family: var(--font-code); color: #ffe600; font-size: 0.95rem; margin-bottom: 12px;">
          🏢 ${exp.institution}
        </div>

        <p style="color: #94a3b8; font-size: 0.95rem; margin-bottom: 14px;">
          ${exp.description}
        </p>

        <div style="display: flex; flex-wrap: wrap; gap: 6px;">
          ${(exp.technologies || []).map(t => `<span class="comic-badge" style="font-size: 0.75rem;">${t}</span>`).join('')}
        </div>
      </div>
    `;

    timeline.appendChild(item);
  });
}
