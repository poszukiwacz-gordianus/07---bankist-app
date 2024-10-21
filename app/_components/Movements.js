import { isToday } from "date-fns";
import { formatCurrency, formatDate } from "../_lib/helpers";

export default function Movements({ currentUser, sortedData }) {
  const { locale, currency } = currentUser;
  return (
    <div className="hide-scrollbar-x flex h-56 flex-col gap-1 overflow-scroll rounded-lg md:h-[545px] md:gap-[0.1rem] lg:h-[505px]">
      {sortedData.items.map((mov, i) => {
        const withdrawal = mov.amount < 0;
        return (
          <div
            className="flex items-center bg-white px-4 py-4 text-xl sm:py-5 sm:text-base lg:px-6"
            key={i}
          >
            <p
              className={`rounded-full px-3 py-1 text-xs font-bold uppercase text-white ${withdrawal ? "bg-red-400" : "bg-green-400"}`}
            >
              {i + 1} {withdrawal ? "withdrawal" : "deposit"}
            </p>
            <p className="ml-4 text-sm uppercase">
              {isToday(new Date(mov.date))
                ? "Today"
                : formatDate(mov.date, locale)}
            </p>
            <p className="ml-auto">
              {formatCurrency(mov.amount, locale, currency)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
