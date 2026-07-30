/* ========================================================
   FUTURISTIC CONTACT TRANSMISSION CONSOLE
   ======================================================== */

import { submitContactMessage } from '../modules/supabase/dataService.js';
import { soundscape } from '../modules/audio/soundscape.js';
import { spawnActionBubble } from '../modules/ui/comicEffects.js';
import { achievements } from '../modules/ui/achievements.js';

export function renderContact() {
  const contactSection = document.createElement('section');
  contactSection.id = 'contact';

  contactSection.innerHTML = `
    <div class="section-header">
      <div class="speech-bubble" style="background: #ff0055; color: #ffffff; margin-bottom: 12px;">SIGNAL TRANSMITTER</div>
      <h2 class="glitch-text section-title" data-text="TRANSMIT MESSAGE">TRANSMIT MESSAGE</h2>
      <p class="section-subtitle">Send a message directly across dimensions into the Supabase database portal.</p>
    </div>

    <div class="comic-panel comic-panel-skew" style="max-width: 750px; margin: 0 auto; padding: 36px; background: rgba(13, 14, 27, 0.92); border: 3px solid #0a0a14; box-shadow: 10px 10px 0 #ff0055;">
      <form id="spider-contact-form" style="display: flex; flex-direction: column; gap: 20px;">
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px;">
          <div>
            <label style="display: block; font-family: var(--font-comic); color: #00f3ff; font-size: 1.1rem; margin-bottom: 6px;">CODENAME / NAME *</label>
            <input type="text" id="contact-name" required placeholder="e.g. Peter Parker" style="width: 100%; background: #07070e; border: 2px solid #00f3ff; padding: 12px 16px; color: #ffffff; border-radius: 6px; font-family: var(--font-body); outline: none;">
          </div>

          <div>
            <label style="display: block; font-family: var(--font-comic); color: #00f3ff; font-size: 1.1rem; margin-bottom: 6px;">SIGNAL FREQUENCY / EMAIL *</label>
            <input type="email" id="contact-email" required placeholder="e.g. hero@multiverse.org" style="width: 100%; background: #07070e; border: 2px solid #00f3ff; padding: 12px 16px; color: #ffffff; border-radius: 6px; font-family: var(--font-body); outline: none;">
          </div>
        </div>

        <div>
          <label style="display: block; font-family: var(--font-comic); color: #ffe600; font-size: 1.1rem; margin-bottom: 6px;">MISSION SUBJECT *</label>
          <input type="text" id="contact-subject" required placeholder="e.g. Full Stack Engineering Opportunity" style="width: 100%; background: #07070e; border: 2px solid #ffe600; padding: 12px 16px; color: #ffffff; border-radius: 6px; font-family: var(--font-body); outline: none;">
        </div>

        <div>
          <label style="display: block; font-family: var(--font-comic); color: #ff0055; font-size: 1.1rem; margin-bottom: 6px;">TRANSMISSION CONTENT *</label>
          <textarea id="contact-message" required rows="5" placeholder="Write your message here..." style="width: 100%; background: #07070e; border: 2px solid #ff0055; padding: 12px 16px; color: #ffffff; border-radius: 6px; font-family: var(--font-body); outline: none; resize: vertical;"></textarea>
        </div>

        <!-- Status Feedback -->
        <div id="contact-status-feedback" style="display: none; padding: 14px; border-radius: 6px; font-family: var(--font-code); font-size: 0.95rem; text-align: center;"></div>

        <button type="submit" id="submit-contact-btn" class="btn-spider" style="width: 100%; justify-content: center; font-size: 1.2rem; margin-top: 10px;">
          🕸️ THWIP & TRANSMIT MESSAGE
        </button>
      </form>
    </div>
  `;

  const mainContainer = document.getElementById('app') || document.body;
  mainContainer.appendChild(contactSection);

  const form = contactSection.querySelector('#spider-contact-form');
  const submitBtn = contactSection.querySelector('#submit-contact-btn');
  const feedback = contactSection.querySelector('#contact-status-feedback');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = contactSection.querySelector('#contact-name').value.trim();
    const email = contactSection.querySelector('#contact-email').value.trim();
    const subject = contactSection.querySelector('#contact-subject').value.trim();
    const content = contactSection.querySelector('#contact-message').value.trim();

    if (!name || !email || !subject || !content) return;

    // Trigger Web Shoot Visual & Audio
    soundscape.playThwip();
    spawnActionBubble('THWIP!', window.innerWidth / 2, window.innerHeight / 2);

    submitBtn.disabled = true;
    submitBtn.textContent = '⏳ FIRING WEB TRANSMISSION...';

    // Submit to Supabase
    const result = await submitContactMessage({
      sender_name: name,
      sender_email: email,
      subject,
      content,
      dimension: 'Earth-1610'
    });

    soundscape.playSuccess();
    achievements.unlock('signal_transmitter', 'Signal Transmitter', 'Sent a message through the Multiverse portal!');

    feedback.style.display = 'block';
    feedback.style.background = 'rgba(0, 255, 102, 0.15)';
    feedback.style.border = '2px solid #00ff66';
    feedback.style.color = '#00ff66';
    feedback.innerHTML = `⚡ THWIP! Message transmitted successfully to Supabase! [${result.isLive ? 'LIVE DB' : 'SESSION MOCK'}]`;

    form.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = '🕸️ THWIP & TRANSMIT MESSAGE';

    setTimeout(() => {
      feedback.style.display = 'none';
    }, 6000);
  });
}
