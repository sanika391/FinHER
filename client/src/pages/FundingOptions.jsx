import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFundingOptions } from '../services/fundingService';

const FundingOptions = () => {
  const [fundingOptions, setFundingOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchFundingOptions = async () => {
      try {
        const data = await getFundingOptions();
        setFundingOptions(data);
      } catch (err) {
        setError('Failed to load funding options. Please try again later.');
        console.error('Funding options error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFundingOptions();
  }, []);

  // Apply filters
  let filteredOptions = fundingOptions;
  
  if (filter !== 'all') {
    filteredOptions = fundingOptions.filter(option => option.type === filter);
  }
  
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredOptions = filteredOptions.filter(option => 
      option.name.toLowerCase().includes(term) || 
      option.description.toLowerCase().includes(term) ||
      option.provider?.toLowerCase().includes(term)
    );
  }

  const getTypeLabel = (type) => {
    switch (type) {
      case 'microloan':
        return 'Microloan';
      case 'grant':
        return 'Grant';
      case 'venture_capital':
        return 'Venture Capital';
      case 'peer_to_peer':
        return 'Peer to Peer';
      default:
        return type;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'microloan':
        return 'bg-blue-100 text-blue-800';
      case 'grant':
        return 'bg-green-100 text-green-800';
      case 'venture_capital':
        return 'bg-purple-100 text-purple-800';
      case 'peer_to_peer':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Funding Options</h1>
        <p className="text-gray-600 mt-2">Explore financial resources designed specifically for women entrepreneurs</p>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
          <p>{error}</p>
        </div>
      )}

      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === 'all' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Options
          </button>
          <button 
            onClick={() => setFilter('microloan')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === 'microloan' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Microloans
          </button>
          <button 
            onClick={() => setFilter('grant')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === 'grant' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Grants
          </button>
          <button 
            onClick={() => setFilter('venture_capital')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === 'venture_capital' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Venture Capital
          </button>
          <button 
            onClick={() => setFilter('peer_to_peer')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === 'peer_to_peer' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Peer-to-Peer
          </button>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search funding options..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          />
          <div className="absolute left-3 top-2.5">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      {filteredOptions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOptions.map((option) => (
            <div key={option._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-purple-100 flex items-center justify-center">
                <img 
                  src={option.image || 'https://via.placeholder.com/300x150?text=Funding+Option'} 
                  alt={option.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{option.name}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(option.type)}`}>
                    {getTypeLabel(option.type)}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <span className="font-medium mr-2">Amount Range:</span>
                    <span>${option.minAmount.toLocaleString()} - ${option.maxAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <span className="font-medium mr-2">Interest Rate:</span>
                    <span>{option.interestRate ? `${option.interestRate}%` : 'N/A'}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium mr-2">Term:</span>
                    <span>{option.term || 'Flexible'}</span>
                  </div>
                </div>
                <Link
                  to={`/funding/${option._id}/apply`}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden rounded-lg p-6 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No funding options found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {filter === 'all' 
              ? "We couldn't find any funding options. Please try again later." 
              : `We couldn't find any ${getTypeLabel(filter).toLowerCase()} options. Try another category.`}
          </p>
        </div>
      )}

      <div className="mt-12 bg-purple-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">Need Help Finding the Right Funding?</h2>
        <p className="text-purple-700 mb-6">
          Our financial advisors can help you navigate your options and find the perfect funding solution for your business needs.
        </p>
        <a 
          href="/contact" 
          className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Schedule a Consultation
        </a>
      </div>
    </div>
  );
};

export default FundingOptions;