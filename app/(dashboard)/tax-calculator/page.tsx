'use client'
/**
 * Tax Calculator Page
 * 
 * This component provides tools for calculating and managing various business taxes:
 * - Sales tax calculations
 * - Income tax estimations
 * - Tax deduction tracking
 * - Payment schedule management
 */

import { useState, useEffect } from "react";
import { 
  Calculator, 
  DollarSign, 
  Calendar, 
  PlusCircle, 
  Save, 
  Clock, 
  Printer, 
  Pencil,
  FileText, 
  AlertCircle, 
  Check, 
  ArrowUpRight, 
  ArrowDownRight,
  CalendarClock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Tax rate constants
const GST_RATE = 0.05;
const QST_RATE = 0.09975;
const FEDERAL_TAX_RATE = 0.15;
const PROVINCIAL_TAX_RATE = 0.09;

// Interface for tax payments
interface TaxPayment {
  id: string;
  taxType: string;
  amount: number;
  dueDate: string;
  paymentDate?: string;
  status: "Upcoming" | "Paid" | "Overdue";
}

// Interface for tax deductions
interface TaxDeduction {
  id: string;
  name: string;
  amount: number;
  category: string;
  taxYear: string;
  eligible: boolean;
}

// Utility function to format dates
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Utility function to calculate days between two dates
const daysBetween = (date1: Date, date2: Date): number => {
  const diff = date2.getTime() - date1.getTime();
  return Math.ceil(diff / (1000 * 3600 * 24));
};

const TaxCalculator = () => {
  const [sales, setSales] = useState<number>(0);
  const [gst, setGst] = useState<number>(0);
  const [qst, setQst] = useState<number>(0);
  const [income, setIncome] = useState<number>(0);
  const [federalTax, setFederalTax] = useState<number>(0);
  const [provincialTax, setProvincialTax] = useState<number>(0);
  const [deductionName, setDeductionName] = useState<string>("");
  const [deductionAmount, setDeductionAmount] = useState<number>(0);
  const [deductionCategory, setDeductionCategory] = useState<string>("");
  const [taxYear, setTaxYear] = useState<string>(new Date().getFullYear().toString());
  const [isEligible, setIsEligible] = useState<boolean>(false);
  const [taxPayments, setTaxPayments] = useState<TaxPayment[]>([
    {
      id: "1",
      taxType: "GST/HST",
      amount: 1250.00,
      dueDate: "2024-07-30",
      status: "Upcoming"
    },
    {
      id: "2",
      taxType: "QST",
      amount: 1995.00,
      dueDate: "2024-08-15",
      status: "Upcoming"
    },
    {
      id: "3",
      taxType: "Federal Income Tax",
      amount: 5000.00,
      dueDate: "2024-12-30",
      status: "Upcoming"
    },
    {
      id: "4",
      taxType: "Provincial Income Tax",
      amount: 3000.00,
      dueDate: "2024-12-30",
      status: "Upcoming"
    }
  ]);
  const [taxDeductions, setTaxDeductions] = useState<TaxDeduction[]>([
    {
      id: "1",
      name: "Home Office Expenses",
      amount: 3000,
      category: "Office",
      taxYear: "2023",
      eligible: true
    },
    {
      id: "2",
      name: "Professional Development",
      amount: 1500,
      category: "Education",
      taxYear: "2023",
      eligible: true
    }
  ]);

  useEffect(() => {
    // Calculate GST and QST based on sales
    setGst(sales * GST_RATE);
    setQst(sales * QST_RATE);
  }, [sales]);

  useEffect(() => {
    // Calculate federal and provincial tax based on income
    setFederalTax(income * FEDERAL_TAX_RATE);
    setProvincialTax(income * PROVINCIAL_TAX_RATE);
  }, [income]);

  const calculateSalesTax = () => {
    setGst(sales * GST_RATE);
    setQst(sales * QST_RATE);
    toast.success("Sales tax calculated!");
  };

  const calculateIncomeTax = () => {
    setFederalTax(income * FEDERAL_TAX_RATE);
    setProvincialTax(income * PROVINCIAL_TAX_RATE);
    toast.success("Income tax estimated!");
  };

  const addTaxDeduction = () => {
    if (!deductionName || !deductionCategory || !deductionAmount || !taxYear) {
      toast.error("Please fill in all deduction fields");
      return;
    }

    const newDeduction: TaxDeduction = {
      id: String(taxDeductions.length + 1),
      name: deductionName,
      amount: deductionAmount,
      category: deductionCategory,
      taxYear: taxYear,
      eligible: isEligible
    };

    setTaxDeductions([...taxDeductions, newDeduction]);
    toast.success(`${deductionName} added successfully!`);

    // Clear the form
    setDeductionName("");
    setDeductionAmount(0);
    setDeductionCategory("");
    setTaxYear(new Date().getFullYear().toString());
    setIsEligible(false);
  };

  const handleMarkAsPaid = (payment: TaxPayment) => {
    const updatedPayments = taxPayments.map(p =>
      p.id === payment.id 
        ? { ...p, status: "Paid" as const, paymentDate: new Date().toISOString() } 
        : p
    );
    setTaxPayments(updatedPayments);
    toast.success(`${payment.taxType} marked as paid!`);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold mb-1">Tax Management</h1>
        <p className="text-taviflow-muted text-xs">Calculate, track, and manage your business tax obligations</p>
      </div>
      
      {/* Main content */}
      <Tabs defaultValue="calculator">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="calculator">Tax Calculator</TabsTrigger>
          <TabsTrigger value="deductions">Deductions</TabsTrigger>
          <TabsTrigger value="payments">Payment Schedule</TabsTrigger>
          <TabsTrigger value="reports">Tax Reports</TabsTrigger>
        </TabsList>
        
        {/* Calculator Tab */}
        <TabsContent value="calculator">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-4">
              <h2 className="text-base font-medium mb-3">Sales Tax Calculator</h2>
              <p className="text-taviflow-muted text-xs mb-4">Calculate GST and QST based on total sales.</p>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="sales">Total Sales</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="sales" 
                      type="number" 
                      placeholder="Enter total sales" 
                      className="pl-8"
                      value={sales}
                      onChange={(e) => setSales(parseFloat(e.target.value))}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <span>GST (5%):</span>
                  <span>${gst.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>QST (9.975%):</span>
                  <span>${qst.toFixed(2)}</span>
                </div>
                
                <Button onClick={calculateSalesTax} className="w-full">Calculate Sales Tax</Button>
              </div>
            </div>
            
            <div className="glass-card p-4">
              <h2 className="text-base font-medium mb-3">Income Tax Estimator</h2>
              <p className="text-taviflow-muted text-xs mb-4">Estimate federal and provincial income tax based on total income.</p>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="income">Total Income</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="income" 
                      type="number" 
                      placeholder="Enter total income" 
                      className="pl-8"
                      value={income}
                      onChange={(e) => setIncome(parseFloat(e.target.value))}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <span>Federal Tax (15%):</span>
                  <span>${federalTax.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Provincial Tax (9%):</span>
                  <span>${provincialTax.toFixed(2)}</span>
                </div>
                
                <Button onClick={calculateIncomeTax} className="w-full">Estimate Income Tax</Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Deductions Tab */}
        <TabsContent value="deductions">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card p-4 md:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Tax Deductions</h3>
                <Button size="sm" variant="outline" className="text-xs h-8">
                  <PlusCircle className="mr-1 h-3.5 w-3.5" />
                  Add Deduction
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 text-xs font-medium">Name</th>
                      <th className="text-left p-2 text-xs font-medium">Amount</th>
                      <th className="text-left p-2 text-xs font-medium">Category</th>
                      <th className="text-left p-2 text-xs font-medium">Tax Year</th>
                      <th className="text-left p-2 text-xs font-medium">Eligible</th>
                      <th className="text-right p-2 text-xs font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taxDeductions.map((deduction) => (
                      <tr key={deduction.id} className="border-b">
                        <td className="p-2 text-xs">{deduction.name}</td>
                        <td className="p-2 text-xs">${deduction.amount.toFixed(2)}</td>
                        <td className="p-2 text-xs">{deduction.category}</td>
                        <td className="p-2 text-xs">{deduction.taxYear}</td>
                        <td className="p-2 text-xs">{deduction.eligible ? "Yes" : "No"}</td>
                        <td className="p-2 text-right">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="glass-card p-4">
              <h3 className="font-medium mb-3 text-sm">Add New Deduction</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="deduction-name">Deduction Name</Label>
                  <Input 
                    id="deduction-name" 
                    type="text" 
                    placeholder="Enter deduction name" 
                    className="text-xs"
                    value={deductionName}
                    onChange={(e) => setDeductionName(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="deduction-amount">Amount</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="deduction-amount" 
                      type="number" 
                      placeholder="Enter amount" 
                      className="pl-8 text-xs"
                      value={deductionAmount}
                      onChange={(e) => setDeductionAmount(parseFloat(e.target.value))}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="deduction-category">Category</Label>
                  <Select value={deductionCategory} onValueChange={setDeductionCategory}>
                    <SelectTrigger id="deduction-category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Office">Office</SelectItem>
                      <SelectItem value="Travel">Travel</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="tax-year">Tax Year</Label>
                  <Input 
                    id="tax-year" 
                    type="text" 
                    placeholder="Enter tax year" 
                    className="text-xs"
                    value={taxYear}
                    onChange={(e) => setTaxYear(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Input 
                    type="checkbox" 
                    id="eligible" 
                    checked={isEligible}
                    onChange={(e) => setIsEligible(e.target.checked)}
                  />
                  <Label htmlFor="eligible">Eligible</Label>
                </div>
                
                <Button onClick={addTaxDeduction} className="w-full">Add Deduction</Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Payment Schedule Tab */}
        <TabsContent value="payments">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card p-4 md:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Upcoming Tax Payments</h3>
                <Button size="sm" variant="outline" className="text-xs h-8">
                  <PlusCircle className="mr-1 h-3.5 w-3.5" />
                  Add Payment
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 text-xs font-medium">Tax Type</th>
                      <th className="text-left p-2 text-xs font-medium">Amount</th>
                      <th className="text-left p-2 text-xs font-medium">Due Date</th>
                      <th className="text-left p-2 text-xs font-medium">Status</th>
                      <th className="text-right p-2 text-xs font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taxPayments.map((payment) => (
                      <tr key={payment.id} className="border-b">
                        <td className="p-2 text-xs">{payment.taxType}</td>
                        <td className="p-2 text-xs">${payment.amount.toFixed(2)}</td>
                        <td className="p-2 text-xs">{formatDate(payment.dueDate)}</td>
                        <td className="p-2">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                            payment.status === "Paid" ? "tax-paid" : 
                            payment.status === "Overdue" ? "tax-overdue" : 
                            payment.status === "Upcoming" && daysBetween(new Date(), new Date(payment.dueDate)) <= 7 ? "tax-due-soon" : 
                            "tax-upcoming"
                          }`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="p-2 text-right">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleMarkAsPaid(payment)}>
                            <Check className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="glass-card p-4">
                <h3 className="font-medium mb-3 text-sm">Payment Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Paid (YTD):</span>
                    <span className="font-medium">${(taxPayments.filter(p => p.status === "Paid").reduce((sum, p) => sum + p.amount, 0)).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Upcoming (30 days):</span>
                    <span className="font-medium">${(taxPayments.filter(p => p.status === "Upcoming" && daysBetween(new Date(), new Date(p.dueDate)) <= 30).reduce((sum, p) => sum + p.amount, 0)).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Overdue:</span>
                    <span className="font-medium text-red-600">${(taxPayments.filter(p => p.status === "Overdue").reduce((sum, p) => sum + p.amount, 0)).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-4">
                <h3 className="font-medium mb-3 text-sm">Filing Deadlines</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-xs gap-2 p-2 bg-amber-50 rounded-md border border-amber-200">
                    <CalendarClock className="h-4 w-4 text-amber-600" />
                    <div>
                      <p>Quarterly GST/HST</p>
                      <p className="text-[10px] text-taviflow-muted">Due in 15 days</p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs gap-2 p-2 bg-green-50 rounded-md border border-green-200">
                    <CalendarClock className="h-4 w-4 text-green-600" />
                    <div>
                      <p>Employee Payroll Taxes</p>
                      <p className="text-[10px] text-taviflow-muted">Due next month</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Reports Tab */}
        <TabsContent value="reports">
          <div className="glass-card p-4">
            <h2 className="text-base font-medium mb-3">Tax Reports</h2>
            <p className="text-taviflow-muted text-xs mb-4">Generate detailed tax reports for different periods.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="border border-taviflow-border rounded-lg p-3 hover:shadow-md transition-all">
                <FileText className="w-6 h-6 text-taviflow-primary mb-2" />
                <h3 className="font-medium text-sm">Annual Tax Report</h3>
                <p className="text-xs text-taviflow-muted mt-1">Generate a report for the entire year</p>
                <Button className="w-full mt-3 text-xs h-7">Generate</Button>
              </div>
              
              <div className="border border-taviflow-border rounded-lg p-3 hover:shadow-md transition-all">
                <FileText className="w-6 h-6 text-taviflow-primary mb-2" />
                <h3 className="font-medium text-sm">Quarterly Tax Report</h3>
                <p className="text-xs text-taviflow-muted mt-1">Generate a report for a specific quarter</p>
                <Button className="w-full mt-3 text-xs h-7">Generate</Button>
              </div>
              
              <div className="border border-taviflow-border rounded-lg p-3 hover:shadow-md transition-all">
                <FileText className="w-6 h-6 text-taviflow-primary mb-2" />
                <h3 className="font-medium text-sm">Custom Tax Report</h3>
                <p className="text-xs text-taviflow-muted mt-1">Generate a report for a custom date range</p>
                <Button className="w-full mt-3 text-xs h-7">Generate</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaxCalculator;
