"use client";

import Image from "next/image";
import { useCountriesFound } from "../context/countries-found";
import { useEffect } from "react";
import { Country } from "../lib/definitions";

interface DataTableProps {
  search: string;
  un: string;
  independent: string;
  sortBy: string;
  region: string;
  countries: Country[];
}

export default function DataTable({
  search,
  un,
  independent,
  sortBy,
  region,
  countries,
}: DataTableProps) {

  const { setCountriesFound } = useCountriesFound();
  
  let filteredCountries = countries.sort((a, b) => {
    return b.population - a.population;
  });
  
  useEffect(() => {
    setCountriesFound(filteredCountries.length);
  }, [filteredCountries])


  if (search) {
    filteredCountries = filteredCountries.filter(
      (country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase()) ||
        country.region.toLowerCase().includes(search.toLowerCase()) ||
        country.subregion?.toLowerCase().includes(search.toLowerCase()),
    );
  }

  if (region) {
    filteredCountries = filteredCountries.filter((country) => {
      return region.split(",").includes(country.region);
    });
  }

  if (un || independent) {
    filteredCountries = filteredCountries.filter((country) => {
      if (un === "true") {
        return country.unMember;
      }
      if (independent === "true") {
        return country.independent;
      }
      return false;
    });
  }

  if (sortBy) {
    filteredCountries = filteredCountries.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.common.localeCompare(b.name.common);
      }
      if (sortBy === "area") {
        return b.area - a.area;
      }
      if (sortBy === "population") {
        return b.population - a.population;
      }
    });
  }



  const formatNumber = (number: number) =>
    new Intl.NumberFormat("pt-BR").format(number);

  return (
    <div className="table-auto table w-full">
      <div className="table-header-group text-xs">
        <div className="table-row ">
          <div className="pb-4 border-b border-zinc-800 table-cell">Flag</div>
          <div className="pb-4 border-b border-zinc-800 table-cell">Name</div>
          <div className="pb-4 border-b border-zinc-800 table-cell">
            Population
          </div>
          <div className="pb-4 border-b border-zinc-800 table-cell">
            Area (km²)
          </div>
          <div className="hidden xl:pb-4 xl:border-b xl:border-zinc-800 xl:table-cell">
            Region
          </div>
        </div>
      </div>
      <div className="table-row-group text-sm">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((data) => (
            <div key={data.name.common} className="table-row">
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
              <div className="pt-3 pb-3 pr-3 table-cell align-middle">
                {data.name.common}
              </div>
              <div className="pt-3 pb-3 pr-3 table-cell align-middle">
                {formatNumber(data.population)}
              </div>
              <div className="pt-3 pb-3 pr-3 table-cell align-middle">
                {formatNumber(data.area)}
              </div>
              <div className="hidden xl:pt-3 xl:pb-3 xl:pr-3 xl:table-cell xl:align-middle">
                {data.region}
              </div>
            </div>
          ))
        ) : (
          <div className="pt-3 pb-3 pr-3 table-cell align-middle">
            No country found.
          </div>
        )}
      </div>
    </div>
  );
}
