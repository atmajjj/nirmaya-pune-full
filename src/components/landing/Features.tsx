/**
 * Features Component - WQI Data Analytics Solutions
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Monitor, 
  LayoutDashboard, 
  Code, 
  LayoutGrid,
  Check,
  Download,
  ExternalLink,
  MapPin,
  BarChart3,
  Bell,
  Shield,
  Cpu,
  FileText
} from 'lucide-react';

const services = [
  {
    id: 'dashboard',
    name: 'Web Dashboard',
    icon: LayoutDashboard,
    title: 'Web Dashboard',
    subtitle: 'Comprehensive Monitoring Platform',
    description: 'Full-featured dashboard for government officials, scientists, and researchers. Analyze trends, generate reports, and manage alerts.',
    features: [
      'Role-based access control for different stakeholders',
      'Advanced analytics with trend visualization',
      'WHO-compliant report generation',
      'Multi-district comparison and monitoring',
    ],
  },
  {
    id: 'api',
    name: 'API',
    icon: Code,
    title: 'WQI API',
    subtitle: 'Integrate Water Quality Data',
    description: 'RESTful API for developers to integrate real-time water quality data into their applications, research projects, or monitoring systems.',
    features: [
      'Real-time WQI data for any location',
      'Historical data access for trend analysis',
      'Webhook support for alerts',
      'Comprehensive documentation and SDKs',
    ],
  },
  {
    id: 'widgets',
    name: 'Widgets',
    icon: LayoutGrid,
    title: 'Embeddable Widgets',
    subtitle: 'Add WQI Data to Your Website',
    description: 'Easy-to-embed widgets showing real-time water quality data. Perfect for news sites, government portals, and educational platforms.',
    features: [
      'Customizable designs to match your brand',
      'Auto-updating real-time data',
      'Multiple widget sizes and styles',
      'Simple embed code - just copy and paste',
    ],
  },
];

const coreFeatures = [
  { icon: MapPin, title: 'Real-Time Monitoring', description: 'Live data from 2,800+ stations' },
  { icon: BarChart3, title: 'Advanced Analytics', description: 'AI-powered trend analysis' },
  { icon: FileText, title: 'Automated Reports', description: 'WHO-compliant reporting' },
  { icon: Bell, title: 'Smart Alerts', description: 'Instant notifications' },
  { icon: Shield, title: 'Role-Based Access', description: '4 user role types' },
  { icon: Cpu, title: 'NIRA AI Assistant', description: '24/7 AI chatbot' },
];

export default function Features() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const activeService = services.find(s => s.id === activeTab) || services[0];

  return (
    <section id="features" className="py-20 px-4 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            WQI Data Analytics Solutions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Water quality data monitoring platforms for every need
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveTab(service.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                activeTab === service.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <service.icon className="w-5 h-5" />
              {service.name}
            </button>
          ))}
        </div>

        {/* Active Service Content */}
        <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xl">
          <div className="p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center">
                <activeService.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-600 dark:text-white">{activeService.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{activeService.subtitle}</p>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {activeService.description}
            </p>

            {/* Features List */}
            <ul className="space-y-3 mb-8">
              {activeService.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Get Started
              </Link>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-blue-600 dark:text-white font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-600 transition-colors"
              >
                Learn More
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Core Features Grid */}
        <div className="mt-16">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center mb-8">
            Core Platform Features
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {coreFeatures.map((feature, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700 text-center group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-blue-600/50"
                style={{
                  animation: `slideInUp 0.6s ease-out ${i * 100}ms both`,
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 dark:bg-blue-600/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1 group-hover:text-blue-600 transition-colors">{feature.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
