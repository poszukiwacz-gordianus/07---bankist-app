import { useUserAccount } from "@/app/_context/UserAccountContext";
import { currentDate, formatCurrency } from "@/app/_lib/helpers";

export default function AccountHeader() {
  const {
    state: { currentUser },
  } = useUserAccount();

  if (!currentUser) return null;

  const { locale, balance, currency } = currentUser;

  return (
    <header className="flex items-center justify-between md:col-span-full">
      <div>
        <h3 className="text-2xl">Current balance</h3>
        <p className="text-xs text-stone-500 md:text-sm">
          As of {currentDate(locale)}
        </p>
      </div>
      <h2
        className="text-4xl lg:text-5xl"
        aria-label={`Your current balance is ${formatCurrency(balance, locale, currency)}`}
      >
        {formatCurrency(balance, locale, currency)}
      </h2>
    </header>
  );
}
