import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Droplets } from "lucide-react";
import { LoginSlideshow, LoginBranding, LoginForm } from "@/components/auth";

// Background images for slideshow
const backgroundImages = [
  {
    url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1920&q=80",
    title: "Water Sample Collection",
    description: "Field researchers collecting groundwater samples"
  },
  {
    url: "https://images.unsplash.com/photo-1563974318767-a4de855d7b43?w=1920&q=80",
    title: "Laboratory Analysis",
    description: "Scientific testing of water quality"
  },
  {
    url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1920&q=80",
    title: "Research & Development",
    description: "Advanced groundwater research"
  },
  {
    url: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=1920&q=80",
    title: "Environmental Monitoring",
    description: "Sustainable water management practices"
  },
];

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? backgroundImages.length - 1 : prev - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
  };

  const handleLogin = (username: string, password: string) => {
    setIsLoading(true);
    
    // TODO: Replace with actual API call
    setTimeout(() => {
      auth.login("scientist");
      navigate("/scientist/overview");
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex transition-colors duration-500 bg-slate-50">
      {/* Left Panel - Decorative with Image Slideshow */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <LoginSlideshow
          images={backgroundImages}
          currentIndex={currentImageIndex}
          onPrev={goToPrevImage}
          onNext={goToNextImage}
          onDotClick={setCurrentImageIndex}
        />
        
        {/* Animated Wave Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="currentColor" className="text-white" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
              <animate attributeName="d" dur="10s" repeatCount="indefinite" values="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;M0,192L48,181.3C96,171,192,149,288,160C384,171,480,213,576,218.7C672,224,768,192,864,165.3C960,139,1056,117,1152,128C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
            </path>
          </svg>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-40 right-20 w-80 h-80 bg-[#6EDFF6]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-blue-300/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <LoginBranding />
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative bg-gradient-to-b from-slate-50 to-white">
        {/* Mobile Logo */}
        <div className="absolute top-6 left-6 lg:hidden flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#0A3D62] to-[#0d4a75] shadow-lg">
            <Droplets className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl text-slate-800">Nirmaya</span>
        </div>

        <LoginForm onSubmit={handleLogin} isLoading={isLoading} />

        {/* Bottom decoration for mobile */}
        <div className="absolute bottom-0 left-0 right-0 h-32 lg:hidden bg-gradient-to-t from-slate-100 to-transparent" />
      </div>
    </div>
  );
};

export default Login;
