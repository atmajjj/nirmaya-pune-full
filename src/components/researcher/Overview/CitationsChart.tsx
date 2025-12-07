import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Eye } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { MonthlyData } from './types';

interface CitationsChartProps {
  data: MonthlyData[];
}

export const CitationsChart = ({ data }: CitationsChartProps) => {
  return (
    <Card className="bg-white border-2 border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-brand" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Monthly Citations</h3>
          </div>
          <Button variant="outline" size="sm" className="bg-white/70 border-brand/30 text-brand hover:bg-brand/10">
            <Eye className="w-4 h-4 mr-2" />
            Details
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <defs>
                <linearGradient id="publicationsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0A3D62" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0A3D62" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="citationsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="publications" 
                stroke="#0A3D62" 
                strokeWidth={3}
                dot={{ fill: '#0A3D62', r: 5 }}
                activeDot={{ r: 7 }}
                fill="url(#publicationsGradient)"
              />
              <Line 
                type="monotone" 
                dataKey="citations" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', r: 5 }}
                activeDot={{ r: 7 }}
                fill="url(#citationsGradient)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
