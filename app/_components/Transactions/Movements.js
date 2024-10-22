import { useUserAccount } from "@/app/_context/UserAccountContext";
import { formatCurrency, formatDate } from "@/app/_lib/helpers";

export default function Movements({ sortedData }) {
  const {
    state: { currentUser },
  } = useUserAccount();

  if (!currentUser) return null;

  const { locale, currency } = currentUser;

  if (!sortedData?.items) return <p>No transactions available.</p>;

  return (
    <div className="hide-scrollbar-x flex h-64 flex-col gap-[0.1rem] overflow-scroll rounded-lg md:h-[545px] lg:h-[505px]">
      {sortedData?.items.map((mov, i) => {
        const { date: movementDate, amount } = mov;
        const date = new Date(mov.date);
        const withdrawal = mov.amount < 0;
        const movementTypeClass = withdrawal ? "bg-red-400" : "bg-green-400";

        return (
          <div
            className="flex items-center bg-white px-4 py-4 text-xl sm:py-5 sm:text-base lg:px-6"
            key={`${movementDate}-${amount}-${i}`}
          >
            <p
              aria-label={`Transaction ${withdrawal ? "withdrawal" : "deposit"} of ${formatCurrency(amount, locale, currency)}`}
              className={`rounded-full px-3 py-1 text-xs font-bold uppercase text-white ${movementTypeClass}`}
            >
              {i + 1} {withdrawal ? "withdrawal" : "deposit"}
            </p>
            <p className="ml-4 text-sm uppercase">{formatDate(date, locale)}</p>
            <p className="ml-auto">
              {formatCurrency(amount, locale, currency)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
