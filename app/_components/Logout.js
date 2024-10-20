"use client";

import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import Button from "./Button";
import { useUser } from "../_context/UserContext";
import { useRouter } from "next/navigation";

export default function Logout() {
  const { dispatch } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    dispatch({ type: "logout" });
    router.push("/");
  };

  return (
    <Button className="ml-auto sm:ml-0" onClick={handleLogout}>
      <HiOutlineArrowLongLeft className="text-4xl" />
    </Button>
  );
}
