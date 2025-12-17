import React from "react";
import { useNavigate } from "react-router-dom";
import QuizCard from "../components/QuizCard";

const categories = [
  { name: "MAMMAL", icon: "🐻", description: "Test your mammal knowledge" },
  { name: "BIRD", icon: "🦅", description: "How well do you know birds?" },
  { name: "FISH", icon: "🐟", description: "Dive into ocean creatures" },
  { name: "REPTILE", icon: "🐍", description: "Reptile quiz challenge" },
  { name: "AMPHIBIAN", icon: "🦎", description: "Amphibian tricky quiz" },
  { name: "INSECT", icon: "🐜", description: "Insects are great survivors" }
];

const QuizCategories = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700/80 mb-2">
            Quiz Center
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-amber-900 tracking-wide">
            Choose Quiz Category
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-2 max-w-xl mx-auto">
            Pick a category you love and test your wildlife knowledge.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <QuizCard
              key={cat.name}
              title={cat.name}
              icon={cat.icon}
              description={cat.description}
              onClick={() => navigate(`/quiz-animals?category=${cat.name}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuizCategories;
