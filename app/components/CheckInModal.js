import { useState } from "react";
import GuestBook from "./GuestBook";
import Ticket from "./Ticket";

export default function CheckInModal({ checkInRef }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [toggleItem, setToggleItem] = useState("ticket");
  const [page, setPage] = useState(1);

  const toggleBook = () => {
    setIsExpanded((prev) => {
      const newState = !prev;
      setPage(newState ? 2 : 1); // Set page to 2 when expanded, else set to 1
      return newState;
    });
  };

  return (
    <dialog
      ref={checkInRef}
      className="m-auto rounded-3xl md:w-[90vw] border-2 border-yellow-400 scroll-hidden"
    >
      <div className="p-8">
        <h2 className="font-bold text-3xl text-center">Welcome, To The Ticket Booth!!!</h2>
      </div>

      {/* Main Content */}
      <div
        className={`m-auto border-2 max-w-5xl flex flex-col md:flex-row items-end justify-center w-full overflow-x-scroll scroll-hidden ${
          isExpanded ? "-translate-x-[0%]" : ""
        }`}
      >
        {/* Ticket Component */}
        {!isExpanded && (
          <div className="bg-red-200 relative flex justify-center w-full transition-all duration-500 border-2 border-pink-500 min-w-[400px]">
            <Ticket />
          </div>
        )}

        {/* GuestBook Component */}
        <div
          className={`z-50 transition-all duration-500 relative w-full  border-2 border-blue-600 min-w-[400px]`}
        >
          <GuestBook
            page={page}
            setPage={setPage}
            toggleBook={toggleBook}
            setIsExpanded={setIsExpanded}
          />
        </div>
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
          {/* Screws */}
          <div>
            {/* Top-Left Screw */}
            <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-orange-700 border border-orange-900 shadow-[inset_0px_2px_3px_rgba(255,255,255,0.6)]"></div>

            {/* Top-Right Screw */}
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-700 border border-orange-900 shadow-[inset_0px_2px_3px_rgba(255,255,255,0.6)]"></div>

            {/* Bottom-Left Screw */}
            <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-orange-700 border border-orange-900 shadow-[inset_0px_2px_3px_rgba(255,255,255,0.6)]"></div>

            {/* Bottom-Right Screw */}
            <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-orange-700 border border-orange-900 shadow-[inset_0px_2px_3px_rgba(255,255,255,0.6)]"></div>
          </div>
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
