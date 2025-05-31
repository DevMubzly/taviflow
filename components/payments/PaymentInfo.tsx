
/**
 * Payment Information Component
 * 
 * This reusable component displays information about payment-related topics
 * such as transaction limits, processing times, and refund policies.
 * It's used in the Payments page to provide helpful information to users.
 */

import React from 'react';

export interface PaymentInfoProps {
  title: string;
  description: string;
  updatedTime: string;
  icon: React.ReactNode;
}

const PaymentInfo = ({ title, description, updatedTime, icon }: PaymentInfoProps) => (
  <div className="flex justify-between items-start border-b border-indigo-100 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0 hover:bg-indigo-50/50 p-2 rounded transition-colors">
    <div className="flex gap-3">
      <div className="mt-1 text-indigo-600">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-indigo-900">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </div>
    <div className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
      {updatedTime}
    </div>
  </div>
);

export default PaymentInfo;
