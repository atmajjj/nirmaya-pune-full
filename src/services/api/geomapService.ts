import apiClient from './apiClient';

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

export interface GeomapFilters {
  state?: string;
  upload_id?: number;
  risk_level?: 'safe' | 'moderate' | 'unsafe';
  year?: number;
  min_hpi?: number;
  max_hpi?: number;
}

export interface GeomapResponse {
  success: boolean;
  message: string;
  data: GeomapStation[];
}

// Generate 100 dummy monitoring stations across India
const generateDummyStations = (): GeomapStation[] => {
  const states = [
    { name: 'Maharashtra', lat: [18, 21], lng: [73, 80] },
    { name: 'Gujarat', lat: [20, 24], lng: [68, 74] },
    { name: 'Rajasthan', lat: [24, 30], lng: [69, 78] },
    { name: 'Uttar Pradesh', lat: [24, 31], lng: [77, 84] },
    { name: 'Karnataka', lat: [12, 18], lng: [74, 78] },
    { name: 'Tamil Nadu', lat: [8, 13], lng: [76, 80] },
    { name: 'West Bengal', lat: [22, 27], lng: [85, 89] },
    { name: 'Madhya Pradesh', lat: [21, 26], lng: [74, 82] },
    { name: 'Punjab', lat: [29, 32], lng: [74, 77] },
    { name: 'Haryana', lat: [27, 30], lng: [74, 77] }
  ];
  
  const riskLevels: Array<'safe' | 'moderate' | 'unsafe'> = ['safe', 'moderate', 'unsafe'];
  const hpiClassifications = ['Low Risk', 'Medium Risk', 'High Risk', 'Critical Risk'];
  const miClassifications = ['Unpolluted', 'Slightly Polluted', 'Moderately Polluted', 'Heavily Polluted'];
  const metals = ['As', 'Cd', 'Cr', 'Cu', 'Fe', 'Pb', 'Ni', 'Zn', 'Mn', 'Hg'];
  
  const stations: GeomapStation[] = [];
  
  for (let i = 1; i <= 100; i++) {
    const state = states[Math.floor(Math.random() * states.length)];
    const lat = state.lat[0] + Math.random() * (state.lat[1] - state.lat[0]);
    const lng = state.lng[0] + Math.random() * (state.lng[1] - state.lng[0]);
    
    // Generate risk distribution: 40% safe, 35% moderate, 25% unsafe
    let risk: 'safe' | 'moderate' | 'unsafe';
    const rand = Math.random();
    if (rand < 0.4) risk = 'safe';
    else if (rand < 0.75) risk = 'moderate';
    else risk = 'unsafe';
    
    const hpiScore = risk === 'safe' ? 10 + Math.random() * 40 : 
                     risk === 'moderate' ? 50 + Math.random() * 50 : 
                     100 + Math.random() * 150;
    
    const miScore = risk === 'safe' ? Math.random() * 0.3 : 
                    risk === 'moderate' ? 0.3 + Math.random() * 0.7 : 
                    1 + Math.random() * 2;
    
    const numMetals = 3 + Math.floor(Math.random() * 5);
    const analyzedMetals = metals.sort(() => 0.5 - Math.random()).slice(0, numMetals);
    
    stations.push({
      id: i,
      station_id: `SITE-${String(i).padStart(4, '0')}`,
      name: `Monitoring Site ${i}`,
      location: {
        latitude: Number(lat.toFixed(6)),
        longitude: Number(lng.toFixed(6)),
        state: state.name,
        district: `District ${Math.floor(Math.random() * 5) + 1}`,
        city: `City ${Math.floor(Math.random() * 10) + 1}`
      },
      year: 2024 + Math.floor(Math.random() * 2),
      hpi_score: Number(hpiScore.toFixed(2)),
      hpi_classification: risk === 'safe' ? hpiClassifications[0] : 
                         risk === 'moderate' ? hpiClassifications[1] : 
                         Math.random() > 0.5 ? hpiClassifications[2] : hpiClassifications[3],
      mi_score: Number(miScore.toFixed(3)),
      mi_classification: risk === 'safe' ? miClassifications[0] : 
                        risk === 'moderate' ? miClassifications[1] : 
                        Math.random() > 0.5 ? miClassifications[2] : miClassifications[3],
      risk_level: risk,
      metals_analyzed: analyzedMetals
    });
  }
  
  return stations;
};

export const geomapService = {
  /**
   * Get all geomap stations with optional filters
   */
  getStations: async (filters?: GeomapFilters): Promise<GeomapStation[]> => {
    // Always return dummy data for now (comment out API call)
    console.log('Using dummy geomap data with 100 monitoring stations');
    
    let dummyStations = generateDummyStations();
    
    // Apply filters to dummy data
    if (filters?.risk_level) {
      dummyStations = dummyStations.filter(s => s.risk_level === filters.risk_level);
    }
    if (filters?.state) {
      dummyStations = dummyStations.filter(s => s.location.state === filters.state);
    }
    if (filters?.year) {
      dummyStations = dummyStations.filter(s => s.year === filters.year);
    }
    if (filters?.min_hpi !== undefined) {
      dummyStations = dummyStations.filter(s => s.hpi_score && s.hpi_score >= filters.min_hpi!);
    }
    if (filters?.max_hpi !== undefined) {
      dummyStations = dummyStations.filter(s => s.hpi_score && s.hpi_score <= filters.max_hpi!);
    }
    
    console.log(`Returning ${dummyStations.length} stations after filters`);
    return dummyStations;
    
    /* Uncomment when backend API is ready:
    try {
      const params = new URLSearchParams();
      
      if (filters?.state) params.append('state', filters.state);
      if (filters?.upload_id) params.append('upload_id', filters.upload_id.toString());
      if (filters?.risk_level) params.append('risk_level', filters.risk_level);
      if (filters?.year) params.append('year', filters.year.toString());
      if (filters?.min_hpi !== undefined) params.append('min_hpi', filters.min_hpi.toString());
      if (filters?.max_hpi !== undefined) params.append('max_hpi', filters.max_hpi.toString());
      
      const queryString = params.toString();
      const url = `/nirmaya-engine/geomap${queryString ? `?${queryString}` : ''}`;
      
      const response = await apiClient.get<GeomapResponse>(url);
      return response.data;
    } catch (error) {
      console.error('Geomap API error, falling back to dummy data:', error);
      
      let dummyStations = generateDummyStations();
      
      if (filters?.risk_level) {
        dummyStations = dummyStations.filter(s => s.risk_level === filters.risk_level);
      }
      if (filters?.state) {
        dummyStations = dummyStations.filter(s => s.location.state === filters.state);
      }
      if (filters?.year) {
        dummyStations = dummyStations.filter(s => s.year === filters.year);
      }
      if (filters?.min_hpi !== undefined) {
        dummyStations = dummyStations.filter(s => s.hpi_score && s.hpi_score >= filters.min_hpi!);
      }
      if (filters?.max_hpi !== undefined) {
        dummyStations = dummyStations.filter(s => s.hpi_score && s.hpi_score <= filters.max_hpi!);
      }
      
      return dummyStations;
    }
    */
  },
};
