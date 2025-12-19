import { ChangeEventHandler, useRef, useState } from "react"

export default function SetMaxHP({ onSubmit }: { onSubmit: (ammt: number) => void }) {
   const [isOpen, setIsOpen] = useState(false);
   const maxHP = useRef(0);
   return (
      <>
         <button onClick={() => setIsOpen(!isOpen)} className="hover:bg-stone-700 absolute px-1 sm:px-3 text-sm bg-stone-800">set max</button>
         {isOpen ? (
            <div className="flex justify-center items-center fixed inset-0" onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false) }}>
               <div className="border p-3 bg-background">
                  <h2 className="mb-2">Set max HP</h2>
                  <Field name="" type="number" onChange={(e) => maxHP.current = Number.parseInt(e.target.value)} />
                  <button className="bg-foreground text-background w-full text-center" onClick={() => { onSubmit(maxHP.current); setIsOpen(false) }}>Ok</button>
               </div>
            </div>) : (<></>)}
      </>
   )
   function Field({ name, type, onChange }: { name: string, type: string, onChange: ChangeEventHandler<HTMLInputElement> }) {
      return (
         <>
            <input className="block w-full px-3 py-1 border-b bg-stone-800 focus:bg-stone-700" id="name" type={type} onChange={onChange} />
            <label className="block w-full mb-3" htmlFor={name} >{name}</label>
         </>
      )
   }
}
