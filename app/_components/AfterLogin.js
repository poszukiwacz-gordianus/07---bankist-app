import { partOfDay } from "../_lib/helpers";
import Logo from "./Logo";
import Logout from "./Logout";

export default function AfterLogin({ user }) {
  return (
    <div className="flex flex-col gap-4 px-4 py-6">
      <Logo />
      <div className="flex items-center">
        <h1 className="text-xl font-medium">
          Good {partOfDay()}, {user.split(" ").at(0)}
        </h1>
        <Logout />
      </div>
    </div>
  );
}
