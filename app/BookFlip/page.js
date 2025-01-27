"use client";
import { useState } from "react";
const entries = [
  { date: "1/27/25", name: "Homer Simpson", message: "Mmm... art. Almost as good as donuts!" },
  { date: "1/27/25", name: "Darth Vader", message: "Impressive. Most impressive." },
  { date: "1/27/25", name: "Tony Stark", message: "This place has class... almost as much as me." },
  { date: "1/27/25", name: "Yoda", message: "Great gallery, this is. Inspired, I am." },
  { date: "1/27/25", name: "Deadpool", message: "10/10 would break the fourth wall again!" },
  { date: "1/27/25", name: "Sherlock Holmes", message: "Elementary, my dear artist." },
  { date: "1/27/25", name: "Walter White", message: "You're goddamn right this art is amazing." },
  { date: "1/27/25", name: "Patrick Star", message: "Is mayonnaise an art?" },
  { date: "1/27/25", name: "The Joker", message: "Why so... artistic?" },
  {
    date: "1/27/25",
    name: "Frodo Baggins",
    message: "One does not simply walk past this gallery!",
  },
  {
    date: "1/27/25",
    name: "Michael Scott",
    message:
      "Would I rather be feared or loved? Easy. I want people to love my art while fearing its brilliance.",
  },
  {
    date: "1/27/25",
    name: "Gandalf",
    message:
      "A wizard is never late to an art exhibition, nor is he early. He arrives precisely when he means to!",
  },
  {
    date: "1/27/25",
    name: "Bugs Bunny",
    message: "Ehh... what’s up with all this beautiful art, doc?",
  },
  { date: "1/27/25", name: "Marty McFly", message: "Great Scott! This art belongs in the future!" },
  {
    date: "1/27/25",
    name: "Spock",
    message: "Fascinating. The logic of these compositions is unparalleled.",
  },
  {
    date: "1/27/25",
    name: "Jack Sparrow",
    message: "This gallery needs more rum... but otherwise, I approve.",
  },
  { date: "1/27/25", name: "Mario", message: "It’s-a me, Mario! And I-a love-a this art!" },
  { date: "1/27/25", name: "The Mandalorian", message: "This is the way... to great art." },
  { date: "1/27/25", name: "Thanos", message: "Perfectly balanced, as all great art should be." },
  {
    date: "1/27/25",
    name: "Bob Ross",
    message: "There are no mistakes, only happy little brushstrokes.",
  },
];

export default function FlipBook() {
  const [page, setPage] = useState(1);
  const entriesPerPage = 4;

  const paginatedEntries = [];
  for (let i = 0; i < entries.length; i += entriesPerPage) {
    paginatedEntries.push(entries.slice(i, i + entriesPerPage));
  }

  const nextPage = () => {
    if (page < paginatedEntries.length) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Cover */}
      {page === 1 && (
        <div
          onClick={nextPage}
          className="w-full max-w-[500px] aspect-[3/4] bg-amber-950 cursor-pointer"
        >
          <h1 className="text-white text-2xl font-bold">Guestbook</h1>
        </div>
      )}

      {page > 1 && (
        <div className="w-full max-w-[1000px] aspect-[4/3] bg-amber-950 flex rounded-lg @container">
          {/* Left Page */}
          <div className="relative p-3 rounded-lg bg-yellow-100 my-4 mr-2 ml-4 w-full border-2">
            <h2 className="text-lg font-bold text-center">Page {page}</h2>
            {paginatedEntries[page - 2]?.map((entry, index) => (
              <div key={index} className="border-2 p-2 m-2">
                <p className="text-sm">{entry.date}</p>
                <p className="font-bold">{entry.name}</p>
                <p className="text-sm">{entry.message}</p>
              </div>
            ))}
            {/* Click Box to go back */}
            <span
              onClick={prevPage}
              className="absolute left-0 top-0 w-1/6 h-full bg-red-400 opacity-50 cursor-pointer"
            ></span>
            {/* Click Box to go forward */}
            <span
              onClick={nextPage}
              className="absolute right-0 top-0 w-1/6 h-full bg-red-400 opacity-50 cursor-pointer @min-[1000px]:hidden"
            ></span>
          </div>

          {/* Right Page */}
          <div className="relative p-3 rounded-lg bg-blue-500 my-4 mr-4 ml-2 w-full border-2  @max-[1000px]:hidden">
            <h2 className="text-lg font-bold text-center">Page {page + 1}</h2>
            {paginatedEntries[page - 1]?.map((entry, index) => (
              <div key={index} className="border-2 p-2 m-2">
                <p className="text-sm">{entry.date}</p>
                <p className="font-bold">{entry.name}</p>
                <p className="text-sm">{entry.message}</p>
              </div>
            ))}
            {/* Click Box to go forward */}
            <span
              onClick={nextPage}
              className="absolute right-0 top-0 w-1/6 h-full bg-red-400 opacity-50 cursor-pointer"
            ></span>
          </div>
        </div>
      )}
    </div>
  );
}
