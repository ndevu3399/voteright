import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <p>Welcome, {user?.username}!</p>
      <p>Role: {user?.role}</p>
    </div>
  );
}

export default Dashboard;
