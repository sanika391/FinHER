import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerFunds } from '../services/fundingService';

const RegisterFunds = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'microloan',
    minAmount: '',
    maxAmount: '',
    interestRate: '',
    term: '',
    eligibilityCriteria: '',
    requiredDocuments: '',
    applicationProcess: '',
    provider: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Validate numbers
      const minAmount = parseFloat(formData.minAmount);
      const maxAmount = parseFloat(formData.maxAmount);
      const interestRate = formData.interestRate ? parseFloat(formData.interestRate) : 0;

      if (isNaN(minAmount) || minAmount <= 0) {
        throw new Error('Minimum amount must be a positive number');
      }

      if (isNaN(maxAmount) || maxAmount <= 0) {
        throw new Error('Maximum amount must be a positive number');
      }

      if (maxAmount < minAmount) {
        throw new Error('Maximum amount must be greater than minimum amount');
      }

      if (formData.interestRate && (isNaN(interestRate) || interestRate < 0)) {
        throw new Error('Interest rate must be a non-negative number');
      }

      // Split criteria and documents by line breaks
      const eligibilityCriteria = formData.eligibilityCriteria
        .split('\n')
        .filter(item => item.trim() !== '');
      
      const requiredDocuments = formData.requiredDocuments
        .split('\n')
        .filter(item => item.trim() !== '');

      // Prepare data for submission
      const fundingData = {
        ...formData,
        minAmount,
        maxAmount,
        interestRate: interestRate || 0,
        eligibilityCriteria,
        requiredDocuments
      };

      const response = await registerFunds(fundingData);
      
      setSuccess('Funding option registered successfully!');
      setFormData({
        name: '',
        description: '',
        type: 'microloan',
        minAmount: '',
        maxAmount: '',
        interestRate: '',
        term: '',
        eligibilityCriteria: '',
        requiredDocuments: '',
        applicationProcess: '',
        provider: ''
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/admin/funding-options');
      }, 2000);
      
    } catch (err) {
      setError(err.message || 'Failed to register funding option. Please try again.');
      console.error('Funding registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Register New Funding Option</h1>
        <p className="text-gray-600 mt-2">Add a new funding opportunity to the platform</p>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-5" role="alert">
          <p>{success}</p>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="col-span-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Funding Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="Women Entrepreneur Grant"
              />
            </div>

            <div className="col-span-1">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Funding Type *
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="microloan">Microloan</option>
                <option value="grant">Grant</option>
                <option value="venture_capital">Venture Capital</option>
                <option value="peer_to_peer">Peer-to-Peer</option>
              </select>
            </div>

            <div className="col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="Provide a detailed description of this funding option"
              ></textarea>
            </div>

            <div>
              <label htmlFor="minAmount" className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Amount ($) *
              </label>
              <input
                type="number"
                id="minAmount"
                name="minAmount"
                value={formData.minAmount}
                onChange={handleChange}
                required
                min="0"
                step="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="1000"
              />
            </div>

            <div>
              <label htmlFor="maxAmount" className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Amount ($) *
              </label>
              <input
                type="number"
                id="maxAmount"
                name="maxAmount"
                value={formData.maxAmount}
                onChange={handleChange}
                required
                min="0"
                step="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="10000"
              />
            </div>

            <div>
              <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-2">
                Interest Rate (%)
              </label>
              <input
                type="number"
                id="interestRate"
                name="interestRate"
                value={formData.interestRate}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="5.5"
              />
              <p className="mt-1 text-xs text-gray-500">
                Leave blank for grants or interest-free options
              </p>
            </div>

            <div>
              <label htmlFor="term" className="block text-sm font-medium text-gray-700 mb-2">
                Term / Duration
              </label>
              <input
                type="text"
                id="term"
                name="term"
                value={formData.term}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="12 months"
              />
            </div>

            <div className="col-span-2">
              <label htmlFor="eligibilityCriteria" className="block text-sm font-medium text-gray-700 mb-2">
                Eligibility Criteria
              </label>
              <textarea
                id="eligibilityCriteria"
                name="eligibilityCriteria"
                value={formData.eligibilityCriteria}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter each criterion on a new line
Must be a woman-owned business
Business must be at least 1 year old
Annual revenue under $100,000"
              ></textarea>
            </div>

            <div className="col-span-2">
              <label htmlFor="requiredDocuments" className="block text-sm font-medium text-gray-700 mb-2">
                Required Documents
              </label>
              <textarea
                id="requiredDocuments"
                name="requiredDocuments"
                value={formData.requiredDocuments}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter each document on a new line
Business plan
Financial statements
Tax returns
Proof of identity"
              ></textarea>
            </div>

            <div className="col-span-2">
              <label htmlFor="applicationProcess" className="block text-sm font-medium text-gray-700 mb-2">
                Application Process
              </label>
              <textarea
                id="applicationProcess"
                name="applicationProcess"
                value={formData.applicationProcess}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="Describe the application and approval process"
              ></textarea>
            </div>

            <div className="col-span-2">
              <label htmlFor="provider" className="block text-sm font-medium text-gray-700 mb-2">
                Provider / Organization
              </label>
              <input
                type="text"
                id="provider"
                name="provider"
                value={formData.provider}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="Organization providing the funding"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/admin/funding-options')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded mr-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded disabled:opacity-75"
            >
              {loading ? 'Registering...' : 'Register Funding Option'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterFunds;