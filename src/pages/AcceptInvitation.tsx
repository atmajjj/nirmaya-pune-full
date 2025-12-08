import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Droplets, Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";
import { invitationService, tokenManager } from "@/services/api";
import { showSuccessToast, showErrorToast } from "@/lib/toast-utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { UserRole } from "@/types/auth.types";

/**
 * Get the dashboard route based on user role
 */
const getDashboardRoute = (role: UserRole): string => {
  const roleRoutes: Record<UserRole, string> = {
    admin: '/admin/overview',
    scientist: '/scientist/overview',
    researcher: '/researcher/overview',
    policymaker: '/policymaker/risk-alerts',
  };
  return roleRoutes[role] || '/scientist/overview';
};

const AcceptInvitation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('invite_token');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if token exists in URL
    if (!token) {
      setError('Invalid invitation link. Please check your email for the correct link.');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      setError('Invalid invitation token');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await invitationService.acceptInvitation({
        token,
        email: email.trim(),
        password: password.trim()
      });

      if (response.success && response.data) {
        // Store the JWT token
        tokenManager.setTokens(response.data.token);
        tokenManager.setUser(response.data);

        showSuccessToast(
          'Account Created Successfully',
          `Welcome, ${response.data.name}! Redirecting to your dashboard...`
        );

        // Redirect to appropriate dashboard based on role
        setTimeout(() => {
          navigate(getDashboardRoute(response.data.role), { replace: true });
        }, 1500);
      } else {
        throw new Error(response.message || 'Failed to accept invitation');
      }
    } catch (err: any) {
      console.error('Accept invitation error:', err);
      const errorMessage = err?.data?.message || err?.message || 'Failed to accept invitation. Please check your credentials and try again.';
      setError(errorMessage);
      showErrorToast('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-2 text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-4 rounded-full">
              <Droplets className="h-10 w-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Accept Invitation</CardTitle>
          <CardDescription className="text-base">
            Enter the credentials from your invitation email to activate your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!token ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Invalid invitation link. Please check your email for the correct link.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Alert className="mb-6 border-blue-200 bg-blue-50">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-900">
                  Please enter your email address and the temporary password from your invitation email.
                </AlertDescription>
              </Alert>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email from invitation"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                      disabled={isLoading}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Temporary Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter password from invitation"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                      disabled={isLoading}
                      autoComplete="current-password"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    You'll be able to change this password after logging in
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading || !email || !password}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Creating Account...
                    </>
                  ) : (
                    'Accept Invitation & Login'
                  )}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    onClick={() => navigate('/')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                    disabled={isLoading}
                  >
                    Login here
                  </button>
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AcceptInvitation;
