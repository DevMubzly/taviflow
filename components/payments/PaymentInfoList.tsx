
/**
 * Payment Information List Component
 * 
 * This component displays a collection of helpful information related to payments.
 * It's used on the Payments page to provide users with transaction limits,
 * processing times, troubleshooting tips, and other payment-related information.
 */

import React from 'react';
import { 
  Clock, 
  BadgeInfo, 
  AlertCircle, 
  RotateCcw, 
  Shield 
} from 'lucide-react';
import PaymentInfo, { PaymentInfoProps } from './PaymentInfo';

const PaymentInfoList = () => {
  const paymentInfos: PaymentInfoProps[] = [
    {
      title: "Transaction Limits",
      description: "Learn about daily transaction limits and how to increase them.",
      updatedTime: "Updated 1 hour ago",
      icon: <Clock className="w-4 h-4 text-taviflow-primary" />,
    },
    {
      title: "Processing Times",
      description: "Understand how long transactions typically take to process.",
      updatedTime: "Updated 2 hours ago",
      icon: <BadgeInfo className="w-4 h-4 text-taviflow-primary" />,
    },
    {
      title: "Troubleshooting Tips",
      description: "Get solutions for common payment issues.",
      updatedTime: "Updated 3 hours ago",
      icon: <AlertCircle className="w-4 h-4 text-taviflow-primary" />,
    },
    {
      title: "Refund Policies",
      description: "Details on how refunds are processed and timelines.",
      updatedTime: "Updated 4 hours ago",
      icon: <RotateCcw className="w-4 h-4 text-taviflow-primary" />,
    },
    {
      title: "Security Measures",
      description: "Information on how we keep your transactions secure.",
      updatedTime: "Updated 5 hours ago",
      icon: <Shield className="w-4 h-4 text-taviflow-primary" />,
    },
  ];

  return (
    <div className="glass-card p-6">
      <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
      <div className="space-y-2">
        {paymentInfos.map((info, index) => (
          <PaymentInfo key={index} {...info} />
        ))}
      </div>
    </div>
  );
};

export default PaymentInfoList;
