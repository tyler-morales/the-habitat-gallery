import Image from "next/image";
import React from "react";

export default function EntryRoom({ onSignClick }) {
  return (
    <section className=" h-full w-[1100px] flex-shrink-0 relative">
      {/* Sign - Positioned Within Room */}
      <button
        onClick={onSignClick}
        className="absolute sm:top-[70px] top-[20px] left-20 drop-shadow-lg"
      >
        <div className="relative">
          <Image
            src="/images/frames/frame-1.png"
            alt="Habitat Gallery Logo"
            width={400}
            height={0}
          />
          <Image
            src="/images/habitat.svg"
            alt="Habitat Gallery Logo"
            width={230}
            height={0}
            className="absolute top-[170px] m-auto left-0 right-0"
          />
          <h2 className="text-2xl absolute bottom-[90px] text-center w-full">A gallery space 🌎</h2>
        </div>
      </button>

      {/* Desription */}
      <div className="absolute p-4 max-w-[430px] shadow-lg right-[130px] top-[120px] flex gap-3 flex-col rounded-sm">
        <p>
          A digital extension of Habitat 2317, this interactive gallery brings the immersive
          experience of Tyler Morales’ apartment exhibitions into the virtual space. Blending
          minimal design with skeuomorphic elements, Habitat Gallery allows visitors to explore
          curated rooms, walk through evolving exhibitions, and engage with artworks as if they were
          physically present.
        </p>

        <p>
          Inspired by Tyler’s passion for transformation, spatial storytelling, and geometric
          harmony, this digital space continues the legacy of intimate, thought-provoking showcases
          in a new, dynamic form.
        </p>
      </div>
    </section>
  );
}
