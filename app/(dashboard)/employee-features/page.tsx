
'use client'

import { Button } from "@/components/ui/button"
import { FileText, Calendar, BarChart } from "lucide-react"
import { useRouter } from "next/navigation"

export default function EmployeeFeaturesDashboard() {
  const router = useRouter()
  
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold mb-1">Employee Features</h1>
        <p className="text-taviflow-muted text-sm">Tools and features for staff members</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-5 flex flex-col items-center text-center gap-3 hover:shadow-md transition-all cursor-pointer">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <h3 className="font-medium text-base">Employee Requests</h3>
          <p className="text-taviflow-muted text-sm">Submit and track leave, equipment, and overtime requests</p>
          <Button className="primary-button mt-auto text-sm h-8" onClick={() => router.push('/requests')}>Access</Button>
        </div>
        
        <div className="glass-card p-5 flex flex-col items-center text-center gap-3 hover:shadow-md transition-all cursor-pointer">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center">
            <Calendar className="w-7 h-7 text-white" />
          </div>
          <h3 className="font-medium text-base">Work Schedule</h3>
          <p className="text-taviflow-muted text-sm">View your shifts and schedules</p>
          <Button className="primary-button mt-auto text-sm h-8" onClick={() => router.push('/schedule')}>Access</Button>
        </div>
        
        <div className="glass-card p-5 flex flex-col items-center text-center gap-3 hover:shadow-md transition-all cursor-pointer">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center">
            <BarChart className="w-7 h-7 text-white" />
          </div>
          <h3 className="font-medium text-base">Performance</h3>
          <p className="text-taviflow-muted text-sm">Track your performance metrics and goals</p>
          <Button className="primary-button mt-auto text-sm h-8" onClick={() => router.push('/performance')}>Access</Button>
        </div>
      </div>
      
      <div className="glass-card p-4">
        <h2 className="font-medium text-base mb-3">Recent Announcements</h2>
        
        <div className="space-y-3">
          <div className="p-3 border-l-4 border-taviflow-primary bg-taviflow-primary/5 rounded">
            <div className="flex justify-between">
              <h3 className="font-medium text-sm">Holiday Schedule Update</h3>
              <span className="text-xs text-taviflow-muted">2 days ago</span>
            </div>
            <p className="text-xs mt-1">
              Please note that the office will be closed during the upcoming holidays. Submit your leave requests early.
            </p>
          </div>
          
          <div className="p-3 border-l-4 border-taviflow-primary bg-taviflow-primary/5 rounded">
            <div className="flex justify-between">
              <h3 className="font-medium text-sm">New Inventory System Training</h3>
              <span className="text-xs text-taviflow-muted">1 week ago</span>
            </div>
            <p className="text-xs mt-1">
              All staff are required to complete the new inventory system training by the end of the month.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
