"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTicket } from "../contexts/TicketContext";
import { v4 as uuidv4 } from "uuid";

export default function GuestBook({ page, setPage, toggleBook, setIsExpanded }) {
  const [paginatedEntries, setPaginatedEntries] = useState();
  const { userTicket, updateGuestBookEntry } = useTicket();
  const [isSinglePage, setIsSinglePage] = useState(false);
  const [userEntry, setUserEntry] = useState(null);
  const [newEntry, setNewEntry] = useState({
    id: uuidv4(),
    date: new Date().toISOString(),
    name: "",
    message: "",
    userFlag: true,
  });

  // useEffect(() => {
  //   const updateScreenSize = () => {
  //     setIsSinglePage(window.innerWidth < 800);
  //   };
  //   updateScreenSize();
  //   window.addEventListener("resize", updateScreenSize);
  //   return () => window.removeEventListener("resize", updateScreenSize);
  // }, []);

  // ✅ Load existing guest book entry from ticket (if exists)
  useEffect(() => {
    if (userTicket?.guestBookEntry) {
      setNewEntry(userTicket.guestBookEntry);
    }
  }, []);

  // ✅ Load existing entry from localStorage on first load
  useEffect(() => {
    fetch("/data/guestBook.json") // Load guestbook entries
      .then((res) => res.json())
      .then((data) => {
        const storedEntry = JSON.parse(localStorage.getItem("guestBookEntry"));

        if (storedEntry) {
          setUserEntry(storedEntry);
          setNewEntry(storedEntry);
        }

        // Ensure user's stored entry is included in the guestbook
        const allEntries = storedEntry ? [...data, storedEntry] : data;
        setPaginatedEntries(allEntries);
        // setPaginatedEntries(paginateData(allEntries));
      })
      .catch((err) => console.error("Error loading guestbook:", err));
  }, []);

  // ✅ Debounced save to Local Storage (only saves valid input)
  useEffect(() => {
    const delay = setTimeout(() => {
      if (newEntry.name.trim() && newEntry.message.trim()) {
        localStorage.setItem("guestBookEntry", JSON.stringify(newEntry));
        setUserEntry(newEntry);
        setPaginatedEntries((prev) => paginateData([...prev.flat(), newEntry])); // Update UI
      }
    }, 2000); // Wait 500ms before saving

    return () => clearTimeout(delay); // Clear timeout if user types again
  }, [newEntry]);

  // ✅ Handle input changes and update ticket
  const handleInputChange = (e, field) => {
    const updatedEntry = { ...newEntry, [field]: e.target.value };
    setNewEntry(updatedEntry);

    // Only save if entry has a name and message
    if (updatedEntry.name.trim() && updatedEntry.message.trim()) {
      localStorage.setItem("guestBookEntry", JSON.stringify(updatedEntry));
      updateGuestBookEntry(updatedEntry); // ⬅️ Update Ticket Context
    }
  };

  // ✅ Ensure new entry is always on the last page
  const paginateData = (data) => {
    const pageSize = 5;
    const result = [];
    for (let i = 0; i < data.length; i += pageSize) {
      result.push(data.slice(i, i + pageSize));
    }

    // Ensure the user's entry is always on the last page
    if (!result[result.length - 1]?.includes(newEntry)) {
      result.push([newEntry]);
    }

    return result;
  };

  const nextPage = () => {
    setPage(page + 1);
    // setPage((prev) => {
    //   const isLastPage = prev >= paginatedEntries.length + 1;
    //   if (isLastPage) return prev; // Prevent going beyond the last page
    //   return isSinglePage ? prev + 1 : prev + 2; // Move forward by 1 if single-page mode is active, otherwise by 2
    // });
  };

  const prevPage = () => {
    setPage((prev) => {
      const isFirstPage = prev === 1;

      if (isFirstPage) return prev; // Prevent going before the first page

      // If on page 2, close the book
      if (prev === 2) {
        setIsExpanded(false); // Collapse book
        return 1; // Go back to cover page
      }

      // Move back by 1 if single-page mode is active, otherwise by 2
      return isSinglePage ? prev - 1 : prev - 2;
    });
  };

  // Format Date (MM/DD/YY)
  const formatDate = (date) => {
    const dateObj = new Date(date); // Convert to Date object

    const newDate = dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return newDate;
  };

  return (
    <div className="flex justify-center items-end">
      {/* Cover */}
      {page === 1 && (
        <button
          onClick={toggleBook}
          className="cursor-pointer leather w-full max-w-[350px] h-[450px] bg-amber-950 rounded-r-2xl shadow-2xl drop-shadow-xl"
        >
          <div className="p-8">
            <h1 className="text-white text-2xl font-bold">Guestbook</h1>
          </div>
        </button>
      )}

      {page > 1 && (
        <div className="h-full leather w-full max-w-[800px] bg-amber-950 flex rounded-lg drop-shadow-xl">
          {/* Guestbook Entries Container */}
          <div
            style={{
              backgroundImage: `url(${
                process.env.NEXT_PUBLIC_API_BASE_PATH || ""
              }/images/textures/paper.png)`,
              boxShadow: "5px 3px 5px black",
            }}
            className="relative rounded-lg bg-yellow-100 w-full m-6 p-6 drop-shadow-[10px_0px_5px_rgba(50,50,50,.1)]"
          >
            <h2 className="text-lg font-bold text-center">Page {page - 1}</h2>

            {/* Entries with Multi-Column Layout */}
            <div className="h-[300px] sm:h-[550px] guestbook-entries">
              {page > 1 &&
                // paginatedEntries[page - 2]?.map(
                paginatedEntries?.map(
                  (entry, index) =>
                    !entry.userFlag && (
                      <div
                        key={index}
                        className="nanum-pen-script-regular border-orange-300 p-2 w-full break-inside-avoid border-b-3 border-dashed "
                      >
                        <p className="text-lg">{formatDate(entry.timestamp)}</p>
                        <p className="text-2xl font-bold">{entry.name}</p>
                        <p className="text-lg leading-5">{entry.message}</p>
                      </div>
                    )
                )}
            </div>

            {/* Click Box to go back */}
            <div
              onClick={prevPage}
              className="absolute left-0 top-0 w-[20px] h-full cursor-pointer flex items-center group"
            >
              <span className="block text-2xl opacity-40 transition-all group-hover:opacity-100 ml-2">
                «
              </span>
            </div>

            {/* Click Box to go forward */}
            <div
              onClick={nextPage}
              className="absolute right-0 top-0 w-[20px] h-full cursor-pointer flex items-center group @min-[800px]:hidden"
            >
              <span className="block text-2xl opacity-40 transition-all group-hover:opacity-100">
                {page === paginatedEntries?.length + 1 ? "" : " »"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
