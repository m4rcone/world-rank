import SearchInput from "./ui/search-input";
import SortSelect from "./ui/sort-select";
import RegionFilter from "./ui/region-filter";
import StatusFilter from "./ui/status-filter";
import DataTable from "./ui/data-table";
import CountriesFound from "./ui/countries-found";
import { fetchAllCountries } from "./lib/data";
import { CountriesFoundProvider } from "./context/countries-found";

export default async function Page(props: {
  searchParams?: Promise<{
    search?: string;
    un?: string;
    independent?: string;
    sortBy?: string;
    region?: string;
  }>;
}) {
  const countries = await fetchAllCountries();

  const searchParams = await props.searchParams;
  const search = searchParams?.search || "";
  const un = searchParams?.un || "";
  const independent = searchParams?.independent || "";
  const sortBy = searchParams?.sortBy || "";
  const region = searchParams?.region || "";

  return (
    <main>
      <section className="flex flex-col justify-center gap-6 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-6 md:px-6">
        <CountriesFoundProvider>
          <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <CountriesFound />
            <SearchInput placeholder="Search by Name, Region and Subregion" />
          </header>

          <div className="flex flex-col gap-6 md:flex-row">
            <section className="flex flex-col gap-6 md:basis-sm 2xl:basis-xl">
              <fieldset className="flex flex-col gap-2">
                <label className="text-xs font-medium">Sort by</label>
                <SortSelect />
              </fieldset>

              <fieldset className="flex flex-col gap-2">
                <label className="text-xs font-medium">Region</label>
                <RegionFilter />
              </fieldset>

              <fieldset className="flex flex-col gap-2">
                <label className="text-xs font-medium">Status</label>
                <StatusFilter />
              </fieldset>
            </section>

            <section className="overflow-x-auto md:basis-full">
              <DataTable
                search={search}
                un={un}
                independent={independent}
                sortBy={sortBy}
                region={region}
                countries={countries}
              />
            </section>
          </div>
        </CountriesFoundProvider>
      </section>
    </main>
  );
}
