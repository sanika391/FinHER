
 
export const isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Check if a password meets the minimum requirements
 * @param {String} password - The password to validate
 * @returns {Object} Validation result with isValid and message properties
 */
export const validatePassword = (password) => {
  if (!password || password.length < 8) {
    return {
      isValid: false,
      message: 'Password must be at least 8 characters long'
    };
  }
  
  // Check for at least one number
  if (!/\d/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one number'
    };
  }
  
  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one uppercase letter'
    };
  }
  
  return {
    isValid: true,
    message: 'Password is valid'
  };
};

/**
 * Check if a phone number is valid (US format)
 * @param {String} phone - The phone number to validate
 * @returns {Boolean} Whether the phone number is valid
 */
export const isValidPhone = (phone) => {
  const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return re.test(phone);
};

/**
 * Check if a value is a valid number within a range
 * @param {Number} value - The value to validate
 * @param {Number} min - Minimum allowed value
 * @param {Number} max - Maximum allowed value
 * @returns {Boolean} Whether the value is valid
 */
export const isValidNumber = (value, min, max) => {
  const num = parseFloat(value);
  return !isNaN(num) && num >= min && num <= max;
};

// src/utils/helpers.js
/**
 * Generate a random alphanumeric string
 * @param {Number} length - Length of the string to generate
 * @returns {String} Random string
 */
export const generateRandomString = (length = 8) => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
};

/**
 * Truncate a string to a specified length and add ellipsis if needed
 * @param {String} str - The string to truncate
 * @param {Number} maxLength - Maximum length before truncation
 * @returns {String} Truncated string
 */
export const truncateString = (str, maxLength = 50) => {
  if (!str || str.length <= maxLength) return str;
  
  return str.substring(0, maxLength) + '...';
};

/**
 * Debounce a function call
 * @param {Function} func - The function to debounce
 * @param {Number} wait - Debounce wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Capitalize the first letter of each word in a string
 * @param {String} str - The string to capitalize
 * @returns {String} Capitalized string
 */
export const capitalizeWords = (str) => {
  if (!str) return '';
  
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Get a readable file size string from bytes
 * @param {Number} bytes - The file size in bytes
 * @param {Number} decimals - Number of decimal places (default: 2)
 * @returns {String} Formatted file size string
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};