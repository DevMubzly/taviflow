
/**
 * Inventory Filter Component
 * 
 * This component provides filtering capabilities for inventory items.
 * It allows users to filter by categories, status, suppliers, and other attributes
 * to quickly find specific items in large inventory collections.
 */

import { useState } from "react";
import { 
  Filter, 
  X, 
  Check, 
  ChevronDown,
  Tag,
  Package,
  BarChart
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilterOption {
  id: string;
  label: string;
  options: { value: string; label: string }[];
}

interface InventoryFilterProps {
  onFilterChange: (filters: Record<string, string[]>) => void;
}

const InventoryFilter = ({ onFilterChange }: InventoryFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    category: [],
    status: [],
    supplier: []
  });
  
  const filterOptions: FilterOption[] = [
    {
      id: "category",
      label: "Category",
      options: [
        { value: "electronics", label: "Electronics" },
        { value: "accessories", label: "Accessories" },
        { value: "storage", label: "Storage" },
        { value: "audio", label: "Audio" }
      ]
    },
    {
      id: "status",
      label: "Status",
      options: [
        { value: "in-stock", label: "In Stock" },
        { value: "low-stock", label: "Low Stock" },
        { value: "out-of-stock", label: "Out of Stock" }
      ]
    },
    {
      id: "supplier",
      label: "Supplier",
      options: [
        { value: "supplier1", label: "Main Warehouse Supply Co." },
        { value: "supplier2", label: "ElectroBits Inc." },
        { value: "supplier3", label: "Wholesale Parts Ltd." }
      ]
    }
  ];
  
  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };
  
  const toggleOption = (filterId: string, value: string) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      if (newFilters[filterId].includes(value)) {
        newFilters[filterId] = newFilters[filterId].filter(v => v !== value);
      } else {
        newFilters[filterId] = [...newFilters[filterId], value];
      }
      return newFilters;
    });
  };
  
  const applyFilters = () => {
    onFilterChange(selectedFilters);
    setIsOpen(false);
  };
  
  const clearFilters = () => {
    setSelectedFilters({
      category: [],
      status: [],
      supplier: []
    });
    onFilterChange({
      category: [],
      status: [],
      supplier: []
    });
  };
  
  const totalFiltersSelected = Object.values(selectedFilters).flat().length;
  
  return (
    <div className="relative">
      <Button 
        size="sm" 
        variant={totalFiltersSelected > 0 ? "default" : "outline"} 
        className="text-xs h-8 flex items-center gap-1 relative"
        onClick={toggleFilter}
      >
        <Filter className="h-3.5 w-3.5" />
        <span>Filter</span>
        {totalFiltersSelected > 0 && (
          <span className="ml-1 bg-white text-taviflow-primary rounded-full px-1.5 py-0.5 text-[10px] font-medium">
            {totalFiltersSelected}
          </span>
        )}
      </Button>
      
      {isOpen && (
        <div className="absolute right-0 mt-1 w-64 bg-white rounded-md shadow-lg z-50 border border-taviflow-border overflow-hidden">
          <div className="p-2 border-b border-taviflow-border flex justify-between items-center">
            <h3 className="text-xs font-medium">Filter Options</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-taviflow-muted hover:text-gray-800"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {filterOptions.map(filter => (
              <div key={filter.id} className="p-2 border-b border-taviflow-border">
                <h4 className="text-xs font-medium mb-1 flex items-center gap-1">
                  {filter.id === "category" && <Tag className="h-3 w-3" />}
                  {filter.id === "status" && <Package className="h-3 w-3" />}
                  {filter.id === "supplier" && <BarChart className="h-3 w-3" />}
                  {filter.label}
                </h4>
                
                <div className="space-y-1">
                  {filter.options.map(option => (
                    <div 
                      key={option.value} 
                      className="flex items-center text-xs hover:bg-taviflow-secondary/20 rounded p-1"
                    >
                      <input 
                        type="checkbox" 
                        id={`${filter.id}-${option.value}`} 
                        className="mr-2"
                        checked={selectedFilters[filter.id].includes(option.value)}
                        onChange={() => toggleOption(filter.id, option.value)}
                      />
                      <label htmlFor={`${filter.id}-${option.value}`}>{option.label}</label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-2 border-t border-taviflow-border flex justify-between">
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-7 text-xs"
              onClick={clearFilters}
            >
              Clear All
            </Button>
            
            <Button 
              size="sm" 
              className="h-7 text-xs bg-taviflow-primary text-white"
              onClick={applyFilters}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryFilter;
