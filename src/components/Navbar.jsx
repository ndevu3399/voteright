import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-light" to="/dashboard">🗳️ VoteRight</Link>
        <div className="d-flex align-items-center gap-3 ms-auto">
          {user && (
            <>
              <Link className="btn btn-light btn-sm" to="/dashboard">Dashboard</Link>
              <Link className="btn btn-warning btn-sm text-dark" to="/polls">🗳️ Vote Now</Link>
              <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
            </>
          )}
          {!user && (
            <>
              <Link className="btn btn-light btn-sm" to="/">Login</Link>
              <Link className="btn btn-outline-light btn-sm" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
