import React from "react";

export default function character({ position }) {
  return (
    <div
      className="bg-yellow-500 w-10 h-[200px] absolute transition-all duration-500 ease-in-out"
      style={{ left: `${position.x}px`, bottom: `${position.y}px` }} // Update position dynamically
    >
      Person
    </div>
  );
}
