"use client"
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import { Bar } from "@/lib/Bar";
import { Keypad } from "@/lib/Keypad";

export default function Tracker({ playerCharID, onExit }: { playerCharID: string, onExit: () => void }) {
  useEffect(() => {
    const party_id = fetchPartyFromID(playerCharID);
    fetchCharacters(party_id);

    const channel = supabase
      .channel('character-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'characters' },
        (payload) => {
          console.log('Change received!', payload)
          fetchCharacters(party_id)
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    }
  }, [])

  async function fetchPartyFromID(id: string) {
    const { data, error } = await supabase.from('characters').select('party_id').eq('id', id).single();
    if (error) console.error(error)
    else {
      return data?.party_id;
    }
  }

  async function fetchCharacters(party_id: number) {
    const pid = await party_id;
    const { data, error } = await supabase.from('characters').select('*').eq('party_id', pid);
    if (error) console.error(error)
    else {
      const otherPlayers = data?.filter(e => {
        if (e.id !== playerCharID)
          return true;
        setUserChar(e);
        return false;
      });
      setCharacters(otherPlayers)
    }
  }


  const [characters, setCharacters] = useState([]);
  const [userChar, setUserChar] = useState([]);

  async function updateHp(ammt: number): Promise<void> {
    const newHp = Math.max(0, Math.min(userChar.max, userChar.hp + ammt));
    await supabase.from('characters').update({ hp: newHp }).eq('id', playerCharID);
  }


  return (
    <div>
      <ul>
        {characters.map((c, i) => (
          <li key={i}>
            <Bar charInfo={c} />
          </li>
        ))}
      </ul>

      <p className="overflow-clip mb-3 break-all h-[1em] text-center">~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</p>

      <Bar charInfo={userChar} />
      <Keypad onCommit={updateHp}/>

      <button onClick={onExit} className="block mx-auto my-4">(exit)</button>
    </div>
  );
}

