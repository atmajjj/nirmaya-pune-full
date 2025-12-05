/**
 * Nirmaya Theme Constants
 * 
 * Centralized theme configuration for consistent styling across the application.
 * Use these constants instead of hardcoding color values.
 * 
 * For Tailwind classes, use: bg-brand, text-brand-accent, etc.
 * For JavaScript/Charts, import from this file.
 */

/**
 * Brand Colors - Water Theme Palette
 * These match the Tailwind config brand colors
 */
export const BRAND_COLORS = {
  // Primary Brand Colors
  primary: '#0A3D62',        // Deep Water Blue - Main brand color
  primaryLight: '#0d4a75',   // Lighter Blue - Hover states, secondary
  primaryDark: '#082d49',    // Darker Blue - Active states

  // Accent Colors
  accent: '#6EDFF6',         // Light Aqua - Highlights, active states
  accentHover: '#4FD3E7',    // Aqua Hover state
  
  // Secondary Colors
  secondary: '#00A8E8',      // Aqua Blue - Secondary actions
  secondaryDark: '#007EA7',  // Darker Aqua - Gradients

  // Neutral Colors
  muted: '#A7B4BE',          // Muted text on dark backgrounds
  surface: '#DDE3E8',        // Light surface/text color

  // Dark Theme Colors
  navy: '#102E46',           // Sidebar background
  navyLight: '#1a5276',      // Navy borders, lighter variant
} as const;

/**
 * Chart Color Palette
 * Use for data visualizations and charts
 */
export const CHART_COLORS = {
  primary: [
    BRAND_COLORS.primary,
    BRAND_COLORS.secondary,
    BRAND_COLORS.accent,
    '#10b981',  // Green - Safe/Positive
    '#f59e0b',  // Amber - Warning
    '#ef4444',  // Red - Danger
  ],
  // Water quality specific
  waterQuality: {
    safe: '#10b981',      // Green
    moderate: '#f59e0b',  // Amber
    unsafe: '#ef4444',    // Red
    unknown: '#94a3b8',   // Gray
  },
  // Sequential blue palette for maps/heatmaps
  sequential: [
    '#e0f2fe',
    '#bae6fd',
    '#7dd3fc',
    '#38bdf8',
    '#0ea5e9',
    BRAND_COLORS.secondary,
    BRAND_COLORS.primary,
  ],
} as const;

/**
 * Gradient Definitions
 * CSS gradient strings for consistent gradient usage
 */
export const GRADIENTS = {
  // Primary gradient (buttons, headers)
  primary: `linear-gradient(to right, ${BRAND_COLORS.primary}, ${BRAND_COLORS.primaryLight})`,
  primaryHover: `linear-gradient(to right, ${BRAND_COLORS.primaryLight}, ${BRAND_COLORS.primary})`,
  
  // Brand gradient (diagonal)
  brandDiagonal: `linear-gradient(135deg, ${BRAND_COLORS.primary}, ${BRAND_COLORS.primaryLight})`,
  
  // Secondary gradient
  secondary: `linear-gradient(135deg, ${BRAND_COLORS.secondary}, ${BRAND_COLORS.secondaryDark})`,
  
  // Overlay gradients (for images)
  overlayHorizontal: `linear-gradient(to right, ${BRAND_COLORS.primary}B3, ${BRAND_COLORS.primary}80, transparent)`,
  overlayVertical: `linear-gradient(to top, ${BRAND_COLORS.primary}CC, transparent, ${BRAND_COLORS.primary}66)`,
} as const;

/**
 * Tailwind class mappings
 * Pre-defined class combinations for common patterns
 */
export const THEME_CLASSES = {
  // Button variants
  buttonPrimary: 'bg-gradient-to-r from-brand to-brand-light hover:from-brand-light hover:to-brand text-white shadow-lg hover:shadow-xl transition-all duration-300',
  buttonSecondary: 'bg-gradient-to-br from-brand-secondary to-brand-secondary-dark text-white shadow-lg',
  
  // Icon containers
  iconContainer: 'bg-gradient-to-br from-brand to-brand-light rounded-2xl flex items-center justify-center shadow-lg',
  iconContainerSecondary: 'bg-gradient-to-br from-brand-secondary to-brand-secondary-dark rounded-lg flex items-center justify-center shadow-lg',
  
  // Text on dark backgrounds
  textOnDark: 'text-brand-surface',
  textOnDarkMuted: 'text-brand-muted',
  textOnDarkAccent: 'text-brand-accent',
  
  // Interactive states on dark backgrounds
  hoverOnDark: 'hover:bg-brand-secondary/20 hover:text-brand-accent',
  activeOnDark: 'bg-brand-accent/15 text-brand-accent font-medium',
  
  // Borders
  borderOnDark: 'border-brand-navy-light/30',
  
  // Focus rings
  focusRing: 'focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent/50',
  focusRingPrimary: 'focus:ring-2 focus:ring-brand/20 focus:border-brand',
} as const;

/**
 * Shadow definitions
 * Use for consistent shadows across the app
 */
export const SHADOWS = {
  card: `0 2px 8px ${BRAND_COLORS.primary}1A`,
  hover: `0 4px 16px ${BRAND_COLORS.secondary}26`,
  button: `0 4px 14px ${BRAND_COLORS.primary}40`,
} as const;

/**
 * Typography Scale
 * Font sizes optimized for readability
 * These match the CSS variables in index.css
 */
export const TYPOGRAPHY = {
  // Font sizes in rem (matching CSS variables)
  fontSize: {
    xs: '0.875rem',     // 14px - captions, badges
    sm: '1rem',         // 16px - secondary text
    base: '1.0625rem',  // 17px - body text
    lg: '1.1875rem',    // 19px - emphasized text
    xl: '1.375rem',     // 22px - subheadings
    '2xl': '1.625rem',  // 26px - section headers
    '3xl': '2rem',      // 32px - page titles
    '4xl': '2.5rem',    // 40px - hero text
  },
  // Line heights
  lineHeight: {
    tight: 1.2,
    snug: 1.3,
    normal: 1.5,
    relaxed: 1.6,
  },
  // Font weights
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

/**
 * Typography Class Presets
 * Ready-to-use Tailwind class combinations for common text styles
 */
export const TEXT_STYLES = {
  // Page elements
  pageTitle: 'text-3xl font-bold text-foreground',
  sectionTitle: 'text-2xl font-semibold text-foreground',
  cardTitle: 'text-xl font-semibold text-foreground',
  subsectionTitle: 'text-lg font-medium text-foreground',
  
  // Body text
  body: 'text-base text-foreground',
  bodyMuted: 'text-base text-muted-foreground',
  secondary: 'text-sm text-muted-foreground',
  caption: 'text-xs text-muted-foreground',
  
  // Labels and badges
  label: 'text-sm font-medium text-foreground',
  badge: 'text-xs font-medium',
  
  // Stats and metrics
  statValue: 'text-2xl font-bold text-foreground',
  statValueLg: 'text-3xl font-bold text-foreground',
  statLabel: 'text-sm text-muted-foreground',
} as const;

// Type exports for TypeScript support
export type BrandColor = keyof typeof BRAND_COLORS;
export type ChartColorSet = keyof typeof CHART_COLORS;
export type GradientName = keyof typeof GRADIENTS;
export type ThemeClass = keyof typeof THEME_CLASSES;
