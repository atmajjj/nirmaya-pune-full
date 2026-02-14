/**
 * WQI Map - Interactive Water Quality Map with animations
 */

import React, { useState, useEffect } from 'react';
import { MapPin, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

const slideShowImages = [
  '/images/slideshow/water-quality-1.jpg',
  '/images/slideshow/water-quality-2.jpg',
  '/images/slideshow/water-quality-3.jpg',
];

export default function WQIMap() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideShowImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideShowImages.length) % slideShowImages.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideShowImages.length);
  };

  return (
    <section id="map" className="relative w-full h-96 md:h-[500px] mt-20 overflow-hidden rounded-b-3xl">
      {/* Slideshow Container */}
      <div className="absolute inset-0">
        {slideShowImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Water quality slideshow ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        ))}

        {/* Fallback Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/80 via-cyan-50/70 to-blue-50/80 dark:from-blue-900/40 dark:via-cyan-900/30 dark:to-blue-900/40">
          {/* Animated Map Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-10 animate-pulse"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Animated background orbs */}
          <div className="absolute top-20 left-1/4 w-48 h-48 bg-blue-300/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-cyan-300/20 rounded-full blur-3xl animate-float delay-1000" />
        </div>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center animate-slide-in-up z-10" style={{ animationDelay: '300ms' }}>
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full p-4 animate-glow">
              <MapPin className="w-12 h-12 text-white" />
            </div>
          </div>
          <p className="text-slate-700 dark:text-slate-300 font-semibold text-lg mb-2 flex items-center justify-center gap-2">
            <Zap className="w-5 h-5 text-blue-600 animate-pulse" />
            Welcome to NIRMAYA
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs">
            Sign in to view real-time data from 2,800+ monitoring stations across India
          </p>
        </div>
      </div>

      {/* Slideshow Controls */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-center gap-4">
        {/* Previous Button */}
        <button
          onClick={goToPrevSlide}
          className="p-2 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md hover:bg-white/30 dark:hover:bg-black/30 text-white transition-all duration-300 border border-white/30"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Slide Indicators */}
        <div className="flex gap-2">
          {slideShowImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white w-6'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={goToNextSlide}
          className="p-2 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md hover:bg-white/30 dark:hover:bg-black/30 text-white transition-all duration-300 border border-white/30"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-transparent to-transparent" />
    </section>
  );
}
