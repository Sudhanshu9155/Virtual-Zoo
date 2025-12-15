import axios from "axios";

// Change baseURL if backend runs on another port
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Fetch all animals
export const getAllAnimals = async () => {
  const res = await api.get("/animals");
  return res.data;
};

// Fetch single animal by id
export const getAnimalById = async (id) => {
  const res = await api.get(`/animals/${id}`);
  return res.data;
};

// Fetch quiz questions
export const getQuizQuestions = async () => {
  const res = await api.get("/quiz");
  return res.data;
};

export default api;
