export default function StatusFilter() {
  const statusOptions = ["Member of the United Nations", "Independent"]

  return (
    <fieldset className="flex flex-col gap-2">
      {statusOptions.map(option => (
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox" 
            className="hidden peer" 
          />
          <div className="w-6 h-6 rounded-md border-2 border-gray-300 peer-checked:bg-blue-500 peer-checked:border-blue-500
                peer-checked:bg-[url(/done_round.svg)] peer-checked:bg-center">
          </div>
          <span className="text-sm font-medium">{option}</span>
        </label>
      ))}
    </fieldset>
  );
}