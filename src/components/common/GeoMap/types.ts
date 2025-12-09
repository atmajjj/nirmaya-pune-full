export interface MapLayer {
  id: string;
  name: string;
  type: string;
  visible: boolean;
  count: number | null;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export interface GeomapStation {
  id: number;
  station_id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
    state: string | null;
    district: string | null;
    city: string | null;
  };
  year: number | null;
  hpi_score: number | null;
  hpi_classification: string | null;
  mi_score: number | null;
  mi_classification: string | null;
  risk_level: 'safe' | 'moderate' | 'unsafe';
  metals_analyzed: string[];
}

// Legacy interface - deprecated, use GeomapStation
export interface MetalData {
  value: number;
  limit: number;
  unit: string;
}

// Legacy interface - deprecated, use GeomapStation
export interface SampleSite {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  riskLevel: string;
  hmpiScore: number;
  lastSampled: string;
  metals: {
    chromium: MetalData;
    lead: MetalData;
    arsenic: MetalData;
    cadmium: MetalData;
  };
}
