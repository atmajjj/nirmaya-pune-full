import type { SavedFormula, Variable } from './types';

export const savedFormulas: SavedFormula[] = [
  {
    id: 'HPI-001',
    name: 'Heavy Metal Pollution Index (HPI)',
    expression: 'HPI = Σ(Qᵢ × Wᵢ) / Σ(Wᵢ)  where Qᵢ = |((Mᵢ - Iᵢ) / (Sᵢ - Iᵢ))| × 100, Wᵢ = 1/Sᵢ',
    description: 'HPI < 50: Low pollution | 50-100: Medium | > 100: High pollution. Mᵢ = measured concentration, Sᵢ = standard limit, Iᵢ = ideal value (usually 0)',
    lastUsed: 'Standard Formula',
    category: 'HMPI'
  },
  {
    id: 'HEI-001',
    name: 'Heavy Metal Evaluation Index (HEI)',
    expression: 'HEI = Σ(Mᵢ / Sᵢ)',
    description: 'HEI < 10: Low pollution | 10-20: Medium | > 20: High contamination. Simple ratio sum of measured to standard values.',
    lastUsed: 'Standard Formula',
    category: 'HMPI'
  },
  {
    id: 'MPI-001',
    name: 'Metal Pollution Index (MPI)',
    expression: 'MPI = (C₁ × C₂ × C₃ × ... × Cₙ)^(1/n)',
    description: 'Geometric mean of all metal concentrations. Used for summarizing multi-metal load in water/sediments.',
    lastUsed: 'Standard Formula',
    category: 'HMPI'
  },
  {
    id: 'CD-001',
    name: 'Contamination Degree (Cd)',
    expression: 'Cd = Σ(Cf,ᵢ)  where Cf,ᵢ = Cᵢ / C₀,ᵢ',
    description: 'Cd < 8: Low degree | 8-16: Medium | > 16: High contamination. Cᵢ = measured concentration, C₀,ᵢ = background/reference value (Håkanson 1980)',
    lastUsed: 'Standard Formula',
    category: 'HMPI'
  },
  {
    id: 'PLI-001',
    name: 'Pollution Load Index (PLI)',
    expression: 'PLI = (CF₁ × CF₂ × ... × CFₙ)^(1/n)  where CFᵢ = Cᵢ / C₀,ᵢ',
    description: 'PLI = 1: Baseline | PLI < 1: Unpolluted | PLI > 1: Polluted/Deterioration. Geometric mean of contamination factors.',
    lastUsed: 'Standard Formula',
    category: 'HMPI'
  },
  {
    id: 'WQI-001',
    name: 'Water Quality Index (WQI)',
    expression: 'WQI = Σ(Qᵢ × Wᵢ) / Σ(Wᵢ)  where Qᵢ = (Mᵢ / Sᵢ) × 100, Wᵢ = 1/Sᵢ',
    description: '< 50: Excellent | 50-100: Good | 100-200: Poor | 200-300: Very Poor | > 300: Unsuitable. Weighted arithmetic index method.',
    lastUsed: 'Standard Formula',
    category: 'HMPI'
  },
  {
    id: 'PIG-001',
    name: 'Pollution Index of Groundwater (PIG)',
    expression: 'PIG = Σ(Qᵢ)  where Qᵢ = Rᵢ × Cᵢ, Rᵢ = Wᵢ / Σ(Wᵢ), Cᵢ = Mᵢ / Sᵢ',
    description: '< 1: Insignificant | 1-1.5: Low | 1.5-2: Moderate | 2-2.5: High | > 2.5: Very High pollution. Wᵢ = toxicity weight (1-5)',
    lastUsed: 'Standard Formula',
    category: 'HMPI'
  },
];

export const availableVariables: Variable[] = [
  { symbol: 'Mᵢ', name: 'Measured Concentration', unit: 'µg/L', description: 'Measured heavy metal concentration in sample' },
  { symbol: 'Sᵢ', name: 'Standard Limit', unit: 'µg/L', description: 'WHO/BIS permissible limit for the metal' },
  { symbol: 'Iᵢ', name: 'Ideal Value', unit: 'µg/L', description: 'Ideal value (usually 0, except for pH)' },
  { symbol: 'C₀,ᵢ', name: 'Background Value', unit: 'µg/L', description: 'Background/reference concentration value' },
  { symbol: 'Qᵢ', name: 'Quality Rating', unit: 'unitless', description: 'Sub-index quality rating for each parameter' },
  { symbol: 'Wᵢ', name: 'Weight Factor', unit: 'unitless', description: 'Relative importance weight (often 1/Sᵢ or toxicity-based)' },
  { symbol: 'Rᵢ', name: 'Relative Weight', unit: 'unitless', description: 'Normalized weight = Wᵢ / Σ(Wᵢ)' },
  { symbol: 'CFᵢ', name: 'Contamination Factor', unit: 'unitless', description: 'Ratio of measured to background: Cᵢ / C₀,ᵢ' },
  { symbol: 'n', name: 'Parameter Count', unit: 'number', description: 'Total number of metals/parameters analyzed' },
];
