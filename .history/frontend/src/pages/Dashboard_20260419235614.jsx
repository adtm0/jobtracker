import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import api from '../services/api'

export default function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/stats/')
      .then(({ data }) => setStats(data))
      .catch(() => setError('Could not load stats.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div style={{ textAlign: 'center', padding: 60, color: '#9d9d99' }}>Loading...</div>
  if (error) return <p style={{ color: '#A32D2D', padding: 20 }}>{error}</p>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 600 }}>Welcome back, {user?.username}</h2>
          <p style={{ color: '#6b6b67', marginTop: 4 }}>Your job search at a glance</p>
        </div>
        <Link to="/jobs/new" style={{ textDecoration: 'none' }}>
          <button className="btn-primary">+ Add Job</button>
        </Link>
      </div>

      {/* stat cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 12,
        marginBottom: 24,
      }}>
        {[
          { label: 'Total Applications', value: stats.total },
          { label: 'Interviews', value: stats.interview, sub: `${stats.response_rate}% response rate` },
          { label: 'Offers', value: stats.offer, sub: `${stats.offer_rate}% offer rate` },
          { label: 'Follow-up Due', value: stats.follow_up_due, sub: 'no reply in 10+ days' },
        ].map(({ label, value, sub }) => (
          <div key={label} style={{
            background: '#fff',
            border: '1px solid #e5e4df',
            borderRadius: 10,
            padding: '16px 18px',
          }}>
            <div style={{ fontSize: 12, color: '#6b6b67', fontWeight: 500, marginBottom: 6 }}>
              {label}
            </div>
            <div style={{ fontSize: 28, fontWeight: 600, lineHeight: 1 }}>
              {value}
            </div>
            {sub && (
              <div style={{ fontSize: 11, color: '#9d9d99', marginTop: 5 }}>{sub}</div>
            )}
          </div>
        ))}
      </div>

      {/* bottom section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

        {/* status breakdown */}
        <div style={{ background: '#fff', border: '1px solid #e5e4df', borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontWeight: 500, fontSize: 14, marginBottom: 18 }}>Applications by status</h3>
          {stats.total === 0 ? (
            <p style={{ color: '#9d9d99', fontSize: 13 }}>
              No applications yet.{' '}
              <Link to="/jobs/new" style={{ color: '#185FA5' }}>Add your first one</Link>
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Applied', value: stats.applied, color: '#378ADD' },
                { label: 'Interview', value: stats.interview, color: '#EF9F27' },
                { label: 'Offer', value: stats.offer, color: '#639922' },
                { label: 'Rejected', value: stats.rejected, color: '#E24B4A' },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12, color: '#6b6b67', width: 60 }}>{label}</span>
                  <div style={{ flex: 1, background: '#f9f9f8', borderRadius: 4, height: 10, overflow: 'hidden' }}>
                    <div style={{
                      width: `${stats.total > 0 ? (value / stats.total) * 100 : 0}%`,
                      height: '100%',
                      background: color,
                      borderRadius: 4,
                    }} />
                  </div>
                  <span style={{ fontSize: 12, color: '#9d9d99', width: 20, textAlign: 'right' }}>{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* insights */}
        <div style={{ background: '#fff', border: '1px solid #e5e4df', borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontWeight: 500, fontSize: 14, marginBottom: 16 }}>Smart insights</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Best performing role', value: stats.best_role || '—' },
              { label: 'Response rate', value: `${stats.response_rate}% of applications got a reply` },
              { label: 'Follow-up needed', value: stats.follow_up_due > 0 ? `${stats.follow_up_due} applications with no reply in 10+ days` : 'All caught up!' },
              { label: 'Offer rate', value: `${stats.offer_rate}% of applications resulted in an offer` },
            ].map(({ label, value }) => (
              <div key={label} style={{ background: '#f9f9f8', borderRadius: 8, padding: '10px 14px' }}>
                <div style={{ fontSize: 11, color: '#9d9d99', marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: 13 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}