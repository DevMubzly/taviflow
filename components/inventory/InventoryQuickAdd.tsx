
/**
 * Inventory Quick Add Component
 * 
 * This component provides a dialog for quickly adding new inventory items.
 * It includes fields for all essential inventory details including buying price
 * for profit calculation and optional expiry date.
 */

import { useState } from "react";
import { Plus, Package, DollarSign, Hash, Tag, ShoppingBag, Calendar } from "lucide-react";
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
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface InventoryQuickAddProps {
  onAddItem: (item: {
    name: string;
    sku: string;
    category: string;
    stock: number;
    price: string;
    buyingPrice: string;
    expiryDate?: string;
  }) => void;
}

const InventoryQuickAdd = ({ onAddItem }: InventoryQuickAddProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [stock, setStock] = useState(1);
  const [price, setPrice] = useState("");
  const [buyingPrice, setBuyingPrice] = useState("");
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(undefined);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !sku || !price || !buyingPrice) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Validate prices
    const sellingPrice = parseFloat(price);
    const costPrice = parseFloat(buyingPrice);
    
    if (isNaN(sellingPrice) || isNaN(costPrice)) {
      toast.error("Please enter valid prices");
      return;
    }
    
    if (costPrice >= sellingPrice) {
      toast.warning("Buying price should be less than selling price for profit");
    }
    
    onAddItem({
      name,
      sku,
      category,
      stock,
      price: price.startsWith('$') ? price : `$${price}`,
      buyingPrice: buyingPrice.startsWith('$') ? buyingPrice : `$${buyingPrice}`,
      expiryDate: expiryDate ? format(expiryDate, 'yyyy-MM-dd') : undefined
    });
    
    // Reset form
    setName("");
    setSku("");
    setCategory("Electronics");
    setStock(1);
    setPrice("");
    setBuyingPrice("");
    setExpiryDate(undefined);
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="text-xs h-8 px-2 bg-taviflow-primary hover:bg-taviflow-primary/90 text-white"
        >
          <Plus className="mr-1 h-3.5 w-3.5" />
          <span>Add Product</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Inventory Item</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-3 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name*</Label>
            <div className="relative">
              <Package className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                id="name" 
                placeholder="Wireless Mouse"
                className="pl-8"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="sku">SKU*</Label>
              <div className="relative">
                <Hash className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="sku" 
                  placeholder="MS-2023"
                  className="pl-8"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <div className="relative">
                <Tag className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <select
                  id="category"
                  className="w-full h-9 rounded-md border border-input bg-transparent pl-8 pr-3 py-1 text-sm"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Storage">Storage</option>
                  <option value="Audio">Audio</option>
                  <option value="Networking">Networking</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <div className="relative">
                <ShoppingBag className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="stock" 
                  type="number"
                  min="0"
                  className="pl-8"
                  value={stock}
                  onChange={(e) => setStock(parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="buying-price">Buying Price*</Label>
              <div className="relative">
                <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="buying-price" 
                  placeholder="15.50"
                  className="pl-8"
                  value={buyingPrice}
                  onChange={(e) => setBuyingPrice(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="selling-price">Selling Price*</Label>
              <div className="relative">
                <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="selling-price" 
                  placeholder="29.99"
                  className="pl-8"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="expiry-date">Expiry Date (Optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="expiry-date"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !expiryDate && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {expiryDate ? format(expiryDate, "PPP") : <span>Select expiry date (optional)</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={expiryDate}
                  onSelect={setExpiryDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {price && buyingPrice && (
            <div className="rounded-md bg-muted p-3 text-sm">
              <div className="font-medium">Profit Calculation</div>
              <div className="mt-1 text-muted-foreground">
                {(() => {
                  try {
                    const sellingPrice = parseFloat(price.replace(/[^0-9.-]+/g, ""));
                    const costPrice = parseFloat(buyingPrice.replace(/[^0-9.-]+/g, ""));
                    const profit = sellingPrice - costPrice;
                    const margin = (profit / sellingPrice) * 100;
                    
                    if (isNaN(sellingPrice) || isNaN(costPrice)) {
                      return <p>Enter valid prices to calculate profit</p>;
                    }
                    
                    if (costPrice >= sellingPrice) {
                      return <p className="text-red-500">Warning: No profit with current prices!</p>;
                    }
                    
                    return (
                      <>
                        <p>Expected profit: <span className="text-green-600 font-medium">${profit.toFixed(2)}</span></p>
                        <p>Profit margin: <span className="text-green-600 font-medium">{margin.toFixed(1)}%</span></p>
                      </>
                    );
                  } catch (e) {
                    return <p>Enter valid prices to calculate profit</p>;
                  }
                })()}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button type="submit">Add to Inventory</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryQuickAdd;
