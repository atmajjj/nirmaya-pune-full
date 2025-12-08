import { Languages } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Language Selector Component
 * Integrates with Google Translate Widget for multilingual support
 * 
 * Supported Languages (Indian + English):
 * - English (en)
 * - Hindi (hi)
 * - Bengali (bn)
 * - Telugu (te)
 * - Marathi (mr)
 * - Tamil (ta)
 * - Gujarati (gu)
 * - Urdu (ur)
 * - Kannada (kn)
 * - Malayalam (ml)
 * - Odia (or)
 * - Punjabi (pa)
 * - Assamese (as)
 * 
 * The widget is initialized dynamically to ensure proper loading and functionality
 */
export const LanguageSelector = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if Google Translate is already loaded
    if (window.google && window.google.translate) {
      initializeTranslate();
      return;
    }

    // Load the Google Translate script if not already present
    if (!document.querySelector('script[src*="translate_a/element.js"]')) {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js';
      script.async = true;
      document.head.appendChild(script);
    }

    // Wait for the script to load and then initialize
    const checkLoaded = setInterval(() => {
      if (window.google && window.google.translate && document.getElementById('google_translate_element')) {
        clearInterval(checkLoaded);
        initializeTranslate();
      }
    }, 100);

    function initializeTranslate() {
      try {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'hi,en,te,ta,kn,ml,or,pa,gu,bn,as,mr,ur',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        }, 'google_translate_element');
        setIsLoaded(true);
      } catch (error) {
        console.error('Failed to initialize Google Translate:', error);
      }
    }

    // Fallback: try to initialize after a delay
    const timer = setTimeout(() => {
      if (!isLoaded && window.google && window.google.translate) {
        initializeTranslate();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 text-brand-surface">
        <Languages className="w-4 h-4" />
        <span className="text-sm">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Languages className="w-4 h-4 text-brand-surface" />
      <div id="google_translate_element" className="translate-widget"></div>
    </div>
  );
};

// TypeScript declarations for Google Translate
declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: {
          new (
            config: {
              pageLanguage: string;
              includedLanguages: string;
              layout: any;
              autoDisplay: boolean;
            },
            elementId: string
          ): void;
          InlineLayout: {
            SIMPLE: any;
          };
        };
      };
    };
    googleTranslateElementInit?: () => void;
  }
}
