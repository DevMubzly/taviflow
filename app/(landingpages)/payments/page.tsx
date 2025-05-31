'use client'

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/landingpage/layout/Navbar';
import Footer from '@/components/landingpage/layout/Footer';
import PaymentOptions from '@/components/landingpage/sections/PaymentOptions';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { useRouter } from 'next/navigation';

const Payments = () => {
  const searchParams = useSearchParams();  // This provides query parameters in an object format
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [planPrice, setPlanPrice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Access query parameters directly
    const plan = searchParams.get('plan');  // Accessing query parameters like this
    const price = searchParams.get('price');
    
    if (plan && price) {
      setSelectedPlan(plan);
      setPlanPrice(price);
      
      // Simulate loading
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: `${plan} Plan Selected`,
          description: `You're about to subscribe to the ${plan} plan at ${price}/month.`,
          variant: "default",
        });
      }, 1500);
    } else {
      // If no plan is selected, redirect to pricing page
      router.push('/pricing');
    }
  }, [searchParams, router]); // Ensure proper dependency on searchParams and router

  const handleBackToPricing = () => {
    router.push('/pricing');
  };

  return (
    <div className="min-h-screen bg-white">
      {isLoading && <LoadingScreen message={`Preparing your ${selectedPlan || ''} plan details...`} />}
      
      <Navbar />
      
      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <div 
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center"
          data-animate
        >
          <Button 
            variant="ghost"
            className="flex items-center mb-6 text-taviflow-gray hover:text-taviflow-blue"
            onClick={handleBackToPricing}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Pricing
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold text-taviflow-dark mb-4">
            Payment Options
          </h1>
          {selectedPlan && planPrice ? (
            <div className="mb-6">
              <div className="inline-block bg-taviflow-blue/10 rounded-lg px-4 py-2 border border-taviflow-blue/20">
                <span className="text-lg text-taviflow-dark">Selected Plan: </span>
                <span className="text-lg font-semibold text-taviflow-blue">{selectedPlan}</span>
                <span className="mx-2 text-gray-400">|</span>
                <span className="text-lg text-taviflow-dark">Price: </span>
                <span className="text-lg font-semibold text-taviflow-blue">{planPrice}/month</span>
              </div>
            </div>
          ) : null}
          <p className="text-xl text-taviflow-gray max-w-3xl mx-auto">
            Choose the payment method that works best for your business
          </p>
        </div>
        
        {/* Payment Options */}
        <PaymentOptions selectedPlan={selectedPlan} planPrice={planPrice} />
      </div>
      
      <Footer />
    </div>
  );
};

export default Payments;
