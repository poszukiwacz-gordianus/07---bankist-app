import { ActionCard } from "../Components";

export default function ActionList() {
  return (
    <aside className="flex flex-col gap-2 md:gap-4">
      {/* Transfer Money Action */}
      <ActionCard
        title="Transfer money"
        className="bg-yellow-400"
        type="addTransferMovement"
      >
        <ActionCard.Input
          type="text"
          label="Transfer to"
          name="recipientUser"
          ariaLabel="Transfer money to user"
        />
        <ActionCard.Input
          type="number"
          label="Amount"
          name="amount"
          ariaLabel="Transfer amount"
        />
        <ActionCard.Button />
      </ActionCard>

      {/* Request Loan Action */}
      <ActionCard
        title="Request loan"
        className="bg-green-600"
        type="addLoanMovement"
        ariaLabel="Loan amount"
      >
        <ActionCard.Input
          type="number"
          label="Amount"
          name="amount"
          ariaLabel="Loan amount"
        />
        <ActionCard.Button />
      </ActionCard>

      {/* Close Account Action */}
      <ActionCard
        title="Close account"
        className="bg-red-600"
        type="removeAccount"
      >
        <ActionCard.Input
          type="text"
          label="Confirm user"
          name="user"
          ariaLabel="Confirm user for account closure"
        />
        <ActionCard.Input
          type="password"
          label="Confirm PIN"
          name="pin"
          ariaLabel="Confirm PIN for account closure"
        />
        <ActionCard.Button />
      </ActionCard>
    </aside>
  );
}
