"use client";
import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";

const Ticket = () => {
  const [removePrinter, setRemovePrinter] = useState(false);
  const controls = useAnimation(); // Animation controller

  const printTicket = async () => {
    setTimeout(() => {
      setRemovePrinter(true);
    }, 4700);

    // Stepwise motion mimicking a printer output
    await controls.start({
      y: [0, -20, -40, -80, -300, 0], // Moves up in steps, then smoothly returns
      transition: {
        duration: 6, // Total duration (0.3s * 4 + 1.5s * 2)
        ease: ["easeOut", "easeOut", "easeOut", "easeOut", "easeOut", "easeInOut"], // Smoother motion
        times: [0.125, 0.125, 0.125, 0.1875, 0.25, 0.75, 1], // Short pauses = 0.3s, Long pauses = 1.5s
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
    <div className="relative">
      {/* Printer */}
      <div
        style={{
          backgroundImage: `url('${
            process.env.NEXT_PUBLIC_API_BASE_PATH || ""
          }/images/items/printer.png')`,
          backgroundSize: "contain", // Ensure the image fits inside
        }}
        className={`absolute w-[350px] h-[350px] flex justify-center ${
          removePrinter ? "z-0" : "z-40 opacity-100 transition-opacity duration-500"
        }`}
      >
        <button onClick={printTicket} className="button bottom-4 absolute">
          <div className="button__content">
            <span className="button__text font-bold">Print Ticket</span>
          </div>
        </button>
      </div>

      {/* 3D Perspective Wrapper */}
      <div className="relative w-[250px] h-[300px] top-1" style={{ perspective: "1000px" }}>
        {/* Rotating Card Container */}
        <motion.div
          className="relative w-full h-full"
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
                <h3 className="text-sm text-gray-600">1/28/25</h3>
              </div>

              <div>
                <h3 className="text-sm font-bold">Time</h3>
                <h3 className="text-sm text-gray-600">10:37am</h3>
              </div>

              <div>
                <h3 className="text-sm font-bold">Type</h3>
                <h3 className="text-sm text-gray-600">Guest</h3>
              </div>

              <div>
                <h3 className="text-sm font-bold">Order ID</h3>
                <h3 className="text-sm text-gray-600">nafvdjva823</h3>
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
    </div>
  );
};

export default Ticket;
