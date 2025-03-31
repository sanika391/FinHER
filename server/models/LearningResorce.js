const mongoose = require('mongoose');

const LearningResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['basics', 'business', 'investment', 'credit', 'taxes'],
    index: true
  },
  duration: {
    type: String
  },
  image: {
    type: String
  },
  url: {
    type: String
  },
  type: {
    type: String,
    enum: ['article', 'video', 'course', 'quiz'],
    default: 'article'
  },
  isPublished: {
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

const LearningResource = mongoose.model('LearningResource', LearningResourceSchema);

module.exports = LearningResource;