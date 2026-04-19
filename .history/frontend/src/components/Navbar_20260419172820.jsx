import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <span>JobTrack</span>
      <div>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/jobs">All Jobs</NavLink>
        <NavLink to="/jobs/new">All Jobs</NavLink>
      </div>
    </nav>
  );
}