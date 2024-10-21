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
  const [isLoading, setIsLoading] = useState(false);
  const [shouldReset, setShouldReset] = useState(false);

  const reset = () => {
    setError("");
    setShouldReset(true);
    setFormData({});
    setIsLoading(false);
  };

  const ref = useCloseOnOutsideInteraction(() => {
    setIsOpen(false);
    reset();
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationError = validateFormData(type, formData, state);

    if (!validationError) {
      setIsLoading(true);
      const intervalID = setInterval(() => {
        dispatch({ type, payload: formData });
        reset();
        clearInterval(intervalID);
      }, 2000);
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
      value={{ isLoading, error, handleInputChange, shouldReset, resetInputs }}
    >
      <div
        className={`${className} overflow-hidden rounded-lg p-6 shadow-md transition-all duration-500 ease-in-out lg:px-10 lg:py-6 ${
          isOpen
            ? "max-h-[500px]"
            : "max-h-[60px] hover:cursor-pointer md:hover:cursor-auto"
        } md:max-h-[500px]`}
        onClick={() => setIsOpen(true)}
        ref={ref}
      >
        <h4
          className={`mb-3 ${isOpen || "-translate-y-1"} text-center text-base font-medium transition-all duration-500 sm:text-base md:-translate-y-0 md:text-left lg:mb-4`}
        >
          {title}
        </h4>
        <p
          className={`${error === "" ? "hidden" : "block"} mb-2 text-center text-base font-bold text-stone-950`}
        >
          {error}
        </p>
        <form
          className="flex flex-col gap-2 lg:flex-row"
          onSubmit={handleSubmit}
        >
          {children}
        </form>
      </div>
    </ActionContext.Provider>
  );
}

function Input({ type, label, name }) {
  const [inputValue, setInputValue] = useState("");
  const { handleInputChange, shouldReset, resetInputs, isLoading } =
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
      <input
        type={type}
        value={inputValue}
        className="w-full appearance-none rounded-lg px-4 py-1 text-base lg:w-36"
        placeholder={label}
        onWheel={(e) => e.target.blur()}
        onChange={handleChange}
        disabled={isLoading}
        required
      />
      <label className="hidden py-2 text-center text-sm lg:block">
        {label}
      </label>
    </div>
  );
}

function ActionButton() {
  const { isLoading } = useContext(ActionContext);
  return (
    <Button
      type="submit"
      className="md:self-end lg:self-start lg:rounded-lg lg:bg-white lg:px-1 lg:py-[0.38rem]"
      disabled={isLoading}
    />
  );
}

ActionCard.Input = Input;
ActionCard.Button = ActionButton;

export default ActionCard;
