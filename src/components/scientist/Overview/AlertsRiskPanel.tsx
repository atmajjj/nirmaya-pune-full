import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import type { Alert, RiskDistribution } from './types';
import { SeasonalComparisonChart } from './SeasonalComparisonChart';

interface AlertsRiskPanelProps {
  alerts: Alert[];
  riskData: RiskDistribution[];
  showAlerts?: boolean;
  showRiskDistribution?: boolean;
}

export const AlertsRiskPanel = ({ alerts, riskData, showAlerts, showRiskDistribution }: AlertsRiskPanelProps) => {
// If both are explicitly set to false, return null
  if (showAlerts === false && showRiskDistribution === false) {
    return null;
  }
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Replace alerts section with Seasonal Comparison Chart */}
      {(showAlerts !== false) && <SeasonalComparisonChart />}

      {(showRiskDistribution !== false) && <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <CardHeader className="border-b border-slate-100 pb-4">
          <CardTitle className="text-slate-800 text-lg font-semibold">"Risk Distribution"</CardTitle>
          <p className="text-sm text-slate-500 mt-1">"Classification of monitoring sites"</p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div style={{ width: 180, height: 180 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={riskData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    isAnimationActive
                    animationDuration={800}
                  >
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex-1 space-y-4 w-full">
              {riskData.map((risk) => (
                <div key={risk.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: risk.color }}></div>
                    <span className="text-sm font-medium text-slate-700">{risk.name} Risk</span>
                  </div>
                  <span className="text-lg font-bold text-slate-800">{risk.value}</span>
                </div>
              ))}

              <div className="mt-4 text-sm text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
                📊 Total: {riskData.reduce((sum, r) => sum + r.value, 0)} monitoring sites
              </div>
            </div>
          </div>
        </CardContent>
      </Card>}
    </div>
  );
};
