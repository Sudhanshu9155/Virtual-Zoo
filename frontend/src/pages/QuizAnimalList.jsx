import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";

const QuizAnimalList = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  // ---------------- FETCH ANIMALS ----------------
  useEffect(() => {
    if (!category) return;

    setLoading(true);

    fetch(`http://localhost:5001/api/animals?category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        setAnimals(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Animal fetch error:", err);
        setLoading(false);
      });
  }, [category]);

  // ---------------- AUTH CHECK ----------------
  const handleStartQuiz = (animal) => {
    if (!user) {
      toast.error("Please login to start the quiz");
      navigate("/login", {
        state: { from: `/quiz-animals?category=${category}` },
      });
      return;
    }

    navigate(`/quiz-start?animal=${animal.name}&category=${category}`);
  };

  if (loading) return <Loader />;

  // ---------------- UI ----------------
  return (
    <section className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-16 px-6">

      {/* Back Button */}
      <button
        onClick={() => navigate("/quiz-categories")}
        className="
          mb-8 inline-flex items-center gap-2 px-5 py-2.5
          bg-green-700/10 backdrop-blur-md border border-green-600/40
          text-green-700 font-semibold rounded-xl shadow
          hover:bg-green-700/20 hover:border-green-700 hover:shadow-lg
          transition-all duration-300
        "
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Categories
      </button>

      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-center text-amber-900 mb-14 tracking-wide">
        Choose an Animal
        <span className="text-green-700"> ({category})</span>
      </h1>

      {/* Grid */}
      {animals.length === 0 ? (
        <p className="text-center text-gray-700 font-semibold">
          No animals found.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10">
          {animals.map((animal) => (
            <div
              key={animal.id}
              className="
                group relative overflow-hidden rounded-2xl
                bg-white/70 backdrop-blur-xl border border-amber-200
                shadow-lg hover:shadow-2xl transition-all duration-500
                hover:-translate-y-2 hover:border-green-600 hover:bg-white
              "
            >
              {/* Image */}
              <div className="h-40 w-full overflow-hidden rounded-t-2xl relative">
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>

              {/* Details */}
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-amber-900 mb-2 group-hover:text-green-700 transition-colors">
                  {animal.name}
                </h2>

                <button
                  onClick={() => handleStartQuiz(animal)}
                  className="
                    w-full bg-green-700/90 text-white py-2 mt-3 rounded-lg font-medium
                    shadow-md hover:bg-green-800 transition-all duration-300
                    group-hover:shadow-xl
                  "
                >
                  {user ? "Start Quiz" : "Login to Start Quiz"}
                </button>
              </div>

              {/* Glow */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none
                           opacity-0 group-hover:opacity-100 transition duration-500
                           ring-2 ring-green-600/30"
              ></div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default QuizAnimalList;
