import { useState, useEffect } from "react";
import GuestBook from "./GuestBook";
import Ticket from "./Ticket";

export default function CheckInModal({ checkInRef }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [toggleItem, setToggleItem] = useState("tickets");
  const [page, setPage] = useState(1);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Handle screen size change
  useEffect(() => {
    const handleResize = () => {
      const smallScreen = window.innerWidth < 768;
      setIsSmallScreen(smallScreen);

      // Only update toggleItem if switching to large screen
      // if (!smallScreen) {
      // setToggleItem(null); // Show both on large screens
      // }

      if (smallScreen) setToggleItem("tickets");
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle GuestBook visibility (expanded state)
  const toggleBook = () => {
    setIsExpanded((prev) => {
      const newState = !prev;
      setPage(newState ? 2 : 1);
      return newState;
    });
  };

  // Toggle between Ticket and GuestBook (only on small screens)
  const handleToggle = (item) => {
    if (isSmallScreen) {
      setToggleItem(item);

      // If switching to tickets, close guestbook
      if (item === "tickets") {
        setIsExpanded(false);
        setPage(1); // Reset page when switching back to tickets
      }
    }
  };
  // const handleToggle = (item) => {
  //   if (isSmallScreen) {
  //     setToggleItem(item);
  //   }
  // };

  return (
    <dialog
      ref={checkInRef}
      className="m-auto rounded-3xl sm:w-[90vw] border-2 border-yellow-400 scroll-hidden"
    >
      <div className="p-8">
        <h2 className="font-bold text-3xl text-center">Welcome, To The Ticket Booth!!!</h2>
      </div>

      {/* Toggle buttons (only on small screens) */}
      {isSmallScreen && (
        <div className="flex w-full gap-4 mb-4">
          <button
            onClick={() => handleToggle("tickets")}
            className={`w-full p-2 ${
              toggleItem === "tickets" ? "bg-blue-600 text-white" : "bg-blue-400"
            }`}
          >
            Ticket
          </button>
          <button
            onClick={() => handleToggle("guest-book")}
            className={`w-full p-2 ${
              toggleItem === "guest-book" ? "bg-blue-600 text-white" : "bg-blue-400"
            }`}
          >
            Guest Book
          </button>
        </div>
      )}

      {/* Main Content */}
      <div
        className={`m-auto border-2 max-w-5xl flex ${
          isSmallScreen ? "flex-col" : "flex-row"
        } items-end justify-center w-full overflow-x-scroll scroll-hidden`}
      >
        {/* Ticket Component */}
        {/* {!isExpanded && (!isSmallScreen || toggleItem === "tickets") && ( */}
        {(!isExpanded || toggleItem === "tickets") &&
          (!isSmallScreen || toggleItem === "tickets") && (
            <div className="bg-red-200 relative flex justify-center w-full transition-all duration-500 border-2 border-pink-500 min-w-[400px]">
              <Ticket />
            </div>
          )}

        {/* GuestBook Component */}
        {(isExpanded || !isSmallScreen || toggleItem === "guest-book") && (
          <div className="z-50 transition-all duration-500 relative w-full border-2 border-blue-600 min-w-[400px]">
            <GuestBook
              page={page}
              setPage={setPage}
              toggleBook={toggleBook}
              setIsExpanded={setIsExpanded}
            />
          </div>
        )}
      </div>

      {/* Background */}
      <div
        style={{
          backgroundImage: `url('${
            process.env.NEXT_PUBLIC_API_BASE_PATH || ""
          }/images/textures/wood.jpg')`,
        }}
        className="w-full h-full flex justify-center"
      >
        {/* Plaque */}
        <div className="my-4 relative h-min w-max p-4 bg-gradient-to-br from-orange-300 to-orange-500 border-2 border-orange-400 rounded-md shadow-sm">
          <h3 className="font-bold px-4 text-2xl text-center uppercase font-serif text-yellow-800 drop-shadow-[0_1px_0_rgba(255,255,255,0.8)] tracking-widest">
            Ticket Desk
          </h3>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={() => checkInRef.current.close()}
        className="p-2 text-gray-500 hover:text-gray-800 text-lg absolute top-0 right-2 transition-all cursor-pointer"
      >
        x
      </button>
    </dialog>
  );
}
