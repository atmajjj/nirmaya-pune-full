export interface Dataset {
  id: string;
  title: string;
  description: string;
  type: string;
  source: string;
  size: string;
  format: string[];
  updated: string;
  available: boolean;
  category: string;
  url?: string;
}

export interface FilterCategory {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}
