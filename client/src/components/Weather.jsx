"use client"

import { useState } from "react"
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye } from "lucide-react"

export default function Weather() {
  const [city, setCity] = useState("London")
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchWeather = async () => {
    setLoading(true)
    setError(null)
    try {
      // Attach Authorization header if a token is present in localStorage
      let headers = {}
      try {
        const token = localStorage.getItem('token')
        if (token) headers.Authorization = `Bearer ${token}`
      } catch (e) {
        // ignore localStorage access errors (e.g., SSR environments)
      }

      const res = await fetch(`/api/weather/${encodeURIComponent(city)}`, {
        headers,
        // ensure cookies (httpOnly jwt) are sent when using cookie-based auth
        credentials: 'include',
      })
      if (!res.ok) throw new Error(await res.text())
      const json = await res.json()
      setData(json)
    } catch (e) {
      setError(e.message)
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  const getWeatherIcon = (description) => {
    if (!description) return <Cloud className="w-12 h-12" />
    const desc = description.toLowerCase()
    if (desc.includes("rain")) return <CloudRain className="w-12 h-12 text-cyan-500" />
    if (desc.includes("clear") || desc.includes("sunny")) return <Sun className="w-12 h-12 text-yellow-400" />
    if (desc.includes("cloud")) return <Cloud className="w-12 h-12 text-slate-400" />
    return <Cloud className="w-12 h-12 text-slate-400" />
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex gap-3">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
          placeholder="Search for a city..."
          className="input-field flex-1"
        />
        <button
          onClick={fetchWeather}
          disabled={loading}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Weather Data Display */}
      {data && (
        <div className="space-y-4">
          {/* Main Weather Card */}
          <div className="card-base p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground">
                  {data.name}
                  {data.sys?.country && <span className="text-lg text-muted ml-2">({data.sys.country})</span>}
                </h2>
                <p className="text-muted mt-1 capitalize">{data.weather?.[0]?.description}</p>
              </div>
              <div className="text-cyan-500">{getWeatherIcon(data.weather?.[0]?.description)}</div>
            </div>

            {/* Temperature Display */}
            <div className="mb-8">
              <div className="flex items-baseline">
                <span className="text-6xl font-bold text-primary">{Math.round(data.main?.temp)}°</span>
                <span className="text-2xl text-muted ml-2">C</span>
              </div>
              <p className="text-muted mt-2">
                Feels like <span className="font-semibold">{Math.round(data.main?.feels_like)}°C</span>
              </p>
            </div>

            {/* Weather Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-muted">Humidity</span>
                </div>
                <p className="text-xl font-semibold text-foreground">{data.main?.humidity}%</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-muted">Wind Speed</span>
                </div>
                <p className="text-xl font-semibold text-foreground">{Math.round(data.wind?.speed)} m/s</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-100">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-orange-500" />
                  <span className="text-sm text-muted">Visibility</span>
                </div>
                <p className="text-xl font-semibold text-foreground">{(data.visibility / 1000).toFixed(1)} km</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-muted">Pressure</span>
                </div>
                <p className="text-xl font-semibold text-foreground">{data.main?.pressure} hPa</p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="card-base p-6">
              <p className="text-sm text-muted mb-1">Max Temperature</p>
              <p className="text-2xl font-bold text-primary">{Math.round(data.main?.temp_max)}°C</p>
            </div>
            <div className="card-base p-6">
              <p className="text-sm text-muted mb-1">Min Temperature</p>
              <p className="text-2xl font-bold text-secondary">{Math.round(data.main?.temp_min)}°C</p>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!data && !loading && !error && (
        <div className="card-base p-12 text-center">
          <Cloud className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-muted">Search for a city to see weather information</p>
        </div>
      )}
    </div>
  )
}
