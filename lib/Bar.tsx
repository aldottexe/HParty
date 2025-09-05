export function Bar({ charInfo: ci }: { name: string, hp: number, max: number, temp: number }) {
  return (
    <div className="flex items-center justify-between sm:gap-4 relative mb-2 sm:mb-3 flex-wrap">
      <p className=" ml-1">{ci.name}</p>

      <div className="h-3 w-full absolute top-0 left-0 z-[-2] flex">
        <div className="h-6 transition-all duration-700 bg-stone-700" style={{ width: `${Math.round((ci.hp / Math.max(ci.hp + ci.temp, ci.max)) * 100)}%` }} >
        </div>
        <div className="h-6 transition-all duration-700 bg-stone-800" style={{ width: `${Math.round((ci.temp / Math.max(ci.hp + ci.temp, ci.max)) * 100)}%` }} >
        </div>
      </div>
      <div className="absolute transition-all duration-700 h-full top-5 text-stone-600" 
        style={{ left: `${Math.min(100, Math.round(100 * (ci.max / (ci.hp + ci.temp))))}%`, opacity: ci.hp + ci.temp > ci.max ? '100%' : '0' }}><span className="relative right-[.2rem]">^</span></div>
      <p className=" mr-1 sm:mr-3">{ci.hp} {ci.temp > 0 ? `+ ${ci.temp}` : ''} / {ci.max} </p>
    </div>
  );
}
