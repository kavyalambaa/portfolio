/* ========================================================
   ABOUT SECTION COMPONENT
   Comic Character Stats Card, Glitch Biography, Multiverse Origin
   ======================================================== */
import { supabase } from '../modules/supabase/supabaseClient.js';

export async function renderAbout() {
  const aboutSection = document.createElement('section');
  aboutSection.id = 'about';
  const { data } = await supabase
  .from('about')
  .select('*')
  .single();

const about = data || {};

  aboutSection.innerHTML = `
    <div class="section-header">
      <div class="speech-bubble" style="background: #ff0055; color: #ffffff; margin-bottom: 12px;">${about.heading}</div>
      <h2 class="glitch-text section-title" data-text="${about.subtitle}">${about.subtitle}</h2>
      <p class="section-subtitle">Bridging the gap between full stack web performance, interactive physics graphics, and inter-dimensional APIs.</p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 36px; align-items: center;">
      <!-- Comic Character Bio Card -->
      <div class="comic-panel comic-panel-skew" style="padding: 32px; background: rgba(13, 14, 27, 0.9); border: 3px solid #0a0a14; box-shadow: 8px 8px 0 #00f3ff;">
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #00f3ff; padding-bottom: 16px; margin-bottom: 20px;">
          <div>
            <h3 style="font-family: var(--font-comic); font-size: 1.8rem; color: #ffe600; line-height: 1;">${about.name}</h3>
            <div style="font-family: var(--font-code); font-size: 0.85rem; color: #00f3ff;">${about.alias}</div>
          </div>
          <div style="font-size: 2.2rem; filter: drop-shadow(0 0 10px #ff0055);">🕷️</div>
        </div>

        <p style="margin-bottom: 20px; color: #f0f6fc; line-height: 1.7; font-size: 1.05rem;">
          ${about.bio}
        </p>

        <!-- Character Attributes / Stats Meters -->
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; color: #00f3ff; margin-bottom: 4px;">
              <span>${about.skill1}</span>
              <span>${about.skill1_percent}%</span>
            </div>
            <div style="height: 10px; background: #0a0a14; border-radius: 5px; overflow: hidden; border: 1px solid #00f3ff;">
              <div style="width: ${about.skill1_percent}%;; height: 100%; background: linear-gradient(90deg, #00f3ff, #ff0055);"></div>
            </div>
          </div>

          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; color: #ffe600; margin-bottom: 4px;">
              <span>${about.skill2}</span>
              <span>${about.skill2_percent}%</span>
            </div>
            <div style="height: 10px; background: #0a0a14; border-radius: 5px; overflow: hidden; border: 1px solid #ffe600;">
              <div style="width: ${about.skill2_percent}%; height: 100%; background: linear-gradient(90deg, #ffe600, #8a2be2);"></div>
            </div>
          </div>

          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; color: #00ff66; margin-bottom: 4px;">
              <span>${about.skill3}</span>
              <span>${about.skill3_percent}%</span>
            </div>
            <div style="height: 10px; background: #0a0a14; border-radius: 5px; overflow: hidden; border: 1px solid #00ff66;">
              <div style="width: ${about.skill3_percent}%; height: 100%; background: linear-gradient(90deg, #00ff66, #00f3ff);"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Multiverse Bio Details & Key Pillars -->
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div class="comic-panel" style="padding: 24px; border: 3px solid #0a0a14; background: rgba(18, 20, 38, 0.8);">
          <div style="font-family: var(--font-comic); font-size: 1.4rem; color: #00f3ff; margin-bottom: 8px;">
            ${about.pillar1_title}
          </div>
          <p style="color: #94a3b8; font-size: 0.95rem;">
            ${about.pillar1_description}
          </p>
        </div>

        <div class="comic-panel" style="padding: 24px; border: 3px solid #0a0a14; background: rgba(18, 20, 38, 0.8);">
          <div style="font-family: var(--font-comic); font-size: 1.4rem; color: #ff0055; margin-bottom: 8px;">
            ${about.pillar2_title}
          </div>
          <p style="color: #94a3b8; font-size: 0.95rem;">
            ${about.pillar2_description}
          </p>
        </div>

        <div class="comic-panel" style="padding: 24px; border: 3px solid #0a0a14; background: rgba(18, 20, 38, 0.8);">
          <div style="font-family: var(--font-comic); font-size: 1.4rem; color: #ffe600; margin-bottom: 8px;">
            ${about.pillar3_title}
          </div>
          <p style="color: #94a3b8; font-size: 0.95rem;">
            ${about.pillar3_description}
          </p>
        </div>
      </div>
    </div>
  `;

  const mainContainer = document.getElementById('app') || document.body;
  mainContainer.appendChild(aboutSection);
}
