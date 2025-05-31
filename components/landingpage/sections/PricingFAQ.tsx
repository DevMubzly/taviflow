
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PricingFAQ = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12" data-animate>
        <h2 className="text-3xl font-bold text-taviflow-dark mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-taviflow-gray">
          Get answers to common questions about our pricing and plans
        </p>
      </div>
      
      <Accordion type="single" collapsible className="w-full" data-animate>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-left text-taviflow-dark">
            Can I switch between plans?
          </AccordionTrigger>
          <AccordionContent className="text-taviflow-gray">
            Yes, you can upgrade or downgrade your plan at any time. When upgrading, the changes take effect immediately. When downgrading, the changes will take effect at the end of your current billing cycle.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-left text-taviflow-dark">
            Do you offer annual billing?
          </AccordionTrigger>
          <AccordionContent className="text-taviflow-gray">
            Yes, we offer annual billing with a 15% discount compared to monthly billing. You can select annual billing when signing up or change your billing cycle from your account settings.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-left text-taviflow-dark">
            How do the free trials work?
          </AccordionTrigger>
          <AccordionContent className="text-taviflow-gray">
            Each plan comes with a free trial period. The Basic plan offers a 14-day free trial, the Pro plan offers a 30-day free trial, and the Premium plan offers a 60-day free trial. No credit card is required to start a trial, and you'll receive a reminder before your trial ends.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-left text-taviflow-dark">
            What payment methods do you accept?
          </AccordionTrigger>
          <AccordionContent className="text-taviflow-gray">
            We accept credit/debit cards (Visa, Mastercard, American Express), Mobile Money, bank transfers, and PayPal. For enterprise customers, we can also arrange for invoiced payments.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-5">
          <AccordionTrigger className="text-left text-taviflow-dark">
            Is there a limit to how many products I can manage?
          </AccordionTrigger>
          <AccordionContent className="text-taviflow-gray">
            The Basic plan allows up to 500 products, the Pro plan allows up to 5,000 products, and the Premium plan has unlimited products. If you need to manage more products on the Basic or Pro plans, you can purchase additional product allowances.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-6">
          <AccordionTrigger className="text-left text-taviflow-dark">
            Do you offer discounts for non-profits or educational institutions?
          </AccordionTrigger>
          <AccordionContent className="text-taviflow-gray">
            Yes, we offer a 25% discount for qualified non-profit organizations and educational institutions. Please contact our sales team with your organization details to apply for this discount.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-7">
          <AccordionTrigger className="text-left text-taviflow-dark">
            What happens to my data if I cancel my subscription?
          </AccordionTrigger>
          <AccordionContent className="text-taviflow-gray">
            Your data remains in our system for 30 days after cancellation, giving you time to download any important information. After 30 days, your data will be permanently deleted from our systems in accordance with our data retention policy.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PricingFAQ;
