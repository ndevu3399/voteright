import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", form);
      alert("Registered! Redirecting to login...");
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error); 
      alert("Registration failed. Please try again.");
    }
  };


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Create Account</h2>
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
                <button className="btn btn-success w-100">Register</button>
              </form>
              <div className="text-center mt-3">
                <small>
                  Already have an account? <a href="/">Login here</a>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
