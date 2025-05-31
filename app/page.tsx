'use client'

import React, { useEffect } from 'react';
import Navbar from '@/components/landingpage/layout/Navbar';
import Hero from '@/components/landingpage/sections/Hero';
import Features from '@/components/landingpage/sections/Features';
import Stats from '@/components/landingpage/sections/Stats';
import Testimonials from '@/components/landingpage/sections/Testimonials';
import CallToAction from '@/components/landingpage/sections/CallToAction';
import Footer from '@/components/landingpage/layout/Footer';

const Page = () => {
  useEffect(() => {
    // Handle hash navigation when page loads
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }

    // Set up intersection observer for animation
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          
          // Add specific animation classes based on data attributes
          if (entry.target.getAttribute('data-animation') === 'fade-in-left') {
            entry.target.classList.add('animate-fade-in-left');
          }
          if (entry.target.getAttribute('data-animation') === 'fade-in-right') {
            entry.target.classList.add('animate-fade-in-right');
          }
          if (entry.target.getAttribute('data-animation') === 'scale-in') {
            entry.target.classList.add('animate-scale-in');
          }
          
          observer.unobserve(entry.target);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Target all elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach((element) => {
      observer.observe(element);
    });

    // Clean up the observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <div id="features"><Features /></div>
      <div id="benefits"><Stats /></div>
      <div id="testimonials"><Testimonials /></div>
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Page;