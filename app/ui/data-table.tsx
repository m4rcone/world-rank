import { fetchAllCountries, fetchCountryByName } from "../lib/data";
import Image from "next/image";

export default async function DataTable({ query, un, independent } : { query: string, un: string, independent: string }) {
  let countries = [];

  if (query) {
    try {
      countries = await fetchCountryByName(query);
    } catch (error) {
      countries = [];
      console.error(error);
    }
  } else {
    try {
      countries = await fetchAllCountries();
    } catch (error) {
      countries = [];
      console.error(error);
    }
  }

  //If the filter "un" (United Nations) or "independent" (Independent) is "false" (do not show)
  if (un || independent) {
    countries = countries.filter(country => {
      //Is the country a member of the United Nations?
      const isMemberUN = country.unMember;
      //Is the country not a member of the United Nations? 
      const isIndependent = !country.unMember;
      // It's not to show the members of the United Nations and the country is, it does not enter the filter
      if (un === "false" && isMemberUN) return false;
      // It's not to show Independent countries and the country is, it doesn't enter the filter 
      if (independent === "false" && isIndependent) return false;
      // If the country is independent or member of the United Nations and there is no filter to not show it.
      return true;
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
        {countries.length > 0 ? countries.map(data => (
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