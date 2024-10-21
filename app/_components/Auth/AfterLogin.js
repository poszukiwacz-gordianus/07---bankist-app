import { partOfDay } from "@/app/_lib/helpers";
import { Logo, Logout } from "../Components";

export default function AfterLogin({ user }) {
  return (
    <div className="flex flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center lg:px-8">
      <Logo />
      <div className="flex items-center gap-10 sm:ml-auto">
        <h1 className="text-xl font-medium">
          Good {partOfDay()}, {user.split(" ").at(0)}!
        </h1>
        <Logout />
      </div>
    </div>
  );
}
