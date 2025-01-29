"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const Ticket = () => {
  const [flipped, setFlipped] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      {/* 3D Perspective Wrapper */}
      <div
        className="relative w-[250px] h-[400px] cursor-pointer border-4"
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
            className="absolute inset-0 bg-orange-200 flex items-center justify-center text-black text-lg font-bold rounded-lg"
            style={{ backfaceVisibility: "hidden" }}
          >
            Front Side
          </div>

          {/* Back Side (Rotated 180°) */}
          <div
            className="absolute inset-0 bg-blue-400 flex items-center justify-center text-white text-lg font-bold rounded-lg"
            style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
          >
            Back Side
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Ticket;
