import Button from "./Button";
import Input from "./Input";
import { HiArrowLongRight } from "react-icons/hi2";

export default function Login() {
  return (
    <form className="flex flex-col gap-2" action="/account">
      <Input placeholder="user" />
      <Input placeholder="PIN" />
      <Button type="submit" className="self-center">
        <HiArrowLongRight className="text-4xl" />
      </Button>
    </form>
  );
}
