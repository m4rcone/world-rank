export default function RegionFilter() {
  const regions = ["Americas", "Antarctic", "Africa", "Asia", "Europe", "Oceania"];

  return (
    <fieldset className="flex flex-wrap gap-x-4 gap-y-2">
      {regions.map(region => (
        <button key={region} className="px-4 py-2 text-sm bg-zinc-800 rounded-2xl font-medium cursor-pointer">{region}</button>
      ))}
    </fieldset>
  );
}