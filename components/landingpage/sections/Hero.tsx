'use client'

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const worldMapRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  useEffect(() => {
    if (!worldMapRef.current) return;
    
    // Create connection dots and lines
    const connectPoints = [
      { x: '20%', y: '30%' },
      { x: '30%', y: '45%' },
      { x: '50%', y: '35%' },
      { x: '65%', y: '25%' },
      { x: '80%', y: '45%' },
      { x: '40%', y: '60%' },
      { x: '70%', y: '60%' },
    ];
    
    // Clear any existing dots
    const existingDots = worldMapRef.current.querySelectorAll('.connection-dot, .connection-line');
    existingDots.forEach(dot => dot.remove());
    
    // Add dots and connections
    connectPoints.forEach((point, index) => {
      // Create dot
      const dot = document.createElement('div');
      dot.className = 'connection-dot';
      dot.style.left = point.x;
      dot.style.top = point.y;
      dot.style.animationDelay = `${index * 0.2}s`;
      worldMapRef.current?.appendChild(dot);
      
      // Create connections (lines)
      if (index < connectPoints.length - 1) {
        const nextPoint = connectPoints[index + 1];
        
        // Calculate line properties
        const x1 = parseFloat(point.x);
        const y1 = parseFloat(point.y);
        const x2 = parseFloat(nextPoint.x);
        const y2 = parseFloat(nextPoint.y);
        
        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        
        // Create line
        const line = document.createElement('div');
        line.className = 'connection-line';
        line.style.width = `${length}%`;
        line.style.left = point.x;
        line.style.top = point.y;
        line.style.transform = `rotate(${angle}deg)`;
        line.style.animationDelay = `${index * 0.3}s`;
        
        worldMapRef.current?.appendChild(line);
      }
    });
    
    // Setup intersection observer for animations
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
    <section className="relative min-h-screen pt-10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-dashed-pattern opacity-10 z-0"></div>
      <div
        ref={worldMapRef}
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: "url('/lovable-uploads/2c448a16-e44a-4dc6-8ab3-8a8e38a77f3c.png')",
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-6rem)]">
          <div className="space-y-8 max-w-xl" data-animate style={{animationDelay: '0.3s'}}>
            <div className="inline-block">
              <span className="bg-taviflow-blue/10 text-taviflow-blue-dark px-4 py-2 rounded-full text-sm font-medium">
                Streamline Your Inventory Management
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              <span className="text-taviflow-dark">Transform Your</span>
              <br />
              <span className="text-gradient">Inventory Management</span>
            </h1>
            
            <p className="text-taviflow-gray text-lg md:text-xl">
              TaviFlow empowers small and medium enterprises with real-time inventory tracking and seamless financial integration, revolutionizing business operations for greater efficiency and control.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <Button 
                className="btn-gradient text-lg h-12 px-8" 
                size="lg"
                onClick={() => router.push('/signup')}
              >
                Start Your Free Trial
              </Button>
              
              <Button 
                variant="outline" 
                className="border-taviflow-blue text-taviflow-blue hover:bg-taviflow-blue hover:text-white transition-colors text-lg h-12 px-8 group" 
                size="lg"
                onClick={() => router.push('/faq')}
              >
                Learn More
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
          
          <div className="lg:block relative" data-animate style={{animationDelay: '0.6s'}}>
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-blue rounded-2xl blur opacity-30 animate-pulse-slow"></div>
              <div className="relative glass-card rounded-2xl shadow-xl overflow-hidden border border-taviflow-blue-light/30">
                <img 
                  src="/assets/standing.jpeg" 
                  alt="TaviFlow Dashboard" 
                  className="w-full h-auto rounded-2xl"
                />
              </div>
              
              {/* Floating elements */}
              <div className="absolute top-1/4 -left-12 bg-white shadow-lg rounded-lg p-4 animate-float" style={{animationDelay: '0.2s'}}>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Order #1234</div>
                    <div className="text-xs text-taviflow-gray">Processed Successfully</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-1/4 -right-8 bg-white shadow-lg rounded-lg p-4 animate-float" style={{animationDelay: '0.7s'}}>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-taviflow-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Inventory Update</div>
                    <div className="text-xs text-taviflow-gray">Stock levels optimized</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path 
            fill="#f8fafc" 
            fillOpacity="1" 
            d="M0,224L80,229.3C160,235,320,245,480,234.7C640,224,800,192,960,181.3C1120,171,1280,181,1360,186.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
