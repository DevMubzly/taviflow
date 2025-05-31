'use client'

import React from 'react';
import Navbar from '@/components/landingpage/layout/Navbar';
import Footer from '@/components/landingpage/layout/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, Users, BarChart2, MessageSquare, PieChart } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BasicPlan = () => {
  const router = useRouter();

  const handleSubscribe = () => {
    router.push('/payments?plan=Basic&price=UGX 15,000');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <div 
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
          data-animate
        >
          <div className="flex flex-col items-center text-center mb-16">
            <div className="bg-taviflow-blue/10 text-taviflow-blue font-medium px-4 py-1 rounded-full mb-4">
              Basic Plan
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-taviflow-dark mb-4">
              Start Your TaviFlow Journey
            </h1>
            <p className="text-xl text-taviflow-gray max-w-3xl mx-auto mb-8">
              Perfect for small businesses looking to get started with inventory management
            </p>
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-taviflow-dark">UGX 15,000</span>
              <span className="text-lg text-taviflow-gray">/month</span>
            </div>
            <p className="text-sm text-taviflow-blue mb-8">Free trial available</p>
            <Button
              size="lg" 
              className="bg-taviflow-blue hover:bg-taviflow-blue-dark text-white px-8"
              onClick={handleSubscribe}
            >
              Start Free Trial
            </Button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-taviflow-blue/10 rounded-lg flex items-center justify-center mb-4">
                <PieChart className="h-6 w-6 text-taviflow-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Basic Inventory Tools</h3>
              <p className="text-taviflow-gray">
                Access essential inventory management tools to track stock levels, products, and basic movements.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-taviflow-blue/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart2 className="h-6 w-6 text-taviflow-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
              <p className="text-taviflow-gray">
                Monitor your inventory in real-time with accurate stock level updates and basic reporting.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-taviflow-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-taviflow-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-taviflow-gray">
                Access our customer support team around the clock for assistance with any issues.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-taviflow-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-taviflow-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Single User</h3>
              <p className="text-taviflow-gray">
                Perfect for sole proprietors or small businesses with a single inventory manager.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-taviflow-blue/10 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-taviflow-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Basic Notifications</h3>
              <p className="text-taviflow-gray">
                Receive important alerts about low stock levels and other critical inventory events.
              </p>
            </div>
          </div>
          
          {/* Why Choose Basic */}
          <div className="bg-gray-50 rounded-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-center mb-10">Why Choose Basic Plan?</h2>
            <div className="grid md:grid-cols-2 gap-y-6 gap-x-10">
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-taviflow-blue mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Affordable Starting Point</h3>
                  <p className="text-taviflow-gray">Low monthly cost makes it accessible for businesses of all sizes.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-taviflow-blue mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Easy to Use</h3>
                  <p className="text-taviflow-gray">Intuitive interface requires minimal training to get started.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-taviflow-blue mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Mobile Money Integration</h3>
                  <p className="text-taviflow-gray">Seamless local payment processing for your business.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-taviflow-blue mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Upgrade Anytime</h3>
                  <p className="text-taviflow-gray">Easily upgrade to Pro or Premium as your business grows.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
            <p className="text-xl text-taviflow-gray mb-8 max-w-2xl mx-auto">
              Begin your inventory management journey with TaviFlow and experience the difference our platform can make for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg" 
                className="bg-taviflow-blue hover:bg-taviflow-blue-dark text-white px-8"
                onClick={handleSubscribe}
              >
                Start Free Trial
              </Button>
              <Button
                size="lg" 
                variant="outline"
                className="border-taviflow-blue text-taviflow-blue hover:bg-taviflow-blue-light/20"
                onClick={() => router.push('/pricing')}
              >
                Compare All Plans
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BasicPlan;
