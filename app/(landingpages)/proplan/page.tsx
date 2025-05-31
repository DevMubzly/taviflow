'use client'

import React from 'react';
import Navbar from '@/components/landingpage/layout/Navbar';
import Footer from '@/components/landingpage/layout/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, Users, BarChart2, MessageSquare, PieChart, LineChart, Zap, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ProPlan = () => {
  const router = useRouter();

  const handleSubscribe = () => {
    router.push('/payments?plan=Pro&price=UGX 30,000');
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
              Pro Plan
            </div>
            <div className="bg-taviflow-blue text-white text-xs font-medium px-4 py-1 rounded-full mb-4">
              Most Popular
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-taviflow-dark mb-4">
              Scale Your Business with Pro
            </h1>
            <p className="text-xl text-taviflow-gray max-w-3xl mx-auto mb-8">
              Perfect for growing businesses that need more advanced features and collaboration tools
            </p>
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-taviflow-dark">UGX 30,000</span>
              <span className="text-lg text-taviflow-gray">/month</span>
            </div>
            <p className="text-sm text-taviflow-blue mb-8">30-day free trial</p>
            <Button
              size="lg" 
              className="bg-gradient-to-r from-taviflow-blue to-taviflow-accent hover:brightness-105 text-white px-8"
              onClick={handleSubscribe}
            >
              Upgrade Now
            </Button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-taviflow-blue/10 rounded-lg flex items-center justify-center mb-4">
                <PieChart className="h-6 w-6 text-taviflow-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Everything in Basic</h3>
              <p className="text-taviflow-gray">
                All the features from the Basic plan, plus additional advanced capabilities.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-taviflow-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-taviflow-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Unlimited Users</h3>
              <p className="text-taviflow-gray">
                Add as many team members as you need with custom role assignments.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-taviflow-blue/10 rounded-lg flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-taviflow-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
              <p className="text-taviflow-gray">
                Gain deeper insights with advanced reporting tools and customizable dashboards.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-taviflow-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-taviflow-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enhanced Security</h3>
              <p className="text-taviflow-gray">
                Better data protection with advanced security features and role-based access.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-taviflow-blue/10 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-taviflow-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email & SMS Notifications</h3>
              <p className="text-taviflow-gray">
                Stay informed with comprehensive notifications through multiple channels.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-taviflow-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-taviflow-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Faster Support</h3>
              <p className="text-taviflow-gray">
                Get priority support with faster response times and dedicated assistance.
              </p>
            </div>
          </div>
          
          {/* Why Choose Pro */}
          <div className="bg-taviflow-blue/5 rounded-xl p-8 mb-16 border border-taviflow-blue/10">
            <h2 className="text-3xl font-bold text-center mb-10">Why Choose Pro Plan?</h2>
            <div className="grid md:grid-cols-2 gap-y-6 gap-x-10">
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-taviflow-blue mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Team Collaboration</h3>
                  <p className="text-taviflow-gray">Enable your entire team to work together efficiently on inventory.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-taviflow-blue mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Comprehensive Payments</h3>
                  <p className="text-taviflow-gray">Mobile money and bank integrations for diverse payment options.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-taviflow-blue mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Business Insights</h3>
                  <p className="text-taviflow-gray">Make better decisions with detailed analytics and reporting.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-taviflow-blue mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Enhanced Customer Support</h3>
                  <p className="text-taviflow-gray">Get priority assistance when you need help with the platform.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-taviflow-blue mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Advanced Automation</h3>
                  <p className="text-taviflow-gray">Save time with automated stock alerts and order processing.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-taviflow-blue mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Scalable Solution</h3>
                  <p className="text-taviflow-gray">Grows with your business without performance compromises.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Upgrade?</h2>
            <p className="text-xl text-taviflow-gray mb-8 max-w-2xl mx-auto">
              Take your inventory management to the next level with our most popular plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg" 
                className="bg-gradient-to-r from-taviflow-blue to-taviflow-accent hover:brightness-105 text-white px-8"
                onClick={handleSubscribe}
              >
                Upgrade Now
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

export default ProPlan;
