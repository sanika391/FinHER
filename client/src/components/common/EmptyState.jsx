import React from 'react';
import PropTypes from 'prop-types';

const EmptyState = ({ 
  icon, 
  title, 
  message, 
  actionLabel, 
  actionLink, 
  onActionClick 
}) => {
  return (
    <div className="bg-white shadow overflow-hidden rounded-lg p-6 text-center">
      {icon ? (
        icon
      ) : (
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )}
      <h3 className="mt-2 text-sm font-medium text-gray-900">{title || "No results found"}</h3>
      <p className="mt-1 text-sm text-gray-500">
        {message || "We couldn't find any matching results. Please try different search terms."}
      </p>
      {actionLabel && (actionLink || onActionClick) && (
        <div className="mt-6">
          {actionLink ? (
            <a
              href={actionLink}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
            >
              {actionLabel}
            </a>
          ) : (
            <button
              onClick={onActionClick}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
            >
              {actionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

EmptyState.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  message: PropTypes.string,
  actionLabel: PropTypes.string,
  actionLink: PropTypes.string,
  onActionClick: PropTypes.func
};

export default EmptyState;