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
} from 'recharts';
import { UniversalOptions, BarChartOptions } from '../customizationTypes';
import { sampleContaminantData } from '../visualizationData';

interface BarChartPreviewProps {
  options: BarChartOptions;
  universalOptions: UniversalOptions;
  colors: string[];
  commonChartProps: Record<string, unknown>;
}

export const BarChartPreview: React.FC<BarChartPreviewProps> = ({
  options,
  universalOptions,
  colors,
  commonChartProps,
}) => {
  const isHorizontal = options.orientation === 'horizontal';

  return (
    <ResponsiveContainer width="100%" height={universalOptions.height - 80}>
      <BarChart 
        data={sampleContaminantData} 
        layout={isHorizontal ? 'vertical' : 'horizontal'}
        barCategoryGap={options.barSpacing}
        {...commonChartProps}
      >
        {universalOptions.showGrid && (
          <CartesianGrid strokeDasharray="3 3" stroke={universalOptions.gridColor} />
        )}
        {isHorizontal ? (
          <>
            {universalOptions.showXAxis && <XAxis type="number" stroke="#64748b" fontSize={universalOptions.fontSize} />}
            {universalOptions.showYAxis && <YAxis type="category" dataKey="name" stroke="#64748b" fontSize={universalOptions.fontSize} width={40} />}
          </>
        ) : (
          <>
            {universalOptions.showXAxis && <XAxis dataKey="name" stroke="#64748b" fontSize={universalOptions.fontSize} />}
            {universalOptions.showYAxis && <YAxis stroke="#64748b" fontSize={universalOptions.fontSize} />}
          </>
        )}
        <Tooltip />
        {universalOptions.showLegend && <Legend />}
        <Bar 
          dataKey="value" 
          fill={colors[0]}
          radius={[options.borderRadius, options.borderRadius, 0, 0]}
          barSize={options.barThickness}
          name="Concentration"
          isAnimationActive={universalOptions.animationEnabled}
          animationDuration={universalOptions.animationDuration}
          label={options.showBarLabels ? { position: options.barLabelPosition === 'inside' ? 'center' : 'top', fontSize: 10 } : undefined}
        />
        {options.barMode === 'grouped' && (
          <Bar 
            dataKey="limit" 
            fill={colors[1]}
            radius={[options.borderRadius, options.borderRadius, 0, 0]}
            barSize={options.barThickness}
            name="WHO Limit"
            isAnimationActive={universalOptions.animationEnabled}
            animationDuration={universalOptions.animationDuration}
          />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartPreview;
