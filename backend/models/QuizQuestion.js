const mongoose = require("mongoose");

const QuizQuestionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    question: { type: String, required: true },
    options: { type: [String], default: [] },
    correctAnswer: { type: String },

    // Required for filtering quiz
    category: { type: String, required: true }, // e.g., "MAMMAL"
    animal: { type: String, required: true }    // e.g., "African Lion"
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.QuizQuestion ||
  mongoose.model("QuizQuestion", QuizQuestionSchema);
