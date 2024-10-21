"use client";
import { useEffect, useRef, useState } from "react";
import { formatTime } from "../_lib/helpers";
import { useUser } from "../_context/UserContext";

export default function LogoutCounter() {
  const {
    state: { sessionCounter, currentUser },
    dispatch,
  } = useUser();

  const [counter, setCounter] = useState(sessionCounter);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCounter(sessionCounter);
  }, [currentUser, sessionCounter]);

  useEffect(() => {
    if (counter > 0) {
      timerRef.current = setTimeout(() => setCounter((c) => c - 1), 1000);
      return () => clearTimeout(timerRef.current);
    } else {
      dispatch({ type: "logout" });
    }
  }, [counter, dispatch]);

  return (
    <p>
      You will be logged out in{" "}
      <span className="font-bold">{formatTime(counter)}</span>
    </p>
  );
}
