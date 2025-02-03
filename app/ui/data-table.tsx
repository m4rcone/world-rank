import { fetchAllCountries, fetchCountryByName } from "../lib/data";
import Image from "next/image";

export default async function DataTable({ query, un, independent }: { query: string, un: string, independent: string }) {
  let countries = [];

  try {
    countries = await fetchAllCountries();
  } catch (error) {
    countries = [];
    console.error(error);
  }

  let filteredCountries = countries;

  if (query) {
    filteredCountries = filteredCountries.filter(country =>
      country.name.common.toLowerCase().includes(query.toLowerCase()) ||
      country.region.toLowerCase().includes(query.toLowerCase()) ||
      country.subregion?.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (un || independent) {
    filteredCountries = filteredCountries.filter(country => {
      if (un === "true") {
        return country.unMember;
      }
      if (independent === "true") {
        return country.independent;
      }
      return false;
    });
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
        {filteredCountries.length > 0 ? filteredCountries.map(data => (
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