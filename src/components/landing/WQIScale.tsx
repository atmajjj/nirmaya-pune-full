/**
 * WQI Scale - Water Quality Index Display with enhanced animations
 */

import React, { useState } from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, XCircle, Droplets } from 'lucide-react';

export default function WQIScale() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const wqiRanges = [
    { 
      range: '0-25', 
      label: 'Excellent', 
      color: 'from-emerald-400 to-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-500/5',
      borderColor: 'border-emerald-200 dark:border-emerald-500/20',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      icon: CheckCircle,
      desc: 'Safe for all uses',
      details: 'Excellent quality\nNo treatment needed\nSafe for drinking'
    },
    { 
      range: '26-50', 
      label: 'Good', 
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-500/5',
      borderColor: 'border-green-200 dark:border-green-500/20',
      textColor: 'text-green-600 dark:text-green-400',
      icon: CheckCircle,
      desc: 'Generally safe',
      details: 'Good quality\nMinimal treatment\nSuitable for most uses'
    },
    { 
      range: '51-75', 
      label: 'Poor', 
      color: 'from-yellow-400 to-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-500/5',
      borderColor: 'border-yellow-200 dark:border-yellow-500/20',
      textColor: 'text-yellow-600 dark:text-yellow-400',
      icon: AlertTriangle,
      desc: 'Treatment needed',
      details: 'Poor quality\nTreatment required\nNot for drinking'
    },
    { 
      range: '76-100', 
      label: 'Very Poor', 
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-500/5',
      borderColor: 'border-orange-200 dark:border-orange-500/20',
      textColor: 'text-orange-600 dark:text-orange-400',
      icon: AlertCircle,
      desc: 'Treatment required',
      details: 'Very poor quality\nExtensive treatment\nUnsafe for drinking'
    },
    { 
      range: '100+', 
      label: 'Unfit', 
      color: 'from-red-400 to-red-600',
      bgColor: 'bg-red-50 dark:bg-red-500/5',
      borderColor: 'border-red-200 dark:border-red-500/20',
      textColor: 'text-red-600 dark:text-red-400',
      icon: XCircle,
      desc: 'Unsafe for use',
      details: 'Unfit for use\nCritical contamination\nImmediate action needed'
    },
  ];

  return (
    <section id="wqi-scale" className="relative py-24 px-4 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200/10 dark:bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-200/10 dark:bg-red-500/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-500/20 rounded-full mb-6">
            <Droplets className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">WQI STANDARDS</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Water Quality Index Scale
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            WHO-compliant rating system for assessing water safety. Hover over each card to learn more.
          </p>
        </div>

        {/* WQI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-12">
          {wqiRanges.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative h-full"
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  animation: `slideInUp 0.6s ease-out ${idx * 100}ms both`,
                }}
              >
                {/* Card Container */}
                <div
                  className={`h-full p-6 rounded-2xl border-2 ${item.borderColor} ${item.bgColor} bg-white dark:bg-slate-800/40 
                    hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 overflow-hidden cursor-pointer relative`}
                >
                  {/* Background gradient that activates on hover */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Color bar */}
                    <div className={`w-full h-4 rounded-full bg-gradient-to-r ${item.color} mb-6 shadow-lg transform group-hover:scale-105 transition-transform duration-300`} />

                    {/* Icon */}
                    <div className="mb-4">
                      <Icon className={`w-8 h-8 ${item.textColor} group-hover:scale-110 transition-transform duration-300`} />
                    </div>

                    {/* Score Range */}
                    <div className={`text-sm font-bold ${item.textColor} mb-2 opacity-70 group-hover:opacity-100 transition-opacity`}>
                      {item.range}
                    </div>

                    {/* Label */}
                    <div className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:scale-110 transform transition-transform duration-300 origin-left">
                      {item.label}
                    </div>

                    {/* Description */}
                    <div className={`text-sm ${item.textColor} font-semibold mb-4`}>
                      {item.desc}
                    </div>

                    {/* Expandable Details */}
                    <div className={`transition-all duration-500 overflow-hidden ${hoveredCard === idx ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className={`text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-3 border-t ${item.borderColor}`}>
                        {item.details.split('\n').map((line, i) => (
                          <div key={i}>• {line}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-500/5 dark:to-cyan-500/5 border border-blue-200 dark:border-blue-500/20 rounded-2xl p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">About WQI</h4>
              <p className="text-sm text-blue-800 dark:text-blue-400">
                The Water Quality Index (WQI) is a comprehensive measure that evaluates water quality based on multiple parameters including pH, dissolved oxygen, turbidity, and microbial content. Values range from 0-100+, where lower scores indicate better quality water.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
