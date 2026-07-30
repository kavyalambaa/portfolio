/* ========================================================
   SPIDER-VERSE ACHIEVEMENTS SYSTEM
   ======================================================== */

import { soundscape } from '../audio/soundscape.js';

class AchievementManager {
  constructor() {
    this.unlocked = new Set();
  }

  unlock(id, title, description) {
    if (this.unlocked.has(id)) return;
    this.unlocked.add(id);

    soundscape.playSuccess();

    const toast = document.createElement('div');
    toast.className = 'comic-panel achievement-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 99999;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 14px;
      border-left: 6px solid #ffe600;
      animation: toast-slide-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    `;

    toast.innerHTML = `
      <div style="font-size: 2.2rem; filter: drop-shadow(0 0 8px #ffe600);">🏆</div>
      <div>
        <div style="font-family: var(--font-comic); color: #ffe600; font-size: 1.2rem; text-transform: uppercase;">ACHIEVEMENT UNLOCKED!</div>
        <div style="font-weight: 700; color: #ffffff;">${title}</div>
        <div style="font-size: 0.85rem; color: #94a3b8;">${description}</div>
      </div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toast-slide-out 0.4s ease-in forwards';
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }
}

// Inject CSS keyframes for achievement toast
const style = document.createElement('style');
style.textContent = `
  @keyframes toast-slide-in {
    from { opacity: 0; transform: translateY(40px) scale(0.9); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes toast-slide-out {
    from { opacity: 1; transform: translateY(0) scale(1); }
    to { opacity: 0; transform: translateY(40px) scale(0.9); }
  }
`;
document.head.appendChild(style);

export const achievements = new AchievementManager();
