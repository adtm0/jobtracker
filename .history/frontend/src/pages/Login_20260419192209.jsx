import { useState } from "react";
import { Link } from "react-router-dom"

export default function Login() {
  const [form, setForm] = useState({username: '', password: ''})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      console.log('logging in with', form)
    } catch {
      setError('Invalid username or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f9f9f8'
    }}>
      <div style={{width: '100%', maxWidth: 380}}>
        <div style={{textAlign: 'center', marginBottom: 32}}>
          <h1 style={{fontSize: 22, fontWeight: 600}}>JobTrack</h1>
          <p style={{color: '#6b6b67', marginTop: 6}}>Sign in to your account</p>
        </div>

        <div style={{
          background: '#fff',
          border: '1px solid #e5e4df',
          borderRadius: 12,
          padding: 24
        }}>
          <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: 16}}>
            <div>
              <label>Username</label>
              <input 
                type="text" 
                placeholder="your_username"
                value={form.username}
                onChange={e => setForm(f => ({...f, username: e.target.value }))}
                required
                autoFocus
              />
            </div>
            <div>
              <label>Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm(f => ({...f, password: e.target.value}))}
                required
              />
            </div>

            {error && (
              <p style ={{color: '#A32D2D', fontSize: 13}}>error</p>
            )}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p style={{textAlign: 'center'}}></p>
        </div>
      </div>
      <h1>Login</h1>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}