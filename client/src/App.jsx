"use client"

import { useState, useEffect } from "react"
import Weather from "./components/Weather"
import Auth from "./components/Auth"
import { LogOut, LogIn } from "lucide-react"

export default function App() {
  const [token, setToken] = useState(null)
  const [showAuth, setShowAuth] = useState(false)

  // initialize token from localStorage (so UI reflects signed-in state)
  useEffect(() => {
    try {
      const t = localStorage.getItem('token')
      if (t) setToken(t)
    } catch (e) {
      // ignore
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Weather
            </h1>
            {/* Tailwind test badge — remove when verified */}
            <div className="ml-3">
              <span className="inline-block px-3 py-1 bg-emerald-500 text-white rounded-md text-xs font-semibold">
                Tailwind OK
              </span>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {token ? (
              <>
                <span className="text-sm text-slate-600 hidden sm:inline">Signed in</span>
                <button
                  onClick={() => {
                    try { localStorage.removeItem("token") } catch (e) {}
                    setToken(null)
                  }}
                  className="btn-secondary flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/auth/google" className="btn-primary flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Sign in (Google)
                </a>
                <button onClick={() => setShowAuth(s => !s)} className="btn-secondary flex items-center gap-2">
                  Manual Sign in
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-foreground mb-2">Weather Information</h2>
          <p className="text-muted">Search for any city to get current weather conditions</p>
        </div>

        <Weather />

        {showAuth && !token && (
          <div className="mt-6">
            <Auth onAuthenticate={(t) => { setToken(t); setShowAuth(false); }} />
          </div>
        )}

        {/* Authenticated state is shown in the header; token is intentionally not displayed here */}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/50 mt-12">
        <div className="max-w-4xl mx-auto px-6 py-6 text-center text-sm text-muted">
          <p>Weather App • Powered by OpenWeather API</p>
        </div>
      </footer>
    </div>
  )
}
