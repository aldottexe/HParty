"use client"
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import Tracker from "@/lib/tracker";
import CharSelector from "@/lib/charSelector";


export default function Home() {

  // if a character is selected, show the main page. if not, show the picker
  const [charSelected, setCharSelected] = useState(false);

  const [playerCharID, setPlayerCharID] = useState();
  useEffect(() => {
    const id = localStorage.getItem('character_id');
    if (id)
      fetchCharacter(id);
  }, [])

  async function fetchCharacter(id) {
    const { data, error } = await supabase
      .from('characters')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      console.error(error)
    }
    else if (data) {
      setPlayerCharID(id);
      setCharSelected(true);
    } else {
      localStorage.removeItem('character_id');
    }
  }

  function storeChar(id) {
    setPlayerCharID(id);
    localStorage.setItem('character_id', id);
    setCharSelected(true);
  }

  function exit() {
    localStorage.removeItem('character_id');
    setCharSelected(false);
  }

  return (
    <div className="mx-auto mt-20 w-[80%]">

      <h1 className="text-3xl mb-5">HParty</h1>

      {charSelected ?
        <Tracker playerCharID={playerCharID} onExit={exit} /> :
        <CharSelector onSelect={storeChar} />}
    </div>
  );
}
