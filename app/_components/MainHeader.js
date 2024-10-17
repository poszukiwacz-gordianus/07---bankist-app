import { currentTime, today } from "../_lib/helpers";

export default function MainHeader({ balance }) {
  return (
    <div className="flex items-center justify-between">
      <div className="">
        <h3 className="text-xl font-medium">Current balance</h3>
        <p className="text-xs text-stone-500">
          As of {today()}, {currentTime()}
        </p>
      </div>
      <h2 className="text-4xl font-semibold">{balance} $</h2>
    </div>
  );
}
