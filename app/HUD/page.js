"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTicket } from "../contexts/TicketContext";
import { QRCodeSVG } from "qrcode.react";

export default function HUD() {
  const { userTicket, hasTicket, setHasTicket } = useTicket();
  const toggleRef = useRef(null);
  const [toggleItemBar, setToggleItemBar] = useState(true);
  const [focusedItem, setFocusedItem] = useState(null);

  const [ticketPopup, setTicketPopUp] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Control popup visibility

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

  // Handle toggle when clicked, focused, or touched
  const handleToggle = () => {
    setToggleItemBar(true);
  };

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toggleRef.current && !toggleRef.current.contains(event.target)) {
        setToggleItemBar(false);
        setFocusedItem(null);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setToggleItemBar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const handleTicketToggle = (e) => {
    console.log("clicked ticket");
    setTicketPopUp(true);
    setIsPopupVisible(true);
    e.currentTarget.blur();
  };

  // Function to close the popup
  const closeTicketPopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <>
      <div
        ref={toggleRef}
        onMouseEnter={() => setToggleItemBar(true)}
        onMouseLeave={() => {
          setToggleItemBar(false);
          setFocusedItem(null); // Ensure focus resets when mouse leaves
        }}
        onTouchStart={() => setToggleItemBar(true)} // Enables touch on mobile
        className={`flex-col z-50 relative sm:w-full sm:flex-row flex border-4 border-slate-200 rounded-full outline-4 outline-slate-400 transition-all duration-500 bg-gradient-to-br from-slate-200 to-slate-400 drop-shadow-lg ${
          toggleItemBar ? "w-[90px] sm:w-[120px] sm:h-[130px]" : "w-[80px] md:w-[120px]"
        }`}
      >
        {/* Main Button */}
        <button
          onClick={handleToggle}
          onFocus={handleToggle}
          className="group focus:ring-4 ring-blue-400 ring-offset-8 w-full rounded-full p-3 md:p-5 bg-gradient-to-br from-slate-200 to-slate-400 drop-shadow-lg transition-all outline-4 outline-sky-300"
        >
          <span className="text-5xl md:text-7xl drop-shadow-lg">🎒</span>
          <span className="w-max block text-center bg-white drop-shadow-lg px-2 py-1 md:px-4 md:py-2 rounded-lg absolute opacity-0 group-hover:opacity-100 -top-0 left-0 group-hover:-top-6 md:group-hover:-top-8 transition-all">
            Your Bag
          </span>
        </button>

        {/* Items (Only visible when toggled open) */}
        {toggleItemBar && (
          <ul className="items-center flex gap-2 sm:pr-10 sm:pl-4 flex-col sm:flex-row pb-6 pt-4">
            {[
              { emoji: "🎟️", label: "Ticket" },
              { emoji: "🗺️", label: "Map" },
              { emoji: "️🐉", label: "Dragon" },
            ].map((item, index) => {
              return (
                <li key={index} className="relative group">
                  <button
                    className="cursor-pointer hover:translate-y-[-3px] md:hover:translate-y-[-5px] hover:scale-[102%] focus:translate-y-[-3px] md:focus:translate-y-[-5px] transition-all duration-200 ease-in-out bg-slate-100 border-b-6 border-slate-300 h-[70px] w-[70px] md:h-[100px] md:w-[100px] rounded-2xl flex items-center justify-center"
                    onFocus={() => setFocusedItem(index)}
                    onBlur={() => setFocusedItem(null)}
                    onClick={(e) => handleTicketToggle(e)} // Prevents focus from persisting after click
                    // onClick={(e) => e.currentTarget.blur()} // Prevents focus from persisting after click
                  >
                    <span
                      className={`text-5xl md:text-7xl drop-shadow-lg transition-all ${
                        item.label === "Ticket" && !hasTicket ? "opacity-50" : ""
                      }`}
                    >
                      {item.emoji}
                    </span>
                  </button>
                  {/* Label below each item */}
                  <span
                    className={`text-center bg-white drop-shadow-lg px-2 py-1 md:px-4 md:py-2 rounded-lg absolute opacity-0 -top-0 w-full left-0 transition-all group-hover:opacity-100 group-hover:-top-10 md:group-hover:-top-14 ${
                      focusedItem === index ? "opacity-100 -top-10 md:-top-14" : "opacity-0"
                    }`}
                  >
                    {item.label === "Ticket" ? (hasTicket ? "Your Ticket" : "❓") : item.label}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <AnimatePresence>
        {isPopupVisible && ticketPopup && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-y-scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: "0" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={closeTicketPopup} // Close when clicking outside
          >
            {/* Popup */}
            <motion.div
              className="bg-white rounded-lg shadow-lg max-w-5xl relative p-4 border-4 border-slate-200 drop-shadow-xl"
              initial={{ y: "100vh", opacity: 0 }} // Start from below screen
              animate={{ y: "0", opacity: 1 }} // Drop in smoothly
              exit={{ y: "100vh", opacity: 0 }} // Exit upwards
              transition={{ type: "tween" }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              {/* Close button */}
              <button
                className="p-1 text-slate-900 hover:text-gray-800 s absolute left-2 top-2 transition-all bg-slate-100 rounded-full"
                onClick={closeTicketPopup}
              >
                🔴
              </button>

              <div className="border-4 bg-slate-200 border-slate-900  rounded-lg p-10 pt-6 flex flex-col gap-6">
                {/* Title */}
                <h3 className="font-bold uppercase text-3xl tracking-widest text-center">Ticket</h3>

                {/* Ticket */}
                <motion.div
                  className="relative min-w-[250px] min-h-[300px]"
                  initial={{ rotateX: 0, rotateY: 0 }}
                  animate={{
                    y: [0, 10, -10, 0],
                    transition: {
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 10,
                      ease: "easeInOut",
                    },
                  }}
                  whileHover={{
                    rotateX: 5, // Tilts forward on hover
                    rotateY: 5, // Tilts sideways on hover
                    scale: 1.03, // Slightly scales up
                    transition: { duration: 0.2 },
                  }}
                >
                  {/* Rotating Card Container */}
                  {/* <div className="h-full"> */}
                  {/* Front Side */}
                  <div
                    className="inset-0 dots-bg grid rounded-lg p-4 shadow-md border border-gray-400"
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
                        <h3 className="text-sm text-gray-600">
                          {userTicket?.order_id.slice(0, 8)}...
                        </h3>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-sm font-bold">Place</h3>
                      <h3 className="text-sm text-gray-600">🌎 Chicago, IL </h3>
                    </div>
                    <hr className="border-dashed border-slate-500 mt-6" />

                    {/* QR Code */}
                    <div className="mt-4 flex flex-col items-center">
                      <QRCodeSVG value={userTicket.order_id} size={100} />
                      <button className="cursor-pointer text-2xl text-slate-100 bg-blue-700 p-6 border-b-10 border-blue-800 hover:scale-105 focus:scale-105 active:border-b-6 rounded  block text-center mt-3">
                        Save Your Ticket
                      </button>
                    </div>
                  </div>

                  {/* Back Side (Rotated 180°) */}
                  {/* <div
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
                  </div> */}
                </motion.div>

                {/* Extra info */}
                <div>
                  <button className="text-slate-500 text-sm text-center">More info ▾</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
