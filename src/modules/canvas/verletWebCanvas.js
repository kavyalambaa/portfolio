/* ========================================================
   VERLET PHYSICS WEB ENGINE & SWINGING LOGO CANVAS
   ======================================================== */

import { soundscape } from '../audio/soundscape.js';

export class VerletWebCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.width = 0;
    this.height = 0;

    this.points = [];
    this.constraints = [];
    this.webShooterLines = [];

    this.logoNode = null;
    this.isDraggingLogo = false;

    this.mouseX = 0;
    this.mouseY = 0;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.setupPhysicsRope();

    // Mouse Dragging Logic for Swinging Logo
    this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    window.addEventListener('mouseup', () => this.handleMouseUp());

    // Touch Support for Mobile
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        this.handleMouseDown({ clientX: touch.clientX, clientY: touch.clientY });
      }
    });
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        this.handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
      }
    });
    window.addEventListener('touchend', () => this.handleMouseUp());

    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.width = this.canvas.width = rect.width;
    this.height = this.canvas.height = rect.height;
  }

  setupPhysicsRope() {
    this.points = [];
    this.constraints = [];

    const segments = 12;
    const startX = this.width / 2;
    const startY = 20;
    const segmentLength = 22;

    // Anchor top point
    let prevPoint = {
      x: startX,
      y: startY,
      oldX: startX,
      oldY: startY,
      pinned: true
    };
    this.points.push(prevPoint);

    // Create physics chain segments
    for (let i = 1; i <= segments; i++) {
      const p = {
        x: startX + i * 2,
        y: startY + i * segmentLength,
        oldX: startX + i * 2,
        oldY: startY + i * segmentLength,
        pinned: false,
        isLogo: i === segments
      };
      this.points.push(p);

      this.constraints.push({
        p1: prevPoint,
        p2: p,
        length: segmentLength
      });

      prevPoint = p;
    }

    this.logoNode = this.points[this.points.length - 1];
  }

  handleMouseDown(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    // Distance to logo node
    const dist = Math.hypot(mx - this.logoNode.x, my - this.logoNode.y);

    if (dist < 60) {
      this.isDraggingLogo = true;
      soundscape.playThwip();
    } else {
      // Shoot sticky web line to click position
      this.shootWebLine(mx, my);
    }
  }

  handleMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouseX = e.clientX - rect.left;
    this.mouseY = e.clientY - rect.top;

    if (this.isDraggingLogo) {
      this.logoNode.x = this.mouseX;
      this.logoNode.y = this.mouseY;
      this.logoNode.oldX = this.mouseX;
      this.logoNode.oldY = this.mouseY;
    }
  }

  handleMouseUp() {
    if (this.isDraggingLogo) {
      this.isDraggingLogo = false;
      soundscape.playThwip();
    }
  }

  shootWebLine(targetX, targetY) {
    soundscape.playThwip();
    this.webShooterLines.push({
      startX: this.logoNode.x,
      startY: this.logoNode.y,
      targetX,
      targetY,
      progress: 0,
      opacity: 1
    });
  }

  updatePhysics() {
    const gravity = 0.45;
    const friction = 0.985;

    // 1. Verlet Integration
    this.points.forEach(p => {
      if (!p.pinned && p !== (this.isDraggingLogo ? this.logoNode : null)) {
        const vx = (p.x - p.oldX) * friction;
        const vy = (p.y - p.oldY) * friction;

        p.oldX = p.x;
        p.oldY = p.y;

        p.x += vx;
        p.y += vy + gravity;
      }
    });

    // 2. Satisfy Constraints (Relaxation iterations)
    for (let iter = 0; iter < 6; iter++) {
      this.constraints.forEach(c => {
        const dx = c.p2.x - c.p1.x;
        const dy = c.p2.y - c.p1.y;
        const dist = Math.hypot(dx, dy);

        if (dist === 0) return;
        const delta = (c.length - dist) / dist * 0.5;

        const offX = dx * delta;
        const offY = dy * delta;

        if (!c.p1.pinned) {
          c.p1.x -= offX;
          c.p1.y -= offY;
        }
        if (!c.p2.pinned && c.p2 !== (this.isDraggingLogo ? this.logoNode : null)) {
          c.p2.x += offX;
          c.p2.y += offY;
        }
      });
    }
  }

  drawSpiderWebMatrix() {
    // Draw background giant web matrix behind the logo
    const centerX = this.width / 2;
    const centerY = this.height * 0.4;
    const rings = 5;
    const spokes = 8;
    const maxRadius = Math.min(this.width, this.height) * 0.4;

    this.ctx.strokeStyle = 'rgba(0, 243, 255, 0.12)';
    this.ctx.lineWidth = 1;

    // Radial spokes
    for (let i = 0; i < spokes; i++) {
      const angle = (i * Math.PI * 2) / spokes;
      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY);
      this.ctx.lineTo(centerX + Math.cos(angle) * maxRadius, centerY + Math.sin(angle) * maxRadius);
      this.ctx.stroke();
    }

    // Concentric web polygon rings
    for (let r = 1; r <= rings; r++) {
      const radius = (maxRadius / rings) * r;
      this.ctx.beginPath();
      for (let i = 0; i <= spokes; i++) {
        const angle = (i * Math.PI * 2) / spokes;
        const wx = centerX + Math.cos(angle) * radius;
        const wy = centerY + Math.sin(angle) * radius;
        if (i === 0) this.ctx.moveTo(wx, wy);
        else this.ctx.lineTo(wx, wy);
      }
      this.ctx.stroke();
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw Giant Web Matrix
    this.drawSpiderWebMatrix();

    // 2. Physics Step
    this.updatePhysics();

    // 3. Render Rope Web Lines
    this.ctx.strokeStyle = '#00f3ff';
    this.ctx.shadowColor = '#00f3ff';
    this.ctx.shadowBlur = 8;
    this.ctx.lineWidth = 2.5;

    this.ctx.beginPath();
    this.points.forEach((p, idx) => {
      if (idx === 0) this.ctx.moveTo(p.x, p.y);
      else this.ctx.lineTo(p.x, p.y);
    });
    this.ctx.stroke();
    this.ctx.shadowBlur = 0;

    // 4. Render Dynamic Web Shooter Lines
    this.webShooterLines.forEach((line, index) => {
      line.progress += 0.1;
      line.opacity -= 0.02;

      const currX = line.startX + (line.targetX - line.startX) * Math.min(line.progress, 1);
      const currY = line.startY + (line.targetY - line.startY) * Math.min(line.progress, 1);

      this.ctx.strokeStyle = '#ff0055';
      this.ctx.shadowColor = '#ff0055';
      this.ctx.shadowBlur = 10;
      this.ctx.lineWidth = 3;
      this.ctx.globalAlpha = Math.max(line.opacity, 0);

      this.ctx.beginPath();
      this.ctx.moveTo(line.startX, line.startY);
      this.ctx.lineTo(currX, currY);
      this.ctx.stroke();

      if (line.opacity <= 0) {
        this.webShooterLines.splice(index, 1);
      }
    });
    this.ctx.globalAlpha = 1.0;
    this.ctx.shadowBlur = 0;

    // 5. Render Swinging Logo Badge Node
    const lx = this.logoNode.x;
    const ly = this.logoNode.y;

    this.ctx.save();
    this.ctx.translate(lx, ly);

    // Glowing Neon Badge Background
    this.ctx.fillStyle = '#0a0a14';
    this.ctx.strokeStyle = this.isDraggingLogo ? '#ff0055' : '#00f3ff';
    this.ctx.lineWidth = 3;
    this.ctx.shadowColor = this.isDraggingLogo ? '#ff0055' : '#00f3ff';
    this.ctx.shadowBlur = 15;

    this.ctx.beginPath();
    this.ctx.arc(0, 0, 36, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();

    // Spider-Verse Reticle Logo Symbol
    this.ctx.strokeStyle = '#ffe600';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(-12, 0); this.ctx.lineTo(12, 0);
    this.ctx.moveTo(0, -12); this.ctx.lineTo(0, 12);
    this.ctx.stroke();

    this.ctx.fillStyle = '#ff0055';
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 6, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.restore();

    requestAnimationFrame(this.animate);
  }
}
