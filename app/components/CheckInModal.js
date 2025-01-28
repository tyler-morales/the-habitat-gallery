import { useState } from "react";
import { motion } from "framer-motion";
import GuestBook from "./GuestBook";

export default function CheckInModal({ checkInRef }) {
  const [flippedPages, setFlippedPages] = useState([]);

  return (
    <dialog ref={checkInRef} className="w-[80vw] m-auto relative rounded-3xl">
      <GuestBook />
      <button
        onClick={() => checkInRef.current.close()}
        className="p-2 text-gray-500 hover:text-gray-800 text-lg absolute top-0 right-2 transition-all cursor-pointer"
      >
        x
      </button>
    </dialog>
  );
}
