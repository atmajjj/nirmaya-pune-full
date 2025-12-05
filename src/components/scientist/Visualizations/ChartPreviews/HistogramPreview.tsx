import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';
import { UniversalOptions, HistogramOptions } from '../customizationTypes';
import { sampleHistogramData } from '../visualizationData';

interface HistogramPreviewProps {
  options: HistogramOptions;
  universalOptions: UniversalOptions;
  commonChartProps: Record<string, unknown>;
}

export const HistogramPreview: React.FC<HistogramPreviewProps> = ({
  options,
  universalOptions,
  commonChartProps,
}) => {
  // Calculate mean for reference line
  const values = sampleHistogramData.map(d => d.count);
  const mean = values.reduce((a, b) => a + b, 0) / values.length;

  return (
    <ResponsiveContainer width="100%" height={universalOptions.height - 80}>
      <BarChart data={sampleHistogramData} {...commonChartProps}>
        {universalOptions.showGrid && (
          <CartesianGrid strokeDasharray="3 3" stroke={universalOptions.gridColor} />
        )}
        {universalOptions.showXAxis && (
          <XAxis dataKey="range" stroke="#64748b" fontSize={universalOptions.fontSize} />
        )}
        {universalOptions.showYAxis && (
          <YAxis stroke="#64748b" fontSize={universalOptions.fontSize} />
        )}
        <Tooltip />
        {universalOptions.showLegend && <Legend />}
        <Bar 
          dataKey="count" 
          fill={options.binColor}
          fillOpacity={options.binOpacity}
          radius={[4, 4, 0, 0]}
          name="Frequency"
          isAnimationActive={universalOptions.animationEnabled}
          animationDuration={universalOptions.animationDuration}
        />
        {options.showMeanLine && (
          <ReferenceLine y={mean} stroke="#ef4444" strokeDasharray="5 5" label={{ value: 'Mean', fill: '#ef4444', fontSize: 10 }} />
        )}
        {options.showThresholdLines && options.thresholdValues.map((val, i) => (
          <ReferenceLine key={`threshold-${i}`} y={val * 10} stroke="#f59e0b" strokeDasharray="3 3" />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HistogramPreview;
