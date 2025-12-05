import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from 'recharts';
import { UniversalOptions, PieChartOptions } from '../customizationTypes';
import { sampleQualityData } from '../visualizationData';

interface PieChartPreviewProps {
  options: PieChartOptions;
  universalOptions: UniversalOptions;
  colors: string[];
  commonChartProps: Record<string, unknown>;
}

export const PieChartPreview: React.FC<PieChartPreviewProps> = ({
  options,
  universalOptions,
  colors,
  commonChartProps,
}) => {
  const data = options.sortSegments 
    ? [...sampleQualityData].sort((a, b) => b.value - a.value)
    : sampleQualityData;

  return (
    <ResponsiveContainer width="100%" height={universalOptions.height - 80}>
      <PieChart {...commonChartProps}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={options.innerRadius > 0 ? `${options.innerRadius}%` : 0}
          outerRadius="80%"
          paddingAngle={options.segmentSpacing}
          startAngle={options.startAngle}
          endAngle={options.startAngle + 360}
          dataKey="value"
          label={options.showSegmentLabels || options.showPercentageLabels ? ({ name, percent }) => {
            const parts: string[] = [];
            if (options.showSegmentLabels) parts.push(name);
            if (options.showPercentageLabels) parts.push(`${(percent * 100).toFixed(0)}%`);
            return parts.join(' ');
          } : undefined}
          labelLine={options.labelPosition === 'outside'}
          isAnimationActive={universalOptions.animationEnabled}
          animationDuration={universalOptions.animationDuration}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${entry.name}-${index}`} 
              fill={entry.color || colors[index % colors.length]}
              className={options.highlightOnHover ? 'hover:opacity-80 cursor-pointer transition-opacity' : ''}
            />
          ))}
        </Pie>
        {universalOptions.showLegend && <Legend />}
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartPreview;
