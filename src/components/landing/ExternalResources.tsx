/**
 * ExternalResources Component - Links to External Resources
 */

import React from 'react';
import { 
  ExternalLink, 
  Globe, 
  Building2, 
  BookOpen, 
  Waves,
  MapPin,
  TrendingUp
} from 'lucide-react';

interface ExternalResource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: 'air-quality' | 'water' | 'government' | 'research';
  icon: React.ElementType;
  featured?: boolean;
}

const externalResources: ExternalResource[] = [
  {
    id: 'aqi-india',
    name: 'AQI India',
    description: 'Real-time Air Quality Index monitoring across India.',
    url: 'https://www.aqi.in/in',
    category: 'air-quality',
    icon: Globe,
    featured: true,
  },
  {
    id: 'who-water',
    name: 'WHO Water Quality',
    description: 'World Health Organization water safety guidelines.',
    url: 'https://www.who.int',
    category: 'water',
    icon: Waves,
    featured: true,
  },
  {
    id: 'cpcb',
    name: 'CPCB India',
    description: 'Central Pollution Control Board monitoring data.',
    url: 'https://cpcb.nic.in/',
    category: 'government',
    icon: Building2,
  },
  {
    id: 'bis',
    name: 'BIS Standards',
    description: 'Bureau of Indian Standards water specifications.',
    url: 'https://www.bis.gov.in/',
    category: 'government',
    icon: BookOpen,
  },
  {
    id: 'india-water-portal',
    name: 'India Water Portal',
    description: 'Water resources information for India.',
    url: 'https://www.indiawaterportal.org/',
    category: 'water',
    icon: MapPin,
  },
  {
    id: 'jal-shakti',
    name: 'Jal Shakti Ministry',
    description: 'Government water resource management.',
    url: 'https://jalshakti-dowr.gov.in/',
    category: 'government',
    icon: Building2,
  },
  {
    id: 'iwsm',
    name: 'IWSM Platform',
    description: 'India Water Supply & Sanitation Mission monitoring.',
    url: 'https://www.prabhavati.gov.in/',
    category: 'government',
    icon: TrendingUp,
  },
  {
    id: 'wateraid-india',
    name: 'WaterAid India',
    description: 'Water, sanitation & hygiene programmes across India.',
    url: 'https://www.wateraidindia.org/',
    category: 'research',
    icon: Waves,
  },
];

function ResourceCard({ resource, index }: { resource: ExternalResource; index: number }) {
  const Icon = resource.icon;
  const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    'air-quality': { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200' },
    'water': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
    'government': { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
    'research': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
  };

  const colors = categoryColors[resource.category];

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block p-6 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden relative`}
      style={{
        animation: `slideInUp 0.6s ease-out ${index * 100}ms both`,
      }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-transparent to-cyan-50/0 group-hover:from-blue-50 group-hover:via-blue-50/30 group-hover:to-cyan-50 dark:group-hover:from-blue-500/8 dark:group-hover:via-blue-500/5 dark:group-hover:to-cyan-500/8 transition-all duration-500" />

      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/10 translate-x-full group-hover:translate-x-0 duration-1000" style={{ animation: 'shimmer 2s infinite' }} />

      {/* Border glow effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 dark:from-blue-500/10 dark:to-cyan-500/10 blur-lg" style={{ pointerEvents: 'none' }} />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-500/20 dark:to-cyan-500/20 flex items-center justify-center group-hover:scale-125 group-hover:rotate-6 transition-all duration-300 shadow-md group-hover:shadow-lg">
            <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors" />
          </div>
          <div className="flex flex-col gap-2 items-end">
            {resource.featured && (
              <span className="relative px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full animate-pulse shadow-lg group-hover:shadow-cyan-500/50">
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-40 blur-lg transition-all duration-300" />
                <span className="relative">⭐ Featured</span>
              </span>
            )}
            <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg border ${colors.bg} dark:bg-opacity-20 ${colors.text} dark:${colors.text} ${colors.border} dark:border-opacity-30 capitalize transition-all duration-300 group-hover:scale-105`}>
              {resource.category.replace('-', ' ')}
            </span>
          </div>
        </div>
        
        <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-300">
          {resource.name}
        </h4>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
          {resource.description}
        </p>
        
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-all duration-300 group-hover:translate-x-2">
          Visit <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
        </div>
      </div>
    </a>
  );
}

export default function ExternalResources() {
  const featuredResources = externalResources.filter(r => r.featured);
  const regularResources = externalResources.filter(r => !r.featured);

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
      <section className="relative py-20 overflow-hidden px-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-white/5 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Globe className="w-4 h-4" />
            External Resources
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Explore Related Platforms
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Discover trusted environmental monitoring platforms and government resources.
          </p>
        </div>

        {/* Featured Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {featuredResources.map((resource, index) => (
            <ResourceCard key={resource.id} resource={resource} index={index} />
          ))}
        </div>

        {/* Regular Resources Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularResources.map((resource, index) => (
            <ResourceCard key={resource.id} resource={resource} index={index + featuredResources.length} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10">
            <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Nirmaya integrates with WHO and BIS standards for accurate water quality assessment
            </span>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
