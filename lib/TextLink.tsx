import Link from "next/link"
import { ReactNode } from "react"

export default function TextLink({ children, href }: { children: ReactNode, href: string }) {
  return (
    <Link href={href} className=" hover:bg-stone-700 text-center m-3 flex justify-between px-3">
      <span>&gt;</span>
      {children}
      <span>&lt;</span>
    </Link>
  );
}
