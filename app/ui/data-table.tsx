import fetchAllCountries from "../lib/data";
import Image from "next/image";

export default async function DataTable() {
  const countries = await fetchAllCountries();

  const formatNumber = (number) => new Intl.NumberFormat("pt-BR").format(number);

  return (
    <div className="table w-full">
      <div className="table-header-group text-xs">
        <div className="table-row ">
          <div className="pb-4 border-b border-zinc-800 table-cell">Flag</div>
          <div className="pb-4 border-b border-zinc-800 table-cell">Name</div>
          <div className="pb-4 border-b border-zinc-800 table-cell">Population</div>
          <div className="pb-4 border-b border-zinc-800 table-cell">Area (km²)</div>
        </div>
      </div>
      <div className="table-row-group text-sm">
        {countries?.map(data => (
        <div key={data.id} className="table-row">
          <div className="pt-3 pb-3 pr-3 table-cell align-middle">
            <Image 
              width={48} 
              height={48} 
              src={data.flags.svg} 
              alt={`Flag of ${data.name.common}`}
              className="rounded" 
            />
          </div>
          <div className="pt-3 pb-3 pr-3 table-cell align-middle">{data.name.common}</div>
          <div className="pt-3 pb-3 pr-3 table-cell align-middle">{formatNumber(data.population)}</div>
          <div className="pt-3 pb-3 pr-3 table-cell align-middle">{formatNumber(data.population)}</div>
        </div>
        ))}
      </div>
    </div>
  );
}