/**
 * FEATURE: MAUSAM360 — WEATHER-AWARE ACTIVITY PLANNER & INTELLIGENCE SIMULATOR
 * Re-creates the core engineering logic from Mudrika's MAUSAM360 Project:
 * - Real-time weather intelligence & telemetry
 * - Interactive precipitation radar & atmospheric gauges
 * - GPS-based location detection
 * - Personalized favorite cities (JWT authenticated simulation)
 * - Dynamic rule-based activity recommendation engine
 * - Contextual weather assistant chatbot
 */

class MausamSimulator {
  constructor() {
    this.container = document.getElementById('mausam-sim-container');
    if (!this.container) return;

    // Cities Database
    this.cityData = {
      kolkata: {
        name: 'Kolkata, IN',
        coords: '22.5726° N, 88.3639° E',
        temp: '29°C',
        condition: 'Clear & Sunny',
        icon: '☀️',
        humidity: '62%',
        wind: '11 km/h',
        uv: '6 (Moderate)',
        radar: '0% Rain Risk (Clear)',
        airQuality: '42 (Good)',
        pressure: '1012 hPa',
        favorite: true,
        activities: [
          {
            icon: '🏃',
            name: 'Outdoor Running & Athletics',
            reason: 'Optimal UV index & clear visibility across Eco Park.',
            badge: 'OPTIMAL',
            badgeClass: ''
          },
          {
            icon: '☕',
            name: 'Rooftop Cafe & Co-working',
            reason: 'Pleasant evening breeze with clear skies.',
            badge: 'PERFECT',
            badgeClass: ''
          },
          {
            icon: '🌱',
            name: 'Botanical Garden Stroll',
            reason: 'Dry ground and comfortable afternoon warmth.',
            badge: 'GOOD',
            badgeClass: ''
          }
        ],
        botAdvice: {
          run: 'Outdoor running conditions in Kolkata are optimal right now! Clear skies and 11 km/h breeze.',
          wear: 'Light breathable cottons and sunglasses are ideal for Kolkata’s 29°C daylight.',
          rain: 'Radar scans show 0% precipitation risk in Kolkata for the next 8 hours.',
          default: 'Kolkata is currently 29°C with clear skies. Excellent weather for outdoor work or light travel!'
        }
      },
      london: {
        name: 'London, UK',
        coords: '51.5072° N, 0.1276° W',
        temp: '14°C',
        condition: 'Overcast & Drizzle',
        icon: '🌧️',
        humidity: '88%',
        wind: '24 km/h',
        uv: '2 (Low)',
        radar: '85% Rain Risk (Radar Alert)',
        airQuality: '28 (Excellent)',
        pressure: '1004 hPa',
        favorite: false,
        activities: [
          {
            icon: '🏛️',
            name: 'British Museum & Galleries',
            reason: 'Heavy drizzle outside; indoor cultural activities recommended.',
            badge: 'RECOMMENDED',
            badgeClass: 'indoor'
          },
          {
            icon: '💻',
            name: 'MERN Code Architecture Session',
            reason: 'Cozy atmospheric rain sound perfect for deep focus engineering.',
            badge: 'INDOOR',
            badgeClass: 'indoor'
          },
          {
            icon: '🏃',
            name: 'Regent’s Park Jogging',
            reason: 'Wet tracks & 24 km/h winds. Waterproof gear mandatory.',
            badge: 'CAUTION',
            badgeClass: 'caution'
          }
        ],
        botAdvice: {
          run: 'Caution advised: Rain probability is 85% in London with slippery pavements.',
          wear: 'Bring a waterproof trench coat, sturdy umbrella, and insulated layers for 14°C.',
          rain: 'Precipitation radar is active. Light to moderate rain showers continuing through evening.',
          default: 'London is currently 14°C under overcast skies with scattered rain. Indoor plans recommended!'
        }
      },
      tokyo: {
        name: 'Tokyo, JP',
        coords: '35.6762° N, 139.6503° E',
        temp: '19°C',
        condition: 'Mild & Partly Cloudy',
        icon: '⛅',
        humidity: '54%',
        wind: '14 km/h',
        uv: '4 (Moderate)',
        radar: '12% Low Rain Probability',
        airQuality: '31 (Good)',
        pressure: '1016 hPa',
        favorite: false,
        activities: [
          {
            icon: '🚴',
            name: 'Shinjuku Urban Cycling',
            reason: 'Mild 19°C with calm breeze; great cycling weather.',
            badge: 'OPTIMAL',
            badgeClass: ''
          },
          {
            icon: '🍜',
            name: 'Ramen Tasting in Shibuya',
            reason: 'Ideal ambient temperatures for exploring walking streets.',
            badge: 'PERFECT',
            badgeClass: ''
          },
          {
            icon: '📸',
            name: 'Architectural Photography',
            reason: 'Soft diffused cloud lighting prevents harsh glare.',
            badge: 'GOOD',
            badgeClass: ''
          }
        ],
        botAdvice: {
          run: 'Great conditions for a jog along the Meguro River or Imperial Palace loops!',
          wear: 'A light cardigan or denim jacket over a tee is perfect for 19°C Tokyo breezes.',
          rain: 'Low rain risk (12%). Radar shows cloud layers passing through without storm cells.',
          default: 'Tokyo is 19°C and partly cloudy. Great balance of outdoor comfort and ambient warmth.'
        }
      },
      reykjavik: {
        name: 'Reykjavik, IS',
        coords: '64.1466° N, 21.9426° W',
        temp: '-2°C',
        condition: 'Sub-Zero Snow Flurries',
        icon: '❄️',
        humidity: '76%',
        wind: '32 km/h',
        uv: '1 (Minimal)',
        radar: 'Snow Telemetry Active',
        airQuality: '12 (Pure Arctic)',
        pressure: '998 hPa',
        favorite: false,
        activities: [
          {
            icon: '♨️',
            name: 'Geothermal Lagoon & Hot Spring',
            reason: 'Extreme cold outside creates the ultimate thermal contrast.',
            badge: 'TOP PICK',
            badgeClass: ''
          },
          {
            icon: '🌌',
            name: 'Aurora Borealis Stargazing',
            reason: 'Sub-zero crisp atmosphere delivers peak night sky transparency.',
            badge: 'EXCELLENT',
            badgeClass: ''
          },
          {
            icon: '🏃',
            name: 'Outdoor Running',
            reason: 'Icy trails and 32 km/h arctic gusts. Sub-zero thermal gear required.',
            badge: 'HIGH CAUTION',
            badgeClass: 'caution'
          }
        ],
        botAdvice: {
          run: 'High caution for outdoor running in Reykjavik due to black ice and -2°C gusts.',
          wear: 'Heavy thermal parka, wool inner layer, beanie, and snow-rated boots essential.',
          rain: 'No liquid precipitation; light arctic snow flurries detected on live radar.',
          default: 'Reykjavik is crisp at -2°C with snow flurries. Perfect for hot springs and aurora tracking!'
        }
      }
    };

    this.currentCityKey = 'kolkata';
    this.currentTab = 'planner';

    this.init();
  }

  init() {
    this.cacheDom();
    this.bindEvents();
    this.render();
  }

  cacheDom() {
    this.tabs = this.container.querySelectorAll('.mausam-tab-btn');
    this.panels = this.container.querySelectorAll('.mausam-panel');
    this.cityPills = this.container.querySelectorAll('.city-pill');
    this.gpsBtn = this.container.querySelector('#btn-mausam-gps');
    this.favBtn = this.container.querySelector('#btn-mausam-fav');
    this.toast = this.container.querySelector('#mausam-toast');

    // Planner Dom Elements
    this.tempDisplay = this.container.querySelector('#mausam-temp');
    this.condDisplay = this.container.querySelector('#mausam-condition');
    this.iconDisplay = this.container.querySelector('#mausam-icon');
    this.humidityDisplay = this.container.querySelector('#mausam-humidity');
    this.windDisplay = this.container.querySelector('#mausam-wind');
    this.uvDisplay = this.container.querySelector('#mausam-uv');
    this.activityList = this.container.querySelector('#mausam-activity-list');

    // Radar Dom Elements
    this.radarStatusText = this.container.querySelector('#mausam-radar-status');
    this.radarPrecip = this.container.querySelector('#mausam-radar-precip');
    this.radarAqi = this.container.querySelector('#mausam-radar-aqi');
    this.radarPressure = this.container.querySelector('#mausam-radar-pressure');

    // Chatbot Dom Elements
    this.botWindow = this.container.querySelector('#mausam-chat-window');
    this.botInput = this.container.querySelector('#mausam-bot-input');
    this.botSendBtn = this.container.querySelector('#mausam-bot-send');
    this.promptChips = this.container.querySelectorAll('.prompt-chip');
  }

  bindEvents() {
    // Tab switching
    this.tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        this.switchTab(targetTab);
      });
    });

    // City switching
    this.cityPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const cityKey = pill.getAttribute('data-city');
        this.selectCity(cityKey);
      });
    });

    // GPS Auto-detect
    if (this.gpsBtn) {
      this.gpsBtn.addEventListener('click', () => {
        this.gpsBtn.innerHTML = '<span>📡 Locating...</span>';
        setTimeout(() => {
          this.selectCity('kolkata');
          this.gpsBtn.innerHTML = '<span>🎯 GPS Synced</span>';
          this.showToast('📍 GPS Locked: Kolkata (22.5726° N, 88.3639° E)');
          setTimeout(() => {
            this.gpsBtn.innerHTML = '<span>🎯 GPS Detect</span>';
          }, 2000);
        }, 500);
      });
    }

    // Favorite Toggle
    if (this.favBtn) {
      this.favBtn.addEventListener('click', () => {
        const currentData = this.cityData[this.currentCityKey];
        currentData.favorite = !currentData.favorite;
        this.updateFavBtnState();
        if (currentData.favorite) {
          this.showToast(`❤️ ${currentData.name} saved to JWT favorites in SQL database!`);
        } else {
          this.showToast(`Removed ${currentData.name} from saved favorites.`);
        }
      });
    }

    // Chatbot Prompts
    if (this.promptChips) {
      this.promptChips.forEach(chip => {
        chip.addEventListener('click', () => {
          const query = chip.getAttribute('data-query');
          const promptText = chip.textContent.trim();
          this.sendChatMessage(promptText, query);
        });
      });
    }

    // Chatbot Input
    if (this.botSendBtn && this.botInput) {
      this.botSendBtn.addEventListener('click', () => this.handleCustomChatInput());
      this.botInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.handleCustomChatInput();
      });
    }
  }

  switchTab(tabName) {
    this.currentTab = tabName;
    this.tabs.forEach(tab => {
      if (tab.getAttribute('data-tab') === tabName) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    this.panels.forEach(panel => {
      if (panel.getAttribute('data-panel') === tabName) {
        panel.style.display = 'flex';
      } else {
        panel.style.display = 'none';
      }
    });
  }

  selectCity(cityKey) {
    if (!this.cityData[cityKey]) return;
    this.currentCityKey = cityKey;

    this.cityPills.forEach(pill => {
      if (pill.getAttribute('data-city') === cityKey) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    this.render();
  }

  updateFavBtnState() {
    const isFav = this.cityData[this.currentCityKey].favorite;
    if (isFav) {
      this.favBtn.classList.add('favorite-active');
      this.favBtn.innerHTML = '<span>❤️ Favorited</span>';
    } else {
      this.favBtn.classList.remove('favorite-active');
      this.favBtn.innerHTML = '<span>🤍 Favorite</span>';
    }
  }

  showToast(message) {
    if (!this.toast) return;
    this.toast.textContent = message;
    this.toast.classList.add('show');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toast.classList.remove('show');
    }, 2800);
  }

  render() {
    const city = this.cityData[this.currentCityKey];

    // Update Banner
    if (this.tempDisplay) this.tempDisplay.textContent = city.temp;
    if (this.condDisplay) this.condDisplay.textContent = city.condition;
    if (this.iconDisplay) this.iconDisplay.textContent = city.icon;
    if (this.humidityDisplay) this.humidityDisplay.textContent = city.humidity;
    if (this.windDisplay) this.windDisplay.textContent = city.wind;
    if (this.uvDisplay) this.uvDisplay.textContent = city.uv;

    // Update Activities
    if (this.activityList) {
      this.activityList.innerHTML = city.activities.map(act => `
        <div class="activity-card">
          <div class="activity-icon">${act.icon}</div>
          <div class="activity-info">
            <div class="activity-name">${act.name}</div>
            <div class="activity-reason">${act.reason}</div>
          </div>
          <span class="activity-badge ${act.badgeClass}">${act.badge}</span>
        </div>
      `).join('');
    }

    // Update Radar
    if (this.radarStatusText) this.radarStatusText.textContent = `${city.name} Doppler Radar`;
    if (this.radarPrecip) this.radarPrecip.textContent = city.radar;
    if (this.radarAqi) this.radarAqi.textContent = city.airQuality;
    if (this.radarPressure) this.radarPressure.textContent = city.pressure;

    // Update Fav button
    this.updateFavBtnState();
  }

  handleCustomChatInput() {
    const text = this.botInput.value.trim();
    if (!text) return;
    this.botInput.value = '';

    const lower = text.toLowerCase();
    let queryType = 'default';
    if (lower.includes('run') || lower.includes('jog') || lower.includes('outdoor')) {
      queryType = 'run';
    } else if (lower.includes('wear') || lower.includes('cloth') || lower.includes('jacket')) {
      queryType = 'wear';
    } else if (lower.includes('rain') || lower.includes('umbrella') || lower.includes('storm')) {
      queryType = 'rain';
    }

    this.sendChatMessage(text, queryType);
  }

  sendChatMessage(userText, queryType) {
    if (!this.botWindow) return;

    // Append user message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-bubble user';
    userMsg.textContent = userText;
    this.botWindow.appendChild(userMsg);
    this.botWindow.scrollTop = this.botWindow.scrollHeight;

    // AI typing response
    setTimeout(() => {
      const city = this.cityData[this.currentCityKey];
      const botReplyText = city.botAdvice[queryType] || city.botAdvice.default;

      const botMsg = document.createElement('div');
      botMsg.className = 'chat-bubble bot';
      botMsg.innerHTML = `<strong>🤖 Mausam360 AI [${city.name}]:</strong> ${botReplyText}`;
      this.botWindow.appendChild(botMsg);
      this.botWindow.scrollTop = this.botWindow.scrollHeight;
    }, 380);
  }
}

window.MausamSimulator = MausamSimulator;
