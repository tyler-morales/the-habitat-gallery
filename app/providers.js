"use client";

import { TicketProvider } from "./contexts/TicketContext";

export function Providers({ children }) {
  return <TicketProvider>{children}</TicketProvider>;
}
