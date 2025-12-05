import React from 'react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ReferenceLine,
} from 'recharts';
import { UniversalOptions, ScatterPlotOptions } from '../customizationTypes';
import { sampleScatterData } from '../visualizationData';

interface ScatterChartPreviewProps {
  options: ScatterPlotOptions;
  universalOptions: UniversalOptions;
  colors: string[];
  commonChartProps: Record<string, unknown>;
}

export const ScatterChartPreview: React.FC<ScatterChartPreviewProps> = ({
  options,
  universalOptions,
  colors,
  commonChartProps,
}) => {
  return (
    <ResponsiveContainer width="100%" height={universalOptions.height - 80}>
      <ScatterChart {...commonChartProps}>
        {universalOptions.showGrid && (
          <CartesianGrid strokeDasharray="3 3" stroke={universalOptions.gridColor} />
        )}
        {universalOptions.showXAxis && (
          <XAxis type="number" dataKey="depth" name="Depth" unit="m" stroke="#64748b" fontSize={universalOptions.fontSize} />
        )}
        {universalOptions.showYAxis && (
          <YAxis type="number" dataKey="hmpi" name="HMPI" stroke="#64748b" fontSize={universalOptions.fontSize} />
        )}
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        {universalOptions.showLegend && <Legend />}
        <Scatter 
          name="Wells" 
          data={sampleScatterData} 
          fill={colors[0]}
          fillOpacity={options.pointOpacity}
          isAnimationActive={universalOptions.animationEnabled}
          animationDuration={universalOptions.animationDuration}
        >
          {sampleScatterData.map((entry, index) => (
            <Cell 
              key={`cell-${entry.site}-${index}`} 
              fill={entry.hmpi > 1 ? '#ef4444' : '#10b981'}
              fillOpacity={options.pointOpacity}
            />
          ))}
        </Scatter>
        {options.showTrendLine && (
          <ReferenceLine 
            segment={[{ x: 15, y: 0.9 }, { x: 85, y: 0.5 }]} 
            stroke={colors[0]} 
            strokeDasharray="5 5"
            strokeWidth={2}
          />
        )}
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterChartPreview;
