"use client"

import { useState } from "react"

export default function Auth({ onAuthenticate }) {
  const [mode, setMode] = useState('login') // 'login' or 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)
    try {
      const url = mode === 'login' ? '/auth/login' : '/auth/signUp'
      const body = mode === 'login' ? { email, password } : { name, email, password }

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include',
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.message || json.error || JSON.stringify(json))

      if (mode === 'login') {
        // Expect { status: 'success', token }
        if (json.token) {
          try { localStorage.setItem('token', json.token) } catch (e) {}
          onAuthenticate(json.token)
        }
      } else {
        // signup success, show message and switch to login
        setMessage('Account created. You can now log in.')
        setMode('login')
        setName('')
        setPassword('')
        setEmail('')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 rounded-lg border border-border bg-card w-full max-w-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{mode === 'login' ? 'Login' : 'Sign Up'}</h3>
        <div className="text-sm text-muted">
          <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(null); setMessage(null) }} className="underline">
            {mode === 'login' ? 'Create account' : 'Have an account?'}
          </button>
        </div>
      </div>

      {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
      {message && <div className="mb-3 text-sm text-green-600">{message}</div>}

      <form onSubmit={submit} className="space-y-3">
        {mode === 'signup' && (
          <div>
            <label className="text-sm block mb-1">Name</label>
            <input className="input-field" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        )}

        <div>
          <label className="text-sm block mb-1">Email</label>
          <input className="input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div>
          <label className="text-sm block mb-1">Password</label>
          <input className="input-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="flex items-center justify-between">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create account'}
          </button>
        </div>
      </form>
    </div>
  )
}
