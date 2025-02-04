import Image from "next/image";
import { fetchCountryByCode } from "../lib/data";
import { formatNumber } from "../lib/utils";
import NeighboringCountries from "../ui/country/neighboring-countries";

export default async function Page(props: {
  searchParams?: Promise<{
    code?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const countryCode = searchParams?.code || "";

  const country = await fetchCountryByCode(countryCode);

  return (
    <main className="md:px-24 lg:px-36 xl:px-64 2xl:px-96">
      <section className="flex flex-col gap-6 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-6 md:px-6">
        <header className="flex flex-col items-center">
          <Image
            width={256}
            height={256}
            src={country[0].flags.svg}
            alt={`Flag of`}
            className="relative -top-16 rounded-xl"
          />
          <h2 className="relative -top-6 text-[2rem]">
            {country[0].name.common}
          </h2>
          <p className="relative -top-6 text-[1rem]">
            {country[0].name.official}
          </p>
        </header>

        <section className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <div className="flex rounded-xl bg-zinc-800 py-1">
            <p className="border-r border-zinc-900 px-3 py-2">Population</p>
            <p className="px-3 py-2">{formatNumber(country[0].population)}</p>
          </div>
          <div className="flex rounded-xl bg-zinc-800 py-1">
            <p className="border-r border-zinc-900 px-3 py-2">Area (km²)</p>
            <p className="px-3 py-2">{formatNumber(country[0].area)}</p>
          </div>
        </section>

        <section>
          <div className="table w-full table-auto">
            <div className="table-row-group text-sm">
              <div className="table-cell border-t border-zinc-800 pt-3 pr-3 pb-3">
                Capital
              </div>
              <div className="table-cell border-t border-zinc-800 pt-3 pr-3 pb-3 text-right">
                {country[0].capital ? country[0].capital : "-"}
              </div>
            </div>
            <div className="table-row-group text-sm">
              <div className="table-cell border-t border-zinc-800 pt-3 pr-3 pb-3">
                Subregion
              </div>
              <div className="table-cell border-t border-zinc-800 pt-3 pr-3 pb-3 text-right">
                {country[0].subregion ? country[0].subregion : "-"}
              </div>
            </div>
            <div className="table-row-group text-sm">
              <div className="table-cell border-t border-zinc-800 pt-3 pr-3 pb-3">
                Language
              </div>
              <div className="table-cell border-t border-zinc-800 pt-3 pr-3 pb-3 text-right">
                {country[0].languages
                  ? Object.values(country[0].languages).join(", ")
                  : "-"}
              </div>
            </div>
            <div className="table-row-group text-sm">
              <div className="table-cell border-t border-zinc-800 pt-3 pr-3 pb-3">
                Currencies
              </div>
              <div className="table-cell border-t border-zinc-800 pt-3 pr-3 pb-3 text-right">
                {country[0].currencies
                  ? Object.values(
                      country[0].currencies as Record<string, { name: string }>,
                    )
                      .map((currency) => currency.name)
                      .join(", ")
                  : "-"}
              </div>
            </div>
            <div className="table-row-group text-sm">
              <div className="table-cell border-t border-b border-zinc-800 pt-3 pr-3 pb-3">
                Countinents
              </div>
              <div className="table-cell border-t border-b border-zinc-800 pt-3 pr-3 pb-3 text-right">
                {country[0].continents
                  ? Object.values(country[0].continents).join(", ")
                  : "-"}
              </div>
            </div>
          </div>
        </section>

        <section>
          <NeighboringCountries neighbors={country[0].borders} />
        </section>
      </section>
    </main>
  );
}
