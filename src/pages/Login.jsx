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
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };



  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Welcome Back</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    name="username"
                    id="username"
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter username"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    name="password"
                    id="password"
                    type="password"
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter password"
                    required
                  />
                </div>
                <button className="btn btn-primary w-100">Login</button>
              </form>
              <div className="text-center mt-3">
                <small>
                  Don't have an account? <a href="/register">Register here</a>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
