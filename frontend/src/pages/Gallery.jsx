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
    <section className="py-16 bg-amber-50 min-h-screen">
      <div className="container mx-auto px-5">

        {selectedCategory && (
          <h2 className="text-3xl  font-bold text-center text-[#3FC5D5] mb-6">
            {selectedCategory}
          </h2>
        )}

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
