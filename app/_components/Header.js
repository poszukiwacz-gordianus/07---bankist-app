import Login from "./Login";
import Logo from "./Logo";
import { account1 } from "@/public/data";
import { partOfDay } from "../_lib/helpers";

export default function Header() {
  const { owner } = account1;

  return (
    <header>
      <div className="grid grid-cols-6 items-center justify-center gap-2 px-2 py-4">
        <h1 className="col-span-5 p-1 text-2xl font-medium">
          {owner ? `Good ${partOfDay()} ${owner}` : "Log in to get started"}
        </h1>
        <Logo />
        <Login />
      </div>
    </header>
  );
}
