"use client";

import ActionCard from "./ActionCard";

export default function Actions() {
  return (
    <div className="flex flex-col gap-2">
      <ActionCard
        title="Transfer money"
        className="bg-yellow-400"
        type="transfer"
      >
        <ActionCard.Input type="text" label="Transfer to" name="transfer" />
        <ActionCard.Input type="number" label="Amount" name="amount" />
        <ActionCard.ActionButton />
      </ActionCard>

      <ActionCard title="Request loan" className="bg-green-600" type="loan">
        <ActionCard.Input type="number" label="Amount" name="amount" />
        <ActionCard.ActionButton />
      </ActionCard>

      <ActionCard
        title="Close account"
        className="bg-red-600"
        type="closeAccount"
      >
        <ActionCard.Input type="text" label="Confirm user" name="user" />
        <ActionCard.Input type="text" label="Confirm PIN" name="pin" />
        <ActionCard.ActionButton />
      </ActionCard>
    </div>
  );
}
