import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  change?: {
    value: number;
    trend: "up" | "down";
  };
}

export const MetricsCard = ({ title, value, icon: Icon, color = "municipal-blue", change }: MetricsCardProps) => {
  const getColorClasses = (colorName: string) => {
    const colorMap: Record<string, string> = {
      "municipal-blue": "text-municipal-blue bg-municipal-blue-light",
      "status-pending": "text-status-pending bg-yellow-50",
      "status-assigned": "text-status-assigned bg-blue-50", 
      "status-in-progress": "text-status-in-progress bg-purple-50",
      "status-resolved": "text-status-resolved bg-green-50",
    };
    return colorMap[colorName] || colorMap["municipal-blue"];
  };

  return (
    <Card className="shadow-card hover:shadow-elevated transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className={cn(
            "rounded-full p-2 w-10 h-10 flex items-center justify-center",
            getColorClasses(color)
          )}>
            <Icon className="w-5 h-5" />
          </div>
          {change && (
            <div className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              change.trend === "up" 
                ? "text-success bg-green-50" 
                : "text-destructive bg-red-50"
            )}>
              {change.trend === "up" ? "+" : "-"}{Math.abs(change.value)}%
            </div>
          )}
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground mb-1">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          <p className="text-sm text-muted-foreground font-medium">
            {title}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};