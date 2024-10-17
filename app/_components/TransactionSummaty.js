export default function TransactionSummary() {
  return (
    <div className="flex flex-col gap-2">
      <h5 className="text-2xl">Transactions Summary</h5>
      <TransactionItem text="in" balance="28 033,20" />
      <TransactionItem text="out" balance="28 033,20" color="text-red-700" />
      <TransactionItem text="interest" balance="28 033,20" />
    </div>
  );
}

function TransactionItem({ text, balance, color = "text-green-700" }) {
  return (
    <p className={`text-2xl`}>
      <span className="text-sm uppercase">{text}</span>{" "}
      <span className={`${color}`}>{balance} $</span>
    </p>
  );
}
