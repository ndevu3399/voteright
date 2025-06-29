import { useEffect, useState } from "react";
import api from "../utils/api";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
        setError("Failed to load users.");
        setLoading(false);
      });
  }, []);

  const getInitials = (username) =>
    username ? username[0].toUpperCase() : "?";

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Users</h2>

      {loading && <p>Loading users...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead className="table-dark">
              <tr>
                <th scope="col">Avatar</th>
                <th scope="col">Username</th>
                <th scope="col">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div
                      className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"
                      style={{
                        width: "40px",
                        height: "40px",
                        fontWeight: "bold",
                      }}
                    >
                      {getInitials(user.username)}
                    </div>
                  </td>
                  <td>{user.username}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.role === "admin"
                          ? "bg-danger"
                          : "bg-secondary"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && <p>No users found.</p>}
        </div>
      )}
    </div>
  );
}

export default Users;
