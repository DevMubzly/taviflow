'use client'

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/landingpage/layout/Navbar';
import Footer from '@/components/landingpage/layout/Footer';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, Building, Users, BarChart2, MessageSquare, 
  PieChart, LineChart, Shield, HeadphonesIcon, Layers, Globe, Cpu
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const PremiumPlan = () => {
  const router = useRouter();

  const handleSubscribe = () => {
    router.push('/payments?plan=Premium&price=UGX 55,000');
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
              Premium Plan
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-taviflow-dark mb-4">
              Enterprise-Grade Inventory Management
            </h1>
            <p className="text-xl text-taviflow-gray max-w-3xl mx-auto mb-8">
              Complete solution for larger businesses with multiple locations and complex inventory needs
            </p>
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-taviflow-dark">UGX 55,000</span>
              <span className="text-lg text-taviflow-gray">/month</span>
            </div>
            <p className="text-sm text-taviflow-blue mb-8">60-day free trial</p>
            <Button
              size="lg" 
              className="bg-taviflow-blue hover:bg-taviflow-blue-dark text-white px-8"
              onClick={handleSubscribe}
            >
              Start Premium Trial
            </Button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-taviflow-blue/10 rounded-lg flex items-center justify-center mb-4">
                <PieChart className="h-6 w-6 text-taviflow-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Everything in Pro</h3>
              <p className="text-taviflow-gray">
                All the features from the Pro plan, plus additional premium capabilities.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-taviflow-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-taviflow-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-Location Support</h3>
              <p className="text-taviflow-gray">
                Manage inventory across multiple warehouses or retail locations seamlessly.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-taviflow-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Cpu className="h-6 w-6 text-taviflow-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Payment Tools</h3>
              <p className="text-taviflow-gray">
                Comprehensive payment processing with custom solutions and integrations.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-taviflow-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Layers className="h-6 w-6 text-taviflow-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Dashboards</h3>
              <p className="text-taviflow-gray">
                Build your own dashboards tailored to your specific business needs.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-taviflow-blue/10 rounded-lg flex items-center justify-center mb-4">
                <HeadphonesIcon className="h-6 w-6 text-taviflow-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dedicated Account Manager</h3>
              <p className="text-taviflow-gray">
                Get personalized support from a dedicated account manager.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-taviflow-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-taviflow-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Extended Integrations</h3>
              <p className="text-taviflow-gray">
                Connect with additional platforms and services to extend functionality.
              </p>
            </div>
          </div>
          
          {/* Why Choose Premium */}
          <div className="bg-gradient-to-br from-taviflow-blue/5 to-taviflow-accent/5 rounded-xl p-8 mb-16 border border-taviflow-blue/10">
            <h2 className="text-3xl font-bold text-center mb-10">Why Choose Premium Plan?</h2>
            <div className="grid md:grid-cols-2 gap-y-6 gap-x-10">
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-taviflow-blue mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Enterprise-Grade Solution</h3>
                  <p className="text-taviflow-gray">Built for larger businesses with complex inventory needs.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-taviflow-blue mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Multiple Locations</h3>
                  <p className="text-taviflow-gray">Manage inventory across different warehouses or retail stores.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-taviflow-blue mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Maximum Customization</h3>
                  <p className="text-taviflow-gray">Tailor the system to your exact business requirements.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-taviflow-blue mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Personalized Support</h3>
                  <p className="text-taviflow-gray">Work with a dedicated account manager who knows your business.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-taviflow-blue mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Advanced Integrations</h3>
                  <p className="text-taviflow-gray">Connect with more external systems and services.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-taviflow-blue mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Priority Technical Support</h3>
                  <p className="text-taviflow-gray">Get fastest response times and dedicated technical assistance.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form Teaser */}
          <div className="bg-white rounded-xl p-8 mb-16 border border-gray-200 shadow-sm">
            <h2 className="text-3xl font-bold text-center mb-4">Need a Custom Solution?</h2>
            <p className="text-center text-taviflow-gray mb-8 max-w-2xl mx-auto">
              Our sales team can work with you to create a tailored solution that perfectly fits your business requirements.
            </p>
            <div className="text-center">
              <Button
                size="lg" 
                className="bg-taviflow-blue hover:bg-taviflow-blue-dark text-white px-8"
                onClick={handleSubscribe}
              >
                Contact Sales Team
              </Button>
            </div>
          </div>
          
          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready for Premium?</h2>
            <p className="text-xl text-taviflow-gray mb-8 max-w-2xl mx-auto">
              Experience the most comprehensive inventory management solution available for your growing business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg" 
                className="bg-taviflow-blue hover:bg-taviflow-blue-dark text-white px-8"
                onClick={handleSubscribe}
              >
                Start Premium Trial
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

export default PremiumPlan;
