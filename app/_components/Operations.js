import { isToday } from "date-fns";

export default function Operations({ operations }) {
  return (
    <div className="mb-6 flex h-56 flex-col gap-1 overflow-scroll rounded-lg">
      {operations.map((operation, i) => {
        const withdrawal = String(operation.amount).includes("-");
        return (
          <div className="flex items-center bg-white px-4 py-4 text-xl" key={i}>
            <p
              className={`rounded-full px-2 py-1 text-sm font-bold uppercase text-white ${withdrawal ? "bg-red-400" : "bg-green-400"}`}
            >
              {i + 1} {withdrawal ? "withdrawal" : "deposit"}
            </p>
            <p className="ml-4 text-sm uppercase">
              {isToday(new Date(operation.date)) ? "Today" : operation.date}
            </p>
            <p className="ml-auto">{operation.amount} $</p>
          </div>
        );
      })}
    </div>
  );
}
