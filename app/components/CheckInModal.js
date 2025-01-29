import { useState } from "react";
import { motion } from "framer-motion";
import GuestBook from "./GuestBook";
import Ticket from "./Ticket";

export default function CheckInModal({ checkInRef }) {
  return (
    <dialog
      ref={checkInRef}
      className="m-auto rounded-3xl w-[80vw] max-h-[90vh] h-[90vh] overflow-hidden"
    >
      {/* Close Button */}
      <button
        onClick={() => checkInRef.current.close()}
        className="p-2 text-gray-500 hover:text-gray-800 text-lg absolute top-0 right-2 transition-all cursor-pointer"
      >
        x
      </button>

      {/* Main Content */}
      <div className="w-full h-[87%] overflow-hidden flex items-center px-8 flex-col  lg:flex-row">
        {/* Ticket Component */}
        <div className="flex justify-center h-full items-end w-full">
          <Ticket />
        </div>

        {/* GuestBook Component */}
        <div className="h-full w-full z-50">
          <GuestBook />
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url('${
            process.env.NEXT_PUBLIC_API_BASE_PATH || ""
          }/images/textures/wood.jpg')`,
        }}
        className="w-full h-full"
      >
        {/* Plaque */}
        <div className="top-4 relative w-max p-4 justify-self-center bg-gradient-to-br from-orange-300 to-orange-500 border-2 border-orange-400 rounded-md shadow-sm">
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
    </dialog>
  );
}
