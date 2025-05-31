'use client'

/**
 * User Management Page
 * 
 * This component provides a comprehensive user management interface with:
 * - User listing with filtering, search, and pagination
 * - Role-based permission management
 * - User account actions (add, edit, lock)
 * - Activity tracking and display
 */

import { useState } from "react";
import { 
  UsersIcon, 
  User, 
  Search, 
  Plus, 
  Filter, 
  Edit, 
  Trash, 
  MoreVertical, 
  CheckCircle,
  XCircle,
  Shield,
  UserCog,
  UserPlus,
  Mail,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Pagination from "@/components/common/Pagination";
import { toast } from "sonner";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Check, X } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Employee" | "Guest";
  status: "Active" | "Inactive" | "Pending";
  lastActive: string;
}

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all-users");
  const [currentPage, setCurrentPage] = useState(1);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [editPermissionsOpen, setEditPermissionsOpen] = useState(false);
  const [sendEmailOpen, setSendEmailOpen] = useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [configureRoleOpen, setConfigureRoleOpen] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Employee",
    status: "Active"
  });
  const [selectedFilters, setSelectedFilters] = useState({
    role: "all",
    status: "all",
    lastActive: "all"
  });
  const itemsPerPage = 5;
  
  const users: UserData[] = [
    {
      id: "1",
      name: "John Barak",
      email: "john.barak@example.com",
      role: "Admin",
      status: "Active",
      lastActive: "Just now"
    },
    {
      id: "2",
      name: "Mubzly Kabananga",
      email: "mubzly.j@example.com",
      role: "Manager",
      status: "Active",
      lastActive: "2 hours ago"
    },
    {
      id: "3",
      name: "Dj Micheal",
      email: "m.dj@example.com",
      role: "Employee",
      status: "Active",
      lastActive: "1 day ago"
    },
    {
      id: "4",
      name: "Cosma Tech",
      email: "cosma.d@example.com",
      role: "Employee",
      status: "Inactive",
      lastActive: "2 weeks ago"
    },
    {
      id: "5",
      name: "HardGuy Wilson",
      email: "hardguy.w@example.com",
      role: "Guest",
      status: "Pending",
      lastActive: "Never"
    },
    {
      id: "6",
      name: "Amanda Lee",
      email: "a.lee@example.com",
      role: "Manager",
      status: "Active",
      lastActive: "3 hours ago"
    },
    {
      id: "7",
      name: "David SwiftGuy",
      email: "david.c@example.com",
      role: "Employee",
      status: "Active",
      lastActive: "5 days ago"
    },
    {
      id: "8",
      name: "Jennifer SmoothG",
      email: "j.white@example.com",
      role: "Employee",
      status: "Inactive",
      lastActive: "1 month ago"
    }
  ];
  
  const filteredUsers = users.filter(user => {
    // Base text search
    const textMatch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Tab filter
    const tabMatch = activeTab === "all-users" || 
      (activeTab === "admins" && user.role === "Admin") ||
      (activeTab === "managers" && user.role === "Manager") ||
      (activeTab === "employees" && user.role === "Employee");
    
    // Applied filters (when using the filter dialog)
    const roleMatch = selectedFilters.role === "all" || user.role.toLowerCase() === selectedFilters.role.toLowerCase();
    const statusMatch = selectedFilters.status === "all" || user.status.toLowerCase() === selectedFilters.status.toLowerCase();
    
    return textMatch && tabMatch && roleMatch && statusMatch;
  });
  
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-purple-100 text-purple-700";
      case "Manager":
        return "bg-blue-100 text-blue-700";
      case "Employee":
        return "bg-green-100 text-green-700";
      case "Guest":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-taviflow-in-stock";
      case "Inactive":
        return "text-taviflow-muted";
      case "Pending":
        return "text-taviflow-low-stock";
      default:
        return "text-taviflow-muted";
    }
  };

  const handleAddUser = () => {
    setAddUserDialogOpen(true);
  };

  const submitNewUser = () => {
    if (!newUser.name || !newUser.email) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    toast.success(`User ${newUser.name} added successfully`, {
      description: `Invitation sent to ${newUser.email}`
    });
    
    // Reset form and close dialog
    setNewUser({
      name: "",
      email: "",
      role: "Employee",
      status: "Active"
    });
    setAddUserDialogOpen(false);
  };

  const handleEditPermissions = (user: UserData) => {
    setSelectedUser(user);
    setEditPermissionsOpen(true);
  };

  const savePermissions = () => {
    if (selectedUser) {
      toast.success(`Permissions updated for ${selectedUser.name}`);
      setEditPermissionsOpen(false);
    }
  };

  const handleSendEmail = (user: UserData) => {
    setSelectedUser(user);
    setSendEmailOpen(true);
  };

  const sendEmail = () => {
    if (selectedUser) {
      toast.success(`Email sent to ${selectedUser.email}`);
      setSendEmailOpen(false);
    }
  };

  const handleLockAccount = (user: UserData) => {
    toast.success(`${user.status === "Active" ? "Locked" : "Unlocked"} account for ${user.name}`);
  };
  
  const handleConfigureRole = (role: string) => {
    setConfigureRoleOpen(role);
  };
  
  const saveRoleConfiguration = () => {
    toast.success(`${configureRoleOpen} role permissions updated`);
    setConfigureRoleOpen("");
  };
  
  const applyFilters = () => {
    toast.info("Filters applied");
    setFilterDialogOpen(false);
    setCurrentPage(1); // Reset to first page after filtering
  };
  
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold mb-1">User Management</h1>
        <p className="text-taviflow-muted text-xs">Manage system users, roles, and permissions</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="glass-card p-2.5 flex items-center gap-3">
          <div className="bg-taviflow-primary/10 rounded-full p-2 flex-shrink-0">
            <UsersIcon className="w-3.5 h-3.5 text-taviflow-primary" />
          </div>
          <div>
            <p className="text-xs font-medium">Total Users</p>
            <p className="text-xl font-semibold">{users.length}</p>
          </div>
        </div>
        
        <div className="glass-card p-2.5 flex items-center gap-3">
          <div className="bg-taviflow-in-stock/10 rounded-full p-2 flex-shrink-0">
            <CheckCircle className="w-3.5 h-3.5 text-taviflow-in-stock" />
          </div>
          <div>
            <p className="text-xs font-medium">Active Users</p>
            <p className="text-xl font-semibold">{users.filter(u => u.status === "Active").length}</p>
          </div>
        </div>
        
        <div className="glass-card p-2.5 flex items-center gap-3">
          <div className="bg-taviflow-low-stock/10 rounded-full p-2 flex-shrink-0">
            <XCircle className="w-3.5 h-3.5 text-taviflow-low-stock" />
          </div>
          <div>
            <p className="text-xs font-medium">Pending Invitations</p>
            <p className="text-xl font-semibold">{users.filter(u => u.status === "Pending").length}</p>
          </div>
        </div>
      </div>
      
      <div className="glass-card p-0 overflow-hidden">
        <Tabs defaultValue="all-users" onValueChange={(value) => {
          setActiveTab(value);
          setCurrentPage(1);
        }} className="w-full">
          <div className="border-b border-taviflow-border px-3">
            <TabsList className="flex bg-transparent p-0">
              <TabsTrigger 
                value="all-users" 
                className="px-3 py-2 text-xs rounded-none border-b-2 data-[state=active]:border-taviflow-primary data-[state=inactive]:border-transparent transition-all"
              >
                All Users
              </TabsTrigger>
              <TabsTrigger 
                value="admins" 
                className="px-3 py-2 text-xs rounded-none border-b-2 data-[state=active]:border-taviflow-primary data-[state=inactive]:border-transparent transition-all"
              >
                Admins
              </TabsTrigger>
              <TabsTrigger 
                value="managers" 
                className="px-3 py-2 text-xs rounded-none border-b-2 data-[state=active]:border-taviflow-primary data-[state=inactive]:border-transparent transition-all"
              >
                Managers
              </TabsTrigger>
              <TabsTrigger 
                value="employees" 
                className="px-3 py-2 text-xs rounded-none border-b-2 data-[state=active]:border-taviflow-primary data-[state=inactive]:border-transparent transition-all"
              >
                Employees
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="p-3">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-3">
              <div className="relative max-w-xs">
                <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-taviflow-muted" />
                <Input
                  placeholder="Search users..."
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
                      <DialogTitle>Filter Users</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="filter-role" className="text-right">
                          Role
                        </Label>
                        <select 
                          id="filter-role" 
                          className="col-span-3 h-9 rounded-md border border-input px-3 py-1 text-sm"
                          value={selectedFilters.role}
                          onChange={(e) => setSelectedFilters({...selectedFilters, role: e.target.value})}
                        >
                          <option value="all">All Roles</option>
                          <option value="admin">Admin</option>
                          <option value="manager">Manager</option>
                          <option value="employee">Employee</option>
                          <option value="guest">Guest</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="filter-status" className="text-right">
                          Status
                        </Label>
                        <select 
                          id="filter-status" 
                          className="col-span-3 h-9 rounded-md border border-input px-3 py-1 text-sm"
                          value={selectedFilters.status}
                          onChange={(e) => setSelectedFilters({...selectedFilters, status: e.target.value})}
                        >
                          <option value="all">All Statuses</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="pending">Pending</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="filter-last-active" className="text-right">
                          Last Active
                        </Label>
                        <select 
                          id="filter-last-active" 
                          className="col-span-3 h-9 rounded-md border border-input px-3 py-1 text-sm"
                          value={selectedFilters.lastActive}
                          onChange={(e) => setSelectedFilters({...selectedFilters, lastActive: e.target.value})}
                        >
                          <option value="all">All Time</option>
                          <option value="today">Today</option>
                          <option value="week">This Week</option>
                          <option value="month">This Month</option>
                          <option value="never">Never Active</option>
                        </select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setFilterDialogOpen(false)}>Cancel</Button>
                      <Button onClick={applyFilters}>Apply Filters</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <Dialog open={addUserDialogOpen} onOpenChange={setAddUserDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      size="sm" 
                      className="text-xs h-8 px-2 bg-taviflow-primary text-white"
                      onClick={handleAddUser}
                    >
                      <UserPlus className="mr-1 h-3 w-3" />
                      Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New User</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Full Name*
                        </Label>
                        <Input
                          id="name"
                          value={newUser.name}
                          onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email*
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={newUser.email}
                          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right">
                          Role
                        </Label>
                        <select
                          id="role"
                          value={newUser.role}
                          onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                          className="col-span-3 h-9 rounded-md border border-input px-3 py-1 text-sm"
                        >
                          <option value="Admin">Admin</option>
                          <option value="Manager">Manager</option>
                          <option value="Employee">Employee</option>
                          <option value="Guest">Guest</option>
                        </select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setAddUserDialogOpen(false)}>Cancel</Button>
                      <Button onClick={submitNewUser}>Send Invitation</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-taviflow-border">
                    <th className="text-left p-2 font-medium text-[10px]">USER</th>
                    <th className="text-left p-2 font-medium text-[10px]">ROLE</th>
                    <th className="text-left p-2 font-medium text-[10px]">STATUS</th>
                    <th className="text-left p-2 font-medium text-[10px]">LAST ACTIVE</th>
                    <th className="text-right p-2 font-medium text-[10px]">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user) => (
                    <tr key={user.id} className="border-b border-taviflow-border hover:bg-taviflow-secondary/30">
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <div className="bg-gray-100 rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0">
                            <User className="w-3.5 h-3.5 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-xs font-medium">{user.name}</p>
                            <p className="text-[10px] text-taviflow-muted">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-2">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-1">
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            user.status === "Active" ? "bg-taviflow-in-stock" : 
                            user.status === "Inactive" ? "bg-taviflow-muted" : 
                            "bg-taviflow-low-stock"
                          }`}></div>
                          <span className={`text-xs ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </div>
                      </td>
                      <td className="p-2 text-xs">{user.lastActive}</td>
                      <td className="p-2 text-right">
                        <div className="flex justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0"
                            onClick={() => handleEditPermissions(user)}
                          >
                            <UserCog className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0"
                            onClick={() => handleSendEmail(user)}
                          >
                            <Mail className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0 text-taviflow-out-stock"
                            onClick={() => handleLockAccount(user)}
                          >
                            <Lock className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {currentUsers.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-xs text-taviflow-muted">No users found</p>
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="glass-card p-3">
          <h3 className="text-sm font-medium mb-2">Role Permissions</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md border border-taviflow-border">
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-purple-600" />
                <span className="text-xs font-medium">Admin</span>
              </div>
              <Dialog open={configureRoleOpen === "Admin"} onOpenChange={(open) => {
                if (!open) setConfigureRoleOpen("");
              }}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-[10px] h-6 px-1.5"
                    onClick={() => handleConfigureRole("Admin")}
                  >
                    Configure
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Configure Admin Permissions</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <h4 className="text-sm font-medium mb-3">Access Control</h4>
                    <div className="space-y-2 mb-4">
                      {["User Management", "Database Settings", "System Configuration", "Reports", "Inventory Management", "Employee Data"].map(permission => (
                        <div key={permission} className="flex items-center justify-between">
                          <span className="text-sm">{permission}</span>
                          <input type="checkbox" defaultChecked className="h-4 w-4" />
                        </div>
                      ))}
                    </div>
                    
                    <h4 className="text-sm font-medium mb-3">Administrative Actions</h4>
                    <div className="space-y-2">
                      {["Create/Delete Users", "Modify System Settings", "View Audit Logs", "Manage Backups", "Override Approvals"].map(permission => (
                        <div key={permission} className="flex items-center justify-between">
                          <span className="text-sm">{permission}</span>
                          <input type="checkbox" defaultChecked className="h-4 w-4" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setConfigureRoleOpen("")}>Cancel</Button>
                    <Button onClick={saveRoleConfiguration}>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md border border-taviflow-border">
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-xs font-medium">Manager</span>
              </div>
              <Dialog open={configureRoleOpen === "Manager"} onOpenChange={(open) => {
                if (!open) setConfigureRoleOpen("");
              }}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-[10px] h-6 px-1.5"
                    onClick={() => handleConfigureRole("Manager")}
                  >
                    Configure
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Configure Manager Permissions</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <h4 className="text-sm font-medium mb-3">Access Control</h4>
                    <div className="space-y-2 mb-4">
                      {["Team Management", "Reports", "Inventory Management", "Employee Data"].map(permission => (
                        <div key={permission} className="flex items-center justify-between">
                          <span className="text-sm">{permission}</span>
                          <input type="checkbox" defaultChecked className="h-4 w-4" />
                        </div>
                      ))}
                      {["User Management", "Database Settings", "System Configuration"].map(permission => (
                        <div key={permission} className="flex items-center justify-between">
                          <span className="text-sm">{permission}</span>
                          <input type="checkbox" className="h-4 w-4" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setConfigureRoleOpen("")}>Cancel</Button>
                    <Button onClick={saveRoleConfiguration}>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md border border-taviflow-border">
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-green-600" />
                <span className="text-xs font-medium">Employee</span>
              </div>
              <Dialog open={configureRoleOpen === "Employee"} onOpenChange={(open) => {
                if (!open) setConfigureRoleOpen("");
              }}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-[10px] h-6 px-1.5"
                    onClick={() => handleConfigureRole("Employee")}
                  >
                    Configure
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Configure Employee Permissions</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <h4 className="text-sm font-medium mb-3">Access Control</h4>
                    <div className="space-y-2 mb-4">
                      {["Inventory View", "Personal Reports", "Request Submission"].map(permission => (
                        <div key={permission} className="flex items-center justify-between">
                          <span className="text-sm">{permission}</span>
                          <input type="checkbox" defaultChecked className="h-4 w-4" />
                        </div>
                      ))}
                      {["Team Management", "User Management", "System Configuration"].map(permission => (
                        <div key={permission} className="flex items-center justify-between">
                          <span className="text-sm">{permission}</span>
                          <input type="checkbox" className="h-4 w-4" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setConfigureRoleOpen("")}>Cancel</Button>
                    <Button onClick={saveRoleConfiguration}>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-3">
          <h3 className="text-sm font-medium mb-2">Recent Activity</h3>
          <div className="space-y-2">
            <div className="flex gap-2 items-start border-b border-taviflow-border pb-2">
              <div className="bg-taviflow-primary/10 rounded-full p-1 mt-0.5">
                <UserPlus className="w-3 h-3 text-taviflow-primary" />
              </div>
              <div>
                <p className="text-xs">New user <span className="font-medium">Robert Wilson</span> was invited</p>
                <p className="text-[10px] text-taviflow-muted">2 hours ago · by John Smith</p>
              </div>
            </div>
            
            <div className="flex gap-2 items-start border-b border-taviflow-border pb-2">
              <div className="bg-taviflow-primary/10 rounded-full p-1 mt-0.5">
                <Lock className="w-3 h-3 text-taviflow-primary" />
              </div>
              <div>
                <p className="text-xs">User <span className="font-medium">Emily Davis</span> was deactivated</p>
                <p className="text-[10px] text-taviflow-muted">2 days ago · by John Smith</p>
              </div>
            </div>
            
            <div className="flex gap-2 items-start">
              <div className="bg-taviflow-primary/10 rounded-full p-1 mt-0.5">
                <Shield className="w-3 h-3 text-taviflow-primary" />
              </div>
              <div>
                <p className="text-xs">User <span className="font-medium">Sarah Johnson</span> role changed to Manager</p>
                <p className="text-[10px] text-taviflow-muted">1 week ago · by John Smith</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Edit permissions dialog */}
      <Dialog open={editPermissionsOpen} onOpenChange={setEditPermissionsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User Permissions</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {selectedUser && (
              <>
                <div className="flex items-center gap-3 mb-4 pb-3 border-b">
                  <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedUser.name}</p>
                    <p className="text-xs text-taviflow-muted">{selectedUser.email}</p>
                  </div>
                </div>
                
                <h4 className="text-sm font-medium mb-3">Permissions</h4>
                <RadioGroup defaultValue={selectedUser.role.toLowerCase()} className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="admin" id="admin" />
                    <Label htmlFor="admin" className="flex items-center">
                      <Shield className="w-3.5 h-3.5 text-purple-600 mr-2" />
                      Admin
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="manager" id="manager" />
                    <Label htmlFor="manager" className="flex items-center">
                      <Shield className="w-3.5 h-3.5 text-blue-600 mr-2" />
                      Manager
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="employee" id="employee" />
                    <Label htmlFor="employee" className="flex items-center">
                      <Shield className="w-3.5 h-3.5 text-green-600 mr-2" />
                      Employee
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="guest" id="guest" />
                    <Label htmlFor="guest" className="flex items-center">
                      <Shield className="w-3.5 h-3.5 text-gray-400 mr-2" />
                      Guest
                    </Label>
                  </div>
                </RadioGroup>
                
                <h4 className="text-sm font-medium mb-3">Account Status</h4>
                <RadioGroup defaultValue={selectedUser.status.toLowerCase()} className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="active" id="active" />
                    <Label htmlFor="active" className="flex items-center">
                      <CheckCircle className="w-3.5 h-3.5 text-taviflow-in-stock mr-2" />
                      Active
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="inactive" id="inactive" />
                    <Label htmlFor="inactive" className="flex items-center">
                      <XCircle className="w-3.5 h-3.5 text-taviflow-muted mr-2" />
                      Inactive
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pending" id="pending" />
                    <Label htmlFor="pending" className="flex items-center">
                      <XCircle className="w-3.5 h-3.5 text-taviflow-low-stock mr-2" />
                      Pending
                    </Label>
                  </div>
                </RadioGroup>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditPermissionsOpen(false)}>Cancel</Button>
            <Button onClick={savePermissions}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Send Email dialog */}
      <Dialog open={sendEmailOpen} onOpenChange={setSendEmailOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Email</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {selectedUser && (
              <>
                <div className="flex items-center gap-3 mb-4 pb-3 border-b">
                  <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedUser.name}</p>
                    <p className="text-xs text-taviflow-muted">{selectedUser.email}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      placeholder="Email subject line"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-sm font-medium">
                      Message
                    </Label>
                    <textarea
                      id="message"
                      placeholder="Write your message here..."
                      className="w-full h-32 mt-1 rounded-md border border-input p-3 text-sm"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="include-account-details" className="h-4 w-4" />
                    <Label htmlFor="include-account-details" className="text-xs">
                      Include account details
                    </Label>
                  </div>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSendEmailOpen(false)}>Cancel</Button>
            <Button onClick={sendEmail}>Send Email</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;
