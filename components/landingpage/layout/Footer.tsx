"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const router = useRouter();

  const scrollToSection = (id: string) => {
    if (window.location.pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <footer className="bg-white pt-16 pb-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="mb-5">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-gradient">TaviFlow</span>
              </Link>
            </div>

            <p className="text-taviflow-gray max-w-md mb-6">
              TaviFlow empowers small and medium enterprises with real-time inventory tracking and seamless financial integration, revolutionizing business operations.
            </p>

            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-taviflow-blue/10 flex items-center justify-center text-taviflow-blue hover:bg-taviflow-blue hover:text-white transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-taviflow-blue/10 flex items-center justify-center text-taviflow-blue hover:bg-taviflow-blue hover:text-white transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-taviflow-blue/10 flex items-center justify-center text-taviflow-blue hover:bg-taviflow-blue hover:text-white transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-taviflow-blue/10 flex items-center justify-center text-taviflow-blue hover:bg-taviflow-blue hover:text-white transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-taviflow-dark">Product</h3>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => scrollToSection("features")} 
                  className="text-taviflow-gray hover:text-taviflow-blue transition-colors"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("benefits")} 
                  className="text-taviflow-gray hover:text-taviflow-blue transition-colors"
                >
                  Benefits
                </button>
              </li>
              <li>
                <Link href="/pricing" className="text-taviflow-gray hover:text-taviflow-blue transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-taviflow-gray hover:text-taviflow-blue transition-colors">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-taviflow-gray hover:text-taviflow-blue transition-colors">
                  Updates
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-taviflow-dark">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-taviflow-gray hover:text-taviflow-blue transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-taviflow-gray hover:text-taviflow-blue transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("testimonials")} 
                  className="text-taviflow-gray hover:text-taviflow-blue transition-colors"
                >
                  Customers
                </button>
              </li>
              <li>
                <Link href="/blog" className="text-taviflow-gray hover:text-taviflow-blue transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-taviflow-gray hover:text-taviflow-blue transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-taviflow-gray text-sm">
            &copy; {new Date().getFullYear()} TaviFlow. All rights reserved.
          </p>

          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="/privacy-policy" className="text-taviflow-gray text-sm hover:text-taviflow-blue transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-taviflow-gray text-sm hover:text-taviflow-blue transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-taviflow-gray text-sm hover:text-taviflow-blue transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
