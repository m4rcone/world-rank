import { fetchAllCountries, fetchCountryByName } from "../lib/data";
import Image from "next/image";

export default async function DataTable({ query }: { query: string }) {
  let countries = null;

  if (query) {
    try {
      countries = await fetchCountryByName(query);
    } catch (error) {
      countries = null;
      console.error(error);
    }
  } else {
    try {
      countries = await fetchAllCountries();
    } catch (error) {
      countries = null;
      console.error(error);
    }
  }

  const formatNumber = (number: number) => new Intl.NumberFormat("pt-BR").format(number);

  return (
    <div className="table-auto table w-full">
      <div className="table-header-group text-xs">
        <div className="table-row ">
          <div className="pb-4 border-b border-zinc-800 table-cell">Flag</div>
          <div className="pb-4 border-b border-zinc-800 table-cell">Name</div>
          <div className="pb-4 border-b border-zinc-800 table-cell">Population</div>
          <div className="pb-4 border-b border-zinc-800 table-cell">Area (km²)</div>
        </div>
      </div>
      <div className="table-row-group text-sm">
        {countries ? countries.map(data => (
          <div key={data.id} className="table-row">
            <div className="pt-3 pb-3 pr-3 table-cell align-middle">
              <Image
                width={48}
                height={48}
                src={data.flags.svg}
                alt={`Flag of ${data.name.common}`}
                className="rounded"
                style={{ height: "auto" }}
              />
            </div>
            <div className="pt-3 pb-3 pr-3 table-cell align-middle">{data.name.common}</div>
            <div className="pt-3 pb-3 pr-3 table-cell align-middle">{formatNumber(data.population)}</div>
            <div className="pt-3 pb-3 pr-3 table-cell align-middle">{formatNumber(data.population)}</div>
          </div>
        )) : (
          <div className="pt-3 pb-3 pr-3 table-cell align-middle">No country found.</div>
        )}
      </div>
    </div>
  );
}