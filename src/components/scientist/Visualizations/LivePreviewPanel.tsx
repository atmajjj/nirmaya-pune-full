import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { VisualizationType } from './types';
import { UniversalOptions, ChartSpecificOptions } from './customizationTypes';
import {
  LineChartPreview,
  BarChartPreview,
  HistogramPreview,
  RadarChartPreview,
  HeatmapPreview,
  BoxplotPreview,
  PieChartPreview,
  BubbleChartPreview,
  ScatterChartPreview,
  colorSchemes,
} from './ChartPreviews';

interface LivePreviewPanelProps {
  visualization: VisualizationType;
  universalOptions: UniversalOptions;
  chartSpecificOptions: ChartSpecificOptions;
}

export const LivePreviewPanel: React.FC<LivePreviewPanelProps> = ({
  visualization,
  universalOptions,
  chartSpecificOptions,
}) => {
  const colors = universalOptions.colorScheme === 'custom' 
    ? universalOptions.customColors 
    : colorSchemes[universalOptions.colorScheme] || colorSchemes.water;

  const commonChartProps = {
    style: { fontFamily: universalOptions.fontFamily, fontSize: universalOptions.fontSize },
  };

  const renderChart = () => {
    switch (chartSpecificOptions.type) {
      case 'line':
        return (
          <LineChartPreview
            options={chartSpecificOptions.options}
            universalOptions={universalOptions}
            colors={colors}
            commonChartProps={commonChartProps}
          />
        );
      case 'bar':
        return (
          <BarChartPreview
            options={chartSpecificOptions.options}
            universalOptions={universalOptions}
            colors={colors}
            commonChartProps={commonChartProps}
          />
        );
      case 'histogram':
        return (
          <HistogramPreview
            options={chartSpecificOptions.options}
            universalOptions={universalOptions}
            commonChartProps={commonChartProps}
          />
        );
      case 'radar':
        return (
          <RadarChartPreview
            options={chartSpecificOptions.options}
            universalOptions={universalOptions}
            colors={colors}
            commonChartProps={commonChartProps}
          />
        );
      case 'heatmap':
        return (
          <HeatmapPreview
            options={chartSpecificOptions.options}
            universalOptions={universalOptions}
          />
        );
      case 'boxplot':
        return (
          <BoxplotPreview
            options={chartSpecificOptions.options}
            universalOptions={universalOptions}
            colors={colors}
          />
        );
      case 'pie':
        return (
          <PieChartPreview
            options={chartSpecificOptions.options}
            universalOptions={universalOptions}
            colors={colors}
            commonChartProps={commonChartProps}
          />
        );
      case 'bubble':
        return (
          <BubbleChartPreview
            options={chartSpecificOptions.options}
            universalOptions={universalOptions}
            colors={colors}
            commonChartProps={commonChartProps}
          />
        );
      case 'scatter':
        return (
          <ScatterChartPreview
            options={chartSpecificOptions.options}
            universalOptions={universalOptions}
            colors={colors}
            commonChartProps={commonChartProps}
          />
        );
      default:
        return <div className="text-center text-slate-500">Preview not available</div>;
    }
  };

  return (
    <Card 
      className="h-full border border-slate-200 shadow-sm overflow-hidden"
      style={{ 
        backgroundColor: universalOptions.backgroundColor,
        maxWidth: universalOptions.width,
        margin: '0 auto',
      }}
    >
      {(universalOptions.title || universalOptions.subtitle) && (
        <CardHeader className="pb-2">
          {universalOptions.title && (
            <CardTitle 
              className="text-lg font-semibold text-slate-800"
              style={{ fontFamily: universalOptions.fontFamily }}
            >
              {universalOptions.title}
            </CardTitle>
          )}
          {universalOptions.subtitle && (
            <CardDescription 
              className="text-sm text-slate-500"
              style={{ fontFamily: universalOptions.fontFamily }}
            >
              {universalOptions.subtitle}
            </CardDescription>
          )}
        </CardHeader>
      )}
      <CardContent 
        className="pt-2"
        style={{ padding: universalOptions.padding }}
      >
        {renderChart()}
      </CardContent>
    </Card>
  );
};

export default LivePreviewPanel;
