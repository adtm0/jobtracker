import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav style={{
      background: '#fff',
      borderBottom: '1px solid #e5e4df',
      padding: '0 24px',
      height: 56,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ fontWeight: 600, fontSize: 16, marginRight: 20 }}>JobTrack</span>
        <NavLink to="/dashboard" style={linkStyle}>Dashboard</NavLink>
        <NavLink to="/jobs" style={linkStyle}>All Jobs</NavLink>
        
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <NavLink to="/jobs/new" style={{ textDecoration: 'none' }}>
          <button className="btn-primary" style={{ fontSize: 13, padding: '6px 14px' }}>
            + Add Job
          </button>
        </NavLink>
        <span style={{ fontSize: 13, color: '#6b6b67' }}>{user?.username}</span>
        <button onClick={handleLogout} style={{ fontSize: 13, color: '#6b6b67' }}>
          Logout
        </button>
      </div>
    </nav>
  )
}

const linkStyle = ({ isActive }) => ({
  textDecoration: 'none',
  fontSize: 14,
  fontWeight: 500,
  padding: '6px 12px',
  borderRadius: 6,
  color: isActive ? '#1a1a18' : '#6b6b67',
  background: isActive ? '#f0efea' : 'transparent',
})