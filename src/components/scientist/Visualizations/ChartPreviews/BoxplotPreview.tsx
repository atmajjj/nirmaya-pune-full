import React from 'react';
import { UniversalOptions, BoxplotOptions } from '../customizationTypes';

interface BoxplotPreviewProps {
  options: BoxplotOptions;
  universalOptions: UniversalOptions;
  colors: string[];
}

const metals = ['Pb', 'As', 'Cd', 'Cr', 'Fe', 'Mn'];

export const BoxplotPreview: React.FC<BoxplotPreviewProps> = ({
  options,
  universalOptions,
  colors,
}) => {
  return (
    <div 
      className="h-full flex items-end justify-around gap-4 p-4"
      style={{ backgroundColor: universalOptions.backgroundColor }}
    >
      {metals.map((metal, index) => {
        return (
          <div key={metal} className="flex flex-col items-center flex-1">
            {/* Boxplot visualization */}
            <div className="relative flex justify-center mb-2" style={{ height: '200px', width: options.boxWidth }}>
              {/* Whisker line */}
              <div 
                className="absolute bg-slate-400" 
                style={{ 
                  width: '2px',
                  height: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)'
                }}
              />
              {/* Top whisker cap */}
              {options.whiskerStyle === 'capped' && (
                <div 
                  className="absolute bg-slate-400" 
                  style={{ 
                    width: options.boxWidth * 0.4,
                    height: '2px',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                />
              )}
              {/* Bottom whisker cap */}
              {options.whiskerStyle === 'capped' && (
                <div 
                  className="absolute bg-slate-400" 
                  style={{ 
                    width: options.boxWidth * 0.4,
                    height: '2px',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                />
              )}
              {/* Box */}
              <div 
                className="absolute rounded-sm"
                style={{ 
                  backgroundColor: colors[index % colors.length],
                  opacity: 0.8,
                  top: '25%',
                  height: '50%',
                  width: options.boxWidth,
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              >
                {/* Median line */}
                <div className="absolute w-full h-0.5 bg-white" style={{ top: '50%' }} />
                
                {/* Mean marker */}
                {options.showMeanMarker && (
                  <div 
                    className="absolute w-2 h-2 bg-white rounded-full border-2"
                    style={{ 
                      borderColor: colors[index % colors.length],
                      top: '40%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                )}
              </div>
              
              {/* Outliers */}
              {options.showOutliers && (
                <>
                  <div 
                    className={`absolute ${options.outlierMarkerStyle === 'diamond' ? 'rotate-45' : 'rounded-full'}`}
                    style={{
                      width: options.outlierMarkerSize,
                      height: options.outlierMarkerSize,
                      backgroundColor: colors[index % colors.length],
                      top: '5%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  />
                  <div 
                    className={`absolute ${options.outlierMarkerStyle === 'diamond' ? 'rotate-45' : 'rounded-full'}`}
                    style={{
                      width: options.outlierMarkerSize,
                      height: options.outlierMarkerSize,
                      backgroundColor: colors[index % colors.length],
                      bottom: '8%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  />
                </>
              )}
            </div>
            <span className="text-xs font-medium text-slate-600">{metal}</span>
          </div>
        );
      })}
    </div>
  );
};

export default BoxplotPreview;
