
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  ShieldAlert, 
  DollarSign, 
  BarChart3, 
  Users, 
  Database,
  ClipboardList,
  Settings,
  Calendar,
  BarChart,
  Calculator,
  Wallet,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive: boolean;
  collapsed?: boolean;
};

interface SidebarProps {
  collapsed?: boolean;
  toggleSidebar?: () => void;
}

const SidebarItem = ({ icon, label, path, isActive, collapsed }: SidebarItemProps) => (
  <Link
    href={path}
    className={cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200",
      isActive 
        ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:text-white shadow-sm" 
        : "text-slate-600 hover:bg-purple-100 hover:text-purple-800 hover:shadow-sm",
      collapsed && "justify-center px-2"
    )}
  >
    <div className={cn(
      collapsed ? "text-center" : "", 
      !isActive && "group-hover:text-purple-700 transition-colors"
    )}>
      {icon}
    </div>
    {!collapsed && <span className="transition-colors">{label}</span>}
  </Link>
);

const Sidebar = ({ collapsed, toggleSidebar }: SidebarProps = {}) => {
  const pathName = usePathname();
  const [isMobileView, setIsMobileView] = useState(false);
  
  // Check if the screen is in mobile view
  useEffect(() => {
    const checkWindowSize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);
    
    return () => {
      window.removeEventListener('resize', checkWindowSize);
    };
  }, []);

  return (
    <aside className={cn(
      "flex flex-col border-r border-purple-100 bg-white shadow-sm transition-all duration-300",
      collapsed ? "w-16" : "w-60",
      "h-screen"
    )}>
      <div className="p-4 border-b border-purple-100 flex items-center justify-between">
        <Link href="/" className={cn("flex items-center gap-2", collapsed && "justify-center")}>
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-white font-bold text-xl">T</div>
          {!collapsed && <span className="font-bold text-lg text-purple-800">TaviFlow</span>}
        </Link>
        
        {!isMobileView && toggleSidebar && (
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-purple-100 text-purple-800 transition-colors"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent">
        <div className="py-2">
          <div className={cn(
            "text-xs font-medium uppercase text-purple-400 mb-2", 
            collapsed ? "text-center" : "px-3"
          )}>
            {!collapsed && "General"}
          </div>
          <div className="space-y-1">
            <SidebarItem 
              icon={<LayoutDashboard className="w-5 h-5" />} 
              label="Dashboard" 
              path="/dashboard" 
              isActive={pathName === "/dashboard"}
              collapsed={collapsed}
            />
            <SidebarItem 
              icon={<Package className="w-5 h-5" />} 
              label="Inventory" 
              path="/inventory" 
              isActive={pathName === "/inventory"}
              collapsed={collapsed}
            />
            <SidebarItem 
              icon={<ClipboardList className="w-5 h-5" />} 
              label="Orders" 
              path="/orders" 
              isActive={pathName === "/orders"}
              collapsed={collapsed}
            />
            <SidebarItem 
              icon={<BarChart className="w-5 h-5" />} 
              label="Stock Monitor" 
              path="/stock-monitor" 
              isActive={pathName === "/stock-monitor"}
              collapsed={collapsed}
            />
          </div>
        </div>

        <div className="py-2">
          <div className={cn(
            "text-xs font-medium uppercase text-purple-400 mb-2", 
            collapsed ? "text-center" : "px-3"
          )}>
            {!collapsed && "Finance"}
          </div>
          <div className="space-y-1">
            <SidebarItem 
              icon={<DollarSign className="w-5 h-5" />} 
              label="Payments" 
              path="/dash-payments" 
              isActive={pathName === "/dash-payments"}
              collapsed={collapsed}
            />
            <SidebarItem 
              icon={<Calculator className="w-5 h-5" />} 
              label="Tax Calculator" 
              path="/tax-calculator" 
              isActive={pathName === "/tax-calculator"}
              collapsed={collapsed}
            />
            <SidebarItem 
              icon={<Wallet className="w-5 h-5" />} 
              label="Expenses" 
              path="/expenses" 
              isActive={pathName === "/expenses"}
              collapsed={collapsed}
            />
            <SidebarItem 
              icon={<BarChart3 className="w-5 h-5" />} 
              label="Reports" 
              path="/reports" 
              isActive={pathName === "/reports"}
              collapsed={collapsed}
            />
          </div>
        </div>

        <div className="py-2">
          <div className={cn(
            "text-xs font-medium uppercase text-purple-400 mb-2", 
            collapsed ? "text-center" : "px-3"
          )}>
            {!collapsed && "Employee"}
          </div>
          <div className="space-y-1">
            <SidebarItem 
              icon={<FileText className="w-5 h-5" />} 
              label="Requests" 
              path="/requests" 
              isActive={pathName === "/requests"}
              collapsed={collapsed}
            />
            <SidebarItem 
              icon={<Calendar className="w-5 h-5" />} 
              label="Schedule" 
              path="/schedule" 
              isActive={pathName === "/schedule"}
              collapsed={collapsed}
            />
            <SidebarItem 
              icon={<FileText className="w-5 h-5" />} 
              label="Employee Features" 
              path="/employee-features" 
              isActive={pathName === "/employee-features"}
              collapsed={collapsed}
            />
          </div>
        </div>

        <div className="py-2">
          <div className={cn(
            "text-xs font-medium uppercase text-purple-400 mb-2", 
            collapsed ? "text-center" : "px-3"
          )}>
            {!collapsed && "Administration"}
          </div>
          <div className="space-y-1">
            <SidebarItem 
              icon={<ShieldAlert className="w-5 h-5" />} 
              label="Admin Panel" 
              path="/admin" 
              isActive={pathName === "/admin"}
              collapsed={collapsed}
            />
            <SidebarItem 
              icon={<Users className="w-5 h-5" />} 
              label="User Management" 
              path="/users" 
              isActive={pathName === "/users"}
              collapsed={collapsed}
            />
            <SidebarItem 
              icon={<Database className="w-5 h-5" />} 
              label="Database" 
              path="/database" 
              isActive={pathName === "/database"}
              collapsed={collapsed}
            />
            <SidebarItem 
              icon={<Settings className="w-5 h-5" />} 
              label="Settings" 
              path="/settings" 
              isActive={pathName === "/settings"}
              collapsed={collapsed}
            />
            <SidebarItem 
              icon={<FileText className="w-5 h-5" />} 
              label="Admin Features" 
              path="/admin-features" 
              isActive={pathName === "/admin-features"}
              collapsed={collapsed}
            />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
