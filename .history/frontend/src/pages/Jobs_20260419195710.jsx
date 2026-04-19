import { useState } from "react";
import { Link } from "react-router-dom";

const STATUSES = ['all', 'applied', 'interview', 'offer', 'rejected']

const MOCK_JOBS = [
  {id: }
]
export default function Jobs() {
  const [form, setForm] = useState({username: '', email: '', password: ''})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async  (e) => {
    e.preventDefault();
    setError('');
    setLoading(true)

    try {
      console.log('registering with', form)
    } catch {
      setError('Something went wrong. Try again')
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
          <p style={{color: '#6b6b67', marginTop: 6}}>Create your account</p>
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
                placeholder="alex_kim"
                value={form.username}
                onChange={e => setForm(f => ({...f, username: e.target.value}))}
                required
                autoFocus
              />
            </div>
            <div>
              <label>Email<span style={{color: '#9d9d99', fontWeight: 400}}>(optional)</span></label>
              <input 
                type="email"
                placeholder="alex@email.com"
                value={form.email}
                onChange={e => setForm(f => ({...f, email:e.target.value}))}
              />
            </div>
            <div>
              <label>Password</label>
              <input 
                type="password"
                placeholder="min. 8 characters"
                value={form.password}
                onChange={e => setForm(f => ({...f, password: e.target.value}))}
                required
              />
            </div>

            {error && (
              <p style={{color: '#A32D2D', fontSize: 13}}>{error}</p>
            )}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p style={{textAlign: 'center', marginTop: 20, fontSize: 13, color: '#6b6b67' }}>
            Already have one? {''}
            <Link to="/login" style={{color: '#185FA5'}}>Sign in</Link>
          </p>
        </div>

      </div>
    </div>
  );
}