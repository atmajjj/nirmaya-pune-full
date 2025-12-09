import { useState, useEffect } from "react";
import { Download, Database, MapPin, AlertTriangle, CheckCircle, Shield, Calendar, FileDown, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DataExport = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isExporting, setIsExporting] = useState<string | null>(null);

  // Auto-refresh timestamp every 10s
  useEffect(() => {
    const id = setInterval(() => setLastUpdated(new Date()), 10000);
    return () => clearInterval(id);
  }, []);

  // Mock data statistics
  const zoneStats = {
    safe: { count: 1247, percentage: 58, districts: 18 },
    moderate: { count: 654, percentage: 30, districts: 12 },
    unsafe: { count: 259, percentage: 12, districts: 4 }
  };

  const handleExport = (zoneType: string, format: string) => {
    setIsExporting(`${zoneType}-${format}`);
    
    // Simulate export
    setTimeout(() => {
      // Create mock CSV data
      let csvContent = "";
      const timestamp = new Date().toISOString().split('T')[0];
      
      if (format === "csv") {
        csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "District,Region,HMPI Score,Status,Population,Contaminants,Last Updated\n";
        
        // Add sample data based on zone type
        for (let i = 1; i <= 10; i++) {
          const district = `District-${i}`;
          const region = ["North", "South", "East", "West"][Math.floor(Math.random() * 4)];
          const hmpi = zoneType === "safe" ? Math.floor(Math.random() * 30) + 1 :
                      zoneType === "moderate" ? Math.floor(Math.random() * 30) + 31 :
                      Math.floor(Math.random() * 39) + 61;
          const population = Math.floor(Math.random() * 500000) + 100000;
          const contaminants = ["Arsenic", "Lead", "Fluoride", "Nitrate"][Math.floor(Math.random() * 4)];
          
          csvContent += `${district},${region},${hmpi},${zoneType},${population},${contaminants},${timestamp}\n`;
        }
      } else if (format === "json") {
        const jsonData = {
          exportDate: timestamp,
          zoneType: zoneType,
          totalRecords: zoneStats[zoneType as keyof typeof zoneStats].count,
          data: Array.from({ length: 10 }, (_, i) => ({
            district: `District-${i + 1}`,
            region: ["North", "South", "East", "West"][Math.floor(Math.random() * 4)],
            hmpiScore: zoneType === "safe" ? Math.floor(Math.random() * 30) + 1 :
                      zoneType === "moderate" ? Math.floor(Math.random() * 30) + 31 :
                      Math.floor(Math.random() * 39) + 61,
            status: zoneType,
            population: Math.floor(Math.random() * 500000) + 100000,
            contaminants: ["Arsenic", "Lead", "Fluoride", "Nitrate"][Math.floor(Math.random() * 4)],
            lastUpdated: timestamp
          }))
        };
        csvContent = "data:text/json;charset=utf-8," + JSON.stringify(jsonData, null, 2);
      }
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${zoneType}_zones_${timestamp}.${format}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsExporting(null);
    }, 1500);
  };

  const handleExportAll = (format: string) => {
    setIsExporting(`all-${format}`);
    
    // Simulate export
    setTimeout(() => {
      let csvContent = "";
      const timestamp = new Date().toISOString().split('T')[0];
      
      if (format === "csv") {
        csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "District,Region,HMPI Score,Status,Population,Contaminants,Last Updated\n";
        
        // Add data for all zones
        const zones = [
          { type: "safe", count: 10, range: { min: 1, max: 30 } },
          { type: "moderate", count: 8, range: { min: 31, max: 60 } },
          { type: "unsafe", count: 6, range: { min: 61, max: 100 } }
        ];
        
        zones.forEach(zone => {
          for (let i = 1; i <= zone.count; i++) {
            const district = `${zone.type.charAt(0).toUpperCase() + zone.type.slice(1)}-District-${i}`;
            const region = ["North", "South", "East", "West"][Math.floor(Math.random() * 4)];
            const hmpi = Math.floor(Math.random() * (zone.range.max - zone.range.min + 1)) + zone.range.min;
            const population = Math.floor(Math.random() * 500000) + 100000;
            const contaminants = ["Arsenic", "Lead", "Fluoride", "Nitrate"][Math.floor(Math.random() * 4)];
            
            csvContent += `${district},${region},${hmpi},${zone.type},${population},${contaminants},${timestamp}\n`;
          }
        });
      } else if (format === "json") {
        const zones = [
          { type: "safe", count: 10, range: { min: 1, max: 30 } },
          { type: "moderate", count: 8, range: { min: 31, max: 60 } },
          { type: "unsafe", count: 6, range: { min: 61, max: 100 } }
        ];
        
        const allData: any[] = [];
        zones.forEach(zone => {
          for (let i = 1; i <= zone.count; i++) {
            allData.push({
              district: `${zone.type.charAt(0).toUpperCase() + zone.type.slice(1)}-District-${i}`,
              region: ["North", "South", "East", "West"][Math.floor(Math.random() * 4)],
              hmpiScore: Math.floor(Math.random() * (zone.range.max - zone.range.min + 1)) + zone.range.min,
              status: zone.type,
              population: Math.floor(Math.random() * 500000) + 100000,
              contaminants: ["Arsenic", "Lead", "Fluoride", "Nitrate"][Math.floor(Math.random() * 4)],
              lastUpdated: timestamp
            });
          }
        });
        
        const jsonData = {
          exportDate: timestamp,
          zoneType: "all",
          totalRecords: zoneStats.safe.count + zoneStats.moderate.count + zoneStats.unsafe.count,
          zoneSummary: {
            safe: zoneStats.safe.count,
            moderate: zoneStats.moderate.count,
            unsafe: zoneStats.unsafe.count
          },
          data: allData
        };
        csvContent = "data:text/json;charset=utf-8," + JSON.stringify(jsonData, null, 2);
      }
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `all_zones_complete_${timestamp}.${format}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsExporting(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-100 via-slate-50 to-blue-50 border border-slate-200/80 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5"></div>
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-l from-blue-300/10 to-transparent rounded-full blur-2xl"></div>
          
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0A3D62] to-[#0d4a75] rounded-2xl flex items-center justify-center shadow-lg">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800 mb-1">Zone Data Export</h1>
                  <p className="text-sm text-slate-600">Download water quality zone datasets for policy analysis</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button 
                  onClick={() => handleExportAll("csv")}
                  disabled={isExporting === "all-csv"}
                  className="bg-gradient-to-r from-[#0A3D62] to-[#0d4a75] hover:from-[#0d4a75] hover:to-[#0A3D62] text-white shadow-lg hover:shadow-xl transition-all duration-300 gap-2"
                >
                  {isExporting === "all-csv" ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  Download All Zones (CSV)
                </Button>
                <Button 
                  onClick={() => handleExportAll("json")}
                  disabled={isExporting === "all-json"}
                  variant="outline"
                  className="bg-white/70 border-slate-300 hover:bg-slate-100 text-slate-700 gap-2"
                >
                  {isExporting === "all-json" ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <FileDown className="w-4 h-4" />
                  )}
                  Download All Zones (JSON)
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Last Updated: {lastUpdated.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                <span>Auto-refreshes every 10 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                <span>Total Records: {zoneStats.safe.count + zoneStats.moderate.count + zoneStats.unsafe.count}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-2 border-emerald-300 bg-emerald-50 hover:shadow-xl transition-all duration-200 rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-emerald-600 font-medium mb-2">Safe Zones</p>
                  <h3 className="text-3xl font-bold text-emerald-800 mb-1">{zoneStats.safe.count}</h3>
                  <p className="text-xs text-emerald-600 mb-2">Locations ({zoneStats.safe.percentage}%)</p>
                  <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-300 text-xs">
                    {zoneStats.safe.districts} Districts
                  </Badge>
                </div>
                <div className="w-12 h-12 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-amber-300 bg-amber-50 hover:shadow-xl transition-all duration-200 rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-amber-600 font-medium mb-2">Moderate Zones</p>
                  <h3 className="text-3xl font-bold text-amber-800 mb-1">{zoneStats.moderate.count}</h3>
                  <p className="text-xs text-amber-600 mb-2">Locations ({zoneStats.moderate.percentage}%)</p>
                  <Badge className="bg-amber-100 text-amber-700 border border-amber-300 text-xs">
                    {zoneStats.moderate.districts} Districts
                  </Badge>
                </div>
                <div className="w-12 h-12 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-300 bg-red-50 hover:shadow-xl transition-all duration-200 rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium mb-2">Unsafe Zones</p>
                  <h3 className="text-3xl font-bold text-red-800 mb-1">{zoneStats.unsafe.count}</h3>
                  <p className="text-xs text-red-600 mb-2">Locations ({zoneStats.unsafe.percentage}%)</p>
                  <Badge className="bg-red-100 text-red-700 border border-red-300 text-xs">
                    {zoneStats.unsafe.districts} Districts
                  </Badge>
                </div>
                <div className="w-12 h-12 rounded-lg bg-red-100 border border-red-300 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Export Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Safe Zones Export */}
          <Card className="border border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
            <CardHeader className="border-b border-emerald-100 bg-gradient-to-br from-emerald-50 to-emerald-100/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <CardTitle className="text-lg font-bold text-emerald-800">Safe Zones Dataset</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Total Locations:</span>
                  <span className="font-semibold text-emerald-700">{zoneStats.safe.count}</span>
                </div>
                <div className="flex justify-between">
                  <span>Districts Covered:</span>
                  <span className="font-semibold text-emerald-700">{zoneStats.safe.districts}</span>
                </div>
                <div className="flex justify-between">
                  <span>HMPI Range:</span>
                  <span className="font-semibold text-emerald-700">1-30</span>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-200 space-y-2">
                <Button 
                  onClick={() => handleExport("safe", "csv")}
                  disabled={isExporting === "safe-csv"}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                >
                  {isExporting === "safe-csv" ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  Export as CSV
                </Button>
                <Button 
                  onClick={() => handleExport("safe", "json")}
                  disabled={isExporting === "safe-json"}
                  variant="outline"
                  className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50 gap-2"
                >
                  {isExporting === "safe-json" ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <FileDown className="w-4 h-4" />
                  )}
                  Export as JSON
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Moderate Zones Export */}
          <Card className="border border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
            <CardHeader className="border-b border-amber-100 bg-gradient-to-br from-amber-50 to-amber-100/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-amber-600" />
                </div>
                <CardTitle className="text-lg font-bold text-amber-800">Moderate Zones Dataset</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Total Locations:</span>
                  <span className="font-semibold text-amber-700">{zoneStats.moderate.count}</span>
                </div>
                <div className="flex justify-between">
                  <span>Districts Covered:</span>
                  <span className="font-semibold text-amber-700">{zoneStats.moderate.districts}</span>
                </div>
                <div className="flex justify-between">
                  <span>HMPI Range:</span>
                  <span className="font-semibold text-amber-700">31-60</span>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-200 space-y-2">
                <Button 
                  onClick={() => handleExport("moderate", "csv")}
                  disabled={isExporting === "moderate-csv"}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white gap-2"
                >
                  {isExporting === "moderate-csv" ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  Export as CSV
                </Button>
                <Button 
                  onClick={() => handleExport("moderate", "json")}
                  disabled={isExporting === "moderate-json"}
                  variant="outline"
                  className="w-full border-amber-300 text-amber-700 hover:bg-amber-50 gap-2"
                >
                  {isExporting === "moderate-json" ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <FileDown className="w-4 h-4" />
                  )}
                  Export as JSON
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Unsafe Zones Export */}
          <Card className="border border-red-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
            <CardHeader className="border-b border-red-100 bg-gradient-to-br from-red-50 to-red-100/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 border border-red-300 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <CardTitle className="text-lg font-bold text-red-800">Unsafe Zones Dataset</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Total Locations:</span>
                  <span className="font-semibold text-red-700">{zoneStats.unsafe.count}</span>
                </div>
                <div className="flex justify-between">
                  <span>Districts Covered:</span>
                  <span className="font-semibold text-red-700">{zoneStats.unsafe.districts}</span>
                </div>
                <div className="flex justify-between">
                  <span>HMPI Range:</span>
                  <span className="font-semibold text-red-700">61-100</span>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-200 space-y-2">
                <Button 
                  onClick={() => handleExport("unsafe", "csv")}
                  disabled={isExporting === "unsafe-csv"}
                  className="w-full bg-red-600 hover:bg-red-700 text-white gap-2"
                >
                  {isExporting === "unsafe-csv" ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  Export as CSV
                </Button>
                <Button 
                  onClick={() => handleExport("unsafe", "json")}
                  disabled={isExporting === "unsafe-json"}
                  variant="outline"
                  className="w-full border-red-300 text-red-700 hover:bg-red-50 gap-2"
                >
                  {isExporting === "unsafe-json" ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <FileDown className="w-4 h-4" />
                  )}
                  Export as JSON
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 border border-blue-300 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-blue-900">Dataset Information</h3>
                <p className="text-sm text-blue-800">
                  All datasets are automatically updated every 10 minutes based on real-time water quality monitoring data. 
                  The zones are classified based on HMPI (Heavy Metal Pollution Index) scores:
                </p>
                <ul className="text-sm text-blue-800 space-y-1 ml-4">
                  <li><span className="font-semibold text-emerald-700">Safe (1-30):</span> Water quality meets all safety standards</li>
                  <li><span className="font-semibold text-amber-700">Moderate (31-60):</span> Requires monitoring and preventive measures</li>
                  <li><span className="font-semibold text-red-700">Unsafe (61-100):</span> Immediate intervention required</li>
                </ul>
                <p className="text-sm text-blue-800">
                  Exported data includes: District name, Region, HMPI score, Status, Population affected, Primary contaminants, and Last update timestamp.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataExport;
