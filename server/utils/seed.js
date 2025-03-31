const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const FundingOption = require('../models/FundingOption');
const LearningResource = require('../models/LearningResource');
const { fundingOptions, learningResources } = require('./seedData');
const logger = require('./logger');

/**
 * Seed the database with initial data
 */
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await FundingOption.deleteMany({});
    await LearningResource.deleteMany({});
    
    logger.info('Cleared existing data');
    
    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    
    const admin = new User({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@femfund.com',
      password: adminPassword,
      role: 'admin',
      isVerified: true,
      financialScore: 95
    });
    
    await admin.save();
    logger.info('Admin user created');
    
    // Create sample user
    const userPassword = await bcrypt.hash('user123', 10);
    
    const user = new User({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      password: userPassword,
      phone: '555-123-4567',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '90210',
      bio: 'Woman entrepreneur with a passion for technology and innovation.',
      isVerified: true,
      financialScore: 82
    });
    
    await user.save();
    logger.info('Sample user created');
    
    // Create funding options
    await FundingOption.insertMany(fundingOptions);
    logger.info(`${fundingOptions.length} funding options created`);
    
    // Create learning resources
    await LearningResource.insertMany(learningResources);
    logger.info(`${learningResources.length} learning resources created`);
    
    logger.info('Database seeded successfully');
  } catch (error) {
    logger.error('Error seeding database:', error);
    throw error;
  }
};

module.exports = seedDatabase;