
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Smartphone, Building, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';

interface PaymentOptionsProps {
  selectedPlan?: string | null;
  planPrice?: string | null;
}

const PaymentOptions = ({ selectedPlan, planPrice }: PaymentOptionsProps = {}) => {
  const router = useRouter();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Payment process initiated",
      description: selectedPlan 
        ? `We're processing your payment for the ${selectedPlan} plan. You'll receive a confirmation shortly.`
        : "We're processing your payment. You'll receive a confirmation shortly.",
      variant: "default",
    });
    
    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Payment successful!",
        description: selectedPlan 
          ? `Your subscription to the ${selectedPlan} plan has been activated.`
          : "Your payment has been processed successfully.",
        variant: "default",
      });
      
      // Navigate to payment confirmation page
      setTimeout(() => {
        router.push(`/payment-confirmation?plan=${selectedPlan}&price=${planPrice}`);
      }, 2000);
    }, 3000);
  };

  // Set default amount based on the selected plan
  const getDefaultAmount = () => {
    if (!planPrice) return '';
    // Extract just the number from a string like "UGX 15,000"
    return planPrice.replace(/[^0-9]/g, '');
  };

  // Get plan-specific benefits
  const getPlanBenefits = () => {
    switch(selectedPlan) {
      case 'Basic':
        return [
          { title: 'Instant Access', description: 'Get access to basic features immediately' },
          { title: 'Free Trial', description: 'Try out the platform with no commitment' },
          { title: 'Basic Support', description: 'Email support within 24 hours' },
        ];
      case 'Pro':
        return [
          { title: 'Premium Features', description: 'Full access to all professional features' },
          { title: '30-Day Trial', description: 'Extended trial period to test all features' },
          { title: 'Priority Support', description: 'Get help within 4 hours via chat and email' },
        ];
      case 'Premium':
        return [
          { title: 'Enterprise Solutions', description: 'Advanced features for large businesses' },
          { title: 'Dedicated Manager', description: 'Your own account manager for personalized support' },
          { title: 'Custom Development', description: 'Request custom features for your business' },
        ];
      default:
        return [
          { title: 'Secure Transactions', description: 'All payments are encrypted and secure' },
          { title: 'Multiple Options', description: 'Choose the payment method that works for you' },
          { title: 'Instant Activation', description: 'Get access immediately after payment' },
        ];
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2" data-animate>
          <Tabs defaultValue="mobileMoney" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="mobileMoney" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                <span className="hidden sm:inline">Mobile Money</span>
              </TabsTrigger>
              <TabsTrigger value="airtelMoney" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                <span className="hidden sm:inline">Airtel Money</span>
              </TabsTrigger>
              <TabsTrigger value="bankTransfer" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span className="hidden sm:inline">Bank Transfer</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="mobileMoney">
              <Card>
                <CardHeader>
                  <CardTitle>Pay with Mobile Money</CardTitle>
                  <CardDescription>
                    Securely pay for your subscription using Mobile Money. Instant activation after payment.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="mobileName">Full Name</Label>
                        <Input id="mobileName" placeholder="John Doe" required />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="mobileNumber">Mobile Money Number</Label>
                        <Input id="mobileNumber" placeholder="e.g., 0712345678" required pattern="[0-9]+" />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="mobileAmount">Amount (UGX)</Label>
                        <Input 
                          id="mobileAmount" 
                          type="text"
                          placeholder="Enter amount" 
                          required 
                          defaultValue={getDefaultAmount()}
                          className="bg-gray-50"
                          readOnly
                        />
                        {selectedPlan && (
                          <p className="text-sm text-muted-foreground">
                            Fixed amount based on your selected {selectedPlan} plan
                          </p>
                        )}
                      </div>
                      <Button type="submit" className="w-full bg-taviflow-blue hover:bg-taviflow-blue-dark">
                        Pay Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col items-start">
                  <p className="text-sm text-muted-foreground">
                    You will receive a prompt on your phone to confirm payment.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="airtelMoney">
              <Card>
                <CardHeader>
                  <CardTitle>Pay with Airtel Money</CardTitle>
                  <CardDescription>
                    Quick and secure payments using Airtel Money. No additional fees.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="airtelName">Full Name</Label>
                        <Input id="airtelName" placeholder="John Doe" required />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="airtelNumber">Airtel Money Number</Label>
                        <Input id="airtelNumber" placeholder="e.g., 0751234567" required pattern="[0-9]+" />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="airtelAmount">Amount (UGX)</Label>
                        <Input 
                          id="airtelAmount" 
                          type="text" 
                          placeholder="Enter amount" 
                          required 
                          defaultValue={getDefaultAmount()}
                          className="bg-gray-50"
                          readOnly
                        />
                        {selectedPlan && (
                          <p className="text-sm text-muted-foreground">
                            Fixed amount based on your selected {selectedPlan} plan
                          </p>
                        )}
                      </div>
                      <Button type="submit" className="w-full bg-taviflow-blue hover:bg-taviflow-blue-dark">
                        Pay Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col items-start">
                  <p className="text-sm text-muted-foreground">
                    You will receive a confirmation message after your payment is processed.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="bankTransfer">
              <Card>
                <CardHeader>
                  <CardTitle>Pay with Bank Transfer</CardTitle>
                  <CardDescription>
                    Make a direct bank transfer to our account. Ideal for business accounts.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="border rounded-md p-4 bg-muted/50">
                      <h3 className="font-medium mb-2">Bank Account Details</h3>
                      <ScrollArea className="h-32">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Bank Name:</span>
                            <span className="font-medium">TaviFlow National Bank</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Account Name:</span>
                            <span className="font-medium">TaviFlow Ltd</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Account Number:</span>
                            <span className="font-medium">1234567890</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Sort Code:</span>
                            <span className="font-medium">10-20-30</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">SWIFT/BIC:</span>
                            <span className="font-medium">TAVIFLDXXX</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Reference:</span>
                            <span className="font-medium">Your Email Address</span>
                          </div>
                        </div>
                      </ScrollArea>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="grid gap-3">
                        <Label htmlFor="transferReference">Transfer Reference</Label>
                        <Input id="transferReference" placeholder="Enter your transfer reference" required />
                      </div>
                      <div className="grid gap-3 mt-3">
                        <Label htmlFor="transferAmount">Amount Transferred (UGX)</Label>
                        <Input 
                          id="transferAmount" 
                          type="text" 
                          placeholder="Enter amount" 
                          required 
                          defaultValue={getDefaultAmount()}
                          className="bg-gray-50"
                          readOnly
                        />
                        {selectedPlan && (
                          <p className="text-sm text-muted-foreground">
                            Fixed amount based on your selected {selectedPlan} plan
                          </p>
                        )}
                      </div>
                      <Button type="submit" className="w-full mt-6 bg-taviflow-blue hover:bg-taviflow-blue-dark">
                        Confirm Transfer <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start">
                  <p className="text-sm text-muted-foreground">
                    Please allow 1-3 business days for your payment to be processed.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div data-animate>
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedPlan ? `${selectedPlan} Plan Benefits` : 'Why Choose TaviFlow Payments'}
              </CardTitle>
              <CardDescription>
                {selectedPlan ? `Key advantages of the ${selectedPlan} plan` : 'Secure, flexible payment solutions for your business'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {getPlanBenefits().map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-taviflow-blue mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">{benefit.title}</p>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </li>
                ))}
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-taviflow-blue mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Transparent Pricing</p>
                    <p className="text-sm text-muted-foreground">No hidden fees or charges</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-taviflow-blue mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Dedicated Support</p>
                    <p className="text-sm text-muted-foreground">Get help with payment-related queries</p>
                  </div>
                </li>
              </ul>
            </CardContent>
            {selectedPlan && (
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full border-taviflow-blue text-taviflow-blue hover:bg-taviflow-blue-light/20"
                  onClick={() => router.push(`/pricing/${selectedPlan.toLowerCase()}`)}
                >
                  Learn More About {selectedPlan}
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
