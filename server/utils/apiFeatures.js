class APIFeatures {
    /**
     * @param {Object} query - Mongoose query object
     * @param {Object} queryString - Express req.query object
     */
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
  
    /**
     * Filter results based on query parameters
     * @returns {APIFeatures} Instance of APIFeatures for chaining
     */
    filter() {
      const queryObj = { ...this.queryString };
      const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
      excludedFields.forEach(field => delete queryObj[field]);
  
      // Advanced filtering (e.g., gte, gt, lte, lt)
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
  
      this.query = this.query.find(JSON.parse(queryStr));
  
      return this;
    }
  
    /**
     * Handle search queries (text search)
     * @returns {APIFeatures} Instance of APIFeatures for chaining
     */
    search() {
      if (this.queryString.search) {
        const searchTerms = this.queryString.search.split(',');
        const searchQueries = [];
  
        // Create text search queries for each term
        searchTerms.forEach(term => {
          // Add search queries for different fields
          // This will be model-specific and should be customized
          searchQueries.push({ name: { $regex: term, $options: 'i' } });
          searchQueries.push({ description: { $regex: term, $options: 'i' } });
          // Add other fields as needed
        });
  
        this.query = this.query.find({ $or: searchQueries });
      }
  
      return this;
    }
  
    /**
     * Sort results based on query parameters
     * @returns {APIFeatures} Instance of APIFeatures for chaining
     */
    sort() {
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy);
      } else {
        // Default sort (newest first)
        this.query = this.query.sort('-createdAt');
      }
  
      return this;
    }
  
    /**
     * Limit fields returned in the results
     * @returns {APIFeatures} Instance of APIFeatures for chaining
     */
    limitFields() {
      if (this.queryString.fields) {
        const fields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(fields);
      } else {
        // Exclude the MongoDB version key by default
        this.query = this.query.select('-__v');
      }
  
      return this;
    }
  
    /**
     * Paginate results
     * @returns {APIFeatures} Instance of APIFeatures for chaining
     */
    paginate() {
      const page = parseInt(this.queryString.page, 10) || 1;
      const limit = parseInt(this.queryString.limit, 10) || 10;
      const skip = (page - 1) * limit;
  
      this.query = this.query.skip(skip).limit(limit);
  
      return this;
    }
  }
  
  module.exports = APIFeatures;
  