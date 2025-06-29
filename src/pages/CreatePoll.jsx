// src/pages/CreatePoll.jsx
import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

function CreatePoll() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [choices, setChoices] = useState(["", ""]);

  const handleChoiceChange = (index, value) => {
    const updated = [...choices];
    updated[index] = value;
    setChoices(updated);
  };

  const handleAddChoice = () => setChoices([...choices, ""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/polls", { title, choices });
      alert("✅ Poll created!");
      navigate("/dashboard");
    } catch (err) {
      alert("⚠️ Failed to create poll.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create a New Poll</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Poll Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <label className="form-label">Choices</label>
        {choices.map((choice, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              className="form-control"
              value={choice}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddChoice} className="btn btn-outline-secondary mb-3">
          ➕ Add Choice
        </button>
        <br />
        <button type="submit" className="btn btn-success">Create Poll</button>
      </form>
    </div>
  );
}

export default CreatePoll;
