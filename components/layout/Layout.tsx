import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case "/":
    case "/dashboard":
      return "Dashboard";
    case "/inventory":
      return "Inventory";
    case "/orders":
      return "Orders";
    case "/payments":
      return "Payments";
    case "/reports":
      return "Reports";
    case "/settings":
      return "Settings";
    case "/users":
      return "User Management";
    case "/database":
      return "Database";
    case "/requests":
      return "Employee Requests";
    case "/schedule":
      return "Employee Schedule";
    case "/admin":
      return "Admin Panel";
    case "/employee-features":
      return "Employee Features";
    case "/admin-features":
      return "Admin Features";
    case "/tax-calculator":
      return "Tax Calculator";
    case "/expenses":
      return "Expenses";
    default:
      return "Inventory Hub";
  }
};

const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  // Check if the screen is in mobile view
  useEffect(() => {
    const checkWindowSize = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileView(isMobile);
      
      // Close mobile sidebar when switching to desktop
      if (!isMobile && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
    
    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);
    
    return () => {
      window.removeEventListener('resize', checkWindowSize);
    };
  }, [isSidebarOpen]);

  // Load stored sidebar state from localStorage on component mount
  useEffect(() => {
    const storedState = localStorage.getItem('sidebarCollapsed');
    if (storedState !== null) {
      setSidebarCollapsed(JSON.parse(storedState));
    }
  }, []);
  
  // Save sidebar state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);

  const toggleDesktopSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop sidebar - hidden on mobile */}
      <div className={`hidden md:block transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-60'}`}>
        <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleDesktopSidebar} />
      </div>
      
      {/* Mobile sidebar */}
      {isMobileView && isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={toggleMobileSidebar}
          />
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
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
