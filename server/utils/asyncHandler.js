/**
 * Async handler to avoid try-catch blocks in controller functions
 * @param {Function} fn - Async function to handle
 * @returns {Function} Middleware function with error handling
 */
const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
  
  module.exports = asyncHandler;
  