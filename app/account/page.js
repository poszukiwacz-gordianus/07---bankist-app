"use client";

import { Account, AccountFooter } from "../_components/Components";
import useAuthRedirect from "../_hooks/useAuthRedirect";

export default function Page() {
  const currentUser = useAuthRedirect();

  if (!currentUser) return null;

  return (
    <>
      <Account currentUser={currentUser} />
      <AccountFooter />
    </>
  );
}
