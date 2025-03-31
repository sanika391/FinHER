const mongoose = require('mongoose');

const UserProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LearningResource',
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  completedAt: {
    type: Date
  },
  startedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Composite index to ensure a user can have only one progress record per resource
UserProgressSchema.index({ user: 1, resource: 1 }, { unique: true });

const UserProgress = mongoose.model('UserProgress', UserProgressSchema);

module.exports = UserProgress;