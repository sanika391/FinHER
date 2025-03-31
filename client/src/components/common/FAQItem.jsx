// src/components/faq/FAQItem.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const FAQItem = ({ question, answer, defaultOpen }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen || false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="flex justify-between items-center w-full py-6 px-6 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-gray-800">{question}</h3>
        <span className="ml-6 flex-shrink-0">
          <svg 
            className={`h-6 w-6 text-gray-500 transform ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-200`}
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-6">
          <p className="text-gray-600">{answer}</p>
        </div>
      </div>
    </div>
  );
};

FAQItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  defaultOpen: PropTypes.bool
};

export default FAQItem;