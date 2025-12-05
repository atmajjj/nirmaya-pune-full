import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { UniversalOptions, LineChartOptions } from '../customizationTypes';
import { sampleHMPITrendData } from '../visualizationData';

interface LineChartPreviewProps {
  options: LineChartOptions;
  universalOptions: UniversalOptions;
  colors: string[];
  commonChartProps: Record<string, unknown>;
}

export const LineChartPreview: React.FC<LineChartPreviewProps> = ({
  options,
  universalOptions,
  colors,
  commonChartProps,
}) => {
  if (options.showAreaFill) {
    return (
      <ResponsiveContainer width="100%" height={universalOptions.height - 80}>
        <AreaChart data={sampleHMPITrendData} {...commonChartProps}>
          {universalOptions.showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke={universalOptions.gridColor} />
          )}
          {universalOptions.showXAxis && (
            <XAxis 
              dataKey="month" 
              stroke="#64748b" 
              fontSize={universalOptions.fontSize}
              label={universalOptions.xAxisLabel ? { value: universalOptions.xAxisLabel, position: 'bottom' } : undefined}
            />
          )}
          {universalOptions.showYAxis && (
            <YAxis 
              stroke="#64748b" 
              fontSize={universalOptions.fontSize}
              label={universalOptions.yAxisLabel ? { value: universalOptions.yAxisLabel, angle: -90, position: 'left' } : undefined}
            />
          )}
          <Tooltip />
          {universalOptions.showLegend && <Legend />}
          
          <Area
            type={options.smoothLine ? 'monotone' : 'linear'}
            dataKey="location1"
            stroke={colors[0]}
            strokeWidth={options.lineThickness}
            fill={colors[0]}
            fillOpacity={options.areaFillOpacity}
            name="Location 1"
            isAnimationActive={universalOptions.animationEnabled}
            animationDuration={universalOptions.animationDuration}
          />
          <Area
            type={options.smoothLine ? 'monotone' : 'linear'}
            dataKey="location2"
            stroke={colors[1]}
            strokeWidth={options.lineThickness}
            fill={colors[1]}
            fillOpacity={options.areaFillOpacity}
            name="Location 2"
            isAnimationActive={universalOptions.animationEnabled}
            animationDuration={universalOptions.animationDuration}
          />
          <Area
            type={options.smoothLine ? 'monotone' : 'linear'}
            dataKey="location3"
            stroke={colors[2]}
            strokeWidth={options.lineThickness}
            fill={colors[2]}
            fillOpacity={options.areaFillOpacity}
            name="Location 3"
            isAnimationActive={universalOptions.animationEnabled}
            animationDuration={universalOptions.animationDuration}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={universalOptions.height - 80}>
      <LineChart data={sampleHMPITrendData} {...commonChartProps}>
        {universalOptions.showGrid && (
          <CartesianGrid strokeDasharray="3 3" stroke={universalOptions.gridColor} />
        )}
        {universalOptions.showXAxis && (
          <XAxis 
            dataKey="month" 
            stroke="#64748b" 
            fontSize={universalOptions.fontSize}
            label={universalOptions.xAxisLabel ? { value: universalOptions.xAxisLabel, position: 'bottom' } : undefined}
          />
        )}
        {universalOptions.showYAxis && (
          <YAxis 
            stroke="#64748b" 
            fontSize={universalOptions.fontSize}
            label={universalOptions.yAxisLabel ? { value: universalOptions.yAxisLabel, angle: -90, position: 'left' } : undefined}
          />
        )}
        <Tooltip />
        {universalOptions.showLegend && <Legend />}
        
        <Line
          type={options.smoothLine ? 'monotone' : 'linear'}
          dataKey="location1"
          stroke={colors[0]}
          strokeWidth={options.lineThickness}
          strokeDasharray={options.lineStyle === 'dashed' ? '5 5' : options.lineStyle === 'dotted' ? '2 2' : undefined}
          dot={options.markerStyle !== 'none' ? { r: options.markerSize / 2, fill: colors[0] } : false}
          name="Location 1"
          label={options.showDataLabels ? { position: 'top', fontSize: 10 } : undefined}
          isAnimationActive={universalOptions.animationEnabled}
          animationDuration={universalOptions.animationDuration}
        />
        <Line
          type={options.smoothLine ? 'monotone' : 'linear'}
          dataKey="location2"
          stroke={colors[1]}
          strokeWidth={options.lineThickness}
          strokeDasharray={options.lineStyle === 'dashed' ? '5 5' : options.lineStyle === 'dotted' ? '2 2' : undefined}
          dot={options.markerStyle !== 'none' ? { r: options.markerSize / 2, fill: colors[1] } : false}
          name="Location 2"
          isAnimationActive={universalOptions.animationEnabled}
          animationDuration={universalOptions.animationDuration}
        />
        <Line
          type={options.smoothLine ? 'monotone' : 'linear'}
          dataKey="location3"
          stroke={colors[2]}
          strokeWidth={options.lineThickness}
          strokeDasharray={options.lineStyle === 'dashed' ? '5 5' : options.lineStyle === 'dotted' ? '2 2' : undefined}
          dot={options.markerStyle !== 'none' ? { r: options.markerSize / 2, fill: colors[2] } : false}
          name="Location 3"
          isAnimationActive={universalOptions.animationEnabled}
          animationDuration={universalOptions.animationDuration}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartPreview;
