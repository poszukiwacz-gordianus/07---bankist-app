"use client";

import { HiOutlineArrowLongRight } from "react-icons/hi2";

export default function Button({
  children = <HiOutlineArrowLongRight className="w-full text-4xl" />,
  onClick,
  className,
  type = "button",
}) {
  return (
    <button
      type={type}
      className={`${className} hover:text-white`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
