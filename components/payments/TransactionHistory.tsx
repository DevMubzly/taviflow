
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const TransactionHistory = () => {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Transaction History</h2>
        <Button variant="ghost" className="text-taviflow-primary">
          View All <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
      
      <div className="mt-4 space-y-4">
        <div className="border-b border-taviflow-border pb-3">
          <div className="flex justify-between">
            <div>
              <p className="font-medium">Payment to Supplier XYZ</p>
              <p className="text-sm text-taviflow-muted">Via Bank Transfer</p>
            </div>
            <div className="text-right">
              <p className="font-medium">$1,250.00</p>
              <p className="text-xs text-taviflow-in-stock">Completed</p>
            </div>
          </div>
          <p className="text-xs text-taviflow-muted mt-2">Yesterday at 2:30 PM</p>
        </div>
        
        <div className="border-b border-taviflow-border pb-3">
          <div className="flex justify-between">
            <div>
              <p className="font-medium">Payment to Vendor ABC</p>
              <p className="text-sm text-taviflow-muted">Via MTN Mobile Money</p>
            </div>
            <div className="text-right">
              <p className="font-medium">$750.00</p>
              <p className="text-xs text-taviflow-low-stock">Pending</p>
            </div>
          </div>
          <p className="text-xs text-taviflow-muted mt-2">Today at 10:15 AM</p>
        </div>
        
        <div>
          <div className="flex justify-between">
            <div>
              <p className="font-medium">Refund from Customer</p>
              <p className="text-sm text-taviflow-muted">Via Airtel Money</p>
            </div>
            <div className="text-right">
              <p className="font-medium">$320.00</p>
              <p className="text-xs text-taviflow-in-stock">Completed</p>
            </div>
          </div>
          <p className="text-xs text-taviflow-muted mt-2">3 days ago</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
