const mongoose = require('mongoose');
const logger = require('./logger');

/**
 * Connect to MongoDB database
 * @returns {Promise} Mongoose connection promise
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/femfund', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30
      autoIndex: process.env.NODE_ENV !== 'production' // Don't build indexes in production
    });
    
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

/**
 * Check if the database is empty and seed with initial data if needed
 * @param {Function} seedFunction - Function to seed the database
 * @returns {Promise<void>} Promise that resolves when check is complete
 */
const checkAndSeedDB = async (seedFunction) => {
  try {
    // Check if any users exist
    const User = mongoose.model('User');
    const userCount = await User.countDocuments();
    
    // If no users exist, seed the database
    if (userCount === 0) {
      logger.info('Database is empty. Seeding with initial data...');
      await seedFunction();
      logger.info('Database seeded successfully');
    } else {
      logger.info('Database already contains data. Skipping seed operation');
    }
  } catch (error) {
    logger.error(`Error checking or seeding database: ${error.message}`);
    throw error;
  }
};

/**
 * Close database connection
 * @returns {Promise<void>} Promise that resolves when connection is closed
 */
const closeDB = async () => {
  try {
    await mongoose.connection.close();
    logger.info('MongoDB connection closed');
  } catch (error) {
    logger.error(`Error closing MongoDB connection: ${error.message}`);
    throw error;
  }
};

module.exports = {
  connectDB,
  checkAndSeedDB,
  closeDB
};