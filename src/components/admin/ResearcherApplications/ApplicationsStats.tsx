import { Card, CardContent } from "@/components/ui/card";
import { Users, Clock, CheckCircle, XCircle } from "lucide-react";

interface ApplicationsStatsProps {
  stats: {
    total: number;
    pending: number;
    accepted: number;
    rejected: number;
  };
  onFilterChange: (filter: "all" | "pending" | "accepted" | "rejected") => void;
  currentFilter: string;
}

const ApplicationsStats = ({ stats, onFilterChange, currentFilter }: ApplicationsStatsProps) => {
  const statCards = [
    {
      title: "Total Applications",
      value: stats.total,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      filter: "all" as const,
    },
    {
      title: "Pending Review",
      value: stats.pending,
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      filter: "pending" as const,
    },
    {
      title: "Accepted",
      value: stats.accepted,
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      filter: "accepted" as const,
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      filter: "rejected" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        const isActive = currentFilter === stat.filter;
        
        return (
          <Card
            key={stat.title}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              isActive ? "ring-2 ring-[#0A3D62] shadow-md" : ""
            }`}
            onClick={() => onFilterChange(stat.filter)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                  <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ApplicationsStats;
