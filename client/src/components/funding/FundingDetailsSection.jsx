import React from 'react';

const FundingDetailsSection = ({ option }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Funding Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600">Type</p>
            <p className="font-medium">{option.type.replace('_', ' ')}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Amount Range</p>
            <p className="font-medium">${option.minAmount.toLocaleString()} - ${option.maxAmount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Interest Rate</p>
            <p className="font-medium">{option.interestRate ? `${option.interestRate}%` : 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Term</p>
            <p className="font-medium">{option.term || 'Flexible'}</p>
          </div>
          {option.provider && (
            <div>
              <p className="text-sm text-gray-600">Provider</p>
              <p className="font-medium">{option.provider}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FundingDetailsSection;