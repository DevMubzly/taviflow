'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { Menu, X, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    // Close mobile menu if open
    setIsMobileMenuOpen(false);

    // If on home page, scroll to the section
    if (window.location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on another page, navigate to home and then scroll
      window.location.href = `/#${id}`;
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 py-4 px-6 lg:px-12",
        isScrolled ? "backdrop-blur-lg bg-white/80 shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Zap className="h-6 w-6 text-taviflow-blue" />
          <span className="text-2xl font-bold text-gradient">TaviFlow</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => scrollToSection('features')} 
            className="text-taviflow-dark font-medium hover:text-taviflow-blue transition-colors"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('benefits')} 
            className="text-taviflow-dark font-medium hover:text-taviflow-blue transition-colors"
          >
            Benefits
          </button>
          <button 
            onClick={() => scrollToSection('testimonials')} 
            className="text-taviflow-dark font-medium hover:text-taviflow-blue transition-colors"
          >
            Testimonials
          </button>
          <Link href="/pricing" className="text-taviflow-dark font-medium hover:text-taviflow-blue transition-colors">
            Pricing
          </Link>
          <Link href="/faq" className="text-taviflow-dark font-medium hover:text-taviflow-blue transition-colors">
            FAQ
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="outline" 
            className="border-taviflow-blue text-taviflow-blue hover:bg-taviflow-blue hover:text-white transition-colors"
            onClick={() => router.push('/login')}
          >
            Log In
          </Button>
          <Button 
            className="btn-gradient"
            onClick={() => router.push('/signup')}
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-taviflow-dark"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu - Improved alignment */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 flex flex-col space-y-4 animate-fade-in">
          <div className="flex flex-col items-center text-center">
            <button 
              onClick={() => scrollToSection('features')} 
              className="w-full text-taviflow-dark font-medium py-3 hover:text-taviflow-blue transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('benefits')} 
              className="w-full text-taviflow-dark font-medium py-3 hover:text-taviflow-blue transition-colors"
            >
              Benefits
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="w-full text-taviflow-dark font-medium py-3 hover:text-taviflow-blue transition-colors"
            >
              Testimonials
            </button>
            <Link 
              href="" 
              className="w-full text-taviflow-dark font-medium py-3 hover:text-taviflow-blue transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              href="/landingpages/faq" 
              className="w-full text-taviflow-dark font-medium py-3 hover:text-taviflow-blue transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </Link>
          </div>
          <div className="pt-2 flex flex-col space-y-3">
            <Button 
              variant="outline" 
              className="w-full border-taviflow-blue text-taviflow-blue hover:bg-taviflow-blue hover:text-white transition-colors"
              onClick={() => {
                setIsMobileMenuOpen(false);
                router.push('/login');
              }}
            >
              Log In
            </Button>
            <Button 
              className="w-full btn-gradient"
              onClick={() => {
                setIsMobileMenuOpen(false);
                router.push('/signup');
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
