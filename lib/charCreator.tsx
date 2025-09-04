export default function CharacterCreator({ onSubmit }: { onSubmit: (name: string, maxhp: number) => void }) {
  let name;
  let maxhp;
  return (
    <div className="border p-3">
      <Field name="name" type="text" onChange={(e) => name = e.target.value} />
      <Field name="max hp" type="number" onChange={(e) => maxhp = e.target.value} />
      <button className="bg-foreground text-background px-3 mt-3" onClick={() => onSubmit(name, maxhp)}>add party member</button>

    </div>
  );

  function Field({ name, type, onChange }: { name: String, type: String, onChange: (e: InputEvent) => void }) {
    return (
      <>
        <label className="block" htmlFor={name} >{name}</label>
        <input className="block border-b" id="name" type={type} onChange={onChange} />
      </>
    )
  }
}
