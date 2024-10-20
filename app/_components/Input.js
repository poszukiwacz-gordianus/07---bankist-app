"use client";

import { useState } from "react";

export default function Input({ name, onData, placeholder }) {
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
      placeholder={placeholder}
      value={input}
      onChange={handleChange}
      name={name}
      className="rounded-full bg-white py-3 text-center"
    />
  );
}
