/* ========================================================
   SPIDER-VERSE CUSTOM RETICLE CURSOR & PARTICLE TRAIL
   ======================================================== */

import { soundscape } from '../audio/soundscape.js';

export function initCustomCursor() {
  const cursor = document.createElement('div');
  cursor.id = 'custom-cursor';
  cursor.innerHTML = `
    <div class="cursor-ring"></div>
    <div class="cursor-dot"></div>
  `;
  document.body.appendChild(cursor);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  // Track mouse movements
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Create subtle glowing trail particle on move (capped for 60FPS performance)
    if (Math.random() < 0.3) {
      createCursorParticle(mouseX, mouseY);
    }
  });

  // Smooth lerp loop for cursor ring
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.25;
    cursorY += (mouseY - cursorY) * 0.25;
    
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    requestAnimationFrame(animateCursor);
  }
  requestAnimationFrame(animateCursor);

  // Click Pulse & Web Sound FX
  window.addEventListener('mousedown', (e) => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
    soundscape.playClick();
  });

  window.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
  });

  // Hover scaling over interactive elements
  const interactiveSelector = 'a, button, input, textarea, .comic-panel, .btn-spider, .nav-link';
  
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelector)) {
      cursor.classList.add('hovering');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelector)) {
      cursor.classList.remove('hovering');
    }
  });
}

function createCursorParticle(x, y) {
  const particle = document.createElement('div');
  particle.className = 'cursor-trail-particle';
  const size = Math.random() * 4 + 2;
  const colors = ['#00f3ff', '#ff0055', '#ffe600'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  particle.style.cssText = `
    position: fixed;
    top: ${y}px;
    left: ${x}px;
    width: ${size}px;
    height: ${size}px;
    background: ${color};
    border-radius: 50%;
    pointer-events: none;
    z-index: 99998;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 6px ${color};
    opacity: 0.8;
    transition: transform 0.4s ease-out, opacity 0.4s ease-out;
  `;

  document.body.appendChild(particle);

  requestAnimationFrame(() => {
    particle.style.transform = `translate(-50%, -50%) translate(${(Math.random() - 0.5) * 20}px, ${(Math.random() - 0.5) * 20}px) scale(0)`;
    particle.style.opacity = '0';
  });

  setTimeout(() => {
    particle.remove();
  }, 450);
}
