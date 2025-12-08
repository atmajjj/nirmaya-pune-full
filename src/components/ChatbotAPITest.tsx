/**
 * Chatbot API Test Component
 * Use this to test the chatbot API integration
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { chatbotService } from '@/services/api';
import { ENV } from '@/config/env';

const ChatbotAPITest = () => {
  const [testMessage, setTestMessage] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      console.log('Testing API at:', ENV.API_URL);
      console.log('Sending message:', testMessage);

      const result = await chatbotService.sendMessage({
        message: testMessage || 'Hello, NIRA!',
      });

      console.log('API Response:', result);
      setResponse(result);
    } catch (err) {
      console.error('API Error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      console.log('Testing connection to:', ENV.API_URL);
      
      const response = await fetch(ENV.API_URL.replace('/api', '') + '/health', {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        setResponse({ health: data });
        console.log('Health check:', data);
      } else {
        throw new Error(`Health check failed: ${response.status}`);
      }
    } catch (err) {
      console.error('Connection Error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Chatbot API Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">
            API URL: <code className="bg-gray-100 px-2 py-1 rounded">{ENV.API_URL}</code>
          </p>
        </div>

        <div className="space-y-2">
          <Input
            value={testMessage}
            onChange={(e) => setTestMessage(e.target.value)}
            placeholder="Enter test message"
          />
          <div className="flex gap-2">
            <Button onClick={testAPI} disabled={loading}>
              {loading ? 'Testing...' : 'Test Chat API'}
            </Button>
            <Button onClick={testConnection} variant="outline" disabled={loading}>
              Test Connection
            </Button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded">
            <h3 className="font-semibold text-red-800">Error:</h3>
            <pre className="text-sm text-red-700 mt-2 whitespace-pre-wrap">{error}</pre>
          </div>
        )}

        {response && (
          <div className="p-4 bg-green-50 border border-green-200 rounded">
            <h3 className="font-semibold text-green-800">Response:</h3>
            <pre className="text-sm text-green-700 mt-2 whitespace-pre-wrap overflow-auto max-h-96">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}

        <div className="p-4 bg-blue-50 border border-blue-200 rounded text-sm">
          <h3 className="font-semibold text-blue-800 mb-2">Troubleshooting:</h3>
          <ol className="list-decimal list-inside space-y-1 text-blue-700">
            <li>Make sure your backend server is running</li>
            <li>Verify the backend is accessible at <code>{ENV.API_URL}</code></li>
            <li>Check that the chatbot endpoints are implemented</li>
            <li>Ensure CORS is configured to allow requests from this origin</li>
            <li>Check browser console for detailed error messages</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatbotAPITest;
