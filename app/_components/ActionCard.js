import { createContext, useContext, useState } from "react";
import useCloseOnOutsideInteraction from "../_hooks/useCloseOnOutsideInteraction";
import Button from "./Button";

const ActionContext = createContext();

function ActionCard({ children, title, type, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const ref = useCloseOnOutsideInteraction(() => setIsOpen(false));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // dispatch({ type: type, payload: formData });
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <ActionContext.Provider value={{ handleInputChange }}>
      <div
        className={`${className} overflow-hidden rounded-lg p-6 transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[500px]" : "max-h-[60px]"
        }`}
        onClick={() => setIsOpen(true)}
        ref={ref}
      >
        <h4
          className={`mb-3 ${isOpen || "-translate-y-2"} text-center text-xl font-medium transition-all duration-500`}
        >
          {title}
        </h4>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {children}
        </form>
      </div>
    </ActionContext.Provider>
  );
}

function Input({ type, label, name }) {
  const [inputValue, setInputValue] = useState("");
  const { handleInputChange } = useContext(ActionContext);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    handleInputChange(name, e.target.value);
  };

  return (
    <div>
      <label className="hidden text-lg">{label}</label>
      <input
        type={type}
        value={inputValue}
        className="w-full appearance-none rounded-lg px-4 py-2 text-lg"
        placeholder={label}
        onWheel={(e) => e.target.blur()}
        onChange={handleChange}
        required
      />
    </div>
  );
}

function ActionButton() {
  return <Button type="submit" />;
}

ActionCard.Input = Input;
ActionCard.ActionButton = ActionButton;

export default ActionCard;
