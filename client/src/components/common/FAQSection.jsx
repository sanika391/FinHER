// src/components/faq/FAQSection.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FAQItem from './FAQItem';

const FAQSection = ({
  title,
  faqs,
  viewAllLink,
  viewAllText,
  className
}) => {
  return (
    <div className={`mt-16 ${className || ''}`}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title || "Frequently Asked Questions"}</h2>
      
      {faqs && faqs.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              defaultOpen={index === 0} // Open the first item by default
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500">No FAQs available at this time.</p>
        </div>
      )}
      
      {viewAllLink && (
        <div className="text-center mt-8">
          <Link to={viewAllLink} className="text-purple-600 font-medium hover:text-purple-700">
            {viewAllText || "View all FAQs →"}
          </Link>
        </div>
      )}
    </div>
  );
};

FAQSection.propTypes = {
  title: PropTypes.string,
  faqs: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired
    })
  ),
  viewAllLink: PropTypes.string,
  viewAllText: PropTypes.string,
  className: PropTypes.string
};

export default FAQSection;