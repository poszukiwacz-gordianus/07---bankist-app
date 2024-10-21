import { currentDate, formatCurrency } from "../_lib/helpers";

export default function MainHeader({ currentUser }) {
  const { locale, balance, currency } = currentUser;
  return (
    <div className="flex items-center justify-between md:col-span-full">
      <div>
        <h3 className="text-2xl">Current balance</h3>
        <p className="text-xs text-stone-500 md:text-sm">
          As of {currentDate(locale)}
        </p>
      </div>
      <h2 className="text-4xl lg:text-5xl">
        {formatCurrency(balance, locale, currency)}
      </h2>
    </div>
  );
}
