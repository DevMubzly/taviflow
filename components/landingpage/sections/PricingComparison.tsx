
import React from 'react';
import { Check, X } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PricingComparison = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12" data-animate>
        <h2 className="text-3xl font-bold text-taviflow-dark mb-4">Compare Plans</h2>
        <p className="text-lg text-taviflow-gray max-w-2xl mx-auto">
          See which plan has the features you need for your business
        </p>
      </div>
      
      <div className="mt-10" data-animate>
        <Tabs defaultValue="inventory">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
            <TabsTrigger value="inventory">Inventory Features</TabsTrigger>
            <TabsTrigger value="payments">Payment Features</TabsTrigger>
            <TabsTrigger value="support">Support & Integration</TabsTrigger>
          </TabsList>
          
          <TabsContent value="inventory" className="mt-8">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/3">Feature</TableHead>
                    <TableHead>Basic</TableHead>
                    <TableHead>Pro</TableHead>
                    <TableHead>Premium</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Real-time inventory tracking</TableCell>
                    <TableCell><Check className="h-5 w-5 text-taviflow-blue" /></TableCell>
                    <TableCell><Check className="h-5 w-5 text-taviflow-blue" /></TableCell>
                    <TableCell><Check className="h-5 w-5 text-taviflow-blue" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Stock alerts</TableCell>
                    <TableCell><Check className="h-5 w-5 text-taviflow-blue" /></TableCell>
                    <TableCell><Check className="h-5 w-5 text-taviflow-blue" /></TableCell>
                    <TableCell><Check className="h-5 w-5 text-taviflow-blue" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Barcode scanning</TableCell>
                    <TableCell><Check className="h-5 w-5 text-taviflow-blue" /></TableCell>
                    <TableCell><Check className="h-5 w-5 text-taviflow-blue" /></TableCell>
                    <TableCell><Check className="h-5 w-5 text-taviflow-blue" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Multiple locations</TableCell>
                    <TableCell><X className="h-5 w-5 text-gray-400" /></TableCell>
                    <TableCell>Up to 3</TableCell>
                    <TableCell>Unlimited</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Custom categories</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>15</TableCell>
                    <TableCell>Unlimited</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Purchase order management</TableCell>
                    <TableCell><X className="h-5 w-5 text-gray-400" /></TableCell>
                    <TableCell><Check className="h-5 w-5 text-taviflow-blue" /></TableCell>
                    <TableCell><Check className="h-5 w-5 text-taviflow-blue" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Supplier management</TableCell>
                    <TableCell>Basic</TableCell>
                    <TableCell>Advanced</TableCell>
                    <TableCell>Premium</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Advanced analytics</TableCell>
                    <TableCell><X className="h-5 w-5 text-gray-400" /></TableCell>
                    <TableCell><Check className="h-5 w-5 text-taviflow-blue" /></TableCell>
                    <TableCell><Check className="h-5 w-5 text-taviflow-blue" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Custom reporting</TableCell>
                    <TableCell><X className="h-5 w-5 text-gray-400" /></TableCell>
                    <TableCell>Limited</TableCell>
                    <TableCell>Full Access</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="payments" className="mt-8">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/3">Feature</TableHead>
                    <TableHead>Basic</TableHead>
                    <TableHead>Pro</TableHead>
                    <TableHead>Premium</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Mobile Money integration</TableCell>
                    <TableCell><Check className="h-5 w-5 text-taviflow-blue" /></TableCell>
                    <TableCell><Check className="h-5 w-5 text-taviflow-blue" /></TableCell>
                    <TableCell><Check className="h-5 w-5 text-taviflow-blue" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Bank account integration</TableCell>
                    <TableCell><X className="h-5 w-5 text-gray-400" /></TableCell>
                    <TableCell><Check className="h-5 w-5 text-taviflow-blue" /></TableCell>
                    <TableCell><Check className="h-5 w-5 text-taviflow-blue" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Automatic reconciliation</TableCell>
                    <TableCell><X className="h-5 w-5 text-gray-400" /></TableCell>
                    <TableCell><Check className="h-5 w-5 text-taviflow-blue" /></TableCell>
                    <TableCell><Check className="h-5 w-5 text-taviflow-blue" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Invoice generation</TableCell>
                    <TableCell>Basic</TableCell>
                    <TableCell>Customizable</TableCell>
                    <TableCell>Fully Branded</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Payment reminders</TableCell>
                    <TableCell><X className="h-5 w-5 text-gray-400" /></TableCell>
                    <TableCell><Check className="h-5 w-5 text-taviflow-blue" /></TableCell>
                    <TableCell><Check className="h-5 w-5 text-taviflow-blue" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">International payments</TableCell>
                    <TableCell><X className="h-5 w-5 text-gray-400" /></TableCell>
                    <TableCell><X className="h-5 w-5 text-gray-400" /></TableCell>
                    <TableCell><Check className="h-5 w-5 text-taviflow-blue" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Currency conversion</TableCell>
                    <TableCell><X className="h-5 w-5 text-gray-400" /></TableCell>
                    <TableCell><X className="h-5 w-5 text-gray-400" /></TableCell>
                    <TableCell><Check className="h-5 w-5 text-taviflow-blue" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Payment processing fee</TableCell>
                    <TableCell>2.9%</TableCell>
                    <TableCell>2.5%</TableCell>
                    <TableCell>1.9%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="support" className="mt-8">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/3">Feature</TableHead>
                    <TableHead>Basic</TableHead>
                    <TableHead>Pro</TableHead>
                    <TableHead>Premium</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Customer support</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Email & Chat</TableCell>
                    <TableCell>Email, Chat & Phone</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Response time</TableCell>
                    <TableCell>48 hours</TableCell>
                    <TableCell>24 hours</TableCell>
                    <TableCell>4 hours</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Dedicated account manager</TableCell>
                    <TableCell><X className="h-5 w-5 text-gray-400" /></TableCell>
                    <TableCell><X className="h-5 w-5 text-gray-400" /></TableCell>
                    <TableCell><Check className="h-5 w-5 text-taviflow-blue" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Onboarding support</TableCell>
                    <TableCell>Basic</TableCell>
                    <TableCell>Comprehensive</TableCell>
                    <TableCell>Premium</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Training sessions</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>Unlimited</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">API access</TableCell>
                    <TableCell><X className="h-5 w-5 text-gray-400" /></TableCell>
                    <TableCell>Limited</TableCell>
                    <TableCell>Full</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Third-party integrations</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>Unlimited</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Custom development</TableCell>
                    <TableCell><X className="h-5 w-5 text-gray-400" /></TableCell>
                    <TableCell><X className="h-5 w-5 text-gray-400" /></TableCell>
                    <TableCell><Check className="h-5 w-5 text-taviflow-blue" /></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PricingComparison;
