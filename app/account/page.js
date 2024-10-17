"use client";
import { account1 } from "@/public/data";
import ActionCard from "../_components/ActionCard";
import MainHeader from "../_components/MainHeader";
import Operations from "../_components/Operations";
import Actions from "../_components/Actions";

export default function Page() {
  const { movements, interestRate } = account1;
  const balance = movements.reduce((acc, mov) => acc + mov.amount, 0);

  return (
    <>
      <div className="px-4 py-6">
        <MainHeader balance={balance} />

        <div className="py-10">
          <Operations operations={movements} />
        </div>

        <Actions />
      </div>

      {/* <div>
        <p>in XXXXXXX</p> <p>out XXXXXX</p> <p>interest XXXX</p>
        <button>sort</button>
        <p>You will be logged out in 10:00--</p>
      </div> */}
    </>
  );
}
