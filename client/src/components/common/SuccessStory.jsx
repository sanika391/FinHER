// src/components/success/SuccessStory.jsx
import React from 'react';
import PropTypes from 'prop-types';

const SuccessStory = ({ 
  name, 
  title, 
  image, 
  testimonial, 
  rating,
  fundingType 
}) => {
  // Generate rating stars based on the rating (1-5)
  const renderStars = () => {
    const stars = [];
    const ratingValue = Math.min(Math.max(rating || 5, 1), 5);
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg 
          key={i} 
          className={`h-5 w-5 ${i < ratingValue ? 'text-yellow-400' : 'text-gray-300'}`} 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img 
            src={image || "/api/placeholder/60/60"} 
            alt={name} 
            className="w-12 h-12 rounded-full mr-4 object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500">{title}</p>
            {fundingType && (
              <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-800 mt-1">
                {fundingType}
              </span>
            )}
          </div>
        </div>
        <p className="text-gray-600 mb-4">
          "{testimonial}"
        </p>
        <div className="flex items-center">
          {renderStars()}
        </div>
      </div>
    </div>
  );
};

SuccessStory.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  testimonial: PropTypes.string.isRequired,
  rating: PropTypes.number,
  fundingType: PropTypes.string
};

export default SuccessStory;