import SearchInput from "./ui/search-input";
import SortSelect from "./ui/sort-select";
import RegionFilter from "./ui/region-filter";
import StatusFilter from "./ui/status-filter";
import DataTable from "./ui/data-table";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    un?: string;
    independent?: string;
    sortBy?: string;
    region?: string;
  }>
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const un = searchParams?.un || '';
  const independent = searchParams?.independent || '';
  const sortBy = searchParams?.sortBy || '';
  const region = searchParams?.region || '';

  return (
    <main>
      <section className="px-3 py-6 flex flex-col justify-center gap-6 bg-zinc-900 border border-zinc-800 rounded-xl
        md:px-6">
        <header className="flex flex-col gap-6
          md:flex-row md:items-center md:justify-between">
          <h2 className="font-medium">Found 234 countries</h2>
          <SearchInput placeholder="Search by Name, Region and Subregion" />
        </header>

        <div className="flex flex-col gap-6 
          md:flex-row ">
          <section className="2xl:basis-xl md:basis-sm flex flex-col gap-6">
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
            <DataTable query={query} un={un} independent={independent} sortBy={sortBy} region={region} />
          </section>
        </div>
      </section>
    </main>
  );
}
