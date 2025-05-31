
import React from 'react';
import Navbar from '@/components/landingpage/layout/Navbar';
import Footer from '@/components/landingpage/layout/Footer';
import FAQContent from '@/components/landingpage/sections/FAQContent';

const FAQ = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <div 
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center"
          data-animate
        >
          <h1 className="text-4xl md:text-5xl font-bold text-taviflow-dark mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-taviflow-gray max-w-3xl mx-auto">
            Find answers to common questions about TaviFlow's inventory management solution
          </p>
        </div>
        
        {/* FAQ Content */}
        <FAQContent />
      </div>
      
      <Footer />
    </div>
  );
};

export default FAQ;
