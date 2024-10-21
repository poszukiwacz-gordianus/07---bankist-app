"use client";
import { useUser } from "../_context/UserContext";
import { formatCurrency } from "../_lib/helpers";
import TransactionItem from "./TransactionItem";

export default function TransactionSummary() {
  const {
    state: { currentUser },
  } = useUser();
  const { locale, currency, movements, interestRate } = currentUser;
  const calculateTotal = (movements, condition) =>
    movements?.filter(condition).reduce((acc, m) => acc + m.amount, 0);

  const depositTotal = calculateTotal(movements, (mov) => mov.amount > 0);
  const withdrawalsTotal = Math.abs(
    calculateTotal(movements, (mov) => mov.amount < 0),
  );
  const interest = movements
    .filter((mov) => mov.amount > 0)
    .map((deposit) => (deposit.amount * interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int, 0);

  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <h5 className="text-2xl">Transactions Summary</h5>
      <TransactionItem
        text="in"
        balance={formatCurrency(depositTotal, locale, currency)}
      />
      <TransactionItem
        text="out"
        balance={formatCurrency(withdrawalsTotal, locale, currency)}
        color="text-red-700"
      />
      <TransactionItem
        text="interest"
        balance={formatCurrency(interest, locale, currency)}
      />
    </div>
  );
}
