'use client'

import React, { useState } from 'react';
import { 
  FolderTree, 
  Search, 
  Plus, 
  Edit, 
  Trash, 
  Package, 
  ArrowRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Category {
  id: string;
  name: string;
  description: string;
  parentId: string | null;
  productCount: number;
  subcategories: Category[];
}

const CategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories: Category[] = [
    {
      id: '1',
      name: 'Electronics',
      description: 'Electronic devices and components',
      parentId: null,
      productCount: 45,
      subcategories: [
        {
          id: '1.1',
          name: 'Computers',
          description: 'Desktop and laptop computers',
          parentId: '1',
          productCount: 15,
          subcategories: []
        },
        {
          id: '1.2',
          name: 'Mobile Devices',
          description: 'Smartphones, tablets, and related accessories',
          parentId: '1',
          productCount: 22,
          subcategories: []
        },
      ]
    },
    {
      id: '2',
      name: 'Accessories',
      description: 'Various accessories and peripherals',
      parentId: null,
      productCount: 32,
      subcategories: [
        {
          id: '2.1',
          name: 'Cables',
          description: 'Power, data, and charging cables',
          parentId: '2',
          productCount: 18,
          subcategories: []
        },
      ]
    },
    {
      id: '3',
      name: 'Audio',
      description: 'Audio devices and equipment',
      parentId: null,
      productCount: 17,
      subcategories: []
    },
    {
      id: '4',
      name: 'Storage',
      description: 'Data storage devices and solutions',
      parentId: null,
      productCount: 12,
      subcategories: []
    },
  ];
  
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const CategoryItem = ({ category, isSubcategory = false }: { category: Category, isSubcategory?: boolean }) => (
    <div className={`rounded-lg border border-purple-100 overflow-hidden ${isSubcategory ? 'ml-8' : ''}`}>
      <div className="bg-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
            <FolderTree className="w-5 h-5 text-purple-700" />
          </div>
          <div>
            <h3 className="font-medium text-purple-800">{category.name}</h3>
            <p className="text-xs text-purple-600">{category.description}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium bg-purple-100 text-purple-700 px-2 py-1 rounded">
            {category.productCount} products
          </span>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Edit className="h-4 w-4 text-purple-700" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Trash className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
      </div>
      
      {category.subcategories.length > 0 && (
        <div className="p-3 border-t border-purple-100 bg-purple-50/50">
          <div className="flex items-center gap-1 mb-2">
            <FolderTree className="w-3 h-3 text-purple-600" />
            <span className="text-xs font-medium text-purple-700">Subcategories</span>
          </div>
          <div className="space-y-2">
            {category.subcategories.map(subcategory => (
              <CategoryItem key={subcategory.id} category={subcategory} isSubcategory={true} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
  
  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1 text-purple-800">Categories</h1>
          <p className="text-taviflow-muted">Organize your product catalog</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button className="bg-purple-700 hover:bg-purple-800">
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </div>
      </div>
      
      <div className="glass-card p-4 bg-white/90 shadow-sm border border-purple-100">
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-5">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search categories..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-purple-200 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-3">
          {filteredCategories.map(category => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
          <div className="flex items-center gap-2 mb-3">
            <FolderTree className="w-5 h-5 text-purple-700" />
            <h3 className="font-medium text-purple-800">Category Overview</h3>
          </div>
          
          <div className="space-y-3">
            <div className="bg-white p-3 rounded-md shadow-sm border border-purple-100">
              <p className="text-sm text-purple-700">Total Categories</p>
              <p className="text-xl font-bold text-purple-900">8</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-md shadow-sm border border-purple-100">
                <p className="text-sm text-purple-700">Top Level</p>
                <p className="text-xl font-bold text-purple-900">4</p>
              </div>
              <div className="bg-white p-3 rounded-md shadow-sm border border-purple-100">
                <p className="text-sm text-purple-700">Subcategories</p>
                <p className="text-xl font-bold text-purple-900">4</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-5 h-5 text-purple-700" />
            <h3 className="font-medium text-purple-800">Categories by Products</h3>
          </div>
          
          <div className="space-y-2">
            {categories
              .sort((a, b) => b.productCount - a.productCount)
              .slice(0, 4)
              .map(category => (
                <div key={category.id} className="bg-white p-3 rounded-md shadow-sm border border-purple-100 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-purple-800">{category.name}</p>
                    <p className="text-xs text-purple-600">{category.productCount} products</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ArrowRight className="h-4 w-4 text-purple-700" />
                  </Button>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
