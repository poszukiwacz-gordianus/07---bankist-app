export default function TransactionItem({
  text,
  balance,
  color = "text-green-700",
}) {
  return (
    <p className="text-2xl" aria-live="polite">
      <span className="text-sm uppercase">{text}</span>{" "}
      <span className={`${color}`}>{balance}</span>
    </p>
  );
}
