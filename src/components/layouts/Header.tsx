import { Button } from "@/components/ui/button";
import { LogOut, Menu, UserCircle, Shield } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface UserInfo {
  name: string;
  email: string;
  role: string;
  initials: string;
}

interface HeaderProps {
  userInfo: UserInfo;
  onToggleSidebar: () => void;
  onLogout: () => void;
  dashboardTitle?: string;
}

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
  }
}

// Reusable class constants for header elements
const headerButtonClass = "text-brand-surface hover:bg-brand-secondary/20 hover:text-brand-accent focus:bg-brand-secondary/20 transition-all duration-200";

export const Header = ({ userInfo, onToggleSidebar, onLogout, dashboardTitle }: HeaderProps) => {
  const navigate = useNavigate();

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutDialog(false);
    onLogout();
  };
  useEffect(() => {
    // Initialize Google Translate widget when component mounts
    const initializeGoogleTranslate = () => {
      if (window.google && window.google.translate && document.getElementById('google_translate_element')) {
        try {
          new window.google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,hi,bn,te,mr,ta,gu,ur,kn,ml,or,pa,as',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
          }, 'google_translate_element');
        } catch (error) {
          console.error('Failed to initialize Google Translate:', error);
        }
      }
    };

    // Check if Google Translate is already loaded
    if (window.google && window.google.translate) {
      initializeGoogleTranslate();
    } else {
      // Wait for Google Translate to load
      const checkGoogleTranslate = setInterval(() => {
        if (window.google && window.google.translate) {
          clearInterval(checkGoogleTranslate);
          initializeGoogleTranslate();
        }
      }, 100);

      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkGoogleTranslate);
      }, 10000);
    }
  }, []);

  return (
    <>
    <header className="h-16 flex items-center justify-between px-6 flex-shrink-0 bg-gradient-to-r from-brand via-brand to-brand-light shadow-lg border-b border-brand-navy-light/30">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className={headerButtonClass}
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <div className="flex flex-col">
          <h1 className="text-xl font-bold tracking-wide text-white">{dashboardTitle || 'Nirmaya'}</h1>
        </div>
      </div>

      {/* Center Section - Search Bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 pl-10 pr-4 text-sm bg-brand-light/50 border border-brand-secondary/30 rounded-lg text-white placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent/50 focus:bg-brand-light/70 transition-all duration-200"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-brand-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Language Selector */}
        <div className="border-r border-brand-surface/20 pr-3">
          <div id="google_translate_element" className="translate-widget"></div>
        </div>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className={`relative ${headerButtonClass}`}
              aria-label="User profile menu"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-secondary to-brand-secondary-dark flex items-center justify-center">
                <span className="text-xs font-semibold text-white">{userInfo.initials}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 bg-white shadow-xl border border-slate-200 rounded-xl p-0 overflow-hidden">
            {/* User Header */}
            <div className="bg-gradient-to-r from-brand to-brand-light px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-secondary to-brand-secondary-dark flex items-center justify-center shadow-lg">
                  <span className="text-base font-bold text-white">{userInfo.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{userInfo.name}</p>
                  <p className="text-xs text-brand-muted truncate">{userInfo.email}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-brand-accent" />
                <span className="text-xs font-medium text-brand-accent">{userInfo.role}</span>
              </div>
            </div>
            
            {/* Menu Items */}
            <div className="p-2">
              <DropdownMenuItem 
                onClick={() => navigate('/profile')}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-slate-100 focus:bg-slate-100"
              >
                <UserCircle className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-700">View Profile</span>
              </DropdownMenuItem>
            </div>
            
            <DropdownMenuSeparator className="my-0" />
            
            {/* Logout */}
            <div className="p-2">
              <DropdownMenuItem 
                onClick={handleLogoutClick}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-red-600 hover:bg-red-50 focus:bg-red-50 hover:text-red-700"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Logout Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleLogoutClick}
          className={headerButtonClass}
          aria-label="Logout"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </header>

    {/* Logout Confirmation Dialog */}
    <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to logout? You will need to sign in again to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmLogout} className="bg-red-600 hover:bg-red-700">
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
};

