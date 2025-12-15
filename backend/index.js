require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const Animal = require("./models/Animal");
const QuizQuestion = require("./models/QuizQuestion");

const app = express();
const PORT = 5001;
const MONGO_URI = process.env.MONGO_URI;

// ---------------- MIDDLEWARE ----------------
app.use(express.json());
app.use(cookieParser());


// ---------------- MONGODB ----------------
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB Error:", err));

// ---------------- AUTH ROUTES ----------------
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));



app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));

// ---------------- ANIMAL ROUTES ----------------
app.get("/api/animals", async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};

    if (category) {
      query.category = { $regex: `^${category}$`, $options: "i" };
    }

    const animals = await Animal.find(query).lean();
    res.json(animals);
  } catch {
    res.status(500).json({ message: "Failed to fetch animals" });
  }
});

app.get("/api/animals/:id", async (req, res) => {
  try {
    const animal = await Animal.findOne({ id: req.params.id }).lean();
    if (!animal) return res.status(404).json({ message: "Animal not found" });
    res.json(animal);
  } catch {
    res.status(500).json({ message: "Failed to fetch animal" });
  }
});

// ---------------- QUIZ ROUTES ----------------
app.get("/api/quiz", async (req, res) => {
  try {
    const { category, animal } = req.query;
    let filter = {};

    if (category) {
      filter.category = { $regex: `^${category}$`, $options: "i" };
    }
    if (animal) filter.animal = animal;

    const questions = await QuizQuestion.find(filter).lean();
    res.json(questions);
  } catch {
    res.status(500).json({ message: "Quiz fetch error" });
  }
});

// ---------------- HEALTH ----------------
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// ---------------- START SERVER ----------------
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
