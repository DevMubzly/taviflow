
import React from 'react';
import Testimonial, { TestimonialProps } from './Testimonial';

const TestimonialList = () => {
  const testimonials: TestimonialProps[] = [
    {
      name: "Balinda Mubarak",
      timeAgo: "2 days ago",
      content: "I felt secure while making my payment and appreciated the encryption measures in place.",
      rating: 5,
    },
    {
      name: "Mumanye Timothy",
      timeAgo: "1 week ago",
      content: "The transaction process was smooth, and I felt confident in the security provided.",
      rating: 5,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {testimonials.map((testimonial, index) => (
        <Testimonial key={index} {...testimonial} />
      ))}
    </div>
  );
};

export default TestimonialList;
