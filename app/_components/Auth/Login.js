"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "../Components";
import { useUserAccount } from "../../_context/UserAccountContext";
import { validateFormData } from "@/app/_lib/helpers";
import { HiArrowLongRight } from "react-icons/hi2";

export default function Login() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  const router = useRouter();
  const {
    state: { accounts },
    dispatch,
  } = useUserAccount();

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateFormData("login", formData, accounts);

    if (!validationError) {
      dispatch({ type: "login", payload: formData });
      setError("");
      router.push("/account");
    } else {
      setError(validationError);
    }
  };

  return (
    <>
      <p className="text-red-500 sm:ml-auto">{error}</p>
      <form
        className="flex flex-col gap-2 sm:flex-row sm:gap-1"
        onSubmit={handleSubmit}
      >
        <Input placeholder="user" name="user" onData={setFormData} />
        <Input
          placeholder="PIN"
          name="pin"
          type="password"
          onData={setFormData}
        />
        <Button type="submit" className="self-center">
          <HiArrowLongRight className="text-4xl" />
        </Button>
      </form>
    </>
  );
}
