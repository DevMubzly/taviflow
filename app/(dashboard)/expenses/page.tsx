
/**
 * Business Expenses Page
 * 
 * This component provides tools for tracking and managing all business expenses:
 * - Expense entry and categorization
 * - Expense reporting and analytics
 * - Budget tracking against expenses
 * - Expense approval workflow
 */
'use client'

import { useState } from "react";
import { 
  DollarSign, 
  Wallet, 
  ShoppingBag, 
  PlusCircle, 
  Filter, 
  Download, 
  FileText, 
  BarChart2,
  Pencil,
  Trash,
  Building,
  Users,
  Package,
  Receipt,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Pagination from "@/components/common/Pagination";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger 
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Types
interface Expense {
  id: string;
  date: string;
  category: "Inventory" | "Salary" | "Rent" | "Utilities" | "Marketing" | "Equipment" | "Insurance" | "Other";
  description: string;
  amount: number;
  paymentMethod: "Cash" | "Credit Card" | "Bank Transfer" | "Check" | "Mobile Money";
  status: "Pending" | "Approved" | "Rejected";
  recurring: boolean;
  attachmentUrl?: string;
  createdBy: string;
}

interface Budget {
  category: string;
  planned: number;
  spent: number;
}

const Expenses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [addExpenseOpen, setAddExpenseOpen] = useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("month");
  const [newExpense, setNewExpense] = useState<Partial<Expense>>({
    date: new Date().toISOString().split("T")[0],
    category: "Inventory",
    description: "",
    amount: 0,
    paymentMethod: "Bank Transfer",
    status: "Pending",
    recurring: false,
    createdBy: "John Smith"
  });
  
  const itemsPerPage = 7;
  
  // Sample expense data
  const expenses: Expense[] = [
    {
      id: "1",
      date: "2023-05-15",
      category: "Inventory",
      description: "Restocking summer collection",
      amount: 2500,
      paymentMethod: "Bank Transfer",
      status: "Approved",
      recurring: false,
      createdBy: "John Smith"
    },
    {
      id: "2",
      date: "2023-05-12",
      category: "Salary",
      description: "Employee payroll - May first half",
      amount: 4200,
      paymentMethod: "Bank Transfer",
      status: "Approved",
      recurring: true,
      createdBy: "Sarah Johnson"
    },
    {
      id: "3",
      date: "2023-05-10",
      category: "Rent",
      description: "Office space monthly rent",
      amount: 1800,
      paymentMethod: "Check",
      status: "Approved",
      recurring: true,
      createdBy: "John Smith"
    },
    {
      id: "4",
      date: "2023-05-08",
      category: "Utilities",
      description: "Electricity and water bill",
      amount: 350,
      paymentMethod: "Credit Card",
      status: "Approved",
      recurring: true,
      createdBy: "John Smith"
    },
    {
      id: "5",
      date: "2023-05-05",
      category: "Marketing",
      description: "Google Ads campaign",
      amount: 750,
      paymentMethod: "Credit Card",
      status: "Approved",
      recurring: false,
      createdBy: "Sarah Johnson"
    },
    {
      id: "6",
      date: "2023-05-17",
      category: "Equipment",
      description: "New laptop for design team",
      amount: 1200,
      paymentMethod: "Credit Card",
      status: "Pending",
      recurring: false,
      createdBy: "John Smith"
    },
    {
      id: "7",
      date: "2023-05-18",
      category: "Insurance",
      description: "Business liability insurance",
      amount: 450,
      paymentMethod: "Bank Transfer",
      status: "Pending",
      recurring: false,
      createdBy: "John Smith"
    },
    {
      id: "8",
      date: "2023-05-20",
      category: "Other",
      description: "Staff lunch meeting",
      amount: 120,
      paymentMethod: "Cash",
      status: "Pending",
      recurring: false,
      createdBy: "Sarah Johnson"
    }
  ];
  
  // Budget data
  const budgets: Budget[] = [
    { category: "Inventory", planned: 3000, spent: 2500 },
    { category: "Salary", planned: 5000, spent: 4200 },
    { category: "Rent", planned: 1800, spent: 1800 },
    { category: "Utilities", planned: 400, spent: 350 },
    { category: "Marketing", planned: 1000, spent: 750 },
    { category: "Equipment", planned: 1000, spent: 1200 },
    { category: "Insurance", planned: 500, spent: 450 },
    { category: "Other", planned: 500, spent: 120 }
  ];
  
  // Calculate expense statistics
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const approvedExpenses = expenses.filter(e => e.status === "Approved").reduce((sum, expense) => sum + expense.amount, 0);
  const pendingExpenses = expenses.filter(e => e.status === "Pending").reduce((sum, expense) => sum + expense.amount, 0);
  
  // Filter expenses based on search and active tab
  const filteredExpenses = expenses.filter(expense => {
    // Search filter
    const matchesSearch = 
      expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Tab filter
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "inventory" && expense.category === "Inventory") ||
      (activeTab === "operational" && ["Rent", "Utilities", "Insurance"].includes(expense.category as any)) ||
      (activeTab === "salary" && expense.category === "Salary") ||
      (activeTab === "pending" && expense.status === "Pending");
    
    return matchesSearch && matchesTab;
  });
  
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
  const currentExpenses = filteredExpenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Inventory":
        return <Package className="h-3.5 w-3.5" />;
      case "Salary":
        return <Users className="h-3.5 w-3.5" />;
      case "Rent":
        return <Building className="h-3.5 w-3.5" />;
      case "Utilities":
        return <Wallet className="h-3.5 w-3.5" />;
      case "Marketing":
        return <BarChart2 className="h-3.5 w-3.5" />;
      case "Equipment":
        return <ShoppingBag className="h-3.5 w-3.5" />;
      case "Insurance":
        return <FileText className="h-3.5 w-3.5" />;
      default:
        return <Receipt className="h-3.5 w-3.5" />;
    }
  };
  
  // Get status badge class
  const getStatusClass = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-amber-100 text-amber-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  // Handle form submission
  const handleAddExpense = () => {
    if (!newExpense.description || newExpense.amount === 0) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    toast.success("Expense recorded successfully", {
      description: `${newExpense.description} - $${newExpense.amount}`
    });
    
    // Reset form and close dialog
    setNewExpense({
      date: new Date().toISOString().split("T")[0],
      category: "Inventory",
      description: "",
      amount: 0,
      paymentMethod: "Bank Transfer",
      status: "Pending",
      recurring: false,
      createdBy: "John Smith"
    });
    setAddExpenseOpen(false);
  };
  
  // Calculate budget usage percentage
  const calculateUsage = (spent: number, planned: number) => {
    const percentage = (spent / planned) * 100;
    return Math.min(percentage, 100); // Cap at 100% for the bar display
  };
  
  // Get progress bar color based on usage
  const getProgressColor = (spent: number, planned: number) => {
    const percentage = (spent / planned) * 100;
    if (percentage > 90) return "bg-red-500";
    if (percentage > 75) return "bg-amber-500";
    return "bg-green-500";
  };
  
  // Get the total planned and spent from budgets
  const totalPlanned = budgets.reduce((sum, budget) => sum + budget.planned, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold mb-1">Expense Management</h1>
        <p className="text-taviflow-muted text-xs">Track, analyze and manage all business expenses</p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="glass-card p-2.5 flex items-center gap-3">
          <div className="bg-taviflow-primary/10 rounded-full p-2 flex-shrink-0">
            <DollarSign className="w-3.5 h-3.5 text-taviflow-primary" />
          </div>
          <div>
            <p className="text-xs font-medium">Total Expenses</p>
            <p className="text-xl font-semibold">${totalExpenses.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="glass-card p-2.5 flex items-center gap-3">
          <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
            <ShoppingBag className="w-3.5 h-3.5 text-green-600" />
          </div>
          <div>
            <p className="text-xs font-medium">Inventory Costs</p>
            <p className="text-xl font-semibold">${expenses.filter(e => e.category === "Inventory").reduce((sum, e) => sum + e.amount, 0).toLocaleString()}</p>
          </div>
        </div>
        
        <div className="glass-card p-2.5 flex items-center gap-3">
          <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
            <Users className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div>
            <p className="text-xs font-medium">Salary Expenses</p>
            <p className="text-xl font-semibold">${expenses.filter(e => e.category === "Salary").reduce((sum, e) => sum + e.amount, 0).toLocaleString()}</p>
          </div>
        </div>
        
        <div className="glass-card p-2.5 flex items-center gap-3">
          <div className="bg-amber-100 rounded-full p-2 flex-shrink-0">
            <Receipt className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div>
            <p className="text-xs font-medium">Pending Approval</p>
            <p className="text-xl font-semibold">${pendingExpenses.toLocaleString()}</p>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="glass-card p-0 overflow-hidden">
            <Tabs defaultValue="all" onValueChange={(value) => {
              setActiveTab(value);
              setCurrentPage(1);
            }}>
              <div className="border-b border-taviflow-border px-3">
                <TabsList className="flex bg-transparent p-0">
                  <TabsTrigger 
                    value="all" 
                    className="px-3 py-2 text-xs rounded-none border-b-2 data-[state=active]:border-taviflow-primary data-[state=inactive]:border-transparent transition-all"
                  >
                    All Expenses
                  </TabsTrigger>
                  <TabsTrigger 
                    value="inventory" 
                    className="px-3 py-2 text-xs rounded-none border-b-2 data-[state=active]:border-taviflow-primary data-[state=inactive]:border-transparent transition-all"
                  >
                    Inventory
                  </TabsTrigger>
                  <TabsTrigger 
                    value="operational" 
                    className="px-3 py-2 text-xs rounded-none border-b-2 data-[state=active]:border-taviflow-primary data-[state=inactive]:border-transparent transition-all"
                  >
                    Operational
                  </TabsTrigger>
                  <TabsTrigger 
                    value="salary" 
                    className="px-3 py-2 text-xs rounded-none border-b-2 data-[state=active]:border-taviflow-primary data-[state=inactive]:border-transparent transition-all"
                  >
                    Salary
                  </TabsTrigger>
                  <TabsTrigger 
                    value="pending" 
                    className="px-3 py-2 text-xs rounded-none border-b-2 data-[state=active]:border-taviflow-primary data-[state=inactive]:border-transparent transition-all"
                  >
                    Pending
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="p-3">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-3">
                  <div className="relative max-w-xs">
                    <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-taviflow-muted" />
                    <Input
                      placeholder="Search expenses..."
                      className="pl-7 h-8 text-xs"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="text-xs h-8 px-2">
                          <Filter className="mr-1 h-3 w-3" />
                          Filter
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Filter Expenses</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          {/* Filter options would go here */}
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date-range" className="text-right">
                              Date Range
                            </Label>
                            <select
                              id="date-range"
                              className="col-span-3 h-9 rounded-md border border-input px-3 py-1 text-sm"
                            >
                              <option value="week">This Week</option>
                              <option value="month" selected>This Month</option>
                              <option value="quarter">This Quarter</option>
                              <option value="year">This Year</option>
                              <option value="custom">Custom Range</option>
                            </select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                              Status
                            </Label>
                            <select
                              id="status"
                              className="col-span-3 h-9 rounded-md border border-input px-3 py-1 text-sm"
                            >
                              <option value="all">All Statuses</option>
                              <option value="approved">Approved</option>
                              <option value="pending">Pending</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                              Category
                            </Label>
                            <select
                              id="category"
                              className="col-span-3 h-9 rounded-md border border-input px-3 py-1 text-sm"
                            >
                              <option value="all">All Categories</option>
                              <option value="inventory">Inventory</option>
                              <option value="salary">Salary</option>
                              <option value="rent">Rent</option>
                              <option value="utilities">Utilities</option>
                              <option value="marketing">Marketing</option>
                              <option value="equipment">Equipment</option>
                              <option value="insurance">Insurance</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="payment-method" className="text-right">
                              Payment Method
                            </Label>
                            <select
                              id="payment-method"
                              className="col-span-3 h-9 rounded-md border border-input px-3 py-1 text-sm"
                            >
                              <option value="all">All Methods</option>
                              <option value="cash">Cash</option>
                              <option value="card">Credit Card</option>
                              <option value="transfer">Bank Transfer</option>
                              <option value="check">Check</option>
                              <option value="mobile">Mobile Money</option>
                            </select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setFilterDialogOpen(false)}>Cancel</Button>
                          <Button onClick={() => {
                            toast.success("Filters applied");
                            setFilterDialogOpen(false);
                          }}>Apply Filters</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Button size="sm" variant="outline" className="text-xs h-8 px-2">
                      <Download className="mr-1 h-3 w-3" />
                      Export
                    </Button>
                    
                    <Dialog open={addExpenseOpen} onOpenChange={setAddExpenseOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          className="text-xs h-8 px-2 bg-taviflow-primary text-white"
                        >
                          <PlusCircle className="mr-1 h-3 w-3" />
                          Record Expense
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Record New Expense</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="expense-date" className="text-right">
                              Date*
                            </Label>
                            <Input
                              id="expense-date"
                              type="date"
                              value={newExpense.date}
                              onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="expense-category" className="text-right">
                              Category*
                            </Label>
                            <Select
                              value={newExpense.category}
                              onValueChange={(value) => setNewExpense({...newExpense, category: value as any})}
                            >
                              <SelectTrigger id="expense-category" className="col-span-3">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Inventory">Inventory</SelectItem>
                                <SelectItem value="Salary">Salary</SelectItem>
                                <SelectItem value="Rent">Rent</SelectItem>
                                <SelectItem value="Utilities">Utilities</SelectItem>
                                <SelectItem value="Marketing">Marketing</SelectItem>
                                <SelectItem value="Equipment">Equipment</SelectItem>
                                <SelectItem value="Insurance">Insurance</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="expense-description" className="text-right">
                              Description*
                            </Label>
                            <Input
                              id="expense-description"
                              value={newExpense.description}
                              onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="expense-amount" className="text-right">
                              Amount*
                            </Label>
                            <div className="relative col-span-3">
                              <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="expense-amount"
                                type="number"
                                value={newExpense.amount}
                                onChange={(e) => setNewExpense({...newExpense, amount: parseFloat(e.target.value) || 0})}
                                className="pl-8"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="expense-payment" className="text-right">
                              Payment Method
                            </Label>
                            <Select
                              value={newExpense.paymentMethod}
                              onValueChange={(value) => setNewExpense({...newExpense, paymentMethod: value as any})}
                            >
                              <SelectTrigger id="expense-payment" className="col-span-3">
                                <SelectValue placeholder="Select payment method" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Cash">Cash</SelectItem>
                                <SelectItem value="Credit Card">Credit Card</SelectItem>
                                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                                <SelectItem value="Check">Check</SelectItem>
                                <SelectItem value="Mobile Money">Mobile Money</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <div className="col-span-1"></div>
                            <div className="flex items-center space-x-2 col-span-3">
                              <input
                                type="checkbox"
                                id="recurring"
                                checked={newExpense.recurring}
                                onChange={(e) => setNewExpense({...newExpense, recurring: e.target.checked})}
                                className="h-4 w-4"
                              />
                              <Label htmlFor="recurring">
                                Recurring expense
                              </Label>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setAddExpenseOpen(false)}>Cancel</Button>
                          <Button onClick={handleAddExpense}>Save Expense</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-taviflow-border">
                        <th className="text-left p-2 font-medium text-[10px]">DATE</th>
                        <th className="text-left p-2 font-medium text-[10px]">DESCRIPTION</th>
                        <th className="text-left p-2 font-medium text-[10px]">CATEGORY</th>
                        <th className="text-left p-2 font-medium text-[10px]">AMOUNT</th>
                        <th className="text-left p-2 font-medium text-[10px]">STATUS</th>
                        <th className="text-right p-2 font-medium text-[10px]">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentExpenses.map((expense) => (
                        <tr key={expense.id} className="border-b border-taviflow-border hover:bg-taviflow-secondary/30">
                          <td className="p-2 text-xs">{new Date(expense.date).toLocaleDateString()}</td>
                          <td className="p-2">
                            <div>
                              <p className="text-xs font-medium">{expense.description}</p>
                              <p className="text-[10px] text-taviflow-muted">{expense.paymentMethod}</p>
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="flex items-center gap-1.5">
                              <div className="bg-taviflow-primary/10 rounded-full p-1">
                                {getCategoryIcon(expense.category)}
                              </div>
                              <span className="text-xs">{expense.category}</span>
                            </div>
                          </td>
                          <td className="p-2 text-xs font-medium">
                            ${expense.amount.toLocaleString()}
                            {expense.recurring && (
                              <span className="text-[10px] text-taviflow-muted ml-1">(recurring)</span>
                            )}
                          </td>
                          <td className="p-2">
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${getStatusClass(expense.status)}`}>
                              {expense.status}
                            </span>
                          </td>
                          <td className="p-2 text-right">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Trash className="h-3.5 w-3.5" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {currentExpenses.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-sm text-taviflow-muted">No expenses found</p>
                    </div>
                  )}
                </div>
                
                {totalPages > 1 && (
                  <div className="mt-4">
                    <Pagination 
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </div>
            </Tabs>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-sm">Budget vs. Actual</h3>
              <Select defaultValue={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="h-7 text-xs w-28">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-between text-xs mb-2">
              <span>Total Budget: ${totalPlanned.toLocaleString()}</span>
              <span>Spent: ${totalSpent.toLocaleString()} ({Math.round((totalSpent/totalPlanned) * 100)}%)</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div 
                className={`h-2.5 rounded-full ${getProgressColor(totalSpent, totalPlanned)}`} 
                style={{ width: `${calculateUsage(totalSpent, totalPlanned)}%` }}
              ></div>
            </div>
            
            <div className="space-y-3">
              {budgets.map((budget) => (
                <div key={budget.category} className="text-xs">
                  <div className="flex justify-between mb-1">
                    <span>{budget.category}</span>
                    <span>${budget.spent.toLocaleString()} / ${budget.planned.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${getProgressColor(budget.spent, budget.planned)}`} 
                      style={{ width: `${calculateUsage(budget.spent, budget.planned)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass-card p-4">
            <h3 className="font-medium text-sm mb-3">Expense Breakdown</h3>
            <div className="space-y-3">
              {Object.entries(
                expenses.reduce((acc, curr) => {
                  acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
                  return acc;
                }, {} as Record<string, number>)
              ).sort((a, b) => b[1] - a[1]).map(([category, amount]) => {
                const percentage = Math.round((amount / totalExpenses) * 100);
                return (
                  <div key={category} className="text-xs">
                    <div className="flex justify-between mb-1">
                      <span className="flex items-center gap-1.5">
                        <div className="bg-taviflow-primary/10 rounded-full p-1">
                          {getCategoryIcon(category)}
                        </div>
                        {category}
                      </span>
                      <span>${amount.toLocaleString()} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="h-1.5 rounded-full bg-taviflow-primary" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="glass-card p-4">
            <h3 className="font-medium text-sm mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="text-xs justify-start">
                <FileText className="mr-1.5 h-3.5 w-3.5" />
                Expense Report
              </Button>
              <Button variant="outline" size="sm" className="text-xs justify-start">
                <BarChart2 className="mr-1.5 h-3.5 w-3.5" />
                Analytics
              </Button>
              <Button variant="outline" size="sm" className="text-xs justify-start">
                <Receipt className="mr-1.5 h-3.5 w-3.5" />
                Receipts
              </Button>
              <Button variant="outline" size="sm" className="text-xs justify-start">
                <PlusCircle className="mr-1.5 h-3.5 w-3.5" />
                Budget Plan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
