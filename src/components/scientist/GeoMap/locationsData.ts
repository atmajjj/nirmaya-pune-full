import type { SampleLocation } from './types';

export const sampleLocations: SampleLocation[] = [
  {
    id: 'LOC001',
    name: 'Mumbai Industrial Zone',
    coordinates: { lat: 19.0760, lng: 72.8777 },
    hmpi: 185.4,
    risk: 'High',
    metals: { As: 45.2, Cr: 38.7, Pb: 28.4, Cd: 12.3 }
  },
  {
    id: 'LOC002',
    name: 'Delhi Suburban Area',
    coordinates: { lat: 28.7041, lng: 77.1025 },
    hmpi: 124.8,
    risk: 'Medium',
    metals: { As: 32.8, Cr: 22.5, Pb: 18.9, Cd: 8.6 }
  },
  {
    id: 'LOC003',
    name: 'Chennai Coastal Region',
    coordinates: { lat: 13.0827, lng: 80.2707 },
    hmpi: 98.6,
    risk: 'Medium',
    metals: { As: 28.4, Cr: 19.2, Pb: 15.3, Cd: 7.1 }
  },
];
