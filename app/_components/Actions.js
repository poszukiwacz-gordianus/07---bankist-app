"use client";

import ActionCard from "./ActionCard";

export default function Actions() {
  return (
    <div className="flex flex-col gap-4">
      <ActionCard title="Transfer money" className="bg-yellow-400">
        <ActionCard.Input type="text" label="Transfer to" />
        <ActionCard.Input type="number" label="Amount" />
        <ActionCard.Button />
      </ActionCard>

      <ActionCard title="Request loan" className="bg-green-600">
        <ActionCard.Input type="number" label="Amount" />
        <ActionCard.Button />
      </ActionCard>

      <ActionCard title="Close account" className="bg-red-600">
        <ActionCard.Input type="text" label="Confirm user" />
        <ActionCard.Input type="text" label="Confirm PIN" />
        <ActionCard.Button />
      </ActionCard>
    </div>
  );
}
