// server/middleware/uploadMiddleware.js
const multer = require('multer');
const path = require('path');
const { ensureDirectoryExists, generateUniqueFilename } = require('../utils/fileUtils');
const ErrorResponse = require('../utils/errorResponse');

// Set storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // Set upload directory based on file type
    let uploadDir;
    
    if (file.fieldname === 'profileImage') {
      uploadDir = path.join(__dirname, '../uploads/profiles');
    } else if (file.fieldname === 'document') {
      uploadDir = path.join(__dirname, '../uploads/documents');
    } else {
      uploadDir = path.join(__dirname, '../uploads/general');
    }
    
    // Ensure directory exists
    ensureDirectoryExists(uploadDir);
    
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    // Generate unique filename
    const uniqueFilename = generateUniqueFilename(file.originalname);
    cb(null, uniqueFilename);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Define allowed file types by field
  const allowedTypes = {
    profileImage: ['image/jpeg', 'image/png', 'image/gif'],
    document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
    general: ['image/jpeg', 'image/png', 'application/pdf']
  };
  
  // Get allowed types for this field, or use general if not defined
  const allowed = allowedTypes[file.fieldname] || allowedTypes.general;
  
  // Check file type
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ErrorResponse(`File type not allowed. Allowed types: ${allowed.join(', ')}`, 400), false);
  }
};

// Set upload limits
const limits = {
  fileSize: 10 * 1024 * 1024 // 10MB limit
};

// Create multer upload instance
const upload = multer({ 
  storage, 
  fileFilter,
  limits
});

// Export middleware functions
module.exports = {
  // Single file upload
  uploadProfileImage: upload.single('profileImage'),
  uploadDocument: upload.single('document'),
  
  // Multiple files upload
  uploadDocuments: upload.array('documents', 5), // Max 5 documents
  
  // Different fields upload
  uploadApplicationFiles: upload.fields([
    { name: 'businessPlan', maxCount: 1 },
    { name: 'financialStatements', maxCount: 3 },
    { name: 'identityProof', maxCount: 1 }
  ]),
  
  // Error handler
  handleUploadError: (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      // Multer error
      let message;
      
      if (err.code === 'LIMIT_FILE_SIZE') {
        message = 'File too large. Maximum size is 10MB';
      } else if (err.code === 'LIMIT_FILE_COUNT') {
        message = 'Too many files uploaded';
      } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        message = `Unexpected field: ${err.field}`;
      } else {
        message = 'File upload error';
      }
      
      return res.status(400).json({
        success: false,
        message
      });
    }
    
    // Pass to global error handler
    next(err);
  }
};