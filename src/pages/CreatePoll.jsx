import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

function CreatePoll() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [choices, setChoices] = useState(["", ""]);
  const [error, setError] = useState("");

  const handleChoiceChange = (index, value) => {
    const updated = [...choices];
    updated[index] = value;
    setChoices(updated);
  };

  const handleAddChoice = () => {
    if (choices.length < 4) {
      setChoices([...choices, ""]);
    }
  };

  const handleRemoveChoice = (index) => {
    if (choices.length > 2) {
      const updated = choices.filter((_, i) => i !== index);
      setChoices(updated);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validChoices = choices.filter((c) => c.trim() !== "");
    if (!title.trim() || validChoices.length < 2) {
      setError("Poll title and at least 2 choices are required.");
      return;
    }

    try {
      await api.createPoll({ title, choices: validChoices });
      alert("🎉 Poll created!");
      navigate("/polls");
    } catch (err) {
      console.error("Error creating poll:", err);
      setError("Failed to create poll.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title mb-4 text-center">🗳️ Create New Poll</h3>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Poll Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="e.g. What's your favorite language?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <label className="form-label">Choices</label>
            {choices.map((choice, index) => (
              <div key={index} className="input-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  value={choice}
                  onChange={(e) => handleChoiceChange(index, e.target.value)}
                  required
                />
                {choices.length > 2 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleRemoveChoice(index)}
                  >
                    ❌
                  </button>
                )}
              </div>
            ))}

            {choices.length < 4 && (
              <button
                type="button"
                className="btn btn-outline-secondary mb-3"
                onClick={handleAddChoice}
              >
                ➕ Add Choice
              </button>
            )}

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                ✅ Create Poll
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePoll;
