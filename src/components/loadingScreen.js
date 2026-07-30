/* ========================================================
   CINEMATIC FULL-SCREEN MULTIVERSE OS LOADING SCREEN
   ======================================================== */

import { soundscape } from '../modules/audio/soundscape.js';
import { LoaderCanvas } from '../modules/canvas/loaderCanvas.js';

export function initLoadingScreen(onComplete) {
  const loaderEl = document.createElement('div');
  loaderEl.id = 'multiverse-loading-screen';
  loaderEl.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #07070e;
    z-index: 999999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
    font-family: var(--font-body);
  `;

  loaderEl.innerHTML = `
    <!-- Matrix Particle Canvas -->
    <canvas id="loader-matrix-canvas" style="position: absolute; top:0; left:0; width:100%; height:100%; pointer-events:none;"></canvas>
    
    <div style="position: relative; z-index: 2; text-align: center; max-width: 550px; width: 100%;">
      <!-- Spider-Verse Reticle Logo -->
      <div style="font-size: 3.5rem; margin-bottom: 16px; filter: drop-shadow(0 0 15px #00f3ff);" class="glitch-text" data-text="⚡">⚡</div>
      
      <h1 class="glitch-text" data-text="INITIALIZING MULTIVERSE..." style="font-size: 2.2rem; color: #ffe600; margin-bottom: 8px;">
        INITIALIZING MULTIVERSE...
      </h1>
      
      <div id="loader-status-text" style="font-family: var(--font-code); color: #00f3ff; font-size: 0.95rem; margin-bottom: 24px; min-height: 24px;">
        Connecting Systems...
      </div>

      <!-- Comic Progress Bar Container -->
      <div class="comic-panel" style="padding: 4px; border: 3px solid #0a0a14; background: #0a0a14; overflow: hidden; margin-bottom: 18px;">
        <div id="loader-progress-bar" style="width: 0%; height: 20px; background: linear-gradient(90deg, #00f3ff, #ff0055); border-radius: 4px; transition: width 0.15s linear; box-shadow: 0 0 12px #ff0055;"></div>
      </div>

      <div style="display: flex; justify-content: space-between; font-family: var(--font-code); color: #94a3b8; font-size: 0.85rem;">
        <span>SYSTEM STATUS: OPTIMAL</span>
        <span id="loader-percent-num" style="color: #ff0055; font-weight: bold;">0%</span>
      </div>
    </div>
  `;

  document.body.appendChild(loaderEl);

  new LoaderCanvas('loader-matrix-canvas');

  const progressBar = loaderEl.querySelector('#loader-progress-bar');
  const percentNum = loaderEl.querySelector('#loader-percent-num');
  const statusText = loaderEl.querySelector('#loader-status-text');

  const statusLogs = [
    'Loading Physics...',
    'Loading Assets...',
    'Loading Database...',
    'Connecting Systems...',
    'WELCOME TO THE MULTIVERSE!'
  ];

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 8;
    if (progress > 100) progress = 100;

    progressBar.style.width = `${progress}%`;
    percentNum.textContent = `${progress}%`;

    const logIndex = Math.min(Math.floor((progress / 100) * statusLogs.length), statusLogs.length - 1);
    statusText.textContent = statusLogs[logIndex];

    if (progress === 100) {
      clearInterval(interval);
      soundscape.playThwip();

      setTimeout(() => {
        // Fade out curtain
        loaderEl.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        loaderEl.style.opacity = '0';
        loaderEl.style.transform = 'scale(1.08)';

        setTimeout(() => {
          loaderEl.remove();
          if (onComplete) onComplete();
        }, 600);
      }, 500);
    }
  }, 120);
}
