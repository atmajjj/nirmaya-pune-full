// Dashboard Types for Visualization Management

export interface SavedVisualization {
  id: string;
  visualizationId: string; // Original visualization type ID (e.g., 'hmpi-trend-line')
  dashboardId: string; // Which dashboard page it belongs to
  type: string; // Chart type (line, bar, pie, etc.)
  title: string;
  subtitle?: string;
  config: {
    universal: Record<string, unknown>; // UniversalOptions
    chartSpecific: Record<string, unknown>; // ChartSpecificOptions
  };
  position: number; // Order on the dashboard
  isVisible: boolean;
  ownerRole: 'scientist' | 'policymaker' | 'researcher' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface DashboardPage {
  id: string;
  name: string;
  path: string;
  icon: string;
  description: string;
}

export const SCIENTIST_DASHBOARDS: DashboardPage[] = [
  {
    id: 'scientist-overview',
    name: 'Overview',
    path: '/scientist/overview',
    icon: 'BarChart3',
    description: 'Main scientist dashboard with key metrics'
  },
  {
    id: 'scientist-hmpi-engine',
    name: 'HMPI Engine',
    path: '/scientist/hmpi-engine',
    icon: 'Beaker',
    description: 'Heavy Metal Pollution Index calculations'
  },
  {
    id: 'scientist-formula-editor',
    name: 'Formula Editor',
    path: '/scientist/formula-editor',
    icon: 'Calculator',
    description: 'Custom formula creation and testing'
  },
  {
    id: 'scientist-geo-map',
    name: 'Geo Map',
    path: '/scientist/geo-map',
    icon: 'MapPin',
    description: 'Geographic visualization of data'
  }
];

export const RESEARCHER_DASHBOARDS: DashboardPage[] = [
  {
    id: 'researcher-overview',
    name: 'Overview',
    path: '/researcher/overview',
    icon: 'BarChart3',
    description: 'Main researcher dashboard with publications'
  },
  {
    id: 'researcher-datasets',
    name: 'Datasets',
    path: '/researcher/datasets',
    icon: 'Database',
    description: 'Access to research datasets'
  },
  {
    id: 'researcher-apis',
    name: 'APIs',
    path: '/researcher/apis',
    icon: 'Code',
    description: 'API management and documentation'
  },
  {
    id: 'researcher-geo-map',
    name: 'Geo Map',
    path: '/researcher/geo-map',
    icon: 'MapPin',
    description: 'Interactive geographic data visualization'
  }
];

export const POLICYMAKER_DASHBOARDS: DashboardPage[] = [
  {
    id: 'policymaker-overview',
    name: 'Overview',
    path: '/policymaker/overview',
    icon: 'BarChart3',
    description: 'Policy overview and key metrics'
  },
  {
    id: 'policymaker-risk-alerts',
    name: 'Risk Alerts',
    path: '/policymaker/risk-alerts',
    icon: 'Bell',
    description: 'Critical risk alerts and monitoring'
  },
  {
    id: 'policymaker-reports',
    name: 'BIS Reports',
    path: '/policymaker/who-reports',
    icon: 'FileText',
    description: 'Compliance and regulatory reports'
  },
  {
    id: 'policymaker-geo-map',
    name: 'Geo Map',
    path: '/policymaker/geo-map',
    icon: 'MapPin',
    description: 'Geographic risk visualization'
  }
];

// Local Storage Key
export const DASHBOARD_STORAGE_KEY = 'nirmaya_dashboard_visualizations';

// Helper functions for dashboard storage
export const getDashboardVisualizations = (dashboardId?: string): SavedVisualization[] => {
  try {
    const stored = localStorage.getItem(DASHBOARD_STORAGE_KEY);
    if (!stored) return [];
    const visualizations: SavedVisualization[] = JSON.parse(stored);
    if (dashboardId) {
      return visualizations.filter(v => v.dashboardId === dashboardId);
    }
    return visualizations;
  } catch {
    return [];
  }
};

export const saveVisualizationToDashboard = (visualization: SavedVisualization): void => {
  const existing = getDashboardVisualizations();
  const updated = [...existing, visualization];
  localStorage.setItem(DASHBOARD_STORAGE_KEY, JSON.stringify(updated));
};

export const updateVisualizationVisibility = (
  visualizationId: string, 
  isVisible: boolean
): void => {
  const existing = getDashboardVisualizations();
  const updated = existing.map(v => 
    v.id === visualizationId ? { ...v, isVisible, updatedAt: new Date().toISOString() } : v
  );
  localStorage.setItem(DASHBOARD_STORAGE_KEY, JSON.stringify(updated));
};

export const updateMultipleVisibilitySettings = (
  updates: { id: string; isVisible: boolean }[]
): void => {
  const existing = getDashboardVisualizations();
  const updateMap = new Map(updates.map(u => [u.id, u.isVisible]));
  const updated = existing.map(v => 
    updateMap.has(v.id) 
      ? { ...v, isVisible: updateMap.get(v.id)!, updatedAt: new Date().toISOString() } 
      : v
  );
  localStorage.setItem(DASHBOARD_STORAGE_KEY, JSON.stringify(updated));
};

export const deleteVisualizationFromDashboard = (visualizationId: string): void => {
  const existing = getDashboardVisualizations();
  const updated = existing.filter(v => v.id !== visualizationId);
  localStorage.setItem(DASHBOARD_STORAGE_KEY, JSON.stringify(updated));
};

export const reorderVisualizations = (
  dashboardId: string, 
  orderedIds: string[]
): void => {
  const existing = getDashboardVisualizations();
  const updated = existing.map(v => {
    if (v.dashboardId === dashboardId) {
      const newPosition = orderedIds.indexOf(v.id);
      return newPosition >= 0 ? { ...v, position: newPosition } : v;
    }
    return v;
  });
  localStorage.setItem(DASHBOARD_STORAGE_KEY, JSON.stringify(updated));
};

// Generate unique ID
export const generateVisualizationId = (): string => {
  return `viz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
