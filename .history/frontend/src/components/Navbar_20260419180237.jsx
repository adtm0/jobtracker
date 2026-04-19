import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        background: "#fff",
        borderBottom: "1px solid #e5e4df",
        padding: "0 24px",
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <span style={{ fontWeight: 600, fontSize: 16, marginRight: 20 }}>
          JobTrack
        </span>
        <NavLink to="/dashboard" style={links}>Dashboard</NavLink>
        <NavLink to="/jobs">All Jobs</NavLink>
      </div>
      <NavLink to="/jobs/new">Add Jobs</NavLink>
      <div></div>
    </nav>
  );
}
