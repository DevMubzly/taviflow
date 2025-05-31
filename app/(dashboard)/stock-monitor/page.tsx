'use client'

/**
 * Stock Monitoring Page
 * 
 * This page allows employees and managers to monitor inventory stock levels in real-time.
 * It displays products that are selling quickly, items that are running low on stock,
 * and provides alerts for inventory that needs to be reordered.
 */

import { useState, useEffect } from "react";
import { 
  AlertTriangle, 
  Package, 
  ArrowDownRight, 
  ArrowUpRight, 
  BarChart2, 
  RefreshCw,
  Search,
  Filter,
  ShoppingBag,
  Clock,
  Calendar,
  Download,
  CheckCircle,
  ChevronRight,
  PieChart,
  TrendingDown,
  Bell,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Bar, BarChart } from "recharts";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

interface StockItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  initialStock: number;
  soldToday: number;
  soldWeek: number;
  price: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  supplier: string;
  lastUpdated: string;
  salesVelocity: number; // Items sold per day
  daysUntilOutOfStock: number;
  reorderPoint: number;
}

// Chart data for stock depletion
const stockTrendData = [
  { name: 'Mon', stock: 120 },
  { name: 'Tue', stock: 110 },
  { name: 'Wed', stock: 98 },
  { name: 'Thu', stock: 85 },
  { name: 'Fri', stock: 70 },
  { name: 'Sat', stock: 60 },
  { name: 'Sun', stock: 48 },
];

// Chart data for sales velocity
const velocityData = [
  { name: 'Wireless Mouse', velocity: 8 },
  { name: 'USB-C Cable', velocity: 7 },
  { name: 'Headphones', velocity: 6 },
  { name: 'External SSD', velocity: 4 },
  { name: 'Laptop Stand', velocity: 3 },
];

const StockMonitor = () => {
  const [items, setItems] = useState<StockItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<StockItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [sortBy, setSortBy] = useState<string>("salesVelocity");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  
  // Mock function to load items (replace with actual Supabase fetch later)
  const loadItems = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, you'd fetch this from Supabase
      // const { data, error } = await supabase.from('inventory_items').select('*');
      
      // Mock data for now
      const mockData: StockItem[] = [
        {
          id: "1",
          name: "Wireless Mouse",
          sku: "MS-2023",
          category: "Electronics",
          stock: 45,
          initialStock: 100,
          soldToday: 8,
          soldWeek: 35,
          price: "$29.99",
          status: "In Stock",
          supplier: "ElectroBits Inc.",
          lastUpdated: "2023-05-10",
          salesVelocity: 5,
          daysUntilOutOfStock: 9,
          reorderPoint: 25
        },
        {
          id: "2",
          name: "USB-C Cable",
          sku: "USB-2023",
          category: "Accessories",
          stock: 12,
          initialStock: 50,
          soldToday: 4,
          soldWeek: 28,
          price: "$14.99",
          status: "Low Stock",
          supplier: "Main Warehouse Supply Co.",
          lastUpdated: "2023-05-08",
          salesVelocity: 4,
          daysUntilOutOfStock: 3,
          reorderPoint: 15
        },
        {
          id: "3",
          name: "Keyboard",
          sku: "KB-2023",
          category: "Electronics",
          stock: 0,
          initialStock: 40,
          soldToday: 0,
          soldWeek: 15,
          price: "$59.99",
          status: "Out of Stock",
          supplier: "ElectroBits Inc.",
          lastUpdated: "2023-05-01",
          salesVelocity: 2,
          daysUntilOutOfStock: 0,
          reorderPoint: 10
        },
        {
          id: "4",
          name: "Monitor",
          sku: "MN-2023",
          category: "Electronics",
          stock: 23,
          initialStock: 30,
          soldToday: 1,
          soldWeek: 5,
          price: "$199.99",
          status: "In Stock",
          supplier: "Wholesale Parts Ltd.",
          lastUpdated: "2023-05-12",
          salesVelocity: 0.7,
          daysUntilOutOfStock: 32,
          reorderPoint: 5
        },
        {
          id: "5",
          name: "Laptop Stand",
          sku: "LS-2023",
          category: "Accessories",
          stock: 5,
          initialStock: 25,
          soldToday: 3,
          soldWeek: 18,
          price: "$24.99",
          status: "Low Stock",
          supplier: "Main Warehouse Supply Co.",
          lastUpdated: "2023-05-07",
          salesVelocity: 2.5,
          daysUntilOutOfStock: 2,
          reorderPoint: 8
        },
        {
          id: "6",
          name: "Headphones",
          sku: "HP-2023",
          category: "Audio",
          stock: 34,
          initialStock: 60,
          soldToday: 5,
          soldWeek: 21,
          price: "$79.99",
          status: "In Stock",
          supplier: "Wholesale Parts Ltd.",
          lastUpdated: "2023-05-09",
          salesVelocity: 3,
          daysUntilOutOfStock: 11,
          reorderPoint: 15
        },
        {
          id: "7",
          name: "Webcam",
          sku: "WC-2023",
          category: "Electronics",
          stock: 0,
          initialStock: 30,
          soldToday: 0,
          soldWeek: 12,
          price: "$49.99",
          status: "Out of Stock",
          supplier: "ElectroBits Inc.",
          lastUpdated: "2023-04-28",
          salesVelocity: 1.5,
          daysUntilOutOfStock: 0,
          reorderPoint: 10
        },
        {
          id: "8",
          name: "External SSD",
          sku: "SSD-2023",
          category: "Storage",
          stock: 17,
          initialStock: 40,
          soldToday: 4,
          soldWeek: 19,
          price: "$89.99",
          status: "In Stock",
          supplier: "Wholesale Parts Ltd.",
          lastUpdated: "2023-05-11",
          salesVelocity: 2.7,
          daysUntilOutOfStock: 6,
          reorderPoint: 10
        },
        {
          id: "9",
          name: "Phone Charger",
          sku: "PC-2023",
          category: "Accessories",
          stock: 8,
          initialStock: 50,
          soldToday: 6,
          soldWeek: 32,
          price: "$19.99",
          status: "Low Stock",
          supplier: "Main Warehouse Supply Co.",
          lastUpdated: "2023-05-06",
          salesVelocity: 4.5,
          daysUntilOutOfStock: 2,
          reorderPoint: 15
        },
      ];
      
      setItems(mockData);
      
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error("Error loading items:", error);
      toast.error("Failed to load inventory data");
      setIsLoading(false);
    }
  };
  
  // Initial load
  useEffect(() => {
    loadItems();
  }, []);
  
  // Filter and sort items when dependencies change
  useEffect(() => {
    let result = [...items];
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(term) || 
        item.sku.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
      );
    }
    
    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter(item => item.category === categoryFilter);
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(item => {
        if (statusFilter === "low") return item.status === "Low Stock";
        if (statusFilter === "out") return item.status === "Out of Stock";
        if (statusFilter === "critical") return item.daysUntilOutOfStock <= 3 && item.stock > 0;
        if (statusFilter === "needs-reorder") return item.stock <= item.reorderPoint;
        return true;
      });
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "stock":
          comparison = a.stock - b.stock;
          break;
        case "salesVelocity":
          comparison = a.salesVelocity - b.salesVelocity;
          break;
        case "daysUntilOutOfStock":
          // Handle "Out of Stock" items specially
          if (a.stock === 0 && b.stock === 0) comparison = 0;
          else if (a.stock === 0) comparison = -1;
          else if (b.stock === 0) comparison = 1;
          else comparison = a.daysUntilOutOfStock - b.daysUntilOutOfStock;
          break;
        default:
          comparison = 0;
      }
      
      return sortDirection === "asc" ? comparison : -comparison;
    });
    
    setFilteredItems(result);
  }, [items, searchTerm, categoryFilter, statusFilter, sortBy, sortDirection]);
  
  const handleRefresh = () => {
    toast.info("Refreshing inventory data...");
    loadItems();
  };
  
  const handleOrder = (itemId: string) => {
    // Find the item
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    
    toast.success(`Order placed for ${item.name}`);
  };
  
  const handleExportReport = () => {
    toast.success("Report exported successfully");
  };
  
  // Get unique categories from items
  const categories = ["all", ...Array.from(new Set(items.map(item => item.category)))];
  
  // Summary counts
  const lowStockCount = items.filter(item => item.status === "Low Stock").length;
  const outOfStockCount = items.filter(item => item.status === "Out of Stock").length;
  const criticalStockCount = items.filter(item => item.daysUntilOutOfStock <= 3 && item.stock > 0).length;
  
  // Get status class for badge styling
  const getStatusClass = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800";
      case "Low Stock":
        return "bg-amber-100 text-amber-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  // Get days until out of stock display
  const getDaysDisplay = (item: StockItem) => {
    if (item.stock === 0) return "Out of stock";
    if (item.salesVelocity === 0) return "∞";
    if (item.daysUntilOutOfStock <= 3) return `${item.daysUntilOutOfStock} days (Critical)`;
    return `${item.daysUntilOutOfStock} days`;
  };
  
  return (
    <div className="space-y-4">
      {/* Summary stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 flex items-center gap-3 animate-fade-in">
          <div className="w-12 h-12 rounded-lg bg-taviflow-primary/10 text-taviflow-primary flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-taviflow-muted text-xs font-medium">Stock Monitoring</h3>
            <p className="text-lg font-bold">{items.length} Products</p>
          </div>
        </div>
        
        <div className="glass-card p-4 flex items-center gap-3 animate-fade-in">
          <div className="w-12 h-12 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-taviflow-muted text-xs font-medium">Low Stock</h3>
            <p className="text-lg font-bold">{lowStockCount} Products</p>
          </div>
        </div>
        
        <div className="glass-card p-4 flex items-center gap-3 animate-fade-in">
          <div className="w-12 h-12 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-taviflow-muted text-xs font-medium">Out of Stock</h3>
            <p className="text-lg font-bold">{outOfStockCount} Products</p>
          </div>
        </div>
        
        <div className="glass-card p-4 flex items-center gap-3 animate-fade-in">
          <div className="w-12 h-12 rounded-lg bg-taviflow-accent/10 text-taviflow-accent flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-taviflow-muted text-xs font-medium">Critical (≤3 days)</h3>
            <p className="text-lg font-bold">{criticalStockCount} Products</p>
          </div>
        </div>
      </div>
      
      {/* Date selection and actions */}
      <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between">
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="text-xs h-9 flex items-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                {date ? format(date, 'PPP') : 'Select date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <Button 
            variant="outline" 
            className="text-xs h-9" 
            onClick={handleRefresh}
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1" />
            Refresh
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="text-xs h-9" 
            onClick={handleExportReport}
          >
            <Download className="w-3.5 h-3.5 mr-1" />
            Export
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="text-xs h-9 bg-taviflow-primary hover:bg-taviflow-primary/90">
                <FileText className="w-3.5 h-3.5 mr-1" />
                Generate Report
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Generate Stock Report</DialogTitle>
                <DialogDescription>
                  Create a detailed inventory report with stock levels, sales velocity, and reorder recommendations.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Report Type</label>
                  <Select defaultValue="comprehensive">
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comprehensive">Comprehensive Stock Report</SelectItem>
                      <SelectItem value="low-stock">Low Stock Alert Report</SelectItem>
                      <SelectItem value="sales-velocity">Sales Velocity Report</SelectItem>
                      <SelectItem value="reorder">Reorder Recommendations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time Period</label>
                  <Select defaultValue="last-30">
                    <SelectTrigger>
                      <SelectValue placeholder="Select time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last-7">Last 7 Days</SelectItem>
                      <SelectItem value="last-30">Last 30 Days</SelectItem>
                      <SelectItem value="last-90">Last Quarter</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Format</label>
                  <Select defaultValue="pdf">
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                      <SelectItem value="csv">CSV File</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button onClick={() => toast.success("Report generation started. You'll be notified when it's ready.")}>
                  Generate Report
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Main content tabs */}
      <Tabs defaultValue="monitor">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="monitor">Stock Monitor</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>
        
        {/* Stock Monitor Tab */}
        <TabsContent value="monitor">
          <div className="glass-card p-4 mb-4">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-taviflow-muted h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search products by name, SKU or category..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Select 
                  value={categoryFilter} 
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.filter(c => c !== "all").map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select 
                  value={statusFilter} 
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="low">Low Stock</SelectItem>
                    <SelectItem value="out">Out of Stock</SelectItem>
                    <SelectItem value="critical">Critical (≤3 days)</SelectItem>
                    <SelectItem value="needs-reorder">Needs Reorder</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select 
                  value={sortBy} 
                  onValueChange={setSortBy}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salesVelocity">Sales Velocity</SelectItem>
                    <SelectItem value="daysUntilOutOfStock">Days Until Empty</SelectItem>
                    <SelectItem value="stock">Current Stock</SelectItem>
                    <SelectItem value="name">Product Name</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
                >
                  {sortDirection === "asc" ? 
                    <ArrowUpRight className="h-4 w-4" /> : 
                    <ArrowDownRight className="h-4 w-4" />
                  }
                </Button>
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center gap-2">
                  <RefreshCw className="w-8 h-8 text-taviflow-primary animate-spin" />
                  <p className="text-sm text-taviflow-muted mt-2">Loading inventory data...</p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-taviflow-background">
                      <th className="px-4 py-2 text-left text-xs font-medium text-taviflow-muted">Product</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-taviflow-muted">Category</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-taviflow-muted">Current Stock</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-taviflow-muted">Status</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-taviflow-muted">
                        <div className="flex items-center">
                          <span>Sales Velocity</span>
                          <div className="ml-1 tooltip text-xs" data-tip="Items sold per day">
                            <div className="w-4 h-4 rounded-full bg-taviflow-muted/20 flex items-center justify-center">
                              <span className="text-taviflow-muted text-xs">?</span>
                            </div>
                          </div>
                        </div>
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-taviflow-muted">Days Until Empty</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-taviflow-muted">Reorder Point</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-taviflow-muted">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-4 py-8 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <Package className="w-8 h-8 text-taviflow-muted/50" />
                            <p>No products found</p>
                            <p className="text-sm text-taviflow-muted">Try adjusting your filters</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredItems.map((item, index) => (
                        <tr 
                          key={item.id} 
                          className="border-t border-taviflow-border hover:bg-taviflow-background/40 animate-fade-in" 
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded bg-taviflow-primary/10 flex items-center justify-center">
                                <Package className="w-4 h-4 text-taviflow-primary" />
                              </div>
                              <div>
                                <p className="font-medium text-sm">{item.name}</p>
                                <p className="text-xs text-taviflow-muted">{item.sku}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">{item.category}</td>
                          <td className="px-4 py-3">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium">{item.stock}</span>
                              <div className="w-24 h-1.5 bg-gray-100 rounded-full mt-1">
                                <div 
                                  className={`h-1.5 rounded-full ${
                                    item.stock === 0 ? 'bg-red-500' : 
                                    item.stock <= item.reorderPoint ? 'bg-amber-500' : 
                                    'bg-green-500'
                                  }`}
                                  style={{ width: `${Math.min(100, Math.max(0, (item.stock / item.initialStock) * 100))}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(item.status)}`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-medium">{item.salesVelocity.toFixed(1)}</span>
                              <span className="text-xs text-taviflow-muted">items/day</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className={`text-sm ${
                              item.stock === 0 ? 'text-red-600 font-medium' : 
                              item.daysUntilOutOfStock <= 3 ? 'text-amber-600 font-medium' : 
                              'text-taviflow-muted'
                            }`}>
                              {getDaysDisplay(item)}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <span className="text-sm">{item.reorderPoint}</span>
                              {item.stock <= item.reorderPoint && (
                                <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-sm">
                                  Reorder
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs h-7"
                              disabled={item.stock > item.reorderPoint}
                              onClick={() => handleOrder(item.id)}
                            >
                              Order Now
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          {/* Stock Depletion Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="glass-card p-4">
              <h3 className="text-sm font-medium mb-4">Stock Depletion Trend</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stockTrendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EAEAEA" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }} 
                      tickLine={false}
                      axisLine={{ stroke: '#EAEAEA' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }} 
                      tickLine={false} 
                      axisLine={{ stroke: '#EAEAEA' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #EAEAEA',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="stock" 
                      stroke="#7c3aed" 
                      strokeWidth={2} 
                      dot={{ r: 4, strokeWidth: 2 }} 
                      activeDot={{ r: 6 }} 
                      name="Stock Level"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Sales Velocity Chart */}
            <div className="glass-card p-4">
              <h3 className="text-sm font-medium mb-4">Product Sales Velocity</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={velocityData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EAEAEA" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 11 }} 
                      tickLine={false}
                      axisLine={{ stroke: '#EAEAEA' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }} 
                      tickLine={false} 
                      axisLine={{ stroke: '#EAEAEA' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #EAEAEA',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }} 
                    />
                    <Bar 
                      dataKey="velocity" 
                      fill="#7c3aed" 
                      radius={[4, 4, 0, 0]}
                      name="Sales Velocity (items/day)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="glass-card p-4 mb-4">
            <h3 className="text-sm font-medium mb-4">Inventory Performance Analytics</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="p-4 border border-taviflow-border rounded-lg bg-white">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xs text-taviflow-muted">Average Sales Velocity</p>
                    <p className="text-xl font-bold">2.7</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                    <TrendingDown className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs text-green-600">+5% from last week</p>
              </div>
              
              <div className="p-4 border border-taviflow-border rounded-lg bg-white">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xs text-taviflow-muted">Inventory Turnover</p>
                    <p className="text-xl font-bold">4.2</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs text-green-600">+2.1% from last month</p>
              </div>
              
              <div className="p-4 border border-taviflow-border rounded-lg bg-white">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xs text-taviflow-muted">Stock Coverage</p>
                    <p className="text-xl font-bold">15.3 days</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs text-red-600">-3.5% from last month</p>
              </div>
              
              <div className="p-4 border border-taviflow-border rounded-lg bg-white">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xs text-taviflow-muted">Reorder Rate</p>
                    <p className="text-xl font-bold">18%</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                    <PieChart className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs text-amber-600">Same as last week</p>
              </div>
            </div>
            
            <div className="border border-taviflow-border rounded-lg overflow-hidden">
              <div className="bg-taviflow-background p-3 border-b border-taviflow-border">
                <h4 className="font-medium">Inventory Health Score</h4>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full border-4 border-purple-500 flex items-center justify-center">
                    <span className="text-xl font-bold">76%</span>
                  </div>
                  <div>
                    <h5 className="font-medium">Good</h5>
                    <p className="text-sm text-taviflow-muted">Your inventory is generally well-managed</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Stock Levels</span>
                      <span className="font-medium">82%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: "82%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Reorder Timing</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-amber-500 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Inventory Turnover</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-blue-500 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Alerts Tab */}
        <TabsContent value="alerts">
          <div className="glass-card p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium">Stock Alerts & Notifications</h3>
              <Button variant="outline" size="sm" className="text-xs h-8">
                <Bell className="w-3.5 h-3.5 mr-1" />
                Configure Alerts
              </Button>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="p-3 border-l-4 border-red-500 bg-red-50 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-800">Critical: 3 Products Out of Stock</p>
                    <p className="text-sm text-red-700 mt-1">
                      Keyboard, Webcam and Mouse Pad are currently out of stock and may be affecting sales. Consider restocking immediately.
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm" className="h-7 text-xs border-red-200 text-red-700 hover:bg-red-50">
                        View Products
                      </Button>
                      <Button size="sm" className="h-7 text-xs bg-red-600 hover:bg-red-700">
                        Place Order
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 border-l-4 border-amber-500 bg-amber-50 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800">Warning: USB-C Cable Will Be Out of Stock in 3 Days</p>
                    <p className="text-sm text-amber-700 mt-1">
                      Based on current sales velocity, USB-C Cable (SKU: USB-2023) will be out of stock in approximately 3 days.
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm" className="h-7 text-xs border-amber-200 text-amber-700 hover:bg-amber-50">
                        View Details
                      </Button>
                      <Button size="sm" className="h-7 text-xs bg-amber-600 hover:bg-amber-700">
                        Place Order
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <RefreshCw className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-purple-800">Reorder: 4 Products Below Reorder Point</p>
                    <p className="text-sm text-purple-700 mt-1">
                      Phone Charger, Laptop Stand, USB-C Cable, and External SSD are below their reorder points and should be restocked.
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm" className="h-7 text-xs border-purple-200 text-purple-700 hover:bg-purple-50">
                        View List
                      </Button>
                      <Button size="sm" className="h-7 text-xs bg-purple-600 hover:bg-purple-700">
                        Generate PO
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border border-taviflow-border rounded-lg overflow-hidden">
              <div className="bg-taviflow-background p-3 flex justify-between items-center border-b border-taviflow-border">
                <h4 className="font-medium">Recent Activity</h4>
                <Button variant="ghost" size="sm" className="h-8 text-xs">View All</Button>
              </div>
              <div className="divide-y divide-taviflow-border">
                <div className="p-3 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm">Order placed for <span className="font-medium">Wireless Mouse</span> (20 units)</p>
                    <p className="text-xs text-taviflow-muted mt-1">Just now</p>
                  </div>
                </div>
                
                <div className="p-3 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm"><span className="font-medium">USB-C Cable</span> reached low stock threshold</p>
                    <p className="text-xs text-taviflow-muted mt-1">2 hours ago</p>
                  </div>
                </div>
                
                <div className="p-3 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm">Shipment received: <span className="font-medium">Keyboards</span> (15 units)</p>
                    <p className="text-xs text-taviflow-muted mt-1">Yesterday</p>
                  </div>
                </div>
                
                <div className="p-3 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm">Stock report generated for <span className="font-medium">Q2 2023</span></p>
                    <p className="text-xs text-taviflow-muted mt-1">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StockMonitor;
