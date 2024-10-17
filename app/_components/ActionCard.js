import { useState } from "react";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import useCloseOnOutsideInteraction from "../_hooks/useCloseOnOutsideInteraction";

function ActionCard({ children, title, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useCloseOnOutsideInteraction(() => setIsOpen(false));

  return (
    <div
      className={`${className} overflow-hidden rounded-lg p-6 transition-all duration-500 ease-in-out ${
        isOpen ? "max-h-[500px]" : "max-h-[60px]"
      }`}
      onClick={() => setIsOpen(true)}
      ref={ref}
    >
      <h4
        className={`mb-3 ${isOpen || "-translate-y-3"} text-center text-2xl font-medium transition-all duration-500`}
      >
        {title}
      </h4>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

function Input({ type, label }) {
  return (
    <div>
      <label className="hidden text-lg">{label}</label>
      <input
        type={type}
        className="w-full appearance-none rounded-lg px-4 py-2 text-lg"
        placeholder={label}
        onWheel={(e) => e.target.blur()}
      />
    </div>
  );
}

function Button() {
  return (
    <button className="rounded-lg hover:bg-opacity-20 hover:text-white">
      <HiOutlineArrowLongRight className="h-10 w-full" />
    </button>
  );
}

ActionCard.Input = Input;
ActionCard.Button = Button;

export default ActionCard;
