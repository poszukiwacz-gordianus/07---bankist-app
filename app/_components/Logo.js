import logo from "@/public/img/logo.png";
import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src={logo}
      alt="bankinst logo four circles"
      placeholder="blur"
      sizes="20vw lg:40vw"
      quality={100}
      className="h-10 w-10 justify-self-end"
    />
  );
}
