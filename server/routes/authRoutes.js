// server/routes/authRoutes.js
const express = require('express');
const {
  register,
  login,
  logout,
  getCurrentUser,
  verifyEmail,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');
const { 
  registerValidation,
  loginValidation,
  resetPasswordValidation,
  validate
} = require('../utils/validation');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Register a new user
router.post('/register', registerValidation, validate, register);

// Login user
router.post('/login', loginValidation, validate, login);

// Logout user
router.post('/logout', logout);

// Get current logged in user
router.get('/me', protect, getCurrentUser);

// Verify email
router.get('/verify-email/:token', verifyEmail);

// Forgot password
router.post('/forgot-password', forgotPassword);

// Reset password
router.put('/reset-password/:token', resetPasswordValidation, validate, resetPassword);

module.exports = router;