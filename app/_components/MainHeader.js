import { currentTime, today } from "../_lib/helpers";

export default function MainHeader({ money }) {
  return (
    <div className="flex items-center justify-between">
      <div className="">
        <h3 className="text-lg font-medium">Current balance</h3>
        <p className="text-xs text-stone-500">
          As of {today()}, {currentTime()}
        </p>
      </div>
      <h2 className="text-3xl font-semibold">{money} $</h2>
    </div>
  );
}
