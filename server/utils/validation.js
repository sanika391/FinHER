const { check, validationResult } = require('express-validator');

/**
 * Validation rules for user registration
 */
const registerValidation = [
  check('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ max: 50 })
    .withMessage('First name cannot be longer than 50 characters'),
  
  check('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ max: 50 })
    .withMessage('Last name cannot be longer than 50 characters'),
  
  check('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  check('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
];

/**
 * Validation rules for login
 */
const loginValidation = [
  check('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  check('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
];

/**
 * Validation rules for funding application
 */
const applicationValidation = [
  check('amount')
    .notEmpty()
    .withMessage('Amount is required')
    .isNumeric()
    .withMessage('Amount must be a number'),
  
  check('purpose')
    .trim()
    .notEmpty()
    .withMessage('Purpose is required')
    .isLength({ min: 10, max: 500 })
    .withMessage('Purpose must be between 10 and 500 characters'),
  
  check('financialInfo.income')
    .notEmpty()
    .withMessage('Income is required')
    .isNumeric()
    .withMessage('Income must be a number'),
  
  check('financialInfo.expenses')
    .notEmpty()
    .withMessage('Expenses are required')
    .isNumeric()
    .withMessage('Expenses must be a number'),
  
  check('financialInfo.assets')
    .notEmpty()
    .withMessage('Assets are required')
    .isNumeric()
    .withMessage('Assets must be a number'),
  
  check('financialInfo.liabilities')
    .notEmpty()
    .withMessage('Liabilities are required')
    .isNumeric()
    .withMessage('Liabilities must be a number')
];

/**
 * Validation rules for password reset
 */
const resetPasswordValidation = [
  check('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
];

/**
 * Validation rules for profile update
 */
const profileUpdateValidation = [
  check('firstName')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('First name cannot be longer than 50 characters'),
  
  check('lastName')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Last name cannot be longer than 50 characters'),
  
  check('phone')
    .optional()
    .trim()
    .matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
    .withMessage('Please provide a valid phone number'),
  
  check('bio')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Bio cannot be longer than 500 characters')
];

/**
 * Validation middleware to check for validation errors
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  
  next();
};

module.exports = {
  registerValidation,
  loginValidation,
  applicationValidation,
  resetPasswordValidation,
  profileUpdateValidation,
  validate
};