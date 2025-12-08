/**
 * Chatbot Debug Page
 * Testing and debugging page for chatbot integration
 */

import React from 'react';
import ChatbotDebugger from '@/components/ChatbotDebugger';
import NIRAChatbot from '@/components/NIRAChatbot';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const ChatbotDebugPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold mb-2">Chatbot Integration Testing</h1>
          <p className="text-gray-600">Debug and test the NIRA AI Chatbot integration</p>
        </div>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>How to Use This Page</AlertTitle>
          <AlertDescription>
            <ol className="list-decimal list-inside space-y-1 mt-2">
              <li>Run the diagnostic tests below to check your configuration</li>
              <li>Look for any errors in the test results</li>
              <li>Open browser DevTools (F12) and check the Console tab</li>
              <li>Try sending a message using the chatbot widget in the bottom-right</li>
              <li>Check the console for detailed logs (marked with 🔵, ✅, or ❌)</li>
            </ol>
          </AlertDescription>
        </Alert>

        <ChatbotDebugger />

        <Card>
          <CardHeader>
            <CardTitle>Expected API Response Format</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-2">
              The backend should return this JSON structure:
            </p>
            <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`{
  "success": true,
  "data": {
    "sessionId": 123,
    "message": "Based on the documents...",
    "sources": [
      {
        "documentId": 1,
        "documentName": "Research Paper.pdf",
        "relevance": 0.92
      }
    ]
  }
}`}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Troubleshooting Guide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">❌ "Cannot connect to backend server"</h3>
              <p className="text-sm text-gray-600">
                <strong>Solution:</strong> Your backend is not running. Start it with:
              </p>
              <pre className="bg-gray-100 p-2 rounded text-xs mt-1">
                cd backend && npm run dev
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">❌ "404 Not Found" on /chatbot/chat</h3>
              <p className="text-sm text-gray-600">
                <strong>Solution:</strong> The chatbot API endpoints are not implemented in your backend yet. 
                Follow the <code className="bg-gray-200 px-1 rounded">chatbot-api.md</code> guide to implement them.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">❌ "401 Unauthorized"</h3>
              <p className="text-sm text-gray-600">
                <strong>Solution:</strong> You need to be logged in. Go to the login page and authenticate first.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">❌ CORS errors</h3>
              <p className="text-sm text-gray-600">
                <strong>Solution:</strong> Add CORS middleware to your backend:
              </p>
              <pre className="bg-gray-100 p-2 rounded text-xs mt-1">
{`// Express.js example
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">✅ All tests pass but no response</h3>
              <p className="text-sm text-gray-600">
                <strong>Check:</strong> 
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 ml-4">
                <li>Browser console for detailed logs</li>
                <li>Network tab in DevTools for the actual request/response</li>
                <li>Backend logs to see if request is received</li>
                <li>Response format matches the expected structure above</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Console Logs Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-2">
              Look for these emoji markers in your browser console:
            </p>
            <ul className="space-y-1 text-sm">
              <li><code className="bg-gray-100 px-1 rounded">🔵</code> - Request sent</li>
              <li><code className="bg-gray-100 px-1 rounded">✅</code> - Success</li>
              <li><code className="bg-gray-100 px-1 rounded">❌</code> - Error</li>
              <li><code className="bg-gray-100 px-1 rounded">🚀</code> - Component action</li>
              <li><code className="bg-gray-100 px-1 rounded">📩</code> - Response received</li>
              <li><code className="bg-gray-100 px-1 rounded">⚠️</code> - Warning</li>
              <li><code className="bg-gray-100 px-1 rounded">🏁</code> - Complete</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Chatbot widget for testing */}
      <NIRAChatbot />
    </div>
  );
};

export default ChatbotDebugPage;
