import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = {
    votedPolls: 3,
    createdPolls: user?.role === "admin" ? 5 : 0,
  };

  const getInitials = (username) => {
    return username ? username.charAt(0).toUpperCase() : "?";
  };

  const roleBadgeClass = user?.role === "admin" ? "bg-danger" : "bg-secondary";

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div className="bg-dark text-white p-4 d-flex flex-column align-items-center" style={{ width: "260px" }}>
        <h4 className="mb-4 text-center">🗳️ VoteRight</h4>

        {/* Avatar */}
        <div
          className="bg-light text-dark rounded-circle d-flex align-items-center justify-content-center mb-3"
          style={{ width: "80px", height: "80px", fontSize: "2rem", fontWeight: "bold" }}
        >
          {getInitials(user?.username)}
        </div>

        {/* Username and Role Badge */}
        <div className="text-center mb-3">
          <div className="fw-bold fs-5">{user?.username}</div>
          <span className={`badge ${roleBadgeClass}`}>{user?.role}</span>
        </div>

        {/* Stats Section */}
        <div className="w-100 border-top pt-3 mt-3">
          <h6 className="text-uppercase text-muted fs-6">Stats</h6>
          <ul className="list-unstyled text-start ps-2">
            <li>
              <span className="badge bg-primary me-2">✅</span>
              Voted Polls: <strong>{stats.votedPolls}</strong>
            </li>
            {user?.role === "admin" && (
              <li>
                <span className="badge bg-warning text-dark me-2">🛠️</span>
                Created Polls: <strong>{stats.createdPolls}</strong>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-5 bg-light">
        <div className="container">
          <h2 className="mb-4">Welcome, <span className="text-primary">{user?.username}</span> 👋</h2>

          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">Account Details</h5>
              <p className="card-text">Username: <strong>{user?.username}</strong></p>
              <p className="card-text">Role: <strong>{user?.role}</strong></p>
            </div>
          </div>

          {/* Vote Now Button */}
          <div className="mb-4">
            <button className="btn btn-success w-100 fs-5" onClick={() => navigate("/polls")}>
              🗳️ Vote Now
            </button>
          </div>

          {/* Admin Panel */}
          {user?.role === "admin" && (
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Admin Controls 🛠️</h5>
                <div className="d-flex flex-column gap-2">
                  <button className="btn btn-outline-primary" onClick={() => navigate("/create-poll")}>
                    ➕ Create New Poll
                  </button>
                  <button className="btn btn-outline-secondary" onClick={() => navigate("/users")}>
                    👥 View All Users
                  </button>
                  <button className="btn btn-outline-success" onClick={() => navigate("/results")}>
                    📊 View Poll Results
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
