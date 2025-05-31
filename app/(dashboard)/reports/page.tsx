'use client'

import { useState } from "react";
import { 
  BarChart, 
  PieChart, 
  LineChart, 
  Calendar, 
  Filter, 
  Download, 
  Save, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  Edit, 
  Share2, 
  Plus,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

interface MetricOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
}

interface ReportTemplate {
  id: string;
  name: string;
  type: string;
  lastRun: string;
  frequency: string;
}

const Reports = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [reportName, setReportName] = useState("");
  const [dataSource, setDataSource] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [categories, setCategories] = useState("");
  
  const [metrics, setMetrics] = useState<MetricOption[]>([
    {
      id: "sales_revenue",
      name: "Sales Revenue",
      description: "Total revenue from all sales",
      icon: <DollarSign className="w-4 h-4 text-pink-500" />,
      enabled: false
    },
    {
      id: "order_count",
      name: "Order Count",
      description: "Number of orders processed",
      icon: <ShoppingCart className="w-4 h-4 text-pink-500" />,
      enabled: false
    },
    {
      id: "inventory_turnover",
      name: "Inventory Turnover",
      description: "Rate of inventory sales",
      icon: <Package className="w-4 h-4 text-pink-500" />,
      enabled: false
    },
    {
      id: "average_order",
      name: "Average Order Value",
      description: "Average amount spent per order",
      icon: <DollarSign className="w-4 h-4 text-pink-500" />,
      enabled: false
    },
    {
      id: "top_products",
      name: "Top Products",
      description: "Best selling products by volume",
      icon: <Package className="w-4 h-4 text-pink-500" />,
      enabled: false
    }
  ]);

  const toggleMetric = (id: string) => {
    setMetrics(metrics.map(metric => 
      metric.id === id ? { ...metric, enabled: !metric.enabled } : metric
    ));
  };
  
  const savedReports = [
    {
      id: "1",
      name: "Monthly Sales Summary",
      description: "Overview of sales performance for the current month",
      lastRun: "Today",
      type: "Sales",
      chart: "bar"
    },
    {
      id: "2",
      name: "Inventory Status Report",
      description: "Current stock levels and reorder recommendations",
      lastRun: "Yesterday",
      type: "Inventory",
      chart: "pie"
    },
    {
      id: "3",
      name: "Customer Purchase Analysis",
      description: "Analysis of customer buying patterns",
      lastRun: "Last week",
      type: "Sales",
      chart: "line"
    }
  ];
  
  const reportTemplates: ReportTemplate[] = [
    {
      id: "t1",
      name: "Monthly Sales Report",
      type: "Sales",
      lastRun: "05/15/2023",
      frequency: "Monthly"
    },
    {
      id: "t2",
      name: "Inventory Status",
      type: "Inventory",
      lastRun: "05/01/2023",
      frequency: "Weekly"
    },
    {
      id: "t3",
      name: "Customer Insights",
      type: "Customer",
      lastRun: "04/30/2023",
      frequency: "Monthly"
    },
    {
      id: "t4",
      name: "Product Performance",
      type: "Product",
      lastRun: "04/28/2023",
      frequency: "Quarterly"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
        <div>
          <div className="flex items-center gap-1 text-taviflow-muted text-xs mb-1">
            <span>Reports</span>
            <ChevronRight className="h-3 w-3" />
            <span>Custom Reports</span>
          </div>
          <h1 className="text-xl font-semibold">Reports Dashboard</h1>
          <p className="text-taviflow-muted text-xs">Generate and manage custom reports for your business</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button className="primary-button flex items-center gap-1 text-xs h-8 px-3">
            <Plus className="w-3.5 h-3.5" />
            New Report
          </Button>
          <Button variant="outline" className="flex items-center gap-1 text-xs h-8 px-3">
            <Download className="w-3.5 h-3.5" />
            Export
          </Button>
          <Button variant="outline" className="flex items-center gap-1 text-xs h-8 px-3">
            <Filter className="w-3.5 h-3.5" />
            Filter
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
          <div className="border-b border-taviflow-border">
            <TabsList className="flex bg-transparent p-0">
              <TabsTrigger 
                value="overview" 
                className={`flex-1 py-3 text-xs rounded-none border-b-2 data-[state=active]:border-taviflow-primary data-[state=inactive]:border-transparent transition-all`}
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="sales" 
                className={`flex-1 py-3 text-xs rounded-none border-b-2 data-[state=active]:border-taviflow-primary data-[state=inactive]:border-transparent transition-all`}
              >
                Sales
              </TabsTrigger>
              <TabsTrigger 
                value="inventory" 
                className={`flex-1 py-3 text-xs rounded-none border-b-2 data-[state=active]:border-taviflow-primary data-[state=inactive]:border-transparent transition-all`}
              >
                Inventory
              </TabsTrigger>
              <TabsTrigger 
                value="custom" 
                className={`flex-1 py-3 text-xs rounded-none border-b-2 data-[state=active]:border-taviflow-primary data-[state=inactive]:border-transparent transition-all`}
              >
                Custom Reports
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="overview" className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="glass-card p-3">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-sm">Recent Reports</h3>
                  <Button variant="ghost" size="sm" className="text-xs text-taviflow-primary h-7 px-2">View All</Button>
                </div>
                
                <div className="space-y-3">
                  {savedReports.map((report) => (
                    <div key={report.id} className="flex items-start gap-2 hover:bg-taviflow-primary/5 p-2 rounded-md transition-colors">
                      <div className="bg-taviflow-primary/10 rounded-md p-1.5 mt-0.5">
                        {report.chart === "bar" && <BarChart className="w-3.5 h-3.5 text-taviflow-primary" />}
                        {report.chart === "pie" && <PieChart className="w-3.5 h-3.5 text-taviflow-primary" />}
                        {report.chart === "line" && <LineChart className="w-3.5 h-3.5 text-taviflow-primary" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-xs">{report.name}</h4>
                        <p className="text-[10px] text-taviflow-muted">{report.description}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[10px] text-taviflow-muted">Last run: {report.lastRun}</span>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Download className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Share2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="glass-card p-3">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-sm">Report Templates</h3>
                  <Button variant="ghost" size="sm" className="text-xs text-taviflow-primary h-7 px-2">Manage</Button>
                </div>
                
                <div className="space-y-2">
                  {reportTemplates.map((template) => (
                    <div key={template.id} className="flex items-center justify-between p-2 hover:bg-taviflow-primary/5 rounded-md transition-colors">
                      <div>
                        <h4 className="font-medium text-xs">{template.name}</h4>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-[10px] bg-taviflow-primary/20 text-taviflow-primary rounded-full px-1.5 py-0.5">
                            {template.type}
                          </span>
                          <span className="text-[10px] text-taviflow-muted">
                            {template.frequency}
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        Run
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="glass-card p-3">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-sm">Scheduled Reports</h3>
                  <Button variant="ghost" size="sm" className="text-xs text-taviflow-primary h-7 px-2">Schedule New</Button>
                </div>
                
                <div className="space-y-2">
                  <div className="p-2 border border-taviflow-border rounded-md">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-xs">Monthly Sales Report</h4>
                      <span className="text-[10px] bg-taviflow-in-stock/20 text-taviflow-in-stock rounded-full px-1.5 py-0.5">
                        Active
                      </span>
                    </div>
                    <p className="text-[10px] text-taviflow-muted mt-0.5">Runs on the 1st of every month</p>
                    <div className="flex items-center justify-between mt-1 text-[10px] text-taviflow-muted">
                      <span>Next run: June 1, 2023</span>
                      <Button variant="ghost" size="sm" className="h-6 px-1.5 text-[10px]">
                        Edit Schedule
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-2 border border-taviflow-border rounded-md">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-xs">Weekly Inventory Status</h4>
                      <span className="text-[10px] bg-taviflow-in-stock/20 text-taviflow-in-stock rounded-full px-1.5 py-0.5">
                        Active
                      </span>
                    </div>
                    <p className="text-[10px] text-taviflow-muted mt-0.5">Runs every Monday at 9:00 AM</p>
                    <div className="flex items-center justify-between mt-1 text-[10px] text-taviflow-muted">
                      <span>Next run: May 22, 2023</span>
                      <Button variant="ghost" size="sm" className="h-6 px-1.5 text-[10px]">
                        Edit Schedule
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-2 border border-taviflow-border rounded-md bg-gray-50">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-xs">Quarterly Performance</h4>
                      <span className="text-[10px] bg-taviflow-muted/20 text-taviflow-muted rounded-full px-1.5 py-0.5">
                        Paused
                      </span>
                    </div>
                    <p className="text-[10px] text-taviflow-muted mt-0.5">Runs at the end of each quarter</p>
                    <div className="flex items-center justify-between mt-1 text-[10px] text-taviflow-muted">
                      <span>Last run: March 31, 2023</span>
                      <Button variant="ghost" size="sm" className="h-6 px-1.5 text-[10px]">
                        Resume
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sales" className="p-4">
            <div className="glass-card p-4">
              <h2 className="text-base font-medium mb-3">Sales Reports</h2>
              <p className="text-taviflow-muted text-xs mb-4">View and generate reports related to sales performance and trends.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="border border-taviflow-border rounded-lg p-3 hover:shadow-md transition-all">
                  <BarChart className="w-6 h-6 text-taviflow-primary mb-2" />
                  <h3 className="font-medium text-sm">Revenue Analysis</h3>
                  <p className="text-xs text-taviflow-muted mt-1">Analyze sales revenue across different time periods</p>
                  <Button className="w-full mt-3 text-xs h-7">Generate</Button>
                </div>
                
                <div className="border border-taviflow-border rounded-lg p-3 hover:shadow-md transition-all">
                  <LineChart className="w-6 h-6 text-taviflow-primary mb-2" />
                  <h3 className="font-medium text-sm">Sales Trends</h3>
                  <p className="text-xs text-taviflow-muted mt-1">Track sales performance trends over time</p>
                  <Button className="w-full mt-3 text-xs h-7">Generate</Button>
                </div>
                
                <div className="border border-taviflow-border rounded-lg p-3 hover:shadow-md transition-all">
                  <PieChart className="w-6 h-6 text-taviflow-primary mb-2" />
                  <h3 className="font-medium text-sm">Product Sales</h3>
                  <p className="text-xs text-taviflow-muted mt-1">View sales breakdown by product category</p>
                  <Button className="w-full mt-3 text-xs h-7">Generate</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="inventory" className="p-4">
            <div className="glass-card p-4">
              <h2 className="text-base font-medium mb-3">Inventory Reports</h2>
              <p className="text-taviflow-muted text-xs mb-4">Track inventory levels, movements, and stock status across your warehouse.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="border border-taviflow-border rounded-lg p-3 hover:shadow-md transition-all">
                  <Package className="w-6 h-6 text-taviflow-primary mb-2" />
                  <h3 className="font-medium text-sm">Stock Status</h3>
                  <p className="text-xs text-taviflow-muted mt-1">Current inventory levels and status</p>
                  <Button className="w-full mt-3 text-xs h-7">Generate</Button>
                </div>
                
                <div className="border border-taviflow-border rounded-lg p-3 hover:shadow-md transition-all">
                  <BarChart className="w-6 h-6 text-taviflow-primary mb-2" />
                  <h3 className="font-medium text-sm">Inventory Turnover</h3>
                  <p className="text-xs text-taviflow-muted mt-1">Analyze how quickly inventory is sold</p>
                  <Button className="w-full mt-3 text-xs h-7">Generate</Button>
                </div>
                
                <div className="border border-taviflow-border rounded-lg p-3 hover:shadow-md transition-all">
                  <LineChart className="w-6 h-6 text-taviflow-primary mb-2" />
                  <h3 className="font-medium text-sm">Stock Trends</h3>
                  <p className="text-xs text-taviflow-muted mt-1">Track inventory levels over time</p>
                  <Button className="w-full mt-3 text-xs h-7">Generate</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="p-0">
            <div className="glass-card p-0 overflow-hidden">
              <div className="bg-gray-50 p-4 border-b border-taviflow-border">
                <h2 className="text-base font-medium">Report Configuration</h2>
                <p className="text-taviflow-muted text-xs">Create a custom report by selecting the metrics and filters you need</p>
              </div>
              
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-xs font-medium mb-1" htmlFor="report-name">Report Name</label>
                  <div className="relative">
                    <input
                      id="report-name"
                      type="text"
                      className="w-full p-1.5 text-xs border border-taviflow-border rounded-md focus:outline-none focus:ring-1 focus:ring-taviflow-primary"
                      placeholder="Enter report name"
                      value={reportName}
                      onChange={(e) => setReportName(e.target.value)}
                    />
                    <Button variant="ghost" className="absolute right-1 top-0.5 h-6 w-6 p-0">
                      <Edit className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-medium mb-1" htmlFor="data-source">Data Source</label>
                  <select
                    id="data-source"
                    className="w-full p-1.5 text-xs border border-taviflow-border rounded-md focus:outline-none focus:ring-1 focus:ring-taviflow-primary"
                    value={dataSource}
                    onChange={(e) => setDataSource(e.target.value)}
                  >
                    <option value="">Select data source</option>
                    <option value="orders">Orders</option>
                    <option value="inventory">Inventory</option>
                    <option value="customers">Customers</option>
                    <option value="products">Products</option>
                  </select>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Metrics</h3>
                  <div className="space-y-2">
                    {metrics.map(metric => (
                      <div key={metric.id} className="flex items-center justify-between p-2 border border-taviflow-border rounded-md">
                        <div className="flex items-center gap-2">
                          <div className="mt-0.5">{metric.icon}</div>
                          <div>
                            <h4 className="font-medium text-xs">{metric.name}</h4>
                            <p className="text-[10px] text-taviflow-muted">{metric.description}</p>
                          </div>
                        </div>
                        <Switch 
                          checked={metric.enabled} 
                          onCheckedChange={() => toggleMetric(metric.id)} 
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Filters</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium mb-1" htmlFor="date-range">Date Range</label>
                      <div className="relative">
                        <input
                          id="date-range"
                          type="text"
                          className="w-full p-1.5 text-xs border border-taviflow-border rounded-md focus:outline-none focus:ring-1 focus:ring-taviflow-primary"
                          placeholder="Select date range"
                          value={dateRange}
                          onChange={(e) => setDateRange(e.target.value)}
                        />
                        <Button variant="ghost" className="absolute right-1 top-0.5 h-6 w-6 p-0">
                          <Calendar className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium mb-1" htmlFor="categories">Categories</label>
                      <select
                        id="categories"
                        className="w-full p-1.5 text-xs border border-taviflow-border rounded-md focus:outline-none focus:ring-1 focus:ring-taviflow-primary"
                        value={categories}
                        onChange={(e) => setCategories(e.target.value)}
                      >
                        <option value="">Select categories</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="furniture">Furniture</option>
                        <option value="accessories">Accessories</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-3 border-t border-taviflow-border">
                  <Button className="primary-button text-xs h-8">
                    Generate Report
                  </Button>
                  <Button variant="outline" className="text-xs h-8">
                    Save Template
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;
