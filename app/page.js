"use client";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import Character from "./components/character";
import EntryRoom from "./components/EntryRoom";
import CheckInModal from "./components/CheckInModal";
import Room1 from "./components/Room1";
import Room2 from "./components/Room2";
import HUD from "./HUD/page";

export default function Home() {
  const scrollRef = useRef(null);
  const checkInRef = useRef(null); // Ref for the dialog popover
  const [characterPosition, setCharacterPosition] = useState({ x: 50, y: 64 }); // Initial X position
  const [hasCheckedIn, setHasCheckedIn] = useState(true);

  // Function to check if user has scrolled past the check-in desk
  const updateScrollPosition = () => {
    if (!scrollRef.current) return;

    let x = scrollRef.current.scrollLeft;

    if (x >= 115 && !hasCheckedIn) {
      setHasCheckedIn(true); // Prevent multiple pop-ups

      // Show the pop-up
      if (checkInRef.current) {
        checkInRef.current.showModal();
      }
    }
  };

  // Scroll Horizontally
  const handleScroll = (event) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += event.deltaY;
    }
  };

  // Handle arrow key presses (← Left Arrow, → Right Arrow)
  const handleKeyPress = (event) => {
    if (!scrollRef.current) return;

    if (event.key === "ArrowRight") {
      scrollRef.current.scrollLeft += 20; // Adjust step size if needed
    } else if (event.key === "ArrowLeft") {
      scrollRef.current.scrollLeft -= 20;
    }

    requestAnimationFrame(updateScrollPosition); // Check if check-in should trigger
  };

  // Attach event listeners for both scroll & arrow key detection
  useEffect(() => {
    const handleScrollEvent = () => requestAnimationFrame(updateScrollPosition);

    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScrollEvent);
    }
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScrollEvent);
      }
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [hasCheckedIn]);

  // Move character towards the sign
  const moveCharacterToSign = () => {
    setCharacterPosition({ x: 400, y: 120 }); // Adjust based on the sign's position
  };

  return (
    <main
      ref={scrollRef}
      onWheel={handleScroll}
      className="bg-white h-screen flex flex-col overflow-x-scroll no-scrollbar max-h-[100vh] scroll-hidden"
    >
      {/* 🚪 Rooms  */}
      <div className="flex w-[170vw] h-[80vh] flex-shrink-0">
        {/* Room 1 */}
        <EntryRoom
          onSignClick={moveCharacterToSign}
          ref={checkInRef}
          setHasCheckedIn={setHasCheckedIn}
        />

        {/* Room 2 */}
        <Room1 />

        {/* Room 3 */}
        <Room2 />
      </div>

      {/* Floor */}
      <section className="border-black border-t-2 h-[20vh] w-[270vw] no-scrollbar"></section>

      {/* 👨 Person */}
      <Character position={characterPosition} />

      {/* HUD */}
      <div className="absolute bottom-8 right-8">
        <HUD />
      </div>

      {/* 🏁 Check-in Popover (Native Dialog) */}
      <CheckInModal checkInRef={checkInRef} />
    </main>
  );
}
