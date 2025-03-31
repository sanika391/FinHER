const FundingOption = require('../models/FundingOption');
const Application = require('../models/Application');
const { validationResult } = require('express-validator');
const { evaluateApplication } = require('../services/ai/creditEvaluationService');

// @desc    Get all funding options
// @route   GET /api/funding/options
// @access  Private
exports.getFundingOptions = async (req, res, next) => {
  try {
    const fundingOptions = await FundingOption.find({ isActive: true });
    
    res.json(fundingOptions);
  } catch (error) {
    next(error);
  }
};

// @desc    Get funding option by ID
// @route   GET /api/funding/options/:id
// @access  Private
exports.getFundingOptionById = async (req, res, next) => {
  try {
    const fundingOption = await FundingOption.findById(req.params.id);
    
    if (!fundingOption) {
      return res.status(404).json({ message: 'Funding option not found' });
    }
    
    res.json(fundingOption);
  } catch (error) {
    next(error);
  }
};

// @desc    Submit funding application
// @route   POST /api/funding/apply/:id
// @access  Private
exports.submitApplication = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const fundingOptionId = req.params.id;
    
    // Check if funding option exists
    const fundingOption = await FundingOption.findById(fundingOptionId);
    if (!fundingOption) {
      return res.status(404).json({ message: 'Funding option not found' });
    }
    
    const {
      amount,
      purpose,
      businessPlan,
      financialInfo
    } = req.body;
    
    // Validate amount is within range
    if (amount < fundingOption.minAmount || amount > fundingOption.maxAmount) {
      return res.status(400).json({ 
        message: `Amount must be between ${fundingOption.minAmount} and ${fundingOption.maxAmount}` 
      });
    }
    
    // Create application
    const application = new Application({
      user: req.user.id,
      fundingOption: fundingOptionId,
      amount,
      purpose,
      businessPlan,
      financialInfo,
      status: 'submitted',
      submittedAt: Date.now()
    });
    
    // AI credit evaluation
    try {
      const evaluation = await evaluateApplication(application, req.user);
      
      application.aiEvaluation = {
        score: evaluation.score,
        feedback: evaluation.feedback,
        evaluatedAt: Date.now()
      };
      
    } catch (err) {
      console.error('AI evaluation error:', err);
      // Continue without AI evaluation if it fails
    }
    
    await application.save();
    
    res.status(201).json(application);
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's applications
// @route   GET /api/funding/applications
// @access  Private
exports