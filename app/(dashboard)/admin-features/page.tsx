
'use client'

import { Button } from "@/components/ui/button"
import { Users, Database, Settings, Package, UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminFeaturesDashboard() {
  const router = useRouter()
  
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold mb-1">Admin Features</h1>
        <p className="text-taviflow-muted text-sm">Advanced tools for administrators</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-5 flex flex-col items-center text-center gap-3 hover:shadow-md transition-all cursor-pointer">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center">
            <Users className="w-7 h-7 text-white" />
          </div>
          <h3 className="font-medium text-base">User Management</h3>
          <p className="text-taviflow-muted text-sm">Add, edit, and manage system users</p>
          <Button className="primary-button mt-auto text-sm h-8" onClick={() => router.push('/users')}>Access</Button>
        </div>
        
        <div className="glass-card p-5 flex flex-col items-center text-center gap-3 hover:shadow-md transition-all cursor-pointer">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center">
            <Database className="w-7 h-7 text-white" />
          </div>
          <h3 className="font-medium text-base">Database Management</h3>
          <p className="text-taviflow-muted text-sm">Configure and optimize database settings</p>
          <Button className="primary-button mt-auto text-sm h-8" onClick={() => router.push('/database')}>Access</Button>
        </div>
        
        <div className="glass-card p-5 flex flex-col items-center text-center gap-3 hover:shadow-md transition-all cursor-pointer">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center">
            <Settings className="w-7 h-7 text-white" />
          </div>
          <h3 className="font-medium text-base">System Settings</h3>
          <p className="text-taviflow-muted text-sm">Configure global system preferences</p>
          <Button className="primary-button mt-auto text-sm h-8" onClick={() => router.push('/settings')}>Access</Button>
        </div>
      </div>
      
      <div className="glass-card p-4">
        <h2 className="font-medium text-base mb-3">Admin Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <h3 className="text-xs font-semibold uppercase text-taviflow-muted mb-2">System Health</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Database Status</span>
                <span className="text-taviflow-in-stock font-medium text-sm">Healthy</span>
              </div>
              <div className="h-1.5 bg-taviflow-secondary rounded-full">
                <div className="h-1.5 bg-taviflow-in-stock rounded-full" style={{ width: '95%' }}></div>
              </div>
              
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm">Server Load</span>
                <span className="text-taviflow-in-stock font-medium text-sm">Normal</span>
              </div>
              <div className="h-1.5 bg-taviflow-secondary rounded-full">
                <div className="h-1.5 bg-taviflow-in-stock rounded-full" style={{ width: '65%' }}></div>
              </div>
              
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm">Storage Usage</span>
                <span className="text-taviflow-low-stock font-medium text-sm">Warning</span>
              </div>
              <div className="h-1.5 bg-taviflow-secondary rounded-full">
                <div className="h-1.5 bg-taviflow-low-stock rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xs font-semibold uppercase text-taviflow-muted mb-2">Recent Activity</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-taviflow-primary/10 flex items-center justify-center text-taviflow-primary mt-0.5">
                  <UserPlus className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs">New user <span className="font-medium">Robert Wilson</span> was added to the system</p>
                  <p className="text-[10px] text-taviflow-muted">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-taviflow-primary/10 flex items-center justify-center text-taviflow-primary mt-0.5">
                  <Settings className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs">System settings were updated by <span className="font-medium">Admin</span></p>
                  <p className="text-[10px] text-taviflow-muted">Yesterday</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-taviflow-primary/10 flex items-center justify-center text-taviflow-primary mt-0.5">
                  <Database className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs">Database backup completed successfully</p>
                  <p className="text-[10px] text-taviflow-muted">3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
