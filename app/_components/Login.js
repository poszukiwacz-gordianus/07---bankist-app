import Input from "./Input";
import { HiArrowLongRight } from "react-icons/hi2";

export default function Login() {
  return (
    <form
      className="col-span-full flex items-center justify-between"
      action="/account"
    >
      <Input placeholder="user" />
      <Input placeholder="PIN" />
      <button type="submit">
        <HiArrowLongRight className="text-4xl" />
      </button>
    </form>
  );
}
