import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";

function Vote() {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [choiceId, setChoiceId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/polls/${pollId}`)
      .then((res) => {
        setPoll(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Poll not found");
        navigate("/polls");
      });
  }, [pollId, navigate]);

  const handleVote = async () => {
    if (!choiceId) {
      alert("Please select an option before voting.");
      return;
    }

    try {
      await api.post(`/polls/${pollId}/vote`, { choice_id: choiceId });
      alert("✅ Vote submitted!");
      navigate("/polls");
    } catch {
      alert("❌ Vote failed. Please try again.");
    }
  };

  if (loading) return <div className="text-center mt-5">Loading poll...</div>;

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title mb-4">{poll.title}</h3>
          {poll.choices.map((choice) => (
            <div key={choice.id} className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="choice"
                id={`choice-${choice.id}`}
                value={choice.id}
                onChange={() => setChoiceId(choice.id)}
              />
              <label className="form-check-label" htmlFor={`choice-${choice.id}`}>
                {choice.text}
              </label>
            </div>
          ))}
          <button className="btn btn-success mt-3" onClick={handleVote}>
            Submit Vote
          </button>
        </div>
      </div>
    </div>
  );
}

export default Vote;
