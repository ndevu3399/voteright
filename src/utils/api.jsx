import axios from "axios";

const BASE_URL = "http://localhost:5000";

// Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT token if available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API methods
const api = {
  login: async (credentials) => {
    const res = await axiosInstance.post("/login", credentials);
    return res.data;
  },

  register: async (data) => {
    const res = await axiosInstance.post("/register", data);
    return res.data;
  },

  getPolls: async () => {
    const res = await axiosInstance.get("/polls");
    return res.data;
  },

  vote: async (pollId, optionId) => {
    const res = await axiosInstance.post(`/vote/${pollId}`, { option_id: optionId });
    return res.data;
  },

  getDashboardData: async () => {
    const res = await axiosInstance.get("/dashboard");
    return res.data;
  },
};

export default api;
