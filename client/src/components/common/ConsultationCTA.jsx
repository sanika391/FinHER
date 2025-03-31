// src/components/common/ConsultationCTA.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ConsultationCTA = ({
  title,
  description,
  buttonText,
  buttonLink,
  bgColor,
  textColor,
  buttonColor,
  buttonTextColor
}) => {
  return (
    <div className={`mt-12 ${bgColor || 'bg-purple-50'} rounded-lg p-6`}>
      <h2 className={`text-2xl font-bold ${textColor || 'text-purple-800'} mb-4`}>
        {title || "Need Help Finding the Right Funding?"}
      </h2>
      <p className={`${textColor ? textColor.replace('text-', 'text-opacity-80 text-') : 'text-purple-700'} mb-6`}>
        {description || "Our financial advisors can help you navigate your options and find the perfect funding solution for your business needs."}
      </p>
      <Link 
        to={buttonLink || "/contact"} 
        className={`inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md shadow-sm ${buttonTextColor || 'text-white'} ${buttonColor || 'bg-purple-600 hover:bg-purple-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
      >
        {buttonText || "Schedule a Consultation"}
      </Link>
    </div>
  );
};

ConsultationCTA.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  buttonText: PropTypes.string,
  buttonLink: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  buttonColor: PropTypes.string,
  buttonTextColor: PropTypes.string
};

export default ConsultationCTA;