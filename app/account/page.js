"use client";
import MainHeader from "../_components/MainHeader";
import Operations from "../_components/Operations";
import Actions from "../_components/Actions";
import Footer from "../_components/Footer";
import { useUser } from "../_context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Button from "../_components/Button";

export default function Page() {
  const router = useRouter();
  const {
    state: { currentUser },
  } = useUser();
  const balance = currentUser?.movements?.reduce(
    (acc, mov) => acc + mov.amount,
    0,
  );

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  if (!currentUser) return null;

  return (
    <>
      <div className="flex flex-col gap-6 p-4 md:grid md:grid-cols-[1.5fr_1fr] lg:mx-auto lg:max-w-screen-lg lg:grid-cols-[1.25fr_0.75fr] lg:gap-x-5 lg:gap-y-10 lg:px-10 lg:py-8">
        <MainHeader balance={balance} />

        <div className="py-4 md:py-0">
          <Operations operations={currentUser?.movements} />
          <Button className="pt-3">Sort</Button>
        </div>

        <Actions />
      </div>

      <Footer />
    </>
  );
}
