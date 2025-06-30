import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";

function Vote() {
  const { pollId } = useParams();
  const navigate   = useNavigate();
  const [poll, setPoll]   = useState(null);
  const [choice, setChoice] = useState(null);

  useEffect(() => {
    api.getPoll(pollId)
      .then(setPoll)
      .catch(() => navigate("/polls"));
  }, [pollId, navigate]);

  const handle = async () => {
    if (!choice) return alert("Select an option first.");
    try {
      await api.vote(pollId, choice);
      alert("✅ Vote submitted!");
      navigate("/polls");
    } catch (e) {
      alert(e.response?.data?.msg || "Vote failed.");
    }
  };

  if (!poll) return <div className="text-center mt-5">Loading…</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4">{poll.title}</h3>
      {poll.choices.map(c => (
        <div key={c.id} className="form-check mb-2">
          <input className="form-check-input" type="radio"
                 id={`c${c.id}`} name="choice" value={c.id}
                 onChange={() => setChoice(c.id)} />
          <label className="form-check-label" htmlFor={`c${c.id}`}>{c.text}</label>
        </div>
      ))}
      <button className="btn btn-success mt-3" onClick={handle}>Submit Vote</button>
    </div>
  );
}
export default Vote;
