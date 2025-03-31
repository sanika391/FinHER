// server/routes/learningRoutes.js
const express = require('express');
const {
  getLearningResources,
  getLearningResourceById,
  completeResource,
  getUserProgress
} = require('../controllers/learningController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all routes
router.use(protect);

// Get all learning resources
router.get('/resources', getLearningResources);

// Get single learning resource
router.get('/resources/:id', getLearningResourceById);

// Mark resource as completed
router.post('/resources/:id/complete', completeResource);

// Get user learning progress
router.get('/progress', getUserProgress);

module.exports = router;