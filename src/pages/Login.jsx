import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("http://localhost:5000/login", form);
      login(res.data);
      navigate("/polls");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" onChange={handleChange} className="form-control my-2" placeholder="Username" />
        <input name="password" type="password" onChange={handleChange} className="form-control my-2" placeholder="Password" />
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;
