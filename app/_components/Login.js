"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import Input from "./Input";
import { HiArrowLongRight } from "react-icons/hi2";
import { useUser } from "../_context/UserContext";

export default function Login() {
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const { dispatch } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({ type: "login", payload: formData });

    router.push("/account");
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <Input placeholder="user" name="user" onData={setFormData} />
      <Input placeholder="PIN" name="pin" onData={setFormData} />
      <Button type="submit" className="self-center">
        <HiArrowLongRight className="text-4xl" />
      </Button>
    </form>
  );
}
