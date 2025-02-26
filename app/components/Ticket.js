"use client";
import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useTicket } from "../contexts/TicketContext";

const Ticket = () => {
  const { userTicket, hasTicket, setHasTicket } = useTicket();
  const [removePrinter, setRemovePrinter] = useState(false);
  const controls = useAnimation(); // Animation controller

  // Convert timestamp to Date object
  const dateObj = new Date(userTicket?.date);

  // Format Date (MM/DD/YY)
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  });

  // Format Time (hh:mm)
  const formattedTime = dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Change to true for 12-hour format
  });

  // Print ticket animation and sets state
  const printTicket = async () => {
    setHasTicket(true);
    setTimeout(() => {
      setRemovePrinter(true);
    }, 7000);

    // Stepwise motion mimicking a printer output
    await controls.start({
      y: [0, -40, -40, -60, -60, -80, -80, -330, 0], // Up in steps, final lift, then back
      transition: {
        duration: 8.5, // Total duration
        ease: ["easeOut", "easeOut", "easeOut", "easeOut", "easeInOut"], // Smooth steps
        times: [
          0,
          0.1, // First step up (pause)
          0.2,
          0.3, // Second step up (pause)
          0.4,
          0.5, // Third step up (pause)
          0.6,
          0.8, // Large move up (2s)
          1, // Slow ease down (4s)
        ],
      },
    });

    // After printing, smoothly lower and start infinite 3D spinning
    await controls.start({
      y: [0, -10, 0], // Small final adjustment
      rotateY: [0, 360], // Infinite 3D spin
      transition: {
        y: { duration: 3, ease: "easeInOut", repeat: Infinity },
        rotateY: { duration: 14, ease: "linear", repeat: Infinity },
      },
    });
  };

  return (
    <>
      {/* Printer */}
      <div
        style={{
          backgroundImage: `url('${
            process.env.NEXT_PUBLIC_API_BASE_PATH || ""
          }/images/items/printer.png')`,
          backgroundSize: "contain", // Ensure the image fits inside
          backgroundRepeat: "no-repeat",
        }}
        className={`bottom-0 absolute w-full max-w-[350px] h-[350px] flex justify-center  ${
          removePrinter ? "z-0" : "z-40 opacity-100 transition-opacity duration-500"
        }`}
      >
        <button
          onClick={printTicket}
          className={`px-4 py-2 rounded-md border-b-10 transition-all text-xl bottom-4 absolute ${
            hasTicket
              ? "cursor-not-allowed bg-gray-300 border-gray-400 border-b-[4px]"
              : "cursor-pointer bg-green-800 border-green-900 focus:border-b-6 active:border-b-6 hover:scale-105"
          }`}
          disabled={Boolean(hasTicket)} // ✅ Ensures it's a boolean
        >
          <div className="">
            <span className="font-bold text-white px-4 py-10">Print Ticket</span>
          </div>
        </button>
      </div>

      {/* Ticket */}
      <div className="relative w-[250px] h-[300px] -top-8" style={{ perspective: "1000px" }}>
        {/* Rotating Card Container */}
        <motion.div
          className="h-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={controls} // Controlled animation
        >
          {/* Front Side */}
          <div
            className="absolute inset-0 dots-bg grid rounded-lg p-4 shadow-md border border-gray-400"
            style={{ backfaceVisibility: "hidden" }}
          >
            <Image alt="Logo" src="/images/habitat.svg" width={100} height={100} />
            <h2 className="font-bold text-lg mt-1">A Digital Gallery</h2>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <h3 className="text-sm font-bold">Date</h3>
                <h3 className="text-sm text-gray-600">{formattedDate}</h3>
              </div>

              <div>
                <h3 className="text-sm font-bold">Time</h3>
                <h3 className="text-sm text-gray-600">{formattedTime}</h3>
              </div>

              <div>
                <h3 className="text-sm font-bold">Type</h3>
                <h3 className="text-sm text-gray-600">{userTicket?.type}</h3>
              </div>

              <div>
                <h3 className="text-sm font-bold">Order ID</h3>
                <h3 className="text-sm text-gray-600">{userTicket?.order_id.slice(0, 8)}...</h3>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-bold">Place</h3>
              <h3 className="text-sm text-gray-600">🌎 Chicago, IL </h3>
            </div>
            <hr className="border-dashed border-slate-500 mt-6" />
          </div>

          {/* Back Side (Rotated 180°) */}
          <div
            className="absolute inset-0 dots-bg grid place-items-center rounded-lg p-4 shadow-md border border-gray-400"
            style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
          >
            <Image
              alt="Logo"
              src="/images/habitat.svg"
              width={150}
              height={150}
              className="-rotate-90"
            />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Ticket;
