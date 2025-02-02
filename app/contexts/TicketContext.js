"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// Create Context
const TicketContext = createContext();

// Context Provider
export const TicketProvider = ({ children }) => {
  const [userTicket, setUserTicket] = useState(null);
  const [hasTicket, setHasTicket] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedTicket = localStorage.getItem("userTicket");
    const storedHasTicket = localStorage.getItem("storedTicket");

    if (storedTicket) {
      setUserTicket(JSON.parse(storedTicket));
    } else {
      generateTicket(); // If no ticket exists, generate one
    }
    if (!storedHasTicket && hasTicket) {
      localStorage.setItem("storedTicket", JSON.stringify(true));
      setHasTicket(true);
    }
  }, [hasTicket]);

  // ✅ Generates a new ticket if needed
  const generateTicket = () => {
    const newTicket = {
      date: new Date().toISOString(),
      type: "Free",
      order_id: uuidv4(),
    };

    localStorage.setItem("userTicket", JSON.stringify(newTicket));
    setUserTicket(newTicket);
  };

  return (
    <TicketContext.Provider value={{ userTicket, hasTicket, setHasTicket }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTicket = () => useContext(TicketContext);
