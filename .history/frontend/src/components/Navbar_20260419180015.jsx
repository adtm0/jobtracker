import { NavLink } from "react-router-dom";

export default function Navbar() {
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
      zIndex: 100
    }}>
      <div></div>
      <span>JobTrack</span>
      <div>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/jobs">All Jobs</NavLink>
        <NavLink to="/jobs/new">Add Jobs</NavLink>
      </div>
    </nav>
  );
}