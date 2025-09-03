"use client"
import { Bar } from "@/public/components/Bar";
import { Keypad } from "@/public/components/Keypad";
import { useState } from "react";

let connections = [
  { name: "Leon", hp: 20, max: 50 },
  { name: "Athel", hp: 10, max: 30 },
  { name: "Mills", hp: 15, max: 20 },
];


export default function Home() {
  const [user, setUser] = useState({ name: "freb", hp: 25, max: 30 });
  return (
    <div className="mx-auto mt-20 w-[80%]">

      <h1 className="text-3xl mb-5">HParty</h1>

      <ul>
        {connections.map((c, i) => (
          <li key={i}>
            <Bar charInfo={c} />
          </li>
        ))}
      </ul>

      <hr className="my-5" />

      <Bar charInfo={user} />
      <Keypad onCommit={(ammt) => setUser({ ...user, hp: Math.max(0, Math.min(user.hp + ammt, user.max)) })} />
    </div>
  );
}

