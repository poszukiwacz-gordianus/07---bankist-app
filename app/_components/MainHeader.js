import { currentTime, formatMoney, today } from "../_lib/helpers";

export default function MainHeader({ balance }) {
  return (
    <div className="flex items-center justify-between md:col-span-full">
      <div>
        <h3 className="text-2xl">Current balance</h3>
        <p className="text-xs text-stone-500 md:text-sm">
          As of {today()}, {currentTime()}
        </p>
      </div>
      <h2 className="text-4xl lg:text-5xl">{formatMoney(balance)}</h2>
    </div>
  );
}
