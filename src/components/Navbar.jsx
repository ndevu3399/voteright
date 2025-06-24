import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">VoteRight</Link>
      <div className="navbar-nav">
        {user ? (
          <>
            <Link className="nav-link" to="/polls">Polls</Link>
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
            <button className="btn btn-sm btn-outline-light ms-2" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link className="nav-link" to="/">Login</Link>
            <Link className="nav-link" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
