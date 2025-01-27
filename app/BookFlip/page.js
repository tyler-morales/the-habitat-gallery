"use client";
import { useState } from "react";

export default function page() {
  const handlePageFlip = () => {
    console.log("Page flipped!");
  };

  return (
    <section className="bg-orange-950 max-w-[1000px] h-[800px] p-4 flex gap-4 rounded-lg m-20 relative">
      <div
        onClick={handlePageFlip}
        className="absolute bg-blue-500 w-1/2 h-full top-0 left-0"
      ></div>
      {/* Left side page */}
      <div onClick={handlePageFlip} className="bg-yellow-50 w-full h-full"></div>

      {/* Right side page */}
      <div onClick={handlePageFlip} className="bg-yellow-50 w-full h-full"></div>
    </section>
  );
}
