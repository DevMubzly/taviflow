
import React, { useEffect } from 'react';
import TestimonialCard from '@/components/ui/TestimonialCard';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Operations Manager",
    company: "GreenTech Solutions",
    testimonial: "TaviFlow has completely transformed how we manage our inventory. The real-time tracking and mobile money integration have saved us countless hours and significantly reduced errors.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    name: "Michael Chen",
    role: "Small Business Owner",
    company: "Chen Electronics",
    testimonial: "As a small business owner, I needed an inventory solution that was both powerful and affordable. TaviFlow delivered beyond my expectations with its intuitive interface and comprehensive features.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    name: "Elena Rodriguez",
    role: "Supply Chain Director",
    company: "Nexus Retail",
    testimonial: "The reporting and analytics features in TaviFlow have given us insights we never had before. We've optimized our stock levels and reduced overstock by 30% in just three months.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop"
  }
];

const Testimonials = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-taviflow-light relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16" data-animate style={{animationDelay: '0.1s'}}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">What Our Clients</span> Are Saying
          </h2>
          <p className="text-taviflow-gray text-lg">
            Don't just take our word for it—hear from the businesses that have transformed their inventory management with TaviFlow
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              company={testimonial.company}
              testimonial={testimonial.testimonial}
              rating={testimonial.rating}
              image={testimonial.image}
              delay={`${0.2 + index * 0.1}s`}
            />
          ))}
        </div>
      </div>
      
      {/* Decoration */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-taviflow-blue/5 rounded-full translate-y-1/2 translate-x-1/2 blur-3xl"></div>
    </section>
  );
};

export default Testimonials;
