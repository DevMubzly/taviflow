
import {
  DollarSign,
  Package,
  Clock,
  CheckSquare,
  AlertCircle,
  ShoppingBag,
  Calculator,
  Wallet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Activity = {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  item: string;
  time: string;
  status: "Completed" | "Pending";
};

interface RecentActivityProps {
  activities?: Activity[];
}

const RecentActivity = ({ activities }: RecentActivityProps = {}) => {
  return (
    <div className="glass-card p-4 h-full">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium">Recent Activity</h3>
        <span className="text-taviflow-muted text-xs">Today</span>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-taviflow-primary/10 flex items-center justify-center text-taviflow-primary">
            <Package className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium">New inventory received</p>
                <p className="text-xs text-taviflow-muted">25 items added to stock</p>
              </div>
              <span className="text-[10px] text-taviflow-muted">2h ago</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
            <Clock className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium">Low stock alert</p>
                <p className="text-xs text-taviflow-muted">3 items require attention</p>
              </div>
              <span className="text-[10px] text-taviflow-muted">3h ago</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <CheckSquare className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium">Order completed</p>
                <p className="text-xs text-taviflow-muted">Order #4219 has been shipped</p>
              </div>
              <span className="text-[10px] text-taviflow-muted">5h ago</span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <ShoppingBag className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium">New order received</p>
                <p className="text-xs text-taviflow-muted">Order #4220 is ready for processing</p>
              </div>
              <span className="text-[10px] text-taviflow-muted">6h ago</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-5 space-y-2">
        <h4 className="text-xs font-medium mb-2">Quick Access</h4>
        <div className="grid grid-cols-3 gap-2">
          <Link href="/inventory">
            <Button variant="outline" size="sm" className="w-full justify-start text-xs">
              <Package className="mr-2 h-3.5 w-3.5" />
              Inventory
            </Button>
          </Link>
          <Link href="/tax-calculator">
            <Button variant="outline" size="sm" className="w-full justify-start text-xs">
              <Calculator className="mr-2 h-3.5 w-3.5" />
              Tax Calculator
            </Button>
          </Link>
          <Link href="/expenses">
            <Button variant="outline" size="sm" className="w-full justify-start text-xs">
              <Wallet className="mr-2 h-3.5 w-3.5" />
              Expenses
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
