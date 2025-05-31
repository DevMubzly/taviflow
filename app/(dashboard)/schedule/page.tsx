
/**
 * Employee Schedule Page
 * 
 * This page displays work schedules for employees, showing upcoming and past shifts.
 * It provides details on shift times, locations, departments, and coworkers,
 * allowing employees to manage their work schedule efficiently.
 */
'use client'

import { useState } from "react";
import { Calendar as CalendarIcon, Clock, Users, MapPin, ChevronDown, ChevronUp, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Pagination from "@/components/common/Pagination";

interface Shift {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  department: string;
  role: string;
  coworkers: string[];
}

const Schedule = () => {
  const [expandedShift, setExpandedShift] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("upcoming");
  
  const shifts: Shift[] = [
    {
      id: "1",
      date: "2023-06-15",
      startTime: "09:00 AM",
      endTime: "05:00 PM",
      location: "Main Office",
      department: "Inventory",
      role: "Stock Manager",
      coworkers: ["Jane Smith", "Michael Brown"]
    },
    {
      id: "2",
      date: "2023-06-16",
      startTime: "10:00 AM",
      endTime: "06:00 PM",
      location: "Warehouse B",
      department: "Shipping",
      role: "Supervisor",
      coworkers: ["Emily Davis", "Robert Wilson"]
    },
    {
      id: "3",
      date: "2023-06-17",
      startTime: "08:00 AM",
      endTime: "04:00 PM",
      location: "Main Office",
      department: "Inventory",
      role: "Stock Manager",
      coworkers: ["Sarah Johnson", "David Miller"]
    },
    {
      id: "4",
      date: "2023-06-18",
      startTime: "09:00 AM",
      endTime: "05:00 PM",
      location: "Warehouse A",
      department: "Receiving",
      role: "Assistant",
      coworkers: ["Lisa Anderson", "John Doe"]
    },
    {
      id: "5",
      date: "2023-06-19",
      startTime: "10:00 AM",
      endTime: "06:00 PM",
      location: "Main Office",
      department: "Inventory",
      role: "Stock Manager",
      coworkers: ["Michael Brown", "Emily Davis"]
    },
    {
      id: "6",
      date: "2023-06-20",
      startTime: "08:00 AM",
      endTime: "04:00 PM",
      location: "Warehouse B",
      department: "Shipping",
      role: "Supervisor",
      coworkers: ["Robert Wilson", "Sarah Johnson"]
    },
    {
      id: "7",
      date: "2023-06-21",
      startTime: "09:00 AM",
      endTime: "05:00 PM",
      location: "Main Office",
      department: "Inventory",
      role: "Stock Manager",
      coworkers: ["David Miller", "Lisa Anderson"]
    }
  ];
  
  const pastShifts = [
    {
      id: "p1",
      date: "2023-06-10",
      startTime: "09:00 AM",
      endTime: "05:00 PM",
      location: "Main Office",
      department: "Inventory",
      role: "Stock Manager",
      coworkers: ["Jane Smith", "Michael Brown"]
    },
    {
      id: "p2",
      date: "2023-06-11",
      startTime: "10:00 AM",
      endTime: "06:00 PM",
      location: "Warehouse A",
      department: "Receiving",
      role: "Assistant",
      coworkers: ["Emily Davis", "Robert Wilson"]
    },
    {
      id: "p3",
      date: "2023-06-12",
      startTime: "08:00 AM",
      endTime: "04:00 PM",
      location: "Main Office",
      department: "Inventory",
      role: "Stock Manager",
      coworkers: ["Sarah Johnson", "David Miller"]
    }
  ];
  
  const itemsPerPage = 4;
  const currentShifts = activeTab === "upcoming" ? shifts : pastShifts;
  const totalPages = Math.ceil(currentShifts.length / itemsPerPage);
  const displayedShifts = currentShifts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const toggleShift = (id: string) => {
    if (expandedShift === id) {
      setExpandedShift(null);
    } else {
      setExpandedShift(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Work Schedule</h1>
          <p className="text-taviflow-muted">View your upcoming and past shifts</p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </Button>
          <Button className="primary-button flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            <span>Calendar View</span>
          </Button>
        </div>
      </div>
      
      <div className="glass-card">
        <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
          <div className="p-4 border-b border-taviflow-border">
            <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-2 gap-2">
              <TabsTrigger value="upcoming">Upcoming Shifts</TabsTrigger>
              <TabsTrigger value="past">Past Shifts</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="upcoming" className="p-0">
            <div className="space-y-4 p-4">
              {displayedShifts.map((shift) => (
                <div key={shift.id} className="border border-taviflow-border rounded-lg overflow-hidden animate-fade-in">
                  <div 
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 cursor-pointer hover:bg-taviflow-primary/5"
                    onClick={() => toggleShift(shift.id)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2 md:mb-0">
                      <div className="bg-taviflow-primary/10 p-3 rounded-lg text-center min-w-24">
                        <p className="text-xs text-taviflow-muted">
                          {new Date(shift.date).toLocaleDateString('en-US', { weekday: 'short' })}
                        </p>
                        <p className="text-lg font-bold">
                          {new Date(shift.date).getDate()}
                        </p>
                        <p className="text-xs">
                          {new Date(shift.date).toLocaleDateString('en-US', { month: 'short' })}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium">{shift.role}</h3>
                        <div className="flex items-center gap-1 text-taviflow-muted text-sm">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{shift.startTime} - {shift.endTime}</span>
                        </div>
                        <div className="flex items-center gap-1 text-taviflow-muted text-sm">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{shift.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      {expandedShift === shift.id ? (
                        <ChevronUp className="w-5 h-5 text-taviflow-muted" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-taviflow-muted" />
                      )}
                    </div>
                  </div>
                  
                  {expandedShift === shift.id && (
                    <div className="p-4 bg-taviflow-secondary/20 border-t border-taviflow-border">
                      <h4 className="font-medium mb-2">Shift Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-taviflow-muted mb-1">Department</p>
                          <p>{shift.department}</p>
                        </div>
                        <div>
                          <p className="text-sm text-taviflow-muted mb-1">Location</p>
                          <p>{shift.location}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-sm text-taviflow-muted mb-1">Coworkers</p>
                          <div className="flex flex-wrap gap-2">
                            {shift.coworkers.map((coworker, index) => (
                              <div key={index} className="flex items-center gap-1 bg-taviflow-primary/10 px-2 py-1 rounded text-sm">
                                <Users className="w-3.5 h-3.5" />
                                <span>{coworker}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {displayedShifts.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-taviflow-muted">No {activeTab} shifts found.</p>
                </div>
              )}
            </div>
            
            {totalPages > 1 && (
              <div className="p-4 border-t border-taviflow-border">
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={setCurrentPage} 
                />
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="p-0">
            <div className="space-y-4 p-4">
              {displayedShifts.map((shift) => (
                <div key={shift.id} className="border border-taviflow-border rounded-lg overflow-hidden animate-fade-in">
                  <div 
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 cursor-pointer hover:bg-taviflow-primary/5"
                    onClick={() => toggleShift(shift.id)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2 md:mb-0">
                      <div className="bg-taviflow-primary/10 p-3 rounded-lg text-center min-w-24">
                        <p className="text-xs text-taviflow-muted">
                          {new Date(shift.date).toLocaleDateString('en-US', { weekday: 'short' })}
                        </p>
                        <p className="text-lg font-bold">
                          {new Date(shift.date).getDate()}
                        </p>
                        <p className="text-xs">
                          {new Date(shift.date).toLocaleDateString('en-US', { month: 'short' })}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium">{shift.role}</h3>
                        <div className="flex items-center gap-1 text-taviflow-muted text-sm">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{shift.startTime} - {shift.endTime}</span>
                        </div>
                        <div className="flex items-center gap-1 text-taviflow-muted text-sm">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{shift.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      {expandedShift === shift.id ? (
                        <ChevronUp className="w-5 h-5 text-taviflow-muted" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-taviflow-muted" />
                      )}
                    </div>
                  </div>
                  
                  {expandedShift === shift.id && (
                    <div className="p-4 bg-taviflow-secondary/20 border-t border-taviflow-border">
                      <h4 className="font-medium mb-2">Shift Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-taviflow-muted mb-1">Department</p>
                          <p>{shift.department}</p>
                        </div>
                        <div>
                          <p className="text-sm text-taviflow-muted mb-1">Location</p>
                          <p>{shift.location}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-sm text-taviflow-muted mb-1">Coworkers</p>
                          <div className="flex flex-wrap gap-2">
                            {shift.coworkers.map((coworker, index) => (
                              <div key={index} className="flex items-center gap-1 bg-taviflow-primary/10 px-2 py-1 rounded text-sm">
                                <Users className="w-3.5 h-3.5" />
                                <span>{coworker}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {displayedShifts.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-taviflow-muted">No {activeTab} shifts found.</p>
                </div>
              )}
            </div>
            
            {totalPages > 1 && (
              <div className="p-4 border-t border-taviflow-border">
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={setCurrentPage} 
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Schedule;
