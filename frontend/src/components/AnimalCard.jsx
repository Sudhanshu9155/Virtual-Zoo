import React from "react";
import { Link } from "react-router-dom";

const AnimalCard = ({ animal }) => {
  return (
    <div className="group bg-[#0C1C24] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">

      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={animal.image}
          alt={animal.name}
          className="h-52 w-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* Yellow Bottom Section */}
      <div className="bg-[#E4AF05] py-6 text-center">

        {/* Title */}
        <h3 className="text-2xl font-extrabold text-white tracking-wide uppercase">
          {animal.name}
        </h3>

        {/* Scientific Name */}
        <p className="text-white/90 text-sm italic tracking-wide mt-1">
          {animal.scientificName}
        </p>

        {/* Medium-size centered button */}
        <div className="flex justify-center mt-5">
          <Link
            to={`/animal/${animal.id}?category=${animal.category}`}
            className="inline-flex items-center justify-center gap-2 bg-white text-[#0C1C24] font-bold px-5 py-2 rounded-lg 
                       hover:bg-[#0f252f] hover:text-white transition-all duration-300 shadow-md text-sm"
          >
            <span>LEARN MORE</span>
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AnimalCard;
