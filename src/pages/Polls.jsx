import { useEffect, useState } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";

function Polls() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    api.get("/polls").then((res) => setPolls(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Active Polls</h2>
      <ul className="list-group">
        {polls.map((poll) => (
          <li className="list-group-item d-flex justify-content-between" key={poll.id}>
            {poll.title}
            <Link to={`/vote/${poll.id}`} className="btn btn-outline-primary btn-sm">Vote</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Polls;
