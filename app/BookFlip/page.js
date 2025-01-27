"use client";
import { useEffect, useRef, useState } from "react";
import { PageFlip } from "page-flip";

const pagesData = [
  { id: "cover-top", title: "BOOK TITLE", isCover: true },
  { id: 1, header: "Page 1", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id: 2, header: "Page 2", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id: 3, header: "Page 3", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id: 4, header: "Page 4", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id: 5, header: "Page 5", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id: "cover-bottom", title: "THE END", isCover: true },
];

export default function FlipBook() {
  const bookRef = useRef(null);
  const flipBookRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(pagesData.length / 2));

  useEffect(() => {
    if (bookRef.current) {
      flipBookRef.current = new PageFlip(bookRef.current, {
        width: 1100, // Adjust for two pages
        height: 733,
        size: "stretch",
        minWidth: 600,
        maxWidth: 1200,
        minHeight: 420,
        maxHeight: 1350,
        maxShadowOpacity: 0.5,
        showCover: true,
        mobileScrollSupport: false,
        useMouseEvents: true,
        flippingTime: 800,
        autoSize: true,
      });

      flipBookRef.current.loadFromHTML(document.querySelectorAll(".page"));

      setTotalPages(Math.ceil(flipBookRef.current.getPageCount() / 2));

      flipBookRef.current.on("flip", (e) => {
        setCurrentPage(Math.ceil((e.data + 1) / 2));
      });

      return () => {
        flipBookRef.current.destroy();
      };
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Controls */}
      <div className="flex items-center space-x-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => flipBookRef.current.flipPrev()}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>

        <span>
          [{currentPage} of {totalPages}]
        </span>

        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => flipBookRef.current.flipNext()}
          disabled={currentPage === totalPages}
        >
          Next Page
        </button>
      </div>

      {/* Flip Book */}
      <div className="relative w-[1100px] h-[733px] bg-gray-100 shadow-lg rounded-md overflow-hidden">
        <div className="flip-book" ref={bookRef}>
          {pagesData.map((page, index) => (
            <div
              key={index}
              className={`page ${page.isCover ? "page-cover" : ""}`}
              data-density={page.isCover ? "hard" : "soft"}
            >
              <div className="page-content flex flex-col justify-center items-center h-full p-6">
                {page.isCover ? (
                  <h2 className="text-3xl font-bold">{page.title}</h2>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold">{page.header}</h2>
                    <p className="text-sm text-gray-700 mt-4">{page.text}</p>
                    <div className="mt-auto text-right text-gray-500">Page {page.id}</div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
