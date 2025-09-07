import { MouseEventHandler, ReactNode } from "react"

export default function TextButton({ children, onClick }: { children: ReactNode, onClick: MouseEventHandler<HTMLButtonElement> }) {
  return (
    <button onClick={onClick} className=" hover:bg-stone-700 text-center flex justify-between px-3 w-full box-border">
      <span>&gt;</span>
      {children}
      <span>&lt;</span>
    </button>
  );
}
