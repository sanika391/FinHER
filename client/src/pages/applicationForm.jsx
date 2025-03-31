import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFundingDetails, submitFundingApplication } from '../services/fundingService';

const ApplicationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fundingOption, setFundingOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    amount: '',
    purpose: '',
    businessPlan: '',
    financialInfo: {
      income: '',
      expenses: '',
      assets: '',
      liabilities: ''
    }
  });

  useEffect(() => {
    const fetchFundingDetails = async () => {
      try {
        const data = await getFundingDetails(id);
        setFundingOption(data);
        // Set default amount to minimum amount
        setFormData(prev => ({
          ...prev,
          amount: data.minAmount
        }));
      } catch (err) {
        setError('Failed to load funding details. Please try again.');
        console.error('Funding details error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFundingDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      // Validate amount
      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount < fundingOption.minAmount || amount > fundingOption.maxAmount) {
        throw new Error(`Amount must be between $${fundingOption.minAmount} and $${fundingOption.maxAmount}`);
      }

      // Convert financial info values to numbers
      const financialInfo = {
        income: parseFloat(formData.financialInfo.income) || 0,
        expenses: parseFloat(formData.financialInfo.expenses) || 0,
        assets: parseFloat(formData.financialInfo.assets) || 0,
        liabilities: parseFloat(formData.financialInfo.liabilities) || 0
      };

      // Create application data
      const applicationData = {
        ...formData,
        amount,
        financialInfo
      };

      const response = await submitFundingApplication(id, applicationData);
      
      // Redirect to application status page
      navigate(`/applications/${response._id}`);
    } catch (err) {
      setError(err.message || 'Failed to submit application. Please try again.');
      console.error('Application submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!fundingOption) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
          <p>Funding option not found. Please select a valid funding option.</p>
        </div>
        <button
          onClick={() => navigate('/funding')}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Funding Options
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Apply for {fundingOption.name}</h1>
        <p className="text-gray-600 mt-2">Complete the form below to submit your application</p>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
          <p>{error}</p>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Funding Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600">Type</p>
              <p className="font-medium">{fundingOption.type.replace('_', ' ')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Amount Range</p>
              <p className="font-medium">${fundingOption.minAmount} - ${fundingOption.maxAmount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Interest Rate</p>
              <p className="font-medium">{fundingOption.interestRate ? `${fundingOption.interestRate}%` : 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Term</p>
              <p className="font-medium">{fundingOption.term || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Application Form</h2>
          
          <div className="mb-6">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Funding Amount ($)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min={fundingOption.minAmount}
              max={fundingOption.maxAmount}
              step="100"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
            <p className="mt-1 text-sm text-gray-500">
              Enter an amount between ${fundingOption.minAmount} and ${fundingOption.maxAmount}
            </p>
          </div>
          
          <div className="mb-6">
            <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2">
              Purpose of Funding
            </label>
            <textarea
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              placeholder="Explain how you plan to use these funds"
            ></textarea>
          </div>
          
          <div className="mb-6">
            <label htmlFor="businessPlan" className="block text-sm font-medium text-gray-700 mb-2">
              Business Plan Summary
            </label>
            <textarea
              id="businessPlan"
              name="businessPlan"
              value={formData.businessPlan}
              onChange={handleChange}
              rows="6"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              placeholder="Provide a brief summary of your business plan or idea"
            ></textarea>
            <p className="mt-1 text-sm text-gray-500">
              This is required for business funding but optional for personal funding
            </p>
          </div>
          
          <h3 className="text-lg font-medium text-gray-800 mb-4">Financial Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Income ($)
              </label>
              <input
                type="number"
                id="income"
                name="financialInfo.income"
                value={formData.financialInfo.income}
                onChange={handleChange}
                min="0"
                step="100"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            
            <div>
              <label htmlFor="expenses" className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Expenses ($)
              </label>
              <input
                type="number"
                id="expenses"
                name="financialInfo.expenses"
                value={formData.financialInfo.expenses}
                onChange={handleChange}
                min="0"
                step="100"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            
            <div>
              <label htmlFor="assets" className="block text-sm font-medium text-gray-700 mb-2">
                Total Assets ($)
              </label>
              <input
                type="number"
                id="assets"
                name="financialInfo.assets"
                value={formData.financialInfo.assets}
                onChange={handleChange}
                min="0"
                step="100"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                Include savings, investments, property, etc.
              </p>
            </div>
            
            <div>
              <label htmlFor="liabilities" className="block text-sm font-medium text-gray-700 mb-2">
                Total Liabilities ($)
              </label>
              <input
                type="number"
                id="liabilities"
                name="financialInfo.liabilities"
                value={formData.financialInfo.liabilities}
                onChange={handleChange}
                min="0"
                step="100"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                Include loans, credit card debt, etc.
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center mb-4">
              <input
                id="agreement"
                name="agreement"
                type="checkbox"
                required
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="agreement" className="ml-2 block text-sm text-gray-700">
                I confirm that all information provided is accurate and complete
              </label>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate('/funding')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded mr-4"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded disabled:opacity-75"
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;