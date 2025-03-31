const mongoose = require('mongoose');

const FundingOptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Funding option name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: ['microloan', 'grant', 'venture_capital', 'peer_to_peer'],
    index: true
  },
  minAmount: {
    type: Number,
    required: [true, 'Minimum amount is required']
  },
  maxAmount: {
    type: Number,
    required: [true, 'Maximum amount is required']
  },
  interestRate: {
    type: Number,
    default: 0
  },
  term: {
    type: String
  },
  eligibilityCriteria: {
    type: [String]
  },
  requiredDocuments: {
    type: [String]
  },
  applicationProcess: {
    type: String
  },
  image: {
    type: String
  },
  provider: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const FundingOption = mongoose.model('FundingOption', FundingOptionSchema);

module.exports = FundingOption;