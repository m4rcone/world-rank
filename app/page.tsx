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
  }>
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const un = searchParams?.un || '';
  const independent = searchParams?.independent || '';
  const sortBy = searchParams?.sortBy || '';

  return (
    <main className="px-3 py-6 flex flex-col justify-center gap-6 bg-zinc-900 border border-zinc-800 rounded-xl">
      <section className="flex flex-col gap-6">
        <h2 className="font-medium">Found 234 countries</h2>

        <SearchInput placeholder="Search by Name, Region..." />

        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium">Sort by</label>
          <SortSelect />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium">Region</label>
          <RegionFilter />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium">Status</label>
          <StatusFilter />
        </div>
      </section>

      <section>
        <div className="overflow-x-auto">
          <DataTable query={query} un={un} independent={independent} sortBy={sortBy}/>
        </div>
      </section>
    </main>
  );
}
