import Image from "next/image";
import React from "react";

export default function EntryRoom({ onSignClick, ref, setHasCheckedIn }) {
  const checkIn = () => {
    setHasCheckedIn(true);

    if (ref.current) {
      ref.current.showModal();
    }
  };

  return (
    <section className="bg-slate-100 h-full w-[1100px] flex-shrink-0 relative">
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
          <Image
            src="https://wallpaperbat.com/img/501688-valley-wallpaper.jpg"
            alt="Habitat Gallery Logo"
            width={373}
            height={0}
            className="absolute left-[15px] bottom-[55px] z-[-1]"
          />
          <h2 className="text-2xl absolute bottom-[90px] text-center w-full text-white">
            A gallery space 🌎
          </h2>
        </div>
      </button>

      {/* Desription */}
      <div className="bg-white absolute p-4 max-w-[430px] shadow-lg right-[130px] top-[120px] flex gap-3 flex-col rounded-sm">
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

      {/* Check-in desk */}
      <button
        onClick={checkIn}
        className="w-[300px] h-[200px] border-4 absolute border-black bottom-[-100px] left-[200px] bg-white z-50"
      >
        Check in
      </button>
      {/* Roman Pillar Decor */}
      <Image
        src={"/images/decor/pillar.png"}
        className="absolute bottom-[-80px] right-[200px] z-50 drop-shadow-lg"
        alt="Room 1"
        width={100}
        height={0}
      />
    </section>
  );
}
