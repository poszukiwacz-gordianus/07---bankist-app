import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "./_components/Components";
import { UserProvider } from "./_context/UserAccountContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Bankist App",
  description:
    "Project from The Complete Javascript Course by Jonas Schmedtmann, build with Next.js and Tailwind Css",
  keywords:
    "Banking, Finance, JavaScript, Next.js, Tailwind CSS, Learning Project",
  author: "Gord The Finder, Jonas Schmedtmann",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className={`bg-slate-200 antialiased`}>
        <UserProvider>
          <Header />

          <main role="main">{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
