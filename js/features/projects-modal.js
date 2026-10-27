/**
 * FEATURE: GROCERY CART SIMULATOR & EXPEDITION INTERACTIVE LOGIC
 * Re-creates the core engineering logic from Mudrika's Grocery Cart Project:
 * - Real-time add, update, delete
 * - Auto item capitalization
 * - Default quantity handling
 * - Dynamic cart statistics (total, purchased, pending)
 * - Conditional deletion when item quantity reaches 0
 * - Filtering (all / purchased / pending)
 */

class GroceryCartSimulator {
  constructor() {
    this.container = document.getElementById('grocery-sim-container');
    if (!this.container) return;

    this.input = this.container.querySelector('.sim-input');
    this.addBtn = this.container.querySelector('.sim-btn-add');
    this.itemsList = this.container.querySelector('.sim-items-list');
    this.statTotal = this.container.querySelector('.stat-total');
    this.statPurchased = this.container.querySelector('.stat-purchased');
    this.statPending = this.container.querySelector('.stat-pending');
    this.filterBtns = this.container.querySelectorAll('.sim-filter-btn');

    this.currentFilter = 'all';

    // Initial demo state
    this.items = [
      { id: 1, name: 'Fresh Apples', quantity: 2, purchased: false },
      { id: 2, name: 'Almond Milk', quantity: 1, purchased: true },
      { id: 3, name: 'Whole Wheat Bread', quantity: 1, purchased: false }
    ];

    this.init();
  }

  init() {
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    this.addBtn.addEventListener('click', () => this.addItem());

    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.addItem();
      }
    });

    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.getAttribute('data-sim-filter');
        this.render();
      });
    });
  }

  capitalize(str) {
    if (!str) return '';
    return str
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  addItem() {
    const rawVal = this.input.value.trim();
    if (!rawVal) return;

    const formattedName = this.capitalize(rawVal);
    const existing = this.items.find(item => item.name.toLowerCase() === formattedName.toLowerCase());

    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.unshift({
        id: Date.now(),
        name: formattedName,
        quantity: 1,
        purchased: false
      });
    }

    this.input.value = '';
    this.render();
  }

  updateQuantity(id, delta) {
    const item = this.items.find(i => i.id === id);
    if (!item) return;

    item.quantity += delta;

    // Feature requirement: conditional deletion when item quantity reaches zero
    if (item.quantity <= 0) {
      this.items = this.items.filter(i => i.id !== id);
    }

    this.render();
  }

  togglePurchased(id) {
    const item = this.items.find(i => i.id === id);
    if (!item) return;

    item.purchased = !item.purchased;
    this.render();
  }

  render() {
    // 1. Compute Cart Statistics
    const totalCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
    const purchasedCount = this.items.filter(i => i.purchased).length;
    const pendingCount = this.items.filter(i => !i.purchased).length;

    if (this.statTotal) this.statTotal.textContent = `Total Items: ${totalCount}`;
    if (this.statPurchased) this.statPurchased.textContent = `Purchased: ${purchasedCount}`;
    if (this.statPending) this.statPending.textContent = `Pending: ${pendingCount}`;

    // 2. Filter items
    let filtered = this.items;
    if (this.currentFilter === 'purchased') {
      filtered = this.items.filter(i => i.purchased);
    } else if (this.currentFilter === 'pending') {
      filtered = this.items.filter(i => !i.purchased);
    }

    // 3. Render HTML
    if (filtered.length === 0) {
      this.itemsList.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 0.85rem; font-size: 0.8rem;">No items in ${this.currentFilter} list</div>`;
      return;
    }

    this.itemsList.innerHTML = filtered.map(item => `
      <div class="sim-item-row ${item.purchased ? 'purchased' : ''}">
        <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
          <input type="checkbox" ${item.purchased ? 'checked' : ''} onchange="window.grocerySim.togglePurchased(${item.id})">
          <span style="font-weight: 600;">${item.name}</span>
        </label>
        <div class="sim-item-actions">
          <span style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">x${item.quantity}</span>
          <button class="sim-qty-btn" title="Add 1" onclick="window.grocerySim.updateQuantity(${item.id}, 1)">+</button>
          <button class="sim-qty-btn" title="Remove 1 (Deletes at 0)" onclick="window.grocerySim.updateQuantity(${item.id}, -1)">-</button>
        </div>
      </div>
    `).join('');
  }
}

window.GroceryCartSimulator = GroceryCartSimulator;
