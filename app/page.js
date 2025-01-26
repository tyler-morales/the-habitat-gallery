"use client";
import { useRef, useState } from "react";
import Character from "./components/character";
import EntryRoom from "./components/EntryRoom";

export default function Home() {
  const scrollRef = useRef(null);
  const [characterPosition, setCharacterPosition] = useState({ x: 50, y: 64 }); // Initial X position

  // Scroll Horizontally
  const handleScroll = (event) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += event.deltaY;
    }
  };

  // Move character towards the sign
  const moveCharacterToSign = () => {
    setCharacterPosition({ x: 400, y: 120 }); // Adjust based on the sign's position
  };

  return (
    <main
      ref={scrollRef}
      onWheel={handleScroll}
      className="bg-white h-screen flex flex-col overflow-x-scroll no-scrollbar max-h-100vh"
    >
      {/* 🚪 Rooms  */}
      <div className="flex w-[170vw] h-[80vh] flex-shrink-0">
        {/* Room 1 */}
        <EntryRoom onSignClick={moveCharacterToSign} />

        {/* Room 2 */}
        <section className="bg-red-600 h-full w-[100vw] flex-shrink-0"></section>
        {/* Room 2 */}
        <section className="bg-red-600 h-full w-[100vw] flex-shrink-0"></section>
      </div>

      {/* Floor */}
      <section className="border-4 border-t-black h-[20vh] w-[270vw] flex-shrink-0">
        {/* 👨 Person */}
        <Character position={characterPosition} />
      </section>
    </main>
  );
}
