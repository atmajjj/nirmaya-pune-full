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

export interface MetalData {
  value: number;
  limit: number;
  unit: string;
}

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
