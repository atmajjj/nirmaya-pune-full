export interface CityHMPI {
  city: string;
  value: number;
  metal: string;
  source: string;
  status: string;
}

export interface Contaminant {
  name: string;
  value: number;
  sites: number;
  color: string;
}

export interface Alert {
  id: string;
  city: string;
  metal: string;
  time: string;
  severity: number;
  level: string;
}

export interface RiskDistribution {
  name: string;
  value: number;
  color: string;
}
