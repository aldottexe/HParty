export function Bar({ charInfo }: { name: string, hp: number, max: number }) {
  return (
    <div className="flex items-center justify-between sm:gap-4 mb-5 sm:mb-0 flex-wrap">
      <p className="sm:w-15 text-right">{charInfo.name}</p>

      <div className="h-3 mt-1 sm:m-2 grow before:absolute before:z-[-1] before:opacity-80 before:h-full before:w-full before:bg-gradient-to-r before:from-orange-300 before:to-teal-300 relative order-3 sm:order-2 w-full sm:w-auto">
        <div className="h-full overflow-hidden bg-background ml-auto transition-all duration-700" style={{ width: `${Math.round(100 - (charInfo.hp / charInfo.max) * 100)}%` }} >
        </div>
      </div>

      <p className="sm:w-15 sm:order-3">{charInfo.hp} / {charInfo.max}</p>
    </div>
  );
}
