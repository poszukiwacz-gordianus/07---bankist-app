import LogoutCounter from "./LogoutCounter";
import TransactionSummary from "./TransactionSummary";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-6 px-4 py-6">
      <TransactionSummary />
      <LogoutCounter />
    </footer>
  );
}
