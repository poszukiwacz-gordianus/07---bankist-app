"use client";
import { account1 } from "@/public/data";
import ActionCard from "../_components/ActionCard";
import MainHeader from "../_components/MainHeader";
import Operations from "../_components/Operations";
import Actions from "../_components/Actions";
import Footer from "../_components/Footer";

export default function Page() {
  const { movements, interestRate } = account1;
  const balance = movements.reduce((acc, mov) => acc + mov.amount, 0);

  return (
    <>
      <div className="flex flex-col gap-6 px-4 py-4">
        <MainHeader balance={balance} />

        <div className="py-4">
          <Operations operations={movements} />
        </div>

        <Actions />
      </div>

      <Footer />
    </>
  );
}
