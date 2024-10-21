import { SessionTimer, TransactionSummary } from "../Components";

export default function AccountFooter() {
  return (
    <footer
      className="flex flex-col items-center gap-6 px-4 py-6"
      aria-label="Account Footer"
    >
      <TransactionSummary />
      <SessionTimer />
    </footer>
  );
}
