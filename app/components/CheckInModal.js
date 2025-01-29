import { useState } from "react";
import { motion } from "framer-motion";
import GuestBook from "./GuestBook";
import Ticket from "./Ticket";

export default function CheckInModal({ checkInRef }) {
  return (
    <dialog
      ref={checkInRef}
      className="w-[80vw] m-auto relative rounded-3xl grid grid-cols-2 border-pink-400 border-4 px-10 h-[80vh] gap-10 place-items-center"
    >
      {/* New Section (Spans Both Columns) */}
      <div className="col-span-2 w-full text-center py-4 bg-gray-100 rounded-xl shadow-md">
        <h2 className="text-xl font-bold">Welcome to the Check-In</h2>
        <p className="text-sm text-gray-600">Confirm your attendance and sign the guestbook.</p>
      </div>
      {/* Ticket Component */}
      <Ticket />

      {/* GuestBook Component */}
      <GuestBook />
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
