
/**
 * Stock Level Chart Component
 * 
 * This component visualizes inventory stock levels using a line chart.
 * It tracks "In Stock" and "Low Stock" item quantities over time,
 * helping users monitor inventory trends and anticipate shortages.
 */

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

interface StockChartProps {
  data: Array<{
    name: string;
    inStock: number;
    lowStock: number;
  }>;
  title: string;
}

const StockChart = ({ data, title }: StockChartProps) => {
  return (
    <div className="glass-card p-4 animate-fade-in">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EAEAEA" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#EAEAEA' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false} 
              axisLine={{ stroke: '#EAEAEA' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #EAEAEA',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="inStock" 
              stroke="#00BFB2" 
              strokeWidth={2} 
              dot={{ r: 4, strokeWidth: 2 }} 
              activeDot={{ r: 6 }} 
              name="In Stock"
            />
            <Line 
              type="monotone" 
              dataKey="lowStock" 
              stroke="#FF4D8D" 
              strokeWidth={2} 
              dot={{ r: 4, strokeWidth: 2 }} 
              activeDot={{ r: 6 }} 
              name="Low Stock"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-taviflow-accent"></div>
          <span className="text-sm">In Stock</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-taviflow-primary"></div>
          <span className="text-sm">Low Stock</span>
        </div>
      </div>
    </div>
  );
};

export default StockChart;
