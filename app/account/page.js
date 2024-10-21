"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Account from "../_components/Account";
import Footer from "../_components/Footer";
import { useUser } from "../_context/UserContext";

export default function Page() {
  const router = useRouter();
  const {
    state: { currentUser },
  } = useUser();

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  if (!currentUser) return null;

  return (
    <>
      <Account currentUser={currentUser} />
      <Footer />
    </>
  );
}
