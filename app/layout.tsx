import type { Metadata } from "next";
import { Jacquarda_Bastarda_9 } from "next/font/google";
import "./globals.css";

const f = Jacquarda_Bastarda_9({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "HParty!",
  description: "health time health time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="text-[24px] sm:text-[22px]">
      <body
        className={`${f.className} antialiased`}
      >
        <div className="mx-auto mt-5 sm:mt-20 w-[80%]">
          <div className="flex justify-between">
            <h1 className="text-3xl mb-5 hidden sm:block">HParty</h1>
            <img src="/hparty.png" className="block w-20 mx-auto sm:mx-0 mb-5" style={{ imageRendering: "pixelated" }} alt="welcome!" />
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
