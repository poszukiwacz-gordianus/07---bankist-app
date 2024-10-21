"use client";

import { useRouter } from "next/navigation";
import { Button } from "../Components";
import { useUserAccount } from "../../_context/UserAccountContext";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";

export default function Logout() {
  const { dispatch } = useUserAccount();
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
