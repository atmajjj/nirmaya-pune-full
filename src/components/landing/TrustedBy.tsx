/**
 * TrustedBy - Organizations using Nirmaya with animations
 */

import React from 'react';
import { Award, Shield, Building2 } from 'lucide-react';

export default function TrustedBy() {
  const orgs = [
    { name: 'Government of Maharashtra', icon: Building2 },
    { name: 'WHO Standards Compliant', icon: Award },
    { name: 'ISO 27001 Certified', icon: Shield },
  ];

  return (
    <section className="relative py-16 px-4 bg-gradient-to-b from-blue-50/30 to-white dark:from-slate-900 dark:to-slate-950 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/30 to-transparent dark:via-blue-500/5" />
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-8 animate-slide-in-down">
          Trusted by Government Agencies & Research Institutions
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {orgs.map((org, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center gap-3 group hover:scale-110 transition-transform duration-300"
              style={{
                animation: `slideInUp 0.6s ease-out ${idx * 100}ms both`,
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300 group-hover:scale-125">
                <org.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
              </div>
              <p className="text-slate-700 dark:text-slate-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{org.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
