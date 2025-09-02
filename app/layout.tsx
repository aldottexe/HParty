import type { Metadata } from "next";
import { Libertinus_Serif } from "next/font/google";
import "./globals.css";

const libertinus= Libertinus_Serif({
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
    <html lang="en">
      <body
        className={`${libertinus.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
