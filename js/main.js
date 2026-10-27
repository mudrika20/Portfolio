/**
 * MAIN ENTRYPOINT: CELESTIAL ODYSSEY PORTFOLIO
 * Orchestrates all feature modules and ensures seamless celestial rendering
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('✦ Initializing Mudrika Sharma Celestial Portfolio...');

  // 1. Initialize interactive canvas stardust
  if (window.CelestialCanvas) {
    window.celestialCanvas = new CelestialCanvas('celestial-canvas');
  }

  // 2. Initialize flight tracker & navigation
  if (window.OdysseyNav) {
    window.odysseyNav = new OdysseyNav();
  }

  // 3. Initialize skills constellation filter
  if (window.SkillsFilter) {
    window.skillsFilter = new SkillsFilter();
  }

  // 4. Initialize MAUSAM360 weather intelligence console
  if (window.MausamSimulator) {
    window.mausamSim = new MausamSimulator();
  }

  // 5. Initialize grocery cart interactive simulation
  if (window.GroceryCartSimulator) {
    window.grocerySim = new GroceryCartSimulator();
  }

  // 6. Initialize cosmic Tic-Tac-Toe game
  if (window.CosmicTicTacToe) {
    window.cosmicTTT = new CosmicTicTacToe();
  }

  // 6. Initialize contact transmission station
  if (window.ContactTransmission) {
    window.contactTrans = new ContactTransmission();
  }

  console.log('✦ Celestial Odyssey Ready. Orbit stable.');
});
