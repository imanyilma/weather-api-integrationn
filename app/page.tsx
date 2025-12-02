import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 mt-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">W</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Weather App
            </h1>
          </div>
          <p className="text-lg text-slate-600 max-w-lg mx-auto">
            A full-stack weather application with real-time data, authentication, and a beautiful modern interface.
          </p>
        </div>

        {/* Project Info */}
        <Card className="mb-6 border-slate-200 shadow-lg">
          <CardHeader>
            <CardTitle>Project Structure</CardTitle>
            <CardDescription>Frontend and Backend Overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Frontend Section */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Frontend (Vite + React)
              </h3>
              <p className="text-sm text-slate-600 mb-3">A modern React application built with Vite, featuring:</p>
              <ul className="text-sm text-slate-600 space-y-1 ml-4">
                <li>✓ Beautiful weather cards with real-time data</li>
                <li>✓ City search functionality</li>
                <li>✓ Detailed weather metrics (humidity, wind, visibility, pressure)</li>
                <li>✓ Responsive design for all devices</li>
                <li>✓ Tailwind CSS styling with gradient accents</li>
                <li>✓ Weather icons from lucide-react</li>
              </ul>
            </div>

            {/* Backend Section */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                Backend (Express + Node.js)
              </h3>
              <p className="text-sm text-slate-600 mb-3">A robust backend with:</p>
              <ul className="text-sm text-slate-600 space-y-1 ml-4">
                <li>✓ Weather API integration</li>
                <li>✓ Google OAuth authentication</li>
                <li>✓ JWT token management</li>
                <li>✓ User data handling</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Setup Instructions */}
        <Card className="border-slate-200 shadow-lg">
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Run the application locally</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-2">1. Install Dependencies</h4>
                <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg text-xs overflow-x-auto">
                  <code>npm install cd client && npm install && cd ..</code>
                </pre>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-2">2. Set Environment Variables</h4>
                <p className="text-sm text-slate-600 mb-2">
                  Create a <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">.env</code> file in the root
                  with:
                </p>
                <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg text-xs overflow-x-auto">
                  <code>
                    OPENWEATHER_API_KEY=your_api_key_here GOOGLE_CLIENT_ID=your_client_id
                    GOOGLE_CLIENT_SECRET=your_client_secret
                  </code>
                </pre>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-2">3. Run the Application</h4>
                <p className="text-sm text-slate-600 mb-2">In separate terminals:</p>
                <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg text-xs overflow-x-auto">
                  <code>
                    {`# Terminal 1: Backend (root)
npm run dev

# Terminal 2: Frontend (/client)
npm run dev`}
                  </code>
                </pre>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-2">4. Access the App</h4>
                <p className="text-sm text-slate-600">
                  Frontend:{" "}
                  <a href="http://localhost:5173" className="text-blue-600 hover:underline">
                    http://localhost:5173
                  </a>
                </p>
                <p className="text-sm text-slate-600">
                  Backend:{" "}
                  <a href="http://localhost:3000" className="text-blue-600 hover:underline">
                    http://localhost:3000
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Highlight */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-slate-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl mb-2">🎨</div>
                <h3 className="font-semibold text-slate-900 mb-1">Modern Design</h3>
                <p className="text-xs text-slate-600">Beautiful gradient UI with smooth animations</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl mb-2">📱</div>
                <h3 className="font-semibold text-slate-900 mb-1">Responsive</h3>
                <p className="text-xs text-slate-600">Works perfectly on all devices and screens</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-semibold text-slate-900 mb-1">Real-time Data</h3>
                <p className="text-xs text-slate-600">Live weather updates from OpenWeather API</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
