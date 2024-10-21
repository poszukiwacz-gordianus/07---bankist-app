"use client";
import BeforeLogin from "../Auth/BeforeLogin";
import AfterLogin from "../Auth/AfterLogin";
import { useUserAccount } from "../../_context/UserAccountContext";

export default function Header() {
  const {
    state: { currentUser },
  } = useUserAccount();
  return (
    <header>
      {currentUser ? <AfterLogin user={currentUser.owner} /> : <BeforeLogin />}
    </header>
  );
}
