/**
 * Inventory Management Page
 * 
 * This page provides comprehensive inventory management capabilities.
 * It includes features for viewing, searching, filtering, adding, and editing inventory items,
 * along with barcode scanning, batch operations, and inventory status reporting.
 */
'use client'

import { useState, useEffect, useCallback } from "react";
import { 
  Package, 
  AlertTriangle, 
  ShoppingBag, 
  Search, 
  Filter, 
  Plus, 
  Download,
  Upload,
  FileText,
  DollarSign,
  RefreshCw,
  Eye,
  Edit,
  Trash
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import InventoryBatchActions from "@/components/inventory/InventoryBatchActions";
import InventoryFilter from "@/components/inventory/InventoryFilter";
import ProductManagementSection from "@/components/inventory/ProductManagementSection";
import BarcodeScanner from "@/components/inventory/BarcodeScanner";
import InventoryTable from "@/components/dashboard/InventoryTable";
import Pagination from "@/components/common/Pagination";

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: string;
  buyingPrice: string;
  expectedProfit: string;
  profitMargin: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  supplier?: string;
  lastUpdated?: string;
  barcode?: string;
}

// Sample initial data - in a real app, this would come from an API
const initialInventoryItems: InventoryItem[] = [
  {
    id: "1",
    name: "Wireless Mouse",
    sku: "MS-2023",
    category: "Electronics",
    stock: 45,
    price: "$29.99",
    buyingPrice: "$15.50",
    expectedProfit: "$14.49",
    profitMargin: "48.3%",
    status: "In Stock",
    supplier: "ElectroBits Inc.",
    lastUpdated: "2023-05-10",
    barcode: "8900127482"
  },
  {
    id: "2",
    name: "USB-C Cable",
    sku: "USB-2023",
    category: "Accessories",
    stock: 12,
    price: "$14.99",
    buyingPrice: "$4.25",
    expectedProfit: "$10.74",
    profitMargin: "71.6%",
    status: "Low Stock",
    supplier: "Main Warehouse Supply Co.",
    lastUpdated: "2023-05-08",
    barcode: "8900127483"
  },
  {
    id: "3",
    name: "Keyboard",
    sku: "KB-2023",
    category: "Electronics",
    stock: 0,
    price: "$59.99",
    buyingPrice: "$32.75",
    expectedProfit: "$27.24",
    profitMargin: "45.4%",
    status: "Out of Stock",
    supplier: "ElectroBits Inc.",
    lastUpdated: "2023-05-01",
    barcode: "8900127484"
  },
  {
    id: "4",
    name: "Monitor",
    sku: "MN-2023",
    category: "Electronics",
    stock: 23,
    price: "$199.99",
    buyingPrice: "$135.00",
    expectedProfit: "$64.99",
    profitMargin: "32.5%",
    status: "In Stock",
    supplier: "Wholesale Parts Ltd.",
    lastUpdated: "2023-05-12",
    barcode: "8900127485"
  },
  {
    id: "5",
    name: "Laptop Stand",
    sku: "LS-2023",
    category: "Accessories",
    stock: 5,
    price: "$24.99",
    buyingPrice: "$10.25",
    expectedProfit: "$14.74",
    profitMargin: "59.0%",
    status: "Low Stock",
    supplier: "Main Warehouse Supply Co.",
    lastUpdated: "2023-05-07",
    barcode: "8900127486"
  },
  {
    id: "6",
    name: "Headphones",
    sku: "HP-2023",
    category: "Audio",
    stock: 34,
    price: "$79.99",
    buyingPrice: "$42.50",
    expectedProfit: "$37.49",
    profitMargin: "46.9%",
    status: "In Stock",
    supplier: "Wholesale Parts Ltd.",
    lastUpdated: "2023-05-09",
    barcode: "8900127487"
  },
  {
    id: "7",
    name: "Webcam",
    sku: "WC-2023",
    category: "Electronics",
    stock: 0,
    price: "$49.99",
    buyingPrice: "$27.75",
    expectedProfit: "$22.24",
    profitMargin: "44.5%",
    status: "Out of Stock",
    supplier: "ElectroBits Inc.",
    lastUpdated: "2023-04-28",
    barcode: "8900127488"
  },
  {
    id: "8",
    name: "External SSD",
    sku: "SSD-2023",
    category: "Storage",
    stock: 17,
    price: "$89.99",
    buyingPrice: "$55.25",
    expectedProfit: "$34.74",
    profitMargin: "38.6%",
    status: "In Stock",
    supplier: "Wholesale Parts Ltd.",
    lastUpdated: "2023-05-11",
    barcode: "8900127489"
  },
  {
    id: "9",
    name: "Phone Charger",
    sku: "PC-2023",
    category: "Accessories",
    stock: 8,
    price: "$19.99",
    buyingPrice: "$6.50",
    expectedProfit: "$13.49",
    profitMargin: "67.5%",
    status: "Low Stock",
    supplier: "Main Warehouse Supply Co.",
    lastUpdated: "2023-05-06",
    barcode: "8900127490"
  },
];

const CACHE_KEY = 'inventory_data';
const PAGE_SIZE = 5;

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [totalProfitExpected, setTotalProfitExpected] = useState("0.00");
  const [avgProfitMargin, setAvgProfitMargin] = useState("0.0");
  
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string[]>>({
    category: [],
    status: [],
    supplier: []
  });
  
  // Load cached data on mount
  useEffect(() => {
    const loadCachedData = () => {
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        
        if (cachedData) {
          setInventoryItems(JSON.parse(cachedData));
        } else {
          setInventoryItems(initialInventoryItems);
        }
      } catch (error) {
        console.error('Error loading cached data:', error);
        setInventoryItems(initialInventoryItems);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCachedData();
    
    // Restore page position from sessionStorage
    const savedPage = sessionStorage.getItem('inventory_current_page');
    if (savedPage) {
      setCurrentPage(parseInt(savedPage));
    }
  }, []);
  
  // Save to cache whenever inventory changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(CACHE_KEY, JSON.stringify(inventoryItems));
    }
  }, [inventoryItems, isLoading]);
  
  // Save current page to session storage when it changes
  useEffect(() => {
    sessionStorage.setItem('inventory_current_page', currentPage.toString());
  }, [currentPage]);
  
  const totalItems = inventoryItems.length;
  const lowStockItems = inventoryItems.filter(item => item.status === "Low Stock").length;
  const outOfStockItems = inventoryItems.filter(item => item.status === "Out of Stock").length;
  
  // Calculate profit stats on component mount or when inventory changes
  useEffect(() => {
    // Calculate expected profit from current inventory
    const totalProfit = inventoryItems.reduce((sum, item) => {
      const profitPerItem = parseFloat(item.expectedProfit.replace(/[^0-9.-]+/g, ""));
      return sum + (profitPerItem * item.stock);
    }, 0);
    
    // Calculate average profit margin
    const totalMargin = inventoryItems.reduce((sum, item) => {
      return sum + parseFloat(item.profitMargin.replace(/%/g, ""));
    }, 0);
    const avgMargin = inventoryItems.length > 0 ? totalMargin / inventoryItems.length : 0;
    
    setTotalProfitExpected(totalProfit.toFixed(2));
    setAvgProfitMargin(avgMargin.toFixed(1));
  }, [inventoryItems]);
  
  // Apply search and filters
  const filteredItems = inventoryItems.filter(item => {
    // Apply search term
    const matchesSearch = searchTerm === "" || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.barcode && item.barcode.includes(searchTerm));
    
    // Apply category filter
    const matchesCategory = 
      appliedFilters.category.length === 0 || 
      appliedFilters.category.includes(item.category.toLowerCase());
    
    // Apply status filter
    const matchesStatus = 
      appliedFilters.status.length === 0 || 
      (appliedFilters.status.includes("in-stock") && item.status === "In Stock") ||
      (appliedFilters.status.includes("low-stock") && item.status === "Low Stock") ||
      (appliedFilters.status.includes("out-of-stock") && item.status === "Out of Stock");
    
    // Apply supplier filter
    const matchesSupplier = 
      appliedFilters.supplier.length === 0 || 
      (item.supplier && appliedFilters.supplier.some(s => item.supplier?.toLowerCase().includes(s.toLowerCase())));
    
    return matchesSearch && matchesCategory && matchesStatus && matchesSupplier;
  });
  
  // Pagination logic
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  const totalPages = Math.ceil(filteredItems.length / PAGE_SIZE);
  
  // When filters change, reset to page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, appliedFilters]);
  
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(paginatedItems.map(item => item.id));
    }
    setSelectAll(!selectAll);
  };
  
  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  
  useEffect(() => {
    if (selectedItems.length === paginatedItems.length && paginatedItems.length > 0) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedItems, paginatedItems]);
  
  const handleBulkUpdate = () => {
    toast.success(`Updating ${selectedItems.length} items`);
  };
  
  const handleBulkDelete = () => {
    setInventoryItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    toast.success(`Deleted ${selectedItems.length} items`);
  };
  
  const handleBulkExport = () => {
    toast.success(`Exporting ${selectedItems.length} items`);
  };
  
  const handleFilterChange = (filters: Record<string, string[]>) => {
    setAppliedFilters(filters);
  };
  
  const handleAddItem = (item: {
    name: string;
    sku: string;
    category: string;
    stock: number;
    price: string;
    buyingPrice: string;
  }) => {
    // Calculate expected profit
    const sellingPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    const buyingPrice = parseFloat(item.buyingPrice.replace(/[^0-9.-]+/g, ""));
    const profit = sellingPrice - buyingPrice;
    const marginPercent = (profit / sellingPrice) * 100;
    
    const newItem: InventoryItem = {
      id: (inventoryItems.length + 1).toString(),
      name: item.name,
      sku: item.sku,
      category: item.category,
      stock: item.stock,
      price: `$${sellingPrice.toFixed(2)}`,
      buyingPrice: `$${buyingPrice.toFixed(2)}`,
      expectedProfit: `$${profit.toFixed(2)}`,
      profitMargin: `${marginPercent.toFixed(1)}%`,
      status: item.stock === 0 ? "Out of Stock" : item.stock <= 10 ? "Low Stock" : "In Stock",
      supplier: "Main Warehouse Supply Co.",
      lastUpdated: new Date().toISOString().split('T')[0],
      barcode: `89001274${90 + inventoryItems.length}`
    };
    
    setInventoryItems(prev => [...prev, newItem]);
    toast.success(`Added new item: ${item.name}`);
  };
  
  const handleItemRemoval = (itemIds: string[], quantity: number, salePrice: number) => {
    setInventoryItems(prev => prev.map(item => {
      if (itemIds.includes(item.id)) {
        const newStock = item.stock - quantity;
        const newStatus = newStock === 0 ? "Out of Stock" : newStock <= 10 ? "Low Stock" : "In Stock";
        
        return {
          ...item,
          stock: newStock,
          status: newStatus,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    }));
  };
  
  const handleBarcodeDetected = (barcode: string) => {
    // Check if barcode exists in inventory
    const item = inventoryItems.find(item => item.barcode === barcode);
    
    if (item) {
      toast.success(`Found item: ${item.name}`);
      setSearchTerm(barcode);
    } else {
      toast.error(`No item found with barcode: ${barcode}`);
    }
    
    setShowScanner(false);
  };
  
  const handlePeriodReset = (period: "month" | "quarter" | "year") => {
    // In a real app, this would send data to a backend and potentially reset some metrics
    const periodName = period === "month" ? "Monthly" : period === "quarter" ? "Quarterly" : "Annual";
    const date = new Date().toLocaleDateString();
    
    toast.success(`${periodName} report generated`, {
      description: `All ${period} data has been processed as of ${date}`,
      duration: 5000,
    });
    
    // Save a snapshot of the current data
    localStorage.setItem(`${period}_report_${date.replace(/\//g, '-')}`, JSON.stringify({
      inventoryItems,
      totalProfitExpected,
      avgProfitMargin,
      date,
      totalItems,
      lowStockItems,
      outOfStockItems
    }));
  };
  
  const handleRefreshData = () => {
    setIsLoading(true);
    // Simulate a refresh delay
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Data refreshed successfully");
    }, 800);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="glass-card p-3 flex flex-col gap-2 animate-fade-in bg-gradient-to-br from-purple-100 to-purple-200 hover:shadow-purple-200/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-taviflow-muted">Total Items</h3>
              <p className="text-xl font-bold text-purple-800">{totalItems}</p>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-3 flex flex-col gap-2 animate-fade-in bg-gradient-to-br from-purple-100 to-purple-200 hover:shadow-purple-200/50" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-taviflow-muted">Low Stock</h3>
              <p className="text-xl font-bold text-amber-600">{lowStockItems}</p>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-3 flex flex-col gap-2 animate-fade-in bg-gradient-to-br from-purple-100 to-purple-200 hover:shadow-purple-200/50" style={{ animationDelay: "200ms" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-taviflow-muted">Out of Stock</h3>
              <p className="text-xl font-bold text-red-600">{outOfStockItems}</p>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-3 flex flex-col gap-2 animate-fade-in bg-gradient-to-br from-purple-100 to-purple-200 hover:shadow-purple-200/50" style={{ animationDelay: "300ms" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-taviflow-muted">Potential Profit</h3>
              <p className="text-xl font-bold text-green-600">${totalProfitExpected}</p>
              <p className="text-xs text-green-600">Avg Margin: {avgProfitMargin}%</p>
            </div>
          </div>
        </div>
      </div>
      
      {showScanner && (
        <div className="glass-card p-4 bg-gradient-to-br from-purple-50 to-purple-100 overflow-hidden animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-purple-800">Barcode Scanner</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowScanner(false)}
              className="text-purple-700 hover:bg-purple-200/50"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
          <BarcodeScanner onDetected={handleBarcodeDetected} />
        </div>
      )}
      
      <div className="glass-card p-0 overflow-hidden animate-fade-in bg-white/90 backdrop-blur-sm shadow-sm border-purple-200">
        <div className="p-3 border-b border-purple-200 bg-gradient-to-r from-purple-50 to-purple-100">
          <InventoryBatchActions 
            selectedCount={selectedItems.length}
            onBulkUpdate={handleBulkUpdate}
            onBulkDelete={handleBulkDelete}
            onBulkExport={handleBulkExport}
            onPeriodReset={handlePeriodReset}
          />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 h-3.5 w-3.5" />
              <input
                type="text"
                placeholder="Search products or scan barcode..."
                className="pl-9 pr-4 py-2 w-full rounded-lg border border-purple-200 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 h-8 text-xs shadow-sm"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="text-xs h-8 border-purple-200 text-purple-700 hover:bg-purple-100"
                onClick={handleRefreshData}
              >
                <RefreshCw className="mr-1 h-3.5 w-3.5" />
                <span>Refresh</span>
              </Button>
              
              <InventoryFilter onFilterChange={handleFilterChange} />
              
              <Button 
                size="sm" 
                variant="outline" 
                className="text-xs h-8 border-purple-200 text-purple-700 hover:bg-purple-100"
                onClick={() => setShowScanner(true)}
              >
                <Search className="mr-1 h-3.5 w-3.5" />
                <span>Scan Barcode</span>
              </Button>
              
              <Button size="sm" variant="outline" className="text-xs h-8 border-purple-200 text-purple-700 hover:bg-purple-100">
                <Download className="mr-1 h-3.5 w-3.5" />
                <span>Export</span>
              </Button>
              
              <Button size="sm" variant="outline" className="text-xs h-8 border-purple-200 text-purple-700 hover:bg-purple-100">
                <Upload className="mr-1 h-3.5 w-3.5" />
                <span>Import</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add the new ProductManagementSection */}
      <ProductManagementSection 
        inventoryItems={inventoryItems}
        onAddItem={handleAddItem}
        onRemoveItem={handleItemRemoval}
      />
      
      <div className="glass-card p-0 overflow-hidden animate-fade-in bg-white/90 backdrop-blur-sm shadow-sm border-purple-200">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr className="bg-gradient-to-r from-purple-50 to-purple-100">
                <th className="w-[40px]">
                  <input 
                    type="checkbox" 
                    className="rounded border-purple-300 text-purple-600 focus:ring-purple-500" 
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Product Name</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Buying Price</th>
                <th>Selling Price</th>
                <th>Profit</th>
                <th>Margin</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.length > 0 ? (
                paginatedItems.map((item, index) => (
                  <tr key={item.id} className="animate-fade-in hover:bg-purple-50" style={{ animationDelay: `${index * 30}ms` }}>
                    <td>
                      <input 
                        type="checkbox" 
                        className="rounded border-purple-300 text-purple-600 focus:ring-purple-500" 
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                      />
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white">
                          <Package className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-medium text-xs">{item.name}</span>
                      </div>
                    </td>
                    <td className="text-xs">{item.sku}</td>
                    <td className="text-xs">{item.category}</td>
                    <td className="text-xs">{item.stock}</td>
                    <td className="text-xs">{item.buyingPrice}</td>
                    <td className="text-xs font-medium">{item.price}</td>
                    <td className="text-xs font-medium text-green-600">{item.expectedProfit}</td>
                    <td className="text-xs font-medium">{item.profitMargin}</td>
                    <td>
                      <span className={`status-badge ${item.status === "In Stock" ? "status-in-stock" : item.status === "Low Stock" ? "status-low-stock" : "status-out-stock"}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-purple-700 hover:bg-purple-100">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-purple-700 hover:bg-purple-100">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-red-500 hover:bg-red-50">
                          <Trash className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="py-8 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Package className="w-8 h-8 text-purple-300" />
                      <p className="text-sm text-purple-800">No items found.</p>
                      <p className="text-xs text-purple-500">Try a different search term or clear your filters.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {totalPages > 1 && (
          <div className="p-4 border-t border-purple-200">
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
