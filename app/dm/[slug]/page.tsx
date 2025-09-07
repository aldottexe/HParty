"use client"
import { useState, useEffect, use } from 'react'
import { supabase } from '@/lib/supabaseClient';
import { Bar } from '@/lib/Bar';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import TextLink from '@/lib/TextLink';

interface WatchPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function WatchPage({ params }: WatchPageProps) {
  const { slug } = use(params);
  const party_id = parseInt(slug);
  if(isNaN(party_id))
    redirect("/");
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
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

  async function fetchCharacters(party_id: number) {
    const { data, error } = await supabase.from('characters').select('*').eq('party_id', party_id);
    if (error) console.error(error)
    else {
      setCharacters(data)
    }
  }

  return (
    <div>
      <p className="overflow-clip mb-3 break-all h-[1em] text-center relative bottom-2">~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</p>
      <ul>
        {characters.map((c, i) => (
          <li key={i}>
            <Bar charInfo={c} />
          </li>
        ))}
      </ul>
      <p className="overflow-clip mb-3 break-all h-[1em] text-center relative">~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</p>
      <TextLink href="/">Exit</TextLink>
    </div>
  );
}
