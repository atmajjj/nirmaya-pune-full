/**
 * LandingPage - Main Landing Page Component
 * Features: Map-first design, comprehensive platform showcase with animations
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Droplets, 
  Menu, 
  X, 
  ChevronUp,
  LogIn,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme, ThemeProvider } from '@/context/ThemeContext';

// Import Landing Page Components
import Hero from '@/components/landing/Hero';
import WQIScale from '@/components/landing/WQIScale';
import WQIMap from '@/components/landing/WQIMap';
import Alerts from '@/components/landing/Alerts';
import Features from '@/components/landing/Features';
import SubscriptionBenefits from '@/components/landing/SubscriptionBenefits';
import SMSAlertSubscription from '@/components/landing/SMSAlertSubscription';
import TrustedBy from '@/components/landing/TrustedBy';
import News from '@/components/landing/News';
import ExternalResources from '@/components/landing/ExternalResources';
import Footer from '@/components/landing/Footer';

// Inline CSS for animations
const AnimationStyles = () => (
  <style>{`
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideInDown {
      from {
        opacity: 0;
        transform: translateY(-30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    @keyframes glow {
      0%, 100% {
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
      }
      50% {
        box-shadow: 0 0 30px rgba(59, 130, 246, 0.8);
      }
    }

    @keyframes shimmer {
      0% {
        background-position: -1000px 0;
      }
      100% {
        background-position: 1000px 0;
      }
    }

    .animate-slide-in-up {
      animation: slideInUp 0.6s ease-out forwards;
    }

    .animate-slide-in-down {
      animation: slideInDown 0.6s ease-out forwards;
    }

    .animate-fade-in {
      animation: fadeIn 0.6s ease-out forwards;
    }

    .animate-scale-in {
      animation: scaleIn 0.6s ease-out forwards;
    }

    .animate-float {
      animation: float 3s ease-in-out infinite;
    }

    .animate-glow {
      animation: glow 2s ease-in-out infinite;
    }

    .delay-100 { animation-delay: 100ms; }
    .delay-200 { animation-delay: 200ms; }
    .delay-300 { animation-delay: 300ms; }
    .delay-400 { animation-delay: 400ms; }
    .delay-500 { animation-delay: 500ms; }
    .delay-600 { animation-delay: 600ms; }
    .delay-700 { animation-delay: 700ms; }
    .delay-800 { animation-delay: 800ms; }
    .delay-900 { animation-delay: 900ms; }
    .delay-1000 { animation-delay: 1000ms; }

    /* Smooth transitions for all elements */
    * {
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    /* Remove transition from animations */
    [style*="animation"] {
      transition: none;
    }
  `}</style>
);

// Navigation Links
const navLinks = [
  { label: 'Map', href: '#map' },
  { label: 'WQI Index', href: '#wqi-scale' },
  { label: 'Alerts', href: '#alerts' },
  { label: 'Features', href: '#features' },
  { label: 'News', href: '#news' },
];

// Scroll Progress Bar Component
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalHeight) * 100;
      setProgress(Math.min(100, Math.max(0, currentProgress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] bg-slate-200/50 dark:bg-white/5 z-[100]">
      <div 
        className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// Back to Top Button
function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setIsVisible(scrollPercent > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white 
        shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300 z-50
        flex items-center justify-center group
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      aria-label="Back to top"
    >
      <ChevronUp className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1" />
    </button>
  );
}

// Glassmorphism Navbar
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isScrolled 
                  ? 'bg-gradient-to-br from-blue-500 to-cyan-500' 
                  : 'bg-blue-500/10 dark:bg-white/10 backdrop-blur-sm border border-blue-500/20 dark:border-white/20'
              }`}>
                <Droplets className={`w-6 h-6 ${isScrolled ? 'text-white' : 'text-blue-500 dark:text-white'}`} />
              </div>
              {isScrolled && (
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 blur opacity-40 group-hover:opacity-60 transition-opacity" />
              )}
            </div>
            <div>
              <span className={`text-xl font-bold ${isScrolled ? 'text-blue-600 dark:text-white' : 'text-blue-600 dark:text-white'}`}>
                Nirmaya
              </span>
              <span className={`text-[10px] block -mt-1 ${isScrolled ? 'text-slate-600 dark:text-white/50' : 'text-slate-600 dark:text-white/50'}`}>
                Water Quality Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative px-4 py-2 text-sm font-medium text-slate-600 dark:text-white/70 hover:text-blue-600 dark:hover:text-cyan-400 transition-all duration-300 rounded-xl hover:bg-blue-500/5 dark:hover:bg-white/5 group"
              >
                {link.label}
                <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
              </a>
            ))}
          </div>

          {/* CTA Button + Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-blue-500/5 dark:bg-white/5 border border-blue-500/10 dark:border-white/10 text-slate-600 dark:text-white/70 
                hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-blue-500/10 dark:hover:bg-white/10 hover:border-cyan-500/30 dark:hover:border-cyan-500/30 transition-all duration-300"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <Link
              to="/login"
              className="group relative flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm 
                bg-gradient-to-r from-blue-500 to-cyan-500 text-white
                hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <LogIn className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Sign In</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-blue-500/5 dark:bg-white/5 border border-blue-500/10 dark:border-white/10 text-blue-600 dark:text-white hover:bg-blue-500/10 dark:hover:bg-white/10 transition-all"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="rounded-2xl p-4 bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/50 dark:border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block py-3 px-4 rounded-xl text-sm font-medium text-slate-600 dark:text-white/70 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-blue-500/5 dark:hover:bg-white/5 transition-all"
              >
                {link.label}
              </a>
            ))}
            
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 w-full mt-2 py-3 px-4 rounded-xl text-sm font-medium text-slate-600 dark:text-white/70 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-blue-500/5 dark:hover:bg-white/5 transition-all"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </button>

            <Link
              to="/login"
              className="block mt-3 py-3.5 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-center rounded-xl font-bold text-sm"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Main Landing Page Component
export default function LandingPage() {
  return (
    <ThemeProvider>
      <LandingPageContent />
    </ThemeProvider>
  );
}

// Landing Page Content (wrapped by ThemeProvider)
function LandingPageContent() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <AnimationStyles />
      
      {/* Scroll Progress */}
      <ScrollProgress />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Map Section (Top Hero) */}
      <WQIMap />
      
      {/* Hero Section */}
      <Hero />
      
      {/* WQI Scale Section */}
      <WQIScale />
      
      {/* Alerts Section */}
      <Alerts />
      
      {/* Features Section */}
      <Features />

      {/* SMS Alerts Section */}
      <section
        id="sms-alerts"
        className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900"
      >
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1fr_1.25fr] items-start">
          <SubscriptionBenefits />
          <SMSAlertSubscription />
        </div>
      </section>
      
      {/* Trusted By Section */}
      <TrustedBy />
      
      {/* News Section */}
      <News />
      
      {/* External Resources Section */}
      <ExternalResources />
      
      {/* Footer */}
      <Footer />
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}
