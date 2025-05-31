'use client'

import { useState, useEffect } from "react";
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  ChevronDown, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ArrowRight, 
  Truck, 
  Package, 
  RefreshCw, 
  FileText, 
  Download,
  Eye,
  Printer,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface Order {
  id: string;
  customer: string;
  date: string;
  items: number;
  total: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
}

const initialOrders: Order[] = [
  {
    id: "ORD-5923",
    customer: "John Reynolds",
    date: "May 15, 2023",
    items: 3,
    total: "$145.80",
    status: "Delivered"
  },
  {
    id: "ORD-5922",
    customer: "Sarah Williams",
    date: "May 14, 2023",
    items: 2,
    total: "$89.99",
    status: "Shipped"
  },
  {
    id: "ORD-5921",
    customer: "Michael Clark",
    date: "May 13, 2023",
    items: 5,
    total: "$237.50",
    status: "Processing"
  },
  {
    id: "ORD-5920",
    customer: "Emma Johnson",
    date: "May 12, 2023",
    items: 1,
    total: "$45.00",
    status: "Pending"
  },
  {
    id: "ORD-5919",
    customer: "Robert Davis",
    date: "May 11, 2023",
    items: 2,
    total: "$112.30",
    status: "Cancelled"
  },
  {
    id: "ORD-5918", 
    customer: "Jennifer Martinez",
    date: "May 10, 2023",
    items: 4,
    total: "$189.95",
    status: "Delivered"
  }
];

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [activeTab, setActiveTab] = useState("all-orders");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  
  // Update filtered orders when tab changes
  useEffect(() => {
    if (activeTab !== "all-orders") {
      setStatusFilter(activeTab.charAt(0).toUpperCase() + activeTab.slice(1));
    } else {
      setStatusFilter("");
    }
  }, [activeTab]);
  
  // Apply filters
  const filteredOrders = orders.filter(order => {
    // Apply search term
    const matchesSearch = 
      searchQuery === "" || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
      
    // Apply status filter
    const matchesStatus = 
      statusFilter === "" || 
      order.status.toLowerCase() === statusFilter.toLowerCase();
      
    const matchesTab = 
      activeTab === "all-orders" || 
      order.status.toLowerCase() === activeTab.toLowerCase();
    
    return matchesSearch && (activeTab === "all-orders" || matchesTab);
  });
  
  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, searchQuery, activeTab]);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-taviflow-in-stock/10 text-taviflow-in-stock";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Processing":
        return "bg-purple-100 text-purple-700";
      case "Pending":
        return "bg-taviflow-low-stock/10 text-taviflow-low-stock";
      case "Cancelled":
        return "bg-taviflow-out-stock/10 text-taviflow-out-stock";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="w-3.5 h-3.5" />;
      case "Shipped":
        return <Truck className="w-3.5 h-3.5" />;
      case "Processing":
        return <Package className="w-3.5 h-3.5" />;
      case "Pending":
        return <Clock className="w-3.5 h-3.5" />;
      case "Cancelled":
        return <XCircle className="w-3.5 h-3.5" />;
      default:
        return null;
    }
  };
  
  // Update counts
  const pendingCount = orders.filter(order => order.status === "Pending").length;
  const processingCount = orders.filter(order => order.status === "Processing").length;
  const shippedCount = orders.filter(order => order.status === "Shipped").length;
  const deliveredCount = orders.filter(order => order.status === "Delivered").length;
  
  // Actions
  const handleViewOrder = (order: Order) => {
    toast.info(`Viewing order ${order.id}`, {
      description: `Customer: ${order.customer}, Total: ${order.total}`
    });
  };
  
  const handleViewInvoice = (order: Order) => {
    toast.info(`Viewing invoice for order ${order.id}`);
  };
  
  const handlePrintOrder = (order: Order) => {
    toast.success(`Printing order ${order.id}`);
  };
  
  const handleMoreOptions = (order: Order) => {
    toast.info(`More options for order ${order.id}`, {
      description: "Edit, Cancel, or Contact Customer"
    });
  };
  
  const handleRefresh = () => {
    toast.success("Data refreshed", {
      description: "Latest order information loaded"
    });
  };
  
  const handleSelectDateRange = () => {
    toast.info("Date range selected", {
      description: "Showing orders from the last 30 days"
    });
  };
  
  const handleFilter = () => {
    toast.info("Filters applied");
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold mb-1">Order Management</h1>
        <p className="text-taviflow-muted text-xs">Track, manage, and process customer orders</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="glass-card p-2.5 flex items-center gap-3">
          <div className="bg-taviflow-low-stock/10 rounded-full p-2 flex-shrink-0">
            <Clock className="w-3.5 h-3.5 text-taviflow-low-stock" />
          </div>
          <div>
            <p className="text-[10px] text-taviflow-muted">Pending</p>
            <p className="text-xl font-semibold">{pendingCount}</p>
          </div>
        </div>
        
        <div className="glass-card p-2.5 flex items-center gap-3">
          <div className="bg-purple-100 rounded-full p-2 flex-shrink-0">
            <Package className="w-3.5 h-3.5 text-purple-700" />
          </div>
          <div>
            <p className="text-[10px] text-taviflow-muted">Processing</p>
            <p className="text-xl font-semibold">{processingCount}</p>
          </div>
        </div>
        
        <div className="glass-card p-2.5 flex items-center gap-3">
          <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
            <Truck className="w-3.5 h-3.5 text-blue-700" />
          </div>
          <div>
            <p className="text-[10px] text-taviflow-muted">Shipped</p>
            <p className="text-xl font-semibold">{shippedCount}</p>
          </div>
        </div>
        
        <div className="glass-card p-2.5 flex items-center gap-3">
          <div className="bg-taviflow-in-stock/10 rounded-full p-2 flex-shrink-0">
            <CheckCircle className="w-3.5 h-3.5 text-taviflow-in-stock" />
          </div>
          <div>
            <p className="text-[10px] text-taviflow-muted">Delivered</p>
            <p className="text-xl font-semibold">{deliveredCount}</p>
          </div>
        </div>
      </div>
      
      <div className="glass-card p-0 overflow-hidden">
        <Tabs 
          defaultValue="all-orders" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="border-b border-taviflow-border px-3">
            <TabsList className="flex bg-transparent p-0">
              <TabsTrigger 
                value="all-orders" 
                className="px-3 py-2 text-xs rounded-none border-b-2 data-[state=active]:border-taviflow-primary data-[state=inactive]:border-transparent transition-all"
              >
                All Orders
              </TabsTrigger>
              <TabsTrigger 
                value="pending" 
                className="px-3 py-2 text-xs rounded-none border-b-2 data-[state=active]:border-taviflow-primary data-[state=inactive]:border-transparent transition-all"
              >
                Pending
              </TabsTrigger>
              <TabsTrigger 
                value="processing" 
                className="px-3 py-2 text-xs rounded-none border-b-2 data-[state=active]:border-taviflow-primary data-[state=inactive]:border-transparent transition-all"
              >
                Processing
              </TabsTrigger>
              <TabsTrigger 
                value="shipped" 
                className="px-3 py-2 text-xs rounded-none border-b-2 data-[state=active]:border-taviflow-primary data-[state=inactive]:border-transparent transition-all"
              >
                Shipped
              </TabsTrigger>
              <TabsTrigger 
                value="delivered" 
                className="px-3 py-2 text-xs rounded-none border-b-2 data-[state=active]:border-taviflow-primary data-[state=inactive]:border-transparent transition-all"
              >
                Delivered
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="p-3">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-3">
              <div className="relative max-w-xs">
                <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-taviflow-muted" />
                <Input
                  placeholder="Search orders..."
                  className="pl-7 h-8 text-xs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <div className="relative">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs h-8 px-2 flex items-center gap-1"
                    onClick={handleSelectDateRange}
                  >
                    <Calendar className="h-3 w-3" />
                    <span>Date Range</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="relative">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs h-8 px-2 flex items-center gap-1"
                    onClick={handleFilter}
                  >
                    <Filter className="h-3 w-3" />
                    <span>Filter</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </div>
                
                <Button 
                  size="sm" 
                  className="text-xs h-8 px-2 bg-taviflow-primary text-white"
                  onClick={handleRefresh}
                >
                  <RefreshCw className="mr-1 h-3 w-3" />
                  Refresh
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-taviflow-border">
                    <th className="text-left p-2 font-medium text-[10px]">ORDER ID</th>
                    <th className="text-left p-2 font-medium text-[10px]">CUSTOMER</th>
                    <th className="text-left p-2 font-medium text-[10px]">DATE</th>
                    <th className="text-left p-2 font-medium text-[10px]">ITEMS</th>
                    <th className="text-left p-2 font-medium text-[10px]">TOTAL</th>
                    <th className="text-left p-2 font-medium text-[10px]">STATUS</th>
                    <th className="text-right p-2 font-medium text-[10px]">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-taviflow-border hover:bg-taviflow-secondary/30">
                      <td className="p-2 text-xs font-medium">{order.id}</td>
                      <td className="p-2 text-xs">{order.customer}</td>
                      <td className="p-2 text-xs">{order.date}</td>
                      <td className="p-2 text-xs">{order.items}</td>
                      <td className="p-2 text-xs font-medium">{order.total}</td>
                      <td className="p-2">
                        <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                      </td>
                      <td className="p-2 text-right">
                        <div className="flex justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0"
                            onClick={() => handleViewOrder(order)}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0"
                            onClick={() => handleViewInvoice(order)}
                          >
                            <FileText className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0"
                            onClick={() => handlePrintOrder(order)}
                          >
                            <Printer className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0"
                            onClick={() => handleMoreOptions(order)}
                          >
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {currentOrders.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-xs text-taviflow-muted">No orders found</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center mt-3">
              <p className="text-[10px] text-taviflow-muted">Showing {currentOrders.length} of {filteredOrders.length} orders</p>
              
              <div className="flex items-center gap-1">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 px-2 text-xs"
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <Button 
                      key={i}
                      variant="outline" 
                      size="sm" 
                      className={`h-7 min-w-[28px] px-2 text-xs ${
                        pageNumber === currentPage ? 'bg-taviflow-primary/10' : ''
                      }`}
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 px-2 text-xs"
                  onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="glass-card p-3">
          <h3 className="text-sm font-medium mb-2">Recent Order Activity</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 border-b border-taviflow-border">
              <div className="bg-taviflow-in-stock/10 rounded-full p-1.5 flex-shrink-0">
                <CheckCircle className="w-3 h-3 text-taviflow-in-stock" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium">Order ORD-5923 marked as Delivered</p>
                <p className="text-[10px] text-taviflow-muted">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-2 border-b border-taviflow-border">
              <div className="bg-blue-100 rounded-full p-1.5 flex-shrink-0">
                <Truck className="w-3 h-3 text-blue-700" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium">Order ORD-5922 shipped via FedEx</p>
                <p className="text-[10px] text-taviflow-muted">Yesterday</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-2">
              <div className="bg-taviflow-out-stock/10 rounded-full p-1.5 flex-shrink-0">
                <XCircle className="w-3 h-3 text-taviflow-out-stock" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium">Order ORD-5919 was cancelled</p>
                <p className="text-[10px] text-taviflow-muted">3 days ago</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-3">
          <h3 className="text-sm font-medium mb-2">Order Fulfillment</h3>
          <div className="space-y-2">
            <div className="bg-gray-50 border border-taviflow-border p-2 rounded-md flex items-center justify-between">
              <div>
                <h4 className="text-xs font-medium">Average Fulfillment Time</h4>
                <p className="text-[10px] text-taviflow-muted">Last 30 days</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">2.3 days</p>
                <p className="text-[10px] text-taviflow-in-stock">↓ 0.5 days</p>
              </div>
            </div>
            
            <div className="bg-gray-50 border border-taviflow-border p-2 rounded-md flex items-center justify-between">
              <div>
                <h4 className="text-xs font-medium">Fulfillment Rate</h4>
                <p className="text-[10px] text-taviflow-muted">Orders fulfilled on time</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">94%</p>
                <p className="text-[10px] text-taviflow-in-stock">↑ 2%</p>
              </div>
            </div>
            
            <div className="bg-gray-50 border border-taviflow-border p-2 rounded-md flex items-center justify-between">
              <div>
                <h4 className="text-xs font-medium">Cancellation Rate</h4>
                <p className="text-[10px] text-taviflow-muted">Percentage of cancelled orders</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">3.2%</p>
                <p className="text-[10px] text-taviflow-in-stock">↓ 0.8%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
