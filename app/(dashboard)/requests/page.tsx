'use client'

import { useState, useEffect } from "react";
import { Plus, Filter, Calendar, Download, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/common/Pagination";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface EmployeeRequest {
  id: string;
  employeeName: string;
  requestDate: string;
  reason: string;
  details: string;
  status: "Pending" | "Approved" | "Rejected";
}

const initialRequests = [
  {
    id: "001",
    employeeName: "Balinda Mubarak",
    requestDate: "2023-10-01",
    reason: "Annual Leave",
    details: "Requesting 5 days off for family vacation",
    status: "Pending" as const,
  },
  {
    id: "002",
    employeeName: "Ogwal Timothy",
    requestDate: "2023-10-03",
    reason: "Overtime",
    details: "Extra hours worked on weekend project",
    status: "Pending" as const,
  },
  {
    id: "003",
    employeeName: "Mumanye Timothy",
    requestDate: "2023-10-02",
    reason: "Sick Leave",
    details: "Doctor's appointment and recovery",
    status: "Approved" as const,
  },
  {
    id: "004",
    employeeName: "Namanya Mervo",
    requestDate: "2023-10-05",
    reason: "Vacation",
    details: "Pre-planned vacation time",
    status: "Rejected" as const,
  },
  {
    id: "005",
    employeeName: "Dj Brighto",
    requestDate: "2023-10-07",
    reason: "Equipment Request",
    details: "Need new monitor for work station",
    status: "Pending" as const,
  },
  {
    id: "006",
    employeeName: "Top G",
    requestDate: "2023-10-08",
    reason: "Training Request",
    details: "Professional development course",
    status: "Approved" as const,
  },
  {
    id: "007",
    employeeName: "Mandem John",
    requestDate: "2023-10-09",
    reason: "Schedule Change",
    details: "Request to change shift next week",
    status: "Pending" as const,
  },
];

type FilterStatus = "All" | "Pending" | "Approved" | "Rejected";
type FilterType = "All" | "Leave" | "Overtime" | "Equipment" | "Other";

const EmployeeRequests = () => {
  const [employeeRequests, setEmployeeRequests] = useState<EmployeeRequest[]>(initialRequests);
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("All");
  const [typeFilter, setTypeFilter] = useState<FilterType>("All");
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<{ from: string; to: string } | null>(null);
  const itemsPerPage = 5;
  
  // Form state
  const [formData, setFormData] = useState({
    requestType: "Annual Leave",
    date: new Date().toISOString().slice(0, 10),
    details: "",
  });
  
  // Apply filters
  const applyFilters = (request: EmployeeRequest) => {
    const matchesStatus = statusFilter === "All" || request.status === statusFilter;
    const matchesType = typeFilter === "All" || request.reason.toLowerCase().includes(typeFilter.toLowerCase());
    const matchesSearch = !searchQuery || 
      request.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesType && matchesSearch;
  };
  
  const filteredRequests = employeeRequests.filter(applyFilters);
  
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const currentRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, typeFilter, searchQuery]);
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="w-4 h-4 text-taviflow-in-stock" />;
      case "Rejected":
        return <XCircle className="w-4 h-4 text-taviflow-out-stock" />;
      default:
        return <Clock className="w-4 h-4 text-taviflow-low-stock" />;
    }
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate ID using timestamp
    const newId = (employeeRequests.length + 1).toString().padStart(3, '0');
    
    // Create new request
    const newRequest: EmployeeRequest = {
      id: newId,
      employeeName: "Current User", // Would use actual user info in real app
      requestDate: new Date().toISOString().slice(0, 10),
      reason: formData.requestType,
      details: formData.details,
      status: "Pending",
    };
    
    // Add to list
    setEmployeeRequests([newRequest, ...employeeRequests]);
    
    toast.success("Request submitted successfully!");
    setShowForm(false);
    
    // Reset form
    setFormData({
      requestType: "Annual Leave",
      date: new Date().toISOString().slice(0, 10),
      details: "",
    });
  };

  const handleApprove = (request: EmployeeRequest) => {
    setEmployeeRequests(
      employeeRequests.map(req => 
        req.id === request.id ? { ...req, status: "Approved" } : req
      )
    );
    
    toast.success(`Request ${request.id} approved successfully!`);
  };

  const handleReject = (request: EmployeeRequest) => {
    setEmployeeRequests(
      employeeRequests.map(req => 
        req.id === request.id ? { ...req, status: "Rejected" } : req
      )
    );
    
    toast.error(`Request ${request.id} rejected.`);
  };

  const handleView = (request: EmployeeRequest) => {
    // Show details in a toast for simplicity
    toast.info(`Request Details for ${request.id}`, {
      description: request.details
    });
  };

  const handleExport = () => {
    toast.success("Exporting data to CSV", {
      description: "Your download will begin shortly"
    });
    
    // In a real app, this would trigger a CSV download
    setTimeout(() => {
      const mockUrl = URL.createObjectURL(
        new Blob([JSON.stringify(filteredRequests)], {type: 'application/json'})
      );
      
      const a = document.createElement('a');
      a.href = mockUrl;
      a.download = 'employee-requests.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, 1000);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSelectDateRange = () => {
    // Mock date range selection
    const from = new Date();
    from.setDate(from.getDate() - 7);
    
    setDateRange({
      from: from.toISOString().slice(0, 10),
      to: new Date().toISOString().slice(0, 10)
    });
    
    toast.info("Date range selected", {
      description: `Showing requests from ${from.toLocaleDateString()} to ${new Date().toLocaleDateString()}`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Employee Requests</h1>
          <p className="text-taviflow-muted">Manage leave, overtime, and equipment requests</p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus className="w-4 h-4" />
            <span>New Request</span>
          </Button>
          <Button 
            className="primary-button flex items-center gap-2"
            onClick={handleExport}
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {showForm && (
        <div className="glass-card p-6 animate-scale-in">
          <h2 className="text-lg font-semibold mb-4">Create New Request</h2>
          
          <form onSubmit={handleSubmitRequest}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Request Type</label>
                <select 
                  className="w-full p-2 border border-taviflow-border rounded-md"
                  value={formData.requestType}
                  onChange={(e) => setFormData({...formData, requestType: e.target.value})}
                >
                  <option>Annual Leave</option>
                  <option>Sick Leave</option>
                  <option>Overtime</option>
                  <option>Equipment Request</option>
                  <option>Training Request</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input 
                  type="date" 
                  className="w-full p-2 border border-taviflow-border rounded-md"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Details</label>
                <textarea 
                  className="w-full p-2 border border-taviflow-border rounded-md h-24"
                  placeholder="Provide details about your request..."
                  required
                  value={formData.details}
                  onChange={(e) => setFormData({...formData, details: e.target.value})}
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button type="submit" className="primary-button">Submit Request</Button>
            </div>
          </form>
        </div>
      )}
      
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-0">
            <div>
              <label className="block text-sm font-medium mb-1">Filter by Status</label>
              <select 
                className="p-2 border border-taviflow-border rounded-md"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as FilterStatus);
                }}
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Filter by Type</label>
              <select 
                className="p-2 border border-taviflow-border rounded-md"
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value as FilterType);
                }}
              >
                <option value="All">All Types</option>
                <option value="Leave">Leave</option>
                <option value="Overtime">Overtime</option>
                <option value="Equipment">Equipment</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Search</label>
              <input 
                type="text" 
                placeholder="Search by name or ID..." 
                className="p-2 border border-taviflow-border rounded-md w-full"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Date Range</label>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleSelectDateRange}
            >
              <Calendar className="w-4 h-4" />
              <span>Select Date Range</span>
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Employee</th>
                <th>Date</th>
                <th>Type</th>
                <th>Details</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRequests.map((request, index) => (
                <tr key={request.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <td>{request.id}</td>
                  <td>{request.employeeName}</td>
                  <td>{request.requestDate}</td>
                  <td>{request.reason}</td>
                  <td className="max-w-xs truncate">{request.details}</td>
                  <td>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(request.status)}
                      <span className={`
                        ${request.status === 'Approved' ? 'text-taviflow-in-stock' : 
                        request.status === 'Rejected' ? 'text-taviflow-out-stock' : 
                        'text-taviflow-low-stock'}
                      `}>
                        {request.status}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-3 text-xs"
                        onClick={() => handleView(request)}
                      >
                        View
                      </Button>
                      {request.status === 'Pending' && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 px-3 text-xs bg-taviflow-in-stock text-white"
                            onClick={() => handleApprove(request)}
                          >
                            Approve
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 px-3 text-xs bg-taviflow-out-stock text-white"
                            onClick={() => handleReject(request)}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {currentRequests.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-taviflow-muted">
                    No requests found matching the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="text-taviflow-muted text-sm">
            Showing {currentRequests.length} of {filteredRequests.length} requests
          </div>
          
          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeRequests;
