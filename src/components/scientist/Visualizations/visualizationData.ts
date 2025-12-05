import { VisualizationType } from './types';

export const visualizationTypes: VisualizationType[] = [
  {
    id: 'hmpi-trend-line',
    name: 'HMPI Trend Line Chart',
    description: 'Track HMPI values over time across different sampling locations. Ideal for monitoring contamination trends.',
    category: 'trends',
    icon: 'TrendingUp',
    preview: 'Line chart showing temporal HMPI progression',
    tags: ['time-series', 'HMPI', 'trends']
  },
  {
    id: 'contaminant-bar',
    name: 'Contaminant Concentration Bar Chart',
    description: 'Compare concentrations of Pb, As, Cd, Cr, Fe, and Mn across samples or regions.',
    category: 'comparison',
    icon: 'BarChart3',
    preview: 'Grouped bar chart for metal concentrations',
    tags: ['metals', 'comparison', 'concentration']
  },
  {
    id: 'multi-metal-radar',
    name: 'Multi-Metal Radar Chart',
    description: 'Visualize multiple metal contamination levels in a single spider/radar chart for holistic analysis.',
    category: 'comparison',
    icon: 'Radar',
    preview: 'Spider chart with metal concentration axes',
    tags: ['radar', 'metals', 'multi-dimensional']
  },
  {
    id: 'spatial-heatmap',
    name: 'Groundwater Spatial Heatmap',
    description: 'Geographic heatmap showing contamination intensity across sampling locations.',
    category: 'spatial',
    icon: 'Map',
    preview: 'Map with color-coded contamination zones',
    tags: ['geographic', 'heatmap', 'spatial']
  },
  {
    id: 'safe-limit-comparison',
    name: 'Safe Limit Comparison Chart',
    description: 'Compare sample values against WHO drinking water standards with clear threshold indicators.',
    category: 'comparison',
    icon: 'Scale',
    preview: 'Bar chart with WHO limit reference lines',
    tags: ['WHO', 'standards', 'limits', 'safety']
  },
  {
    id: 'hmpi-histogram',
    name: 'HMPI Distribution Histogram',
    description: 'View the frequency distribution of HMPI values to understand contamination spread.',
    category: 'distribution',
    icon: 'BarChart',
    preview: 'Histogram showing HMPI value frequencies',
    tags: ['distribution', 'histogram', 'HMPI']
  },
  {
    id: 'correlation-heatmap',
    name: 'Contaminant Correlation Heatmap',
    description: 'Discover correlations between different metal contaminants using a color-coded matrix.',
    category: 'correlation',
    icon: 'Grid3x3',
    preview: 'Matrix heatmap with correlation coefficients',
    tags: ['correlation', 'matrix', 'relationships']
  },
  {
    id: 'contaminant-boxplots',
    name: 'Contaminant Boxplots',
    description: 'Statistical boxplots for each contaminant showing median, quartiles, and outliers.',
    category: 'distribution',
    icon: 'BoxSelect',
    preview: 'Box-and-whisker plots for each metal',
    tags: ['statistics', 'boxplot', 'quartiles']
  },
  {
    id: 'quality-pie',
    name: 'Water Quality Category Pie Chart',
    description: 'Pie chart showing distribution across Safe, Moderate, Unsafe, and Highly Unsafe categories.',
    category: 'distribution',
    icon: 'PieChart',
    preview: 'Pie chart with quality category segments',
    tags: ['categories', 'pie', 'quality']
  },
  {
    id: 'time-series-multiline',
    name: 'Time-Series Multi-Line Chart',
    description: 'Track multiple metal concentrations over time on a single chart with distinct lines.',
    category: 'trends',
    icon: 'LineChart',
    preview: 'Multi-line chart for temporal metal tracking',
    tags: ['time-series', 'multi-line', 'metals']
  },
  {
    id: 'depth-scatter',
    name: 'Depth vs HMPI Scatter Plot',
    description: 'Explore the relationship between well depth and HMPI values with scatter visualization.',
    category: 'correlation',
    icon: 'ScatterChart',
    preview: 'Scatter plot with depth on X-axis, HMPI on Y-axis',
    tags: ['scatter', 'depth', 'correlation']
  },
  {
    id: 'sampling-bubble',
    name: 'Sampling Sites Bubble Chart',
    description: 'Bubble chart where size represents contamination level at each sampling site.',
    category: 'spatial',
    icon: 'Circle',
    preview: 'Bubble chart with proportional contamination sizes',
    tags: ['bubble', 'sites', 'sampling']
  }
];

export const categoryLabels: Record<string, string> = {
  all: 'All Visualizations',
  trends: 'Trend Analysis',
  comparison: 'Comparisons',
  distribution: 'Distributions',
  spatial: 'Spatial/Geographic',
  correlation: 'Correlations'
};

// Sample data for chart previews
export const sampleHMPITrendData = [
  { month: 'Jan', location1: 0.8, location2: 1.2, location3: 0.5 },
  { month: 'Feb', location1: 0.9, location2: 1.1, location3: 0.6 },
  { month: 'Mar', location1: 1.0, location2: 1.3, location3: 0.7 },
  { month: 'Apr', location1: 0.7, location2: 1.0, location3: 0.5 },
  { month: 'May', location1: 0.8, location2: 0.9, location3: 0.6 },
  { month: 'Jun', location1: 1.1, location2: 1.2, location3: 0.8 }
];

export const sampleContaminantData = [
  { name: 'Pb', value: 0.015, limit: 0.01, unit: 'mg/L' },
  { name: 'As', value: 0.008, limit: 0.01, unit: 'mg/L' },
  { name: 'Cd', value: 0.004, limit: 0.003, unit: 'mg/L' },
  { name: 'Cr', value: 0.045, limit: 0.05, unit: 'mg/L' },
  { name: 'Fe', value: 0.25, limit: 0.3, unit: 'mg/L' },
  { name: 'Mn', value: 0.08, limit: 0.1, unit: 'mg/L' }
];

export const sampleRadarData = [
  { metal: 'Pb', A: 85, B: 65, fullMark: 100 },
  { metal: 'As', A: 70, B: 90, fullMark: 100 },
  { metal: 'Cd', A: 60, B: 75, fullMark: 100 },
  { metal: 'Cr', A: 80, B: 55, fullMark: 100 },
  { metal: 'Fe', A: 45, B: 80, fullMark: 100 },
  { metal: 'Mn', A: 55, B: 70, fullMark: 100 }
];

export const sampleQualityData = [
  { name: 'Safe', value: 35, color: '#10b981' },
  { name: 'Moderate', value: 40, color: '#f59e0b' },
  { name: 'Unsafe', value: 18, color: '#ef4444' },
  { name: 'Highly Unsafe', value: 7, color: '#7c2d12' }
];

export const sampleScatterData = [
  { depth: 15, hmpi: 0.8, site: 'Well A' },
  { depth: 25, hmpi: 1.2, site: 'Well B' },
  { depth: 35, hmpi: 0.6, site: 'Well C' },
  { depth: 45, hmpi: 0.9, site: 'Well D' },
  { depth: 55, hmpi: 1.5, site: 'Well E' },
  { depth: 65, hmpi: 0.7, site: 'Well F' },
  { depth: 75, hmpi: 0.4, site: 'Well G' },
  { depth: 85, hmpi: 0.5, site: 'Well H' }
];

export const sampleHistogramData = [
  { range: '0-0.5', count: 12 },
  { range: '0.5-1.0', count: 28 },
  { range: '1.0-1.5', count: 18 },
  { range: '1.5-2.0', count: 8 },
  { range: '2.0-2.5', count: 4 },
  { range: '>2.5', count: 2 }
];

export const sampleBubbleData = [
  { x: 100, y: 200, z: 85, name: 'Site A' },
  { x: 200, y: 150, z: 120, name: 'Site B' },
  { x: 300, y: 300, z: 45, name: 'Site C' },
  { x: 400, y: 100, z: 180, name: 'Site D' },
  { x: 250, y: 250, z: 65, name: 'Site E' }
];

export const sampleCorrelationData = [
  { x: 'Pb', y: 'As', value: 0.85 },
  { x: 'Pb', y: 'Cd', value: 0.72 },
  { x: 'Pb', y: 'Cr', value: 0.45 },
  { x: 'Pb', y: 'Fe', value: 0.30 },
  { x: 'As', y: 'Cd', value: 0.68 },
  { x: 'As', y: 'Cr', value: 0.52 },
  { x: 'As', y: 'Fe', value: 0.38 },
  { x: 'Cd', y: 'Cr', value: 0.55 },
  { x: 'Cd', y: 'Fe', value: 0.42 },
  { x: 'Cr', y: 'Fe', value: 0.62 }
];
