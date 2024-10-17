import Login from "./Login";
import Logo from "./Logo";

export default function Header() {
  return (
    <header>
      <div className="grid grid-cols-6 items-center justify-center gap-2 px-2 py-4">
        <p className="col-span-5 p-1 text-2xl font-medium">
          Log in to get started
        </p>
        <Logo />
        <Login />
      </div>
    </header>
  );
}
