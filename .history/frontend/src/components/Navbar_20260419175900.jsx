import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{
      background
    }}>
      <span>JobTrack</span>
      <div>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/jobs">All Jobs</NavLink>
        <NavLink to="/jobs/new">Add Jobs</NavLink>
      </div>
    </nav>
  );
}