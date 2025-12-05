// Color schemes shared across chart previews
// Brand colors reference: #0A3D62 (brand), #0d4a75 (brand-light), #6EDFF6 (brand-accent)
export const colorSchemes = {
  water: ['#0A3D62', '#0ea5e9', '#6EDFF6', '#10b981', '#06b6d4', '#0284c7'],
  earth: ['#78350f', '#a16207', '#ca8a04', '#65a30d', '#059669', '#047857'],
  scientific: ['#1e3a5f', '#3b82f6', '#8b5cf6', '#ec4899', '#ef4444', '#f97316'],
  custom: ['#0A3D62', '#0ea5e9', '#6EDFF6', '#10b981', '#f59e0b', '#ef4444'],
};

// Brand color constants for use in JavaScript/TypeScript
export const BRAND_COLORS = {
  primary: '#0A3D62',
  light: '#0d4a75',
  accent: '#6EDFF6',
} as const;

export type ColorScheme = keyof typeof colorSchemes;
