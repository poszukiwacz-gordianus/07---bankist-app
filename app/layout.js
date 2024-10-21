import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { UserProvider } from "./_context/UserContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Bankist App",
  description:
    "Project from The Complete Javascript Course by Jonas Schmedtmann, build with Next.js and Tailwind Css",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className={`bg-slate-200 antialiased`}>
        <UserProvider>
          <Header />

          <main>{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
