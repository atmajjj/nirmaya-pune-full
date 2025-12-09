import { 
  BarChart3, Database, BookOpen, Map, Settings, 
  Users, FileCheck, MessageCircle, UserPlus,
  Activity, Edit, Brain,
  Bell, FileText, TrendingUp, Zap, Upload, History
} from "lucide-react";

export const NAVIGATION_ITEMS = {
  admin: [
    { title: "Overview", path: "/admin/overview", icon: <BarChart3 className="w-5 h-5" /> },
    { title: "User Management", path: "/admin/user-management", icon: <Users className="w-5 h-5" /> },
    { title: "Report Control", path: "/admin/report-control", icon: <FileCheck className="w-5 h-5" /> },
    { title: "Researcher Applications", path: "/admin/researcher-applications", icon: <UserPlus className="w-5 h-5" /> },
    { title: "NIRA AI Chatbot", path: "/admin/nira-chatbot", icon: <MessageCircle className="w-5 h-5" /> },
    { title: "Settings", path: "/profile", icon: <Settings className="w-5 h-5" /> },
  ],
  scientist: [
    { title: "Overview", path: "/scientist/overview", icon: <BarChart3 className="w-5 h-5" /> },
    { title: "Data Sources", path: "/scientist/data-sources", icon: <Database className="w-5 h-5" /> },
    { title: "Nirmaya Engine", path: "/scientist/nirmaya-engine", icon: <Brain className="w-5 h-5" /> },
    { title: "Geo Map", path: "/scientist/geo-map", icon: <Map className="w-5 h-5" /> },
    { title: "Settings", path: "/profile", icon: <Settings className="w-5 h-5" /> },
  ],
  policymaker: [
    { title: "Overview", path: "/policymaker/overview", icon: <BarChart3 className="w-5 h-5" /> },
    { title: "Risk Alerts", path: "/policymaker/risk-alerts", icon: <Bell className="w-5 h-5" /> },
    { title: "BIS Reports", path: "/policymaker/who-reports", icon: <FileText className="w-5 h-5" /> },
    { title: "Geo Map", path: "/policymaker/geo-map", icon: <Map className="w-5 h-5" /> },
    { title: "Settings", path: "/profile", icon: <Settings className="w-5 h-5" /> },
  ],
  researcher: [
    { title: "Overview", path: "/researcher/overview", icon: <BarChart3 className="w-5 h-5" /> },
    { title: "Dataset Links", path: "/researcher/datasets", icon: <Database className="w-5 h-5" /> },
    { title: "API Catalogue", path: "/researcher/apis", icon: <BookOpen className="w-5 h-5" /> },
    { title: "Interactive Geo Map", path: "/researcher/geo-map", icon: <Map className="w-5 h-5" /> },
    { title: "Settings", path: "/profile", icon: <Settings className="w-5 h-5" /> },
  ],
  field_technician: [
    { title: "Overview", path: "/field-technician/overview", icon: <BarChart3 className="w-5 h-5" /> },
    { title: "Upload Dataset", path: "/field-technician/upload-dataset", icon: <Upload className="w-5 h-5" /> },
    { title: "Upload History", path: "/field-technician/upload-history", icon: <History className="w-5 h-5" /> },
    { title: "Settings", path: "/profile", icon: <Settings className="w-5 h-5" /> },
  ]
};

export const getNavItemsForRole = (role: string) => {
  return NAVIGATION_ITEMS[role as keyof typeof NAVIGATION_ITEMS] || [
    { title: "Settings", path: "/profile", icon: <Settings className="w-5 h-5" /> }
  ];
};
