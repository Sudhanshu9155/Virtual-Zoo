import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "AMPHIBIAN", icon: "🦎" },
  { name: "BIRD", icon: "🕊️" },
  { name: "FISH", icon: "🐟" },
  { name: "INSECT", icon: "🐜" }, // your DB uses INSECT
  { name: "MAMMAL", icon: "🐻" },
  { name: "REPTILE", icon: "🐍" },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/gallery?category=${category}`);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700/80 mb-2">
            Animal Library
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-amber-900">
            Explore by Categories
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-2 max-w-xl mx-auto">
            Jump into a group of animals you’re most curious about, from mammals
            to reptiles and more.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat.name}
              onClick={() => handleClick(cat.name)}
              className="group cursor-pointer bg-slate-900 rounded-2xl overflow-hidden shadow-xl transform hover:-translate-y-2 transition duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500/70"
            >
              <div className="h-44 flex items-center justify-center text-6xl text-yellow-400 group-hover:scale-110 transition-transform duration-500">
                {cat.icon}
              </div>

              <div className="bg-gradient-to-r from-amber-500 to-yellow-400 py-5 text-center">
                <h2 className="font-bold tracking-[0.25em] text-white text-sm uppercase">
                  {cat.name}
                </h2>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
