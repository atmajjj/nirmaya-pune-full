// Data for EarlyWarning components - icons will be added in components

export interface AlertConfigData {
  id: number;
  title: string;
  status: string;
  percentage: number;
  iconType: string;
  color: string;
  bgColor: string;
  lastCalibration: string;
  enabled: boolean;
}

export interface PredictionData {
  id: string;
  title: string;
  riskLevel: string;
  probability: number;
  description: string;
  type: string;
  timeframe: string;
  color: string;
  bgColor: string;
  borderColor: string;
  iconType: string;
  iconClass: string;
  riskColor: string;
  badgeColor: string;
}

export interface ProtocolData {
  id: number;
  task: string;
  iconType: string;
  iconClass: string;
  priority: string;
}

export const initialAlertConfigsData: AlertConfigData[] = [
  {
    id: 1,
    title: "Industrial Discharge",
    status: "active",
    percentage: 92,
    iconType: "Factory",
    color: "from-blue-500 to-teal-600",
    bgColor: "from-blue-50 to-teal-50",
    lastCalibration: "2 hours ago",
    enabled: true
  },
  {
    id: 2,
    title: "Agricultural Runoff", 
    status: "active",
    percentage: 88,
    iconType: "Sprout",
    color: "from-emerald-500 to-green-600",
    bgColor: "from-emerald-50 to-green-50",
    lastCalibration: "45 minutes ago",
    enabled: true
  },
  {
    id: 3,
    title: "Urban Waste",
    status: "calibrating",
    percentage: 85,
    iconType: "Building2",
    color: "from-amber-500 to-orange-600",
    bgColor: "from-amber-50 to-orange-50",
    lastCalibration: "15 minutes ago",
    enabled: false
  },
  {
    id: 4,
    title: "Natural Contamination",
    status: "active",
    percentage: 90,
    iconType: "Mountain",
    color: "from-purple-500 to-indigo-600", 
    bgColor: "from-purple-50 to-indigo-50",
    lastCalibration: "1 hour ago",
    enabled: true
  }
];

export const predictionsData: PredictionData[] = [
  {
    id: "western",
    title: "Western Industrial Belt",
    riskLevel: "High Risk",
    probability: 85,
    description: "Elevated risk of chemical contamination due to forecasted heavy rainfall.",
    type: "Industrial Discharge",
    timeframe: "Next 72 hours",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    iconType: "CloudRain",
    iconClass: "w-8 h-8 text-red-600 animate-bounce",
    riskColor: "text-red-700",
    badgeColor: "bg-red-100 text-red-700"
  },
  {
    id: "agricultural",
    title: "Agricultural Districts", 
    riskLevel: "Medium Risk",
    probability: 65,
    description: "Increased likelihood of agricultural runoff affecting water sources.",
    type: "Pesticide Runoff",
    timeframe: "Next 7 days",
    color: "from-orange-500 to-amber-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    iconType: "Droplets",
    iconClass: "w-8 h-8 text-orange-600 animate-pulse",
    riskColor: "text-orange-700",
    badgeColor: "bg-orange-100 text-orange-700"
  },
  {
    id: "urban",
    title: "Urban Centers",
    riskLevel: "Low Risk", 
    probability: 35,
    description: "Potential overflow risk during upcoming maintenance.",
    type: "Municipal Waste",
    timeframe: "Next 30 days",
    color: "from-blue-500 to-teal-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200", 
    iconType: "Building2",
    iconClass: "w-8 h-8 text-blue-600 animate-pulse",
    riskColor: "text-blue-700",
    badgeColor: "bg-blue-100 text-blue-700"
  }
];

export const protocolsData: ProtocolData[] = [
  {
    id: 1,
    task: "Increase monitoring frequency in Western Industrial Belt",
    iconType: "BarChart3",
    iconClass: "w-5 h-5 text-blue-600",
    priority: "high"
  },
  {
    id: 2,
    task: "Alert local authorities in potentially affected areas",
    iconType: "AlertTriangle",
    iconClass: "w-5 h-5 text-orange-600",
    priority: "high"
  },
  {
    id: 3,
    task: "Deploy mobile testing units to high-risk zones",
    iconType: "Truck",
    iconClass: "w-5 h-5 text-green-600",
    priority: "medium"
  }
];
