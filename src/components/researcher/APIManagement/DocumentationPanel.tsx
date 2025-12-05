import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookOpen, Code, AlertCircle, CheckCircle, Settings } from "lucide-react";

export const DocumentationPanel = () => {
  return (
    <Card className="bg-white border border-slate-200 rounded-lg">
      <CardHeader className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-semibold text-slate-900">Getting Started</h3>
        </div>
      </CardHeader>
      <CardContent className="p-5 space-y-6">
        
        {/* Authentication Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Settings className="w-4 h-4 text-purple-600" />
            </div>
            <h4 className="text-sm font-semibold text-slate-900">Authentication</h4>
          </div>
          <div className="bg-slate-50 rounded-md p-4 border border-slate-200">
            <p className="text-xs text-slate-600 mb-2">
              Most government APIs are open access and do not require authentication. For restricted datasets:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Register on the respective government portal</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Request API access credentials if required</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Follow the specific API documentation for authentication methods</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Making Requests */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Code className="w-4 h-4 text-blue-600" />
            </div>
            <h4 className="text-sm font-semibold text-slate-900">Making API Requests</h4>
          </div>
          <div className="space-y-3">
            <div className="bg-slate-50 rounded-md p-3 border border-slate-200">
              <h5 className="text-xs font-medium text-slate-700 mb-2">Using cURL</h5>
              <div className="bg-slate-800 rounded p-3">
                <code className="text-xs text-emerald-400 font-mono">
                  curl -X GET "https://api.example.com/groundwater/quality" \<br />
                  &nbsp;&nbsp;-H "Accept: application/json"
                </code>
              </div>
            </div>
            <div className="bg-slate-50 rounded-md p-3 border border-slate-200">
              <h5 className="text-xs font-medium text-slate-700 mb-2">Using Python</h5>
              <div className="bg-slate-800 rounded p-3">
                <code className="text-xs text-emerald-400 font-mono">
                  import requests<br /><br />
                  response = requests.get(<br />
                  &nbsp;&nbsp;"https://api.example.com/groundwater/quality"<br />
                  )<br />
                  data = response.json()
                </code>
              </div>
            </div>
            <div className="bg-slate-50 rounded-md p-3 border border-slate-200">
              <h5 className="text-xs font-medium text-slate-700 mb-2">Using JavaScript</h5>
              <div className="bg-slate-800 rounded p-3">
                <code className="text-xs text-emerald-400 font-mono">
                  fetch('https://api.example.com/groundwater/quality')<br />
                  &nbsp;&nbsp;.then(response =&gt; response.json())<br />
                  &nbsp;&nbsp;.then(data =&gt; console.log(data));
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <h4 className="text-sm font-semibold text-slate-900">Best Practices</h4>
          </div>
          <div className="bg-blue-50 rounded-md p-4 border border-blue-200">
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Always check API rate limits and usage policies</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Implement proper error handling in your code</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Cache responses when appropriate to reduce API calls</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Validate and sanitize all data received from APIs</span>
              </li>
            </ul>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
