"use client";
import React, { useState, useRef, useEffect } from "react";

export default function HUD() {
  const toggleRef = useRef(null);
  const [toggleItemBar, setToggleItemBar] = useState(false);

  // Handle toggle when clicked or focused
  const handleToggle = () => {
    // setToggleItemBar(!toggleItemBar);
    setToggleItemBar(true);
  };

  // Close when clicking outside (optional)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toggleRef.current && !toggleRef.current.contains(event.target)) {
        setToggleItemBar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={toggleRef}
      className={`z-50 relative flex h-[120px] border-4 border-slate-200 rounded-full outline-4 outline-slate-400 transition-all duration-500 bg-gradient-to-br from-slate-200 to-slate-400 drop-shadow-lg ${
        toggleItemBar ? "w-max" : "w-[120px]"
      }`}
    >
      {/* Main Button */}
      <button
        onClick={handleToggle}
        onFocus={handleToggle} // Ensures keyboard focus opens the bar
        className="w-full cursor-pointer bg-slate-200 rounded-full p-5 bg-gradient-to-br from-slate-200 to-slate-400 drop-shadow-lg transition-all outline-4 outline-sky-300"
      >
        <span className="text-7xl drop-shadow-lg">🎒</span>
      </button>

      {/* Items (Only visible when toggled open) */}
      {toggleItemBar && (
        <ul className="items-center flex gap-2 pl-4 pr-8">
          {[
            { emoji: "🎟️", label: "Ticket" },
            { emoji: "🗺️", label: "Map" },
            { emoji: "️🐉", label: "Dragon" },
          ].map((item, index) => (
            <li key={index} className="group relative">
              <button className="cursor-pointer hover:translate-y-[-5px] hover:scale-[102%] focus:translate-y-[-5px] transition-all duration-200 ease-in-out bg-slate-100 border-b-6 border-slate-300 h-[100px] w-[100px] rounded-2xl flex items-center justify-center">
                <span className="text-7xl drop-shadow-lg">{item.emoji}</span>
              </button>
              {/* Label below each item */}
              <span className="z-50 absolute text-sm text-gray-700 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-300">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
