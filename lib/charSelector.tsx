"use client"

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import CharacterCreator from "./charCreator";

export default function CharSelector({ onSelect }: { onSelect: (id: string) => void }) {
  const [partyID, setPartyID] = useState<number>();
  const [characterList, setCharacterList] = useState<unknown[]>([]);

  // update displayed list of party members on change
  useEffect(() => {
    const channel = supabase
      .channel('character-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'characters' },
        (payload) => {
          console.log('Change received!', payload)
          fetchPartyMembers();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    }
  });

  // update member list when party selection changes
  useEffect(() => {
    fetchPartyMembers();
  }, [partyID]);

  async function fetchPartyMembers() {
    if (partyID) {
      const chars = await supabase.from('characters').select('*').eq('party_id', partyID);
      setCharacterList(chars.data || []);
    } else {
      setCharacterList([]);
    }
  }

  async function removeMember(c) {
    console.log("removing...", c);
    const { data, error } = await supabase.from('characters').delete().eq('id', c.id).select().single();
    if (error) console.error(error)
    else
      console.log("removed", data);
  }

  async function addMember(name, maxhp) {
    if (name && maxhp) {
      console.log("adding new Member...", name, maxhp);
      const { data, error } = await supabase.from('characters').insert({ name: name, hp: maxhp, max: maxhp, party_id: partyID }).select().single();
      if (error) console.error(error)
      else {
        console.log("added!", data);
        onSelect(data.id);
      }
    }
  }

  return (
    <div>
      <h2 className="mb-[.1em]">Room Number</h2>
      <input type="number" className="w-full border-b focus:bg-stone-700 px-3 py-1 mb-3" onChange={(e) => { setPartyID(e.target.value) }} />
      <ul className="mb-3">
        {characterList.map((c, i) => {
          return (
            <li key={i} className="flex justify-between hover:bg-stone-700">
              <button className="grow text-left px-3" onClick={() => onSelect(c.id)}>{c.name}</button>
              <button className="px-3" onClick={() => removeMember(c)}> x </button>
            </li>)
        })}
      </ul>
      {partyID ?
        <CharacterCreator onSubmit={addMember} /> : <p>( !!! ) Select a party to join a game.</p>
      }
    </div>
  );
}
