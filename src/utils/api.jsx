import axios from "axios";

const BASE_URL = "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const api = {
  login: async (credentials) => {
    const res = await axiosInstance.post("/api/auth/login", credentials);
    return res.data;
  },

  register: async (data) => {
    const res = await axiosInstance.post("/api/auth/register", data);
    return res.data;
  },

  getPolls: async () => {
    const res = await axiosInstance.get("/api/polls");
    return res.data;
  },

  vote: async (pollId, choiceId) => {
    const res = await axiosInstance.post(`/api/polls/${pollId}/vote`, {
      choice_id: choiceId,
    });
    return res.data;
  },

  getDashboardData: async () => {
    const res = await axiosInstance.get("/api/dashboard");
    return res.data;
  },
};

export default api;
