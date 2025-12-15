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
    <section className="min-h-screen bg-white py-16 mx-[100px]">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-center mb-2 text-amber-800">
  Explore by Categories
</h1>

        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="w-[100px] h-0.5 bg-amber-600"></span>
          <span className="text-amber-700 text-2xl">🍃</span>
          <span className="w-[100px] h-0.5 bg-amber-600"></span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleClick(cat.name)}
              className="cursor-pointer bg-[#15252E] rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition duration-300"
            >
              <div className="h-48 flex items-center justify-center text-6xl text-yellow-500">
                {cat.icon}
              </div>

              <div className="bg-yellow-500 py-6 text-center">
                <h2 className="font-bold tracking-widest text-white text-xl">
                  {cat.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
