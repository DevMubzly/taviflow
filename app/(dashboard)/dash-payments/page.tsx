'use client'

/**
 * Payments Page
 * 
 * This page allows users to process and manage payments through various methods.
 * It includes options for mobile money transactions, bank transfers, and other payment types.
 * The page handles the complete payment workflow from method selection to confirmation.
 */

import { useState } from "react";
import { 
  Phone, 
  WalletCards, 
  Building, 
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/app/hooks/use-toast";

// Import refactored components
import PaymentOption, { PaymentOptionType } from "@/components/payments/PaymentOption";
import MobileMoneyPaymentProcessor from "@/components/payments/MobileMoneyPaymentProcessor";
import TestimonialList from "@/components/payments/TestimonialList";
import PaymentInfoList from "@/components/payments/PaymentInfoList";
import TransactionHistory from "@/components/payments/TransactionHistory";
import SecurityInfo from "@/components/payments/SecurityInfo";
import PaymentComplete from "@/components/payments/PaymentComplete";

const Payments = () => {
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<string | null>(null);
  const [showPaymentProcessor, setShowPaymentProcessor] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [transactionId, setTransactionId] = useState<string | undefined>(undefined);
  const { toast } = useToast();

  const paymentOptions: PaymentOptionType[] = [
    {
      id: "mtn",
      name: "MTN Mobile Money",
      icon: <Phone className="w-5 h-5 text-white" />,
      color: "bg-gradient-to-r from-yellow-500 to-yellow-600",
    },
    {
      id: "airtel",
      name: "Airtel Money",
      icon: <WalletCards className="w-5 h-5 text-white" />,
      color: "bg-gradient-to-r from-red-500 to-red-600",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: <Building className="w-5 h-5 text-white" />,
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
    },
  ];

  const handlePaymentOptionSelect = (optionId: string) => {
    setSelectedPaymentOption(optionId);
    setShowPaymentProcessor(true);
    setPaymentComplete(false);
    setTransactionId(undefined);
  };

  const handlePaymentComplete = (success: boolean, txId?: string) => {
    setPaymentComplete(success);
    if (success && txId) {
      setTransactionId(txId);
    }
  };

  const getSelectedPaymentOption = () => {
    return paymentOptions.find(option => option.id === selectedPaymentOption);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold mb-2">Payment Options</h1>
        <p className="text-taviflow-muted">Choose your preferred payment method to complete your transaction</p>
      </div>
      
      {!showPaymentProcessor ? (
        <>
          <div className="space-y-3">
            {paymentOptions.map((option) => (
              <PaymentOption 
                key={option.id} 
                option={option} 
                onSelect={() => handlePaymentOptionSelect(option.id)}
                selected={option.id === selectedPaymentOption}
              />
            ))}
            
            <p className="text-sm mt-4 text-taviflow-muted">
              Your payment is secure and encrypted.
            </p>
          </div>
          
          <SecurityInfo />
        </>
      ) : (
        <div className="space-y-6">
          <Button 
            onClick={() => setShowPaymentProcessor(false)}
            variant="outline"
            className="mb-4"
          >
            ← Back to Payment Options
          </Button>
          
          {selectedPaymentOption && (
            <MobileMoneyPaymentProcessor 
              provider={getSelectedPaymentOption()!} 
              onComplete={handlePaymentComplete}
            />
          )}
        </div>
      )}
      
      {!showPaymentProcessor && (
        <>
          <TestimonialList />
          <PaymentInfoList />
          <TransactionHistory />
        </>
      )}
      
      {paymentComplete && transactionId && (
        <PaymentComplete transactionId={transactionId} />
      )}
    </div>
  );
};

export default Payments;
