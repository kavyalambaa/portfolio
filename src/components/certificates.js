/* ========================================================
   CERTIFICATES SECTION COMPONENT
   ======================================================== */

import { getCertificates } from '../modules/supabase/dataService.js';

export async function renderCertificates() {
  const section = document.createElement('section');
  section.id = 'certificates';

  section.innerHTML = `
    <div class="section-header">
      <div class="speech-bubble" style="background: #00f3ff; color: #0a0a14; margin-bottom: 12px;">VERIFIED CREDENTIALS</div>
      <h2 class="glitch-text section-title" data-text="CERTIFICATIONS">CERTIFICATIONS</h2>
      <p class="section-subtitle">Official credentials, cloud architecture degrees, and specialized engineering domain certificates.</p>
    </div>

    <div id="certificates-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
      <!-- Dynamic cards injected -->
    </div>
  `;

  const mainContainer = document.getElementById('app') || document.body;
  mainContainer.appendChild(section);

  const certificates = await getCertificates();
  const grid = section.querySelector('#certificates-grid');

  certificates.forEach(cert => {
    const card = document.createElement('div');
    card.className = 'comic-panel';
    card.style.cssText = `
      padding: 24px;
      background: rgba(13, 14, 27, 0.88);
      border: 3px solid #0a0a14;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `;

    card.innerHTML = `
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <div style="font-size: 2rem; filter: drop-shadow(0 0 10px #00f3ff);">📜</div>
          <div class="comic-badge" style="background: rgba(0,243,255,0.15); color: #00f3ff; border-color: #00f3ff;">
            ${cert.badge || 'VERIFIED CREDENTIAL'}
          </div>
        </div>

        <h3 style="font-family: var(--font-comic); font-size: 1.4rem; color: #ffffff; margin-bottom: 6px;">
          ${cert.certificate_name}
        </h3>

        <div style="font-family: var(--font-code); font-size: 0.9rem; color: #ffe600; margin-bottom: 12px;">
          🏛️ ${cert.issuer}
        </div>
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 14px; font-family: var(--font-code); font-size: 0.85rem;">
        <span style="color: #94a3b8;">ISSUED: ${cert.issue_date}</span>
        ${cert.credential_url ? `
          <a href="${cert.credential_url}" target="_blank" class="btn-spider btn-spider-secondary" style="padding: 4px 10px; font-size: 0.75rem; text-decoration: none;">
            🔍 VERIFY
          </a>
        ` : ''}
      </div>
    `;

    grid.appendChild(card);
  });
}
