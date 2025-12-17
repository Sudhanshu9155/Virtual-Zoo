import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AnimalCard from "../components/AnimalCard";
import Loader from "../components/Loader";

const Gallery = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedCategory = params.get("category");

  useEffect(() => {
    let url = "http://localhost:5001/api/animals";

    if (selectedCategory) {
      url += `?category=${selectedCategory}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setAnimals(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedCategory]);

  if (loading) return <Loader />;

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8 gap-3 flex-wrap">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-amber-900">
              Animal Gallery
            </h1>
            <p className="text-sm md:text-base text-gray-600 mt-1">
              Browse through our curated collection of virtual zoo residents.
            </p>
          </div>
          {selectedCategory && (
            <span className="inline-flex items-center rounded-full border border-cyan-500/40 bg-cyan-50 px-4 py-1 text-xs md:text-sm font-semibold text-cyan-700">
              Category: {selectedCategory}
            </span>
          )}
        </div>

        {animals.length === 0 ? (
          <p className="text-center text-gray-700 text-lg font-semibold">
            No animals found for this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {animals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
