import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";

function Vote() {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [choiceId, setChoiceId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/polls/${pollId}`).then((res) => setPoll(res.data));
  }, [pollId]);

  const handleVote = async () => {
    try {
      await api.post(`/polls/${pollId}/vote`, { choice_id: choiceId });
      alert("Vote submitted!");
      navigate("/polls");
    } catch {
      alert("Vote failed");
    }
  };

  if (!poll) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h3>{poll.title}</h3>
      {poll.choices.map((choice) => (
        <div key={choice.id} className="form-check">
          <input className="form-check-input" type="radio" name="choice" value={choice.id} onChange={() => setChoiceId(choice.id)} />
          <label className="form-check-label">{choice.text}</label>
        </div>
      ))}
      <button className="btn btn-primary mt-3" onClick={handleVote}>Submit Vote</button>
    </div>
  );
}

export default Vote;
