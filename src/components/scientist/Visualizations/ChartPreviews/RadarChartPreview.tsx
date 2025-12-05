import React from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
} from 'recharts';
import { UniversalOptions, RadarChartOptions } from '../customizationTypes';
import { sampleRadarData } from '../visualizationData';

interface RadarChartPreviewProps {
  options: RadarChartOptions;
  universalOptions: UniversalOptions;
  colors: string[];
  commonChartProps: Record<string, unknown>;
}

export const RadarChartPreview: React.FC<RadarChartPreviewProps> = ({
  options,
  universalOptions,
  colors,
  commonChartProps,
}) => {
  return (
    <ResponsiveContainer width="100%" height={universalOptions.height - 80}>
      <RadarChart data={sampleRadarData} {...commonChartProps}>
        <PolarGrid stroke={universalOptions.gridColor} gridType={options.gridType} />
        <PolarAngleAxis 
          dataKey="metal" 
          stroke="#64748b" 
          fontSize={options.showAxisLabels ? options.axisLabelFontSize : 0}
          tick={options.showAxisLabels}
        />
        <PolarRadiusAxis stroke="#64748b" fontSize={10} />
        <Radar
          name="Sample A"
          dataKey="A"
          stroke={colors[0]}
          fill={colors[0]}
          fillOpacity={options.fillOpacity}
          strokeWidth={options.lineStrokeWidth}
          dot={options.showPointMarkers ? { r: options.pointMarkerSize } : false}
          isAnimationActive={universalOptions.animationEnabled}
          animationDuration={universalOptions.animationDuration}
        />
        <Radar
          name="Sample B"
          dataKey="B"
          stroke={colors[1]}
          fill={colors[1]}
          fillOpacity={options.fillOpacity}
          strokeWidth={options.lineStrokeWidth}
          dot={options.showPointMarkers ? { r: options.pointMarkerSize } : false}
          isAnimationActive={universalOptions.animationEnabled}
          animationDuration={universalOptions.animationDuration}
        />
        {universalOptions.showLegend && <Legend />}
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default RadarChartPreview;
