'use client'

import React, { useState } from 'react';
import Navbar from '@/components/landingpage/layout/Navbar';
import Footer from '@/components/landingpage/layout/Footer';
import PricingCards from '@/components/landingpage/sections/PricingCards';
import PricingFAQ from '@/components/landingpage/sections/PricingFAQ';
import PricingComparison from '@/components/landingpage/sections/PricingComparison';
import PricingTestimonials from '@/components/landingpage/sections/PricingTestimonials';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Calendar, CreditCard, Shield, Zap } from 'lucide-react';

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annually'>('monthly');

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <div 
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center"
          data-animate
        >
          <span className="inline-block px-4 py-1 bg-taviflow-blue/10 text-taviflow-blue rounded-full text-sm font-medium mb-6">
            Flexible Pricing Options
          </span>
          
          <h1 className="text-4xl md:text-5xl font-bold text-taviflow-dark mb-6">
            Simple, transparent pricing for every business
          </h1>
          
          <p className="text-xl text-taviflow-gray max-w-3xl mx-auto mb-8">
            Choose the plan that best suits your business needs with no hidden fees
          </p>
          
          <div className="flex justify-center mb-12">
            <Tabs defaultValue="monthly" className="w-[400px]" onValueChange={(value) => setBillingPeriod(value as 'monthly' | 'annually')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly" className="flex items-center gap-1">
                  <CreditCard className="h-4 w-4" />
                  Monthly
                </TabsTrigger>
                <TabsTrigger value="annually" className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Annually <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded ml-1">Save 15%</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Fixed: TabsContent must be within Tabs component */}
              <TabsContent value="monthly">
                <div className="h-0 w-0 overflow-hidden">Monthly content</div>
              </TabsContent>
              <TabsContent value="annually">
                <div className="h-0 w-0 overflow-hidden">Annual content</div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Features Highlight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            <div className="flex flex-col items-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="p-3 bg-taviflow-blue/10 rounded-full text-taviflow-blue mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
              <p className="text-taviflow-gray text-center">All payment processing is secured with industry-standard encryption</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="p-3 bg-taviflow-blue/10 rounded-full text-taviflow-blue mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Instant Access</h3>
              <p className="text-taviflow-gray text-center">Get immediate access to all features as soon as payment is processed</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="p-3 bg-taviflow-blue/10 rounded-full text-taviflow-blue mb-4">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Trial Period</h3>
              <p className="text-taviflow-gray text-center">All plans include a trial period with full access to all features</p>
            </div>
          </div>
        </div>
        
        {/* Pricing Cards */}
        <PricingCards billingPeriod={billingPeriod} />
        
        {/* Compare Plans */}
        <PricingComparison />
        
        {/* Testimonials */}
        <PricingTestimonials />
        
        {/* FAQ */}
        <PricingFAQ />

        {/* Call To Action */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="p-8 bg-gradient-to-r from-taviflow-blue to-taviflow-accent rounded-2xl text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to streamline your business?</h2>
            <p className="text-lg mb-6 opacity-90 max-w-3xl mx-auto">
              Join thousands of businesses already using TaviFlow to manage their operations efficiently
            </p>
            <Button size="lg" className="bg-white text-taviflow-blue hover:bg-white/90">
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Pricing;
