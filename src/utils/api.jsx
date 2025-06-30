import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://voteright.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((cfg) => {
  const tok = localStorage.getItem("token");
  if (tok) cfg.headers.Authorization = `Bearer ${tok}`;
  return cfg;
});

/* ─── Auth ───────────────────────────────────────── */
const login    = (body) => axiosInstance.post("/auth/login",    body).then(r => r.data);
const register = (body) => axiosInstance.post("/auth/register", body);

/* ─── Polls ──────────────────────────────────────── */
const getPolls   = ()                => axiosInstance.get("/polls").then(r => r.data);
const getPoll    = (id)              => axiosInstance.get(`/polls/${id}`).then(r => r.data);
const vote       = (id, choice_id)   => axiosInstance.post(`/polls/${id}/vote`, { choice_id });
const createPoll = (body)            => axiosInstance.post("/polls", body);

/* ─── Admin ──────────────────────────────────────── */
const getUsers   = () => axiosInstance.get("/users"  ).then(r => r.data);
const getResults = () => axiosInstance.get("/results").then(r => r.data);

export default {
  login,
  register,
  getPolls,
  getPoll,
  vote,
  createPoll,
  getUsers,
  getResults,
};
