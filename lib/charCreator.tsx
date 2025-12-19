import { ChangeEventHandler } from "react";

export default function CharacterCreator({ onSubmit }: { onSubmit: (name: string, maxhp: number) => void }) {
   let name: string;
   let maxhp: number;
   return (
      <div className="border p-3">
         <Field name="name" type="text" onChange={(e) => name = e.target.value} />
         <Field name="max hp" type="number" onChange={(e) => maxhp = Number.parseInt(e.target.value)} />
         <button className="bg-foreground text-background w-full text-center" onClick={() => onSubmit(name, maxhp)}>add party member</button>
      </div>
   );

   function Field({ name, type, onChange }: { name: string, type: string, onChange: ChangeEventHandler<HTMLInputElement> }) {
      return (
         <>
            <input className="block w-full px-3 py-1 border-b bg-stone-800 focus:bg-stone-700" id="name" type={type} onChange={onChange} />
            <label className="block w-full mb-3" htmlFor={name} >{name}</label>
         </>
      )
   }
}
