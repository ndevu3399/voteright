import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with:", form);

    try {
      await api.register(form);
      alert("🎉 Registered successfully! Please log in.");
      navigate("/");
    } catch {
      alert("⚠️ Registration failed. Please try a different username.");
    }
  };



  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh", backgroundColor: "#f8f9fa" }}>
      <div
        className="card shadow"
        style={{ width: 380, borderRadius: "1rem" }}
      >
        <div className="card-body p-4">
          <h2 className="mb-4 text-center fw-bold text-primary">Create Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label fw-semibold">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                className="form-control"
                onChange={handleChange}
                placeholder="Choose a username"
                required
                style={{ borderRadius: "0.5rem" }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-semibold">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                onChange={handleChange}
                placeholder="Choose a strong password"
                required
                style={{ borderRadius: "0.5rem" }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 fw-bold"
              style={{ borderRadius: "0.5rem" }}
            >
              Register
            </button>
          </form>
          <div className="text-center mt-3" style={{ fontSize: "0.9rem" }}>
            <span>Already have an account? </span>
            <a href="/" className="text-primary fw-semibold" style={{ textDecoration: "underline" }}>
              Log in here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
