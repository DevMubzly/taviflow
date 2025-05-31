
/**
 * Inventory Batch Actions Component
 * 
 * This component provides bulk action controls for managing selected inventory items.
 * It allows users to perform operations like update, delete, export, and print labels
 * on multiple inventory items simultaneously.
 */

import { useState } from "react";
import { 
  Package, 
  Plus, 
  Minus, 
  Trash, 
  FileText, 
  Download, 
  Upload, 
  ArrowRight,
  RotateCw,
  Tag,
  Printer,
  BarChart3,
  Clock,
  Calendar 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface InventoryBatchActionsProps {
  selectedCount: number;
  onBulkUpdate: () => void;
  onBulkDelete: () => void;
  onBulkExport: () => void;
  onPeriodReset?: (period: "month" | "quarter" | "year") => void;
}

const InventoryBatchActions = ({ 
  selectedCount,
  onBulkUpdate,
  onBulkDelete,
  onBulkExport,
  onPeriodReset
}: InventoryBatchActionsProps) => {
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [enableBatchActions, setEnableBatchActions] = useState(true);
  
  const handlePeriodReset = (period: "month" | "quarter" | "year") => {
    if (onPeriodReset) {
      onPeriodReset(period);
    } else {
      toast.info(`Would reset ${period} data if handler was implemented`);
    }
    setResetDialogOpen(false);
  };
  
  const handleToggleChange = (checked: boolean) => {
    setEnableBatchActions(checked);
    toast.info(checked ? "Batch actions enabled" : "Batch actions disabled");
  };
  
  return (
    <>
      <div className="bg-taviflow-primary/5 rounded-md p-2 mb-3 flex flex-wrap items-center gap-2">
        {selectedCount > 0 ? (
          <div className="bg-taviflow-primary/20 text-taviflow-primary rounded-md px-2 py-1 text-xs font-medium">
            {selectedCount} items selected
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="h-7 text-xs bg-gradient-to-r from-purple-500 to-purple-600 text-white border-none hover:from-purple-600 hover:to-purple-700"
              onClick={() => setResetDialogOpen(true)}
            >
              <Clock className="mr-1 h-3 w-3" />
              Period Management
            </Button>
            
            <div className="flex items-center ml-2 space-x-2">
              <span className="text-xs text-purple-700">Batch Actions</span>
              <Switch 
                checked={enableBatchActions} 
                onCheckedChange={handleToggleChange} 
                className="data-[state=checked]:bg-purple-600"
              />
            </div>
          </div>
        )}
        
        {selectedCount > 0 && enableBatchActions && (
          <div className="flex flex-wrap gap-1.5 ml-auto">
            <Button size="sm" variant="outline" className="h-7 text-xs">
              <Tag className="mr-1 h-3 w-3" />
              Apply Tags
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-xs">
              <Plus className="mr-1 h-3 w-3" />
              Add Stock
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-xs">
              <Minus className="mr-1 h-3 w-3" />
              Remove Stock
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={onBulkUpdate}>
              <RotateCw className="mr-1 h-3 w-3" />
              Update
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={onBulkExport}>
              <Download className="mr-1 h-3 w-3" />
              Export
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-xs">
              <Printer className="mr-1 h-3 w-3" />
              Print Labels
            </Button>
            <Button size="sm" variant="destructive" className="h-7 text-xs" onClick={onBulkDelete}>
              <Trash className="mr-1 h-3 w-3" />
              Delete
            </Button>
          </div>
        )}
      </div>
      
      <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Period Management</DialogTitle>
            <DialogDescription>
              Select a period to generate reports and reset earnings statistics. 
              This action creates a snapshot of the current data but doesn't delete any records.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant="outline"
                className="flex flex-col items-center justify-center h-24 hover:bg-purple-50 hover:border-purple-300"
                onClick={() => handlePeriodReset("month")}
              >
                <Calendar className="h-8 w-8 mb-2 text-purple-500" />
                <span className="text-sm font-medium">End of Month</span>
              </Button>
              
              <Button 
                variant="outline"
                className="flex flex-col items-center justify-center h-24 hover:bg-purple-50 hover:border-purple-300"
                onClick={() => handlePeriodReset("quarter")}
              >
                <BarChart3 className="h-8 w-8 mb-2 text-purple-500" />
                <span className="text-sm font-medium">End of Quarter</span>
              </Button>
              
              <Button 
                variant="outline"
                className="flex flex-col items-center justify-center h-24 hover:bg-purple-50 hover:border-purple-300"
                onClick={() => handlePeriodReset("year")}
              >
                <FileText className="h-8 w-8 mb-2 text-purple-500" />
                <span className="text-sm font-medium">End of Year</span>
              </Button>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setResetDialogOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InventoryBatchActions;
