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
      const response = await fetch("http://localhost:5002/api/sound", {
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
    <section className="min-h-screen bg-white text-gray-900">
      {/* Top Navigation */}
      <nav className="border-b border-gray-200 py-4">
        <div className="container mx-auto px-6">
          <Link
            to={fromCategory ? `/gallery?category=${fromCategory}` : "/gallery"}
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 transition-colors duration-300 font-medium"
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
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image and Quick Facts */}
          <div className="space-y-6">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={animal.image}
                alt={animal.name}
                className="w-full h-[500px] object-cover"
              />
            </div>

            {/* Quick Facts */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-gray-800 font-bold text-xl mb-4">QUICK FACTS</h3>
              <Fact label="Scientific Name" value={animal.scientificName} />
              <Fact label="Size" value={animal.size} />
              <Fact label="Lifespan" value={animal.lifespan} />
              <Fact label="Region" value={animal.region} />
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 border border-green-200 rounded-full">
              <span className="text-green-800 font-bold text-sm tracking-wider uppercase">
                {animal.category}
              </span>
            </div>

            {/* <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              {animal.name}
            </h1> */}
            <h1 className="text-5xl font-bold text-gray-900 leading-tight flex items-center gap-4">
              {animal.name}

              {/* Sound Icon Button */}
              <button
                onClick={() => playAnimalSound(animal.name)}
                className="p-3 rounded-full bg-green-100 hover:bg-green-200 transition shadow-md"
                title="Play animal sound"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-green-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.25 5.25v13.5m5.25-9.75v6m-10.5-11.25v16.5m-5.25-12v7.5"
                  />
                </svg>
              </button>
            </h1>


            <p className="text-gray-700 text-lg leading-relaxed">{animal.desc}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoCard title="Habitat" content={animal.habitat} />
              <InfoCard title="Diet" content={animal.diet} />
              <InfoCard
                title="Conservation Status"
                content={
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${animal.status === "Endangered"
                        ? "bg-red-500"
                        : animal.status === "Vulnerable"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                        }`}
                    ></div>
                    <span className="text-gray-700 font-medium">{animal.status}</span>
                  </div>
                }
              />
              <InfoCard title="Primary Threats" content={animal.threats} />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
              <Link
                to="/categories"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-300 shadow-md"
              >
                Explore More Animals
              </Link>
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
