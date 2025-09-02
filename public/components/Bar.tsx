export function Bar({ charInfo }: { name: String, hp: Number, max: Number }) {
  return (
    <div className="flex items-center">
      <p className="w-15 text-right">{charInfo.name}</p>
      <div className="outline h-4 m-2 grow before:absolute before:z-[-1] before:opacity-50 before:h-full before:w-full before:bg-gradient-to-r before:from-orange-300 before:to-teal-300 relative">
        <div className="h-full overflow-hidden bg-black ml-auto" style={{ width: `${Math.round((charInfo.hp / charInfo.max) * 100)}%` }} >
        </div>
      </div>
      <p className="w-15">{charInfo.hp} / {charInfo.max}</p>
    </div>
  );
}
