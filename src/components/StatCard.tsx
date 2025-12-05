import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  variant?: "default" | "success" | "warning" | "danger";
}

const StatCard = ({ title, value, icon: Icon, trend, trendUp, variant = "default" }: StatCardProps) => {
  const variantStyles = {
    default: "from-primary/10 to-primary/5 border-primary/20",
    success: "from-secondary/10 to-secondary/5 border-secondary/20",
    warning: "from-accent/10 to-accent/5 border-accent/20",
    danger: "from-destructive/10 to-destructive/5 border-destructive/20",
  };

  const iconStyles = {
    default: "bg-primary text-primary-foreground",
    success: "bg-secondary text-secondary-foreground",
    warning: "bg-accent text-accent-foreground",
    danger: "bg-destructive text-destructive-foreground",
  };

  return (
    <Card className={cn("border-2 bg-gradient-to-br transition-all hover:shadow-lg", variantStyles[variant])}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={cn("p-2 rounded-lg", iconStyles[variant])}>
          <Icon className="w-4 h-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        {trend && (
          <p className={cn("text-xs mt-1", trendUp ? "text-secondary" : "text-destructive")}>
            {trend}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
