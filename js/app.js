/**
 * Mechanical Engineer Toolkit - Main Application Controller (21st.dev Edition)
 * Bento grid layout, cursor-tracking spotlight cards, reactive routing,
 * live calculations, formula references, and state persistence.
 */

import { UNIT_CATEGORIES } from './data/units.js';
import { CALCULATORS, CALCULATOR_CATEGORIES } from './data/calculators.js';
import { FORMULAS } from './data/formulas.js';
import { MATERIALS } from './data/materials.js';
import { convert, formatEngineeringNumber } from './engine/converter.js';
import { solve } from './engine/solver.js';
import { storage } from './services/storage.js';

class MechToolkitApp {
  constructor() {
    this.stage = document.getElementById('contentStage');
    this.themeToggleBtn = document.getElementById('themeToggleBtn');
    this.searchTrigger = document.getElementById('searchTrigger');
    this.searchDialog = document.getElementById('searchDialog');
    this.searchInput = document.getElementById('searchInput');
    this.searchResults = document.getElementById('searchResults');
    this.menuToggle = document.getElementById('menuToggle');
    this.sidebar = document.getElementById('sidebar');
    this.sidebarBackdrop = document.getElementById('sidebarBackdrop');
    this.toastContainer = document.getElementById('toastContainer');

    // State
    this.activeCalcInputs = {};
    this.activeCalcId = null;
    this.converterState = {
      category: 'length',
      from: 'm',
      to: 'mm',
      val: 1
    };

    this.init();
  }

  init() {
    // 1. Initialize Theme
    const savedTheme = storage.getTheme();
    this.applyTheme(savedTheme);

    // 2. Setup Navigation & Routing
    window.addEventListener('hashchange', () => this.handleRoute());
    
    // 3. Setup Global Listeners & Spotlight tracker
    this.setupEventListeners();
    this.setupSpotlightTracker();

    // 4. Update sidebar counters
    this.updateSidebarCounters();

    // 5. Initial route load
    this.handleRoute();
  }

  setupEventListeners() {
    // Theme Toggle
    this.themeToggleBtn?.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      this.applyTheme(next);
      storage.setTheme(next);
      this.showToast(`Switched to ${next} theme`, next === 'dark' ? '🌙' : '☀️');
    });

    // Mobile Menu
    this.menuToggle?.addEventListener('click', () => this.toggleSidebar(true));
    this.sidebarBackdrop?.addEventListener('click', () => this.toggleSidebar(false));

    // Global Command Menu / Search
    this.searchTrigger?.addEventListener('click', () => this.openSearch());
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.openSearch();
      } else if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        this.openSearch();
      }
    });

    this.searchInput?.addEventListener('input', (e) => this.handleSearch(e.target.value));
    
    this.searchDialog?.addEventListener('click', (e) => {
      if (e.target === this.searchDialog) {
        this.searchDialog.close();
      }
    });
  }

  /**
   * 21st.dev Dynamic Cursor-Tracking Spotlight Effect
   * Attaches mousemove listeners to all .spotlight-card elements
   * to position the radial spotlight illumination relative to the cursor.
   */
  setupSpotlightTracker() {
    document.addEventListener('mousemove', (e) => {
      const cards = document.querySelectorAll('.spotlight-card');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (this.themeToggleBtn) {
      this.themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
      this.themeToggleBtn.title = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
    }
  }

  toggleSidebar(open) {
    if (open) {
      this.sidebar?.classList.add('open');
      this.sidebarBackdrop?.classList.add('active');
    } else {
      this.sidebar?.classList.remove('open');
      this.sidebarBackdrop?.classList.remove('active');
    }
  }

  updateSidebarCounters() {
    const calcCountEl = document.getElementById('calcCounter');
    const formulaCountEl = document.getElementById('formulaCounter');
    const favCountEl = document.getElementById('favCounter');
    const histCountEl = document.getElementById('histCounter');

    if (calcCountEl) calcCountEl.textContent = CALCULATORS.length;
    if (formulaCountEl) formulaCountEl.textContent = FORMULAS.length;

    const favs = storage.getFavorites();
    const totalFavs = favs.calculators.length + favs.formulas.length;
    if (favCountEl) favCountEl.textContent = totalFavs;

    const history = storage.getHistory();
    if (histCountEl) histCountEl.textContent = history.length;
  }

  showToast(message, icon = '✓') {
    if (!this.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px) scale(0.95)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 2400);
  }

  // ================= ROUTING =================
  handleRoute() {
    this.toggleSidebar(false);
    const hash = window.location.hash || '#dashboard';
    const parts = hash.slice(1).split('/');
    const mainRoute = parts[0];
    const param = parts[1];

    document.querySelectorAll('.nav-item').forEach(el => {
      const href = el.getAttribute('href');
      if (href === hash || (mainRoute && href === `#${mainRoute}`)) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    window.scrollTo(0, 0);

    switch (mainRoute) {
      case 'dashboard':
        this.renderDashboard();
        break;
      case 'calculators':
        this.renderCalculators(param);
        break;
      case 'calculator':
        if (param) this.renderCalculatorDetail(param);
        else this.renderCalculators();
        break;
      case 'converter':
        this.renderConverter();
        break;
      case 'formulas':
        this.renderFormulas(param);
        break;
      case 'materials':
        this.renderMaterials(param);
        break;
      case 'favorites':
        this.renderFavorites();
        break;
      case 'history':
        this.renderHistory();
        break;
      default:
        this.renderDashboard();
    }
  }

  // ================= VIEW: DASHBOARD (21ST.DEV BENTO GRID) =================
  renderDashboard() {
    const history = storage.getHistory().slice(0, 4);
    const popularCalcs = CALCULATORS.slice(0, 6);

    this.stage.innerHTML = `
      <!-- 21st.dev Bento Grid Hero Section -->
      <div class="bento-grid">
        <!-- Tile 1: Hero Banner -->
        <div class="spotlight-card hero-bento-tile bento-hero">
          <div>
            <div class="hero-tag">
              <span>⚡</span>
              <span>Next-Gen Engineering Toolkit</span>
            </div>
            <h1 class="hero-title-text">
              Precision Engineering<br>Calculations & Physics
            </h1>
            <p class="page-subtitle" style="font-size: 0.98rem; margin-bottom: var(--space-lg);">
              Unified mechanical workspace for deterministic calculations, unit conversions, formula derivations, and step-by-step substitutions.
            </p>
          </div>
          <div style="display: flex; gap: var(--space-sm); flex-wrap: wrap;">
            <a href="#calculators" class="btn btn-primary">
              <span>Explore ${CALCULATORS.length} Calculators</span>
              <span>→</span>
            </a>
            <a href="#converter" class="btn btn-secondary">
              <span>Unit Converter</span>
            </a>
            <a href="#formulas" class="btn btn-secondary">
              <span>Formula Library</span>
            </a>
          </div>
        </div>

        <!-- Tile 2: Quick Converter Bento Card -->
        <div class="spotlight-card bento-quick-conv" style="padding: var(--space-lg); display: flex; flex-direction: column;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-md);">
            <span style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em;">
              ⚡ Quick Converter
            </span>
            <a href="#converter" class="btn btn-secondary btn-sm" style="font-size: 0.72rem; padding: 3px 8px;">All Units →</a>
          </div>
          <div id="quickConverterRow" style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;"></div>
        </div>

        <!-- Tile 3, 4, 5: Metric Bento Stats -->
        <div class="spotlight-card bento-stat-card bento-stat-box">
          <div class="bento-stat-icon-wrapper">⚙️</div>
          <div>
            <div class="bento-stat-num">${CALCULATORS.length}</div>
            <div class="bento-stat-title">Interactive Calculators</div>
          </div>
        </div>

        <div class="spotlight-card bento-stat-card bento-stat-box">
          <div class="bento-stat-icon-wrapper">🔄</div>
          <div>
            <div class="bento-stat-num">16</div>
            <div class="bento-stat-title">SI & Imperial Domains</div>
          </div>
        </div>

        <div class="spotlight-card bento-stat-card bento-stat-box">
          <div class="bento-stat-icon-wrapper">📐</div>
          <div>
            <div class="bento-stat-num">${FORMULAS.length}</div>
            <div class="bento-stat-title">Verified Formulas</div>
          </div>
        </div>
      </div>

      <!-- Domain Category Cards -->
      <div class="section-heading">
        <span>Engineering Domains</span>
        <a href="#calculators" class="btn btn-secondary btn-sm">All Tools →</a>
      </div>
      <div class="cards-grid">
        ${Object.values(CALCULATOR_CATEGORIES).map(cat => {
          const count = CALCULATORS.filter(c => c.category === cat.id).length;
          return `
            <a href="#calculators/${cat.id}" class="spotlight-card tool-card">
              <div class="tool-card-header">
                <div class="tool-card-icon">${cat.icon}</div>
                <span class="category-badge">${count} Tools</span>
              </div>
              <h3 class="tool-card-title">${cat.name}</h3>
              <p class="tool-card-desc">${cat.description}</p>
              <div class="tool-card-footer">
                <span style="font-size: 0.82rem; color: var(--accent-cyan-bright); font-weight: 600;">Launch Domain →</span>
              </div>
            </a>
          `;
        }).join('')}
      </div>

      <!-- Popular Calculators (Spotlight Cards) -->
      <div class="section-heading">
        <span>Popular Mechanical Calculators</span>
      </div>
      <div class="cards-grid">
        ${popularCalcs.map(calc => this.renderToolCardHtml(calc)).join('')}
      </div>

      <!-- Recent Audit Feed -->
      ${history.length > 0 ? `
        <div class="section-heading">
          <span>Recent Calculation Audit</span>
          <a href="#history" class="btn btn-secondary btn-sm">View Audit Log →</a>
        </div>
        <div class="spotlight-card panel-card" style="margin-bottom: var(--space-xl); padding: var(--space-md);">
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${history.map(item => `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: var(--bg-surface-elevated); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); flex-wrap: wrap; gap: 8px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span style="font-size: 1.1rem;">⚙️</span>
                  <div>
                    <a href="#calculator/${item.calcId}" style="font-weight: 600; color: var(--text-primary); text-decoration: none;">${item.calcName}</a>
                    <div style="font-size: 0.72rem; color: var(--text-muted);">${item.formattedTime}</div>
                  </div>
                </div>
                <div style="font-family: var(--font-mono); font-weight: 700; color: var(--accent-cyan-bright); font-size: 0.95rem;">
                  ${item.resultText}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    `;

    this.mountQuickConverter();
    this.attachCardEventListeners();
  }

  mountQuickConverter() {
    const container = document.getElementById('quickConverterRow');
    if (!container) return;

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <div>
          <label class="input-label" style="font-size: 0.72rem; color: var(--text-muted);">VALUE</label>
          <input type="number" id="quickConvVal" class="form-control" value="1" step="any">
        </div>
        <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; align-items: center;">
          <div>
            <label class="input-label" style="font-size: 0.72rem; color: var(--text-muted);">FROM</label>
            <select id="quickConvFrom" class="select-control">
              <option value="bar">Bar</option>
              <option value="kPa">kPa</option>
              <option value="MPa">MPa</option>
              <option value="psi">psi</option>
              <option value="Pa">Pa</option>
            </select>
          </div>
          <div style="padding-top: 14px;">
            <button id="quickSwapBtn" class="btn btn-secondary btn-sm" title="Swap Units" style="border-radius: 50%; width: 32px; height: 32px; padding: 0;">⇄</button>
          </div>
          <div>
            <label class="input-label" style="font-size: 0.72rem; color: var(--text-muted);">TO</label>
            <select id="quickConvTo" class="select-control">
              <option value="kPa">kPa</option>
              <option value="bar">Bar</option>
              <option value="MPa">MPa</option>
              <option value="psi">psi</option>
              <option value="Pa">Pa</option>
            </select>
          </div>
        </div>
        <div style="background: var(--bg-app); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 10px 12px; text-align: center; margin-top: 4px;">
          <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">RESULT</div>
          <div id="quickConvResult" style="font-family: var(--font-mono); font-weight: 700; color: var(--accent-cyan-bright); font-size: 1.15rem;">-</div>
        </div>
      </div>
    `;

    const valInput = document.getElementById('quickConvVal');
    const fromSelect = document.getElementById('quickConvFrom');
    const toSelect = document.getElementById('quickConvTo');
    const resultEl = document.getElementById('quickConvResult');
    const swapBtn = document.getElementById('quickSwapBtn');

    const updateQuick = () => {
      const v = parseFloat(valInput.value);
      const res = convert(v, 'pressure', fromSelect.value, toSelect.value);
      if (res.success) {
        resultEl.textContent = `${res.formatted} ${res.toSymbol}`;
      } else {
        resultEl.textContent = 'Invalid input';
      }
    };

    valInput.addEventListener('input', updateQuick);
    fromSelect.addEventListener('change', updateQuick);
    toSelect.addEventListener('change', updateQuick);
    swapBtn.addEventListener('click', () => {
      const temp = fromSelect.value;
      fromSelect.value = toSelect.value;
      toSelect.value = temp;
      updateQuick();
    });

    updateQuick();
  }

  // ================= VIEW: CALCULATORS LIST =================
  renderCalculators(filterCategory) {
    const list = filterCategory
      ? CALCULATORS.filter(c => c.category === filterCategory)
      : CALCULATORS;

    const currentCatInfo = filterCategory ? CALCULATOR_CATEGORIES[filterCategory] : null;

    this.stage.innerHTML = `
      <div class="page-header">
        <div class="page-title-row">
          <h1 class="page-title">
            <span>⚙️</span>
            <span>${currentCatInfo ? currentCatInfo.name : 'All Mechanical Calculators'}</span>
          </h1>
          <span class="category-badge">${list.length} Tools</span>
        </div>
        <p class="page-subtitle">
          ${currentCatInfo ? currentCatInfo.description : 'Browse all verified engineering calculators across Statics, Dynamics, Machine Design, Fluid Mechanics, Thermodynamics, and Metrology.'}
        </p>
      </div>

      <!-- Domain Category Tabs -->
      <div class="category-tabs-scroll">
        <a href="#calculators" class="tab-btn ${!filterCategory ? 'active' : ''}">
          <span>All Modules</span>
        </a>
        ${Object.values(CALCULATOR_CATEGORIES).map(cat => `
          <a href="#calculators/${cat.id}" class="tab-btn ${filterCategory === cat.id ? 'active' : ''}">
            <span>${cat.icon}</span>
            <span>${cat.name}</span>
          </a>
        `).join('')}
      </div>

      <div class="cards-grid">
        ${list.map(calc => this.renderToolCardHtml(calc)).join('')}
      </div>
    `;

    this.attachCardEventListeners();
  }

  renderToolCardHtml(calc) {
    const isFav = storage.isFavorite('calculators', calc.id);
    return `
      <div class="spotlight-card tool-card" data-calc-id="${calc.id}">
        <div class="tool-card-header">
          <div class="tool-card-icon">${calc.icon}</div>
          <button class="fav-btn ${isFav ? 'active' : ''}" data-fav-calc="${calc.id}" title="${isFav ? 'Remove from favorites' : 'Add to favorites'}">
            ${isFav ? '★' : '☆'}
          </button>
        </div>
        <a href="#calculator/${calc.id}" style="text-decoration: none; color: inherit; flex: 1; display: flex; flex-direction: column;">
          <h3 class="tool-card-title">${calc.name}</h3>
          <p class="tool-card-desc">${calc.description}</p>
        </a>
        <div class="tool-card-footer">
          <span class="tool-formula-preview">${calc.formulaDisplay}</span>
          <a href="#calculator/${calc.id}" class="btn btn-secondary btn-sm" style="margin-left: auto;">Open →</a>
        </div>
      </div>
    `;
  }

  attachCardEventListeners() {
    document.querySelectorAll('[data-fav-calc]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const calcId = btn.getAttribute('data-fav-calc');
        const isNow = storage.toggleFavorite('calculators', calcId);
        btn.classList.toggle('active', isNow);
        btn.textContent = isNow ? '★' : '☆';
        btn.title = isNow ? 'Remove from favorites' : 'Add to favorites';
        this.updateSidebarCounters();
        this.showToast(isNow ? 'Added to favorites' : 'Removed from favorites', isNow ? '★' : '☆');
      });
    });
  }

  // ================= VIEW: CALCULATOR DETAIL =================
  renderCalculatorDetail(calcId) {
    const calc = CALCULATORS.find(c => c.id === calcId);
    if (!calc) {
      this.stage.innerHTML = `
        <div class="spotlight-card panel-card" style="text-align: center; padding: 48px;">
          <h2>Calculator Not Found</h2>
          <p class="page-subtitle" style="margin: 16px auto;">The requested calculator could not be found.</p>
          <a href="#calculators" class="btn btn-primary">Back to Calculators</a>
        </div>
      `;
      return;
    }

    this.activeCalcId = calc.id;
    this.activeCalcInputs = {};
    calc.inputs.forEach(inp => {
      this.activeCalcInputs[inp.id] = inp.default;
    });

    const isFav = storage.isFavorite('calculators', calc.id);
    const cat = CALCULATOR_CATEGORIES[calc.category];

    this.stage.innerHTML = `
      <div class="page-header">
        <div class="page-title-row">
          <div style="display: flex; align-items: center; gap: 12px;">
            <a href="#calculators/${calc.category}" class="btn btn-secondary btn-sm">← ${cat?.name || 'Back'}</a>
            <h1 class="page-title">
              <span>${calc.icon}</span>
              <span>${calc.name}</span>
            </h1>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <button id="calcDetailFavBtn" class="btn btn-secondary btn-sm">
              <span>${isFav ? '★' : '☆'}</span>
              <span>${isFav ? 'Favorited' : 'Favorite'}</span>
            </button>
            <span class="category-badge">${cat?.name || calc.category}</span>
          </div>
        </div>
        <p class="page-subtitle">${calc.description}</p>
      </div>

      <div class="calculator-container">
        <!-- LEFT: INPUTS FORM -->
        <div class="spotlight-card panel-card">
          <div class="panel-title">
            <span>INPUT PARAMETERS</span>
            <span style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--accent-cyan-bright); font-weight: 700;">${calc.formulaDisplay}</span>
          </div>

          <form id="calcForm" onsubmit="return false;">
            ${calc.inputs.map(inp => `
              <div class="input-group">
                <div class="input-label-row">
                  <label class="input-label" for="inp_${inp.id}">${inp.label}</label>
                  ${inp.min !== undefined ? `<span style="font-size: 0.72rem; color: var(--text-muted);">Min: ${inp.min}</span>` : ''}
                </div>
                <div class="input-wrapper">
                  <input
                    type="number"
                    id="inp_${inp.id}"
                    data-param="${inp.id}"
                    class="form-control"
                    value="${inp.default}"
                    step="${inp.step || 'any'}"
                    ${inp.min !== undefined ? `min="${inp.min}"` : ''}
                    ${inp.max !== undefined ? `max="${inp.max}"` : ''}
                  >
                  ${inp.unit ? `<span class="input-unit-badge">${inp.unit}</span>` : ''}
                </div>
                ${inp.helper ? `<div class="input-helper">${inp.helper}</div>` : ''}
              </div>
            `).join('')}

            <div class="calculator-actions">
              <button type="button" id="calcRunBtn" class="btn btn-primary" style="flex: 1;">Calculate</button>
              <button type="button" id="calcResetBtn" class="btn btn-secondary">Reset</button>
            </div>
          </form>

          ${calc.notes ? `
            <div style="margin-top: var(--space-xl); padding-top: var(--space-md); border-top: 1px solid var(--border-subtle); font-size: 0.82rem; color: var(--text-muted); line-height: 1.5;">
              <strong style="color: var(--text-secondary); display: block; margin-bottom: 4px;">Engineering Assumption:</strong>
              ${calc.notes}
            </div>
          ` : ''}
        </div>

        <!-- RIGHT: LIVE RESULTS PANEL -->
        <div id="resultMount" class="result-card">
          <!-- Live result injected here -->
        </div>
      </div>
    `;

    const form = document.getElementById('calcForm');
    const inputs = form.querySelectorAll('input[data-param]');
    const runBtn = document.getElementById('calcRunBtn');
    const resetBtn = document.getElementById('calcResetBtn');
    const favBtn = document.getElementById('calcDetailFavBtn');

    const triggerSolve = () => {
      inputs.forEach(inp => {
        this.activeCalcInputs[inp.dataset.param] = inp.value;
      });
      this.executeCalculation(calc);
    };

    inputs.forEach(inp => {
      inp.addEventListener('input', triggerSolve);
    });

    runBtn.addEventListener('click', triggerSolve);

    resetBtn.addEventListener('click', () => {
      calc.inputs.forEach(inp => {
        const el = document.getElementById(`inp_${inp.id}`);
        if (el) el.value = inp.default;
        this.activeCalcInputs[inp.id] = inp.default;
      });
      triggerSolve();
      this.showToast('Inputs reset to defaults', '↺');
    });

    favBtn.addEventListener('click', () => {
      const isNow = storage.toggleFavorite('calculators', calc.id);
      favBtn.querySelector('span:first-child').textContent = isNow ? '★' : '☆';
      favBtn.querySelector('span:last-child').textContent = isNow ? 'Favorited' : 'Favorite';
      this.updateSidebarCounters();
      this.showToast(isNow ? 'Added to favorites' : 'Removed from favorites', isNow ? '★' : '☆');
    });

    triggerSolve();
  }

  executeCalculation(calc) {
    const mount = document.getElementById('resultMount');
    if (!mount) return;

    const res = solve(calc.id, this.activeCalcInputs);

    if (res.error) {
      mount.innerHTML = `
        <div class="result-hero" style="border-color: rgba(244, 63, 94, 0.4);">
          <div class="result-hero-label" style="color: var(--color-danger);">Calculation Warning</div>
          <div style="color: var(--color-danger); font-size: 1rem; margin-top: 8px;">${res.error}</div>
        </div>
      `;
      return;
    }

    const primary = res.primaryResult;
    const secondaries = res.secondaryResults || [];
    const steps = res.steps || [];
    const warnings = res.warnings || [];

    mount.innerHTML = `
      <!-- Primary Metric -->
      <div class="result-hero">
        <div class="result-hero-label">${primary.label}</div>
        <div class="result-hero-value">
          ${primary.formatted}
          <span class="result-hero-unit">${primary.unit}</span>
        </div>
      </div>

      <!-- Secondary Metrics -->
      ${secondaries.length > 0 ? `
        <div class="secondary-metrics-grid">
          ${secondaries.map(sec => `
            <div class="secondary-metric">
              <div class="metric-label">${sec.label}</div>
              <div class="metric-value">${sec.formatted} <span style="font-size: 0.78rem; color: var(--text-muted);">${sec.unit}</span></div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Step-by-Step Mathematical Substitution -->
      ${steps.length > 0 ? `
        <div class="steps-box">
          <div class="steps-title">
            <span>📝</span>
            <span>Step-by-Step Substitution</span>
          </div>
          ${steps.map(step => `<div class="step-item">${step}</div>`).join('')}
        </div>
      ` : ''}

      <!-- Warnings / Thermodynamic Alerts -->
      ${warnings.map(w => `
        <div class="alert-box alert-warning">
          <span>⚠️</span>
          <span>${w}</span>
        </div>
      `).join('')}

      <!-- Footer Actions with Micro-Interactions -->
      <div class="result-footer-actions">
        <button id="copyResultBtn" class="btn btn-secondary btn-sm">
          <span>📋</span>
          <span id="copyResultText">Copy Result</span>
        </button>
        <button id="printReportBtn" class="btn btn-secondary btn-sm" title="Print or Save PDF calculation report">
          <span>🖨️</span>
          <span>Print / PDF</span>
        </button>
        <button id="saveHistoryBtn" class="btn btn-secondary btn-sm">
          <span>💾</span>
          <span>Save to History</span>
        </button>
      </div>
    `;

    // Print / PDF report handler
    document.getElementById('printReportBtn')?.addEventListener('click', () => {
      window.print();
    });

    // Copy Result handler with animated feedback
    const copyBtn = document.getElementById('copyResultBtn');
    const copyText = document.getElementById('copyResultText');
    copyBtn?.addEventListener('click', () => {
      const textToCopy = `${calc.name}: ${primary.formatted} ${primary.unit}\n${steps.join('\n')}`;
      navigator.clipboard.writeText(textToCopy).then(() => {
        if (copyText) copyText.textContent = 'Copied! ✓';
        copyBtn.style.borderColor = 'var(--color-success)';
        copyBtn.style.color = 'var(--color-success)';
        this.showToast('Result copied to clipboard!', '📋');
        setTimeout(() => {
          if (copyText) copyText.textContent = 'Copy Result';
          copyBtn.style.borderColor = '';
          copyBtn.style.color = '';
        }, 1800);
      });
    });

    // Save to History handler
    document.getElementById('saveHistoryBtn')?.addEventListener('click', () => {
      storage.addHistoryEntry({
        calcId: calc.id,
        calcName: calc.name,
        inputs: { ...this.activeCalcInputs },
        resultText: `${primary.formatted} ${primary.unit}`,
        steps
      });
      this.updateSidebarCounters();
      this.showToast('Calculation saved to history!', '💾');
    });
  }

  // ================= VIEW: FULL UNIT CONVERTER =================
  renderConverter() {
    const categories = Object.keys(UNIT_CATEGORIES);
    const curCatKey = this.converterState.category;
    const curCat = UNIT_CATEGORIES[curCatKey];

    const unitKeys = Object.keys(curCat.units);
    if (!unitKeys.includes(this.converterState.from)) this.converterState.from = unitKeys[0];
    if (!unitKeys.includes(this.converterState.to)) this.converterState.to = unitKeys[1] || unitKeys[0];

    this.stage.innerHTML = `
      <div class="page-header">
        <div class="page-title-row">
          <h1 class="page-title">
            <span>🔄</span>
            <span>Engineering Unit Converter</span>
          </h1>
          <span class="category-badge">16 Categories</span>
        </div>
        <p class="page-subtitle">
          High-precision conversions across standard SI, imperial, US customary, and specialized mechanical engineering units.
        </p>
      </div>

      <div class="converter-container">
        <!-- Category Tabs -->
        <div class="category-tabs-scroll" id="converterCategoryTabs">
          ${categories.map(catKey => {
            const cat = UNIT_CATEGORIES[catKey];
            return `
              <button class="tab-btn ${catKey === curCatKey ? 'active' : ''}" data-cat="${catKey}">
                <span>${cat.icon}</span>
                <span>${cat.name}</span>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Interactive Converter Card -->
        <div class="spotlight-card converter-card">
          <div class="converter-row">
            <div>
              <label class="input-label" for="convInputVal">SOURCE VALUE</label>
              <input type="number" id="convInputVal" class="form-control" value="${this.converterState.val}" step="any">
              <div class="converter-unit-select">
                <select id="convFromUnit" class="select-control">
                  ${unitKeys.map(u => `
                    <option value="${u}" ${u === this.converterState.from ? 'selected' : ''}>
                      ${curCat.units[u].name} (${curCat.units[u].symbol})
                    </option>
                  `).join('')}
                </select>
              </div>
            </div>

            <div>
              <button id="convSwapBtn" class="swap-btn" title="Swap From and To Units">⇄</button>
            </div>

            <div>
              <label class="input-label">CONVERTED VALUE</label>
              <input type="text" id="convOutputVal" class="form-control" readonly style="background: var(--bg-app); font-weight: 700; color: var(--accent-cyan-bright);">
              <div class="converter-unit-select">
                <select id="convToUnit" class="select-control">
                  ${unitKeys.map(u => `
                    <option value="${u}" ${u === this.converterState.to ? 'selected' : ''}>
                      ${curCat.units[u].name} (${curCat.units[u].symbol})
                    </option>
                  `).join('')}
                </select>
              </div>
            </div>
          </div>

          <!-- Formula & Ratio Display Box -->
          <div class="converter-result-box">
            <div id="convExplanation" style="font-size: 1.05rem; font-weight: 600; color: var(--text-primary);">-</div>
            <div id="convSubtext" class="converter-formula-subtext">-</div>
            <div id="convWarning" style="display: none; margin-top: 8px;" class="alert-box alert-warning"></div>
          </div>

          <!-- Reference Table -->
          <div style="margin-top: var(--space-xl); border-top: 1px solid var(--border-subtle); padding-top: var(--space-lg);">
            <h4 style="font-size: 0.9rem; margin-bottom: var(--space-md); color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em;">
              Reference Units in ${curCat.name} (Base SI: ${curCat.baseUnit})
            </h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 8px;">
              ${unitKeys.map(u => {
                const item = curCat.units[u];
                return `
                  <div style="background: var(--bg-surface-elevated); padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); font-size: 0.82rem; display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: var(--text-secondary);">${item.name}</span>
                    <span style="font-family: var(--font-mono); font-weight: 700; color: var(--accent-cyan-bright);">${item.symbol}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    const inputVal = document.getElementById('convInputVal');
    const outputVal = document.getElementById('convOutputVal');
    const fromSelect = document.getElementById('convFromUnit');
    const toSelect = document.getElementById('convToUnit');
    const swapBtn = document.getElementById('convSwapBtn');
    const explEl = document.getElementById('convExplanation');
    const subEl = document.getElementById('convSubtext');
    const warnEl = document.getElementById('convWarning');

    const updateConversion = () => {
      this.converterState.val = inputVal.value;
      this.converterState.from = fromSelect.value;
      this.converterState.to = toSelect.value;

      const res = convert(this.converterState.val, this.converterState.category, this.converterState.from, this.converterState.to);

      if (res.success) {
        outputVal.value = `${res.formatted} ${res.toSymbol}`;
        explEl.textContent = `${this.converterState.val} ${res.fromSymbol} = ${res.formatted} ${res.toSymbol}`;
        subEl.textContent = res.explanation;

        if (res.warning) {
          warnEl.style.display = 'flex';
          warnEl.textContent = res.warning;
        } else {
          warnEl.style.display = 'none';
        }
      } else {
        outputVal.value = '-';
        explEl.textContent = res.error;
        subEl.textContent = '';
        warnEl.style.display = 'none';
      }
    };

    inputVal.addEventListener('input', updateConversion);
    fromSelect.addEventListener('change', updateConversion);
    toSelect.addEventListener('change', updateConversion);

    swapBtn.addEventListener('click', () => {
      const temp = fromSelect.value;
      fromSelect.value = toSelect.value;
      toSelect.value = temp;
      updateConversion();
    });

    document.querySelectorAll('#converterCategoryTabs [data-cat]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.converterState.category = btn.getAttribute('data-cat');
        this.renderConverter();
      });
    });

    updateConversion();
  }

  // ================= VIEW: FORMULA LIBRARY =================
  renderFormulas(filterCategory) {
    const list = filterCategory
      ? FORMULAS.filter(f => f.category === filterCategory)
      : FORMULAS;

    this.stage.innerHTML = `
      <div class="page-header">
        <div class="page-title-row">
          <h1 class="page-title">
            <span>📐</span>
            <span>Engineering Formula Reference Library</span>
          </h1>
          <span class="category-badge">${list.length} Formulas</span>
        </div>
        <p class="page-subtitle">
          Comprehensive repository of mechanical engineering mathematical expressions, variable definitions, standard SI units, real-world examples, and assumptions.
        </p>
      </div>

      <!-- Category Filter Pills -->
      <div class="category-tabs-scroll">
        <a href="#formulas" class="tab-btn ${!filterCategory ? 'active' : ''}">
          <span>All Formulas</span>
        </a>
        ${Object.values(CALCULATOR_CATEGORIES).map(cat => `
          <a href="#formulas/${cat.id}" class="tab-btn ${filterCategory === cat.id ? 'active' : ''}">
            <span>${cat.icon}</span>
            <span>${cat.name}</span>
          </a>
        `).join('')}
      </div>

      <!-- Formulas Feed -->
      <div style="display: flex; flex-direction: column; gap: var(--space-md);">
        ${list.map(f => {
          const isFav = storage.isFavorite('formulas', f.id);
          const cat = CALCULATOR_CATEGORIES[f.category];
          return `
            <div class="spotlight-card formula-card" id="formula_${f.id}">
              <div class="formula-card-top">
                <div>
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                    <span class="category-badge">${cat?.name || f.category}</span>
                    <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">${f.name}</h3>
                  </div>
                  <p style="font-size: 0.88rem; color: var(--text-secondary);">${f.description}</p>
                </div>
                <div style="display: flex; gap: 8px;">
                  <button class="fav-btn ${isFav ? 'active' : ''}" data-fav-formula="${f.id}" title="${isFav ? 'Remove from favorites' : 'Add to favorites'}">
                    ${isFav ? '★' : '☆'}
                  </button>
                  ${f.calculatorId ? `
                    <a href="#calculator/${f.calculatorId}" class="btn btn-primary btn-sm">Open Calculator →</a>
                  ` : ''}
                </div>
              </div>

              <!-- Big Mathematical Formula Box -->
              <div class="formula-box">
                <span>${f.expression}</span>
                <button class="btn btn-secondary btn-sm" data-copy-formula="${f.expression}" title="Copy Formula">📋 Copy</button>
              </div>

              <!-- Variables Table -->
              <table class="variables-table">
                <thead>
                  <tr>
                    <th style="width: 80px;">SYMBOL</th>
                    <th>PARAMETER NAME</th>
                    <th>STANDARD SI UNIT</th>
                  </tr>
                </thead>
                <tbody>
                  ${f.variables.map(v => `
                    <tr>
                      <td style="font-family: var(--font-mono); font-weight: 700; color: var(--accent-cyan-bright);">${v.symbol}</td>
                      <td style="color: var(--text-primary); font-weight: 500;">${v.name}</td>
                      <td style="font-family: var(--font-mono); color: var(--text-secondary);">${v.unit}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>

              <!-- Assumptions & Worked Example -->
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px;">
                <div class="example-box">
                  <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Assumptions:</strong>
                  ${f.assumptions}
                </div>
                <div class="example-box" style="border-left-color: var(--accent-blue);">
                  <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Worked Example:</strong>
                  ${f.example}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    document.querySelectorAll('[data-copy-formula]').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-copy-formula');
        navigator.clipboard.writeText(text).then(() => {
          this.showToast('Formula copied to clipboard!', '📋');
        });
      });
    });

    document.querySelectorAll('[data-fav-formula]').forEach(btn => {
      btn.addEventListener('click', () => {
        const fId = btn.getAttribute('data-fav-formula');
        const isNow = storage.toggleFavorite('formulas', fId);
        btn.classList.toggle('active', isNow);
        btn.textContent = isNow ? '★' : '☆';
        btn.title = isNow ? 'Remove from favorites' : 'Add to favorites';
        this.updateSidebarCounters();
        this.showToast(isNow ? 'Added to favorites' : 'Removed from favorites', isNow ? '★' : '☆');
      });
    });
  }

  // ================= VIEW: HISTORY =================
  renderHistory() {
    const history = storage.getHistory();

    this.stage.innerHTML = `
      <div class="page-header">
        <div class="page-title-row">
          <h1 class="page-title">
            <span>⏱️</span>
            <span>Calculation Audit Log</span>
          </h1>
          <div style="display: flex; gap: 8px;">
            ${history.length > 0 ? `
              <button id="clearHistoryBtn" class="btn btn-danger btn-sm">Clear History</button>
            ` : ''}
            <span class="category-badge">${history.length} Records</span>
          </div>
        </div>
        <p class="page-subtitle">
          Audited record of recent calculations with parameters and step substitutions stored in your browser session.
        </p>
      </div>

      ${history.length === 0 ? `
        <div class="spotlight-card panel-card" style="text-align: center; padding: 48px;">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">📑</div>
          <h3>No Calculations Saved Yet</h3>
          <p class="page-subtitle" style="margin: 12px auto;">
            When calculating, click "Save to History" in the results panel to record calculations here.
          </p>
          <a href="#calculators" class="btn btn-primary" style="margin-top: 16px;">Browse Calculators</a>
        </div>
      ` : `
        <div style="display: flex; flex-direction: column; gap: var(--space-md);">
          ${history.map(item => `
            <div class="spotlight-card panel-card" style="padding: var(--space-lg);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-sm); flex-wrap: wrap; gap: 8px;">
                <div>
                  <a href="#calculator/${item.calcId}" style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); text-decoration: none;">${item.calcName}</a>
                  <div style="font-size: 0.78rem; color: var(--text-muted);">${new Date(item.timestamp).toLocaleString()}</div>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-family: var(--font-mono); font-size: 1.25rem; font-weight: 800; color: var(--accent-cyan-bright);">${item.resultText}</span>
                  <button class="btn btn-secondary btn-sm" data-delete-hist="${item.id}" title="Delete this entry">✕</button>
                </div>
              </div>

              <div style="display: flex; flex-wrap: wrap; gap: 8px; margin: 10px 0;">
                ${Object.entries(item.inputs || {}).map(([k, v]) => `
                  <span style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; font-family: var(--font-mono);">
                    <span style="color: var(--text-muted);">${k}:</span> <strong>${v}</strong>
                  </span>
                `).join('')}
              </div>

              ${(item.steps || []).length > 0 ? `
                <div style="background: var(--bg-app); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 8px 12px; margin-top: 8px; font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-secondary);">
                  ${item.steps.map(s => `<div>${s}</div>`).join('')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      `}
    `;

    document.getElementById('clearHistoryBtn')?.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all calculation history?')) {
        storage.clearHistory();
        this.updateSidebarCounters();
        this.renderHistory();
        this.showToast('Calculation history cleared', '🗑️');
      }
    });

    document.querySelectorAll('[data-delete-hist]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-delete-hist');
        storage.deleteHistoryItem(id);
        this.updateSidebarCounters();
        this.renderHistory();
        this.showToast('Item deleted', '✕');
      });
    });
  }

  // ================= VIEW: FAVORITES =================
  renderFavorites() {
    const favs = storage.getFavorites();
    const favCalcs = CALCULATORS.filter(c => favs.calculators.includes(c.id));
    const favForms = FORMULAS.filter(f => favs.formulas.includes(f.id));

    this.stage.innerHTML = `
      <div class="page-header">
        <div class="page-title-row">
          <h1 class="page-title">
            <span>★</span>
            <span>Bookmarked Favorites</span>
          </h1>
          <span class="category-badge">${favCalcs.length + favForms.length} Saved</span>
        </div>
        <p class="page-subtitle">
          Quick-access bookmarks for your most used calculators and formula reference sheets.
        </p>
      </div>

      ${(favCalcs.length === 0 && favForms.length === 0) ? `
        <div class="spotlight-card panel-card" style="text-align: center; padding: 48px;">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">⭐</div>
          <h3>No Favorites Bookmarked</h3>
          <p class="page-subtitle" style="margin: 12px auto;">
            Click the star icon (☆) on any calculator or formula card to bookmark it here for fast access.
          </p>
          <a href="#calculators" class="btn btn-primary" style="margin-top: 16px;">Explore Calculators</a>
        </div>
      ` : `
        ${favCalcs.length > 0 ? `
          <div class="section-heading">
            <span>Favorite Calculators (${favCalcs.length})</span>
          </div>
          <div class="cards-grid">
            ${favCalcs.map(calc => this.renderToolCardHtml(calc)).join('')}
          </div>
        ` : ''}

        ${favForms.length > 0 ? `
          <div class="section-heading" style="margin-top: var(--space-xl);">
            <span>Favorite Formulas (${favForms.length})</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: var(--space-md);">
            ${favForms.map(f => `
              <div class="spotlight-card panel-card" style="padding: var(--space-md) var(--space-lg); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                <div>
                  <h4 style="font-size: 1rem; color: var(--text-primary);">${f.name}</h4>
                  <div style="font-family: var(--font-mono); color: var(--accent-cyan-bright); font-size: 0.9rem;">${f.expression}</div>
                </div>
                <div style="display: flex; gap: 8px;">
                  ${f.calculatorId ? `<a href="#calculator/${f.calculatorId}" class="btn btn-secondary btn-sm">Calculate →</a>` : ''}
                  <a href="#formulas" class="btn btn-secondary btn-sm">View in Library</a>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}
      `}
    `;

    this.attachCardEventListeners();
  }

  // ================= VIEW: ENGINEERING MATERIALS DATABASE =================
  renderMaterials(categoryFilter) {
    const categories = ['All', 'Ferrous Metals', 'Non-Ferrous Metals', 'Fluids & Gases'];
    const list = categoryFilter && categoryFilter !== 'All'
      ? MATERIALS.filter(m => m.category === categoryFilter)
      : MATERIALS;

    this.stage.innerHTML = `
      <div class="page-header">
        <div class="page-title-row">
          <h1 class="page-title">
            <span>💎</span>
            <span>Engineering Materials Properties Reference</span>
          </h1>
          <span class="category-badge">${list.length} Materials</span>
        </div>
        <p class="page-subtitle">
          Standard verified mechanical, structural, and thermal properties for common engineering alloys, metals, and industrial fluids.
        </p>
      </div>

      <!-- Category Filter Tabs -->
      <div class="category-tabs-scroll" id="matCatTabs">
        ${categories.map(c => `
          <button class="tab-btn ${(!categoryFilter && c === 'All') || categoryFilter === c ? 'active' : ''}" data-mat-cat="${c}">
            <span>${c}</span>
          </button>
        `).join('')}
      </div>

      <!-- Materials Cards Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: var(--space-md);">
        ${list.map(m => `
          <div class="spotlight-card panel-card" style="padding: var(--space-lg); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <span class="category-badge" style="font-size: 0.68rem;">${m.category}</span>
                <button class="btn btn-secondary btn-sm" data-copy-mat="${m.name} | E=${m.youngsModulus || '-'} GPa | Sy=${m.yieldStrength || '-'} MPa | Density=${m.density} kg/m³" title="Copy material specs" style="padding: 2px 8px; font-size: 0.72rem;">
                  📋 Copy
                </button>
              </div>
              <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">${m.name}</h3>
              <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: var(--space-md); line-height: 1.4;">${m.notes}</p>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 0.78rem; background: var(--bg-app); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 10px 12px; margin-top: auto;">
              <div>
                <span style="color: var(--text-muted); display: block;">Density (ρ):</span>
                <strong style="font-family: var(--font-mono); color: var(--text-primary);">${m.density} kg/m³</strong>
              </div>
              ${m.yieldStrength !== undefined ? `
                <div>
                  <span style="color: var(--text-muted); display: block;">Yield Strength (σ_y):</span>
                  <strong style="font-family: var(--font-mono); color: var(--accent-cyan-bright);">${m.yieldStrength} MPa</strong>
                </div>
              ` : ''}
              ${m.youngsModulus !== undefined ? `
                <div>
                  <span style="color: var(--text-muted); display: block;">Young's Modulus (E):</span>
                  <strong style="font-family: var(--font-mono); color: var(--accent-cyan-bright);">${m.youngsModulus} GPa</strong>
                </div>
              ` : ''}
              ${m.thermalConductivity !== undefined ? `
                <div>
                  <span style="color: var(--text-muted); display: block;">Conductivity (k):</span>
                  <strong style="font-family: var(--font-mono); color: var(--text-primary);">${m.thermalConductivity} W/m·K</strong>
                </div>
              ` : ''}
              ${m.viscosity !== undefined ? `
                <div>
                  <span style="color: var(--text-muted); display: block;">Viscosity (μ):</span>
                  <strong style="font-family: var(--font-mono); color: var(--accent-cyan-bright);">${m.viscosity} Pa·s</strong>
                </div>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;

    document.querySelectorAll('#matCatTabs [data-mat-cat]').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-mat-cat');
        this.renderMaterials(cat);
      });
    });

    document.querySelectorAll('[data-copy-mat]').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-copy-mat');
        navigator.clipboard.writeText(text).then(() => {
          this.showToast('Material specs copied to clipboard!', '📋');
        });
      });
    });
  }

  // ================= 21ST.DEV COMMAND PALETTE (<dialog>) =================
  openSearch() {
    if (!this.searchDialog) return;
    this.searchDialog.showModal();
    if (this.searchInput) {
      this.searchInput.value = '';
      this.searchInput.focus();
      this.handleSearch('');
    }
  }

  handleSearch(query) {
    if (!this.searchResults) return;
    const q = (query || '').trim().toLowerCase();

    const matchedCalcs = CALCULATORS.filter(c =>
      !q || c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.formulaDisplay.toLowerCase().includes(q)
    );

    const matchedForms = FORMULAS.filter(f =>
      !q || f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q) || f.expression.toLowerCase().includes(q)
    );

    const matchedMats = MATERIALS.filter(m =>
      !q || m.name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q) || m.notes.toLowerCase().includes(q)
    );

    let html = '';

    if (matchedCalcs.length > 0) {
      html += `
        <div style="padding: 6px 12px; font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700; letter-spacing: 0.08em;">
          Calculators (${matchedCalcs.length})
        </div>
      `;
      matchedCalcs.slice(0, 6).forEach(c => {
        html += `
          <a href="#calculator/${c.id}" class="search-result-item" onclick="document.getElementById('searchDialog').close()">
            <div>
              <div class="search-item-title">${c.icon} ${c.name}</div>
              <div class="search-item-sub">${c.description}</div>
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent-cyan-bright);">${c.formulaDisplay}</div>
          </a>
        `;
      });
    }

    if (matchedForms.length > 0) {
      html += `
        <div style="padding: 6px 12px; font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700; letter-spacing: 0.08em; margin-top: 8px;">
          Formula Reference (${matchedForms.length})
        </div>
      `;
      matchedForms.slice(0, 6).forEach(f => {
        html += `
          <a href="#formulas" class="search-result-item" onclick="document.getElementById('searchDialog').close()">
            <div>
              <div class="search-item-title">📐 ${f.name}</div>
              <div class="search-item-sub">${f.description}</div>
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent-cyan-bright);">${f.expression}</div>
          </a>
        `;
      });
    }

    if (matchedMats.length > 0) {
      html += `
        <div style="padding: 6px 12px; font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700; letter-spacing: 0.08em; margin-top: 8px;">
          Materials Reference (${matchedMats.length})
        </div>
      `;
      matchedMats.slice(0, 4).forEach(m => {
        html += `
          <a href="#materials" class="search-result-item" onclick="document.getElementById('searchDialog').close()">
            <div>
              <div class="search-item-title">💎 ${m.name}</div>
              <div class="search-item-sub">${m.category} • ${m.density} kg/m³</div>
            </div>
            <div style="font-size: 0.78rem; color: var(--text-secondary);">${m.yieldStrength ? m.yieldStrength + ' MPa' : ''}</div>
          </a>
        `;
      });
    }

    if (matchedCalcs.length === 0 && matchedForms.length === 0 && matchedMats.length === 0) {
      html = `
        <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
          No matching calculators, formulas, or materials found for "${query}"
        </div>
      `;
    }

    this.searchResults.innerHTML = html;
  }
}

// Instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.app = new MechToolkitApp();
});
