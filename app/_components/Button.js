"use client";

import { HiOutlineArrowLongRight } from "react-icons/hi2";

export default function Button({
  children = (
    <HiOutlineArrowLongRight className="w-full text-4xl md:text-xl lg:w-10" />
  ),
  onClick,
  className,
  type = "button",
}) {
  return (
    <button
      type={type}
      className={`${className} hover:text-white lg:hover:bg-slate-200 lg:hover:text-black`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
