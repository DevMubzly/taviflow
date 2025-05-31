
/**
 * Inventory Removal Form Component
 * 
 * This component provides a form interface for recording inventory items that have been 
 * removed or sold from stock. It updates the inventory records automatically.
 */

import { useState } from "react";
import { 
  Package, 
  Minus, 
  FileText, 
  DollarSign,
  Search,
  Check,
  Trash
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  stock: number;
  price: string;
  buyingPrice?: string;
}

interface InventoryRemovalFormProps {
  inventoryItems: InventoryItem[];
  onItemRemoved: (itemIds: string[], quantity: number, salePrice: number) => void;
}

const InventoryRemovalForm = ({ inventoryItems, onItemRemoved }: InventoryRemovalFormProps) => {
  const [open, setOpen] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [actualSalePrice, setActualSalePrice] = useState("");
  const [removalReason, setRemovalReason] = useState("sale");
  const [searchQuery, setSearchQuery] = useState("");
  const [bulkMode, setBulkMode] = useState(false);
  
  const filteredItems = inventoryItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedItems = inventoryItems.filter(item => selectedItemIds.includes(item.id));
  
  const handleItemSelect = (itemId: string) => {
    setSelectedItemIds(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  const handleSingleItemSelect = (itemId: string) => {
    if (!bulkMode) {
      setSelectedItemIds([itemId]);
    } else {
      handleItemSelect(itemId);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedItemIds.length === 0) {
      toast.error("Please select at least one product");
      return;
    }
    
    if (quantity <= 0) {
      toast.error("Quantity must be greater than zero");
      return;
    }
    
    // Check stock availability for all items
    for (const itemId of selectedItemIds) {
      const item = inventoryItems.find(item => item.id === itemId);
      
      if (!item) {
        toast.error("Selected item not found");
        return;
      }
      
      if (item.stock < quantity) {
        toast.error(`Not enough stock for ${item.name}. Only ${item.stock} available.`);
        return;
      }
    }

    // For bulk operations, use the first selected item's price for calculation
    const firstItem = inventoryItems.find(item => item.id === selectedItemIds[0]);
    
    if (!firstItem) {
      toast.error("Error processing removal");
      return;
    }

    // Convert price strings to numbers for calculation
    const sale = actualSalePrice ? parseFloat(actualSalePrice) : parseFloat(firstItem.price.replace(/[^0-9.-]+/g, ""));
    
    // Call the parent function to update inventory
    onItemRemoved(selectedItemIds, quantity, sale);
    
    // Show success message
    toast.success(`Removed ${quantity} ${selectedItemIds.length > 1 ? 'items' : firstItem.name} from inventory`, {
      description: removalReason === "sale" ? "Sale recorded successfully" : "Inventory updated"
    });
    
    // Reset form
    setSelectedItemIds([]);
    setQuantity(1);
    setActualSalePrice("");
    setRemovalReason("sale");
    setSearchQuery("");
    setBulkMode(false);
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-xs">
          <Minus className="mr-1 h-3.5 w-3.5" />
          Record Removal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Record Inventory Removal</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="bulk-mode" 
              checked={bulkMode} 
              onCheckedChange={(checked) => {
                setBulkMode(checked === true);
                if (!checked) {
                  setSelectedItemIds(selectedItemIds.slice(0, 1));
                }
              }}
            />
            <label 
              htmlFor="bulk-mode"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Enable multi-item selection
            </label>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="product-search">Search Products</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                id="product-search" 
                placeholder="Search by name or SKU"
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="border rounded-md max-h-[200px] overflow-y-auto">
            {filteredItems.length > 0 ? (
              <div className="divide-y">
                {filteredItems.map(item => (
                  <div 
                    key={item.id}
                    className={`p-2 flex items-center hover:bg-purple-50 cursor-pointer ${
                      selectedItemIds.includes(item.id) ? "bg-purple-100" : ""
                    }`}
                    onClick={() => handleSingleItemSelect(item.id)}
                  >
                    <div className="flex-1 flex items-center gap-2">
                      {bulkMode && (
                        <Checkbox 
                          checked={selectedItemIds.includes(item.id)} 
                          onCheckedChange={() => handleItemSelect(item.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      )}
                      <Package className="h-3.5 w-3.5 text-purple-500" />
                      <span className="text-sm">{item.name}</span>
                      <span className="text-xs text-muted-foreground">({item.stock} in stock)</span>
                    </div>
                    <span className="text-sm font-medium">{item.price}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-2 py-4 text-sm text-center text-muted-foreground">
                No products found
              </div>
            )}
          </div>
          
          {selectedItemIds.length > 0 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity (per item)</Label>
                <Input 
                  id="quantity" 
                  type="number" 
                  value={quantity} 
                  onChange={e => setQuantity(parseInt(e.target.value) || 0)}
                  min={1}
                  max={Math.min(...selectedItems.map(item => item.stock))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Removal</Label>
                <Select 
                  value={removalReason} 
                  onValueChange={setRemovalReason}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sale">Sale</SelectItem>
                    <SelectItem value="damage">Damaged/Defective</SelectItem>
                    <SelectItem value="loss">Lost/Missing</SelectItem>
                    <SelectItem value="return">Return to Supplier</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {removalReason === "sale" && (
                <div className="space-y-2">
                  <Label htmlFor="price">
                    Actual Sale Price {selectedItems.length === 1 && `(List: ${selectedItems[0].price})`}
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="price" 
                      className="pl-8"
                      placeholder={selectedItems.length === 1 ? selectedItems[0].price : "Enter sale price"}
                      value={actualSalePrice}
                      onChange={e => setActualSalePrice(e.target.value)}
                    />
                  </div>
                </div>
              )}
              
              <div className="rounded-md bg-purple-50 p-3 text-sm">
                <div className="font-medium text-purple-800">Summary</div>
                <div className="mt-1.5 space-y-1">
                  {selectedItems.map(item => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.name}</span>
                      <span>x {quantity}</span>
                    </div>
                  ))}
                  
                  {removalReason === "sale" && (
                    <p className="text-green-600 font-medium pt-2 border-t border-purple-100 mt-2">
                      Total sale value: ${(parseFloat(actualSalePrice || selectedItems[0].price.replace(/[^0-9.-]+/g, "")) * quantity * selectedItems.length).toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
          
          <DialogFooter>
            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={selectedItemIds.length === 0}
            >
              Record Removal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryRemovalForm;
