
import React, { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  decimalPlaces?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2000,
  delay = 0,
  prefix = '',
  suffix = '',
  decimalPlaces = 0
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  useEffect(() => {
    const isElementInViewport = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };
    
    const element = document.getElementById(`counter-${end}`);
    if (!element) return;
    
    const handleScroll = () => {
      if (isElementInViewport(element) && countRef.current === 0) {
        setTimeout(() => {
          startAnimation();
        }, delay);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initially
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [end, delay, duration]);
  
  const startAnimation = () => {
    const step = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);
      
      // Apply easing function (easeOutExpo)
      const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
      const easedPercentage = easeOutQuart(percentage);
      
      const currentCount = easedPercentage * end;
      countRef.current = currentCount;
      setCount(currentCount);
      
      if (percentage < 1) {
        animationFrameRef.current = requestAnimationFrame(step);
      } else {
        setCount(end);
        countRef.current = end;
      }
    };
    
    animationFrameRef.current = requestAnimationFrame(step);
  };
  
  // Format number with commas and decimals
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces
    });
  };
  
  return (
    <div id={`counter-${end}`} className="animate-counter">
      <span className="text-3xl md:text-5xl font-bold text-taviflow-dark">
        {prefix}{formatNumber(count)}{suffix}
      </span>
    </div>
  );
};

export default AnimatedCounter;
