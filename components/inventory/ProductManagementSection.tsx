
/**
 * Product Management Section Component
 * 
 * This component provides dual forms for adding and removing products from inventory.
 * It features barcode scanning capability for both operations and streamlines
 * the product management workflow with support for batch operations.
 */

import { useState } from "react";
import { 
  Package, 
  Barcode, 
  ArrowDown, 
  ArrowUp, 
  ScanLine, 
  XCircle, 
  Plus,
  Trash,
  CheckSquare,
  Square,
  ShoppingCart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import InventoryQuickAdd from "./InventoryQuickAdd";
import BarcodeScanner from "./BarcodeScanner";

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  stock: number;
  price: string;
  buyingPrice: string;
  barcode?: string;
}

interface BatchProductItem {
  id?: string;
  name: string;
  sku: string;
  category?: string;
  quantity: number;
  price: string;
  buyingPrice: string;
  selected?: boolean;
}

interface ProductManagementSectionProps {
  inventoryItems: InventoryItem[];
  onAddItem: (item: {
    name: string;
    sku: string;
    category: string;
    stock: number;
    price: string;
    buyingPrice: string;
  }) => void;
  onRemoveItem: (itemIds: string[], quantity: number, salePrice: number) => void;
}

const ProductManagementSection = ({ 
  inventoryItems, 
  onAddItem, 
  onRemoveItem 
}: ProductManagementSectionProps) => {
  const [showScanner, setShowScanner] = useState<"add" | "remove" | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [removeQuantity, setRemoveQuantity] = useState(1);
  
  // Batch adding products state
  const [batchAddItems, setBatchAddItems] = useState<BatchProductItem[]>([{
    name: "",
    sku: "",
    category: "Electronics",
    quantity: 1,
    price: "",
    buyingPrice: ""
  }]);
  
  // Batch removing products state
  const [batchRemoveItems, setBatchRemoveItems] = useState<BatchProductItem[]>([]);
  const [selectedForRemoval, setSelectedForRemoval] = useState<string[]>([]);
  
  const filteredItems = inventoryItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const selectedItem = selectedItemId 
    ? inventoryItems.find(item => item.id === selectedItemId) 
    : null;
  
  const handleBarcodeDetected = (barcode: string) => {
    // Find item by barcode
    const item = inventoryItems.find(item => item.barcode === barcode);
    
    if (item) {
      toast.success(`Found: ${item.name}`);
      
      if (showScanner === "add") {
        // Pre-fill a new batch item with this product's info
        const newItem: BatchProductItem = {
          name: item.name,
          sku: item.sku,
          quantity: 1,
          price: item.price,
          buyingPrice: item.buyingPrice
        };
        
        setBatchAddItems(prev => [...prev, newItem]);
      } else if (showScanner === "remove") {
        setSelectedItemId(item.id);
        setSelectedForRemoval(prev => [...prev, item.id]);
        
        // Add to batch remove items if not already present
        if (!batchRemoveItems.some(removeItem => removeItem.id === item.id)) {
          setBatchRemoveItems(prev => [...prev, {
            id: item.id,
            name: item.name,
            sku: item.sku,
            quantity: 1,
            price: item.price,
            buyingPrice: item.buyingPrice,
            selected: true
          }]);
        }
      }
      
      setSearchQuery("");
    } else {
      if (showScanner === "add") {
        toast.info("Product not found. You can add it as a new product.");
        // Could open a pre-filled form here
      } else {
        toast.error("No product found with this barcode");
      }
    }
    
    setShowScanner(null);
  };
  
  const handleAddBatchField = () => {
    setBatchAddItems(prev => [...prev, {
      name: "",
      sku: "",
      category: "Electronics",
      quantity: 1,
      price: "",
      buyingPrice: ""
    }]);
  };
  
  const handleUpdateBatchAddItem = (index: number, field: keyof BatchProductItem, value: string | number) => {
    setBatchAddItems(prev => 
      prev.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    );
  };
  
  const handleRemoveBatchAddItem = (index: number) => {
    setBatchAddItems(prev => 
      prev.filter((_, i) => i !== index)
    );
  };
  
  const handleBatchAddSubmit = () => {
    // Validate all items
    const invalidItems = batchAddItems.filter(
      item => !item.name || !item.sku || !item.price || !item.buyingPrice
    );
    
    if (invalidItems.length > 0) {
      toast.error("Please fill in all required fields for all products");
      return;
    }
    
    // Process each valid item
    batchAddItems.forEach(item => {
      onAddItem({
        name: item.name,
        sku: item.sku,
        category: item.category || "Electronics",
        stock: item.quantity,
        price: item.price,
        buyingPrice: item.buyingPrice
      });
    });
    
    // Reset form after submitting
    setBatchAddItems([{
      name: "",
      sku: "",
      category: "Electronics",
      quantity: 1,
      price: "",
      buyingPrice: ""
    }]);
    
    toast.success(`Added ${batchAddItems.length} product(s) to inventory`);
  };
  
  const handleToggleRemovalItem = (itemId: string) => {
    setSelectedForRemoval(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
    
    setBatchRemoveItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, selected: !item.selected } : item
      )
    );
  };
  
  const handleUpdateRemovalQuantity = (itemId: string, quantity: number) => {
    setBatchRemoveItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };
  
  const handleBatchRemoval = () => {
    if (selectedForRemoval.length === 0) {
      toast.error("Please select at least one product");
      return;
    }
    
    // Process removal for each selected item
    batchRemoveItems
      .filter(item => item.selected && item.id)
      .forEach(item => {
        if (!item.id) return;
        
        const inventoryItem = inventoryItems.find(invItem => invItem.id === item.id);
        if (!inventoryItem) return;
        
        if (inventoryItem.stock < item.quantity) {
          toast.error(`Not enough stock for ${item.name}. Only ${inventoryItem.stock} available.`);
          return;
        }
        
        onRemoveItem(
          [item.id], 
          item.quantity, 
          parseFloat(item.price.replace(/[^0-9.-]+/g, ""))
        );
      });
    
    // Reset form after submitting
    setBatchRemoveItems([]);
    setSelectedForRemoval([]);
    setSearchQuery("");
    
    toast.success("Removed selected products from inventory");
  };
  
  const handleAddToRemovalList = (item: InventoryItem) => {
    if (batchRemoveItems.some(removeItem => removeItem.id === item.id)) {
      toast.info("This item is already in the removal list");
      return;
    }
    
    setBatchRemoveItems(prev => [...prev, {
      id: item.id,
      name: item.name,
      sku: item.sku,
      quantity: 1,
      price: item.price,
      buyingPrice: item.buyingPrice,
      selected: true
    }]);
    
    setSelectedForRemoval(prev => [...prev, item.id]);
    setSearchQuery("");
  };
  
  return (
    <div className="mb-6 glass-card p-4 animate-fade-in bg-white/90 backdrop-blur-sm shadow-sm border-purple-200">
      <h3 className="text-lg font-medium text-purple-800 mb-4 flex items-center">
        <Package className="mr-2 h-5 w-5 text-purple-600" />
        Product Management
      </h3>
      
      {showScanner && (
        <div className="mb-4 bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium text-purple-800">
              {showScanner === "add" ? "Scan to Add/Find Product" : "Scan to Remove Product"}
            </h4>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowScanner(null)}
              className="text-purple-700 hover:bg-purple-200/50"
            >
              <XCircle className="w-4 h-4" />
            </Button>
          </div>
          <BarcodeScanner onDetected={handleBarcodeDetected} />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Add Products Column */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center gap-2 mb-4">
            <ArrowDown className="h-4 w-4 text-purple-600" />
            <h4 className="font-medium text-purple-800">Add Products</h4>
          </div>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="text-xs border-purple-200 text-purple-700 hover:bg-purple-100 flex-1"
                onClick={() => setShowScanner("add")}
              >
                <ScanLine className="mr-1 h-3.5 w-3.5" />
                Scan Barcode
              </Button>
              
              <InventoryQuickAdd onAddItem={onAddItem} />
            </div>
            
            {/* Batch Add Products Form */}
            <div className="space-y-3 mt-4">
              <h5 className="text-sm font-medium text-purple-700">Batch Add Products</h5>
              
              {batchAddItems.map((item, index) => (
                <div key={index} className="p-3 bg-white rounded-md border border-purple-100 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-purple-800">Product {index + 1}</span>
                    {batchAddItems.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleRemoveBatchAddItem(index)}
                        className="h-6 w-6 p-0 text-red-500 hover:bg-red-50"
                      >
                        <Trash className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor={`item-name-${index}`} className="text-xs">Name *</Label>
                      <Input 
                        id={`item-name-${index}`}
                        value={item.name} 
                        onChange={(e) => handleUpdateBatchAddItem(index, 'name', e.target.value)}
                        className="text-xs h-8"
                        placeholder="Product name"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`item-sku-${index}`} className="text-xs">SKU *</Label>
                      <Input 
                        id={`item-sku-${index}`}
                        value={item.sku} 
                        onChange={(e) => handleUpdateBatchAddItem(index, 'sku', e.target.value)}
                        className="text-xs h-8"
                        placeholder="SKU-123"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Label htmlFor={`item-quantity-${index}`} className="text-xs">Quantity *</Label>
                      <Input 
                        id={`item-quantity-${index}`}
                        type="number"
                        value={item.quantity} 
                        onChange={(e) => handleUpdateBatchAddItem(index, 'quantity', parseInt(e.target.value) || 1)}
                        className="text-xs h-8"
                        min={1}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`item-price-${index}`} className="text-xs">Price *</Label>
                      <Input 
                        id={`item-price-${index}`}
                        value={item.price} 
                        onChange={(e) => handleUpdateBatchAddItem(index, 'price', e.target.value)}
                        className="text-xs h-8"
                        placeholder="$0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`item-cost-${index}`} className="text-xs">Cost *</Label>
                      <Input 
                        id={`item-cost-${index}`}
                        value={item.buyingPrice} 
                        onChange={(e) => handleUpdateBatchAddItem(index, 'buyingPrice', e.target.value)}
                        className="text-xs h-8"
                        placeholder="$0.00"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAddBatchField}
                  className="text-xs h-8 border-purple-200 text-purple-700 hover:bg-purple-100"
                >
                  <Plus className="mr-1 h-3.5 w-3.5" />
                  Add Another Product
                </Button>
                
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleBatchAddSubmit}
                  className="text-xs h-8 bg-purple-600 hover:bg-purple-700"
                >
                  <ShoppingCart className="mr-1 h-3.5 w-3.5" />
                  Add to Inventory
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Remove Products Column */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center gap-2 mb-4">
            <ArrowUp className="h-4 w-4 text-purple-600" />
            <h4 className="font-medium text-purple-800">Remove Products</h4>
          </div>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Search product to remove..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-xs"
              />
              
              <Button 
                variant="outline" 
                className="text-xs border-purple-200 text-purple-700 hover:bg-purple-100"
                onClick={() => setShowScanner("remove")}
              >
                <Barcode className="mr-1 h-3.5 w-3.5" />
                Scan
              </Button>
            </div>
            
            {searchQuery && (
              <div className="border rounded-md max-h-[100px] overflow-y-auto bg-white">
                {filteredItems.length > 0 ? (
                  <div className="divide-y">
                    {filteredItems.map(item => (
                      <div 
                        key={item.id}
                        className={`p-2 flex items-center hover:bg-purple-50 cursor-pointer ${
                          selectedItemId === item.id ? "bg-purple-100" : ""
                        }`}
                        onClick={() => handleAddToRemovalList(item)}
                      >
                        <div className="flex-1 flex items-center gap-2">
                          <Package className="h-3.5 w-3.5 text-purple-500" />
                          <span className="text-xs">{item.name}</span>
                          <span className="text-xs text-muted-foreground">({item.stock} in stock)</span>
                        </div>
                        <span className="text-xs font-medium">{item.price}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-2 py-4 text-xs text-center text-muted-foreground">
                    No products found
                  </div>
                )}
              </div>
            )}
            
            {/* Batch Remove Products */}
            {batchRemoveItems.length > 0 && (
              <div className="space-y-3">
                <h5 className="text-sm font-medium text-purple-700">Selected for Removal</h5>
                
                <div className="max-h-[200px] overflow-y-auto space-y-2">
                  {batchRemoveItems.map((item) => (
                    <div 
                      key={item.id} 
                      className={`p-3 bg-white rounded-md border ${
                        item.selected ? 'border-purple-300' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => item.id && handleToggleRemovalItem(item.id)}
                          className="flex-shrink-0"
                        >
                          {item.selected ? (
                            <CheckSquare className="h-4 w-4 text-purple-600" />
                          ) : (
                            <Square className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                        
                        <div className="flex-1">
                          <div className="text-xs font-medium">{item.name}</div>
                          <div className="text-xs text-gray-500">{item.sku}</div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(e) => item.id && handleUpdateRemovalQuantity(
                              item.id, 
                              parseInt(e.target.value) || 1
                            )}
                            className="w-16 text-xs h-7"
                          />
                          <span className="text-xs text-gray-500">units</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleBatchRemoval}
                  disabled={selectedForRemoval.length === 0}
                  className="text-xs h-8 bg-purple-600 hover:bg-purple-700 w-full mt-2"
                >
                  Remove {selectedForRemoval.length} Selected Product(s)
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagementSection;
