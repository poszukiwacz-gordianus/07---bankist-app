"use client";

import { useEffect, useRef, useState } from "react";
import { formatTime } from "@/app/_lib/helpers";
import { useUserAccount } from "@/app/_context/UserAccountContext";

export default function SessionTimer() {
  const {
    state: { sessionCounter, currentUser },
    dispatch,
  } = useUserAccount();

  const [counter, setCounter] = useState(sessionCounter);
  const timerRef = useRef(null);

  useEffect(() => {
    // Reset counter when user took action (loan or transfer money)
    if (timerRef.current) clearTimeout(timerRef.current);
    setCounter(sessionCounter);
  }, [currentUser, sessionCounter]);

  useEffect(() => {
    // Countdown timer
    if (counter > 0) {
      timerRef.current = setTimeout(() => setCounter((c) => c - 1), 1000);
      return () => clearTimeout(timerRef.current);
    } else if (counter === 0) {
      // Log out when timer reaches zero
      dispatch({ type: "logout" });
    }
  }, [counter, dispatch]);

  if (!currentUser) return null;

  return (
    <p aria-live="polite">
      You will be logged out in{" "}
      <span className="font-bold">{formatTime(counter)}</span>
    </p>
  );
}
