import React from 'react';
import { Link } from 'react-router-dom';

const ConsultationCTA = () => {
  return (
    <div className="mt-12 bg-purple-50 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-purple-800 mb-4">Need Help Finding the Right Funding?</h2>
      <p className="text-purple-700 mb-6">
        Our financial advisors can help you navigate your options and find the perfect funding solution for your business needs.
      </p>
      <Link 
        to="/contact" 
        className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        Schedule a Consultation
      </Link>
    </div>
  );
};

export default ConsultationCTA;
