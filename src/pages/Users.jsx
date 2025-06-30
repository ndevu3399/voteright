import { useEffect, useState } from "react";
import api from "../utils/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
  api.getUsers().then(setUsers).catch(() => setError("Failed to load users."));
}, []);

  if (error) return <div className="alert alert-danger mt-4 container">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Users</h2>
      <table className="table table-striped">
        <thead className="table-dark"><tr><th>ID</th><th>Username</th><th>Role</th></tr></thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td><td>{u.username}</td><td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
