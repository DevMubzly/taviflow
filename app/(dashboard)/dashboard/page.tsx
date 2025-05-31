'use client'
import { Package, AlertTriangle, TrendingUp, Truck, ShoppingCart, Users, DollarSign, Filter, Plus, Edit3, Calendar, Shield } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import StockChart from "@/components/charts/StockChart";
import SalesChart from "@/components/charts/SalesChart";
import MarketShareChart from "@/components/charts/MarketShareChart";
import InventoryTable from "@/components/dashboard/InventoryTable";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from 'next/navigation'
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format, subDays } from "date-fns";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle, Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const stockData = [
  { name: "Jan", inStock: 400, lowStock: 240 },
  { name: "Feb", inStock: 300, lowStock: 139 },
  { name: "Mar", inStock: 200, lowStock: 980 },
  { name: "Apr", inStock: 278, lowStock: 390 },
  { name: "May", inStock: 189, lowStock: 480 },
  { name: "Jun", inStock: 239, lowStock: 380 },
  { name: "Jul", inStock: 349, lowStock: 430 },
];

const salesData = [
  { name: "Jan", sales: 4000, orders: 240 },
  { name: "Feb", sales: 3000, orders: 198 },
  { name: "Mar", sales: 2000, orders: 980 },
  { name: "Apr", sales: 2780, orders: 390 },
  { name: "May", sales: 1890, orders: 480 },
  { name: "Jun", sales: 2390, orders: 380 },
  { name: "Jul", sales: 3490, orders: 430 },
];

const inventoryItems = [
  {
    id: "1",
    name: "Wireless Mouse",
    sku: "MS-2023",
    category: "Electronics",
    stock: 45,
    price: "$29.99",
    status: "In Stock" as const,
  },
  {
    id: "2",
    name: "USB-C Cable",
    sku: "USB-2023",
    category: "Accessories",
    stock: 12,
    price: "$14.99",
    status: "Low Stock" as const,
  },
  {
    id: "3",
    name: "Keyboard",
    sku: "KB-2023",
    category: "Electronics",
    stock: 0,
    price: "$59.99",
    status: "Out of Stock" as const,
  },
];

const recentActivities = [
  {
    id: "1",
    user: {
      name: "John Doe",
      avatar: "",
    },
    action: "Updated Stock",
    item: "Office Chairs",
    time: "2 hours ago",
    status: "Completed" as const,
  },
  {
    id: "2",
    user: {
      name: "Sarah Smith",
      avatar: "",
    },
    action: "Added Items",
    item: "Desk Lamps",
    time: "3 hours ago",
    status: "Pending" as const,
  },
  {
    id: "3",
    user: {
      name: "Mike Johnson",
      avatar: "",
    },
    action: "Removed Items",
    item: "Keyboards",
    time: "5 hours ago",
    status: "Completed" as const,
  },
];

const employeeRequests = [
  {
    id: "001",
    employeeName: "John Doe",
    requestDate: "2023-10-01",
    reason: "Annual Leave",
    details: "Requesting 5 days off for family vacation",
    status: "Pending" as const,
  },
  {
    id: "002",
    employeeName: "Jane Smith",
    requestDate: "2023-10-03",
    reason: "Overtime",
    details: "Extra hours worked on weekend project",
    status: "Pending" as const,
  },
  {
    id: "003",
    employeeName: "Michael Johnson",
    requestDate: "2023-10-02",
    reason: "Sick Leave",
    details: "Doctor's appointment and recovery",
    status: "Approved" as const,
  },
  {
    id: "004",
    employeeName: "Emily Brown",
    requestDate: "2023-10-05",
    reason: "Vacation",
    details: "Pre-planned vacation time",
    status: "Rejected" as const,
  },
];

const marketShareData = [
  { name: "Product A", value: 40, color: "#8B5CF6" }, // Vivid Purple
  { name: "Product B", value: 30, color: "#0EA5E9" }, // Ocean Blue
  { name: "Product C", value: 20, color: "#10B981" }, // Emerald Green
  { name: "Others", value: 10, color: "#F97316" }     // Bright Orange
];

const Dashboard = () => {
  const [showAdminContent, setShowAdminContent] = useState(true);
  const [showEmployeeContent, setShowEmployeeContent] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [requests, setRequests] = useState(employeeRequests);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(new Date(), 30),
    to: new Date()
  });
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: 'all',
    status: 'all',
    dateRange: '30days'
  });
  
  const router = useRouter();

  // Navigation handlers
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  // Action handlers
  const handleSelectDate = () => {
    toast.info(`Date range selected: ${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`, {
      description: "Dashboard updated with selected date range data"
    });
  };

  const handleFilter = () => {
    setFilterDialogOpen(true);
  };

  const applyFilters = () => {
    setFilterDialogOpen(false);
    toast.info("Filters applied", {
      description: `Showing ${selectedFilters.category} items with ${selectedFilters.status} status for the last ${selectedFilters.dateRange}`
    });
  };

  const handleNewReport = () => {
    router.push("/reports");
    toast.success("Navigated to Reports section", {
      description: "Create a new report here"
    });
  };

  const handleApproveRequest = (requestId: string) => {
    // Update local state
    setRequests(prevRequests => 
      prevRequests.map(req => 
        req.id === requestId 
          ? { ...req, status: "Approved" as const } 
          : req
      )
    );
    
    // In a real app, this would update the database
    toast.success(`Request ${requestId} approved successfully`, {
      description: "The employee has been notified"
    });
  };

  const handleRejectRequest = (requestId: string) => {
    // Update local state
    setRequests(prevRequests => 
      prevRequests.map(req => 
        req.id === requestId 
          ? { ...req, status: "Rejected" as const } 
          : req
      )
    );
    
    // In a real app, this would update the database
    toast.error(`Request ${requestId} rejected`, {
      description: "The employee has been notified"
    });
  };

  const handleViewRequest = (requestId: string) => {
    router.push(`/requests/${requestId}`);
    toast.info(`Viewing details for request ${requestId}`);
  };

  const handleNewRequest = () => {
    router.push("/requests/new");
    toast.info("Creating new request", {
      description: "Please fill in the request details"
    });
  };

  const handleViewAllRequests = () => {
    router.push("/requests");
  };

  const handleStatusChange = (requestId: string, newStatus: "Pending" | "Approved" | "Rejected") => {
    setRequests(prevRequests => 
      prevRequests.map(req => 
        req.id === requestId 
          ? { ...req, status: newStatus } 
          : req
      )
    );
    
    if (newStatus === "Approved") {
      toast.success(`Request ${requestId} approved`);
    } else if (newStatus === "Rejected") {
      toast.error(`Request ${requestId} rejected`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Inventory Management</h1>
          <p className="text-taviflow-muted">Welcome back, John Smith. Here's what's happening today.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 mt-4 md:mt-0">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 text-xs sm:text-sm w-full sm:w-auto"
              >
                <Calendar className="w-4 h-4" />
                <span>Select Date</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <div className="p-3">
                <h3 className="font-medium text-sm mb-2">Select Date Range</h3>
                <CalendarComponent
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={{
                    from: dateRange.from,
                    to: dateRange.to,
                  }}
                  onSelect={(range) => {
                    if (range?.from && range?.to) {
                      setDateRange({ from: range.from, to: range.to });
                    }
                  }}
                  numberOfMonths={1}
                />
                <div className="flex justify-end mt-2">
                  <Button 
                    size="sm" 
                    className="text-xs" 
                    onClick={handleSelectDate}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 text-xs sm:text-sm w-full sm:w-auto"
                onClick={handleFilter}
              >
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Filter Dashboard</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <select 
                    id="category" 
                    className="col-span-3 h-9 rounded-md border border-input px-3 py-1 text-sm"
                    value={selectedFilters.category}
                    onChange={(e) => setSelectedFilters({...selectedFilters, category: e.target.value})}
                  >
                    <option value="all">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="accessories">Accessories</option>
                    <option value="furniture">Furniture</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <select 
                    id="status" 
                    className="col-span-3 h-9 rounded-md border border-input px-3 py-1 text-sm"
                    value={selectedFilters.status}
                    onChange={(e) => setSelectedFilters({...selectedFilters, status: e.target.value})}
                  >
                    <option value="all">All Statuses</option>
                    <option value="in-stock">In Stock</option>
                    <option value="low-stock">Low Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date-range" className="text-right">
                    Date Range
                  </Label>
                  <select 
                    id="date-range" 
                    className="col-span-3 h-9 rounded-md border border-input px-3 py-1 text-sm"
                    value={selectedFilters.dateRange}
                    onChange={(e) => setSelectedFilters({...selectedFilters, dateRange: e.target.value})}
                  >
                    <option value="7days">Last 7 days</option>
                    <option value="30days">Last 30 days</option>
                    <option value="90days">Last 90 days</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setFilterDialogOpen(false)}>Cancel</Button>
                <Button onClick={applyFilters}>Apply Filters</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button 
            className="primary-button flex items-center gap-2 text-xs sm:text-sm w-full sm:w-auto"
            onClick={handleNewReport}
          >
            <Plus className="w-4 h-4" />
            <span>New Report</span>
          </Button>
        </div>
      </div>
      
      {/* Mobile Tabs - Only visible on small screens */}
      <div className="md:hidden mb-4">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full mb-2">
            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
            <TabsTrigger value="employee" className="flex-1">Employee</TabsTrigger>
            <TabsTrigger value="admin" className="flex-1">Admin</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Main Content - Responsive Layout */}
      <div className={`mobile-grid ${activeTab !== "overview" && "md:hidden hidden"}`}>
        <StatCard
          title="Total Stock Items"
          value="1,234"
          description="86 low stock alerts"
          icon={<Package className="w-5 h-5" />}
          trend={12.5}
          trendLabel="from last month"
          className="mobile-card"
        />
        
        <StatCard
          title="Low Stock Alerts"
          value="28"
          description="4 require attention"
          icon={<AlertTriangle className="w-5 h-5" />}
          trend={5.8}
          trendLabel="from last month"
          className="mobile-card"
        />
        
        <StatCard
          title="Monthly Revenue"
          value="$45,678"
          description="This month"
          icon={<DollarSign className="w-5 h-5" />}
          trend={15}
          trendLabel="from last month"
          className="mobile-card"
        />
        
        <StatCard
          title="Active Users"
          value="24"
          description="Employees"
          icon={<Users className="w-5 h-5" />}
          trend={2.3}
          trendLabel="from last month"
          className="mobile-card"
        />
      </div>
      
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${activeTab !== "overview" && "md:hidden hidden"}`}>
        <StockChart data={stockData} title="Stock Trends" />
        <SalesChart data={salesData} title="Sales Performance" />
      </div>
      
      {showAdminContent && (activeTab === "admin" || activeTab === "overview" || !activeTab.length) && (
        <div className="glass-card p-0 overflow-hidden animate-fade-in">
          <div className="flex justify-between items-center p-4 border-b border-taviflow-border bg-gradient-to-r from-purple-700/10 to-purple-900/10">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-taviflow-primary" />
              <h3 className="font-medium">Admin Features</h3>
            </div>
            <Button 
              variant="ghost" 
              className="text-sm"
              onClick={() => setShowAdminContent(!showAdminContent)}
            >
              {showAdminContent ? "Hide" : "Show"}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            <div className="h-auto flex flex-col">
              <MarketShareChart 
                data={marketShareData} 
                title="Market Share Analysis"
              />
            </div>
            
            <div className="glass-card p-4 flex flex-col gap-4">
              <h4 className="font-medium">User Management</h4>
              <div className="flex items-center justify-between text-sm">
                <span>Total Users</span>
                <span className="font-semibold">24</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Admins</span>
                <span className="font-semibold">4</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Employees</span>
                <span className="font-semibold">20</span>
              </div>
              <Button 
                variant="outline" 
                className="text-sm mt-auto"
                onClick={() => handleNavigation('/users')}
              >
                Manage Users
              </Button>
            </div>
            
            <div className="glass-card p-4 flex flex-col gap-4">
              <h4 className="font-medium">System Status</h4>
              <div className="flex items-center justify-between text-sm">
                <span>Database</span>
                <span className="text-taviflow-in-stock font-medium">Online</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>API Services</span>
                <span className="text-taviflow-in-stock font-medium">Active</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Last Backup</span>
                <span className="font-medium">2 hours ago</span>
              </div>
              <Button 
                variant="outline" 
                className="text-sm mt-auto"
                onClick={() => handleNavigation('/database')}
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {showEmployeeContent && (activeTab === "employee" || activeTab === "overview" || !activeTab.length) && (
        <div className="glass-card p-0 overflow-hidden animate-fade-in">
          <div className="flex justify-between items-center p-4 border-b border-taviflow-border bg-gradient-to-r from-purple-700/10 to-purple-900/10">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-taviflow-primary" />
              <h3 className="font-medium">Employee Requests</h3>
            </div>
            <Button 
              variant="ghost" 
              className="text-sm"
              onClick={() => setShowEmployeeContent(!showEmployeeContent)}
            >
              {showEmployeeContent ? "Hide" : "Show"}
            </Button>
          </div>
          
          <div className="mobile-data-container">
            <table className="data-table mobile-data-table">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Employee Name</th>
                  <th>Request Date</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id} className="animate-fade-in">
                    <td>{request.id}</td>
                    <td>{request.employeeName}</td>
                    <td>{request.requestDate}</td>
                    <td>{request.reason}</td>
                    <td>
                      <select 
                        className={`p-1 rounded text-sm ${
                          request.status === 'Approved' ? 'text-taviflow-in-stock' : 
                          request.status === 'Rejected' ? 'text-taviflow-out-stock' : 
                          'text-taviflow-low-stock'
                        }`}
                        value={request.status}
                        onChange={(e) => handleStatusChange(
                          request.id, 
                          e.target.value as "Pending" | "Approved" | "Rejected"
                        )}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 px-3 text-xs bg-taviflow-in-stock text-white"
                          onClick={() => request.status === 'Pending' 
                            ? handleApproveRequest(request.id) 
                            : handleViewRequest(request.id)
                          }
                        >
                          {request.status === 'Pending' ? 'Approve' : 'View'}
                        </Button>
                        {request.status === 'Pending' && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 px-3 text-xs bg-taviflow-out-stock text-white"
                            onClick={() => handleRejectRequest(request.id)}
                          >
                            Reject
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-taviflow-border flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-center">
            <Button 
              variant="outline" 
              className="text-sm w-full sm:w-auto"
              onClick={handleNewRequest}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Request
            </Button>
            <Button 
              variant="outline" 
              className="text-sm w-full sm:w-auto"
              onClick={handleViewAllRequests}
            >
              View All Requests
            </Button>
          </div>
        </div>
      )}
      
      <div className={`grid grid-cols-1 gap-6 ${activeTab !== "overview" && "md:hidden hidden"}`}>
        <InventoryTable items={inventoryItems} />
        <RecentActivity activities={recentActivities} />
      </div>
    </div>
  );
};

export default Dashboard;
