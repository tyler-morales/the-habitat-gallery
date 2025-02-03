"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// Create Context
const TicketContext = createContext();

// Context Provider
export const TicketProvider = ({ children }) => {
  const [userTicket, setUserTicket] = useState(null); // ticket ** OBJ **
  const [hasTicket, setHasTicket] = useState(false); // user "bought" ticket at Ticket Desk ** BOOLEAN VALUE **

  useEffect(() => {
    if (typeof window === "undefined") return;

    const userTicket = localStorage.getItem("userTicket");
    const storedHasTicket = localStorage.getItem("storedTicket");

    if (userTicket) {
      setUserTicket(JSON.parse(userTicket)); // set local storage to this ticket
    } else {
      generateTicket(); // If no ticket exists, generate one
    }

    // Load ticket from local storage
    if (userTicket) {
      setUserTicket(JSON.parse(userTicket));
    } else {
      generateTicket();
    }

    // Set has ticket to true if a user "bought" a ticket
    if (hasTicket) {
      localStorage.setItem("storedTicket", JSON.stringify(true)); // Ensure storage consistency
    }

    setHasTicket(storedHasTicket);
  }, [hasTicket]);

  // ✅ Generates a new ticket if needed
  const generateTicket = () => {
    const newTicket = {
      date: new Date().toISOString(),
      type: "Free",
      order_id: uuidv4(),
    };

    setUserTicket(newTicket);
    localStorage.setItem("userTicket", JSON.stringify(newTicket)); // Ensure storage consistency
  };

  return (
    <TicketContext.Provider value={{ userTicket, hasTicket, setHasTicket }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTicket = () => useContext(TicketContext);
