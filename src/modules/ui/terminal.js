/* ========================================================
   MULTIVERSE OS DEVELOPER CLI TERMINAL
   Triggered via ~ or Terminal button
   ======================================================== */

import { soundscape } from '../audio/soundscape.js';
import { spawnActionBubble } from './comicEffects.js';
import { achievements } from './achievements.js';

export function initDeveloperTerminal() {
  const modal = document.createElement('div');
  modal.id = 'developer-terminal-modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(7, 7, 14, 0.88);
    backdrop-filter: blur(12px);
    z-index: 99990;
    display: none;
    align-items: center;
    justify-content: center;
    padding: 20px;
  `;

  modal.innerHTML = `
    <div class="comic-panel" style="width: 100%; max-width: 800px; height: 500px; display: flex; flex-direction: column; background: #0a0a14; border: 3px solid #00f3ff; box-shadow: 0 0 30px rgba(0,243,255,0.4);">
      <!-- Terminal Header -->
      <div style="padding: 12px 18px; background: #121426; border-bottom: 2px solid #00f3ff; display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 8px; font-family: var(--font-code); color: #00f3ff; font-weight: bold; font-size: 0.95rem;">
          <span style="color: #ff0055;">●</span> MULTIVERSE OS CLI TERMINAL [v4.2.0]
        </div>
        <button id="close-terminal-btn" style="background: none; border: none; color: #ff0055; font-family: var(--font-comic); font-size: 1.5rem; cursor: pointer;">✕</button>
      </div>

      <!-- Terminal Output Screen -->
      <div id="terminal-output" style="flex: 1; padding: 18px; font-family: var(--font-code); font-size: 0.9rem; color: #f0f6fc; overflow-y: auto; display: flex; flex-direction: column; gap: 8px;">
        <div style="color: #ffe600;">Welcome to Multiverse Developer Terminal v4.2.0</div>
        <div style="color: #94a3b8;">Type <span style="color: #00f3ff;">'help'</span> to view available commands.</div>
      </div>

      <!-- Terminal Input Line -->
      <div style="padding: 12px 18px; background: #07070e; border-top: 1px solid #1e293b; display: flex; align-items: center; gap: 10px;">
        <span style="color: #ff0055; font-family: var(--font-code); font-weight: bold;">spider@multiverse:~$</span>
        <input type="text" id="terminal-input" placeholder="Type command here..." style="flex: 1; background: transparent; border: none; outline: none; font-family: var(--font-code); color: #00f3ff; font-size: 0.95rem;">
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const input = modal.querySelector('#terminal-input');
  const output = modal.querySelector('#terminal-output');
  const closeBtn = modal.querySelector('#close-terminal-btn');

  function openTerminal() {
    modal.style.display = 'flex';
    input.focus();
    soundscape.playGlitch();
    achievements.unlock('terminal_hacker', 'Terminal Hacker', 'Opened the Multiverse Developer CLI console!');
  }

  function closeTerminal() {
    modal.style.display = 'none';
  }

  closeBtn.addEventListener('click', closeTerminal);

  // Toggle on ~ key press
  window.addEventListener('keydown', (e) => {
    if (e.key === '`' || e.key === '~') {
      e.preventDefault();
      if (modal.style.display === 'flex') {
        closeTerminal();
      } else {
        openTerminal();
      }
    } else if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeTerminal();
    }
  });

  // Command Processor
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim().toLowerCase();
      input.value = '';
      if (!cmd) return;

      appendOutput(`spider@multiverse:~$ ${cmd}`, '#ff0055');
      processCommand(cmd, output, closeTerminal);
      soundscape.playClick();
      output.scrollTop = output.scrollHeight;
    }
  });

  // Expose function globally for button launcher
  window.openSpiderTerminal = openTerminal;
}

function appendOutput(text, color = '#f0f6fc') {
  const output = document.querySelector('#terminal-output');
  if (!output) return;
  const line = document.createElement('div');
  line.style.color = color;
  line.innerHTML = text;
  output.appendChild(line);
}

function processCommand(cmd, output, closeTerminal) {
  switch (cmd) {
    case 'help':
      appendOutput(`
        <div style="color: #00f3ff; font-weight: bold; margin-bottom: 4px;">AVAILABLE COMMANDS:</div>
        <div>- <span style="color:#ffe600;">projects</span> : Display active portfolio mission projects</div>
        <div>- <span style="color:#ffe600;">stats</span>    : Query live system stats & telemetry</div>
        <div>- <span style="color:#ffe600;">thwip</span>    : Shoot web projectile sound & visual effect</div>
        <div>- <span style="color:#ffe600;">dimension</span>: Display current Multiverse dimensional coordinates</div>
        <div>- <span style="color:#ffe600;">clear</span>    : Clear terminal screen</div>
        <div>- <span style="color:#ffe600;">exit</span>     : Exit CLI terminal</div>
      `);
      break;
    case 'projects':
      appendOutput(`
        <div style="color: #00ff66;">[1] Quantum Web-Grid Engine - High performance canvas simulation</div>
        <div style="color: #00ff66;">[2] Multiverse API Gateway - Distributed microservices gateway</div>
        <div style="color: #00ff66;">[3] Cyber-City Rain Synthesizer - Procedural Web Audio engine</div>
      `);
      break;
    case 'stats':
      appendOutput(`
        <div style="color: #00f3ff;">[+] Missions Completed: 28</div>
        <div style="color: #00f3ff;">[+] Public Repositories: 34</div>
        <div style="color: #00f3ff;">[+] API Latency: 14ms (Optimal)</div>
        <div style="color: #00f3ff;">[+] Web Engine FPS: 60 FPS</div>
      `);
      break;
    case 'thwip':
      spawnActionBubble('THWIP!', window.innerWidth / 2, window.innerHeight / 2);
      appendOutput(`THWIP! Web projectile deployed successfully.`, '#ffe600');
      break;
    case 'dimension':
      appendOutput(`DIMENSION: Earth-1610 [Spider-Verse Operating System]`, '#8a2be2');
      break;
    case 'clear':
      output.innerHTML = '';
      break;
    case 'exit':
      closeTerminal();
      break;
    default:
      appendOutput(`Command not recognized: '${cmd}'. Type 'help' for available commands.`, '#ff0055');
  }
}
