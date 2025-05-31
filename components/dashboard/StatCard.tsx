
/**
 * Statistical Card Component
 * 
 * This component displays key metrics and statistics in a visual card format.
 * It shows a numerical value, description, trend indicator, and contextual icon.
 * Used primarily on the dashboard to highlight important business metrics.
 */

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: ReactNode;
  trend?: number;
  trendLabel?: string;
  className?: string;
}

const StatCard = ({
  title,
  value,
  description,
  icon,
  trend,
  trendLabel,
  className,
}: StatCardProps) => {
  const isTrendPositive = trend && trend > 0;
  const isTrendNegative = trend && trend < 0;

  return (
    <div className={cn("stat-card", className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs sm:text-sm font-medium text-taviflow-muted">{title}</span>
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-taviflow-primary/10 flex items-center justify-center text-taviflow-primary">
          {icon}
        </div>
      </div>
      
      <div className="flex flex-col">
        <span className="mobile-stat-value">{value}</span>
        {description && <span className="text-xs sm:text-sm text-taviflow-muted">{description}</span>}
      </div>
      
      {trend !== undefined && (
        <div className="mt-2 sm:mt-3 flex items-center">
          <span
            className={cn(
              "text-xs font-medium flex items-center gap-1",
              isTrendPositive && "text-taviflow-in-stock",
              isTrendNegative && "text-taviflow-out-stock",
              !isTrendPositive && !isTrendNegative && "text-taviflow-muted"
            )}
          >
            {isTrendPositive && <ArrowUp className="w-3 h-3" />}
            {isTrendNegative && <ArrowDown className="w-3 h-3" />}
            {isTrendPositive ? "+" : ""}{trend}%
          </span>
          {trendLabel && <span className="text-xs text-taviflow-muted ml-1">{trendLabel}</span>}
        </div>
      )}
    </div>
  );
};

export default StatCard;
