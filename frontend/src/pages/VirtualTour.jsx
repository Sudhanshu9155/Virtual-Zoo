// FILE: StreetViewCard.jsx
import React, { useEffect, useState } from "react";
import tourData from "../services/apiForTour.json";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

export default function VirtualTour() {
  const [tours, setTours] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    setTours(tourData);
  }, []);

  // ---------------- START TOUR HANDLER ----------------
  const handleStartTour = (tour) => {
    // 🔐 Not logged in
    if (!user) {
      toast.error("Please login to start the virtual tour");
      navigate("/login", { state: { from: "/tour" } });
      return;
    }

    // 🧠 Quiz not passed
    const quizPassed =
      user.quizPassed === true || localStorage.getItem("quizPassed") === "true";

    if (!quizPassed) {
      toast.error("Please complete the quiz to unlock the virtual tour");
      navigate("/quiz-categories");
      return;
    }

    // ✅ All good → start tour
    navigate(`/tour/${tour.id}`, { state: tour });
  };

  const filteredTours = tours.filter(
    (tour) =>
      tour.title.toLowerCase().includes(search.toLowerCase()) ||
      tour.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8 relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 4a7 7 0 100 14 7 7 0 000-14zm0 0v.01M21 21l-4.35-4.35"
            />
          </svg>
        </div>

        <input
          type="text"
          placeholder="Search zoo, tours, wildlife..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full px-4 py-3 pl-10
            border border-gray-300 rounded-xl shadow-md
            bg-white text-gray-700
            transition-all duration-300 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:shadow-xl
            focus:scale-[1.03]
          "
        />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredTours.map((tour) => (
          <div
            key={tour.id}
            className="
              bg-yellow-500/90 rounded-xl p-5 shadow-xl
              border border-yellow-600 transition-all duration-300
              hover:scale-[1.03] hover:shadow-2xl
            "
          >
            <img
              src={tour.image}
              alt={tour.title}
              className="
                w-full h-48 object-cover rounded-xl mb-4 shadow-lg
                transition-all duration-300 hover:scale-[1.02]
              "
            />

            <h2 className="text-2xl font-extrabold text-white tracking-wide mb-1">
              {tour.title}
            </h2>

            <p className="text-white/90 text-sm italic mb-4">
              {tour.description}
            </p>

            {/* 🔐 Auth + Quiz Protected */}
            <button
              onClick={() => handleStartTour(tour)}
              className="
                w-full inline-flex items-center justify-center gap-2
                bg-white text-[#0C1C24] font-bold px-5 py-2 rounded-lg 
                hover:bg-[#0f252f] hover:text-white
                transition-all duration-300 shadow-md text-sm
              "
            >
              {user ? "Start Tour" : "Login to Start Tour"}
            </button>
          </div>
        ))}
      </div>

      {/* No result */}
      {filteredTours.length === 0 && (
        <p className="text-center text-gray-600 mt-6">
          No matching tours found.
        </p>
      )}
    </div>
  );
}
