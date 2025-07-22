import api from "../utils/api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Vote() {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.getPoll(pollId)
      .then(setPoll)
      .catch(() => alert("Error fetching poll"));
  }, [pollId]);

  const handleVote = () => {
    if (!selected) return alert("Please select a choice");

    api.vote(pollId, selected)
      .then(() => alert("Vote submitted"))
      .catch((err) => {
        console.error("Vote error:", err);
        alert("Could not vote");
      });
  };

  if (!poll) return <p>Loading...</p>;

  return (
    <div>
      <h2>{poll.question}</h2>
      {poll.choices.map((ch) => (
        <div key={ch.id}>
          <label>
            <input type="radio" name="choice" value={ch.id}
              onChange={() => setSelected(ch.id)} />
            {ch.text}
          </label>
        </div>
      ))}
      <button onClick={handleVote}>Vote</button>
    </div>
  );
}

export default Vote;
