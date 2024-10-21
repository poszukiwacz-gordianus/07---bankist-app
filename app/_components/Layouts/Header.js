"use client";

import { AfterLogin, BeforeLogin } from "../Components";
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
