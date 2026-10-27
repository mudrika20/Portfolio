/**
 * CELESTIAL ODYSSEY - LIGHT CANVAS ENGINE
 * Interactive stardust particles, constellation linkages, and gentle cosmic drift
 */

class CelestialCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.shootingStars = [];
    this.mouse = { x: null, y: null, radius: 120 };
    this.maxParticles = 55;
    this.connectionDistance = 110;

    // Light celestial color palette
    this.colors = [
      'rgba(229, 154, 42, 0.45)',  // Solar Gold
      'rgba(214, 93, 134, 0.40)',  // Nebula Rose
      'rgba(29, 138, 191, 0.38)',  // Celestial Cyan
      'rgba(107, 82, 196, 0.35)',  // Lunar Violet
      'rgba(180, 195, 230, 0.45)'  // Starlight White
    ];

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.maxParticles = Math.min(65, Math.floor((this.width * this.height) / 22000));
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    // Occasional shooting star
    setInterval(() => {
      if (Math.random() < 0.4 && this.shootingStars.length < 2) {
        this.createShootingStar();
      }
    }, 4500);
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 2.2 + 1,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        baseRadius: Math.random() * 2 + 1,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulseVal: Math.random() * Math.PI
      });
    }
  }

  createShootingStar() {
    const startX = Math.random() * this.width * 0.8;
    const startY = Math.random() * (this.height * 0.4);
    this.shootingStars.push({
      x: startX,
      y: startY,
      len: Math.random() * 80 + 60,
      speed: Math.random() * 6 + 7,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
      opacity: 0.8,
      life: 0,
      maxLife: 35
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Update & draw particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;

      // Pulse glow
      p.pulseVal += p.pulseSpeed;
      const currentRadius = p.baseRadius + Math.sin(p.pulseVal) * 0.7;

      // Mouse gentle gravitational drift
      if (this.mouse.x !== null) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.mouse.radius) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          p.x -= (dx / dist) * force * 1.2;
          p.y -= (dy / dist) * force * 1.2;
        }
      }

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.fill();

      // Connect nearby particles with delicate starlight lines
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.connectionDistance) {
          const alpha = (1 - dist / this.connectionDistance) * 0.18;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(180, 195, 230, ${alpha})`;
          this.ctx.lineWidth = 0.9;
          this.ctx.stroke();
        }
      }
    }

    // Update & draw shooting stars
    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const s = this.shootingStars[i];
      s.x += Math.cos(s.angle) * s.speed;
      s.y += Math.sin(s.angle) * s.speed;
      s.life++;
      s.opacity = Math.max(0, 0.8 - (s.life / s.maxLife) * 0.8);

      const tailX = s.x - Math.cos(s.angle) * s.len;
      const tailY = s.y - Math.sin(s.angle) * s.len;

      const grad = this.ctx.createLinearGradient(tailX, tailY, s.x, s.y);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      grad.addColorStop(1, `rgba(229, 154, 42, ${s.opacity})`);

      this.ctx.beginPath();
      this.ctx.moveTo(tailX, tailY);
      this.ctx.lineTo(s.x, s.y);
      this.ctx.strokeStyle = grad;
      this.ctx.lineWidth = 1.8;
      this.ctx.stroke();

      if (s.life >= s.maxLife || s.x > this.width || s.y > this.height) {
        this.shootingStars.splice(i, 1);
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

window.CelestialCanvas = CelestialCanvas;
