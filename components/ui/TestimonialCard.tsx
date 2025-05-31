
import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  testimonial: string;
  rating: number;
  image: string;
  delay: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  company,
  testimonial,
  rating,
  image,
  delay
}) => {
  return (
    <div 
      className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 feature-card-hover"
      data-animate
      style={{animationDelay: delay}}
    >
      <div className="flex mb-6">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 ${
              index < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      
      <blockquote className="mb-8 text-taviflow-dark">
        "{testimonial}"
      </blockquote>
      
      <div className="flex items-center">
        <div className="mr-4">
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
        <div>
          <div className="font-medium text-taviflow-dark">{name}</div>
          <div className="text-sm text-taviflow-gray">
            {role}, {company}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
