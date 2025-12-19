"use client"
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import { Bar } from "@/lib/Bar";
import { Keypad } from "@/lib/Keypad";
import TextButton from "./TextButton";

export default function Tracker({ playerCharID, onExit }: { playerCharID: string, onExit: () => void }) {

   const [characters, setCharacters] = useState<any[]>([])
   const [userChar, setUserChar] = useState<any>(null)
   const [partyId, setPartyId] = useState<number | null>(null)
   const channelRef = useRef<any>(null)
   const [connectionStatus, setConnectionStatus] = useState<string | null>(null)

   // Initial load
   useEffect(() => {
      init()
      return cleanup
   }, [])

   async function init() {
      const pid = await fetchPartyFromID(playerCharID)
      if (!pid) return

      setPartyId(pid)
      await fetchCharacters(pid)
      subscribe(pid)
   }

   // Reconnect on unlock / network restore
   useEffect(() => {
      const onVisible = () => {
         if (document.visibilityState === 'visible') reconnect()
      }

      window.addEventListener('online', reconnect)
      document.addEventListener('visibilitychange', onVisible)

      return () => {
         window.removeEventListener('online', reconnect)
         document.removeEventListener('visibilitychange', onVisible)
      }
   }, [])



   function reconnect() {
      if (!partyId) return
      fetchCharacters(partyId)
      subscribe(partyId)
   }

   function cleanup() {
      if (channelRef.current) {
         supabase.removeChannel(channelRef.current)
         channelRef.current = null
      }
   }

   function subscribe(pid: number) {
      cleanup()

      channelRef.current = supabase
         .channel(`character-changes-${pid}`)
         .on(
            'postgres_changes',
            {
               event: '*',
               schema: 'public',
               table: 'characters',
               filter: `party_id=eq.${pid}`
            },
            () => {
               fetchCharacters(pid)
            }
         )
         .subscribe(status => {
            setConnectionStatus(status);
            if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
               reconnect()
            }
         })
   }

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

   async function heal(ammt: number): Promise<void> {
      if (ammt <= 0) return;
      const newHp = Math.min(userChar.max, userChar.hp + ammt);
      await supabase.from('characters').update({ hp: newHp }).eq('id', playerCharID);
   }
   async function damage(ammt: number): Promise<void> {
      if (ammt <= 0) return;
      const newTemp = Math.max(0, userChar.temp - ammt);
      const newHp = Math.max(0, userChar.hp - Math.max(0, ammt - userChar.temp)));
      await supabase.from('characters').update({ hp: newHp, temp: newTemp }).eq('id', playerCharID);
   }
   async function setTemp(ammt: number): Promise<void> {
      if (ammt <= userChar.temp) return;
      await supabase.from('characters').update({ temp: ammt }).eq('id', playerCharID);
   }

   return (
      <div>
         {connectionStatus !== "SUBSCRIBED" ? <img src="/disconnect.svg" className="h-5 w-5 fixed top-4 left-4 animate-pulse" /> : <></>}

         {characters && userChar ? (
            <>
               <ul>
                  {characters.map((c, i) => (
                     <li key={i}>
                        <Bar charInfo={c} />
                     </li>
                  ))}
               </ul>

               <p className="overflow-clip mb-3 break-all h-[1em] text-center relative bottom-1">~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</p>

               <Bar charInfo={userChar} />
               <Keypad onDamage={damage} onHeal={heal} onTemp={setTemp} />

               <div className="max-w-80 my-4 w-full mx-auto">
                  <TextButton onClick={onExit}> exit</TextButton>
               </div>
            </>
         ) : <></>}
      </div>
   );
}

