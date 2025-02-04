"use client";

import Image from "next/image";
import { useCountriesFound } from "../context/countries-found";
import { useEffect } from "react";
import { Country } from "../lib/definitions";
import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";
import { formatNumber } from "../lib/utils";

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
  }, [filteredCountries]);

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

  return (
    <div className="table w-full table-auto">
      <div className="table-header-group text-xs">
        <div className="table-row">
          <div className="table-cell border-b border-zinc-800 pb-4">Flag</div>
          <div className="table-cell border-b border-zinc-800 pb-4">Name</div>
          <div className="table-cell border-b border-zinc-800 pb-4">
            Population
          </div>
          <div className="table-cell border-b border-zinc-800 pb-4">
            Area (km²)
          </div>
          <div className="hidden xl:table-cell xl:border-b xl:border-zinc-800 xl:pb-4">
            Region
          </div>
          <div className="hidden xl:table-cell xl:border-b xl:border-zinc-800 xl:pb-4">
            More
          </div>
        </div>
      </div>
      <div className="table-row-group text-sm">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((data) => (
            <div key={data.name.common} className="table-row hover:bg-zinc-800">
              <div className="table-cell pt-3 pr-3 pb-3 align-middle">
                <Image
                  width={48}
                  height={48}
                  src={data.flags.svg}
                  alt={`Flag of ${data.name.common}`}
                  className="rounded"
                  style={{ height: "auto" }}
                />
              </div>
              <div className="table-cell pt-3 pr-3 pb-3 align-middle">
                {data.name.common}
              </div>
              <div className="table-cell pt-3 pr-3 pb-3 align-middle">
                {formatNumber(data.population)}
              </div>
              <div className="table-cell pt-3 pr-3 pb-3 align-middle">
                {formatNumber(data.area)}
              </div>
              <div className="hidden xl:table-cell xl:pt-3 xl:pr-3 xl:pb-3 xl:align-middle">
                {data.region}
              </div>
              <div className="table-cell pt-3 pr-3 pb-3 align-middle">
                <Link href={`/country?code=${data.cca3}`}>
                  <SquareArrowOutUpRight />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="table-cell pt-3 pr-3 pb-3 align-middle">
            No country found.
          </div>
        )}
      </div>
    </div>
  );
}
