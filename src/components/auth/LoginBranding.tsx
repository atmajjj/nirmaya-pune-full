import { Droplets, Waves } from "lucide-react";

export const LoginBranding = () => {
  return (
    <div className="relative z-10 flex flex-col justify-center px-12 ml-12 text-white">
      {/* Logo */}
      <div className="flex items-center gap-4 mb-10">
        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-xl">
          <Droplets className="w-7 h-7 text-[#6EDFF6]" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">Nirmaya</h1>
          <p className="text-[#6EDFF6] text-sm font-medium drop-shadow-md">Groundwater Intelligence</p>
        </div>
      </div>

      {/* Headline */}
      <h2 className="text-4xl font-bold leading-tight mb-5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
        Protecting India's
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6EDFF6] to-cyan-200 drop-shadow-none">
          Water Future
        </span>
      </h2>
      
      <p className="text-base text-white/90 max-w-sm leading-relaxed mb-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] bg-black/20 backdrop-blur-sm rounded-lg p-3">
        Advanced monitoring and analytics platform for sustainable groundwater management across the nation.
      </p>

      {/* Stats */}
      <div className="flex gap-6 bg-black/30 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-xl max-w-md">
        <div className="text-center">
          <div className="text-2xl font-bold drop-shadow-md">500+</div>
          <div className="text-xs text-white/80">Wells Monitored</div>
        </div>
        <div className="w-px bg-white/30" />
        <div className="text-center">
          <div className="text-2xl font-bold drop-shadow-md">32</div>
          <div className="text-xs text-white/80">States Covered</div>
        </div>
        <div className="w-px bg-white/30" />
        <div className="text-center">
          <div className="text-2xl font-bold drop-shadow-md">2.5M</div>
          <div className="text-xs text-white/80">Data Points</div>
        </div>
      </div>

      {/* Water droplet decorations */}
      <div className="absolute bottom-36 left-12 flex gap-3 opacity-60">
        <Waves className="w-5 h-5 drop-shadow-md" />
        <Waves className="w-5 h-5 drop-shadow-md" style={{ animationDelay: '0.2s' }} />
        <Waves className="w-5 h-5 drop-shadow-md" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>
  );
};
