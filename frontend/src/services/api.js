import axios from "axios";

// Backend runs on 5001
const api = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true
});

// Attach JWT token automatically
api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});



// ---------------- AUTH ----------------
export const loginUser = (data) =>
  api.post("/auth/login", data);

export const registerUser = (data) =>
  api.post("/auth/register", data);

export const forgotPassword = (email) =>
  api.post("/auth/forgot-password", { email });

export const resetPassword = (data) =>
  api.post("/auth/reset-password", data);

// ---------------- ANIMALS ----------------
export const getAllAnimals = async () => {
  const res = await api.get("/animals");
  return res.data;
};

export const getAnimalById = async (id) => {
  const res = await api.get(`/animals/${id}`);
  return res.data;
};

// ---------------- QUIZ ----------------
export const getQuizQuestions = async () => {
  const res = await api.get("/quiz");
  return res.data;
};

// ---------------- USER / SCORES ----------------
export const saveQuizScore = (score) =>
  api.post("/user/quiz-score", { score });

export const getLeaderboard = async () => {
  const res = await api.get("/user/leaderboard");
  return res.data;
};

export default api;
