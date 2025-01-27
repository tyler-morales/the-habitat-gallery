import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Room2() {
  const [selectedArtwork, setSelectedArtwork] = useState(null); // Store selected artwork
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Control popup visibility

  // Array of artwork details
  const artworks = [
    {
      id: "artwork-1",
      title: "Escape To the Promise Land",
      year: "2023",
      medium: "Collage on paper",
      artist: "Tyler Morales",
      src: "/images/collages/collage-1.jpg",
      fullSrc: "/images/collages/collage-1.jpg",
    },
    {
      id: "collage-2",
      title: "Lift Off",
      year: "2023",
      medium: "Collage on paper",
      artist: "Tyler Morales",
      src: "/images/collages/collage-2.jpg",
      fullSrc: "/images/collages/collage-2.jpg",
    },
    {
      id: "collage-3",
      title: "Are You Connected?",
      year: "2023",
      medium: "Collage on paper",
      artist: "Tyler Morales",
      src: "/images/collages/collage-3.jpg",
      fullSrc: "/images/collages/collage-3.jpg",
    },
    {
      id: "collage-4",
      title: "What Remains",
      year: "2023",
      medium: "Collage on paper",
      artist: "Tyler Morales",
      src: "/images/collages/collage-4.jpg",
      fullSrc: "/images/collages/collage-4.jpg",
    },
    {
      id: "collage-5",
      title: "It Keeps Going...",
      year: "2023",
      medium: "Collage on paper",
      artist: "Tyler Morales",
      src: "/images/collages/collage-5.jpg",
      fullSrc: "/images/collages/collage-5.jpg",
    },
    {
      id: "collage-6",
      title: "Poor life Choices.",
      year: "2023",
      medium: "Collage on paper",
      artist: "Tyler Morales",
      src: "/images/collages/collage-6.jpg",
      fullSrc: "/images/collages/collage-6.jpg",
    },
  ];

  // Function to open the popup with the clicked artwork
  const openArtworkPopup = (artwork) => {
    setSelectedArtwork(artwork);
    setIsPopupVisible(true);
  };

  // Function to close the popup
  const closeArtworkPopup = () => {
    setIsPopupVisible(false);
    setSelectedArtwork(null);
  };

  return (
    <section className="bg-white h-full w-[2400px] flex-shrink-0 relative">
      {/* 📝 Room Writing */}
      <div className="absolute top-1/3 left-[50px] max-w-xs shadow-md p-4 bg-white">
        <h3 className="text-2xl font-bold mb-4">Collages</h3>
        <p>
          A digital extension of Habitat 2317, this interactive gallery brings the immersive
          experience of Tyler Morales’ apartment exhibitions into the virtual space.
        </p>
        <p className="mt-2">
          Blending minimal design with skeuomorphic elements, Habitat Gallery allows visitors to
          explore curated rooms, walk through evolving exhibitions, and engage with artworks as if
          they were physically present.
        </p>
      </div>

      {/* 🎨 Artworks */}
      <div className="grid grid-cols-3 gap-10 absolute top-[100px] left-[450px]">
        {artworks.map((artwork) => (
          <button
            key={artwork.id}
            className="drop-shadow-lg hover:animate-wiggle "
            onClick={() => openArtworkPopup(artwork)}
          >
            <div className="relative">
              <Image src={artwork.src} alt={artwork.title} width={250} height={0} />
            </div>
          </button>
        ))}
      </div>

      {/* 🖼️ Popup Modal */}
      <AnimatePresence>
        {isPopupVisible && selectedArtwork && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-y-scroll border-4 border-orange-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: "0" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={closeArtworkPopup} // Close when clicking outside
          >
            {/* Popup */}
            <motion.div
              className="bg-white rounded-lg shadow-lg max-w-5xl relative"
              initial={{ y: "100vh", opacity: 0 }} // Start from below screen
              animate={{ y: "0", opacity: 1 }} // Drop in smoothly
              exit={{ y: "100vh", opacity: 0 }} // Exit upwards
              transition={{ type: "tween" }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              <button
                className="p-2 text-gray-500 hover:text-gray-800 text-lg absolute right-2 transition-all"
                onClick={closeArtworkPopup}
              >
                ✕
              </button>
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 items-center lg:items-end">
                <Image
                  className="bg-orange-50 p-6 rounded-lg"
                  src={selectedArtwork.fullSrc}
                  alt={selectedArtwork.title}
                  width={750}
                  height={0}
                />

                {/* Artwork Info */}
                <div className="flex flex-col gap-1 w-full lg:min-w-80 px-6 lg:px-0 pb-6">
                  <h4>{selectedArtwork.year}</h4>
                  <h3 className="font-bold text-2xl font-serif">{selectedArtwork.title}</h3>
                  <span>{selectedArtwork.medium}</span>
                  <h4 className="mt-4">{selectedArtwork.artist}</h4>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
