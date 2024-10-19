import { createContext, useContext, useEffect, useState } from "react";
import useCloseOnOutsideInteraction from "../_hooks/useCloseOnOutsideInteraction";
import Button from "./Button";
import { useUser } from "../_context/UserContext";
import { validateFormData } from "../_lib/helpers";

const ActionContext = createContext();

function ActionCard({ children, title, type, className }) {
  const { state, dispatch } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [shouldReset, setShouldReset] = useState(false);

  const reset = () => {
    setError("");
    setShouldReset(true);
    setFormData({});
  };

  const ref = useCloseOnOutsideInteraction(() => {
    setIsOpen(false);
    reset();
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationError = validateFormData(type, formData, state);

    if (!validationError) {
      dispatch({ type, payload: formData });
      reset();
    } else {
      setError(validationError);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetInputs = () => {
    setShouldReset(false);
  };

  return (
    <ActionContext.Provider
      value={{ error, handleInputChange, shouldReset, resetInputs }}
    >
      <div
        className={`${className} overflow-hidden rounded-lg p-6 transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[500px]" : "max-h-[60px] hover:cursor-pointer"
        }`}
        onClick={() => setIsOpen(true)}
        ref={ref}
      >
        <h4
          className={`mb-3 ${isOpen || "-translate-y-2"} text-center text-xl font-medium transition-all duration-500`}
        >
          {title}
        </h4>
        <p
          className={`${error === "" ? "hidden" : "block"} text-center text-base font-bold text-stone-950`}
        >
          {error}
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {children}
        </form>
      </div>
    </ActionContext.Provider>
  );
}

function Input({ type, label, name }) {
  const [inputValue, setInputValue] = useState("");
  const { handleInputChange, shouldReset, resetInputs } =
    useContext(ActionContext);

  const handleChange = (e) => {
    const value = e.target.value;

    setInputValue(value);
    handleInputChange(name, value);
  };

  useEffect(() => {
    if (shouldReset) {
      setInputValue("");
      resetInputs();
    }
  }, [shouldReset, resetInputs]);

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
ActionCard.Button = ActionButton;

export default ActionCard;
