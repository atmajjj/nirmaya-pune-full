import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palette, Eye } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import type { ResearchArea } from './types';

interface ResearchAreasChartProps {
  data: ResearchArea[];
}

export const ResearchAreasChart = ({ data }: ResearchAreasChartProps) => {
  return (
    <Card className="bg-white border-2 border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Palette className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Research Areas</h3>
          </div>
          <Button variant="outline" size="sm" className="bg-white/70 border-slate-300 text-slate-600 hover:bg-slate-50">
            <Eye className="w-4 h-4 mr-2" />
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="papers"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          {data.map((area) => (
            <div key={area.name} className="flex items-center justify-between p-2 rounded-md hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: area.color }}></div>
                <span className="text-sm text-slate-700">{area.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500">{area.papers} papers</span>
                <span className="text-sm font-medium text-slate-700">{area.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
