
/**
 * MarketShareChart Component
 * 
 * A responsive and visually appealing chart that displays market share data.
 * It uses Recharts to create a clean, modern pie chart with custom styling
 * and interactive tooltips.
 */

import { useState } from "react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend,
  Sector
} from "recharts";

interface MarketShareChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
  title?: string;
}

const MarketShareChart = ({ data, title = "Market Share Analysis" }: MarketShareChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  const renderActiveShape = (props: any) => {
    const {
      cx, cy, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent, value
    } = props;

    return (
      <g>
        <text x={cx} y={cy - 15} dy={8} textAnchor="middle" fill="#888" fontSize={12}>
          {payload.name}
        </text>
        <text x={cx} y={cy + 15} dy={8} textAnchor="middle" fill="#333" fontWeight={600} fontSize={16}>
          {`$${value.toLocaleString()}`}
        </text>
        <text x={cx} y={cy + 35} dy={8} textAnchor="middle" fill="#666" fontSize={12}>
          {`(${(percent * 100).toFixed(1)}%)`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.8}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 12}
          outerRadius={outerRadius + 16}
          fill={fill}
        />
      </g>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
          <p className="font-medium text-sm text-gray-800">{payload[0].name}</p>
          <p className="text-gray-600 text-sm">{`Value: $${payload[0].value.toLocaleString()}`}</p>
          <p className="text-gray-500 text-xs">{`Share: ${(payload[0].payload.percent * 100).toFixed(1)}%`}</p>
        </div>
      );
    }
  
    return null;
  };

  // Calculate percentages for the data
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const dataWithPercent = data.map(item => ({
    ...item,
    percent: item.value / total
  }));

  return (
    <div className="glass-card p-4 bg-white rounded-lg shadow-sm border border-purple-100">
      <h3 className="text-lg font-medium text-gray-800 mb-4">{title}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={dataWithPercent}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  style={{ filter: 'drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.1))' }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingTop: 20 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MarketShareChart;
