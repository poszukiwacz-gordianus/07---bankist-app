"use client";

import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import Button from "./Button";
import { useUser } from "../_context/UserContext";
import { useRouter } from "next/navigation";

export default function Logout() {
  const { setCurrentUser } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    setCurrentUser(null);
    router.push("/");
  };

  return (
    <Button className="ml-auto" onClick={handleLogout}>
      <HiOutlineArrowLongLeft className="text-4xl" />
    </Button>
  );
}
