import { useState } from "react";
import { Droplets, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading: boolean;
  error?: string | null;
  onClearError?: () => void;
}

export const LoginForm = ({ onSubmit, isLoading, error, onClearError }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    onSubmit(email, password);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error && onClearError) onClearError();
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error && onClearError) onClearError();
  };

  return (
    <Card className="w-full max-w-md border border-slate-200/80 shadow-lg bg-white rounded-2xl">
      <CardContent className="p-8 lg:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-brand to-brand-light rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Droplets className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-slate-800">
            Welcome Back
          </h2>
          <p className="text-sm text-slate-500">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">Login Failed</p>
              <p className="text-sm text-red-600 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              className={`peer w-full h-14 px-4 pt-5 pb-2 rounded-xl border-2 outline-none transition-all duration-300 bg-white text-slate-800 ${
                error 
                  ? 'border-red-300 focus:border-red-500' 
                  : 'border-slate-200 focus:border-brand'
              } focus:shadow-lg focus:shadow-brand/10 ${focusedField === 'email' ? 'ring-4 ring-brand/10' : ''}`}
              placeholder=" "
              autoComplete="email"
            />
            <label
              htmlFor="email"
              className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                email || focusedField === 'email'
                  ? 'top-2 text-xs font-medium text-brand'
                  : 'top-1/2 -translate-y-1/2 text-sm text-slate-400'
              }`}
            >
              Email Address
            </label>
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              className={`peer w-full h-14 px-4 pt-5 pb-2 pr-12 rounded-xl border-2 outline-none transition-all duration-300 bg-white text-slate-800 ${
                error 
                  ? 'border-red-300 focus:border-red-500' 
                  : 'border-slate-200 focus:border-brand'
              } focus:shadow-lg focus:shadow-brand/10 ${focusedField === 'password' ? 'ring-4 ring-brand/10' : ''}`}
              placeholder=" "
              autoComplete="current-password"
            />
            <label
              htmlFor="password"
              className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                password || focusedField === 'password'
                  ? 'top-2 text-xs font-medium text-brand'
                  : 'top-1/2 -translate-y-1/2 text-sm text-slate-400'
              }`}
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-all duration-200 hover:scale-110 text-slate-400 hover:text-brand hover:bg-slate-100"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Login Button */}
          <Button 
            type="submit" 
            disabled={isLoading || !email || !password}
            className={`w-full h-14 text-base font-semibold rounded-xl transition-all duration-300 gap-2 ${
              isLoading || !email || !password
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:shadow-xl hover:shadow-brand/25'
            } bg-gradient-to-r from-brand to-brand-light hover:from-brand-light hover:to-brand text-white shadow-lg`}
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

        {/* Test Credentials Section */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <p className="text-xs font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5" />
            Demo Credentials
          </p>
          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="font-medium min-w-[90px]">Field Tech:</span>
              <span className="text-slate-500">fieldtech@gmail.com / 12345678</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium min-w-[90px]">Scientist:</span>
              <span className="text-slate-500">scientist@gmail.com / 12345678</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium min-w-[90px]">Researcher:</span>
              <span className="text-slate-500">researcher@gmail.com / 12345678</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium min-w-[90px]">Policymaker:</span>
              <span className="text-slate-500">policymaker@gmail.com / 12345678</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
