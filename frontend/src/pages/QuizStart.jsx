import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import api, { saveQuizScore } from "../services/api";

const QuizStart = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  const { updateUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const animal = params.get("animal");
  const category = params.get("category");

  useEffect(() => {
    fetch(`http://localhost:5001/api/quiz?animal=${animal}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.slice(0, 10));
        setLoading(false);
      });
  }, [animal]);

  const choose = (qId, option) => {
    setAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const submitQuiz = async () => {
    let result = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) result++;
    });

    setScore(result);
    setSubmitted(true);

    // Save score for leaderboard / stats
    try {
      await saveQuizScore(result);
    } catch (err) {
      console.error("Failed to save quiz score", err);
    }

    // ✅ PASS CONDITION
    if (result >= 7) {
      try {
        await api.post("/user/quiz-complete");
        updateUser({ quizCompleted: true });

        // ⏳ small delay for UX
        setTimeout(() => {
          navigate("/tour");
        }, 1500);
      } catch (err) {
        console.error("Quiz completion failed");
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <section className="min-h-screen bg-[#FDFCF8] py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10 relative border border-gray-200">

        {!submitted && (
          <button
            onClick={() => navigate(`/quiz-animals?category=${category}`)}
            className="mb-8 inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-green-300 text-green-700 font-semibold rounded-xl shadow-sm hover:bg-green-50 transition"
          >
            ← Back to Animals
          </button>
        )}

        <h1 className="text-4xl font-extrabold text-center text-amber-800 mb-10">
          {animal} Quiz
        </h1>

        {!submitted ? (
          <>
            {questions.map((q, i) => (
              <div
                key={q.id}
                className="mb-10 bg-white rounded-xl border border-gray-200 shadow-sm p-6"
              >
                <p className="text-sm text-gray-500 mb-2">
                  Question {i + 1} of {questions.length}
                </p>

                <p className="font-semibold text-lg mb-4">
                  {q.question}
                </p>

                <div className="space-y-3">
                  {q.options.map((opt) => {
                    const isSelected = answers[q.id] === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => choose(q.id, opt)}
                        className={`w-full text-left px-5 py-3 rounded-lg border font-medium transition
                          ${isSelected
                            ? "bg-green-600 text-white border-green-700"
                            : "bg-white hover:bg-green-50 border-gray-300"}
                        `}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <button
              onClick={submitQuiz}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-bold"
            >
              Submit Quiz
            </button>
          </>
        ) : (
          <div className="text-center py-10">
            <h2
              className={`text-4xl font-extrabold mb-4 ${
                score >= 7 ? "text-green-700" : "text-red-600"
              }`}
            >
              Score: {score} / {questions.length}
            </h2>

            <p className="text-lg mb-6">
              {score >= 7
                ? "🎉 Quiz Passed! Unlocking Virtual Zoo..."
                : "❌ Quiz Failed. Please try again."}
            </p>

            {score < 7 && (
              <button
                onClick={() => navigate(`/quiz-animals?category=${category}`)}
                className="bg-green-700 text-white px-10 py-3 rounded-xl"
              >
                Try Again
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default QuizStart;
