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
    <section className="min-h-screen bg-white py-16 px-6">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-center text-amber-900 mb-2 tracking-wide uppercase">
        Choose Quiz Category
      </h1>

      {/* Decorative Divider */}
      <div className="flex items-center justify-center gap-2 mb-14">
        <span className="w-[150px] h-1 bg-amber-700"></span>
        <span className="text-amber-700 text-xl">🧠</span>
        <span className="w-[150px] h-1 bg-amber-700"></span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
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
    </section>
  );
};

export default QuizCategories;
