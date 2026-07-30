/* ========================================================
   GITHUB INTEGRATION SECTION COMPONENT
   ======================================================== */

import { fetchGitHubUserStats } from '../modules/github/githubService.js';

export async function renderGitHubSection() {
  const githubSection = document.createElement('section');
  githubSection.id = 'github';

  githubSection.innerHTML = `
    <div class="section-header">
      <div class="speech-bubble" style="background: #00ff66; color: #0a0a14; margin-bottom: 12px;">OPEN SOURCE WEBS</div>
      <h2 class="glitch-text section-title" data-text="GITHUB TELEMETRY">GITHUB TELEMETRY</h2>
      <p class="section-subtitle">Live repository telemetry, top languages, and commit activity from GitHub API.</p>
    </div>

    <div id="github-repos-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
      <!-- Dynamic GitHub Repos Injected -->
    </div>
  `;

  const mainContainer = document.getElementById('app') || document.body;
  mainContainer.appendChild(githubSection);

  const repos = await fetchGitHubUserStats();
  const grid = githubSection.querySelector('#github-repos-grid');

  repos.forEach(repo => {
    const card = document.createElement('div');
    card.className = 'comic-panel';
    card.style.cssText = `
      padding: 24px;
      background: rgba(13, 14, 27, 0.85);
      border: 3px solid #0a0a14;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `;

    card.innerHTML = `
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <h3 style="font-family: var(--font-comic); font-size: 1.4rem; color: #00f3ff;">
            📦 ${repo.name}
          </h3>
          <span class="comic-badge" style="font-size: 0.8rem;">${repo.language || 'JS'}</span>
        </div>

        <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 16px;">
          ${repo.description || 'Open source multiverse repository.'}
        </p>
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #1e293b; padding-top: 14px; font-family: var(--font-code); font-size: 0.85rem; color: #ffe600;">
        <div>⭐ ${repo.stargazers_count || 0} Stars</div>
        <div>🍴 ${repo.forks_count || 0} Forks</div>
        <a href="${repo.html_url}" target="_blank" style="color: #ff0055; text-decoration: none; font-weight: bold;">VIEW REPO →</a>
      </div>
    `;

    grid.appendChild(card);
  });
}
