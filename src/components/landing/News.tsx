/**
 * News Component - News and Updates
 */

import React, { useState, useEffect } from 'react';
import {
  Newspaper,
  Clock,
  ExternalLink,
  Droplets,
  Heart,
  Building2,
  Users,
  TrendingUp,
} from 'lucide-react';

interface NewsArticle {
  title: string;
  summary: string;
  url: string;
  date: string;
  source: string;
  category?: string;
  sentiment?: 'positive' | 'concerning' | 'neutral';
  readTime?: string;
}

const curatedNews: NewsArticle[] = [
  {
    title: 'CGWB Launches National Groundwater Monitoring Portal',
    summary: 'Central Ground Water Board introduces real-time monitoring system covering 15,000 wells across India.',
    url: 'https://pib.gov.in',
    date: '2026-02-05',
    source: 'PIB India',
    category: 'policy',
    sentiment: 'positive',
    readTime: '3 min'
  },
  {
    title: "Arsenic Contamination Detected in 47 Districts",
    summary: 'Latest CGWB report reveals elevated arsenic levels in groundwater affecting millions of people.',
    url: '#',
    date: '2026-02-03',
    source: 'The Hindu',
    category: 'health',
    sentiment: 'concerning',
    readTime: '4 min'
  },
  {
    title: 'IIT Madras Develops Low-Cost Arsenic Removal Technology',
    summary: 'Researchers create affordable filtration system that removes 99% of arsenic from groundwater.',
    url: '#',
    date: '2026-02-01',
    source: 'Times of India',
    category: 'research',
    sentiment: 'positive',
    readTime: '2 min'
  },
];

const categoryConfig: Record<string, { icon: any; color: string }> = {
  health: { icon: Heart, color: 'text-red-500' },
  environment: { icon: Droplets, color: 'text-cyan-600' },
  policy: { icon: Building2, color: 'text-blue-600' },
  community: { icon: Users, color: 'text-orange-500' },
  research: { icon: TrendingUp, color: 'text-violet-500' }
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function NewsCard({ article, index }: { article: NewsArticle; index: number }) {
  const category = article.category || 'environment';
  const CategoryIcon = categoryConfig[category]?.icon || Newspaper;

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-6 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden relative"
      style={{
        animation: `slideInUp 0.6s ease-out ${index * 100}ms both`,
      }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-cyan-50/0 group-hover:from-blue-50 group-hover:to-cyan-50 dark:group-hover:from-blue-500/5 dark:group-hover:to-cyan-500/5 transition-all duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <CategoryIcon className={`w-4 h-4 ${categoryConfig[category]?.color} group-hover:scale-110 transition-transform`} />
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 capitalize">{category}</span>
          </div>
          {article.sentiment && (
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
              article.sentiment === 'positive' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' : 
              article.sentiment === 'concerning' ? 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400' : 
              'bg-slate-100 text-slate-600 dark:bg-slate-500/20 dark:text-slate-400'
            }`}>
              {article.sentiment === 'positive' ? '↑ Positive' : article.sentiment === 'concerning' ? '↓ Concerning' : '→ Neutral'}
            </span>
          )}
        </div>

        <h3 className="font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{article.title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">{article.summary}</p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
            <span>{formatDate(article.date)}</span>
          </div>
          <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity group-hover:translate-x-1 group-hover:-translate-y-1 transform" />
        </div>
      </div>
    </a>
  );
}

export default function News() {
  return (
    <section id="news" className="relative py-20 overflow-hidden px-4 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-white/5 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Newspaper className="w-4 h-4" /> Latest Updates
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Water Quality News & Impact
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Stay informed about water quality developments, health impacts, policy changes, and community initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {curatedNews.map((article, idx) => (
            <NewsCard key={idx} article={article} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
