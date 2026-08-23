/* ========================================================
   MAIN APPLICATION ORCHESTRATOR & ES MODULE ENTRY
   ======================================================== */

import './style.css';

import { initLoadingScreen } from './components/loadingScreen.js';
import { renderNav } from './components/nav.js';
import { renderHero } from './components/hero.js';
import { renderStats } from './components/stats.js';
import { renderAbout } from './components/about.js';
import { renderSkills } from './components/skills.js';
import { renderProjects } from './components/projects.js';
import { renderGitHubSection } from './components/githubSection.js';
import { renderExperience } from './components/experience.js';
import { renderAchievements } from './components/achievements.js';
import { renderCertificates } from './components/certificates.js';
import { renderApiConsole } from './components/apiConsole.js';
import { renderContact } from './components/contact.js';
import { renderFooter } from './components/footer.js';

import { initCustomCursor } from './modules/ui/customCursor.js';
import { initGlobalActionBubbles } from './modules/ui/comicEffects.js';
import { initDeveloperTerminal } from './modules/ui/terminal.js';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Initialize UI Controls & Easter Eggs
  initCustomCursor();
  initGlobalActionBubbles();
  initDeveloperTerminal();

  // 2. Render Core Web App Layout Components
  renderNav();
await renderHero();
await renderStats();
  renderAbout();
  await renderSkills();
  await renderProjects();
  await renderGitHubSection();
  await renderExperience();
  await renderAchievements();
  await renderCertificates();
  renderApiConsole();
  renderContact();
  await renderFooter();

  // 3. Launch Cinematic Loading Experience
  initLoadingScreen(() => {
    console.log('⚡ MULTIVERSE OS PORTFOLIO INITIALIZED [EARTH-1610]');
  });
});
