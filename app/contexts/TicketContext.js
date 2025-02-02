"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// Create Context
const TicketContext = createContext();

// Context Provider
export const TicketProvider = ({ children }) => {
  const [userTicket, setUserTicket] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure we’re in the client

    const storedTicket = localStorage.getItem("userTicket");
    if (storedTicket) {
      setUserTicket(JSON.parse(storedTicket)); // Load existing ticket
    } else {
      generateTicket(); // Generate a new one if none exists
    }
  }, []);

  // Generate and store a new ticket
  const generateTicket = () => {
    const newTicket = {
      date: new Date().toISOString(),
      type: "Free",
      order_id: uuidv4(),
    };

    localStorage.setItem("userTicket", JSON.stringify(newTicket));
    setUserTicket(newTicket);
  };

  return <TicketContext.Provider value={{ userTicket }}>{children}</TicketContext.Provider>;
};

// Custom Hook for accessing Ticket Context
export const useTicket = () => {
  return useContext(TicketContext);
};
