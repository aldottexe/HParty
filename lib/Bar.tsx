export function Bar({ charInfo }: { name: string, hp: number, max: number, temp: number}) {
  return (
    <div className="flex items-center justify-between sm:gap-4 relative mb-2 sm:mb-3 flex-wrap">
      <p className=" ml-1">{charInfo.name}</p>

      <div className="h-3 w-full absolute top-0 left-0 z-[-2] flex">
        <div className="h-6 transition-all duration-700 bg-stone-700" style={{ width: `${Math.round((charInfo.hp / (charInfo.max + charInfo.temp)) * 100)}%` }} >
        </div>
        <div className="h-6 transition-all duration-700 bg-stone-800" style={{ width: `${Math.round((charInfo.temp / (charInfo.max + charInfo.temp)) * 100)}%` }} >
        </div>
      </div>
      <p className=" mr-1 sm:mr-3">{charInfo.hp} {charInfo.temp > 0 ? `+ ${charInfo.temp}` : ''} / {charInfo.max} </p>
    </div>
  );
}
