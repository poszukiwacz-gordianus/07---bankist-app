"use client";
import MainHeader from "../_components/MainHeader";
import Operations from "../_components/Operations";
import Actions from "../_components/Actions";
import Footer from "../_components/Footer";
import { useUser } from "../_context/UserContext";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { currentUser } = useUser();
  const balance = currentUser?.movements?.reduce(
    (acc, mov) => acc + mov.amount,
    0,
  );

  if (!currentUser) return router.push("/");

  return (
    <>
      <div className="flex flex-col gap-6 px-4 py-4">
        <MainHeader balance={balance} />

        <div className="py-4">
          <Operations operations={currentUser?.movements} />
        </div>

        <Actions />
      </div>

      <Footer />
    </>
  );
}
