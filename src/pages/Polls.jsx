import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

function Polls() {
  const [polls, setPolls] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .getPolls()
      .then((data) => setPolls(data))
      .catch((err) => {
        console.error("Error fetching polls:", err);
        setError("Failed to load polls.");
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">🗳️ Active Polls</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {polls.length === 0 ? (
        <div className="alert alert-info">No polls available at the moment.</div>
      ) : (
        <div className="row">
          {polls.map((poll) => (
            <div className="col-md-6 col-lg-4 mb-4" key={poll.id}>
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">{poll.title}</h5>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="badge bg-secondary">Poll ID: {poll.id}</span>
                    <Link
                      to={`/vote/${poll.id}`}
                      className="btn btn-sm btn-primary d-flex align-items-center gap-2"
                    >
                      🗳️ Vote Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Polls;
