'use client'
import { useState } from "react";

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function Keypad({ onCommit }: { onCommit: (ammt: number) => null }) {
  const [input, setInput] = useState(0);

  return (
    <div>
      <p className="text-3xl text-center p-10">{input}</p>
      <div className="grid grid-cols-6 gap-4">
        {nums.map((c, i) => <button key={i} className="p-2 outline block col-span-2" onClick={() => setInput(input * 10 + c)}>{c}</button>)}
        <button className="p-3 outline block col-span-2" onClick={() => { onCommit(-input); setInput(0); }}>damage</button>
        <button className="p-3 outline block col-span-2" onClick={() => setInput(Math.floor(input / 10))}>&lt;</button>
        <button className="p-3 outline block col-span-2" onClick={() => { onCommit(input); setInput(0); }}>heal</button>
      </div>
    </div>
  )
}
