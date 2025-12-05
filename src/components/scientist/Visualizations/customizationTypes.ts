// Universal customization options
export interface UniversalOptions {
  title: string;
  subtitle: string;
  showLegend: boolean;
  legendPosition: 'top' | 'bottom' | 'left' | 'right';
  colorScheme: 'water' | 'earth' | 'scientific' | 'custom';
  customColors: string[];
  backgroundColor: string;
  showGrid: boolean;
  gridColor: string;
  showXAxis: boolean;
  showYAxis: boolean;
  xAxisLabel: string;
  yAxisLabel: string;
  width: number;
  height: number;
  padding: number;
  fontFamily: string;
  fontSize: number;
  animationEnabled: boolean;
  animationDuration: number;
}

// Line Chart specific options
export interface LineChartOptions {
  lineThickness: number;
  markerStyle: 'circle' | 'square' | 'diamond' | 'none';
  markerSize: number;
  smoothLine: boolean;
  showDataLabels: boolean;
  showAreaFill: boolean;
  areaFillOpacity: number;
  lineStyle: 'solid' | 'dashed' | 'dotted';
}

// Bar Chart specific options
export interface BarChartOptions {
  barSpacing: number;
  barThickness: number;
  orientation: 'vertical' | 'horizontal';
  barMode: 'grouped' | 'stacked';
  borderRadius: number;
  showBarLabels: boolean;
  barLabelPosition: 'inside' | 'outside';
}

// Histogram specific options
export interface HistogramOptions {
  numberOfBins: number;
  binWidth: number;
  showMeanLine: boolean;
  showMedianLine: boolean;
  showThresholdLines: boolean;
  thresholdValues: number[];
  binColor: string;
  binOpacity: number;
}

// Radar Chart specific options
export interface RadarChartOptions {
  fillOpacity: number;
  lineStrokeWidth: number;
  showPointMarkers: boolean;
  pointMarkerSize: number;
  showAxisLabels: boolean;
  axisLabelFontSize: number;
  gridType: 'polygon' | 'circle';
  levels: number;
}

// Heatmap specific options
export interface HeatmapOptions {
  colorScale: 'red-blue' | 'yellow-green' | 'multi-gradient' | 'viridis' | 'plasma';
  intensitySmoothing: boolean;
  smoothingLevel: number;
  gridSize: number;
  rangeMin: number;
  rangeMax: number;
  showCellValues: boolean;
  cellBorderWidth: number;
}

// Boxplot specific options
export interface BoxplotOptions {
  showMeanMarker: boolean;
  showOutliers: boolean;
  boxWidth: number;
  whiskerLength: number;
  whiskerStyle: 'line' | 'capped';
  outlierMarkerSize: number;
  outlierMarkerStyle: 'circle' | 'diamond';
  showNotch: boolean;
}

// Pie Chart specific options
export interface PieChartOptions {
  innerRadius: number;
  segmentSpacing: number;
  showSegmentLabels: boolean;
  showPercentageLabels: boolean;
  labelPosition: 'inside' | 'outside';
  startAngle: number;
  sortSegments: boolean;
  highlightOnHover: boolean;
}

// Bubble Chart specific options
export interface BubbleChartOptions {
  bubbleSizeScale: number;
  bubbleOpacity: number;
  colorCoding: 'contaminant' | 'hmpi' | 'depth' | 'risk';
  minBubbleSize: number;
  maxBubbleSize: number;
  showBubbleLabels: boolean;
  bubbleBorderWidth: number;
}

// Scatter Plot specific options
export interface ScatterPlotOptions {
  pointSize: number;
  pointShape: 'circle' | 'square' | 'triangle' | 'diamond';
  showTrendLine: boolean;
  trendLineType: 'linear' | 'polynomial' | 'exponential';
  showConfidenceInterval: boolean;
  pointOpacity: number;
}

// Combined chart-specific options
export type ChartSpecificOptions = 
  | { type: 'line'; options: LineChartOptions }
  | { type: 'bar'; options: BarChartOptions }
  | { type: 'histogram'; options: HistogramOptions }
  | { type: 'radar'; options: RadarChartOptions }
  | { type: 'heatmap'; options: HeatmapOptions }
  | { type: 'boxplot'; options: BoxplotOptions }
  | { type: 'pie'; options: PieChartOptions }
  | { type: 'bubble'; options: BubbleChartOptions }
  | { type: 'scatter'; options: ScatterPlotOptions };

// Full visualization configuration
export interface VisualizationCustomization {
  universal: UniversalOptions;
  chartSpecific: ChartSpecificOptions;
}

// Save options
export type SaveAsType = 'dashboard-widget' | 'report-asset' | 'export-png' | 'export-svg';

export interface SaveOptions {
  saveAs: SaveAsType;
  fileName: string;
  description: string;
  tags: string[];
}

// Default values
export const defaultUniversalOptions: UniversalOptions = {
  title: 'Untitled Visualization',
  subtitle: '',
  showLegend: true,
  legendPosition: 'bottom',
  colorScheme: 'water',
  customColors: ['#0A3D62', '#0ea5e9', '#6EDFF6', '#10b981', '#f59e0b', '#ef4444'],
  backgroundColor: '#ffffff',
  showGrid: true,
  gridColor: '#e2e8f0',
  showXAxis: true,
  showYAxis: true,
  xAxisLabel: '',
  yAxisLabel: '',
  width: 800,
  height: 400,
  padding: 20,
  fontFamily: 'Inter, sans-serif',
  fontSize: 12,
  animationEnabled: true,
  animationDuration: 500,
};

export const defaultLineChartOptions: LineChartOptions = {
  lineThickness: 2,
  markerStyle: 'circle',
  markerSize: 6,
  smoothLine: true,
  showDataLabels: false,
  showAreaFill: false,
  areaFillOpacity: 0.3,
  lineStyle: 'solid',
};

export const defaultBarChartOptions: BarChartOptions = {
  barSpacing: 10,
  barThickness: 30,
  orientation: 'vertical',
  barMode: 'grouped',
  borderRadius: 4,
  showBarLabels: false,
  barLabelPosition: 'outside',
};

export const defaultHistogramOptions: HistogramOptions = {
  numberOfBins: 10,
  binWidth: 0,
  showMeanLine: true,
  showMedianLine: false,
  showThresholdLines: true,
  thresholdValues: [1.0, 2.0],
  binColor: '#0ea5e9',
  binOpacity: 0.8,
};

export const defaultRadarChartOptions: RadarChartOptions = {
  fillOpacity: 0.3,
  lineStrokeWidth: 2,
  showPointMarkers: true,
  pointMarkerSize: 4,
  showAxisLabels: true,
  axisLabelFontSize: 12,
  gridType: 'polygon',
  levels: 5,
};

export const defaultHeatmapOptions: HeatmapOptions = {
  colorScale: 'red-blue',
  intensitySmoothing: true,
  smoothingLevel: 2,
  gridSize: 20,
  rangeMin: 0,
  rangeMax: 100,
  showCellValues: false,
  cellBorderWidth: 1,
};

export const defaultBoxplotOptions: BoxplotOptions = {
  showMeanMarker: true,
  showOutliers: true,
  boxWidth: 40,
  whiskerLength: 1.5,
  whiskerStyle: 'capped',
  outlierMarkerSize: 6,
  outlierMarkerStyle: 'circle',
  showNotch: false,
};

export const defaultPieChartOptions: PieChartOptions = {
  innerRadius: 0,
  segmentSpacing: 2,
  showSegmentLabels: true,
  showPercentageLabels: true,
  labelPosition: 'outside',
  startAngle: 0,
  sortSegments: false,
  highlightOnHover: true,
};

export const defaultBubbleChartOptions: BubbleChartOptions = {
  bubbleSizeScale: 1,
  bubbleOpacity: 0.7,
  colorCoding: 'hmpi',
  minBubbleSize: 10,
  maxBubbleSize: 50,
  showBubbleLabels: false,
  bubbleBorderWidth: 2,
};

export const defaultScatterPlotOptions: ScatterPlotOptions = {
  pointSize: 8,
  pointShape: 'circle',
  showTrendLine: false,
  trendLineType: 'linear',
  showConfidenceInterval: false,
  pointOpacity: 0.8,
};

// Get default options based on visualization type
export const getDefaultChartOptions = (vizId: string): ChartSpecificOptions => {
  const vizTypeMap: Record<string, ChartSpecificOptions> = {
    'hmpi-trend-line': { type: 'line', options: defaultLineChartOptions },
    'time-series-multiline': { type: 'line', options: defaultLineChartOptions },
    'contaminant-bar': { type: 'bar', options: defaultBarChartOptions },
    'safe-limit-comparison': { type: 'bar', options: defaultBarChartOptions },
    'hmpi-histogram': { type: 'histogram', options: defaultHistogramOptions },
    'multi-metal-radar': { type: 'radar', options: defaultRadarChartOptions },
    'spatial-heatmap': { type: 'heatmap', options: defaultHeatmapOptions },
    'correlation-heatmap': { type: 'heatmap', options: defaultHeatmapOptions },
    'contaminant-boxplots': { type: 'boxplot', options: defaultBoxplotOptions },
    'quality-pie': { type: 'pie', options: defaultPieChartOptions },
    'sampling-bubble': { type: 'bubble', options: defaultBubbleChartOptions },
    'depth-scatter': { type: 'scatter', options: defaultScatterPlotOptions },
  };
  
  return vizTypeMap[vizId] || { type: 'line', options: defaultLineChartOptions };
};
