
/**
 * Sales Chart Component
 * 
 * This component visualizes sales data using a bar chart.
 * It displays sales amounts and order counts over time periods,
 * helping users understand sales performance trends.
 */

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

interface SalesChartProps {
  data: Array<{
    name: string;
    sales: number;
    orders: number;
  }>;
  title: string;
}

const SalesChart = ({ data, title }: SalesChartProps) => {
  return (
    <div className="glass-card p-4 animate-fade-in">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
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
            <Bar 
              dataKey="sales" 
              fill="#00BFB2" 
              radius={[4, 4, 0, 0]}
              name="Sales ($)"
            />
            <Bar 
              dataKey="orders" 
              fill="#FF4D8D" 
              radius={[4, 4, 0, 0]} 
              name="Orders"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-taviflow-accent"></div>
          <span className="text-sm">Sales ($)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-taviflow-primary"></div>
          <span className="text-sm">Orders</span>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
