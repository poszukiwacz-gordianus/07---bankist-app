"use client";
import { useEffect, useState } from "react";
import { formatTime } from "../_lib/helpers";
import { useUser } from "../_context/UserContext";

export default function LogoutCounter() {
  const [counter, setCounter] = useState(10 * 60);
  const { dispatch } = useUser();

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter((c) => c - 1), 1000);
      return () => clearTimeout(timer);
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
