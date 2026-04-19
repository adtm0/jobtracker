import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <span>JobTrack</span>
      <div>
        <NavLink to="/dashboard">Dashboard<NavLink></>
      </div>
    </nav>
  );
}