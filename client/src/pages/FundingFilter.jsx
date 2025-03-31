// src/components/funding/FundingFilter.jsx
import React from 'react';

const FundingFilter = ({ filter, setFilter }) => {
  return (
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
  );
};

export default FundingFilter;


