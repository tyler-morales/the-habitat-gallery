"use client";
import { useRef, useState } from "react";
import Character from "./components/character";
import EntryRoom from "./components/EntryRoom";

export default function Home() {
  const scrollRef = useRef(null);
  const checkInRef = useRef(null); // Ref for the dialog popover
  const [characterPosition, setCharacterPosition] = useState({ x: 50, y: 64 }); // Initial X position
  const [hasCheckedIn, setHasCheckedIn] = useState(false);

  // Scroll Horizontally
  const handleScroll = (event) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += event.deltaY;
    }

    // Check if the user has scrolled to the check-in desk
    let x = scrollRef.current.scrollLeft;
    if (x >= 115 && !hasCheckedIn) {
      setHasCheckedIn(true); // Prevent multiple logs

      // Show the popover
      if (checkInRef.current) {
        checkInRef.current.showModal();
      }
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
        <EntryRoom onSignClick={moveCharacterToSign} ref={checkInRef} />

        {/* Room 2 */}
        <section className="bg-red-600 h-full w-[100vw] flex-shrink-0"></section>
        {/* Room 2 */}
        <section className="bg-red-600 h-full w-[100vw] flex-shrink-0"></section>
      </div>

      {/* Floor */}
      <section className="border-4 border-t-black h-[20vh] w-[270vw] flex-shrink-0 relative"></section>

      {/* 👨 Person */}
      <Character position={characterPosition} />

      {/* 🏁 Check-in Popover (Native Dialog) */}
      <dialog ref={checkInRef} className="p-6 bg-white shadow-lg rounded-md">
        <h2 className="text-xl font-bold mb-2">Welcome to the Check-In Desk!</h2>
        <p className="mb-4">Would you like to sign the guestbook?</p>
        <button
          onClick={() => checkInRef.current.close()}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </dialog>
    </main>
  );
}
