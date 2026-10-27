/**
 * FEATURE: SKILLS CONSTELLATION FILTER & INTERSECTION OBSERVER
 * Handles domain filtering and triggers planetary meter animations
 */

class SkillsFilter {
  constructor() {
    this.tabs = document.querySelectorAll('.filter-tab');
    this.cards = document.querySelectorAll('.skill-card');
    this.meters = document.querySelectorAll('.skill-meter-fill');

    if (!this.tabs.length || !this.cards.length) return;

    this.init();
  }

  init() {
    this.bindTabs();
    this.initMetersObserver();
  }

  bindTabs() {
    this.tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const category = tab.getAttribute('data-filter');

        // Update active tab
        this.tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Filter cards
        this.cards.forEach(card => {
          const cardCat = card.getAttribute('data-cat');
          if (category === 'all' || cardCat === category) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 20);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  initMetersObserver() {
    // Store target widths
    this.meters.forEach(meter => {
      const targetWidth = meter.getAttribute('data-width') || '85%';
      meter.style.width = '0%';
      meter.dataset.targetWidth = targetWidth;
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const meter = entry.target;
          meter.style.width = meter.dataset.targetWidth;
          observer.unobserve(meter);
        }
      });
    }, { threshold: 0.2 });

    this.meters.forEach(meter => observer.observe(meter));
  }
}

window.SkillsFilter = SkillsFilter;
