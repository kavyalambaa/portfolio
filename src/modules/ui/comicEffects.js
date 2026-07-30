/* ========================================================
   SPIDER-VERSE COMIC ACTION BUBBLES & GLITCH EFFECTS
   ======================================================== */

import { soundscape } from '../audio/soundscape.js';

export function spawnActionBubble(text = 'THWIP!', x, y) {
  const bubble = document.createElement('div');
  bubble.className = 'floating-action-bubble';
  bubble.textContent = text;
  
  // Default to screen center if x, y not provided
  const posX = x !== undefined ? x : window.innerWidth / 2;
  const posY = y !== undefined ? y : window.innerHeight / 2;

  bubble.style.left = `${posX}px`;
  bubble.style.top = `${posY}px`;

  document.body.appendChild(bubble);

  // Play thwip or glitch audio
  if (text.includes('THWIP') || text.includes('ZIP')) {
    soundscape.playThwip();
  } else {
    soundscape.playGlitch();
  }

  setTimeout(() => {
    bubble.remove();
  }, 800);
}

export function initGlobalActionBubbles() {
  const actionWords = ['THWIP!', 'BAM!', 'WHOOSH!', 'ZIP!', 'SNAP!', 'POW!', 'SHWIP!'];
  
  document.addEventListener('click', (e) => {
    // Only spawn bubbles on specific interactive triggers or random 15% click chance
    const target = e.target.closest('button, .btn-spider, .nav-link, .project-card, .skill-card');
    if (target || Math.random() < 0.15) {
      const word = target && target.dataset.actionText ? target.dataset.actionText : actionWords[Math.floor(Math.random() * actionWords.length)];
      spawnActionBubble(word, e.clientX, e.clientY);
    }
  });
}
