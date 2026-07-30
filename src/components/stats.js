/* ========================================================
   ANIMATED METRIC STATISTICS SECTION
   ======================================================== */

import { getStatistics } from '../modules/supabase/dataService.js';

export async function renderStats() {
  const statsSection = document.createElement('section');
  statsSection.id = 'stats-section';
  statsSection.style.cssText = `
    padding-top: 40px;
    padding-bottom: 60px;
  `;

  statsSection.innerHTML = `
    <div id="stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px;">
      <!-- Stats dynamically injected -->
    </div>
  `;

  const mainContainer = document.getElementById('app') || document.body;
  mainContainer.appendChild(statsSection);

  const rawStats = await getStatistics();
  
  // Format statistics object or array safely
  let items = [];
  if (Array.isArray(rawStats)) {
    items = rawStats;
  } else if (rawStats && typeof rawStats === 'object') {
    items = [
      { label: 'TOTAL PROJECTS', value: rawStats.total_projects || 28, suffix: '+' },
      { label: 'GITHUB REPOS', value: rawStats.github_repositories || 34, suffix: '+' },
      { label: 'TECHNOLOGIES', value: rawStats.technologies || 18, suffix: '+' },
      { label: 'CERTIFICATES', value: rawStats.certificates || 8, suffix: '+' },
      { label: 'ACHIEVEMENTS', value: rawStats.achievements || 5, suffix: '+' }
    ];
  }

  const grid = statsSection.querySelector('#stats-grid');

  items.forEach(s => {
    const card = document.createElement('div');
    card.className = 'comic-panel comic-panel-skew';
    card.style.cssText = `
      padding: 24px 16px;
      text-align: center;
      background: rgba(13, 14, 27, 0.85);
      border: 3px solid #0a0a14;
    `;

    card.innerHTML = `
      <div style="font-family: var(--font-comic); font-size: 2.8rem; color: #00f3ff; line-height: 1; margin-bottom: 6px; text-shadow: 2px 2px 0 #0a0a14;">
        <span class="counter-num" data-target="${s.value}">0</span>${s.suffix || ''}
      </div>
      <div style="font-size: 0.9rem; font-weight: 700; color: #ffffff; text-transform: uppercase; letter-spacing: 0.5px;">
        ${s.label}
      </div>
    `;

    grid.appendChild(card);
  });

  // Animate counter numbers on intersection
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.counter-num').forEach(counter => {
          const target = parseInt(counter.dataset.target, 10);
          let current = 0;
          const step = Math.max(Math.ceil(target / 30), 1);
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              counter.textContent = target;
              clearInterval(timer);
            } else {
              counter.textContent = current;
            }
          }, 35);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(statsSection);
}
