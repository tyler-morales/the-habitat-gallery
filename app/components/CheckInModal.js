import { useState } from "react";
import { motion } from "framer-motion";

const pagesData = [
  { id: "page1", front: "Right 1", back: "Left 2" },
  { id: "page2", front: "Right 3", back: "Left 4" },
  { id: "page3", front: "Right 5", back: "Left 6" },
  { id: "page4", front: "Right 4", back: "Left 4" },
  { id: "page5", front: "Right 5", back: "Left 5" },
  { id: "page6", front: "Right 6", back: "Left 6" },
];

export default function CheckInModal({ checkInRef }) {
  const [flippedPages, setFlippedPages] = useState([]);

  const handleFlip = (id, index) => {
    if (index === flippedPages.length) {
      setFlippedPages([...flippedPages, id]); // Flip the next page in order
    } else if (index === flippedPages.length - 1) {
      setFlippedPages(flippedPages.slice(0, -1)); // Undo last flip
    }
  };

  return (
    <dialog ref={checkInRef} className="p-6 bg-white shadow-lg rounded-md border-4 border-blue-400">
      <div className="bookWrapper overflow-hidden">
        <div className="bookBg">
          <div className="pageBg">
            <div className="pageWrapper">
              {/* Book spine */}
              <div className="bookSpine"></div>

              {pagesData.map((page, index) => (
                <motion.div
                  key={page.id}
                  className={`page ${flippedPages.includes(page.id) ? "flipped" : ""}`}
                  initial={false}
                  animate={{
                    rotateY: flippedPages.includes(page.id) ? -180 : 0,
                    transformOrigin: flippedPages.includes(page.id) ? "center" : "right center",
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  onClick={() => handleFlip(page.id, index)}
                  style={{ zIndex: pagesData.length - index }} // Ensures correct stacking order
                >
                  {/* Right Side (Front) */}
                  <div className="pageFace front">
                    <h1>{page.front}</h1>
                    <div className="pageFoldRight"></div>
                  </div>

                  {/* Left Side (Back) */}
                  <div className="pageFace back">
                    <h1>{page.back}</h1>
                    <div className="pageFoldLeft"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => checkInRef.current.close()}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Close
      </button>
    </dialog>
  );
}
