// FILE: TourPage.jsx
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import tourData from "../services/apiForTour.json";

export default function TourPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  // 1️⃣ Get tour from location state OR localStorage OR JSON
  let tour = state;

  if (!tour) {
    const stored = localStorage.getItem("activeTour");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (String(parsed.id) === String(id)) {
        tour = parsed;
      }
    }
  }

  if (!tour) {
    tour = tourData.find((t) => String(t.id) === String(id));
  }

  // 2️⃣ If still not found
  if (!tour) {
    return (
      <p className="p-4 text-red-600 text-center font-semibold">
        Tour data not found.
      </p>
    );
  }

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="m-6 bg-gray-800 text-white px-5 py-2 rounded-lg shadow hover:bg-gray-900 transition"
      >
        ⬅ Back
      </button>

      <div className="p-6 flex flex-col items-center">

        {/* Decorated Heading */}
        <h1
          className="
            text-4xl font-extrabold text-center
            bg-gradient-to-r from-yellow-600 via-orange-500 to-red-500
            bg-clip-text text-transparent tracking-wide drop-shadow-md pb-2
          "
        >
          {tour.title}
        </h1>

        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="w-[100px] h-0.5 bg-amber-600"></span>
          <span className="text-amber-700 text-2xl">🍃</span>
          <span className="w-[100px] h-0.5 bg-amber-600"></span>
        </div>

        {/* Street View */}
        <div
          className="
            w-[75%] relative pb-[50%] overflow-hidden
            rounded-2xl shadow-2xl mt-6
            border-4 border-yellow-600
            hover:border-yellow-500 transition-all duration-300
          "
        >
          <iframe
            src={tour.streetViewUrl}
            allowFullScreen
            loading="lazy"
            className="absolute top-0 left-0 w-full h-full border-0 rounded-xl"
          ></iframe>
        </div>

        {/* Description */}
        <p className="mt-6 w-[75%] text-gray-700 text-lg leading-relaxed text-center">
          {tour.description}
        </p>
      </div>
    </div>
  );
}
