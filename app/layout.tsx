import type { Metadata } from "next";
import { Jacquarda_Bastarda_9} from "next/font/google";
import "./globals.css";

const f = Jacquarda_Bastarda_9({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "HParty",
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
        {children}
      </body>
    </html>
  );
}
