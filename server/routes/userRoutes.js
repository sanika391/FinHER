// server/routes/userRoutes.js
const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  changePassword,
  deleteAccount
} = require('../controllers/userController');
const { 
  profileUpdateValidation, 
  resetPasswordValidation,
  validate
} = require('../utils/validation');
const { protect, isVerified } = require('../middleware/authMiddleware');
const { uploadProfileImage } = require('../middleware/uploadMiddleware');

const router = express.Router();

// Protect all routes
router.use(protect);

// Get user profile
router.get('/profile', getUserProfile);

// Update user profile
router.put(
  '/profile', 
  profileUpdateValidation, 
  validate, 
  updateUserProfile
);

// Upload profile image
router.post(
  '/profile/image',
  uploadProfileImage,
  updateUserProfile
);

// Change password
router.put(
  '/change-password',
  resetPasswordValidation,
  validate,
  changePassword
);

// Delete account
router.delete('/account', deleteAccount);

module.exports = router;