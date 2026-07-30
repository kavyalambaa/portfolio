/* ========================================================
   PROJECTS / MISSIONS GALLERY COMPONENT
   ======================================================== */

import { getProjects } from '../modules/supabase/dataService.js';
import { soundscape } from '../modules/audio/soundscape.js';

let allProjectsCache = [];

export async function renderProjects() {
  const projectsSection = document.createElement('section');
  projectsSection.id = 'projects';

  projectsSection.innerHTML = `
    <div class="section-header">
      <div class="speech-bubble" style="background: #ffe600; color: #0a0a14; margin-bottom: 12px;">FEATURED PROJECTS</div>
      <h2 class="glitch-text section-title" data-text="MY PROJECTS">MY PROJECTS</h2>
      <p class="section-subtitle">A collection of AI, web development and full stack projects built while exploring modern technologies.</p>
    </div>

    <!-- Category Filter Tabs -->
    <div id="project-filters" style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap; margin-bottom: 40px;">
      <button class="btn-spider btn-spider-secondary filter-btn active" data-category="ALL" style="padding: 8px 18px; font-size: 0.95rem;">ALL MISSIONS</button>
      <button class="btn-spider btn-spider-secondary filter-btn" data-category="Full Stack" style="padding: 8px 18px; font-size: 0.95rem;">FULL STACK</button>
      <button class="btn-spider btn-spider-secondary filter-btn" data-category="Backend & DevOps" style="padding: 8px 18px; font-size: 0.95rem;">BACKEND & DEVOPS</button>
      <button class="btn-spider btn-spider-secondary filter-btn" data-category="Creative Tech" style="padding: 8px 18px; font-size: 0.95rem;">CREATIVE TECH</button>
    </div>

    <!-- Projects Grid Container -->
    <div id="projects-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 32px;">
      <!-- Project Cards dynamically rendered -->
    </div>
  `;

  const mainContainer = document.getElementById('app') || document.body;
  mainContainer.appendChild(projectsSection);

  allProjectsCache = await getProjects();
  renderProjectCards(allProjectsCache);

  // Setup Category Filtering
  const filterBtns = projectsSection.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      soundscape.playClick();

      const cat = btn.dataset.category;
      if (cat === 'ALL') {
        renderProjectCards(allProjectsCache);
      } else {
        const filtered = allProjectsCache.filter(p => p.category === cat);
        renderProjectCards(filtered);
      }
    });
  });
}

function renderProjectCards(projects) {
  const grid = document.querySelector('#projects-grid');
  if (!grid) return;
  grid.innerHTML = '';

  if (projects.length === 0) {
    grid.innerHTML = `
      <div class="comic-panel" style="grid-column: 1/-1; padding: 40px; text-align: center; color: #94a3b8;">
        No active missions found in this dimension.
      </div>
    `;
    return;
  }

  projects.forEach(p => {
    const card = document.createElement('div');
    card.className = 'comic-panel comic-panel-skew project-card';
    card.style.cssText = `
      overflow: hidden;
      display: flex;
      flex-direction: column;
      background: rgba(13, 14, 27, 0.9);
      border: 3px solid #0a0a14;
      cursor: pointer;
    `;

    card.innerHTML = `
      <!-- Card Banner Image -->
      <div style="position: relative; width: 100%; height: 200px; overflow: hidden; border-bottom: 3px solid #0a0a14;">
        <img src="${p.image_url}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" class="project-img">
        <div style="position:absolute; top:12px; right:12px; display:flex; flex-direction:column; gap:8px; align-items:flex-end;">

  <div class="speech-bubble">
    ${p.category}
  </div>

  <div style="
      background:rgba(10,10,20,.85);
      border:2px solid #00f3ff;
      color:#fff;
      padding:6px 12px;
      border-radius:20px;
      font-size:.8rem;
      font-weight:bold;
      font-family:var(--font-code);
  ">
      ${p.status}
  </div>

</div>
      </div>

      <!-- Card Body -->
      <div style="padding: 24px; display: flex; flex-direction: column; flex: 1;">
        <h3 style="font-family: var(--font-comic); font-size: 1.8rem; color: #ffffff; margin-bottom: 8px;" class="glitch-text" data-text="${p.title}">
        <div style="
margin-bottom:12px;
display:flex;
gap:8px;
flex-wrap:wrap;
">

${p.featured ? `
<span style="
background:#ffe600;
color:#000;
padding:4px 10px;
border-radius:20px;
font-size:.75rem;
font-weight:bold;
">
⭐ Featured
</span>
` : ""}

</div>
          ${p.title}
        </h3>

        <p style="color: #94a3b8; font-size: 0.95rem; margin-bottom: 20px; flex: 1;">
          ${p.short_description || p.summary || ''}
        </p>

        <!-- Tech Stack Badges -->
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px;">
          ${(p.technologies || []).slice(0, 4).map(t => `<span class="comic-badge">${t}</span>`).join('')}
        </div>

        <button class="btn-spider view-project-btn" style="width: 100%; justify-content: center; font-size: 1.1rem;">
          🚀 VIEW PROJECT
        </button>
      </div>
    `;

    card.addEventListener('click', () => openProjectModal(p));
    grid.appendChild(card);
  });
}

function openProjectModal(project) {
  soundscape.playThwip();

  const modal = document.createElement('div');
  modal.id = 'project-modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(7, 7, 14, 0.88);
    backdrop-filter: blur(16px);
    z-index: 999999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: web-pull-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  `;

  modal.innerHTML = `
    <div class="comic-panel" style="width: 100%; max-width: 850px; max-height: 90vh; overflow-y: auto; background: #0a0a14; border: 3px solid #ff0055; box-shadow: 0 0 35px rgba(255,0,85,0.4); padding: 32px;">
      <!-- Modal Header -->
      <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; margin-bottom: 20px;">
        <div>
          <div class="speech-bubble" style="background: #00f3ff; color: #0a0a14; margin-bottom: 8px;">${project.category}</div>
          <h2 class="glitch-text" data-text="${project.title}" style="font-size: 2.4rem; color: #ffffff;">${project.title}</h2>
        </div>
        <button id="close-modal-btn" style="background: none; border: none; color: #ff0055; font-family: var(--font-comic); font-size: 2.2rem; cursor: pointer;">✕</button>
      </div>

      <!-- Banner Image -->
      <div style="width: 100%; height: 260px; border-radius: 8px; overflow: hidden; border: 3px solid #0a0a14; margin-bottom: 24px;">
        <img src="${project.image_url}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>

      <!-- Description -->
      <div style="margin-bottom: 24px;">
        <h4 style="font-family: var(--font-comic); font-size: 1.3rem; color: #00f3ff; margin-bottom: 6px;">ABOUT PROJECT</h4>
        <p style="color: #f0f6fc; line-height: 1.7; font-size: 1.05rem;">${project.full_description || project.description || ''}</p>
      </div>

      <!-- Technologies -->
      <div style="margin-bottom: 24px;">
        <h4 style="font-family: var(--font-comic); font-size: 1.3rem; color: #ffe600; margin-bottom: 8px;">TECH STACK</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
          ${(project.technologies || []).map(t => `<span class="comic-badge" style="font-size: 0.95rem; padding: 6px 14px;">${t}</span>`).join('')}
        </div>
      </div>

      <!-- Action Buttons (GitHub & Live Demo) -->
      <div style="display:flex;gap:16px;flex-wrap:wrap;">

${project.live_demo_url
? `<a href="${project.live_demo_url}" target="_blank" class="btn-spider">
🚀 LIVE DEMO
</a>`
: `<button class="btn-spider" disabled style="opacity:.6;cursor:not-allowed;">
🚧 COMING SOON
</button>`
}

${project.github_url
? `<a href="${project.github_url}" target="_blank" class="btn-spider btn-spider-secondary">
💻 GITHUB
</a>`
: ""}


    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector('#close-modal-btn').addEventListener('click', () => {
    modal.remove();
    soundscape.playClick();
  });
}
