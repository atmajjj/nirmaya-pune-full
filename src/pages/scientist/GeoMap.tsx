import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Code2, Globe, LinkIcon, Beaker, MapPin, TrendingUp, Users, Layers, Download, RefreshCw, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GeoMapHeader } from "@/components/common/GeoMap/GeoMapHeader";
import { MapControls } from "@/components/common/GeoMap/MapControls";
import { LayerControl } from "@/components/common/GeoMap/LayerControl";
import { SiteDetails } from "@/components/common/GeoMap/SiteDetails";
import { mapLayers } from "@/components/common/GeoMap/mapData";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Helper to generate random metal data based on risk level
const generateMetalData = (risk: string) => {
  const multiplier = risk === 'High' ? 1.5 : risk === 'Medium' ? 1.0 : 0.5;
  return {
    chromium: { value: +(0.03 * multiplier + Math.random() * 0.02).toFixed(3), limit: 0.05, unit: 'mg/L' },
    lead: { value: +(0.008 * multiplier + Math.random() * 0.005).toFixed(4), limit: 0.01, unit: 'mg/L' },
    arsenic: { value: +(0.007 * multiplier + Math.random() * 0.004).toFixed(4), limit: 0.01, unit: 'mg/L' },
    cadmium: { value: +(0.002 * multiplier + Math.random() * 0.001).toFixed(4), limit: 0.003, unit: 'mg/L' },
  };
};

// Sample sites across India with proper coordinates - matching SampleSite type
const indiaSites = [
  { id: "1", name: "Mumbai - Thane Industrial", coordinates: { lat: 19.2183, lng: 72.9781 }, riskLevel: "High", hmpiScore: 186, lastSampled: "2024-11-28", metals: generateMetalData("High") },
  { id: "2", name: "Delhi - Yamuna Basin", coordinates: { lat: 28.7041, lng: 77.1025 }, riskLevel: "High", hmpiScore: 172, lastSampled: "2024-11-25", metals: generateMetalData("High") },
  { id: "3", name: "Kolkata - Hooghly", coordinates: { lat: 22.5726, lng: 88.3639 }, riskLevel: "Medium", hmpiScore: 98, lastSampled: "2024-11-20", metals: generateMetalData("Medium") },
  { id: "4", name: "Chennai - Adyar River", coordinates: { lat: 13.0827, lng: 80.2707 }, riskLevel: "Low", hmpiScore: 42, lastSampled: "2024-11-22", metals: generateMetalData("Low") },
  { id: "5", name: "Bengaluru - Bellandur", coordinates: { lat: 12.9716, lng: 77.5946 }, riskLevel: "High", hmpiScore: 165, lastSampled: "2024-11-27", metals: generateMetalData("High") },
  { id: "6", name: "Hyderabad - Musi River", coordinates: { lat: 17.3850, lng: 78.4867 }, riskLevel: "Medium", hmpiScore: 89, lastSampled: "2024-11-19", metals: generateMetalData("Medium") },
  { id: "7", name: "Ahmedabad - Sabarmati", coordinates: { lat: 23.0225, lng: 72.5714 }, riskLevel: "Medium", hmpiScore: 76, lastSampled: "2024-11-21", metals: generateMetalData("Medium") },
  { id: "8", name: "Pune - Mula-Mutha", coordinates: { lat: 18.5204, lng: 73.8567 }, riskLevel: "Low", hmpiScore: 38, lastSampled: "2024-11-18", metals: generateMetalData("Low") },
  { id: "9", name: "Jaipur - Urban Area", coordinates: { lat: 26.9124, lng: 75.7873 }, riskLevel: "Low", hmpiScore: 45, lastSampled: "2024-11-23", metals: generateMetalData("Low") },
  { id: "10", name: "Lucknow - Gomti Basin", coordinates: { lat: 26.8467, lng: 80.9462 }, riskLevel: "Medium", hmpiScore: 112, lastSampled: "2024-11-24", metals: generateMetalData("Medium") },
  { id: "11", name: "Kanpur - Industrial Zone", coordinates: { lat: 26.4499, lng: 80.3319 }, riskLevel: "High", hmpiScore: 198, lastSampled: "2024-11-26", metals: generateMetalData("High") },
  { id: "12", name: "Nagpur - Central", coordinates: { lat: 21.1458, lng: 79.0882 }, riskLevel: "Low", hmpiScore: 35, lastSampled: "2024-11-17", metals: generateMetalData("Low") },
  { id: "13", name: "Indore - Urban", coordinates: { lat: 22.7196, lng: 75.8577 }, riskLevel: "Low", hmpiScore: 29, lastSampled: "2024-11-16", metals: generateMetalData("Low") },
  { id: "14", name: "Varanasi - Ganga Basin", coordinates: { lat: 25.3176, lng: 82.9739 }, riskLevel: "High", hmpiScore: 156, lastSampled: "2024-11-29", metals: generateMetalData("High") },
  { id: "15", name: "Bhopal - Lakes Area", coordinates: { lat: 23.2599, lng: 77.4126 }, riskLevel: "Medium", hmpiScore: 87, lastSampled: "2024-11-15", metals: generateMetalData("Medium") },
  { id: "16", name: "Visakhapatnam - Coast", coordinates: { lat: 17.6868, lng: 83.2185 }, riskLevel: "Low", hmpiScore: 41, lastSampled: "2024-11-14", metals: generateMetalData("Low") },
  { id: "17", name: "Patna - Ganga Basin", coordinates: { lat: 25.5941, lng: 85.1376 }, riskLevel: "Medium", hmpiScore: 95, lastSampled: "2024-11-13", metals: generateMetalData("Medium") },
  { id: "18", name: "Ludhiana - Industrial", coordinates: { lat: 30.9010, lng: 75.8573 }, riskLevel: "High", hmpiScore: 178, lastSampled: "2024-11-30", metals: generateMetalData("High") },
  { id: "19", name: "Agra - Yamuna Basin", coordinates: { lat: 27.1767, lng: 78.0081 }, riskLevel: "Medium", hmpiScore: 102, lastSampled: "2024-11-12", metals: generateMetalData("Medium") },
  { id: "20", name: "Coimbatore - Noyyal", coordinates: { lat: 11.0168, lng: 76.9558 }, riskLevel: "Low", hmpiScore: 33, lastSampled: "2024-11-11", metals: generateMetalData("Low") },
];

// Get marker color based on risk level
const getMarkerColor = (risk: string) => {
  switch (risk) {
    case 'High': return '#ef4444'; // red-500
    case 'Medium': return '#eab308'; // yellow-500
    case 'Low': return '#22c55e'; // green-500
    default: return '#22c55e';
  }
};

// Map refresh component
const MapRefresh = ({ onRefresh }: { onRefresh: () => void }) => {
  const map = useMap();
  
  const handleRefresh = () => {
    map.setView([22.5, 78.9], 5);
    onRefresh();
  };
  
  return null;
};

const InteractiveGeoMap = () => {
  const [layerVisibility, setLayerVisibility] = useState(
    mapLayers.reduce((acc, layer) => ({ ...acc, [layer.id]: layer.visible }), {})
  );
  const [selectedSite, setSelectedSite] = useState<typeof indiaSites[0] | null>(null);
  const [mapMode, setMapMode] = useState("satellite");
  const [timeRange, setTimeRange] = useState("last-30-days");
  const [metalFilter, setMetalFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");

  const toggleLayer = (layerId: string) => {
    setLayerVisibility(prev => ({
      ...prev,
      [layerId]: !prev[layerId]
    }));
  };

  const getRiskBadge = (risk: string) => {
    const riskConfig = {
      'High': 'bg-red-50 text-red-700 border-red-200',
      'Medium': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'Low': 'bg-green-50 text-green-700 border-green-200'
    };
    return riskConfig[risk as keyof typeof riskConfig] || riskConfig['Low'];
  };

  const getMetalStatus = (value: number, limit: number) => {
    const ratio = value / limit;
    if (ratio > 1) return { status: 'exceeded', color: 'text-red-600' };
    if (ratio > 0.8) return { status: 'warning', color: 'text-yellow-600' };
    return { status: 'safe', color: 'text-green-600' };
  };

  // Calculate zone distribution
  const zoneDistribution = {
    safe: indiaSites.filter(s => s.riskLevel === "Low").length,
    moderate: indiaSites.filter(s => s.riskLevel === "Medium").length,
    unsafe: indiaSites.filter(s => s.riskLevel === "High").length,
  };

  // Filter sites based on risk filter
  const filteredSites = riskFilter === 'all' 
    ? indiaSites 
    : indiaSites.filter(site => site.riskLevel.toLowerCase() === riskFilter.toLowerCase());

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-6">
      <GeoMapHeader />
      
      <div>
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
          {/* Controls Sidebar */}
          <div className="xl:col-span-1 space-y-4">
            <MapControls
              mapMode={mapMode}
              setMapMode={setMapMode}
              timeRange={timeRange}
              setTimeRange={setTimeRange}
              metalFilter={metalFilter}
              setMetalFilter={setMetalFilter}
              riskFilter={riskFilter}
              setRiskFilter={setRiskFilter}
            />
            
            {/* Zone Distribution Legend */}
            <Card className="bg-white border border-slate-200 rounded-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-slate-900">Zone Distribution</h3>
                  <Layers className="w-4 h-4 text-slate-400" />
                </div>
                
                <div className="space-y-3">
                  {/* Safe Zone */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
                      <span className="text-sm text-slate-700">Safe Zone</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900">{zoneDistribution.safe}</span>
                      <span className="text-xs text-slate-500">({Math.round(zoneDistribution.safe / indiaSites.length * 100)}%)</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full" 
                      style={{ width: `${(zoneDistribution.safe / indiaSites.length) * 100}%` }}
                    ></div>
                  </div>

                  {/* Moderate Zone */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
                      <span className="text-sm text-slate-700">Moderate Risk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900">{zoneDistribution.moderate}</span>
                      <span className="text-xs text-slate-500">({Math.round(zoneDistribution.moderate / indiaSites.length * 100)}%)</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-500 rounded-full" 
                      style={{ width: `${(zoneDistribution.moderate / indiaSites.length) * 100}%` }}
                    ></div>
                  </div>

                  {/* Unsafe Zone */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
                      <span className="text-sm text-slate-700">Unsafe Zone</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900">{zoneDistribution.unsafe}</span>
                      <span className="text-xs text-slate-500">({Math.round(zoneDistribution.unsafe / indiaSites.length * 100)}%)</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-500 rounded-full" 
                      style={{ width: `${(zoneDistribution.unsafe / indiaSites.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Total Monitoring Sites</span>
                    <span className="font-semibold text-slate-900">{indiaSites.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <LayerControl
              layers={mapLayers}
              layerVisibility={layerVisibility}
              toggleLayer={toggleLayer}
            />
            
            {/* Quick Legend */}
            <Card className="bg-white border border-slate-200 rounded-lg">
              <CardContent className="p-4 space-y-2">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">HMPI Legend</h3>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-slate-600">High Risk (HMPI &gt; 150)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs text-slate-600">Medium Risk (HMPI 50-150)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-slate-600">Low Risk (HMPI &lt; 50)</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Map Area */}
          <div className="xl:col-span-3 space-y-4">
            <Card className="bg-white border border-slate-200 rounded-lg">
              <CardContent className="p-0">
                {/* Map Header */}
                <div className="flex items-center justify-between p-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-brand" />
                    <span className="font-semibold text-slate-900">India - Groundwater Quality Monitoring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="text-xs border-slate-300 rounded-md">
                      <RefreshCw className="w-3 h-3 mr-1" />
                      Refresh
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs border-slate-300 rounded-md">
                      <Download className="w-3 h-3 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>

                {/* Leaflet Map */}
                <div className="relative w-full h-[550px]">
                  <MapContainer
                    center={[22.5, 78.9]}
                    zoom={5}
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={true}
                  >
                    {/* Map Tiles - Using OpenStreetMap for default, can switch based on mapMode */}
                    {mapMode === 'satellite' ? (
                      <TileLayer
                        attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                      />
                    ) : mapMode === 'terrain' ? (
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                      />
                    ) : (
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                    )}

                    {/* Site Markers */}
                    {filteredSites.map((site) => (
                      <CircleMarker
                        key={site.id}
                        center={[site.coordinates.lat, site.coordinates.lng]}
                        radius={10}
                        pathOptions={{
                          fillColor: getMarkerColor(site.riskLevel),
                          color: '#ffffff',
                          weight: 2,
                          opacity: 1,
                          fillOpacity: 0.9,
                        }}
                        eventHandlers={{
                          click: () => setSelectedSite(site),
                        }}
                      >
                        <Popup>
                          <div className="p-1">
                            <h3 className="font-semibold text-slate-900 text-sm">{site.name}</h3>
                            <div className="mt-1 space-y-1">
                              <p className="text-xs text-slate-600">
                                <span className="font-medium">HMPI Score:</span> {site.hmpiScore}
                              </p>
                              <p className="text-xs text-slate-600">
                                <span className="font-medium">Coordinates:</span> {site.coordinates.lat.toFixed(4)}, {site.coordinates.lng.toFixed(4)}
                              </p>
                              <p className={`text-xs font-semibold ${
                                site.riskLevel === 'High' ? 'text-red-600' :
                                site.riskLevel === 'Medium' ? 'text-yellow-600' :
                                'text-green-600'
                              }`}>
                                {site.riskLevel} Risk
                              </p>
                            </div>
                          </div>
                        </Popup>
                      </CircleMarker>
                    ))}
                  </MapContainer>

                  {/* Map Legend Overlay */}
                  <div className="absolute bottom-4 left-4 bg-white rounded-lg border border-slate-200 p-3 z-[1000]">
                    <h4 className="text-xs font-semibold text-slate-700 mb-2">Risk Level</h4>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-slate-600">Safe</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-xs text-slate-600">Moderate</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-xs text-slate-600">Unsafe</span>
                      </div>
                    </div>
                  </div>

                  {/* Site Counter Overlay */}
                  <div className="absolute top-4 right-4 bg-white rounded-lg border border-slate-200 px-3 py-2 z-[1000]">
                    <span className="text-xs text-slate-500">Showing </span>
                    <span className="text-sm font-semibold text-brand">{filteredSites.length}</span>
                    <span className="text-xs text-slate-500"> sites</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <SiteDetails
              site={selectedSite}
              getRiskBadge={getRiskBadge}
              getMetalStatus={getMetalStatus}
            />

            {/* Site Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white border border-slate-200 rounded-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Total Sites</p>
                      <p className="text-xl font-semibold text-slate-900">{indiaSites.length}</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-slate-200 rounded-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">High Risk Sites</p>
                      <p className="text-xl font-semibold text-red-600">{zoneDistribution.unsafe}</p>
                    </div>
                    <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-slate-200 rounded-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Population Affected</p>
                      <p className="text-xl font-semibold text-slate-900">12.4M</p>
                    </div>
                    <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveGeoMap;
