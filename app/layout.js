import localFont from "next/font/local";
import "./globals.css";
import Header from "./_components/Header";
import { UserProvider } from "./_context/UserContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Bankist App",
  description:
    "Project from The Complete Javascript Course by Jonas Schmedtmann, build with Next.js and Tailwind Css",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-200 antialiased`}
      >
        <UserProvider>
          <Header />

          <main>{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
