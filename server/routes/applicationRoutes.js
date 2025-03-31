// server/routes/applicationRoutes.js
const express = require('express');
const {
  getUserApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  uploadDocumentToApplication
} = require('../controllers/applicationController');
const { protect, isVerified } = require('../middleware/authMiddleware');
const { uploadDocument, handleUploadError } = require('../middleware/uploadMiddleware');

const router = express.Router();

// Protect all routes
router.use(protect);
router.use(isVerified);

// Get all user applications
router.get('/', getUserApplications);

// Get single application
router.get('/:id', getApplicationById);

// Update application
router.put('/:id', updateApplication);

// Delete application
router.delete('/:id', deleteApplication);

// Upload document to application
router.post(
  '/:id/documents',
  uploadDocument,
  handleUploadError,
  uploadDocumentToApplication
);

module.exports = router;