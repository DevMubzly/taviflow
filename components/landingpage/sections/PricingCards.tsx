'use client'

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PricingCardsProps {
  billingPeriod?: 'monthly' | 'annually';
}

const PricingCards = ({ billingPeriod = 'monthly' }: PricingCardsProps) => {
  const router = useRouter();

  // Calculate pricing based on billing period
  const getPricing = (monthlyPrice: number) => {
    const annualDiscount = 0.85; // 15% discount for annual billing
    const price = billingPeriod === 'annually' 
      ? Math.round(monthlyPrice * annualDiscount) 
      : monthlyPrice;
      
    return `UGX ${price.toLocaleString()}`;
  };

  const getOriginalPricing = (monthlyPrice: number) => {
    return `UGX ${monthlyPrice.toLocaleString()}`;
  };

  const getFormattedPeriod = () => {
    return billingPeriod === 'annually' ? '/month, billed annually' : '/month';
  };

  const handleStartTrial = (plan: string, price: string) => {
    // Simulate loading before redirecting
    document.body.style.cursor = 'wait';
    setTimeout(() => {
      router.push(`/payments?plan=${plan}&price=${price}${billingPeriod === 'annually' ? '&billing=annually' : ''}`);
      document.body.style.cursor = 'default';
    }, 500);
  };

  const handleLearnMore = () => {
    router.push('/basicplan');
  };
  const handleViewDetails = () => {
    router.push('/proplan');
  };
  const handleContactSales = () => {
    router.push('/premiumplan');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Basic Plan */}
        <Card 
          className="border border-gray-200 hover:border-taviflow-blue hover:shadow-md transition-all duration-300"
          data-animate
          data-animation="fade-in-left"
        >
          <CardHeader className="pb-0">
            <h3 className="text-xl font-medium text-taviflow-dark">Basic</h3>
            <div className="mt-4 flex items-baseline flex-wrap">
              <span className="text-4xl font-bold text-taviflow-dark">{getPricing(15000)}</span>
              {billingPeriod === 'annually' && (
                <span className="ml-2 text-sm line-through text-neutral-500">{getOriginalPricing(15000)}</span>
              )}
              <span className="ml-2 text-sm text-taviflow-gray">{getFormattedPeriod()}</span>
            </div>
            <p className="mt-4 text-sm text-taviflow-gray">
              Ideal for small businesses looking to get started with inventory management.
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-sm text-taviflow-gray mb-6">Free trial available</p>
            <Button 
              className="w-full bg-taviflow-blue hover:bg-taviflow-blue-dark text-white"
              onClick={() => handleStartTrial('Basic', getPricing(15000))}
            >
              Start Free Trial
            </Button>
            <ul className="mt-8 space-y-4">
              <li className="flex">
                <Check className="h-5 w-5 text-taviflow-blue flex-shrink-0" />
                <span className="ml-3 text-sm text-taviflow-dark">Access to basic inventory management tools</span>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-taviflow-blue flex-shrink-0" />
                <span className="ml-3 text-sm text-taviflow-dark">Real-time tracking and reporting</span>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-taviflow-blue flex-shrink-0" />
                <span className="ml-3 text-sm text-taviflow-dark">Integration with Mobile Money for payments</span>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-taviflow-blue flex-shrink-0" />
                <span className="ml-3 text-sm text-taviflow-dark">Limited to 1 user</span>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-taviflow-blue flex-shrink-0" />
                <span className="ml-3 text-sm text-taviflow-dark">24/7 customer support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="pt-4 pb-8 px-6">
            <Button 
              variant="outline" 
              className="w-full border-taviflow-blue text-taviflow-blue hover:bg-taviflow-blue-light/20"
              onClick={() => handleLearnMore()}
            >
              Learn More
            </Button>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card 
          className="border-2 border-taviflow-blue shadow-lg relative"
          data-animate
          data-animation="scale-in"
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-taviflow-blue text-white text-xs font-medium px-4 py-1 rounded-full">
            Most Popular
          </div>
          <CardHeader className="pb-0">
            <h3 className="text-xl font-medium text-taviflow-dark">Pro</h3>
            <div className="mt-4 flex items-baseline flex-wrap">
              <span className="text-4xl font-bold text-taviflow-dark">{getPricing(30000)}</span>
              {billingPeriod === 'annually' && (
                <span className="ml-2 text-sm line-through text-neutral-500">{getOriginalPricing(30000)}</span>
              )}
              <span className="ml-2 text-sm text-taviflow-gray">{getFormattedPeriod()}</span>
            </div>
            <p className="mt-4 text-sm text-taviflow-gray">
              Best for growing businesses that need more advanced features and collaboration tools.
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-sm text-taviflow-gray mb-6">30-day free trial</p>
            <Button 
              className="w-full bg-gradient-to-r from-taviflow-blue to-taviflow-accent hover:brightness-105 text-white"
              onClick={() => handleStartTrial('Pro', getPricing(30000))}
            >
              Upgrade Now
            </Button>
            <ul className="mt-8 space-y-4">
              <li className="flex">
                <Check className="h-5 w-5 text-taviflow-blue flex-shrink-0" />
                <span className="ml-3 text-sm text-taviflow-dark">Everything in Basic tier</span>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-taviflow-blue flex-shrink-0" />
                <span className="ml-3 text-sm text-taviflow-dark">Unlimited users</span>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-taviflow-blue flex-shrink-0" />
                <span className="ml-3 text-sm text-taviflow-dark">Mobile money & bank integrations</span>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-taviflow-blue flex-shrink-0" />
                <span className="ml-3 text-sm text-taviflow-dark">Advanced reporting and analytics</span>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-taviflow-blue flex-shrink-0" />
                <span className="ml-3 text-sm text-taviflow-dark">Enhanced customer support</span>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-taviflow-blue flex-shrink-0" />
                <span className="ml-3 text-sm text-taviflow-dark">Email and SMS notifications</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="pt-4 pb-8 px-6">
            <Button 
              variant="outline" 
              className="w-full border-taviflow-blue text-taviflow-blue hover:bg-taviflow-blue-light/20"
              onClick={() => handleViewDetails()}
            >
              View Details
            </Button>
          </CardFooter>
        </Card>

        {/* Premium Plan */}
        <Card 
          className="border border-gray-200 hover:border-taviflow-blue hover:shadow-md transition-all duration-300"
          data-animate
          data-animation="fade-in-right"
        >
          <CardHeader className="pb-0">
            <h3 className="text-xl font-medium text-taviflow-dark">Premium</h3>
            <div className="mt-4 flex items-baseline flex-wrap">
              <span className="text-4xl font-bold text-taviflow-dark">{getPricing(55000)}</span>
              {billingPeriod === 'annually' && (
                <span className="ml-2 text-sm line-through text-neutral-500">{getOriginalPricing(55000)}</span>
              )}
              <span className="ml-2 text-sm text-taviflow-gray">{getFormattedPeriod()}</span>
            </div>
            <p className="mt-4 text-sm text-taviflow-gray">
              Perfect for larger businesses with multiple locations and complex inventory needs.
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-sm text-taviflow-gray mb-6">60-day free trial</p>
            <Button 
              className="w-full bg-taviflow-blue hover:bg-taviflow-blue-dark text-white"
              onClick={() => handleStartTrial('Premium', getPricing(55000))}
            >
              Start Premium Trial
            </Button>
            <ul className="mt-8 space-y-4">
              <li className="flex">
                <Check className="h-5 w-5 text-taviflow-blue flex-shrink-0" />
                <span className="ml-3 text-sm text-taviflow-dark">Everything in Pro tier</span>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-taviflow-blue flex-shrink-0" />
                <span className="ml-3 text-sm text-taviflow-dark">Multi-location management</span>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-taviflow-blue flex-shrink-0" />
                <span className="ml-3 text-sm text-taviflow-dark">Advanced payment processing tools</span>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-taviflow-blue flex-shrink-0" />
                <span className="ml-3 text-sm text-taviflow-dark">Customizable dashboards</span>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-taviflow-blue flex-shrink-0" />
                <span className="ml-3 text-sm text-taviflow-dark">Dedicated account manager</span>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-taviflow-blue flex-shrink-0" />
                <span className="ml-3 text-sm text-taviflow-dark">Priority technical support</span>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-taviflow-blue flex-shrink-0" />
                <span className="ml-3 text-sm text-taviflow-dark">Integration with additional platforms</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="pt-4 pb-8 px-6">
            <Button 
              variant="outline" 
              className="w-full border-taviflow-blue text-taviflow-blue hover:bg-taviflow-blue-light/20"
              onClick={() => handleContactSales()}
            >
              Contact Sales
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PricingCards;
