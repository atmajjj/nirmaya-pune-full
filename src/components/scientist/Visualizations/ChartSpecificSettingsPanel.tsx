import React from 'react';
import {
  LineChartSettings,
  BarChartSettings,
  HistogramSettings,
  RadarChartSettings,
  HeatmapSettings,
  BoxplotSettings,
  PieChartSettings,
  BubbleChartSettings,
  ScatterPlotSettings,
} from './ChartSettings';
import { ChartSpecificOptions } from './customizationTypes';

interface ChartSpecificSettingsPanelProps {
  chartType: ChartSpecificOptions;
  onChange: (options: ChartSpecificOptions) => void;
}

// Main Chart Specific Settings Panel
export const ChartSpecificSettingsPanel: React.FC<ChartSpecificSettingsPanelProps> = ({
  chartType,
  onChange,
}) => {
  const handleChange = (newOptions: Record<string, unknown>) => {
    onChange({ ...chartType, options: newOptions });
  };

  switch (chartType.type) {
    case 'line':
      return <LineChartSettings options={chartType.options} onChange={handleChange} />;
    case 'bar':
      return <BarChartSettings options={chartType.options} onChange={handleChange} />;
    case 'histogram':
      return <HistogramSettings options={chartType.options} onChange={handleChange} />;
    case 'radar':
      return <RadarChartSettings options={chartType.options} onChange={handleChange} />;
    case 'heatmap':
      return <HeatmapSettings options={chartType.options} onChange={handleChange} />;
    case 'boxplot':
      return <BoxplotSettings options={chartType.options} onChange={handleChange} />;
    case 'pie':
      return <PieChartSettings options={chartType.options} onChange={handleChange} />;
    case 'bubble':
      return <BubbleChartSettings options={chartType.options} onChange={handleChange} />;
    case 'scatter':
      return <ScatterPlotSettings options={chartType.options} onChange={handleChange} />;
    default:
      return <div className="text-sm text-slate-500">No specific options available</div>;
  }
};

export default ChartSpecificSettingsPanel;
