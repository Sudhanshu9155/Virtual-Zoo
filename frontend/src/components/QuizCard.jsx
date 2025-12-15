import React from "react";

const QuizCard = ({ title, icon, description, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white rounded-2xl shadow-xl border border-amber-200 
                 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300"
    >
      <div className="flex justify-center mb-4">
        <span className="text-6xl">{icon}</span>
      </div>

      <h3 className="text-2xl font-bold text-amber-900 text-center mb-3">
        {title}
      </h3>

      <p className="text-center text-gray-700 mb-5">{description}</p>

      <button className="w-full bg-green-700 hover:bg-green-800 
                         text-white py-3 rounded-xl font-semibold">
        Select Animal
      </button>
    </div>
  );
};

export default QuizCard;
