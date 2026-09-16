/**
 * Mechanical Engineer Toolkit - LocalStorage Service
 * Handles persistence for Theme, Favorites, and Calculation History.
 */

const STORAGE_KEYS = {
  THEME: 'mech_toolkit_theme',
  HISTORY: 'mech_toolkit_history',
  FAVORITES: 'mech_toolkit_favorites'
};

const MAX_HISTORY_ITEMS = 50;

export const storage = {
  // ================= THEME =================
  getTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      if (saved === 'light' || saved === 'dark') return saved;
      return 'dark'; // Default engineering dark blueprint mode
    } catch {
      return 'dark';
    }
  },

  setTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (e) {
      console.warn('Could not save theme to localStorage:', e);
    }
  },

  // ================= CALCULATION HISTORY =================
  getHistory() {
    try {
      const json = localStorage.getItem(STORAGE_KEYS.HISTORY);
      if (!json) return [];
      const parsed = JSON.parse(json);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },

  addHistoryEntry(entry) {
    try {
      const history = this.getHistory();
      const newEntry = {
        id: 'hist_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        timestamp: new Date().toISOString(),
        formattedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        ...entry
      };
      // Prepend to show most recent first
      history.unshift(newEntry);
      if (history.length > MAX_HISTORY_ITEMS) {
        history.length = MAX_HISTORY_ITEMS;
      }
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
      return newEntry;
    } catch (e) {
      console.warn('Failed to save calculation to history:', e);
      return null;
    }
  },

  clearHistory() {
    try {
      localStorage.removeItem(STORAGE_KEYS.HISTORY);
    } catch (e) {
      console.warn('Failed to clear history:', e);
    }
  },

  deleteHistoryItem(id) {
    try {
      const history = this.getHistory().filter(item => item.id !== id);
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    } catch (e) {
      console.warn('Failed to delete history item:', e);
    }
  },

  // ================= FAVORITES =================
  getFavorites() {
    try {
      const json = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (!json) return { calculators: [], formulas: [] };
      const parsed = JSON.parse(json);
      return {
        calculators: Array.isArray(parsed.calculators) ? parsed.calculators : [],
        formulas: Array.isArray(parsed.formulas) ? parsed.formulas : []
      };
    } catch {
      return { calculators: [], formulas: [] };
    }
  },

  isFavorite(type, id) {
    const favs = this.getFavorites();
    const list = favs[type] || [];
    return list.includes(id);
  },

  toggleFavorite(type, id) {
    try {
      const favs = this.getFavorites();
      const list = favs[type] || [];
      const index = list.indexOf(id);
      let isNowFavorite = false;
      if (index === -1) {
        list.push(id);
        isNowFavorite = true;
      } else {
        list.splice(index, 1);
        isNowFavorite = false;
      }
      favs[type] = list;
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
      return isNowFavorite;
    } catch (e) {
      console.warn('Failed to toggle favorite:', e);
      return false;
    }
  }
};
