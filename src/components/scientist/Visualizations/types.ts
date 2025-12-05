export interface VisualizationType {
  id: string;
  name: string;
  description: string;
  category: 'trends' | 'comparison' | 'distribution' | 'spatial' | 'correlation';
  icon: string;
  preview: string;
  tags: string[];
}

export interface VisualizationConfig {
  title: string;
  timeRange: string;
  metals: string[];
  region: string;
  showLegend: boolean;
  showGrid: boolean;
  colorScheme: 'water' | 'earth' | 'scientific';
}

export type CategoryType = 'all' | 'trends' | 'comparison' | 'distribution' | 'spatial' | 'correlation';
