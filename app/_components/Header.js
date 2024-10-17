import { account1 } from "@/public/data";
import BeforeLogin from "./BeforeLogin";
import AfterLogin from "./AfterLogin";

export default function Header() {
  // const account = {};
  const { owner } = account1;

  return (
    <header>{owner ? <AfterLogin user={owner} /> : <BeforeLogin />}</header>
  );
}
