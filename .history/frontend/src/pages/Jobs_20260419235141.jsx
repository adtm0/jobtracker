import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'

const STATUSES = ['all', 'applied', 'interview', 'offer', 'rejected']

const BADGE_COLORS = {
  applied:   { bg: '#E6F1FB', color: '#185FA5' },
  interview: { bg: '#FAEEDA', color: '#854F0B' },
  offer:     { bg: '#EAF3DE', color: '#3B6D11' },
  rejected:  { bg: '#FCEBEB', color: '#A32D2D' },
}

export default function Jobs() {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchJobs = useCallback(async () => {
    setLoading(true)
    try {
      const params = {}
      if (filter !== 'all') params.status = filter
      if (search.trim()) params.search = search.trim()
      const { data } = await api.get('/jobs/', { params })
      setJobs(data)
    } catch {
      setError('Could not load jobs.')
    } finally {
      setLoading(false)
    }
  }, [filter, search])

  useEffect(() => {
    const timer = setTimeout(fetchJobs, 300)
    return () => clearTimeout(timer)
  }, [fetchJobs])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this application?')) return
    try {
      await api.delete(`/jobs/${id}/`)
      setJobs(prev => prev.filter(j => j.id !== id))
    } catch {
      alert('Could not delete. Try again.')
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>All Applications</h2>
        <Link to="/jobs/new" style={{ textDecoration: 'none' }}>
          <button className="btn-primary">+ Add Job</button>
        </Link>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center' }}>
        <input
          placeholder="Search company or role..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ maxWidth: 260 }}
        />
        <div style={{ display: 'flex', gap: 6 }}>
          {STATUSES.map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                fontSize: 13,
                border: '1px solid',
                borderColor: filter === s ? '#1a1a18' : '#e5e4df',
                background: filter === s ? '#1a1a18' : 'transparent',
                color: filter === s ? '#fff' : '#6b6b67',
              }}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {error && <p style={{ color: '#A32D2D', fontSize: 13 }}>{error}</p>}

      {loading ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#9d9d99' }}>Loading...</div>
      ) : jobs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9d9d99' }}>
          <p style={{ fontSize: 16, marginBottom: 6 }}>No applications found</p>
          <p>
            {search || filter !== 'all'
              ? 'Try adjusting your filters'
              : 'Add your first job to get started'}
          </p>
          {!search && filter === 'all' && (
            <Link to="/jobs/new" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ marginTop: 16 }}>+ Add your first job</button>
            </Link>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {jobs.map(job => (
            <div
              key={job.id}
              onClick={() => navigate(`/jobs/${job.id}/edit`)}
              style={{
                background: '#fff',
                border: '1px solid #e5e4df',
                borderRadius: 8,
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                cursor: 'pointer',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500 }}>{job.company}</div>
                <div style={{ color: '#6b6b67', fontSize: 13, marginTop: 2 }}>{job.role}</div>
              </div>
              <span style={{
                fontSize: 11,
                fontWeight: 500,
                padding: '3px 10px',
                borderRadius: 20,
                background: BADGE_COLORS[job.status].bg,
                color: BADGE_COLORS[job.status].color,
              }}>
                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
              </span>
              <span style={{ color: '#9d9d99', fontSize: 12 }}>{job.date_applied}</span>
              <button
                onClick={e => { e.stopPropagation(); handleDelete(job.id) }}
                style={{ fontSize: 12, color: '#9d9d99', border: 'none', background: 'transparent', padding: '4px 8px' }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}