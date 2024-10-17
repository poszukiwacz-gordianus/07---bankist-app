import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import Button from "./Button";

export default function Logout() {
  return (
    <Button className="ml-auto">
      <HiOutlineArrowLongLeft className="text-4xl" />
    </Button>
  );
}
