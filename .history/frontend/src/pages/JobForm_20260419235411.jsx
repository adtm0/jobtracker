import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'

const EMPTY = {
  company: '',
  role: '',
  status: 'applied',
  date_applied: new Date().toISOString().slice(0, 10),
  follow_up_date: '',
  notes: '',
}

export default function JobForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [form, setForm] = useState(EMPTY)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isEdit) return
    api.get(`/jobs/${id}/`)
      .then(({ data }) => setForm({
        company: data.company,
        role: data.role,
        status: data.status,
        date_applied: data.date_applied,
        follow_up_date: data.follow_up_date || '',
        notes: data.notes,
      }))
      .catch(() => setError('Could not load job.'))
      .finally(() => setFetching(false))
  }, [id, isEdit])

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const payload = { ...form, follow_up_date: form.follow_up_date || null }

    try {
      if (isEdit) {
        await api.put(`/jobs/${id}/`, payload)
      } else {
        await api.post('/jobs/', payload)
      }
      navigate('/jobs')
    } catch (err) {
      const data = err.response?.data
      setError(data ? Object.values(data).flat().join(' ') : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete this application?')) return
    try {
      await api.delete(`/jobs/${id}/`)
      navigate('/jobs')
    } catch {
      setError('Could not delete.')
    }
  }

  if (fetching) return <div style={{ textAlign: 'center', padding: 60, color: '#9d9d99' }}>Loading...</div>

  return (
    <div style={{ maxWidth: 560 }}>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>
        {isEdit ? 'Edit application' : 'Add new application'}
      </h2>

      <div style={{
        background: '#fff',
        border: '1px solid #e5e4df',
        borderRadius: 12,
        padding: 24,
      }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label>Company *</label>
            <input
              placeholder="e.g. Stripe"
              value={form.company}
              onChange={set('company')}
              required
            />
          </div>

          <div>
            <label>Role *</label>
            <input
              placeholder="e.g. Frontend Engineer"
              value={form.role}
              onChange={set('role')}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label>Status</label>
              <select value={form.status} onChange={set('status')}>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label>Date applied *</label>
              <input
                type="date"
                value={form.date_applied}
                onChange={set('date_applied')}
                required
              />
            </div>
          </div>

          <div>
            <label>
              Follow-up date{' '}
              <span style={{ color: '#9d9d99', fontWeight: 400 }}>(optional)</span>
            </label>
            <input
              type="date"
              value={form.follow_up_date}
              onChange={set('follow_up_date')}
            />
          </div>

          <div>
            <label>Notes</label>
            <textarea
              rows={4}
              placeholder="Recruiter name, referral source, interview notes..."
              value={form.notes}
              onChange={set('notes')}
              style={{ resize: 'vertical' }}
            />
          </div>

          {error && <p style={{ color: '#A32D2D', fontSize: 13 }}>{error}</p>}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {isEdit ? (
              <button
                type="button"
                onClick={handleDelete}
                style={{ color: '#A32D2D', borderColor: '#FCEBEB', background: '#FCEBEB' }}
              >
                Delete
              </button>
            ) : <span />}
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" onClick={() => navigate('/jobs')}>Cancel</button>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Saving...' : isEdit ? 'Save changes' : 'Add application'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}