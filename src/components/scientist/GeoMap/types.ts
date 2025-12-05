export interface SampleLocation {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  hmpi: number;
  risk: string;
  metals: {
    As: number;
    Cr: number;
    Pb: number;
    Cd: number;
  };
}
