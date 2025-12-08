import { Users, Activity, HardDrive, Shield, Bell, UserPlus, Database, Calculator, FileText, Beaker } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { SystemStats } from '@/types/admin.types';

interface TopSummaryCardsProps {
  stats: SystemStats | null;
  loading?: boolean;
}

const TopSummaryCards = ({ stats, loading }: TopSummaryCardsProps) => {
  // Format file size
  const formatSize = (mb: number) => {
    if (mb >= 1024) {
      return `${(mb / 1024).toFixed(1)} GB`;
    }
    return `${mb.toFixed(1)} MB`;
  };

  const cards = [
    {
      title: "Total Users",
      value: stats?.overview.total_users ?? 0,
      subtitle: `${stats?.users.active_users ?? 0} active`,
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      borderColor: "border-blue-300"
    },
    {
      title: "Scientists",
      value: stats?.users.by_role.scientist ?? 0,
      subtitle: "Role users",
      icon: Beaker,
      gradient: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      borderColor: "border-purple-300"
    },
    {
      title: "Researchers",
      value: stats?.users.by_role.researcher ?? 0,
      subtitle: "Role users",
      icon: Shield,
      gradient: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      borderColor: "border-green-300"
    },
    {
      title: "Calculations",
      value: stats?.overview.total_calculations ?? 0,
      subtitle: `${stats?.calculations.recent_calculations ?? 0} recent`,
      icon: Calculator,
      gradient: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
      borderColor: "border-orange-300"
    },
    {
      title: "Data Sources",
      value: stats?.overview.total_data_sources ?? 0,
      subtitle: formatSize(stats?.data_sources.total_size_mb ?? 0),
      icon: Database,
      gradient: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-50",
      textColor: "text-teal-700",
      borderColor: "border-teal-300"
    },
    {
      title: "Reports",
      value: stats?.overview.total_reports ?? 0,
      subtitle: `${stats?.reports.recent_reports ?? 0} recent`,
      icon: FileText,
      gradient: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-700",
      borderColor: "border-indigo-300"
    },
    {
      title: "Total Uploads",
      value: stats?.overview.total_uploads ?? 0,
      subtitle: formatSize(stats?.uploads.total_size_mb ?? 0),
      icon: HardDrive,
      gradient: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
      textColor: "text-amber-700",
      borderColor: "border-amber-300"
    },
    {
      title: "Custom Formulas",
      value: stats?.overview.total_formulas ?? 0,
      subtitle: `${stats?.formulas.active_formulas ?? 0} active`,
      icon: Activity,
      gradient: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      textColor: "text-pink-700",
      borderColor: "border-pink-300"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <Card key={card.title} className={`cursor-pointer hover:shadow-lg transition-all duration-200 border-2 ${card.borderColor} ${card.bgColor} ${card.textColor} hover:opacity-90 rounded-xl`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium mb-2 opacity-90">{card.title}</p>
                <h3 className="text-2xl md:text-3xl font-bold">
                  {loading ? '...' : card.value.toLocaleString()}
                </h3>
                <p className="text-xs mt-1 opacity-75">{card.subtitle}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-sm`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TopSummaryCards;
