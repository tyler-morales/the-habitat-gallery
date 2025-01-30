"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import data from "../../public/data/guestBook";

export default function GuestBook({ page, setPage, toggleBook }) {
  const [paginatedEntries, setPaginatedEntries] = useState();
  const [isSinglePage, setIsSinglePage] = useState(false);
  const [newEntry, setNewEntry] = useState({
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    name: "",
    message: "",
    userFlag: true,
  });

  // Update guest's entry
  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setNewEntry((prev) => ({ ...prev, [field]: value }));

    setPaginatedEntries((prevPaginated) => {
      return prevPaginated.map((page, pageIndex) =>
        pageIndex === prevPaginated.length - 1
          ? [...page.slice(0, -1), { ...page[page.length - 1], [field]: value }]
          : page
      );
    });
  };

  // Convert ALL entries into paginated data
  const paginateData = (data) => {
    const pageSize = 5;
    const result = [];
    for (let i = 0; i < data.length; i += pageSize) {
      result.push(data.slice(i, i + pageSize));
    }

    // Ensure form is on the last page, respecting `pageSize`
    if (result.length > 0 && result[result.length - 1].length < pageSize) {
      result[result.length - 1].push(newEntry);
    } else {
      result.push([newEntry]);
    }

    return result;
  };

  useEffect(() => {
    setPaginatedEntries(paginateData(data));
    const updateScreenSize = () => {
      setIsSinglePage(window.innerWidth < 800);
    };
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

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
    <div className="flex justify-center items-end h-full">
      {/* Cover */}
      {page === 1 && (
        <button
          onClick={toggleBook}
          className="cursor-pointer leather w-full max-w-[350px] h-[450px]  bg-amber-950 rounded-r-2xl shadow-2xl drop-shadow-xl"
        >
          <div className="p-8">
            <h1 className="text-white text-2xl font-bold">Guestbook</h1>
          </div>
        </button>
      )}

      {page > 1 && (
        <div className="leather w-full max-w-[800px] bg-amber-950 flex rounded-lg @container drop-shadow-xl">
          {/* Left Page */}
          <div
            style={{
              backgroundImage: `url(${
                process.env.NEXT_PUBLIC_API_BASE_PATH || ""
              }/images/textures/paper.png)`,
              boxShadow: "5px 3px 5px black",
            }}
            className="scroll-hidden overflow-y-scroll relative rounded-l-lg @max-[800px]:rounded-r-lg bg-yellow-100 w-full my-6 p-2 @max-[800px]:p-6 ml-6 @max-[800px]:ml-4 @max-[800px]:mr-6 drop-shadow-[10px_0px_5px_rgba(50,50,50,.1)] z-10"
          >
            <h2 className="text-lg font-bold text-center">Page {page - 1}</h2>
            {page > 1 &&
              paginatedEntries[page - 2]?.map(
                (entry, index) =>
                  !entry.userFlag && (
                    <div
                      key={index}
                      className={`nanum-pen-script-regular ${
                        index + 1 == paginatedEntries[page - 2].length ? "border-b-0" : "border-b-2"
                      } border-orange-950 p-2 m-3 mx-2 w-[90%] @min-[800px]:m-auto`}
                    >
                      <p className="text-lg">{entry.date}</p>
                      <p className="text-2xl font-bold">{entry.name}</p>
                      <p className="text-lg">{entry.message}</p>
                    </div>
                  )
              )}
            {/* Form only on the last page */}
            {page - 1 === paginatedEntries.length && (
              <form
                className={`nanum-pen-script-regular border-orange-950 p-2 m-3 mx-2 w-[90%] @min-[800px]:m-auto`}
              >
                <p className="text-sm">{newEntry.date}</p>
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
                  className="text-sm w-full"
                />
              </form>
            )}
            {/* Click Box to go back */}
            <div
              onClick={prevPage}
              className="absolute left-0 top-0 w-[20px] h-full cursor-pointer flex items-center group"
            >
              <span className="block text-2xl opacity-40 transition-all group-hover:opacity-100 @min-w-[1000px]:ml-2 ml-1">
                «
              </span>
            </div>

            {/* Click Box to go forward */}
            <div
              onClick={nextPage}
              className="absolute right-0 top-0 w-[20px] h-full cursor-pointer flex items-center group @min-[800px]:hidden"
            >
              <span className="block text-2xl opacity-40 transition-all group-hover:opacity-100">
                »
              </span>
            </div>
          </div>

          {/* Right Page */}
          <div
            style={{
              backgroundImage: `url(${
                process.env.NEXT_PUBLIC_API_BASE_PATH || ""
              }/images/textures/paper.png)`,
              boxShadow: "5px 3px 5px black",
            }}
            className="scroll-hidden overflow-y-scroll relative rounded-r-lg bg-yellow-100 w-full my-6 p-2 mr-6 @max-[800px]:hidden"
          >
            <h2 className="text-lg font-bold text-center">Page {page}</h2>
            {page > 1 &&
              page - 1 != paginatedEntries.length &&
              paginatedEntries[page - 1]?.map(
                (entry, index) =>
                  !entry.userFlag && (
                    <div
                      key={index}
                      className={`nanum-pen-script-regular ${
                        index + 1 == paginatedEntries[page - 2].length ? "border-b-0" : "border-b-2"
                      } border-orange-950 p-2 m-3 mx-2 w-[90%] @min-[800px]:m-auto`}
                    >
                      <p className="text-lg">{entry.date}</p>
                      <p className="font-bold text-2xl">{entry.name}</p>
                      <p className="text-lg">{entry.message}</p>
                    </div>
                  )
              )}

            {/* Form only on the last page */}
            {page === paginatedEntries.length && (
              <form
                className={`nanum-pen-script-regular border-orange-950 p-2 m-3 mx-2 w-[90%] @min-[800px]:m-auto`}
              >
                <p className="text-lg">{newEntry.date}</p>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={newEntry.name}
                  onChange={(e) => handleInputChange(e, "name")}
                  className="font-bold block w-full text-2xl"
                />
                <textarea
                  type="text"
                  placeholder="Message"
                  value={newEntry.message}
                  onChange={(e) => handleInputChange(e, "message")}
                  className="text-lg w-full"
                />
              </form>
            )}

            {/* Click Box to go forward */}
            <div
              onClick={nextPage}
              className="absolute right-0 top-0 w-[20px] h-full cursor-pointer flex items-center group"
            >
              <span className="block text-2xl opacity-40 transition-all group-hover:opacity-100">
                »
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
