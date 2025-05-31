import React from 'react'
import { 
  Bell, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Settings, 
  User, 
  LogOut, 
  History,
  CreditCard,
  Star,
  HelpCircle
} from "lucide-react";
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';

const Header = () => {

    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const getPageTitle = () => {
      const path = pathname.split("/")[1];
      if(!path) return "Dashboard";
      return path
        .replace(/[-_]/g, " ")
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/\b\w/g, (c) => c.toUpperCase());
    }

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
    const toggleNotifications = () => setShowNotifications(!showNotifications);

    const handleLogout = async () => {
      try{
        toast.success("You have been logged out successfully")
      }catch(error){
        console.error('Error logging out: ', error)
        toast.error('Failed to log out')
      }
      setIsProfileOpen(false)
      }
    
      const handleUpgradeSubscription = () => {
        toast.success('Redirecting to subscription options... This would typically connect to a payment gateway to upgrade the subscriptions', {
          duration: 5000
        })
        setIsProfileOpen(false)
      }
    
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 md:px-6 sticky top-0 z-30 w-full shadow-sm">
      <div className="flex items-center justify-between w-full">
        {/* Left: Logo and Title */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center">
              <span className="text-white font-bold">TF</span>
            </div>
            <span className="font-bold text-taviflow-dark hidden md:block">TaviFlow</span>
          </Link>
          
          <div className="hidden md:block h-6 w-[1px] bg-gray-300 mx-3"></div>
          
          <h1 className="text-lg font-medium text-taviflow-dark hidden md:block">
            {getPageTitle()}
          </h1>
        </div>
        
        {/* Center: Search on larger screens */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 text-sm"
            />
          </div>
        </div>
        
        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="relative text-gray-600 hover:text-purple-600"
              onClick={toggleNotifications}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-40">
                <div className="p-3 border-b border-gray-200">
                  <h3 className="font-medium text-gray-800">Notifications</h3>
                </div>
                <div className="max-h-[320px] overflow-y-auto">
                  <div className="p-4 hover:bg-gray-50 border-b border-gray-100">
                    <p className="text-sm font-medium">New order received</p>
                    <p className="text-xs text-gray-500 mt-1">Order #12345 was placed just now</p>
                    <p className="text-xs text-gray-400 mt-2">2 minutes ago</p>
                  </div>
                  <div className="p-4 hover:bg-gray-50 border-b border-gray-100">
                    <p className="text-sm font-medium">Inventory alert</p>
                    <p className="text-xs text-gray-500 mt-1">3 items are now out of stock</p>
                    <p className="text-xs text-gray-400 mt-2">1 hour ago</p>
                  </div>
                  <div className="p-4 hover:bg-gray-50">
                    <p className="text-sm font-medium">System update completed</p>
                    <p className="text-xs text-gray-500 mt-1">Version 2.3.0 has been deployed</p>
                    <p className="text-xs text-gray-400 mt-2">Yesterday</p>
                  </div>
                </div>
                <div className="p-2 border-t border-gray-200">
                  <button className="text-xs text-center text-purple-600 hover:text-purple-800 w-full py-1">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* User Profile */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-gray-700 hover:text-purple-600"
              onClick={toggleProfile}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center text-white font-medium overflow-hidden">
                  <img 
                    className="w-full h-full object-cover"
                  />
              </div>
              <span className="hidden md:inline text-sm font-medium">
              </span>
              <ChevronDown className="h-4 w-4" />
            </Button>
            
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-40 py-2">
                <div className="p-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center text-white font-medium overflow-hidden">
                        <img 
                          className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                      </h3>
                      <p className="text-xs text-gray-500">
                        user@example.com
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-1">
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 flex items-center gap-3">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>View profile</span>
                  </button>
                  <button 
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 flex items-center gap-3"
                    onClick={handleUpgradeSubscription}
                  >
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>Manage subscriptions</span>
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 flex items-center gap-3">
                    <History className="h-4 w-4 text-gray-500" />
                    <span>View history</span>
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 flex items-center gap-3">
                    <Settings className="h-4 w-4 text-gray-500" />
                    <span>Settings</span>
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 flex items-center gap-3">
                    <HelpCircle className="h-4 w-4 text-gray-500" />
                    <span>Support</span>
                  </button>
                </div>
                <div className="pt-1 border-t border-gray-100">
                  <button 
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
                <div className="px-4 pt-2 border-t border-gray-100 mt-1">
                  <button 
                    className="w-full py-2 rounded-md text-white text-sm bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 transition-all flex items-center justify-center gap-2"
                    onClick={handleUpgradeSubscription}
                  >
                    <Star className="h-4 w-4" />
                    <span>Upgrade subscription</span>
                  </button>
                </div>
                <div className="px-4 pt-2 pb-1">
                  <p className="text-xs text-center text-gray-500">v1.23.5 • Terms and Conditions</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
