// src/components/success/SuccessStoriesSection.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SuccessStory from './SuccessStory';

const SuccessStoriesSection = ({ 
  title, 
  stories, 
  viewAllLink, 
  viewAllText,
  className 
}) => {
  return (
    <div className={`mt-16 ${className || ''}`}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title || "Success Stories"}</h2>
      
      {stories && stories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <SuccessStory 
              key={index}
              name={story.name}
              title={story.title}
              image={story.image}
              testimonial={story.testimonial}
              rating={story.rating}
              fundingType={story.fundingType}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500">No success stories available at this time.</p>
        </div>
      )}
      
      {viewAllLink && (
        <div className="text-center mt-8">
          <Link to={viewAllLink} className="text-purple-600 font-medium hover:text-purple-700">
            {viewAllText || "Read more success stories →"}
          </Link>
        </div>
      )}
    </div>
  );
};

SuccessStoriesSection.propTypes = {
  title: PropTypes.string,
  stories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string,
      testimonial: PropTypes.string.isRequired,
      rating: PropTypes.number,
      fundingType: PropTypes.string
    })
  ),
  viewAllLink: PropTypes.string,
  viewAllText: PropTypes.string,
  className: PropTypes.string
};

export default SuccessStoriesSection;