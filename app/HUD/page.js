"use client";
import React, { useState, useRef, useEffect } from "react";

export default function HUD() {
  const toggleRef = useRef(null);
  const [toggleItemBar, setToggleItemBar] = useState(true);
  const [focusedItem, setFocusedItem] = useState(null);
  const [hasTicket, setHasTicket] = useState(false); // state to 'mimic' a user not having a ticket

  // Handle toggle when clicked, focused, or touched
  const handleToggle = () => {
    setToggleItemBar(true);
  };

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toggleRef.current && !toggleRef.current.contains(event.target)) {
        setToggleItemBar(false);
        setFocusedItem(null);
      }
    };

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
  }, []);

  return (
    <div
      ref={toggleRef}
      onMouseEnter={() => setToggleItemBar(true)}
      onMouseLeave={() => {
        setToggleItemBar(false);
        setFocusedItem(null); // Ensure focus resets when mouse leaves
      }}
      onTouchStart={() => setToggleItemBar(true)} // Enables touch on mobile
      className={`flex-col z-50 relative sm:w-full sm:flex-row flex border-4 border-slate-200 rounded-full outline-4 outline-slate-400 transition-all duration-500 bg-gradient-to-br from-slate-200 to-slate-400 drop-shadow-lg ${
        toggleItemBar ? "w-[90px] sm:w-[120px] sm:h-[130px]" : "w-[80px] md:w-[120px]"
      }`}
    >
      {/* Main Button */}
      <button
        onClick={handleToggle}
        onFocus={handleToggle}
        className="group focus:ring-4 ring-blue-400 ring-offset-8 w-full rounded-full p-3 md:p-5 bg-gradient-to-br from-slate-200 to-slate-400 drop-shadow-lg transition-all outline-4 outline-sky-300"
      >
        <span className="text-5xl md:text-7xl drop-shadow-lg">🎒</span>
        <span className="w-max block text-center bg-white drop-shadow-lg px-2 py-1 md:px-4 md:py-2 rounded-lg absolute opacity-0 group-hover:opacity-100 -top-0 left-0 group-hover:-top-6 md:group-hover:-top-8 transition-all">
          Your Bag
        </span>
      </button>

      {/* Items (Only visible when toggled open) */}
      {toggleItemBar && (
        <ul className="items-center flex gap-2 sm:pr-10 sm:pl-4 flex-col sm:flex-row pb-6 pt-4">
          {[
            { emoji: "🎟️", label: "Ticket" },
            { emoji: "🗺️", label: "Map" },
            { emoji: "️🐉", label: "Dragon" },
          ].map((item, index) => {
            return (
              <li key={index} className="relative group">
                <button
                  className="cursor-pointer hover:translate-y-[-3px] md:hover:translate-y-[-5px] hover:scale-[102%] focus:translate-y-[-3px] md:focus:translate-y-[-5px] transition-all duration-200 ease-in-out bg-slate-100 border-b-6 border-slate-300 h-[70px] w-[70px] md:h-[100px] md:w-[100px] rounded-2xl flex items-center justify-center"
                  onFocus={() => setFocusedItem(index)}
                  onBlur={() => setFocusedItem(null)}
                  onClick={(e) => e.currentTarget.blur()} // Prevents focus from persisting after click
                >
                  <span
                    className={`text-5xl md:text-7xl drop-shadow-lg transition-all ${
                      item.label === "Ticket" && !hasTicket ? "opacity-50" : ""
                    }`}
                  >
                    {item.emoji}
                  </span>
                </button>
                {/* Label below each item */}
                <span
                  className={`text-center bg-white drop-shadow-lg px-2 py-1 md:px-4 md:py-2 rounded-lg absolute opacity-0 -top-0 w-full left-0 transition-all group-hover:opacity-100 group-hover:-top-10 md:group-hover:-top-14 ${
                    focusedItem === index ? "opacity-100 -top-10 md:-top-14" : "opacity-0"
                  }`}
                >
                  {item.label === "Ticket" ? (hasTicket ? "Your Ticket" : "❓") : item.label}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
