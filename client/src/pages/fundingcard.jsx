// src/components/funding/FundingCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const FundingCard = ({ option }) => {
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

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
  );
};

export default FundingCard;

