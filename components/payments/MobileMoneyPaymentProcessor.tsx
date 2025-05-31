
/**
 * Mobile Money Payment Processor Component
 * 
 * This component handles the complete flow for mobile money payments.
 * It guides users through entering phone numbers and amounts, sending payment requests,
 * and tracking transaction status until completion. Provides visual feedback at each step.
 */

import React, { useState } from 'react';
import { 
  Phone, 
  AlertCircle, 
  Loader2,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/app/hooks/use-toast';
import { sendMobileMoneyRequest, checkPaymentStatus } from '@/utils/paymentMocks'
import { PaymentOptionType } from './PaymentOption';

interface MobileMoneyPaymentState {
  phoneNumber: string;
  amount: string;
  isProcessing: boolean;
  status: 'idle' | 'pending' | 'confirmed' | 'failed';
  step: number;
}

interface MobileMoneyPaymentProcessorProps {
  provider: PaymentOptionType;
  onComplete: (success: boolean, transactionId?: string) => void;
}

const MobileMoneyPaymentProcessor = ({ provider, onComplete }: MobileMoneyPaymentProcessorProps) => {
  const [state, setState] = useState<MobileMoneyPaymentState>({
    phoneNumber: '',
    amount: '',
    isProcessing: false,
    status: 'idle',
    step: 1
  });
  const { toast } = useToast();

  const isValidPhoneNumber = (number: string) => {
    // Simple validation - adjust this as needed for your country's phone number format
    return /^\d{9,12}$/.test(number);
  };

  const isValidAmount = (amount: string) => {
    return /^\d+(\.\d{1,2})?$/.test(amount) && parseFloat(amount) > 0;
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, phoneNumber: e.target.value });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, amount: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidPhoneNumber(state.phoneNumber)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      return;
    }

    if (!isValidAmount(state.amount)) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }

    // Start processing
    setState({ ...state, isProcessing: true, status: 'pending', step: 2 });

    try {
      // 1. Send request to mobile money API
      const response = await sendMobileMoneyRequest(
        provider.name,
        state.phoneNumber,
        state.amount
      );

      if (!response.success) {
        setState({ ...state, status: 'failed', isProcessing: false });
        toast({
          title: "Payment Request Failed",
          description: response.message,
          variant: "destructive"
        });
        return;
      }

      // 2. Show that the prompt has been sent to the customer
      toast({
        title: "Payment Prompt Sent",
        description: `Mobile money prompt sent to ${state.phoneNumber}`,
      });

      // 3. Start checking for payment confirmation
      setState({ ...state, step: 3 });
      
      // 4. Poll for payment status (in a real app, you might use webhooks)
      const statusCheck = await checkPaymentStatus(response.transactionId!);
      
      if (statusCheck.success) {
        // 5. Payment confirmed
        setState({ ...state, status: 'confirmed', isProcessing: false, step: 4 });
        toast({
          title: "Payment Confirmed",
          description: `Payment of ${state.amount} successfully processed`,
        });
        onComplete(true, response.transactionId);
      } else {
        // 5. Payment not confirmed yet
        setState({ ...state, status: 'pending', isProcessing: false });
        toast({
          title: "Awaiting Confirmation",
          description: "Please ask the customer to check their phone and complete the payment",
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
      setState({ ...state, status: 'failed', isProcessing: false });
      toast({
        title: "Payment Error",
        description: "An unexpected error occurred while processing payment",
        variant: "destructive"
      });
    }
  };

  // Render different steps of the payment process
  const renderStep = () => {
    switch (state.step) {
      case 1:
        // Step 1: Enter phone number and amount
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="phoneNumber" className="text-sm font-medium mb-1 block">
                Customer Phone Number
              </label>
              <Input
                id="phoneNumber"
                placeholder="Enter customer phone number"
                value={state.phoneNumber}
                onChange={handlePhoneNumberChange}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="amount" className="text-sm font-medium mb-1 block">
                Amount
              </label>
              <Input
                id="amount"
                placeholder="Enter amount"
                value={state.amount}
                onChange={handleAmountChange}
                className="w-full"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium"
              disabled={state.isProcessing}
            >
              {state.isProcessing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Send Payment Request
            </Button>
          </form>
        );
      case 2:
        // Step 2: Sending request to mobile money API
        return (
          <div className="text-center py-6">
            <Loader2 className="w-12 h-12 animate-spin text-taviflow-primary mx-auto mb-4" />
            <h3 className="font-medium">Sending Payment Request</h3>
            <p className="text-sm text-taviflow-muted mt-1">
              Connecting to {provider.name} payment gateway...
            </p>
          </div>
        );
      case 3:
        // Step 3: Waiting for customer confirmation
        return (
          <div className="text-center py-6">
            <div className="relative mx-auto w-20 h-20 mb-4">
              <Phone className="w-12 h-12 text-taviflow-primary mx-auto" />
              <div className="absolute top-0 right-0 w-6 h-6 rounded-full bg-taviflow-primary/30 flex items-center justify-center animate-pulse">
                <AlertCircle className="w-4 h-4 text-taviflow-primary" />
              </div>
            </div>
            <h3 className="font-medium">Payment Prompt Sent</h3>
            <p className="text-sm text-taviflow-muted mt-1">
              Customer will receive a prompt on their phone to confirm payment of <span className="font-semibold">{state.amount}</span>
            </p>
            <div className="mt-6">
              <p className="text-xs text-taviflow-muted">
                Customer should:
              </p>
              <ol className="text-xs text-left list-decimal list-inside mt-2 space-y-1">
                <li>Check their phone for a payment request notification</li>
                <li>Open the mobile money app or USSD prompt</li>
                <li>Enter their PIN to authorize the payment</li>
                <li>Wait for confirmation message</li>
              </ol>
            </div>
            <div className="mt-6 flex justify-center">
              <Loader2 className="w-5 h-5 animate-spin text-taviflow-muted" />
              <span className="text-sm text-taviflow-muted ml-2">Waiting for confirmation...</span>
            </div>
          </div>
        );
      case 4:
        // Step 4: Payment confirmed
        return (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-medium text-lg">Payment Confirmed!</h3>
            <p className="text-sm text-taviflow-muted mt-1">
              The payment of <span className="font-semibold">{state.amount}</span> has been successfully processed.
            </p>
            <Button 
              onClick={() => setState({
                phoneNumber: '',
                amount: '',
                isProcessing: false,
                status: 'idle',
                step: 1
              })}
              className="mt-6 bg-taviflow-primary/10 text-taviflow-primary hover:bg-taviflow-primary/20"
            >
              Process Another Payment
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center mb-6">
        <div className={`w-12 h-12 rounded-full ${provider.color} flex items-center justify-center mr-3`}>
          {provider.icon}
        </div>
        <div>
          <h2 className="text-lg font-semibold">{provider.name} Payment</h2>
          <p className="text-sm text-taviflow-muted">
            Process mobile money payments securely
          </p>
        </div>
      </div>

      <div className="border-t border-taviflow-border pt-6">
        {renderStep()}
      </div>
    </div>
  );
};

export default MobileMoneyPaymentProcessor;
