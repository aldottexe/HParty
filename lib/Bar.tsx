export function Bar({ charInfo }: { name: string, hp: number, max: number }) {
  return (
    <div className="flex items-center justify-between sm:gap-4 relative mb-2 sm:mb-3 flex-wrap">
      <p className=" ml-1">{charInfo.name}</p>

      <div className="h-3 grow">
        <div className="h-6 transition-all duration-700 opacity-15 absolute top-0 left-0 bg-foreground" style={{ width: `${Math.round((charInfo.hp / charInfo.max) * 100)}%` }} >
        </div>
      </div>
      <p className=" mr-1 sm:mr-3">{charInfo.hp} / {charInfo.max}</p>
    </div>
  );
}
