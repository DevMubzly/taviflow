
/**
 * Inventory Summary Table Component
 * 
 * This component displays a tabular view of inventory items with key information.
 * It includes product details, stock levels, pricing, and status indicators,
 * along with action buttons for viewing, editing, and deleting items.
 */

import { useState, useEffect } from "react";
import { Package, MoreVertical, Edit, Trash, Eye, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Pagination from "@/components/common/Pagination";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: string;
  buyingPrice?: string;
  expectedProfit?: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  expiryDate?: string;
}

interface InventoryTableProps {
  items: InventoryItem[];
}

const InventoryTable = ({ items }: InventoryTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;
  
  // Filter items based on search term
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  
  // Load saved page from sessionStorage
  useEffect(() => {
    const savedPage = sessionStorage.getItem('inventory_table_page');
    if (savedPage) {
      setCurrentPage(parseInt(savedPage));
    }
  }, []);
  
  // Save current page to session storage when it changes
  useEffect(() => {
    sessionStorage.setItem('inventory_table_page', currentPage.toString());
  }, [currentPage]);
  
  // Ensure current page is valid when items change
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [items, currentPage, totalPages]);
  
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusClass = (status: string) => {
    switch (status) {
      case "In Stock":
        return "status-in-stock";
      case "Low Stock":
        return "status-low-stock";
      case "Out of Stock":
        return "status-out-stock";
      default:
        return "";
    }
  };

  // Check if a product is expiring soon (within 30 days)
  const isExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false;
    
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 && diffDays <= 30;
  };

  // Check if a product is expired
  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    
    const today = new Date();
    const expiry = new Date(expiryDate);
    
    return expiry < today;
  };

  const handleView = (item: InventoryItem) => {
    toast.info(`Viewing details for ${item.name}`);
  };

  const handleEdit = (item: InventoryItem) => {
    toast.info(`Editing ${item.name}`);
  };

  const handleDelete = (item: InventoryItem) => {
    toast.info(`Deleting ${item.name}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div className="glass-card p-0 overflow-hidden animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b border-taviflow-border">
        <div className="flex items-center gap-2 mb-3 sm:mb-0">
          <Package className="w-5 h-5 text-taviflow-primary" />
          <h3 className="font-medium">Inventory Items</h3>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search inventory..."
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <Button className="primary-button w-full sm:w-auto">Add Product</Button>
        </div>
      </div>
      
      <div className="mobile-data-container">
        <table className="data-table mobile-data-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>In Stock</th>
              <th>Buying Price</th>
              <th>Selling Price</th>
              <th>Expected Profit</th>
              <th>Expiry Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id} className="animate-fade-in" style={{ animationDelay: `${parseInt(item.id) * 50}ms` }}>
                <td className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-taviflow-muted" />
                  {item.name}
                </td>
                <td>{item.sku}</td>
                <td>{item.category}</td>
                <td>{item.stock}</td>
                <td>{item.buyingPrice || "N/A"}</td>
                <td>{item.price}</td>
                <td className={cn(item.expectedProfit && parseFloat(item.expectedProfit.replace(/[^0-9.-]+/g, "")) > 0 ? "text-green-600" : "text-red-600")}>
                  {item.expectedProfit || "N/A"}
                </td>
                <td>
                  {item.expiryDate ? (
                    <div className="flex items-center gap-1">
                      <Calendar className={cn(
                        "w-3.5 h-3.5",
                        isExpired(item.expiryDate) ? "text-red-500" : 
                        isExpiringSoon(item.expiryDate) ? "text-amber-500" : 
                        "text-green-500"
                      )} />
                      <span className={cn(
                        isExpired(item.expiryDate) ? "text-red-500" : 
                        isExpiringSoon(item.expiryDate) ? "text-amber-500" : 
                        ""
                      )}>
                        {item.expiryDate}
                        {isExpired(item.expiryDate) && " (Expired)"}
                        {!isExpired(item.expiryDate) && isExpiringSoon(item.expiryDate) && " (Soon)"}
                      </span>
                    </div>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>
                  <span className={cn("status-badge", getStatusClass(item.status))}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleView(item)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(item)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(item)} className="text-red-600">
                        <Trash className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
            {currentItems.length === 0 && (
              <tr>
                <td colSpan={10} className="text-center py-8">
                  No items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="p-4 border-t border-taviflow-border">
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          />
        </div>
      )}
    </div>
  );
};

export default InventoryTable;
