
import React, { useEffect } from 'react';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { TrendingUp, Clock, CheckCircle, Users } from 'lucide-react';

const Stats = () => {
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
    <section id="benefits" className="py-24 relative bg-white">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-taviflow-gray-light to-transparent opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16" data-animate style={{animationDelay: '0.1s'}}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Real Results</span> for Real Businesses
          </h2>
          <p className="text-taviflow-gray text-lg">
            See how TaviFlow transforms inventory management for businesses just like yours
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center"
            data-animate
            style={{animationDelay: '0.2s'}}
          >
            <div className="w-14 h-14 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
              <TrendingUp className="h-7 w-7 text-taviflow-blue" />
            </div>
            <AnimatedCounter end={90} suffix="%" />
            <p className="mt-2 text-taviflow-gray font-medium">Increased Efficiency</p>
          </div>
          
          <div 
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center"
            data-animate
            style={{animationDelay: '0.3s'}}
          >
            <div className="w-14 h-14 rounded-lg bg-green-50 flex items-center justify-center mb-4">
              <Clock className="h-7 w-7 text-green-500" />
            </div>
            <AnimatedCounter end={65} suffix="%" />
            <p className="mt-2 text-taviflow-gray font-medium">Time Saved on Inventory Tasks</p>
          </div>
          
          <div 
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center"
            data-animate
            style={{animationDelay: '0.4s'}}
          >
            <div className="w-14 h-14 rounded-lg bg-purple-50 flex items-center justify-center mb-4">
              <CheckCircle className="h-7 w-7 text-purple-500" />
            </div>
            <AnimatedCounter end={95} suffix="%" />
            <p className="mt-2 text-taviflow-gray font-medium">User Satisfaction Rating</p>
          </div>
          
          <div 
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center"
            data-animate
            style={{animationDelay: '0.5s'}}
          >
            <div className="w-14 h-14 rounded-lg bg-amber-50 flex items-center justify-center mb-4">
              <Users className="h-7 w-7 text-amber-500" />
            </div>
            <AnimatedCounter end={3000} prefix="+" />
            <p className="mt-2 text-taviflow-gray font-medium">Businesses Transformed</p>
          </div>
        </div>
        
        <div 
          className="mt-20 bg-gradient-blue rounded-2xl p-8 md:p-12 text-white shadow-xl"
          data-animate
          style={{animationDelay: '0.6s'}}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-3">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform your inventory management?</h3>
              <p className="text-blue-100 text-lg">
                Join thousands of businesses that have streamlined their operations with TaviFlow.
              </p>
            </div>
            <div className="lg:col-span-2 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-8 py-3 bg-white text-taviflow-blue font-medium rounded-lg hover:bg-blue-50 transition-colors">
                Start Free Trial
              </button>
              <button className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
