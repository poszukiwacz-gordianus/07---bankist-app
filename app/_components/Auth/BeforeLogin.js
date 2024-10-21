import { Login, Logo } from "../Components";

export default function BeforeLogin() {
  return (
    <div className="flex flex-col items-center gap-4 px-12 py-6 sm:flex-row sm:gap-2 sm:px-6">
      <Logo />
      <h1 className="text-2xl font-medium">Log in to get started</h1>
      <Login />
    </div>
  );
}
