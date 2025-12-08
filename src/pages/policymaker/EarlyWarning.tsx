import { useState, useEffect } from "react";
import { AlertTriangle, FileText, TrendingUp, MapPin, Brain, Factory, Sprout, Building2, Mountain, BarChart3, Truck, CloudRain, Droplets, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Import components
import EarlyWarningHeader from "@/components/policymaker/EarlyWarning/EarlyWarningHeader";
import AlertConfigCards from "@/components/policymaker/EarlyWarning/AlertConfigCards";
import ActivePredictions from "@/components/policymaker/EarlyWarning/ActivePredictions";
import ResponseProtocols from "@/components/policymaker/EarlyWarning/ResponseProtocols";

// Import data and types
import { AlertConfig, Prediction, Protocol } from "@/components/policymaker/EarlyWarning/types";
import { initialAlertConfigsData, predictionsData, protocolsData } from "@/components/policymaker/EarlyWarning/earlyWarningData";

// Helper to convert data to components with icons
const getIcon = (iconType: string, className: string) => {
  const icons: Record<string, React.ReactNode> = {
    Factory: <Factory className={className} />,
    Sprout: <Sprout className={className} />,
    Building2: <Building2 className={className} />,
    Mountain: <Mountain className={className} />,
    BarChart3: <BarChart3 className={className} />,
    AlertTriangle: <AlertTriangle className={className} />,
    Truck: <Truck className={className} />,
    CloudRain: <CloudRain className={className} />,
    Droplets: <Droplets className={className} />
  };
  return icons[iconType];
};

const EarlyWarning = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());
  
  // Convert data to components with icons
  const [alertConfigs, setAlertConfigs] = useState<AlertConfig[]>(
    initialAlertConfigsData.map(config => ({
      ...config,
      icon: getIcon(config.iconType, "w-6 h-6 text-white")
    }))
  );

  const predictions: Prediction[] = predictionsData.map(pred => ({
    ...pred,
    icon: getIcon(pred.iconType, pred.iconClass)
  }));

  const protocols: Protocol[] = protocolsData.map(prot => ({
    ...prot,
    icon: getIcon(prot.iconType, prot.iconClass)
  }));

  // Auto-refresh simulation
  useEffect(() => {
    const id = setInterval(() => setLastUpdated(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  const toggleAlert = (id: number) => {
    setAlertConfigs(prev => 
      prev.map(config => 
        config.id === id ? { ...config, enabled: !config.enabled } : config
      )
    );
  };

  const toggleTask = (id: number) => {
    setCompletedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
        <div className="space-y-6 p-6">
          <EarlyWarningHeader lastUpdated={lastUpdated} onRefresh={() => setLastUpdated(new Date())} />

          <AlertConfigCards alertConfigs={alertConfigs} onToggleAlert={toggleAlert} />

          <ActivePredictions predictions={predictions} />

          <ResponseProtocols protocols={protocols} completedTasks={completedTasks} onToggleTask={toggleTask} />

          {/* Footer */}
          <Card className="bg-gradient-to-r from-slate-800 to-blue-900 rounded-3xl shadow-2xl border-0">
            <CardContent className="p-8">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h3 className="text-2xl font-bold mb-2">"Predictive Intelligence"</h3>
                  <p className="text-slate-300">
                    "Pollution Sources Monitoring"
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-400 mb-1">"Last Updated"</p>
                  <p className="text-lg font-semibold">{lastUpdated.toLocaleTimeString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
};

export default EarlyWarning;
