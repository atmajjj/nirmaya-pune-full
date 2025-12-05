import DashboardLayout from "@/components/layouts/DashboardLayout";
import NIRAChatbot from "@/components/NIRAChatbot";
import { AlertTriangle, FileText, TrendingUp, MapPin, Brain } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
const contaminatedZones = [
  { id: 1, zone: "Delhi NCR", severity: "high", hmpi: 82.3, population: "32M", areas: 15 },
  { id: 2, zone: "Kolkata Metro", severity: "high", hmpi: 76.5, population: "18M", areas: 12 },
  { id: 3, zone: "Chennai Region", severity: "moderate", hmpi: 58.7, population: "12M", areas: 8 },
  { id: 4, zone: "Mumbai Suburban", severity: "moderate", hmpi: 52.4, population: "24M", areas: 10 },
  { id: 5, zone: "Bangalore Urban", severity: "low", hmpi: 28.4, population: "14M", areas: 5 },
];

const GeoMap = () => {
const navItems = [
    { title: "Risk Alerts", path: "/policymaker/risk-alerts", icon: <AlertTriangle className="w-5 h-5" /> },
    { title: "Who Reports", path: "/policymaker/who-reports", icon: <FileText className="w-5 h-5" /> },
    { title: "Trend Analysis", path: "/policymaker/trend-analysis", icon: <TrendingUp className="w-5 h-5" /> },
    { title: "Early Warning", path: "/policymaker/early-warning", icon: <Brain className="w-5 h-5" /> },
    { title: "Geo Map", path: "/policymaker/geo-map", icon: <MapPin className="w-5 h-5" /> },
  ];
  
  const getSeverityColor = (severity: string) => {
    const colors = { high: "bg-destructive", moderate: "bg-primary", low: "bg-secondary" };
    return colors[severity as keyof typeof colors] || "bg-muted";
  };

  const getSeverityBadge = (severity: string): "destructive" | "default" | "secondary" | "outline" => {
    const badges: Record<string, "destructive" | "default" | "secondary" | "outline"> = {
      high: "destructive",
      moderate: "default",
      low: "secondary",
    };
    return badges[severity] || "default";
  };

  return (
    <DashboardLayout navItems={navItems} userRole="policymaker">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
        <div className="space-y-6 p-6">
          {/* Header */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-100 via-slate-50 to-blue-50 border border-slate-200/80 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5"></div>
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-l from-blue-300/10 to-transparent rounded-full blur-2xl"></div>
            <div className="relative flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0A3D62] to-[#0d4a75] rounded-2xl flex items-center justify-center shadow-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800 mb-1">"Geographic Analysis"</h1>
                  <p className="text-sm text-slate-600">"Spatial distribution of contamination"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Visualization */}
          <Card>
            <CardHeader>
              <CardTitle>"Contaminated Zone Map"</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-[500px] bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg border-2 border-border overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <MapPin className="w-16 h-16 mx-auto text-destructive" />
                    <div>
                      <p className="text-lg font-semibold">"Interactive Risk Zone Map"</p>
                      <p className="text-sm text-muted-foreground">"Color Coded Contamination"</p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <Card className="p-4 w-56">
                    <h4 className="font-semibold text-sm mb-3">"Risk Levels"</h4>
                    <div className="space-y-2">
                      {["Critical Risk", "Moderate Risk", "Low Risk"].map((label, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${['bg-destructive', 'bg-primary', 'bg-secondary'][i]}`}></div>
                          <p className="text-xs font-medium">{label}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Zone Details */}
          <Card>
            <CardHeader>
              <CardTitle>"Contaminated Zones Overview"</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contaminatedZones.map((zone) => (
                  <div key={zone.id} className="border rounded-lg p-5 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${getSeverityColor(zone.severity)}`}></div>
                        <h4 className="font-semibold text-lg">{zone.zone}</h4>
                      </div>
                      <Badge variant={getSeverityBadge(zone.severity)} className="capitalize">
                        {zone.severity} "Risk"
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">"Hmpi Value"</p>
                        <p className="text-xl font-bold">{zone.hmpi}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">"Population"</p>
                        <p className="text-xl font-bold">{zone.population}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">"Affected Areas"</p>
                        <p className="text-xl font-bold">{zone.areas}</p>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-muted-foreground mr-2" />
                        <span className="text-sm text-muted-foreground">"View Details"</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Total Critical Zones", value: "2", desc: "Critical People Affected", color: "destructive" },
              { label: "Moderate Risk Areas", value: "2", desc: "Moderate People Affected", color: "primary" },
              { label: "Safe Zones", value: "1", desc: "Safe People", color: "secondary" }
            ].map((stat, i) => (
              <Card key={i} className={`border-2 border-${stat.color}/20 bg-${stat.color}/5`}>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-3xl font-bold text-${stat.color}`}>{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <NIRAChatbot />
    </DashboardLayout>
  );
};

export default GeoMap;
