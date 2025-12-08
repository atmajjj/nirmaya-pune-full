import DashboardLayout from "@/components/layouts/DashboardLayout";
import { BarChart3, Beaker, MapPin } from "lucide-react";
import { GeoMapHeader } from "@/components/scientist/GeoMap/GeoMapHeader";
import { MapDisplay } from "@/components/scientist/GeoMap/MapDisplay";
import { LocationsList } from "@/components/scientist/GeoMap/LocationsList";
import { sampleLocations } from "@/components/scientist/GeoMap/locationsData";

const ScientistGeoMap = () => {

  const navItems = [
    { title: "Overview", path: "/scientist/overview", icon: <Activity className="w-5 h-5" /> },
    { title: "HMPI Engine", path: "/scientist/hmpi-engine", icon: <Calculator className="w-5 h-5" /> },
    { title: "Formula Editor", path: "/scientist/formula-editor", icon: <Edit className="w-5 h-5" /> },
    { title: "Geo-Map", path: "/scientist/geo-map", icon: <Map className="w-5 h-5" /> },
    { title: "Settings", path: "/profile", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <DashboardLayout navItems={navItems} userRole="scientist">
      <div className="space-y-6 bg-slate-50 min-h-screen p-6">
        <GeoMapHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MapDisplay />
          </div>
          <div>
            <LocationsList locations={sampleLocations} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ScientistGeoMap;
