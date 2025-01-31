"use client";
import React, { useState, useRef, useEffect } from "react";

export default function HUD() {
  const toggleRef = useRef(null);
  const [toggleItemBar, setToggleItemBar] = useState(false);
  const [focusedItem, setFocusedItem] = useState(null);

  // Handle toggle when clicked or focused
  const handleToggle = () => {
    setToggleItemBar(true);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toggleRef.current && !toggleRef.current.contains(event.target)) {
        setToggleItemBar(false);
        setFocusedItem(null);
      }

      const handleEscapeKey = (event) => {
        if (event.key === "Escape") {
          setToggleItemBar(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscapeKey);
      };
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={toggleRef}
      onMouseEnter={() => setToggleItemBar(true)}
      onMouseLeave={() => {
        setToggleItemBar(false);
        setFocusedItem(null); // Ensure focus resets when mouse leaves
      }}
      className={`z-50 relative flex h-[120px] border-4 border-slate-200 rounded-full outline-4 outline-slate-400 transition-all duration-500 bg-gradient-to-br from-slate-200 to-slate-400 drop-shadow-lg ${
        toggleItemBar ? "w-max" : "w-[120px]"
      }`}
      onFocus={handleToggle}
    >
      {/* Main Button */}
      <button className="group focus:ring-4 ring-blue-400 ring-offset-8 w-full rounded-full p-5 bg-gradient-to-br from-slate-200 to-slate-400 drop-shadow-lg transition-all outline-4 outline-sky-300">
        <span className="text-7xl drop-shadow-lg">🎒</span>
        <div>
          <span className="text-center bg-white drop-shadow-lg px-4 py-2 rounded-lg absolute opacity-0 group-hover:opacity-100 -top-0 w-full left-0 group-hover:-top-8 transition-all">
            Your Bag
          </span>
        </div>
      </button>

      {/* Items (Only visible when toggled open) */}
      {toggleItemBar && (
        <ul className="items-center flex gap-2 pl-4 pr-8">
          {[
            { emoji: "🎟️", label: "Ticket" },
            { emoji: "🗺️", label: "Map" },
            { emoji: "️🐉", label: "Dragon" },
          ].map((item, index) => (
            <li key={index} className="relative group">
              <button
                className="cursor-pointer hover:translate-y-[-5px] hover:scale-[102%] focus:translate-y-[-5px] transition-all duration-200 ease-in-out bg-slate-100 border-b-6 border-slate-300 h-[100px] w-[100px] rounded-2xl flex items-center justify-center"
                onFocus={() => setFocusedItem(index)}
                onBlur={() => setFocusedItem(null)}
                onClick={(e) => e.currentTarget.blur()} // Prevents focus from persisting after click
              >
                <span className="text-7xl drop-shadow-lg">{item.emoji}</span>
              </button>
              {/* Label below each item */}
              <span
                className={`text-center bg-white drop-shadow-lg px-4 py-2 rounded-lg absolute opacity-0 -top-0 w-full left-0 transition-all group-hover:opacity-100 group-hover:-top-14 ${
                  focusedItem === index ? "opacity-100 -top-14" : "opacity-0"
                }`}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
