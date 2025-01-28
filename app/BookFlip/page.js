"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
const data = [
  { date: "1/27/25", name: "1. Homer Simpson", message: "Mmm... art. Almost as good as donuts!" },
  { date: "1/27/25", name: "2. Darth Vader", message: "Impressive. Most impressive." },
  {
    date: "1/27/25",
    name: "3. Tony Stark",
    message: "This place has class... almost as much as me.",
  },
  { date: "1/27/25", name: "4. Yoda", message: "Great gallery, this is. Inspired, I am." },
  { date: "1/27/25", name: "5. Deadpool", message: "10/10 would break the fourth wall again!" },
  { date: "1/27/25", name: "6. Sherlock Holmes", message: "Elementary, my dear artist." },
  {
    date: "1/27/25",
    name: "7. Walter White",
    message: "You're goddamn right this art is amazing.",
  },
  { date: "1/27/25", name: "8. Patrick Star", message: "Is mayonnaise an art?" },
  { date: "1/27/25", name: "9. The Joker", message: "Why so... artistic?" },
  {
    date: "1/27/25",
    name: "10. Frodo Baggins",
    message: "One does not simply walk past this gallery!",
  },
  {
    date: "1/27/25",
    name: "11. Michael Scott",
    message:
      "Would I rather be feared or loved? Easy. I want people to love my art while fearing its brilliance.",
  },
  {
    date: "1/27/25",
    name: "12. Gandalf",
    message:
      "A wizard is never late to an art exhibition, nor is he early. He arrives precisely when he means to!",
  },
  {
    date: "1/27/25",
    name: "13. Bugs Bunny",
    message: "Ehh... what’s up with all this beautiful art, doc?",
  },
  {
    date: "1/27/25",
    name: "14. Marty McFly",
    message: "Great Scott! This art belongs in the future!",
  },
  {
    date: "1/27/25",
    name: "15. Spock",
    message: "Fascinating. The logic of these compositions is unparalleled.",
  },
  {
    date: "1/27/25",
    name: "16. Jack Sparrow",
    message: "This gallery needs more rum... but otherwise, I approve.",
  },
  { date: "1/27/25", name: "17. Mario", message: "It’s-a me, Mario! And I-a love-a this art!" },
  { date: "1/27/25", name: "18. The Mandalorian", message: "This is the way... to great art." },
  {
    date: "1/27/25",
    name: "19. Thanos",
    message: "Perfectly balanced, as all great art should be.",
  },
  {
    date: "1/27/25",
    name: "20. Bob Ross",
    message: "There are no mistakes, only happy little brushstrokes.",
  },
];

export default function FlipBook() {
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(data);
  const entriesPerPage = 5;
  const [isSinglePage, setIsSinglePage] = useState(false);
  const [newEntry, setNewEntry] = useState({
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    name: "",
    message: "",
  });

  const handleInputChange = (e, field) => {
    const value = e.target.value;

    // Update the local state for the form input
    setNewEntry((prev) => ({ ...prev, [field]: value }));

    // Ensure we're updating the last entry in `entries`
    setEntries((prevEntries) => {
      // if (prevEntries.length === 0) return [{ ...newEntry, [field]: value }];

      return prevEntries.map((entry, index) =>
        index === prevEntries.length - 1 ? { ...entry, [field]: value } : entry
      );
    });
  };

  useEffect(() => {
    setEntries([...entries, newEntry]);
    const updateScreenSize = () => {
      setIsSinglePage(window.innerWidth < 1000);
    };
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const paginatedEntries = [];
  for (let i = -5; i < entries.length; i += entriesPerPage) {
    paginatedEntries.push(entries.slice(i, i + entriesPerPage));
  }

  const nextPage = () => {
    setPage((prev) => {
      const isLastPage = prev >= paginatedEntries.length + 1;

      if (isLastPage) return prev; // Prevent going beyond the last page

      // If on the first page, move forward by 1
      if (prev === 1) return prev + 1;

      // Move forward by 1 if single-page mode is active, otherwise by 2
      return isSinglePage ? prev + 1 : prev + 2;
    });
  };

  const prevPage = () => {
    setPage((prev) => {
      const isFirstPage = prev === 1;
      if (isFirstPage) return prev; // Prevent going before the first page

      // If on page 2, move back by 1
      if (prev === 2) return prev - 1;

      // Move back by 1 if single-page mode is active, otherwise by 2
      return isSinglePage ? prev - 1 : prev - 2;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100vh]">
      {/* Cover */}
      {page === 1 && (
        <button
          onClick={nextPage}
          className="leather w-full max-w-[500px] aspect-[3/4] bg-amber-950 cursor-pointer rounded-r-2xl shadow-2xl drop-shadow-xl"
        >
          <div className="p-8">
            <h1 className="text-white text-2xl font-bold">Guestbook</h1>
          </div>
        </button>
      )}

      {page > 1 && (
        <div className="leather w-full max-w-[1000px] aspect-[4/3] bg-amber-950 flex rounded-lg @container drop-shadow-xl">
          {/* Left Page */}
          <div
            style={{
              backgroundImage: `url(${
                process.env.NEXT_PUBLIC_API_BASE_PATH || ""
              }/images/textures/paper.png)`,
              boxShadow: "5px 3px 5px black",
            }}
            className="relative rounded-l-lg @max-[1000px]:rounded-r-lg bg-yellow-100 w-full my-6 p-2 ml-6 @max-[1000px]:mr-6 drop-shadow-[10px_0px_5px_rgba(50,50,50,.1)] z-10"
          >
            <h2 className="text-lg font-bold text-center">
              {page > 2 ? `Page ${page - 1}` : `Guest book ${page}`}
            </h2>
            {page == 2 && <div className="border-2 p-2 m-2 h-[90%]">hello</div>}
            {page > 2 &&
              paginatedEntries[page - 2]?.map((entry, index) => (
                <div key={index} className="border-2 p-2 m-2">
                  <p className="text-sm">{entry.date}</p>
                  <p className="font-bold">{entry.name}</p>
                  <p className="text-sm">{entry.message}</p>
                </div>
              ))}
            {isSinglePage && page > 2 && (
              <form className="border-2 p-2 m-2">
                <p className="text-sm">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={newEntry.name}
                  onChange={(e) => handleInputChange(e, "name")}
                  className="font-bold block w-full"
                />
                <textarea
                  type="text"
                  placeholder="Message"
                  value={newEntry.message}
                  onChange={(e) => handleInputChange(e, "message")}
                  className=" text-sm w-full"
                />
              </form>
            )}
            {/* Click Box to go back */}
            <span
              onClick={prevPage}
              className="absolute left-0 top-0 w-[20px] h-full bg-red-400 opacity-0 cursor-pointer"
            ></span>
            {/* Click Box to go forward */}
            <span
              onClick={nextPage}
              className="absolute right-0 top-0 w-[20px] h-full bg-red-400 opacity-0 cursor-pointer @min-[1000px]:hidden"
            ></span>
          </div>

          {/* Right Page */}
          <div
            style={{
              backgroundImage: `url(${
                process.env.NEXT_PUBLIC_API_BASE_PATH || ""
              }/images/textures/paper.png)`,
              boxShadow: "5px 3px 5px black",
            }}
            className="relative rounded-r-lg bg-yellow-100 w-full my-6 p-2 mr-6 @max-[1000px]:hidden"
          >
            <h2 className="text-lg font-bold text-center">Page {page}</h2>
            {paginatedEntries[page - 1]?.map((entry, index) => (
              <div key={index} className="border-2 p-2 m-2">
                <p className="text-sm">{entry?.date}</p>
                <p className="font-bold">{entry?.name}</p>
                <p className="text-sm">{entry?.message}</p>
              </div>
            ))}

            {paginatedEntries[page - 1] === paginatedEntries.length &&
              paginatedEntries[page - 1].slice(paginatedEntries.length)?.map((entry, index) => (
                <div key={index} className="border-2 p-2 m-2">
                  TEST
                  <p className="text-sm">{entry?.date}</p>
                  <p className="font-bold">{entry?.name}</p>
                  <p className="text-sm">{entry?.message}</p>
                </div>
              ))}

            {/* Check in a guest Form */}
            {page == paginatedEntries.length && (
              <form className="border-2 p-2 m-2">
                <p className="text-sm">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={newEntry.name}
                  onChange={(e) => handleInputChange(e, "name")}
                  className="font-bold block w-full"
                />
                <textarea
                  type="text"
                  placeholder="Message"
                  value={newEntry.message}
                  onChange={(e) => handleInputChange(e, "message")}
                  className=" text-sm w-full"
                />
              </form>
            )}

            {/* Click Box to go forward */}
            <span
              onClick={nextPage}
              className="absolute right-0 top-0 w-[20px] h-full bg-red-400 opacity-0 cursor-pointer"
            ></span>
          </div>
        </div>
      )}
    </div>
  );
}
