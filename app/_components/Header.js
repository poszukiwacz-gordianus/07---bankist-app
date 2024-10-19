"use client";
import BeforeLogin from "./BeforeLogin";
import AfterLogin from "./AfterLogin";
import { useUser } from "../_context/UserContext";

export default function Header() {
  const { currentUser } = useUser();
  return (
    <header>
      {currentUser ? <AfterLogin user={currentUser.owner} /> : <BeforeLogin />}
    </header>
  );
}
