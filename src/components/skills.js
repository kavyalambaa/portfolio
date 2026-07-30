/* ========================================================
   SKILLS SECTION COMPONENT
   ======================================================== */

import { getSkills } from '../modules/supabase/dataService.js';

export async function renderSkills() {
  const skillsSection = document.createElement('section');
  skillsSection.id = 'skills';

  skillsSection.innerHTML = `
    <div class="section-header">
      <div class="speech-bubble" style="background: #00f3ff; color: #0a0a14; margin-bottom: 12px;">TECH WEAPONRY</div>
      <h2 class="glitch-text section-title" data-text="MULTIVERSE SKILL MATRIX">MULTIVERSE SKILL MATRIX</h2>
      <p class="section-subtitle">Core technologies, frameworks, and developer tools fetched dynamically from Supabase.</p>
    </div>

    <div id="skills-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
      <!-- Dynamic Skills Cards Injected -->
    </div>
  `;

  const mainContainer = document.getElementById('app') || document.body;
  mainContainer.appendChild(skillsSection);

  const skills = await getSkills();
  const grid = skillsSection.querySelector('#skills-grid');

  skills.forEach(skill => {
    const card = document.createElement('div');
    card.className = 'comic-panel skill-card';
    card.style.cssText = `
      padding: 24px;
      background: rgba(13, 14, 27, 0.85);
      border: 3px solid #0a0a14;
    `;

    const name = skill.skill_name || skill.name;
    const pct = skill.percentage !== undefined ? skill.percentage : skill.proficiency;

    card.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 10px; height: 10px; border-radius: 50%; background: #00f3ff; box-shadow: 0 0 8px #00f3ff;"></div>
          <h3 style="font-family: var(--font-comic); font-size: 1.4rem; color: #ffffff; letter-spacing: 0.5px;">
            ${name}
          </h3>
        </div>
        <div style="font-family: var(--font-code); color: #ff0055; font-weight: bold; font-size: 1.1rem;">
          ${pct}%
        </div>
      </div>

      <!-- Animated Web Progress Bar -->
      <div style="position: relative; height: 12px; background: #0a0a14; border-radius: 6px; overflow: hidden; border: 1px solid #1e293b;">
        <div class="skill-web-bar" style="width: 0%; height: 100%; background: linear-gradient(90deg, #00f3ff, #ff0055); transition: width 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); box-shadow: 0 0 10px #ff0055;" data-progress="${pct}"></div>
      </div>
    `;

    grid.appendChild(card);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-web-bar').forEach(bar => {
          bar.style.width = `${bar.dataset.progress}%`;
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(skillsSection);
}
