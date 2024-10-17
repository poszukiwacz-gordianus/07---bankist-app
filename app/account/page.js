import { account1 } from "@/public/data";
import ActionCard from "../_components/ActionCard";
import MainHeader from "../_components/MainHeader";
import Operations from "../_components/Operations";

export default function Page() {
  const { movements, interestRate } = account1;
  const balance = movements.reduce((acc, mov) => acc + mov.amount, 0);

  return (
    <>
      <div className="px-4 py-6">
        <MainHeader balance={balance} />

        <div className="py-10">
          <Operations operations={movements} />

          {/* <div>
            <ActionCard title="Transfer money" className="bg-yellow-600">
              <ActionCard.Input type="text" />
              <ActionCard.Label label="Transfer to" />
              <ActionCard.Input type="number" />
              <ActionCard.Label label="Amount" />
              <ActionCard.Button content="ok" />
            </ActionCard>

            <ActionCard title="Request loan" className="bg-green-600">
              <ActionCard.Input type="number" />
              <ActionCard.Label label="Amount" />
              <ActionCard.Button content="ok" />
            </ActionCard>

            <ActionCard title="Close account" className="bg-red-600">
              <ActionCard.Input type="text" />
              <ActionCard.Label label="Confirm user" />
              <ActionCard.Input type="text" />
              <ActionCard.Label label="Confirm PIN" />
              <ActionCard.Button content="ok" />
            </ActionCard>
          </div> */}
        </div>
      </div>

      {/* <div>
        <p>in XXXXXXX</p> <p>out XXXXXX</p> <p>interest XXXX</p>
        <button>sort</button>
        <p>You will be logged out in 10:00--</p>
      </div> */}
    </>
  );
}
