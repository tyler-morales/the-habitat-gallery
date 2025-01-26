import React from "react";

export default function CheckInModal({ checkInRef }) {
  return (
    <dialog ref={checkInRef} className="p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-xl font-bold mb-2">Welcome to the Check-In Desk!</h2>
      <p className="mb-4">Would you like to sign the guestbook?</p>
      <button
        onClick={() => checkInRef.current.close()}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Close
      </button>
    </dialog>
  );
}
