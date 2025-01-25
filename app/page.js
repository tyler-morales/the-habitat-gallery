"use client";
import { useRef } from "react";

export default function Home() {
  const scrollRef = useRef(null);

  // Scroll Horizontally
  const handleScroll = (event) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += event.deltaY;
    }
  };
  return (
    <main
      ref={scrollRef}
      onWheel={handleScroll}
      className="bg-white h-screen flex flex-col overflow-x-scroll no-scrollbar max-h-100vh"
    >
      {/* 🚪 Rooms  */}
      <div className="flex w-[170vw] h-[80vh] flex-shrink-0">
        {/* Room 2 */}
        <section className="bg-blue-600 h-full w-[70vw] flex-shrink-0"></section>
        {/* Room 2 */}
        <section className="bg-red-600 h-full w-[100vw] flex-shrink-0"></section>
      </div>

      {/* Floor */}
      <section className="bg-green-600 h-[20vh] w-[170vw] flex-shrink-0"></section>
    </main>
  );
}
