/**
 * Alerts Component - Live Alert Feed
 * Features: Color-coded alerts, real-time ticker, severity indicators
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  Shield,
  Clock,
  MapPin,
  Users,
  ChevronRight,
  Bell,
  BellRing,
} from 'lucide-react';

// Sample alert data - Meaningful examples
const activeAlerts = [
  {
    id: '1',
    type: 'critical' as const,
    title: 'Microbial Contamination Alert',
    message: 'High levels of E. coli detected in Pune water supply. Boil water advisory issued.',
    location: 'Pune, Maharashtra',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    severity: 5,
    affectedPopulation: 250000,
    wqiScore: 85,
  },
  {
    id: '2',
    type: 'warning' as const,
    title: 'Fluoride Levels Elevated',
    message: 'Fluoride concentration exceeds WHO safe limits in Nashik district.',
    location: 'Nashik, Maharashtra',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    severity: 4,
    affectedPopulation: 180000,
    wqiScore: 72,
  },
];

const alertConfig = {
  critical: { 
    bg: 'bg-white dark:bg-slate-800', 
    border: 'border-blue-300 dark:border-blue-700',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-600 dark:text-blue-400', 
    badge: 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300',
    icon: AlertTriangle
  },
  warning: { 
    bg: 'bg-white dark:bg-slate-800', 
    border: 'border-cyan-300 dark:border-cyan-700',
    iconBg: 'bg-cyan-100 dark:bg-cyan-900/30',
    text: 'text-cyan-600 dark:text-cyan-400', 
    badge: 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300',
    icon: AlertCircle
  },
  info: { 
    bg: 'bg-white dark:bg-slate-800', 
    border: 'border-indigo-300 dark:border-indigo-700',
    iconBg: 'bg-indigo-100 dark:bg-indigo-900/30',
    text: 'text-indigo-600 dark:text-indigo-400', 
    badge: 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300',
    icon: Info
  },
  danger: { 
    bg: 'bg-white dark:bg-slate-800', 
    border: 'border-violet-300 dark:border-violet-700',
    iconBg: 'bg-violet-100 dark:bg-violet-900/30',
    text: 'text-violet-600 dark:text-violet-400', 
    badge: 'bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300',
    icon: AlertTriangle
  },
};

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function AlertCard({ alert, index }: any) {
  const config = alertConfig[alert.type];
  const IconComponent = config.icon;
  
  return (
    <div 
      className={`group ${config.bg} border-2 ${config.border} rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
      style={{
        animation: `slideInUp 0.6s ease-out ${index * 100}ms both`,
      }}
    >
      <div className="flex gap-4">
        {/* Icon */}
        <div className={`p-3 ${config.iconBg} rounded-lg flex-shrink-0`}>
          <IconComponent className={`w-5 h-5 ${config.text}`} />
        </div>
        
        <div className="flex-1 min-w-0">
          {/* Badge and Severity */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`${config.badge} px-2.5 py-1 rounded-full text-xs font-bold`}>
              {alert.type.toUpperCase()}
            </span>
            {alert.severity >= 4 && (
              <span className="text-xs font-bold text-red-600 dark:text-red-400">
                Severity: {alert.severity}/5
              </span>
            )}
          </div>
          
          {/* Title */}
          <h4 className={`${config.text} font-bold mb-1 text-sm`}>{alert.title}</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">{alert.message}</p>
          
          {/* Location and Details */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-500 dark:text-slate-500 block">Location</span>
              <span className="text-slate-700 dark:text-slate-300">{alert.location}</span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-500 block">Detected</span>
              <span className="text-slate-700 dark:text-slate-300">{getTimeAgo(alert.timestamp)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Alerts() {
  return (
    <section className="relative py-20 overflow-hidden px-4 bg-gradient-to-b from-white via-red-50/20 to-white dark:from-slate-950 dark:via-red-900/5 dark:to-slate-950" id="alerts">
      {/* Animated background orbs */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-red-200/10 dark:bg-red-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-200/10 dark:bg-orange-500/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-500/20 px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-slide-in-down">
            <BellRing className="w-4 h-4 text-red-600 dark:text-red-400 animate-pulse" />
            <span className="text-red-600 dark:text-red-400">{activeAlerts.length} Active Alerts</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 animate-slide-in-up" style={{ animationDelay: '100ms' }}>
            Live Alert Dashboard
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto animate-slide-in-up" style={{ animationDelay: '200ms' }}>
            Real-time notifications for water quality issues requiring immediate attention.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {activeAlerts.map((alert, index) => (
            <AlertCard key={alert.id} alert={alert} index={index} />
          ))}
        </div>

        <div className="text-center animate-slide-in-up" style={{ animationDelay: '400ms' }}>
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:from-red-700 hover:to-orange-700 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 font-semibold hover:scale-105"
          >
            View All Alerts
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
