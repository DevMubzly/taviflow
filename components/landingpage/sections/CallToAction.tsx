
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from 'lucide-react';

const features = [
  "Mobile Money Integration – Simplify transactions with instant payments",
  "Bank Connectivity – Manage finances effortlessly with secure bank integrations",
  "Robust Payment Processing – Secure, fast, and reliable payment handling",
  "User-Friendly Interface – Intuitive design for smooth navigation",
  "Cost-Effective Solution – Reduce operational expenses while maximizing accuracy"
];

const CallToAction = () => {
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
    <section className="py-24 bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-taviflow-gray-light to-transparent opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8" data-animate style={{animationDelay: '0.1s'}}>
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-gradient">Experience TaviFlow</span> Today
            </h2>
            <p className="text-taviflow-gray text-lg">
              Simplifying Inventory Management for SMEs. TaviFlow provides a comprehensive, user-friendly solution designed to help SMEs manage stock, finances, and payments with ease.
            </p>
            
            <div className="space-y-4 pt-4">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-start" 
                  data-animate 
                  style={{animationDelay: `${0.2 + index * 0.1}s`}}
                >
                  <CheckCircle className="h-6 w-6 text-taviflow-blue shrink-0 mr-3" />
                  <span className="text-taviflow-dark">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-4">
              <Button className="btn-gradient text-lg h-12 px-8 group" size="lg">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
          
          <div 
            className="relative lg:h-[500px] flex items-center justify-center"
            data-animate 
            style={{animationDelay: '0.4s'}}
          >
            {/* Decorative background */}
            <div className="absolute inset-0 bg-dashed-pattern opacity-10 rounded-3xl"></div>
            
            {/* Main image */}
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute -inset-1 bg-gradient-blue rounded-2xl blur opacity-20 animate-pulse-slow"></div>
              <div className="relative glass-card rounded-2xl shadow-xl overflow-hidden border border-taviflow-blue-light/30">
                <img 
                  src="/assets/reports.jpeg" 
                  alt="TaviFlow Dashboard" 
                  className="w-full h-auto rounded-2xl"
                />
              </div>
              
              {/* Floating elements */}
              <div 
                className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4 animate-float" 
                style={{animationDelay: '0.3s'}}
              >
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">JD</div>
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">AR</div>
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">TL</div>
                  </div>
                  <div className="text-sm font-medium">
                    3,000+ Users
                  </div>
                </div>
              </div>
              
              <div 
                className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 animate-float" 
                style={{animationDelay: '0.7s'}}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium">95% Satisfaction</div>
                    <div className="text-xs text-taviflow-gray">User rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
