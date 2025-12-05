import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Award, FlaskConical, DollarSign } from "lucide-react";

export const ResearchStatusPanel = () => {
  const statusItems = [
    {
      icon: FlaskConical,
      title: "Active Projects",
      value: "8",
      subtitle: "Ongoing research",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Award,
      title: "Awards",
      value: "3",
      subtitle: "Recognition received",
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    },
    {
      icon: DollarSign,
      title: "Funding",
      value: "₹2.5Cr",
      subtitle: "Total grants",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    }
  ];

  return (
    <Card className="bg-white border-2 border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="border-b border-slate-100 pb-4">
        <h3 className="text-lg font-bold text-slate-800">Research Status</h3>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {statusItems.map((item) => {
          const Icon = item.icon;
          return (
            <div 
              key={item.title} 
              className="p-4 rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-colors hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${item.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold text-slate-800">{item.value}</p>
                  <p className="text-sm font-medium text-slate-600">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.subtitle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
