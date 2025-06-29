import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) =>
  setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.login(form);
      login(res);
      navigate("/polls");
    } catch {
      alert("Login failed. Please check your credentials.");
    }
  };



  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh", backgroundColor: "#f8f9fa" }}>
      <div
        className="card shadow"
        style={{ width: 380, borderRadius: "1rem" }}
      >
        <div className="card-body p-4">
          <h2 className="mb-4 text-center fw-bold text-primary">Welcome Back</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label fw-semibold">Username</label>
              <input
                name="username"
                id="username"
                onChange={handleChange}
                className="form-control"
                placeholder="Enter username"
                required
                style={{ borderRadius: "0.5rem" }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-semibold">Password</label>
              <input
                name="password"
                id="password"
                type="password"
                onChange={handleChange}
                className="form-control"
                placeholder="Enter password"
                required
                style={{ borderRadius: "0.5rem" }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 fw-bold"
              style={{ borderRadius: "0.5rem" }}
            >
              Log In
            </button>
          </form>
          <div className="text-center mt-3" style={{ fontSize: "0.9rem" }}>
            <span>Don't have an account? </span>
            <a href="/register" className="text-primary fw-semibold" style={{ textDecoration: "underline" }}>
              Register here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
