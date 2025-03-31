const fs = require('fs');
const path = require('path');

/**
 * Create directory if it doesn't exist
 * @param {string} dirPath - Directory path
 */
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

/**
 * Delete file if it exists
 * @param {string} filePath - File path
 */
const deleteFileIfExists = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

/**
 * Get file extension
 * @param {string} filename - File name
 * @returns {string} File extension
 */
const getFileExtension = (filename) => {
  return filename.split('.').pop();
};

/**
 * Generate unique filename
 * @param {string} originalname - Original file name
 * @returns {string} Unique filename
 */
const generateUniqueFilename = (originalname) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 10);
  const extension = getFileExtension(originalname);
  
  return `${timestamp}-${randomString}.${extension}`;
};

module.exports = {
  ensureDirectoryExists,
  deleteFileIfExists,
  getFileExtension,
  generateUniqueFilename
};