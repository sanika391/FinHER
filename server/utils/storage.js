
export const storage = {
  /**
   * Get item from local storage with optional JSON parsing
   * @param {String} key - Storage key
   * @param {Boolean} parse - Whether to parse as JSON
   * @returns {*} Stored value
   */
  get: (key, parse = true) => {
    try {
      const value = localStorage.getItem(key);
      return parse && value ? JSON.parse(value) : value;
    } catch (error) {
      console.error('Error getting from storage:', error);
      return null;
    }
  },
  
  /**
   * Set item in local storage with automatic JSON stringifying
   * @param {String} key - Storage key
   * @param {*} value - Value to store
   */
  set: (key, value) => {
    try {
      const valueToStore = typeof value === 'object' ? JSON.stringify(value) : value;
      localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.error('Error setting to storage:', error);
    }
  },
  
  /**
   * Remove item from local storage
   * @param {String} key - Storage key
   */
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from storage:', error);
    }
  },
  
  /**
   * Clear all items from local storage
   */
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
};