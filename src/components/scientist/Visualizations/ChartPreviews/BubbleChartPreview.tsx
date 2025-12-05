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
} from 'recharts';
import { UniversalOptions, BubbleChartOptions } from '../customizationTypes';
import { sampleBubbleData } from '../visualizationData';
import { BRAND_COLORS } from './colorSchemes';

interface BubbleChartPreviewProps {
  options: BubbleChartOptions;
  universalOptions: UniversalOptions;
  colors: string[];
  commonChartProps: Record<string, unknown>;
}

const getBubbleColor = (entry: typeof sampleBubbleData[0], options: BubbleChartOptions) => {
  switch (options.colorCoding) {
    case 'hmpi':
      return entry.z > 100 ? '#ef4444' : entry.z > 60 ? '#f59e0b' : '#10b981';
    case 'risk':
      return entry.z > 100 ? '#ef4444' : entry.z > 60 ? '#f59e0b' : '#10b981';
    default:
      return BRAND_COLORS.primary;
  }
};

export const BubbleChartPreview: React.FC<BubbleChartPreviewProps> = ({
  options,
  universalOptions,
  commonChartProps,
}) => {
  return (
    <ResponsiveContainer width="100%" height={universalOptions.height - 80}>
      <ScatterChart {...commonChartProps}>
        {universalOptions.showGrid && (
          <CartesianGrid strokeDasharray="3 3" stroke={universalOptions.gridColor} />
        )}
        {universalOptions.showXAxis && (
          <XAxis type="number" dataKey="x" name="X" stroke="#64748b" fontSize={universalOptions.fontSize} domain={[0, 500]} />
        )}
        {universalOptions.showYAxis && (
          <YAxis type="number" dataKey="y" name="Y" stroke="#64748b" fontSize={universalOptions.fontSize} domain={[0, 400]} />
        )}
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        {universalOptions.showLegend && <Legend />}
        <Scatter 
          name="Sites" 
          data={sampleBubbleData}
          isAnimationActive={universalOptions.animationEnabled}
          animationDuration={universalOptions.animationDuration}
        >
          {sampleBubbleData.map((entry, index) => (
            <Cell 
              key={`cell-${entry.name}-${index}`}
              fill={getBubbleColor(entry, options)}
              fillOpacity={options.bubbleOpacity}
              stroke={getBubbleColor(entry, options)}
              strokeWidth={options.bubbleBorderWidth}
            />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default BubbleChartPreview;
