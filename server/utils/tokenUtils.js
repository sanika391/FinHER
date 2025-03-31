const jwt = require('jsonwebtoken');
const crypto = require('crypto');

/**
 * Generate a JWT token
 * @param {string} id - User ID
 * @param {string} role - User role
 * @returns {string} JWT token
 */
const generateToken = (id, role = 'user') => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );
};

/**
 * Generate a random reset token
 * @returns {string} Reset token
 */
const generateResetToken = () => {
  // Generate random token
  const resetToken = crypto.randomBytes(20).toString('hex');
  
  // Hash the token for storage in the database
  const resetTokenHash = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  return { resetToken, resetTokenHash };
};

/**
 * Generate a verification token
 * @returns {string} Verification token
 */
const generateVerificationToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

/**
 * Hash a token
 * @param {string} token - Token to hash
 * @returns {string} Hashed token
 */
const hashToken = (token) => {
  return crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
};

module.exports = {
  generateToken,
  generateResetToken,
  generateVerificationToken,
  hashToken
};