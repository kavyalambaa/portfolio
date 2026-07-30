/* ========================================================
   HERO SECTION COMPONENT
   Interactive swinging logo physics, neon city skyline, rain & web shooter
   ======================================================== */

import { RainSkylineCanvas } from '../modules/canvas/rainSkylineCanvas.js';
import { VerletWebCanvas } from '../modules/canvas/verletWebCanvas.js';
import { supabase } from '../modules/supabase/supabaseClient.js';

export async function renderHero() {
  const heroSection = document.createElement('section');
  heroSection.id = 'hero';
  const { data } = await supabase
  .from('hero')
  .select('*')
  .limit(1)
  .single();

const hero = data || {};
console.log("SUPABASE DATA:", data);
console.log("HERO:", hero);
  heroSection.style.cssText = `
    min-height: 100vh;
    width: 100%;
    max-width: 100%;
    padding: 0;
    margin: 0;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  `;

  heroSection.innerHTML = `
    <!-- Background Canvas 1: Parallax Skyline, Rain, Moon & Fog -->
    <canvas id="hero-skyline-canvas" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;"></canvas>

    <!-- Background Canvas 2: Verlet Rope Physics & Swinging Web Logo -->
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 2; pointer-events: auto;">
      <canvas id="hero-web-canvas"></canvas>
    </div>

    <!-- Foreground Content Container -->
    <div style="position: relative; z-index: 4; text-align: center; max-width: 900px; padding: 120px 24px 60px; pointer-events: none;">
      <!-- Dimension Tag Badge -->
      <div style="pointer-events: auto; display: inline-block; margin-bottom: 16px;">
        <div class="speech-bubble" style="background: #ffe600; color: #0a0a14;">
          ${hero.badge}
        </div>
      </div>

      <!-- Main Headline Glitch Typography -->
      <h1 class="glitch-text" data-text="INTERACTIVE MULTIVERSE OS" style="font-size: clamp(3rem, 7vw, 5.8rem); line-height: 1.05; margin-bottom: 20px; color: #ffffff;">
        ${hero.title}
      </h1>

      <p style="font-size: clamp(1.1rem, 2.2vw, 1.4rem); color: #00f3ff; max-width: 720px; margin: 0 auto 36px; font-weight: 600; text-shadow: 0 0 10px rgba(0, 243, 255, 0.4);">
        ${hero.subtitle}
      </p>

      <!-- Action Buttons -->
      <div style="display: flex; align-items: center; justify-content: center; gap: 20px; flex-wrap: wrap; pointer-events: auto;">
        <a href="#projects" class="btn-spider" data-action-text="THWIP!">
          ${hero.primary_button}
        </a>
        <a href="#api-console" class="btn-spider btn-spider-secondary" data-action-text="BAM!">
          ${hero.secondary_button}
        </a>
      </div>

      <!-- Hint Banner for Web Shooter & Physics Dragging -->
      <div style="margin-top: 40px; font-family: var(--font-code); color: #94a3b8; font-size: 0.85rem; pointer-events: auto; display: inline-flex; align-items: center; gap: 10px; background: rgba(10,10,20,0.6); padding: 8px 16px; border-radius: 20px; border: 1px solid rgba(0,243,255,0.3);">
        <span style="color: #ff0055;">💡 PRO TIP:</span> Click anywhere to shoot spider webs or drag the swinging logo badge!
      </div>
    </div>
  `;

  const mainContainer = document.getElementById('app') || document.body;
  mainContainer.appendChild(heroSection);

  // Initialize Canvas Physics & Skyline
  setTimeout(() => {
    new RainSkylineCanvas('hero-skyline-canvas');
    new VerletWebCanvas('hero-web-canvas');
  }, 100);
}
