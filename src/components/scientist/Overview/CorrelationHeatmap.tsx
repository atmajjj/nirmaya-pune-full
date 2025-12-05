import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings2, Save, ChevronDown, ChevronUp, RotateCcw, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Sample dataset: Metal concentrations across multiple sampling sites (µg/L)
const metalConcentrations = {
  As: [12.5, 8.3, 15.7, 9.2, 11.8, 14.2, 7.6, 13.9, 10.4, 16.1, 8.9, 12.3, 14.8, 9.7, 11.2],
  Pb: [18.2, 12.4, 22.6, 14.8, 17.3, 21.5, 11.2, 19.8, 15.6, 24.3, 13.1, 18.7, 20.9, 14.2, 16.8],
  Hg: [0.8, 0.5, 1.2, 0.6, 0.9, 1.1, 0.4, 1.0, 0.7, 1.3, 0.5, 0.9, 1.1, 0.6, 0.8],
  Cd: [3.2, 2.1, 4.5, 2.8, 3.6, 4.2, 1.9, 3.8, 2.9, 4.8, 2.3, 3.4, 4.1, 2.6, 3.3],
  Cr: [45.2, 32.8, 58.4, 38.6, 48.2, 54.7, 28.9, 51.3, 41.5, 62.1, 35.2, 47.8, 55.6, 39.4, 44.7],
  Fe: [285, 312, 268, 295, 278, 302, 325, 272, 298, 265, 318, 282, 275, 308, 290],
  Mn: [82.5, 95.3, 78.2, 88.6, 81.4, 92.7, 98.5, 76.8, 90.2, 74.5, 96.8, 84.3, 79.6, 93.1, 86.4],
};

type MetalKey = keyof typeof metalConcentrations;
const metals: MetalKey[] = ['As', 'Pb', 'Hg', 'Cd', 'Cr', 'Fe', 'Mn'];

const metalFullNames: Record<MetalKey, string> = {
  As: 'Arsenic',
  Pb: 'Lead',
  Hg: 'Mercury',
  Cd: 'Cadmium',
  Cr: 'Chromium',
  Fe: 'Iron',
  Mn: 'Manganese',
};

/**
 * Compute Pearson's Correlation Coefficient manually using the formula:
 * r = [NΣ(XY) - (ΣX)(ΣY)] / sqrt{[NΣX² - (ΣX)²][NΣY² - (ΣY)²]}
 */
function computePearsonCorrelation(x: number[], y: number[]): number {
  const n = x.length;
  if (n !== y.length || n === 0) return 0;

  // Calculate sums
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;
  let sumY2 = 0;

  for (let i = 0; i < n; i++) {
    sumX += x[i];
    sumY += y[i];
    sumXY += x[i] * y[i];
    sumX2 += x[i] * x[i];
    sumY2 += y[i] * y[i];
  }

  // Apply Pearson's formula
  const numerator = (n * sumXY) - (sumX * sumY);
  const denominator = Math.sqrt(
    ((n * sumX2) - (sumX * sumX)) * ((n * sumY2) - (sumY * sumY))
  );

  if (denominator === 0) return 0;
  
  return numerator / denominator;
}

/**
 * Get color based on correlation value
 * Red = strong positive, White = no correlation, Blue = strong negative
 */
function getCorrelationColor(r: number): string {
  // Clamp r between -1 and 1
  r = Math.max(-1, Math.min(1, r));
  
  if (r >= 0) {
    // Positive correlation: white to red
    const intensity = Math.round(r * 255);
    return `rgb(255, ${255 - intensity}, ${255 - intensity})`;
  } else {
    // Negative correlation: white to blue
    const intensity = Math.round(Math.abs(r) * 255);
    return `rgb(${255 - intensity}, ${255 - intensity}, 255)`;
  }
}

/**
 * Get text color based on background intensity
 */
function getTextColor(r: number): string {
  return Math.abs(r) > 0.6 ? 'white' : '#1e293b';
}

export const CorrelationHeatmap = () => {
const [showSettings, setShowSettings] = useState(false);
  const [showValues, setShowValues] = useState(true);
  const [selectedMetals, setSelectedMetals] = useState<MetalKey[]>(metals);
  const [colorIntensity, setColorIntensity] = useState(1);

  // Compute correlation matrix
  const correlationMatrix = useMemo(() => {
    const matrix: Record<MetalKey, Record<MetalKey, number>> = {} as Record<MetalKey, Record<MetalKey, number>>;
    
    for (const metal1 of selectedMetals) {
      matrix[metal1] = {} as Record<MetalKey, number>;
      for (const metal2 of selectedMetals) {
        if (metal1 === metal2) {
          matrix[metal1][metal2] = 1; // Perfect correlation with self
        } else {
          const r = computePearsonCorrelation(
            metalConcentrations[metal1],
            metalConcentrations[metal2]
          );
          matrix[metal1][metal2] = r;
        }
      }
    }
    
    return matrix;
  }, [selectedMetals]);

  const toggleMetal = (metal: MetalKey) => {
    if (selectedMetals.includes(metal)) {
      if (selectedMetals.length > 2) {
        setSelectedMetals(selectedMetals.filter(m => m !== metal));
      }
    } else {
      setSelectedMetals([...selectedMetals, metal]);
    }
  };

  const resetSettings = () => {
    setShowValues(true);
    setSelectedMetals(metals);
    setColorIntensity(1);
  };

  const handleSave = () => {
    alert("Correlation heatmap saved to dashboard!");
  };

  // Calculate statistics
  const stats = useMemo(() => {
    let maxPositive = { value: 0, pair: ['', ''] };
    let maxNegative = { value: 0, pair: ['', ''] };
    let avgCorrelation = 0;
    let count = 0;

    for (let i = 0; i < selectedMetals.length; i++) {
      for (let j = i + 1; j < selectedMetals.length; j++) {
        const r = correlationMatrix[selectedMetals[i]][selectedMetals[j]];
        avgCorrelation += r;
        count++;

        if (r > maxPositive.value) {
          maxPositive = { value: r, pair: [selectedMetals[i], selectedMetals[j]] };
        }
        if (r < maxNegative.value) {
          maxNegative = { value: r, pair: [selectedMetals[i], selectedMetals[j]] };
        }
      }
    }

    return {
      maxPositive,
      maxNegative,
      avgCorrelation: count > 0 ? avgCorrelation / count : 0,
    };
  }, [correlationMatrix, selectedMetals]);

  return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-slate-800 text-lg font-semibold flex items-center gap-2">
              Pearson's Correlation Matrix of Heavy Metals
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-slate-400" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm">
                    <p className="text-xs">
                      r = [NΣ(XY) - (ΣX)(ΣY)] / √{'{[NΣX² - (ΣX)²][NΣY² - (ΣY)²]}'}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <p className="text-sm text-slate-500 mt-1">
              Correlation coefficients computed manually using the empirical Pearson formula
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2"
            >
              <Settings2 className="h-4 w-4" />
              {showSettings ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
              className="flex items-center gap-2 bg-brand hover:bg-brand-light"
            >
              <Save className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {showSettings && (
          <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-slate-700">Chart Settings</h4>
              <Button variant="ghost" size="sm" onClick={resetSettings}>
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-slate-600">Metals to Include</Label>
                <div className="flex flex-wrap gap-2">
                  {metals.map((metal) => (
                    <button
                      key={metal}
                      onClick={() => toggleMetal(metal)}
                      className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                        selectedMetals.includes(metal)
                          ? 'bg-brand text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {metal}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm text-slate-600">Show r-values</Label>
                <Switch checked={showValues} onCheckedChange={setShowValues} />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-slate-600">Color Intensity: {colorIntensity.toFixed(1)}</Label>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={colorIntensity}
                  onChange={(e) => setColorIntensity(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-6">
        {/* Color Legend */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-xs text-slate-600">Strong Negative (-1)</span>
          <div className="flex h-4 w-48 rounded overflow-hidden">
            <div className="flex-1 bg-blue-600"></div>
            <div className="flex-1 bg-blue-400"></div>
            <div className="flex-1 bg-blue-200"></div>
            <div className="flex-1 bg-white border-y border-slate-200"></div>
            <div className="flex-1 bg-red-200"></div>
            <div className="flex-1 bg-red-400"></div>
            <div className="flex-1 bg-red-600"></div>
          </div>
          <span className="text-xs text-slate-600">Strong Positive (+1)</span>
        </div>

        {/* Correlation Matrix Heatmap */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 text-xs font-medium text-slate-600 bg-slate-50"></th>
                {selectedMetals.map((metal) => (
                  <th 
                    key={metal} 
                    className="p-2 text-xs font-semibold text-slate-700 bg-slate-50 min-w-[60px]"
                    title={metalFullNames[metal]}
                  >
                    {metal}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {selectedMetals.map((metal1) => (
                <tr key={metal1}>
                  <td 
                    className="p-2 text-xs font-semibold text-slate-700 bg-slate-50 min-w-[60px]"
                    title={metalFullNames[metal1]}
                  >
                    {metal1}
                  </td>
                  {selectedMetals.map((metal2) => {
                    const r = correlationMatrix[metal1][metal2];
                    const adjustedR = r * colorIntensity;
                    const bgColor = getCorrelationColor(adjustedR);
                    const textColor = getTextColor(adjustedR);
                    
                    return (
                      <td
                        key={`${metal1}-${metal2}`}
                        className="p-2 text-center transition-all duration-200 cursor-pointer hover:ring-2 hover:ring-brand hover:ring-inset"
                        style={{ 
                          backgroundColor: bgColor,
                          color: textColor,
                          minWidth: '60px',
                        }}
                        title={`${metalFullNames[metal1]} vs ${metalFullNames[metal2]}: r = ${r.toFixed(4)}`}
                      >
                        {showValues && (
                          <span className="text-xs font-mono font-semibold">
                            {r.toFixed(2)}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Statistics Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 p-3 rounded-lg border border-red-200">
            <p className="text-xs text-red-600 font-medium mb-1">Strongest Positive</p>
            <p className="text-lg font-bold text-red-700">
              r = {stats.maxPositive.value.toFixed(3)}
            </p>
            <p className="text-xs text-red-600">
              {stats.maxPositive.pair[0]} ↔ {stats.maxPositive.pair[1]}
            </p>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-600 font-medium mb-1">Strongest Negative</p>
            <p className="text-lg font-bold text-blue-700">
              r = {stats.maxNegative.value.toFixed(3)}
            </p>
            <p className="text-xs text-blue-600">
              {stats.maxNegative.pair[0] || 'N/A'} ↔ {stats.maxNegative.pair[1] || 'N/A'}
            </p>
          </div>
          
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <p className="text-xs text-slate-600 font-medium mb-1">Average Correlation</p>
            <p className="text-lg font-bold text-slate-700">
              r = {stats.avgCorrelation.toFixed(3)}
            </p>
            <p className="text-xs text-slate-500">
              Across {(selectedMetals.length * (selectedMetals.length - 1)) / 2} pairs
            </p>
          </div>
        </div>

        {/* Formula Reference */}
        <div className="mt-4 p-4 bg-slate-900 rounded-lg">
          <p className="text-xs text-slate-400 mb-2">Pearson's Correlation Formula:</p>
          <p className="text-sm text-green-400 font-mono">
            r = [NΣ(XY) - (ΣX)(ΣY)] / √{'{'} [NΣX² - (ΣX)²] × [NΣY² - (ΣY)²] {'}'}
          </p>
          <p className="text-xs text-slate-500 mt-2">
            Where N = sample size, X and Y = metal concentrations
          </p>
        </div>

        {/* Footer Info */}
        <div className="mt-4 text-xs text-slate-500 bg-slate-50 p-3 rounded-lg">
          <p>
            <strong>Interpretation:</strong> r {'>'} 0.7 = Strong positive | 0.3-0.7 = Moderate | 
            r {'<'} 0.3 = Weak | Negative values indicate inverse relationships
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CorrelationHeatmap;
