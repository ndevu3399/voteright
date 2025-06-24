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
      await api.post("/register", form);
      alert("Registered! You can now log in.");
      navigate("/");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" onChange={handleChange} className="form-control my-2" placeholder="Username" />
        <input name="password" type="password" onChange={handleChange} className="form-control my-2" placeholder="Password" />
        <button className="btn btn-success">Register</button>
      </form>
    </div>
  );
}

export default Register;
