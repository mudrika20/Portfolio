/**
 * FEATURE: PLAYABLE COSMIC TIC-TAC-TOE GAME
 * Re-creates Mudrika's Tic-Tac-Toe React Project with Solar & Lunar Tokens
 * Features:
 * - Turn tracking (Sun ☀️ vs Moon 🌙)
 * - State management & win detection
 * - Winning line highlight
 * - Hand-crafted reset functionality
 */

class CosmicTicTacToe {
  constructor() {
    this.container = document.getElementById('cosmic-ttt-container');
    if (!this.container) return;

    this.statusPill = this.container.querySelector('.ttt-status-pill');
    this.board = this.container.querySelector('.ttt-board');
    this.resetBtn = this.container.querySelector('.ttt-reset-btn');

    this.tokens = {
      X: '☀️',
      O: '🌙'
    };

    this.state = Array(9).fill(null);
    this.currentPlayer = 'X';
    this.isGameOver = false;

    this.winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    this.init();
  }

  init() {
    this.createBoard();
    this.resetBtn.addEventListener('click', () => this.resetGame());
  }

  createBoard() {
    this.board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('ttt-cell');
      cell.dataset.index = i;
      cell.addEventListener('click', () => this.handleCellClick(i));
      this.board.appendChild(cell);
    }
    this.updateStatus();
  }

  handleCellClick(index) {
    if (this.state[index] || this.isGameOver) return;

    this.state[index] = this.currentPlayer;
    const cell = this.board.children[index];
    cell.textContent = this.tokens[this.currentPlayer];
    cell.classList.add('occupied', this.currentPlayer === 'X' ? 'token-x' : 'token-o');

    const winCombo = this.checkWin();
    if (winCombo) {
      this.isGameOver = true;
      this.highlightWinner(winCombo);
      this.statusPill.innerHTML = `<span>🏆 Winner:</span> ${this.tokens[this.currentPlayer]} (${this.currentPlayer === 'X' ? 'Solar' : 'Lunar'})!`;
      return;
    }

    if (this.state.every(val => val !== null)) {
      this.isGameOver = true;
      this.statusPill.innerHTML = `<span>⚖️ Cosmic Equilibrium (Draw)!</span>`;
      return;
    }

    // Switch turn
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    this.updateStatus();
  }

  checkWin() {
    for (const pattern of this.winPatterns) {
      const [a, b, c] = pattern;
      if (this.state[a] && this.state[a] === this.state[b] && this.state[a] === this.state[c]) {
        return pattern;
      }
    }
    return null;
  }

  highlightWinner(pattern) {
    pattern.forEach(idx => {
      this.board.children[idx].classList.add('winner');
    });
  }

  updateStatus() {
    const playerName = this.currentPlayer === 'X' ? 'Solar Sun ☀️' : 'Lunar Moon 🌙';
    this.statusPill.innerHTML = `<span>Turn:</span> ${playerName}`;
  }

  resetGame() {
    this.state = Array(9).fill(null);
    this.currentPlayer = 'X';
    this.isGameOver = false;

    Array.from(this.board.children).forEach(cell => {
      cell.textContent = '';
      cell.className = 'ttt-cell';
    });

    this.updateStatus();
  }
}

window.CosmicTicTacToe = CosmicTicTacToe;
