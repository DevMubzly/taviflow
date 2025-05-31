'use client'

import { useState } from "react";
import { Users, Database, Settings, Shield, Bell, ChevronDown, PieChart, BarChart, Download, DollarSign, UserPlus, Edit, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'reports' | 'settings'>('users');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-taviflow-muted">Manage users, view reports, and configure system settings</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </Button>
          <Button className="primary-button flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            <span>Add User</span>
          </Button>
        </div>
      </div>
      
      <div className="glass-card p-0 overflow-hidden">
        <div className="flex border-b border-taviflow-border">
          <button
            className={`px-6 py-4 flex items-center gap-2 font-medium ${activeTab === 'users' ? 'tab-active' : 'tab-inactive'}`}
            onClick={() => setActiveTab('users')}
          >
            <Users className="w-4 h-4" />
            User Management
          </button>
          <button
            className={`px-6 py-4 flex items-center gap-2 font-medium ${activeTab === 'reports' ? 'tab-active' : 'tab-inactive'}`}
            onClick={() => setActiveTab('reports')}
          >
            <BarChart className="w-4 h-4" />
            Reports
          </button>
          <button
            className={`px-6 py-4 flex items-center gap-2 font-medium ${activeTab === 'settings' ? 'tab-active' : 'tab-inactive'}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="w-4 h-4" />
            System Settings
          </button>
        </div>
        
        {activeTab === 'users' && (
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div className="relative w-full md:w-64 mb-4 md:mb-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-taviflow-muted h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-9 pr-4 py-2 w-full rounded-lg border border-taviflow-border"
                />
              </div>
              
              <div className="flex gap-2">
                <select className="p-2 border border-taviflow-border rounded-md">
                  <option>All Roles</option>
                  <option>Admin</option>
                  <option>Manager</option>
                  <option>Employee</option>
                </select>
                <select className="p-2 border border-taviflow-border rounded-md">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-taviflow-border" />
                        <span>User</span>
                      </div>
                    </th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Last Login</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                      <td>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="rounded border-taviflow-border" />
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white">
                            {i === 0 ? "JS" : i === 1 ? "SS" : i === 2 ? "MJ" : i === 3 ? "EB" : "DM"}
                          </div>
                          <span>
                            {i === 0 ? "John Smith" : i === 1 ? "Sarah Smith" : i === 2 ? "Michael Johnson" : i === 3 ? "Emily Brown" : "David Miller"}
                          </span>
                        </div>
                      </td>
                      <td>
                        {i === 0 ? "john@example.com" : i === 1 ? "sarah@example.com" : i === 2 ? "michael@example.com" : i === 3 ? "emily@example.com" : "david@example.com"}
                      </td>
                      <td>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          i === 0 ? "bg-purple-100 text-purple-800" : 
                          i === 1 ? "bg-blue-100 text-blue-800" : 
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {i === 0 ? "Admin" : i === 1 ? "Manager" : "Employee"}
                        </span>
                      </td>
                      <td>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          i !== 3 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {i !== 3 ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        {i === 0 ? "Just now" : i === 1 ? "2 hours ago" : i === 2 ? "Yesterday" : i === 3 ? "1 week ago" : "3 days ago"}
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-taviflow-out-stock">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-taviflow-muted">
                Showing 5 of 24 users
              </div>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" className="bg-taviflow-primary text-white">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'reports' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 glass-card">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Revenue</h3>
                  <DollarSign className="w-5 h-5 text-taviflow-primary" />
                </div>
                <p className="text-2xl font-bold mt-2">$124,350</p>
                <div className="text-xs text-taviflow-in-stock mt-1 flex items-center">
                  <span className="flex items-center">+12.5% from last month</span>
                </div>
              </div>
              
              <div className="p-4 glass-card">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Users</h3>
                  <Users className="w-5 h-5 text-taviflow-primary" />
                </div>
                <p className="text-2xl font-bold mt-2">24</p>
                <div className="text-xs text-taviflow-in-stock mt-1 flex items-center">
                  <span className="flex items-center">+2 new this month</span>
                </div>
              </div>
              
              <div className="p-4 glass-card">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Inventory Items</h3>
                  <Database className="w-5 h-5 text-taviflow-primary" />
                </div>
                <p className="text-2xl font-bold mt-2">1,234</p>
                <div className="text-xs text-taviflow-low-stock mt-1 flex items-center">
                  <span className="flex items-center">28 low stock alerts</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 glass-card p-4">
                <h3 className="font-medium mb-4">Popular Reports</h3>
                <ul className="space-y-4">
                  <li className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-taviflow-primary/10 flex items-center justify-center text-taviflow-primary">
                        <BarChart className="w-4 h-4" />
                      </div>
                      <span>Monthly Sales</span>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-taviflow-primary/10 flex items-center justify-center text-taviflow-primary">
                        <PieChart className="w-4 h-4" />
                      </div>
                      <span>Inventory Status</span>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-taviflow-primary/10 flex items-center justify-center text-taviflow-primary">
                        <Users className="w-4 h-4" />
                      </div>
                      <span>User Activity</span>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </li>
                </ul>
              </div>
              
              <div className="flex-1 glass-card p-4">
                <h3 className="font-medium mb-4">Recent Exports</h3>
                <ul className="space-y-4">
                  <li className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-taviflow-primary/10 flex items-center justify-center text-taviflow-primary">
                        <Download className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span>Sales_Report_Oct_2023.xlsx</span>
                        <span className="text-xs text-taviflow-muted">2 hours ago</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Download</Button>
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-taviflow-primary/10 flex items-center justify-center text-taviflow-primary">
                        <Download className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span>Inventory_Status_Q3.pdf</span>
                        <span className="text-xs text-taviflow-muted">Yesterday</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Download</Button>
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-taviflow-primary/10 flex items-center justify-center text-taviflow-primary">
                        <Download className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span>User_Activity_Log.csv</span>
                        <span className="text-xs text-taviflow-muted">3 days ago</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Download</Button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-4">
                <h3 className="font-medium mb-4">General Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Company Name</label>
                    <input type="text" className="w-full p-2 border border-taviflow-border rounded-md" defaultValue="Inventory Hub" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Date Format</label>
                    <select className="w-full p-2 border border-taviflow-border rounded-md">
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Default Currency</label>
                    <select className="w-full p-2 border border-taviflow-border rounded-md">
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="font-medium">Enable Dark Mode</label>
                    <div className="w-10 h-5 bg-taviflow-secondary rounded-full relative">
                      <div className="w-4 h-4 rounded-full bg-taviflow-primary absolute left-0.5 top-0.5"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-4">
                <h3 className="font-medium mb-4">Security Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="font-medium">Two-Factor Authentication</label>
                    <div className="w-10 h-5 bg-taviflow-secondary rounded-full relative">
                      <div className="w-4 h-4 rounded-full bg-taviflow-primary absolute left-0.5 top-0.5"></div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Session Timeout (minutes)</label>
                    <input type="number" className="w-full p-2 border border-taviflow-border rounded-md" defaultValue="30" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Password Policy</label>
                    <select className="w-full p-2 border border-taviflow-border rounded-md">
                      <option>Strong (requires symbols, numbers, mixed case)</option>
                      <option>Medium (requires at least one number)</option>
                      <option>Basic (minimum 8 characters)</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="font-medium">Require Email Verification</label>
                    <div className="w-10 h-5 bg-taviflow-in-stock/25 rounded-full relative">
                      <div className="w-4 h-4 rounded-full bg-taviflow-in-stock absolute right-0.5 top-0.5"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-4 md:col-span-2">
                <h3 className="font-medium mb-4">Notification Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium">Email Notifications</label>
                      <p className="text-sm text-taviflow-muted">Receive notifications via email</p>
                    </div>
                    <div className="w-10 h-5 bg-taviflow-in-stock/25 rounded-full relative">
                      <div className="w-4 h-4 rounded-full bg-taviflow-in-stock absolute right-0.5 top-0.5"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium">Low Stock Alerts</label>
                      <p className="text-sm text-taviflow-muted">Get notified when items are running low</p>
                    </div>
                    <div className="w-10 h-5 bg-taviflow-in-stock/25 rounded-full relative">
                      <div className="w-4 h-4 rounded-full bg-taviflow-in-stock absolute right-0.5 top-0.5"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium">New User Registrations</label>
                      <p className="text-sm text-taviflow-muted">Get notified when new users register</p>
                    </div>
                    <div className="w-10 h-5 bg-taviflow-secondary rounded-full relative">
                      <div className="w-4 h-4 rounded-full bg-taviflow-primary absolute left-0.5 top-0.5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button className="primary-button">Save Changes</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
