// Dashboard Widget Visibility Types and Storage

export interface DashboardWidget {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'stats' | 'charts' | 'alerts' | 'custom';
  isVisible: boolean;
  order: number;
}

// Default widgets for Scientist Overview Dashboard
export const DEFAULT_SCIENTIST_OVERVIEW_WIDGETS: DashboardWidget[] = [
  {
    id: 'stats-cards',
    name: 'Statistics Cards',
    description: 'Key metrics including total samples, average HMPI, critical zones, and safe zones',
    icon: 'BarChart3',
    category: 'stats',
    isVisible: true,
    order: 0,
  },
  {
    id: 'hmpi-bar-chart',
    name: 'Heavy Metal Index Chart',
    description: 'Horizontal bar chart showing HMPI values across different cities',
    icon: 'BarChart',
    category: 'charts',
    isVisible: true,
    order: 1,
  },
  {
    id: 'contaminant-pie-chart',
    name: 'Contaminant Distribution',
    description: 'Pie chart showing distribution of different contaminants',
    icon: 'PieChart',
    category: 'charts',
    isVisible: true,
    order: 2,
  },
  {
    id: 'recent-alerts',
    name: 'Recent Alerts',
    description: 'Latest alerts and notifications about water quality issues',
    icon: 'AlertTriangle',
    category: 'alerts',
    isVisible: true,
    order: 3,
  },
  {
    id: 'risk-distribution',
    name: 'Risk Distribution',
    description: 'Visual breakdown of risk levels across monitored zones',
    icon: 'Shield',
    category: 'alerts',
    isVisible: true,
    order: 4,
  },
];

// Default widgets for Admin Overview Dashboard
export const DEFAULT_ADMIN_OVERVIEW_WIDGETS: DashboardWidget[] = [
  {
    id: 'summary-cards',
    name: 'Summary Cards',
    description: 'Total users, active users, pending approvals, and admin accounts',
    icon: 'BarChart3',
    category: 'stats',
    isVisible: true,
    order: 0,
  },
  {
    id: 'users-by-role',
    name: 'Users by Role',
    description: 'Pie chart showing distribution of users across different roles',
    icon: 'PieChart',
    category: 'charts',
    isVisible: true,
    order: 1,
  },
  {
    id: 'calculations-by-index',
    name: 'Calculations by Index',
    description: 'Bar chart showing water quality index calculations',
    icon: 'BarChart',
    category: 'charts',
    isVisible: true,
    order: 2,
  },
  {
    id: 'upload-status',
    name: 'Upload Status',
    description: 'Pie chart showing completed vs pending uploads',
    icon: 'PieChart',
    category: 'charts',
    isVisible: true,
    order: 3,
  },
  {
    id: 'data-sources',
    name: 'Data Sources',
    description: 'Pie chart showing distribution of data source file types',
    icon: 'PieChart',
    category: 'charts',
    isVisible: true,
    order: 4,
  },
  {
    id: 'system-health',
    name: 'System Health',
    description: 'Database and Redis health status monitoring',
    icon: 'Shield',
    category: 'alerts',
    isVisible: true,
    order: 5,
  },
];

// Storage key for widget visibility
export const WIDGET_VISIBILITY_KEY = 'nirmaya_widget_visibility';

// Get widget visibility settings for a dashboard
export const getWidgetVisibility = (dashboardId: string): DashboardWidget[] => {
  // Select appropriate defaults based on dashboard ID
  const defaults = dashboardId === 'admin-overview' 
    ? DEFAULT_ADMIN_OVERVIEW_WIDGETS 
    : DEFAULT_SCIENTIST_OVERVIEW_WIDGETS;

  try {
    const stored = localStorage.getItem(`${WIDGET_VISIBILITY_KEY}_${dashboardId}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults to handle new widgets
      return defaults.map(defaultWidget => {
        const savedWidget = parsed.find((w: DashboardWidget) => w.id === defaultWidget.id);
        return savedWidget ? { ...defaultWidget, ...savedWidget } : defaultWidget;
      });
    }
  } catch {
    // Return defaults on error
  }
  return [...defaults];
};

// Save widget visibility settings
export const saveWidgetVisibility = (dashboardId: string, widgets: DashboardWidget[]): void => {
  try {
    localStorage.setItem(`${WIDGET_VISIBILITY_KEY}_${dashboardId}`, JSON.stringify(widgets));
  } catch {
    // Silently fail on storage error
  }
};

// Update single widget visibility
export const updateWidgetVisibility = (
  dashboardId: string,
  widgetId: string,
  isVisible: boolean
): DashboardWidget[] => {
  const widgets = getWidgetVisibility(dashboardId);
  const updated = widgets.map(w =>
    w.id === widgetId ? { ...w, isVisible } : w
  );
  saveWidgetVisibility(dashboardId, updated);
  return updated;
};

// Reset to default visibility
export const resetWidgetVisibility = (dashboardId: string): DashboardWidget[] => {
  const defaults = dashboardId === 'admin-overview'
    ? [...DEFAULT_ADMIN_OVERVIEW_WIDGETS]
    : [...DEFAULT_SCIENTIST_OVERVIEW_WIDGETS];
  saveWidgetVisibility(dashboardId, defaults);
  return defaults;
};
