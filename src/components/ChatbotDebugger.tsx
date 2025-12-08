/**
 * Chatbot Debugger Component
 * Comprehensive testing and debugging tool for chatbot API
 */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ENV } from '@/config/env';
import { Bug, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

interface TestResult {
  name: string;
  status: 'pending' | 'success' | 'error';
  message: string;
  details?: unknown;
}

export const ChatbotDebugger: React.FC = () => {
  const [tests, setTests] = useState<TestResult[]>([]);
  const [testing, setTesting] = useState(false);

  const updateTest = (name: string, status: TestResult['status'], message: string, details?: unknown) => {
    setTests(prev => {
      const existing = prev.find(t => t.name === name);
      if (existing) {
        return prev.map(t => t.name === name ? { name, status, message, details } : t);
      }
      return [...prev, { name, status, message, details }];
    });
  };

  const runTests = async () => {
    setTesting(true);
    setTests([]);

    // Test 1: Environment Configuration
    updateTest('Environment', 'pending', 'Checking environment configuration...');
    try {
      const apiUrl = ENV.API_URL;
      if (!apiUrl || apiUrl === '') {
        updateTest('Environment', 'error', 'VITE_API_URL is not configured', { apiUrl });
      } else {
        updateTest('Environment', 'success', `API URL: ${apiUrl}`, { apiUrl });
      }
    } catch (error) {
      updateTest('Environment', 'error', 'Failed to check environment', error);
    }

    // Test 2: Backend Health Check
    updateTest('Backend Health', 'pending', 'Checking backend server...');
    try {
      const healthUrl = `${ENV.API_URL.replace('/api', '')}/health`;
      console.log('Testing health endpoint:', healthUrl);
      
      const response = await fetch(healthUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        const data = await response.json();
        updateTest('Backend Health', 'success', 'Backend server is running', data);
      } else {
        updateTest('Backend Health', 'error', `Server responded with ${response.status}`, {
          status: response.status,
          statusText: response.statusText
        });
      }
    } catch (error) {
      updateTest('Backend Health', 'error', 'Cannot connect to backend server', {
        error: error instanceof Error ? error.message : 'Unknown error',
        apiUrl: ENV.API_URL
      });
    }

    // Test 3: Chatbot Endpoint Test
    updateTest('Chatbot API', 'pending', 'Testing chatbot endpoint...');
    try {
      const chatUrl = `${ENV.API_URL}/chatbot/chat`;
      console.log('Testing chatbot endpoint:', chatUrl);

      const token = localStorage.getItem('access_token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(chatUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          message: 'Hello, this is a test message',
        })
      });

      console.log('Chatbot API Response Status:', response.status);
      const responseText = await response.text();
      console.log('Chatbot API Response Body:', responseText);

      if (response.ok) {
        try {
          const data = JSON.parse(responseText);
          updateTest('Chatbot API', 'success', 'Chatbot endpoint is working', {
            status: response.status,
            response: data
          });
        } catch {
          updateTest('Chatbot API', 'error', 'Invalid JSON response from chatbot', {
            status: response.status,
            responseText
          });
        }
      } else if (response.status === 401) {
        updateTest('Chatbot API', 'error', 'Authentication required - please login first', {
          status: response.status,
          message: 'You need to be logged in to use the chatbot'
        });
      } else if (response.status === 404) {
        updateTest('Chatbot API', 'error', 'Chatbot endpoint not found - backend may not be fully implemented', {
          status: response.status,
          endpoint: chatUrl
        });
      } else {
        updateTest('Chatbot API', 'error', `Server error: ${response.status} ${response.statusText}`, {
          status: response.status,
          statusText: response.statusText,
          responseText
        });
      }
    } catch (error) {
      updateTest('Chatbot API', 'error', 'Failed to connect to chatbot endpoint', {
        error: error instanceof Error ? error.message : 'Unknown error',
        endpoint: `${ENV.API_URL}/chatbot/chat`
      });
    }

    // Test 4: CORS Check
    updateTest('CORS', 'pending', 'Checking CORS configuration...');
    try {
      const testUrl = `${ENV.API_URL}/health`;
      const response = await fetch(testUrl, {
        method: 'OPTIONS'
      });
      
      const corsHeaders = {
        'access-control-allow-origin': response.headers.get('access-control-allow-origin'),
        'access-control-allow-methods': response.headers.get('access-control-allow-methods'),
        'access-control-allow-headers': response.headers.get('access-control-allow-headers'),
      };

      if (corsHeaders['access-control-allow-origin']) {
        updateTest('CORS', 'success', 'CORS is configured', corsHeaders);
      } else {
        updateTest('CORS', 'error', 'CORS headers not found', corsHeaders);
      }
    } catch (error) {
      updateTest('CORS', 'error', 'CORS check failed', error);
    }

    setTesting(false);
  };

  const getIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending': return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto my-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bug className="w-5 h-5" />
          Chatbot Debugger
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertDescription>
            This tool helps diagnose chatbot integration issues. Click "Run Tests" to check:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Environment configuration</li>
              <li>Backend server connectivity</li>
              <li>Chatbot API endpoint</li>
              <li>CORS configuration</li>
            </ul>
          </AlertDescription>
        </Alert>

        <Button onClick={runTests} disabled={testing} className="w-full">
          {testing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Running Tests...
            </>
          ) : (
            'Run Diagnostic Tests'
          )}
        </Button>

        {tests.length > 0 && (
          <div className="space-y-3 mt-4">
            <h3 className="font-semibold text-lg">Test Results:</h3>
            {tests.map((test, index) => (
              <Card key={index} className={
                test.status === 'success' ? 'border-green-500' :
                test.status === 'error' ? 'border-red-500' :
                'border-blue-500'
              }>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {getIcon(test.status)}
                    <div className="flex-1">
                      <h4 className="font-semibold">{test.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{test.message}</p>
                      {test.details && (
                        <details className="mt-2">
                          <summary className="cursor-pointer text-sm text-blue-600 hover:underline">
                            View Details
                          </summary>
                          <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                            {JSON.stringify(test.details, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Alert>
          <AlertDescription className="text-sm">
            <strong>Common Issues:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
              <li><strong>Backend not running:</strong> Start your backend server on port 8000</li>
              <li><strong>404 errors:</strong> Backend chatbot API not implemented yet</li>
              <li><strong>401 errors:</strong> Login required - authenticate first</li>
              <li><strong>CORS errors:</strong> Check backend CORS configuration</li>
              <li><strong>Network errors:</strong> Check API URL in .env file</li>
            </ul>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default ChatbotDebugger;
