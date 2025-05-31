
import React from 'react';
import TestimonialCard from '@/components/ui/TestimonialCard';

const PricingTestimonials = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50 rounded-xl">
      <div className="text-center mb-12" data-animate>
        <h2 className="text-3xl font-bold text-taviflow-dark mb-4">What Our Customers Say</h2>
        <p className="text-lg text-taviflow-gray max-w-2xl mx-auto">
          Hear from businesses that have transformed their inventory management with TaviFlow
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <TestimonialCard
          name="Sarah Johnson"
          role="Operations Manager"
          company="Urban Retail Solutions"
          testimonial="Since upgrading to the Pro plan, we've saved countless hours on inventory management. The advanced reporting features have given us insights we never had before, helping us make data-driven decisions."
          rating={5}
          image="/placeholder.svg"
          delay="0ms"
        />
        
        <TestimonialCard
          name="Michael Chen"
          role="Owner"
          company="Harmony Supplies"
          testimonial="Started with the Basic plan and quickly realized the value of upgrading to Premium. The multi-location features alone have paid for themselves. Our inventory accuracy went from 75% to 99% within months."
          rating={5}
          image="/placeholder.svg"
          delay="100ms"
        />
        
        <TestimonialCard
          name="Esther Okafor"
          role="Financial Director"
          company="Sunset Electronics"
          testimonial="The Premium plan's integration capabilities have allowed us to connect our inventory with our accounting system, saving us from double entry and providing real-time financial insights."
          rating={4}
          image="/placeholder.svg"
          delay="200ms"
        />
      </div>
    </div>
  );
};

export default PricingTestimonials;
