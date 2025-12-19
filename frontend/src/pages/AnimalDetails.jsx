import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader";
import { useLocation } from "react-router-dom";



const AnimalDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const fromCategory = params.get("category");

  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/animals/${id}`);
        if (!response.ok) throw new Error("Animal not found");
        const data = await response.json();
        setAnimal(data);
      } catch (error) {
        console.error("Error fetching animal:", error);
        setAnimal(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimal();
  }, [id]);

  if (loading) return <Loader />;

  const playAnimalSound = async (name) => {
    try {
      const response = await fetch("http://localhost:5001/api/sound", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: `${name} animal sound` })
      });

      const soundBlob = await response.blob();
      const soundURL = URL.createObjectURL(soundBlob);
      const audio = new Audio(soundURL);
      audio.play();

    } catch (err) {
      console.error("Error playing sound:", err);
    }
  };



  if (!animal)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-2xl text-gray-800 mb-6">Animal not found 🐾</p>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors duration-300"
          >
            Back to Gallery
          </Link>
        </div>
      </div>
    );

  return (
    <section className="min-h-screen bg-gradient-to-b from-amber-50 to-white text-gray-900">
      {/* Top Navigation */}
      <nav className="border-b border-amber-100 bg-white/70 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link
            to={fromCategory ? `/gallery?category=${fromCategory}` : "/gallery"}
            className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-900 transition-colors duration-300 font-medium text-sm"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to {fromCategory || "Animals"}
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        {/* Page heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700/80">
              Animal Profile
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-1">
              {animal.name}
            </h1>
          </div>
          <div className="inline-flex items-center rounded-full bg-white/70 border border-emerald-200 px-4 py-1.5 text-xs font-semibold text-emerald-800 uppercase tracking-[0.2em]">
            {animal.category}
          </div>
        </div>

        {/* 1 ROW – 3 CARDS LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* CARD 1: Image */}
          <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden relative">
            <img
              src={animal.image}
              alt={animal.name}
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* CARD 2: Overview & Actions */}
          <div className="bg-white rounded-2xl shadow-md border border-emerald-100 p-6 space-y-5">
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              {animal.desc}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-gray-100">
              <button
                onClick={() => playAnimalSound(animal.name)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-sm font-semibold text-emerald-800 shadow-sm transition"
                title="Play animal sound"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.25 5.25v13.5m5.25-9.75v6m-10.5-11.25v16.5m-5.25-12v7.5"
                  />
                </svg>
                Hear {animal.name}
              </button>

            </div>

            <div className="pt-2">
              <Link
                to="/categories"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl text-sm shadow-md transition-colors duration-300"
              >
                Explore More Animals
              </Link>
            </div>
          </div>

          {/* CARD 3: Quick Facts & Ecology */}
          <div className="bg-white rounded-2xl shadow-md border border-amber-100 p-6 space-y-5">
            <div>
              <h3 className="text-xs font-semibold text-amber-700 uppercase tracking-[0.2em] mb-3">
                Quick Facts
              </h3>
              <div className="space-y-2 text-sm">
                <Fact label="Scientific Name" value={animal.scientificName} />
                <Fact label="Size" value={animal.size} />
                <Fact label="Lifespan" value={animal.lifespan} />
                <Fact label="Region" value={animal.region} />
              </div>
            </div>

            <div className="mt-4 border-t border-gray-100 pt-4 space-y-3 text-sm">
              <InfoCard title="Habitat" content={animal.habitat} />
              <InfoCard title="Diet" content={animal.diet} />
              <InfoCard
                title="Conservation Status"
                content={
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        animal.status === "Endangered"
                          ? "bg-red-500"
                          : animal.status === "Vulnerable"
                          ? "bg-yellow-500"
                          : "bg-emerald-500"
                      }`}
                    ></div>
                    <span className="text-gray-700 font-medium text-xs md:text-sm">
                      {animal.status}
                    </span>
                  </div>
                }
              />
              <InfoCard title="Primary Threats" content={animal.threats} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper components
const Fact = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-200">
    <span className="text-gray-600 font-medium">{label}</span>
    <span className="text-gray-800 font-semibold">{value}</span>
  </div>
);

const InfoCard = ({ title, content }) => (
  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
    <h3 className="text-gray-800 font-semibold text-lg mb-2">{title}</h3>
    <p className="text-gray-700">{content}</p>
  </div>
);

export default AnimalDetails;
