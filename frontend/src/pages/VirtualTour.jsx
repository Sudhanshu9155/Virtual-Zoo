// FILE: VirtualTour.jsx
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

  // ✅ ONLY LOGIN CHECK — NO QUIZ
  const handleStartTour = (tour) => {
    if (!user) {
      toast.error("Please login to start the virtual tour");
      navigate("/login", { state: { from: "/tour" } });
      return;
    }

    // Save tour for TourPage
    localStorage.setItem("activeTour", JSON.stringify(tour));

    // Go directly to TourPage
    navigate(`/tour/${tour.id}`);
  };

  const filteredTours = tours.filter(
    (tour) =>
      tour.title.toLowerCase().includes(search.toLowerCase()) ||
      tour.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-900">
              Virtual Zoo Tours
            </h1>
            <p className="text-sm md:text-base text-gray-600 mt-1 max-w-xl">
              Walk through immersive wildlife tours from anywhere in the world.
            </p>
          </div>
          <div className="w-full md:w-80">
            <input
              type="text"
              placeholder="Search zoo, tours, wildlife..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-emerald-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-2xl shadow-md border border-emerald-100 overflow-hidden flex flex-col"
            >
              <div className="relative">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-3 left-3 inline-flex items-center rounded-full bg-emerald-500/90 text-white text-xs px-3 py-1">
                  Virtual Tour
                </span>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h2 className="text-xl font-bold text-emerald-900 mb-1">
                  {tour.title}
                </h2>

                <p className="text-gray-600 text-sm mb-4 flex-1">
                  {tour.description}
                </p>

                <button
                  onClick={() => handleStartTour(tour)}
                  className="w-full bg-emerald-600 text-white font-semibold py-2.5 rounded-lg hover:bg-emerald-700 transition mt-auto"
                >
                  {user ? "Start Tour" : "Login to Start Tour"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTours.length === 0 && (
          <p className="text-center text-gray-600 mt-6">
            No matching tours found.
          </p>
        )}
      </div>
    </section>
  );
}
