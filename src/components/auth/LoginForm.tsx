import { useState } from "react";
import { Droplets, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
  isLoading: boolean;
}

export const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    onSubmit(username, password);
  };

  return (
    <Card className="w-full max-w-md border border-slate-200/80 shadow-lg bg-white rounded-2xl">
      <CardContent className="p-8 lg:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-[#0A3D62] to-[#0d4a75] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Droplets className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-slate-800">
            Welcome Back
          </h2>
          <p className="text-sm text-slate-500">
            Sign in to access your dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Field */}
          <div className="relative">
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setFocusedField('username')}
              onBlur={() => setFocusedField(null)}
              className={`peer w-full h-14 px-4 pt-5 pb-2 rounded-xl border-2 outline-none transition-all duration-300 bg-white border-slate-200 text-slate-800 focus:border-[#0A3D62] focus:shadow-lg focus:shadow-[#0A3D62]/10 ${focusedField === 'username' ? 'ring-4 ring-[#0A3D62]/10' : ''}`}
              placeholder=" "
            />
            <label
              htmlFor="username"
              className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                username || focusedField === 'username'
                  ? 'top-2 text-xs font-medium text-[#0A3D62]'
                  : 'top-1/2 -translate-y-1/2 text-sm text-slate-400'
              }`}
            >
              Username
            </label>
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              className={`peer w-full h-14 px-4 pt-5 pb-2 pr-12 rounded-xl border-2 outline-none transition-all duration-300 bg-white border-slate-200 text-slate-800 focus:border-[#0A3D62] focus:shadow-lg focus:shadow-[#0A3D62]/10 ${focusedField === 'password' ? 'ring-4 ring-[#0A3D62]/10' : ''}`}
              placeholder=" "
            />
            <label
              htmlFor="password"
              className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                password || focusedField === 'password'
                  ? 'top-2 text-xs font-medium text-[#0A3D62]'
                  : 'top-1/2 -translate-y-1/2 text-sm text-slate-400'
              }`}
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-all duration-200 hover:scale-110 text-slate-400 hover:text-[#0A3D62] hover:bg-slate-100"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Login Button */}
          <Button 
            type="submit" 
            disabled={isLoading || !username || !password}
            className={`w-full h-14 text-base font-semibold rounded-xl transition-all duration-300 gap-2 ${
              isLoading || !username || !password
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:shadow-xl hover:shadow-[#0A3D62]/25'
            } bg-gradient-to-r from-[#0A3D62] to-[#0d4a75] hover:from-[#0d4a75] hover:to-[#0A3D62] text-white shadow-lg`}
          >
            {isLoading ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing in...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                Sign in
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
