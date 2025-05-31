
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';

const FAQContent = () => {
  const faqs = [
    {
      question: "What is TaviFlow?",
      answer: "TaviFlow is a comprehensive inventory management system designed specifically for small and medium enterprises (SMEs). Our platform integrates inventory tracking with financial systems to provide a seamless business management experience."
    },
    {
      question: "How does TaviFlow help my business?",
      answer: "TaviFlow streamlines your inventory processes, reduces manual errors, provides real-time stock visibility, and integrates with payment systems. This helps you save time, reduce costs, prevent stockouts, and make data-driven business decisions."
    },
    {
      question: "Is TaviFlow suitable for my industry?",
      answer: "Yes! TaviFlow is designed to be flexible and adaptable to various industries including retail, manufacturing, wholesale, healthcare, hospitality, and more. Our customizable features allow the system to meet your specific industry requirements."
    },
    {
      question: "How secure is my business data with TaviFlow?",
      answer: "We take security very seriously. TaviFlow employs industry-standard encryption, regular security audits, and strict access controls. Your data is stored in secure cloud environments with regular backups to ensure data integrity and protection."
    },
    {
      question: "Can I access TaviFlow on mobile devices?",
      answer: "Absolutely! TaviFlow is fully responsive and works on desktops, tablets, and smartphones. We also offer dedicated mobile apps for Android and iOS to ensure you can manage your inventory on the go."
    },
    {
      question: "How does the pricing work?",
      answer: "TaviFlow offers flexible pricing plans starting with a Basic plan for small businesses, a Pro plan for growing businesses, and a Premium plan for established enterprises. Each plan offers different features and capabilities. Visit our Pricing page for detailed information."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a 14-day free trial of our Pro plan with no credit card required. This allows you to experience the full benefits of TaviFlow before making a commitment."
    },
    {
      question: "How does payment integration work?",
      answer: "TaviFlow seamlessly integrates with various payment systems including mobile money services (like M-Pesa, MTN Mobile Money, Airtel Money), bank transfers, and traditional payment processors. This allows for smooth financial operations and reconciliation."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We provide different levels of support based on your plan. All customers receive email support, while Pro and Premium customers get additional chat support. Premium customers also receive dedicated phone support and a personal account manager."
    },
    {
      question: "Can TaviFlow integrate with my existing systems?",
      answer: "Yes, TaviFlow offers API integration capabilities and works with many popular business tools and platforms. Our Premium plan includes custom integration options to ensure TaviFlow works seamlessly with your existing business systems."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 gap-8">
        {/* Left column with basic questions */}
        <div data-animate>
          <div className="flex items-center mb-6">
            <HelpCircle className="h-6 w-6 text-taviflow-blue mr-2" />
            <h2 className="text-2xl font-bold text-taviflow-dark">Frequently Asked Questions</h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-taviflow-gray text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQContent;
