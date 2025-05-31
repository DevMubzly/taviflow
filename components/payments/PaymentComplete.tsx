
/**
 * Payment Completion Component
 * 
 * This component is displayed after a successful payment transaction.
 * It shows the transaction details and provides options to send receipts.
 * Used in the payment flow to confirm successful transactions.
 */

import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/app/hooks/use-toast';

interface PaymentCompleteProps {
  transactionId: string;
}

const PaymentComplete = ({ transactionId }: PaymentCompleteProps) => {
  const { toast } = useToast();
  
  return (
    <div className="mt-6 glass-card p-6 bg-green-50 border border-green-200">
      <div className="flex items-start gap-4">
        <div className="bg-green-100 p-2 rounded-full">
          <Check className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h3 className="font-medium text-lg">Transaction Complete</h3>
          <p className="text-sm">Transaction ID: {transactionId}</p>
          <p className="text-xs text-taviflow-muted mt-1">
            A receipt has been sent to the customer's phone number
          </p>
          <Button 
            className="mt-4 bg-green-600 hover:bg-green-700 text-white"
            onClick={() => {
              toast({
                title: "Receipt Sent",
                description: "A copy of the receipt has been sent to your email",
              });
            }}
          >
            Send Receipt to Email
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentComplete;
