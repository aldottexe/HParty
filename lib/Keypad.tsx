'use client'
import { ReactNode, useState } from "react";

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function Keypad({ onCommit }: { onCommit: (ammt: number) => null }) {
  const [input, setInput] = useState(0);

  return (
    <div>
      <p className="text-3xl text-center p-10">{input}</p>
      <div className="grid grid-cols-6 gap-2 max-w-80 content-center mx-auto">
        {nums.map((c, i) => <Button key={i} onClick={() => { setInput(input * 10 + c) }}>{c}</Button>)}
        <Button onClick={() => { setInput(Math.floor(input / 10)) }}>&lt;</Button>
        <Button onClick={() => { setInput(input * 10) }}>0</Button>
        <Button onClick={() => { onCommit(-input); setInput(0); }}>damage</Button>
        <Button onClick={() => { onCommit(input); setInput(0); }}>heal</Button>
      </div>
    </div>
  )
}

function Button({ children, onClick }: { children: ReactNode, onClick: (e: PointerEvent) => void }) {
  return (
    <button
      className="p-1 sm:p-2 border-1 block col-span-2 active:bg-gray-800 transition-colors duration-100 nth-[12]:col-span-3 nth-[13]:col-span-3"
      onClick={onClick}>
      {children}
    </button>
  )
}
