// FILE: TourPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function TourPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p className="p-4 text-red-600">Tour data not found.</p>;

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="m-6 bg-gray-800 text-white px-5 py-2 rounded-lg shadow hover:bg-gray-900 transition"
      >
        ⬅ Back
      </button>
    <div className="p-6 flex flex-col items-center">

    {/* Decorated Heading */}
    <h1
      className="
        text-4xl 
        font-extrabold 
        text-center 
        bg-gradient-to-r from-yellow-600 via-orange-500 to-red-500 
        bg-clip-text 
        text-transparent 
        tracking-wide 
        drop-shadow-md 
        pb-2 
      
      "
    >
      {state.title}
    </h1>
<div className="flex items-center justify-center gap-2 mb-3">
          <span className="w-[100px] h-0.5 bg-amber-600"></span>
          <span className="text-amber-700 text-2xl">🍃</span>
          <span className="w-[100px] h-0.5 bg-amber-600"></span>
        </div>
    {/* 75% Width Street View with Border Decoration */}
    <div
      className="
        w-[75%] 
        relative 
        pb-[50%] 
        overflow-hidden 
        rounded-2xl 
        shadow-2xl 
        mt-6 
        border-4 
        border-yellow-600 
        hover:border-yellow-500 
        transition-all 
        duration-300
      "
    >
      <iframe
        src={state.streetViewUrl}
        allowFullScreen
        loading="lazy"
        className="absolute top-0 left-0 w-full h-full border-0 rounded-xl"
      ></iframe>
    </div>

    {/* Description */}
    <p className="mt-6 w-[75%] text-gray-700 text-lg leading-relaxed text-center">
      {state.description}
    </p>
  </div>
  </div>
  );
}
