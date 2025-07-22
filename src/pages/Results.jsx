import { useEffect, useState } from "react";
import api from "../utils/api";

export default function Results() {
  const [data, setData] = useState([]);
  const [err, setErr]   = useState(null);

  useEffect(() => {
    api.getResults().then(setData).catch(() => setErr("Failed to load results"));
  }, []);

  if (err) return <div className="alert alert-danger mt-4 container">{err}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Poll Results</h2>
      {data.map(r => (
        <div key={r.poll} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{r.poll}</h5>
            <ul className="list-group list-group-flush">
              {Object.entries(r.totals).map(([text, count]) => (
                <li key={text} className="list-group-item d-flex justify-content-between">
                  <span>{text}</span><span className="badge bg-primary">{count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
