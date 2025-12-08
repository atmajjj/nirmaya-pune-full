import { BarChart3, Beaker, MapPin } from "lucide-react";
import { GeoMapHeader } from "@/components/scientist/GeoMap/GeoMapHeader";
import { MapDisplay } from "@/components/scientist/GeoMap/MapDisplay";
import { LocationsList } from "@/components/scientist/GeoMap/LocationsList";
import { sampleLocations } from "@/components/scientist/GeoMap/locationsData";

const ScientistGeoMap = () => {
  return (
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
  );
};

export default ScientistGeoMap;
