"use client";
import MainHeader from "../_components/MainHeader";
import Operations from "../_components/Operations";
import Actions from "../_components/Actions";
import Sort from "../_components/Sort";
import { useUser } from "../_context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Account() {
  const router = useRouter();
  const {
    state: { currentUser },
  } = useUser();
  let [sortMovements, setSortMovements] = useState(
    currentUser?.movements ? [...currentUser.movements] : [],
  );
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
          <Operations operations={sortMovements} />
          <Sort arr={sortMovements} onSet={setSortMovements} />
        </div>

        <Actions />
      </div>
    </>
  );
}
