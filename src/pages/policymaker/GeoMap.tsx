import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Layers, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GeoMapHeader } from "@/components/common/GeoMap/GeoMapHeader";
import { MapControls } from "@/components/common/GeoMap/MapControls";
import { geomapService, GeomapStation } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Get marker color based on API risk level
const getMarkerColor = (riskLevel: 'safe' | 'moderate' | 'unsafe') => {
  switch (riskLevel) {
    case 'unsafe': return '#ef4444'; // red-500
    case 'moderate': return '#eab308'; // yellow-500
    case 'safe': return '#22c55e'; // green-500
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
  const { toast } = useToast();
  const [stations, setStations] = useState<GeomapStation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStation, setSelectedStation] = useState<GeomapStation | null>(null);
  const [mapMode, setMapMode] = useState("satellite");
  const [timeRange, setTimeRange] = useState("last-30-days");
  const [metalFilter, setMetalFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");

  // Fetch geomap data from API
  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Build filters based on current selections
        const filters: any = {};
        if (riskFilter !== "all") {
          filters.risk_level = riskFilter;
        }
        
        const data = await geomapService.getStations(filters);
        setStations(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load geomap data";
        setError(errorMessage);
        toast({
          title: "Error Loading Data",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, [riskFilter, toast]);

  // Calculate zone distribution from API data
  const zoneDistribution = {
    unsafe: stations.filter(s => s.risk_level === 'unsafe').length,
    moderate: stations.filter(s => s.risk_level === 'moderate').length,
    safe: stations.filter(s => s.risk_level === 'safe').length,
  };

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-6">
      <GeoMapHeader />
      
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!loading && stations.length === 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No monitoring stations found. The geomap API endpoint may not be available yet or there's no data matching your filters.
            {riskFilter !== 'all' && ' Try removing the risk level filter.'}
          </AlertDescription>
        </Alert>
      )}
      
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
                
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Safe Zone */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
                        <span className="text-sm text-slate-700">Safe Zone</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900">{zoneDistribution.safe}</span>
                        <span className="text-xs text-slate-500">({stations.length > 0 ? Math.round(zoneDistribution.safe / stations.length * 100) : 0}%)</span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full" 
                        style={{ width: `${stations.length > 0 ? (zoneDistribution.safe / stations.length) * 100 : 0}%` }}
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
                        <span className="text-xs text-slate-500">({stations.length > 0 ? Math.round(zoneDistribution.moderate / stations.length * 100) : 0}%)</span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-500 rounded-full" 
                        style={{ width: `${stations.length > 0 ? (zoneDistribution.moderate / stations.length) * 100 : 0}%` }}
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
                        <span className="text-xs text-slate-500">({stations.length > 0 ? Math.round(zoneDistribution.unsafe / stations.length * 100) : 0}%)</span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-500 rounded-full" 
                        style={{ width: `${stations.length > 0 ? (zoneDistribution.unsafe / stations.length) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="mt-4 pt-3 border-t border-slate-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Total Monitoring Sites</span>
                    <span className="font-semibold text-slate-900">{stations.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Legend */}
            <Card className="bg-white border border-slate-200 rounded-lg">
              <CardContent className="p-4 space-y-2">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">HPI Legend</h3>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-slate-600">Unsafe (HPI ≥ 100)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs text-slate-600">Moderate Risk (HPI 50-99.99)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-slate-600">Safe (HPI &lt; 50)</span>
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
                    <Layers className="w-5 h-5 text-brand" />
                    <span className="font-semibold text-slate-900">India - Groundwater Quality Monitoring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs border-slate-300 rounded-md"
                      onClick={async () => {
                        try {
                          setLoading(true);
                          const filters: any = {};
                          if (riskFilter !== "all") {
                            filters.risk_level = riskFilter;
                          }
                          const data = await geomapService.getStations(filters);
                          setStations(data);
                          toast({
                            title: "Data Refreshed",
                            description: "Geomap data has been updated successfully.",
                          });
                        } catch (err) {
                          toast({
                            title: "Refresh Failed",
                            description: err instanceof Error ? err.message : "Failed to refresh data",
                            variant: "destructive",
                          });
                        } finally {
                          setLoading(false);
                        }
                      }}
                      disabled={loading}
                    >
                      <Loader2 className={`w-3 h-3 mr-1 ${loading ? 'animate-spin' : ''}`} />
                      Refresh
                    </Button>
                  </div>
                </div>

                {/* Leaflet Map */}
                <div className="relative w-full h-[550px]">
                  {loading ? (
                    <div className="flex items-center justify-center h-full bg-slate-50">
                      <div className="text-center">
                        <Loader2 className="w-8 h-8 animate-spin text-slate-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-600">Loading map data...</p>
                      </div>
                    </div>
                  ) : (
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

                      {/* Site Markers from API */}
                      {stations.map((station) => (
                        <CircleMarker
                          key={station.id}
                          center={[station.location.latitude, station.location.longitude]}
                          radius={10}
                          pathOptions={{
                            fillColor: getMarkerColor(station.risk_level),
                            color: '#ffffff',
                            weight: 2,
                            opacity: 1,
                            fillOpacity: 0.9,
                          }}
                          eventHandlers={{
                            click: () => setSelectedStation(station),
                          }}
                        >
                          <Popup>
                            <div className="p-1">
                              <h3 className="font-semibold text-slate-900 text-sm">{station.name}</h3>
                              <div className="mt-1 space-y-1">
                                <p className="text-xs text-slate-600">
                                  <span className="font-medium">Station ID:</span> {station.station_id}
                                </p>
                                <p className="text-xs text-slate-600">
                                  <span className="font-medium">HPI Score:</span> {station.hpi_score.toFixed(2)}
                                </p>
                                <p className="text-xs text-slate-600">
                                  <span className="font-medium">MI Score:</span> {station.mi_score.toFixed(2)}
                                </p>
                                <p className={`text-xs font-semibold ${
                                  station.risk_level === 'unsafe' ? 'text-red-600' :
                                  station.risk_level === 'moderate' ? 'text-yellow-600' :
                                  'text-green-600'
                                }`}>
                                  {station.risk_level.charAt(0).toUpperCase() + station.risk_level.slice(1)} Risk
                                </p>
                                <p className="text-xs text-slate-600">
                                  <span className="font-medium">Metals:</span> {station.metals_analyzed}
                                </p>
                              </div>
                            </div>
                          </Popup>
                        </CircleMarker>
                      ))}
                    </MapContainer>
                  )}

                  {/* Map Legend Overlay */}
                  <div className="absolute bottom-4 left-4 bg-white rounded-lg border border-slate-200 p-3 z-10">
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
                  <div className="absolute top-4 right-4 bg-white rounded-lg border border-slate-200 px-3 py-2 z-10">
                    <span className="text-xs text-slate-500">Showing </span>
                    <span className="text-sm font-semibold text-brand">{stations.length}</span>
                    <span className="text-xs text-slate-500"> sites</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Site Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white border border-slate-200 rounded-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Total Sites</p>
                      <p className="text-xl font-semibold text-slate-900">{stations.length}</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Layers className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-slate-200 rounded-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Unsafe Sites</p>
                      <p className="text-xl font-semibold text-red-600">{zoneDistribution.unsafe}</p>
                    </div>
                    <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-slate-200 rounded-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Moderate Risk</p>
                      <p className="text-xl font-semibold text-yellow-600">{zoneDistribution.moderate}</p>
                    </div>
                    <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                      <Layers className="w-5 h-5 text-yellow-600" />
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
