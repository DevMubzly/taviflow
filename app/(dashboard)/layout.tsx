"use client"; // Ensure this is at the top

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Correct hook
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";


const getPageTitle = (pathname: string) => {
  const path = pathname.split("/")[1] || "dashboard";

  switch (path) {
    case "dashboard":
      return "Dashboard";
    case "inventory":
      return "Inventory";
    case "orders":
      return "Orders";
    case "payments":
      return "Payments";
    case "reports":
      return "Reports";
    case "settings":
      return "Settings";
    case "users":
      return "User Management";
    case "database":
      return "Database";
    case "requests":
      return "Employee Requests";
    case "schedule":
      return "Employee Schedule";
    case "admin":
      return "Admin Panel";
    case "employee-features":
      return "Employee Features";
    case "admin-features":
      return "Admin Features";
    case "tax-calculator":
      return "Tax Calculator";
    case "expenses":
      return "Expenses";
    default:
      return "Inventory Hub";
  }
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const pageTitle = getPageTitle(pathname);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkWindowSize = () => {
      const isMobile = window.innerWidth < 768; // Checking if screen is in mobile view
      setIsMobileView(isMobile);

      if (!isMobile && isSidebarOpen) {
        // Closing the mobile sidebar when switching to desktop view
        setIsSidebarOpen(false);
      }
    };

    checkWindowSize();
    window.addEventListener("resize", checkWindowSize);

    return () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    const storedState = localStorage.getItem("sidebarCollapsed");
    if (storedState !== null) {
      setSidebarCollapsed(JSON.parse(storedState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);

  const toggleDesktopSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop sidebar - hidden on mobile devices */}
      <div
        className={`hidden md:block transition-all duration-300 ${
          sidebarCollapsed ? "w-16" : "w-60"
        }`}
      >
        <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleDesktopSidebar} />
      </div>

      {/* Mobile Sidebar */}
      {isMobileView && isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={toggleMobileSidebar} />
          <div className="relative w-[250px] h-full animate-slide-in-left bg-white">
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-purple-800"
                onClick={toggleMobileSidebar}
              >
                <X size={20} />
              </Button>
            </div>
            <Sidebar collapsed={false} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        {/* Mobile sidebar toggle button */}
        {isMobileView && (
          <div className="p-2 absolute top-2 left-2 z-40">
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 bg-white/80 backdrop-blur-sm border border-purple-100 rounded-lg text-purple-800 shadow-sm"
              onClick={toggleMobileSidebar}
            >
              <Menu size={20} />
            </Button>
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <h1 className="text-2xl font-bold mb-6 text-purple-800">{pageTitle}</h1>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
