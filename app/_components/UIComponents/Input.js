"use client";

import { useState } from "react";

export default function Input({ type = "text", name, onData, placeholder }) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
    onData((prevData) => ({
      ...prevData,
      [name]: e.target.value,
    }));
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={input}
      onChange={handleChange}
      name={name}
      className="rounded-full bg-white py-3 text-center sm:w-20 sm:py-1 sm:text-sm md:w-32"
      required
    />
  );
}
