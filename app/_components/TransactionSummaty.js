"use client";
import { useUser } from "../_context/UserContext";
import { formatMoney } from "../_lib/helpers";
import TransactionItem from "./TransactionItem";

export default function TransactionSummary() {
  const { currentUser } = useUser();
  const calculateTotal = (movements, condition) =>
    movements?.filter(condition).reduce((acc, m) => acc + m.amount, 0);

  const depositTotal = calculateTotal(
    currentUser?.movements,
    (mov) => mov.amount > 0,
  );
  const withdrawalsTotal = Math.abs(
    calculateTotal(currentUser?.movements, (mov) => mov.amount < 0),
  );
  const interest = (depositTotal * currentUser?.interestRate) / 100;

  return (
    <div className="flex flex-col gap-2">
      <h5 className="text-2xl">Transactions Summary</h5>
      <TransactionItem text="in" balance={formatMoney(depositTotal)} />
      <TransactionItem
        text="out"
        balance={formatMoney(withdrawalsTotal)}
        color="text-red-700"
      />
      <TransactionItem text="interest" balance={formatMoney(interest)} />
    </div>
  );
}
