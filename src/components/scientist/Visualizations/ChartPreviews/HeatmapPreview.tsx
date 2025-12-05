import React from 'react';
import { UniversalOptions, HeatmapOptions } from '../customizationTypes';

interface HeatmapPreviewProps {
  options: HeatmapOptions;
  universalOptions: UniversalOptions;
}

const metals = ['Pb', 'As', 'Cd', 'Cr', 'Fe'];

const getHeatmapColor = (value: number, options: HeatmapOptions) => {
  const normalized = (value - options.rangeMin) / (options.rangeMax - options.rangeMin);
  switch (options.colorScale) {
    case 'red-blue':
      return `rgba(${Math.round(239 * normalized)}, ${Math.round(68 * (1 - normalized))}, ${Math.round(68 + 180 * (1 - normalized))}, ${normalized * 0.8 + 0.2})`;
    case 'yellow-green':
      return `rgba(${Math.round(250 * (1 - normalized))}, ${Math.round(200 - 100 * (1 - normalized))}, ${Math.round(50 * (1 - normalized))}, ${normalized * 0.8 + 0.2})`;
    default:
      return `rgba(10, 61, 98, ${normalized})`;
  }
};

export const HeatmapPreview: React.FC<HeatmapPreviewProps> = ({
  options,
  universalOptions,
}) => {
  return (
    <div className="h-full flex items-center justify-center">
      <div 
        className="rounded-lg overflow-hidden border"
        style={{ 
          backgroundColor: universalOptions.backgroundColor,
          padding: universalOptions.padding,
        }}
      >
        <div className="grid gap-px" style={{ gridTemplateColumns: `repeat(${metals.length + 1}, minmax(0, 1fr))` }}>
          {/* Header row */}
          <div className="w-12 h-8" />
          {metals.map((metal) => (
            <div key={`header-${metal}`} className="w-12 h-8 flex items-center justify-center text-xs font-medium text-slate-600">
              {metal}
            </div>
          ))}
          
          {/* Data rows */}
          {metals.map((rowMetal, rowIdx) => (
            <React.Fragment key={`row-${rowMetal}`}>
              <div className="w-12 h-12 flex items-center justify-center text-xs font-medium text-slate-600">
                {rowMetal}
              </div>
              {metals.map((colMetal, colIdx) => {
                const value = rowIdx === colIdx ? 100 : Math.abs(Math.sin((rowIdx + colIdx) * 0.7)) * 80 + 10;
                return (
                  <div
                    key={`cell-${rowIdx}-${colIdx}`}
                    className="w-12 h-12 flex items-center justify-center text-xs transition-all hover:scale-105"
                    style={{
                      backgroundColor: getHeatmapColor(value, options),
                      color: value > 50 ? 'white' : '#334155',
                      borderWidth: options.cellBorderWidth,
                      borderColor: 'white',
                    }}
                  >
                    {options.showCellValues && value.toFixed(0)}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeatmapPreview;
