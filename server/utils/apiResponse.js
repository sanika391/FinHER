// server/utils/apiResponse.js
/**
 * Standard API response format
 * @param {Object} res - Express response object
 * @param {Number} statusCode - HTTP status code
 * @param {Boolean} success - Success flag
 * @param {String} message - Response message
 * @param {Object|Array} data - Response data
 * @param {Object} meta - Metadata (pagination, etc.)
 * @returns {Object} Express response
 */
const apiResponse = (
    res,
    statusCode = 200,
    success = true,
    message = '',
    data = null,
    meta = {}
  ) => {
    return res.status(statusCode).json({
      success,
      message,
      data,
      meta
    });
  };
  
  /**
   * Success response
   * @param {Object} res - Express response object
   * @param {String} message - Success message
   * @param {Object|Array} data - Response data
   * @param {Object} meta - Metadata
   * @returns {Object} Express response
   */
  const successResponse = (res, message = 'Success', data = null, meta = {}) => {
    return apiResponse(res, 200, true, message, data, meta);
  };
  
  /**
   * Created response (201)
   * @param {Object} res - Express response object
   * @param {String} message - Success message
   * @param {Object|Array} data - Response data
   * @returns {Object} Express response
   */
  const createdResponse = (res, message = 'Resource created successfully', data = null) => {
    return apiResponse(res, 201, true, message, data);
  };
  
  /**
   * Error response
   * @param {Object} res - Express response object
   * @param {Number} statusCode - HTTP status code
   * @param {String} message - Error message
   * @returns {Object} Express response
   */
  const errorResponse = (res, statusCode = 500, message = 'Server Error') => {
    return apiResponse(res, statusCode, false, message);
  };
  
  /**
   * Not found response
   * @param {Object} res - Express response object
   * @param {String} message - Not found message
   * @returns {Object} Express response
   */
  const notFoundResponse = (res, message = 'Resource not found') => {
    return apiResponse(res, 404, false, message);
  };
  
  /**
   * Bad request response
   * @param {Object} res - Express response object
   * @param {String} message - Bad request message
   * @returns {Object} Express response
   */
  const badRequestResponse = (res, message = 'Bad request') => {
    return apiResponse(res, 400, false, message);
  };
  
  /**
   * Unauthorized response
   * @param {Object} res - Express response object
   * @param {String} message - Unauthorized message
   * @returns {Object} Express response
   */
  const unauthorizedResponse = (res, message = 'Unauthorized') => {
    return apiResponse(res, 401, false, message);
  };
  
  /**
   * Forbidden response
   * @param {Object} res - Express response object
   * @param {String} message - Forbidden message
   * @returns {Object} Express response
   */
  const forbiddenResponse = (res, message = 'Forbidden') => {
    return apiResponse(res, 403, false, message);
  };
  
  module.exports = {
    apiResponse,
    successResponse,
    createdResponse,
    errorResponse,
    notFoundResponse,
    badRequestResponse,
    unauthorizedResponse,
    forbiddenResponse
  };