/**
 * Footer Component - Professional Footer
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Droplets, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  Shield,
  Lock,
  Award,
} from 'lucide-react';

function FooterLink({ 
  href, 
  children, 
  external = false 
}: { 
  href: string; 
  children: React.ReactNode; 
  external?: boolean;
}) {
  const className = "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-300";
  
  if (external) {
    return (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${className} flex items-center gap-1`}
      >
        <span>{children}</span>
        <ExternalLink className="w-3 h-3" />
      </a>
    );
  }
  
  if (href.startsWith('#')) {
    return (
      <a 
        href={href}
        onClick={(e) => {
          e.preventDefault();
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className={className}
      >
        {children}
      </a>
    );
  }
  
  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
}

function TrustBadge({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 text-sm">
      <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
      <span>{text}</span>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const platformLinks = [
    { label: 'Dashboard', href: '/login' },
    { label: 'Water Quality Map', href: '#map' },
    { label: 'Reports', href: '/login' },
    { label: 'Alerts', href: '#alerts' },
  ];

  const resourceLinks = [
    { label: 'AQI India', href: 'https://www.aqi.in/in', external: true },
    { label: 'WHO Water Quality', href: 'https://www.who.int', external: true },
    { label: 'BIS Standards', href: 'https://www.bis.gov.in/', external: true },
    { label: 'CPCB India', href: 'https://cpcb.nic.in/', external: true },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ];

  return (
    <footer className="relative bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                <Droplets className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900 dark:text-white">Nirmaya</span>
                <span className="text-xs text-slate-600 dark:text-slate-400 block">Water Quality Intelligence</span>
              </div>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 max-w-sm">
              India's premier water quality monitoring platform. Empowering government agencies and researchers with real-time data.
            </p>
          </div>
          
          {/* Platform Links */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-4">Platform</h4>
            <ul className="space-y-2">
              {platformLinks.map((link, index) => (
                <li key={index}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources Links */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <FooterLink href={link.href} external={link.external}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal Links */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Trust Badges */}
        <div className="border-t border-slate-200 dark:border-white/10 pt-8 mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            <TrustBadge icon={Shield} text="Government Approved" />
            <TrustBadge icon={Lock} text="256-bit SSL Encryption" />
            <TrustBadge icon={Award} text="ISO 27001 Certified" />
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-slate-200 dark:border-white/10 pt-8">
          <div className="text-slate-600 dark:text-slate-400 text-sm text-center">
            &copy; {currentYear} Nirmaya. All rights reserved. A Government of Maharashtra Initiative.
          </div>
        </div>
      </div>
    </footer>
  );
}
