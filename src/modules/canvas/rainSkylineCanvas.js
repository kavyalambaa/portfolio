/* ========================================================
   PARALLAX NEON CITY SKYLINE & CINEMATIC RAIN CANVAS
   ======================================================== */

export class RainSkylineCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.width = 0;
    this.height = 0;
    
    this.rainDrops = [];
    this.clouds = [];
    this.buildings = [];
    
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 40;
    });

    this.createBuildings();
    this.createClouds();
    this.createRain();

    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.createBuildings();
  }

  createBuildings() {
    this.buildings = [];
    const layers = 3; // 3 parallax depth layers
    
    for (let l = 0; l < layers; l++) {
      const layerBuildings = [];
      let x = -50;
      const layerSpeed = (l + 1) * 0.3;
      const minWidth = 60 + l * 30;
      const maxWidth = 120 + l * 40;
      const baseHeightRatio = 0.35 + l * 0.15;

      while (x < this.width + 100) {
        const w = minWidth + Math.random() * (maxWidth - minWidth);
        const h = this.height * (baseHeightRatio + Math.random() * 0.25);
        layerBuildings.push({
          x,
          width: w,
          height: h,
          color: l === 0 ? '#0b0c1b' : l === 1 ? '#070814' : '#040409',
          windows: this.generateWindows(w, h, l),
          layer: l
        });
        x += w + Math.random() * 10;
      }
      this.buildings.push(layerBuildings);
    }
  }

  generateWindows(bWidth, bHeight, layer) {
    const windows = [];
    const cols = Math.floor(bWidth / 18);
    const rows = Math.floor(bHeight / 24);
    const colors = ['#00f3ff', '#ff0055', '#ffe600', '#8a2be2'];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (Math.random() < 0.4) {
          windows.push({
            x: 8 + c * 16,
            y: 12 + r * 22,
            w: 8,
            h: 12,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: Math.random() * 0.8 + 0.2
          });
        }
      }
    }
    return windows;
  }

  createClouds() {
    this.clouds = [];
    for (let i = 0; i < 6; i++) {
      this.clouds.push({
        x: Math.random() * this.width,
        y: Math.random() * (this.height * 0.3),
        radius: 80 + Math.random() * 120,
        speed: 0.15 + Math.random() * 0.2
      });
    }
  }

  createRain() {
    this.rainDrops = [];
    const count = window.innerWidth < 768 ? 120 : 250;
    for (let i = 0; i < count; i++) {
      this.rainDrops.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        length: 12 + Math.random() * 18,
        speed: 14 + Math.random() * 10,
        opacity: 0.2 + Math.random() * 0.4
      });
    }
  }

  animate() {
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Cyber Sky Gradient
    const skyGrad = this.ctx.createLinearGradient(0, 0, 0, this.height);
    skyGrad.addColorStop(0, '#04040a');
    skyGrad.addColorStop(0.5, '#0a0a18');
    skyGrad.addColorStop(1, '#0e0e24');
    this.ctx.fillStyle = skyGrad;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // 2. Glowing Moon
    const moonX = this.width * 0.75 + this.mouseX * 0.2;
    const moonY = this.height * 0.2;
    const moonGlow = this.ctx.createRadialGradient(moonX, moonY, 10, moonX, moonY, 140);
    moonGlow.addColorStop(0, 'rgba(0, 243, 255, 0.9)');
    moonGlow.addColorStop(0.3, 'rgba(255, 0, 85, 0.3)');
    moonGlow.addColorStop(1, 'transparent');
    
    this.ctx.fillStyle = moonGlow;
    this.ctx.beginPath();
    this.ctx.arc(moonX, moonY, 140, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.fillStyle = '#f0f6fc';
    this.ctx.beginPath();
    this.ctx.arc(moonX, moonY, 45, 0, Math.PI * 2);
    this.ctx.fill();

    // 3. Moving Clouds
    this.ctx.fillStyle = 'rgba(138, 43, 226, 0.08)';
    this.clouds.forEach(c => {
      c.x += c.speed;
      if (c.x - c.radius > this.width) c.x = -c.radius;

      this.ctx.beginPath();
      this.ctx.arc(c.x + this.mouseX * 0.3, c.y, c.radius, 0, Math.PI * 2);
      this.ctx.fill();
    });

    // 4. Parallax Buildings & Neon Windows
    this.buildings.forEach((layerBuildings, lIdx) => {
      const offsetX = this.mouseX * (0.2 + lIdx * 0.3);
      layerBuildings.forEach(b => {
        const drawX = b.x + offsetX;
        const drawY = this.height - b.height;

        this.ctx.fillStyle = b.color;
        this.ctx.fillRect(drawX, drawY, b.width, b.height);

        // Draw neon glowing windows
        b.windows.forEach(w => {
          this.ctx.fillStyle = w.color;
          this.ctx.globalAlpha = w.alpha;
          this.ctx.fillRect(drawX + w.x, drawY + w.y, w.w, w.h);
        });
        this.ctx.globalAlpha = 1.0;
      });
    });

    // 5. Cinematic Rain Drops
    this.ctx.strokeStyle = '#00f3ff';
    this.ctx.lineWidth = 1.2;
    this.rainDrops.forEach(r => {
      r.y += r.speed;
      r.x -= 1.5;

      if (r.y > this.height) {
        r.y = -20;
        r.x = Math.random() * this.width;
      }

      this.ctx.globalAlpha = r.opacity;
      this.ctx.beginPath();
      this.ctx.moveTo(r.x, r.y);
      this.ctx.lineTo(r.x - 3, r.y + r.length);
      this.ctx.stroke();
    });
    this.ctx.globalAlpha = 1.0;

    requestAnimationFrame(this.animate);
  }
}
