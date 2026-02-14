/**
 * Hero - Main Hero Section with CTA and animations
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-transparent dark:from-slate-900 dark:via-slate-950 dark:to-slate-950" />
      
      {/* Animated background orbs */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-40 right-0 w-96 h-96 bg-cyan-200/20 dark:bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge with animation */}
        <div 
          className="inline-block mb-6 px-4 py-2 bg-blue-100 dark:bg-blue-500/20 rounded-full border border-blue-200 dark:border-blue-500/30 animate-slide-in-down"
          style={{ animationDelay: '0ms' }}
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
            <Zap className="w-4 h-4 animate-pulse" />
            Real-Time Water Quality Monitoring
          </span>
        </div>

        {/* Main Heading */}
        <h1 
          className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-tight animate-slide-in-up"
          style={{ animationDelay: '100ms' }}
        >
          Monitor India's{' '}
          <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 dark:from-blue-400 dark:via-cyan-400 dark:to-blue-400 bg-clip-text text-transparent animate-pulse">
            Water Quality
          </span>
        </h1>

        {/* Subtitle */}
        <p 
          className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed animate-slide-in-up"
          style={{ animationDelay: '200ms' }}
        >
          Nirmaya empowers government agencies, scientists, and researchers with AI-powered water quality intelligence. Access real-time data, advanced analytics, and actionable insights from 2,800+ monitoring stations across India.
        </p>

        {/* CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-in-up"
          style={{ animationDelay: '300ms' }}
        >
          <Link
            to="/login"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl 
              hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300 overflow-hidden hover:glow"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10">Get Started</span>
            <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
          </Link>
          
          <a
            href="#features"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white font-bold rounded-xl 
              hover:bg-slate-300 dark:hover:bg-white/20 transition-all duration-300 border border-slate-300 dark:border-white/20 hover:scale-105"
          >
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            Learn More
          </a>
        </div>

        {/* Stats */}
        <div 
          className="mt-16 grid grid-cols-3 gap-8 md:gap-12 pt-12 border-t border-slate-200 dark:border-white/10 animate-slide-in-up"
          style={{ animationDelay: '400ms' }}
        >
          <div className="group hover:scale-110 transition-transform duration-300">
            <div className="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 group-hover:text-cyan-500 transition-colors">2,800+</div>
            <div className="text-sm text-slate-600 dark:text-slate-400 mt-2 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">Monitoring Stations</div>
          </div>
          <div className="group hover:scale-110 transition-transform duration-300">
            <div className="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 group-hover:text-cyan-500 transition-colors">28</div>
            <div className="text-sm text-slate-600 dark:text-slate-400 mt-2 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">States & UTs</div>
          </div>
          <div className="group hover:scale-110 transition-transform duration-300">
            <div className="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 group-hover:text-cyan-500 transition-colors">Real-Time</div>
            <div className="text-sm text-slate-600 dark:text-slate-400 mt-2 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">Live Updates</div>
          </div>
        </div>
      </div>
    </section>
  );
}
