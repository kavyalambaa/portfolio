/* ========================================================
   INTERACTIVE DEVELOPER API DASHBOARD & CONSOLE
   ======================================================== */

import {
  getProjects,
  getSkills,
  getExperience,
  getAchievements,
  getCertificates,
  getStatistics
} from '../modules/supabase/dataService.js';
import { fetchGitHubUserStats } from '../modules/github/githubService.js';
import { soundscape } from '../modules/audio/soundscape.js';

let requestHistory = [];

export function renderApiConsole() {
  const apiSection = document.createElement('section');
  apiSection.id = 'api-console';

  apiSection.innerHTML = `
    <div class="section-header">
      <div class="speech-bubble" style="background: #00f3ff; color: #0a0a14; margin-bottom: 12px;">RECRUITER & DEV TOOLS</div>
      <h2 class="glitch-text section-title" data-text="LIVE API CONSOLE">LIVE API CONSOLE</h2>
      <p class="section-subtitle">Execute simulated REST API queries against portfolio endpoints, inspect JSON responses, latency stats, and copy cURL snippets.</p>
    </div>

    <div class="comic-panel" style="max-width: 1050px; margin: 0 auto; padding: 28px; background: #0a0a14; border: 3px solid #00f3ff; box-shadow: 0 0 30px rgba(0, 243, 255, 0.3);">
      
      <!-- Top Query Control Bar -->
      <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 24px; align-items: center;">
        <select id="api-method-select" style="font-family: var(--font-code); background: #121426; color: #00ff66; border: 2px solid #00ff66; padding: 10px 16px; border-radius: 6px; font-weight: bold; outline: none;">
          <option value="GET">GET</option>
          <option value="POST">POST</option>
        </select>

        <select id="api-endpoint-select" style="flex: 1; min-width: 240px; font-family: var(--font-code); background: #121426; color: #00f3ff; border: 2px solid #00f3ff; padding: 10px 16px; border-radius: 6px; font-weight: bold; outline: none;">
          <option value="/api/v1/projects">/api/v1/projects</option>
          <option value="/api/v1/skills">/api/v1/skills</option>
          <option value="/api/v1/experience">/api/v1/experience</option>
          <option value="/api/v1/achievements">/api/v1/achievements</option>
          <option value="/api/v1/certificates">/api/v1/certificates</option>
          <option value="/api/v1/statistics">/api/v1/statistics</option>
          <option value="/api/v1/messages">/api/v1/messages (POST)</option>
          <option value="/api/v1/github-stats">/api/v1/github-stats</option>
        </select>

        <button id="execute-api-btn" class="btn-spider" style="padding: 10px 24px; font-size: 1rem;">
          ⚡ SEND REQUEST
        </button>
      </div>

      <!-- Telemetry Meta Bar (Status Code, Latency, Data Size) -->
      <div style="display: flex; align-items: center; justify-content: space-between; background: #121426; padding: 10px 18px; border-radius: 6px; margin-bottom: 16px; font-family: var(--font-code); font-size: 0.85rem; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 14px;">
          <span>STATUS: <strong id="api-status-badge" style="color: #00ff66; background: rgba(0,255,102,0.15); padding: 2px 8px; border-radius: 4px;">200 OK</strong></span>
          <span>LATENCY: <strong id="api-latency-val" style="color: #ffe600;">12 ms</strong></span>
          <span>FORMAT: <strong style="color: #00f3ff;">application/json</strong></span>
        </div>

        <div style="display: flex; gap: 10px;">
          <button id="copy-json-btn" class="btn-spider btn-spider-secondary" style="padding: 4px 10px; font-size: 0.8rem;">📋 COPY JSON</button>
          <button id="copy-curl-btn" class="btn-spider btn-spider-secondary" style="padding: 4px 10px; font-size: 0.8rem;">💻 COPY cURL</button>
        </div>
      </div>

      <!-- Formatted JSON Code Viewer -->
      <div style="position: relative; background: #07070e; border: 2px solid #1e293b; border-radius: 8px; padding: 18px; max-height: 420px; overflow-y: auto;">
        <pre id="api-json-output" style="font-family: var(--font-code); color: #00f3ff; font-size: 0.9rem; line-height: 1.5; white-space: pre-wrap;">
// Press 'SEND REQUEST' to query Multiverse API...
        </pre>
      </div>

      <!-- Request History Telemetry Log -->
      <div style="margin-top: 20px; border-top: 1px solid #1e293b; padding-top: 14px;">
        <div style="font-family: var(--font-code); font-size: 0.85rem; color: #ffe600; margin-bottom: 8px;">
          📜 REQUEST HISTORY LOG
        </div>
        <div id="request-history-list" style="display: flex; flex-direction: column; gap: 6px; font-family: var(--font-code); font-size: 0.8rem; max-height: 100px; overflow-y: auto; color: #94a3b8;">
          <div>[LOG] Ready for request telemetry execution.</div>
        </div>
      </div>
    </div>
  `;

  const mainContainer = document.getElementById('app') || document.body;
  mainContainer.appendChild(apiSection);

  const methodSelect = apiSection.querySelector('#api-method-select');
  const endpointSelect = apiSection.querySelector('#api-endpoint-select');
  const executeBtn = apiSection.querySelector('#execute-api-btn');
  const jsonOutput = apiSection.querySelector('#api-json-output');
  const statusBadge = apiSection.querySelector('#api-status-badge');
  const latencyVal = apiSection.querySelector('#api-latency-val');
  const historyList = apiSection.querySelector('#request-history-list');

  endpointSelect.addEventListener('change', () => {
    if (endpointSelect.value === '/api/v1/messages') {
      methodSelect.value = 'POST';
    } else {
      methodSelect.value = 'GET';
    }
  });

  async function executeRequest() {
    soundscape.playGlitch();
    executeBtn.textContent = '⏳ FETCHING...';
    jsonOutput.textContent = '// Querying inter-dimensional database...';

    const startTime = performance.now();
    const endpoint = endpointSelect.value;
    const method = methodSelect.value;
    let dataPayload = null;

    try {
      if (endpoint === '/api/v1/projects') dataPayload = await getProjects();
      else if (endpoint === '/api/v1/skills') dataPayload = await getSkills();
      else if (endpoint === '/api/v1/experience') dataPayload = await getExperience();
      else if (endpoint === '/api/v1/achievements') dataPayload = await getAchievements();
      else if (endpoint === '/api/v1/certificates') dataPayload = await getCertificates();
      else if (endpoint === '/api/v1/statistics') dataPayload = await getStatistics();
      else if (endpoint === '/api/v1/github-stats') dataPayload = await fetchGitHubUserStats();
      else if (endpoint === '/api/v1/messages') {
        dataPayload = {
          endpoint: '/api/v1/messages',
          method: 'POST',
          status: '201 Created',
          sample_body: {
            name: 'Miles Morales',
            email: 'miles@spider-verse.org',
            subject: 'Collaboration Opportunity',
            message: 'Incredible multiverse OS design!'
          }
        };
      }

      const endTime = performance.now();
      const latency = Math.round(endTime - startTime + Math.random() * 8 + 4);

      statusBadge.textContent = method === 'POST' ? '201 CREATED' : '200 OK';
      statusBadge.style.color = '#00ff66';
      statusBadge.style.background = 'rgba(0,255,102,0.15)';
      latencyVal.textContent = `${latency} ms`;

      jsonOutput.textContent = JSON.stringify(dataPayload, null, 2);

      // Append to request history log
      const timeStr = new Date().toLocaleTimeString();
      const logEntry = document.createElement('div');
      logEntry.style.color = '#00ff66';
      logEntry.textContent = `[${timeStr}] ${method} ${endpoint} -> 200 OK (${latency}ms)`;
      historyList.prepend(logEntry);

    } catch (e) {
      statusBadge.textContent = '500 ERROR';
      statusBadge.style.color = '#ff0055';
      jsonOutput.textContent = JSON.stringify({ error: e.message }, null, 2);
    }

    executeBtn.textContent = '⚡ SEND REQUEST';
  }

  executeBtn.addEventListener('click', executeRequest);

  // Copy Buttons
  apiSection.querySelector('#copy-json-btn').addEventListener('click', () => {
    navigator.clipboard.writeText(jsonOutput.textContent);
    soundscape.playClick();
    alert('JSON copied to clipboard!');
  });

  apiSection.querySelector('#copy-curl-btn').addEventListener('click', () => {
    const method = methodSelect.value;
    const endpoint = endpointSelect.value;
    const curl = `curl -X ${method} "https://spiderverse-portfolio.vercel.app${endpoint}" -H "Accept: application/json"`;
    navigator.clipboard.writeText(curl);
    soundscape.playClick();
    alert('cURL command copied to clipboard!');
  });

  // Execute initial default query
  executeRequest();
}
