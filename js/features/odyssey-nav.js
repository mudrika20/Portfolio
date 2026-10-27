/**
 * FEATURE: ODYSSEY FLIGHT RAIL & NAVIGATION CONTROLLER
 * Tracks user altitude through the solar system and powers smooth waypoint cruising
 */

class OdysseyNav {
  constructor() {
    this.nav = document.querySelector('.celestial-nav');
    this.mobileToggle = document.querySelector('.nav-mobile-toggle');
    this.navLinks = document.querySelector('.nav-links');
    this.navLinksItems = document.querySelectorAll('.nav-link');
    this.waypointItems = document.querySelectorAll('.waypoint-item');
    this.telemetryValue = document.querySelector('.telemetry-value');
    this.soundBtn = document.querySelector('.btn-sound');
    
    // Section waypoints
    this.waypoints = [
      { id: 'hero', name: 'Home', au: '0.00 AU' },
      { id: 'about', name: 'About', au: '1.00 AU' },
      { id: 'skills', name: 'Skills', au: '2.77 AU' },
      { id: 'projects', name: 'Projects', au: '5.20 AU' },
      { id: 'education', name: 'Education', au: '9.58 AU' },
      { id: 'contact', name: 'Contact', au: '39.5 AU' }
    ];

    this.audioCtx = null;
    this.isMuted = true;

    this.init();
  }

  init() {
    this.bindScroll();
    this.bindMobileMenu();
    this.bindAudio();
    this.bindSmoothScroll();
    this.updateScroll();
  }

  bindScroll() {
    window.addEventListener('scroll', () => {
      this.updateScroll();
    }, { passive: true });
  }

  updateScroll() {
    const scrollY = window.scrollY;

    // Navbar backdrop blur on scroll
    if (scrollY > 50) {
      this.nav.classList.add('scrolled');
    } else {
      this.nav.classList.remove('scrolled');
    }

    // Scroll spy for sections
    const scrollPosition = scrollY + window.innerHeight * 0.35;
    let currentWaypoint = this.waypoints[0];

    for (let i = 0; i < this.waypoints.length; i++) {
      const section = document.getElementById(this.waypoints[i].id);
      if (section) {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          currentWaypoint = this.waypoints[i];
          break;
        } else if (scrollPosition >= top) {
          currentWaypoint = this.waypoints[i];
        }
      }
    }

    // Update Telemetry Display
    if (this.telemetryValue) {
      this.telemetryValue.textContent = currentWaypoint.au;
    }

    // Update Waypoint Rail active item
    this.waypointItems.forEach(item => {
      const target = item.getAttribute('data-target');
      if (target === currentWaypoint.id) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update top nav links active state
    this.navLinksItems.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentWaypoint.id}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  bindMobileMenu() {
    if (this.mobileToggle && this.navLinks) {
      this.mobileToggle.addEventListener('click', () => {
        this.navLinks.classList.toggle('open');
      });

      this.navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
          this.navLinks.classList.remove('open');
        });
      });
    }
  }

  bindSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetElem = document.querySelector(targetId);
          if (targetElem) {
            e.preventDefault();
            const navOffset = 70;
            const elementPosition = targetElem.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });

            this.playChime(640);
          }
        }
      });
    });

    // Waypoint button clicks
    this.waypointItems.forEach(item => {
      const btn = item.querySelector('.waypoint-btn');
      if (btn) {
        btn.addEventListener('click', () => {
          const targetId = item.getAttribute('data-target');
          const targetElem = document.getElementById(targetId);
          if (targetElem) {
            const navOffset = 70;
            const elementPosition = targetElem.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });

            this.playChime(784);
          }
        });
      }
    });
  }

  bindAudio() {
    if (!this.soundBtn) return;

    this.soundBtn.addEventListener('click', () => {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext();
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.isMuted = !this.isMuted;
      this.soundBtn.innerHTML = this.isMuted ? '✦' : '🪐';
      this.soundBtn.setAttribute('title', this.isMuted ? 'Enable Celestial Chimes' : 'Chimes Enabled');

      if (!this.isMuted) {
        this.playChime(523.25); // C5
        setTimeout(() => this.playChime(659.25), 180); // E5
        setTimeout(() => this.playChime(783.99), 360); // G5
        setTimeout(() => this.playChime(1046.50), 540); // C6
      }
    });
  }

  playChime(freq = 520) {
    if (this.isMuted || !this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 1.2);
    } catch (e) {
      // Audio context policy safe
    }
  }
}

window.OdysseyNav = OdysseyNav;
