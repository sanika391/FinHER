const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fundingOption: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FundingOption',
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required']
  },
  purpose: {
    type: String,
    required: [true, 'Purpose is required']
  },
  businessPlan: {
    type: String
  },
  financialInfo: {
    income: Number,
    expenses: Number,
    assets: Number,
    liabilities: Number
  },
  documents: [{
    name: String,
    path: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    enum: ['draft', 'submitted', 'under_review', 'approved', 'rejected', 'funded'],
    default: 'draft'
  },
  aiEvaluation: {
    score: Number,
    feedback: String,
    evaluatedAt: Date
  },
  reviewerNotes: {
    type: String
  },
  submittedAt: {
    type: Date
  },
  decidedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Application = mongoose.model('Application', ApplicationSchema);

module.exports = Application;