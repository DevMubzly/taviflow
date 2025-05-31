
/**
 * Payment Mock Utilities
 * 
 * This file contains mock functions that simulate payment API calls.
 * These utilities allow testing the payment flow without connecting to actual payment gateways.
 * They include functions to simulate payment requests and status checking with configurable success rates.
 */

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  message: string;
}

export interface StatusCheckResponse {
  success: boolean;
  status: string;
  message: string;
}

// Mock function to simulate API call
export const sendMobileMoneyRequest = async (provider: string, phoneNumber: string, amount: string): Promise<PaymentResponse> => {
  console.log(`Sending ${amount} to ${phoneNumber} via ${provider}`);
  
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Randomly succeed or fail for demo purposes
      const success = Math.random() > 0.2;
      resolve({
        success,
        transactionId: success ? `TXN-${Math.floor(Math.random() * 1000000)}` : undefined,
        message: success ? 'Payment prompt sent to customer' : 'Failed to send payment prompt'
      });
    }, 2000);
  });
};

// Mock function to check payment status
export const checkPaymentStatus = async (transactionId: string): Promise<StatusCheckResponse> => {
  console.log(`Checking status for transaction ${transactionId}`);
  
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Randomly simulate customer confirming or timing out for demo purposes
      const confirmed = Math.random() > 0.3;
      resolve({
        success: confirmed,
        status: confirmed ? 'confirmed' : 'pending',
        message: confirmed ? 'Customer confirmed payment' : 'Waiting for customer confirmation'
      });
    }, 3000);
  });
};
