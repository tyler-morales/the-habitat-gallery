"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Ticket = () => {
  const [flipped, setFlipped] = useState(false);
  const [isHovering, setIsHovering] = useState(true);
  const [clicked, setClicked] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen bg-zinc-300">
      {/* 3D Perspective Wrapper */}
      <div
        className="relative w-[250px] h-[300px] cursor-pointer"
        onClick={() => setClicked(true)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{ perspective: "1000px" }}
      >
        {/* Rotating Card Container */}
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={
            clicked
              ? {
                  y: [0, 20, -90, -70, -90, -95], // Down, then up with a slight overshoot & bounce
                  scale: [1, 1.3, 1.34, 1.36, 1.37, 1.38, 1.38], // Smooth scaling
                  y: ["0%", "2%", "10%"], // Small natural landing shift
                }
              : { rotateY: isHovering ? [0, 360] : flipped ? 180 : 0 } // Normal hover spin
          }
          transition={
            clicked
              ? {
                  y: [{ duration: 0.6 }, { duration: 0.6 }, { duration: 1 }], // Sequential movements
                  scale: { duration: 1, ease: "easeOut" },
                  x: { duration: 1, ease: "easeOut" },
                  y: { duration: 1.3, ease: "easeOut" },
                }
              : {
                  rotateY: isHovering
                    ? { duration: 14, ease: "linear", repeat: Infinity } // Infinite spin
                    : { duration: 2.8, ease: "easeInOut" }, // Smooth flip on click
                }
          }
        >
          {/* Front Side */}
          <div
            className="absolute inset-0 dots-bg flex rounded-lg p-4 flex-col shadow-md border-1 border-gray-400"
            style={{ backfaceVisibility: "hidden" }}
          >
            <Image alt="Logo" src="/images/habitat.svg" width={100} height={100} />

            <h2 className="font-bold text-lg mt-1">A Digtal Gallery</h2>

            <div className="grid grid-cols-2 justify-between mt-6 gap-4">
              {/* Grid Item 1 */}
              <div className="">
                <h3 className="text-sm font-bold">Date</h3>
                <h3 className="text-sm text-gray-600">1/28/25</h3>
              </div>

              {/* Grid Item 2 */}
              <div className="">
                <h3 className="text-sm font-bold">Time</h3>
                <h3 className="text-sm text-gray-600">10:37am</h3>
              </div>

              {/* Grid Item 3 */}
              <div className="">
                <h3 className="text-sm font-bold">Type</h3>
                <h3 className="text-sm text-gray-600">Guest</h3>
              </div>

              {/* Grid Item 4 */}
              <div className="">
                <h3 className="text-sm font-bold">Order ID</h3>
                <h3 className="text-sm text-gray-600">nafvdjva823</h3>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-bold">Place</h3>
              <h3 className="text-sm text-gray-600">🌎 Chicago, IL </h3>
            </div>
            <hr className="border-dashed border-slate-500  mt-6" />
          </div>
          {/* Back Side (Rotated 180°) */}
          <div
            className="absolute inset-0 dots-bg flex rounded-lg p-4 flex-col shadow-md border-1 border-gray-400 justify-center items-center"
            style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
          >
            <Image
              alt="Logo"
              src="/images/habitat.svg"
              width={150}
              height={150}
              className="-rotate-90 "
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Ticket;
