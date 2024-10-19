import Login from "./Login";
import Logo from "./Logo";

export default function BeforeLogin() {
  return (
    <div className="flex flex-col gap-4 px-12 py-6">
      <Logo />
      <h1 className="text-center text-3xl font-medium">
        Log in to get started
      </h1>
      <Login />
    </div>
  );
}
